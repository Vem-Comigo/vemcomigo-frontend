// Dedicated headless Edge/Chromium on port 9222; see docs/responsiveness.md.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const baseUrl = process.env.QA_URL ?? "http://127.0.0.1:5173/";
const targets = await (await fetch("http://127.0.0.1:9222/json")).json();
const target = targets.find(t => t.type === "page" && (t.url === "about:blank" || t.url.startsWith(new URL(baseUrl).origin)));
assert.ok(target, "Abra uma aba no perfil dedicado de QA");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener("open", resolve, { once: true }));
let sequence = 0;
const pending = new Map();
const exceptions = [];
socket.addEventListener("message", event => {
  const response = JSON.parse(event.data);
  if (response.id) {
    const task = pending.get(response.id);
    pending.delete(response.id);
    if (response.error) task.reject(new Error(JSON.stringify(response.error)));
    else task.resolve(response.result);
  }
  if (response.method === "Runtime.exceptionThrown") exceptions.push(response.params.exceptionDetails.text);
});
function command(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await command("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function pause(ms = 350) {
  await new Promise(resolve => setTimeout(resolve, ms));
}
async function capture(name) {
  const result = await command("Page.captureScreenshot", { format: "png" });
  await writeFile(`.cache/scroll/${name}.png`, Buffer.from(result.data, "base64"));
}
const geometry = `(() => {
  const root=document.querySelector('.care-journey'),aside=root.querySelector('.journey-aside');
  const r=root.getBoundingClientRect(),a=aside.getBoundingClientRect(),top=parseFloat(getComputedStyle(aside).top)||0;
  return {start:r.top+scrollY-top,travel:r.height-a.height,static:root.dataset.static,
    sticky:getComputedStyle(aside).position,asideHeight:a.height,top,overflow:document.documentElement.scrollWidth>innerWidth};
})()`;
const progress = "document.querySelector('.journey-art').getAnimations()[0].currentTime/1000";
const results = [];
try {
  await mkdir(".cache/scroll", { recursive: true });
  await command("Runtime.enable");
  await command("Page.enable");
  await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });
  for (const [width, height] of [[360,800],[390,844],[844,390],[768,1024],[1024,768],[1280,720],[1440,900],[1920,1080],[2560,1440],[3840,2160]]) {
    await command("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 500 });
    await command("Page.navigate", { url: baseUrl });
    for (let attempt=0;attempt<100;attempt++) {
      if (await evaluate("document.readyState==='complete' && !!document.querySelector('.journey-art')")) break;
      await pause(50);
    }
    await evaluate("document.fonts.ready.then(()=>true)");
    await pause(100);
    const g = await evaluate(geometry);
    assert.equal(g.overflow, false, `${width}: overflow`);
    assert.equal(g.static, String(height < 560));
    results.push({width,height,...g});
    if (g.static === "true") {
      assert.equal(g.sticky, "static");
      await evaluate("document.querySelector('.care-journey').scrollIntoView({behavior:'instant'})");
      await capture(`${width}-static`);
      continue;
    }
    assert.ok(g.asideHeight+g.top<height, "Visual cabe abaixo do header");
    assert.ok(g.travel > height, "Percurso maior que uma viewport");
    const move = async p => {
      await evaluate(`scrollTo({top:${g.start+g.travel*p},behavior:'instant'})`);
      await pause();
      return evaluate(progress);
    };
    // Slow forward and reverse scroll, including every keyframe boundary.
    for (const p of [0,.1,.25,.49,.5,.51,.75,.9,1,.75,.5,.25,0]) {
      assert.ok(Math.abs(await move(p)-p)<.006, `Progresso reversível em ${width}, ${p}`);
      if ([0,.5,1].includes(p)) await capture(`${width}-${p}`);
    }
    // Fast jump and immediate reversal: observe real intermediate frames.
    const frames = await evaluate(`new Promise(resolve=>{
      const frames=[],start=performance.now();let reversed=false;
      scrollTo({top:${g.start+g.travel},behavior:'instant'});
      function sample(){const elapsed=performance.now()-start;
        if(elapsed>100&&!reversed){scrollTo({top:${g.start},behavior:'instant'});reversed=true;}
        frames.push({elapsed,p:${progress}});
        if(elapsed<650)requestAnimationFrame(sample);else resolve(frames);
      }requestAnimationFrame(sample);
    })`);
    assert.ok(frames.some(f=>f.p>.1&&f.p<.95), "Quadros intermediários no salto rápido");
    assert.ok(frames.every(f=>f.p>=0&&f.p<=1), "Sem overshoot");
    assert.ok(frames.at(-1).p<.006, "Reversão rápida chega ao início");
    results.at(-1).frames=frames;
    if (width === 1280) {
      await move(.3);
      const initial = await evaluate("scrollY");
      for (const deltaY of [35,35,35,650,-400,-355]) {
        await command("Input.dispatchMouseEvent", {type:"mouseWheel",x:700,y:500,deltaX:0,deltaY});
        await pause(100);
      }
      await pause();
      const actual = await evaluate("scrollY");
      assert.ok(Math.abs(actual-initial)<3, "Roda nativa reverte o deslocamento sem captura");
      assert.ok(Math.abs(await evaluate(progress)-(actual-g.start)/g.travel)<.006);
    }
  }
  // Same mounted component: orientation, text growth and live reduced-motion changes.
  await command("Emulation.setDeviceMetricsOverride", {width:390,height:844,deviceScaleFactor:1,mobile:true});
  await pause();
  assert.equal((await evaluate(geometry)).static,"false");
  await command("Emulation.setDeviceMetricsOverride", {width:844,height:390,deviceScaleFactor:1,mobile:true});
  await pause();
  assert.equal((await evaluate(geometry)).static,"true");
  await command("Emulation.setDeviceMetricsOverride", {width:1280,height:720,deviceScaleFactor:1,mobile:false});
  await pause();
  await evaluate("document.querySelector('.journey-note').style.fontSize='360px'");
  await pause();
  assert.equal((await evaluate(geometry)).static,"true", "Texto ampliado desativa sticky que não cabe");
  await evaluate("document.querySelector('.journey-note').style.fontSize=''");
  await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await pause();
  assert.equal((await evaluate(geometry)).static,"true");
  assert.equal(await evaluate(progress),0);
  await capture("reduced-motion");
  assert.deepEqual(exceptions,[]);
  await writeFile(".cache/scroll/metrics.json",JSON.stringify(results,null,2));
  console.log("PASS: 10 viewports, scroll lento/rápido/inverso, limites, orientação, texto ampliado e movimento reduzido.");
} finally { socket.close(); }
