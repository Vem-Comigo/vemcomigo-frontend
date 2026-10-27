// Dedicated Edge/Chromium profile on port 9222, same setup as responsive-qa.mjs.
// Observes live animation frames; all contact requests are intercepted locally.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const baseUrl = process.env.QA_URL ?? "http://127.0.0.1:5173/";
const targets = await (await fetch("http://127.0.0.1:9222/json")).json();
const target = targets.find(t => t.type === "page" && (t.url === "about:blank" || t.url.startsWith(new URL(baseUrl).origin)));
assert.ok(target, "Abra o perfil dedicado de QA");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener("open", resolve, { once: true }));
let sequence = 0;
const pending = new Map();
const exceptions = [];
const requests = [];
let mockStatus = 200;
socket.addEventListener("message", async event => {
  const response = JSON.parse(event.data);
  if (response.id) {
    const task = pending.get(response.id);
    pending.delete(response.id);
    if (response.error) task.reject(new Error(JSON.stringify(response.error)));
    else task.resolve(response.result);
  }
  if (response.method === "Runtime.exceptionThrown") exceptions.push(response.params.exceptionDetails.text);
  if (response.method === "Fetch.requestPaused") {
    requests.push(response.params.request.url);
    // Delay the mock to verify sending/disabled state and duplicate prevention.
    await new Promise(resolve => setTimeout(resolve, 300));
    await command("Fetch.fulfillRequest", { requestId: response.params.requestId, responseCode: mockStatus,
      responseHeaders: [{ name: "Content-Type", value: "application/json" }],
      body: Buffer.from(JSON.stringify({ accepted: mockStatus === 200 })).toString("base64") });
  }
});
function command(method, params = {}) {
  return new Promise((resolve, reject) => { const id = ++sequence; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params })); });
}
async function evaluate(expression) {
  const result = await command("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function until(expression) {
  for (let i = 0; i < 120; i++) { if (await evaluate(expression)) return; await new Promise(resolve => setTimeout(resolve, 50)); }
  throw new Error(`Tempo esgotado: ${expression}`);
}
async function press(key, code, windowsVirtualKeyCode) {
  for (const type of ["keyDown", "keyUp"]) await command("Input.dispatchKeyEvent", { type, key, code, windowsVirtualKeyCode });
}
async function capture(name) {
  const result = await command("Page.captureScreenshot", { format: "png" });
  await writeFile(`.cache/motion/${name}.png`, Buffer.from(result.data, "base64"));
}
const evidence = {};
try {
  await mkdir(".cache/motion", { recursive: true });
  await command("Runtime.enable");
  await command("Page.enable");
  await command("Emulation.setFocusEmulationEnabled", { enabled: true });
  await command("Fetch.enable", { patterns: [{ urlPattern: "*/api/contact*", requestStage: "Request" }] });
  await command("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });
  await command("Page.navigate", { url: baseUrl });
  await until("!!document.querySelector('.animated-word')");
  evidence.heroFrames = await evaluate(`new Promise(resolve => {
    const frames = []; const start = performance.now();
    function sample() { const e = document.querySelector('.animated-word'); const s = getComputedStyle(e); frames.push({time:performance.now()-start, opacity:s.opacity, transform:s.transform});
      if(performance.now()-start<800) requestAnimationFrame(sample); else resolve(frames); } sample(); })`);
  assert.ok(new Set(evidence.heroFrames.map(f => f.transform)).size > 2, "Título deve mudar entre quadros reais");
  assert.equal(evidence.heroFrames.at(-1).opacity, "1");
  await capture("hero");
  // Verify the coordinated entry has ended quickly, with no indefinite animations.
  assert.equal(await evaluate("document.getAnimations().some(a=>a.effect.getTiming().iterations===Infinity)"), false);
  await evaluate("document.querySelector('.contact-cta').focus()");
  evidence.focusTransform = await evaluate("new Promise(r=>setTimeout(()=>r(getComputedStyle(document.querySelector('.contact-cta-arrow')).transform),300))");
  assert.notEqual(evidence.focusTransform, "none");
  await press("Enter", "Enter", 13);
  await until("location.hash==='#contato'");
  for (let index = 0; index < 3; index++) {
    await evaluate(`document.querySelector('#cuidado-${index}').scrollIntoView({behavior:'instant',block:'center'})`);
    await until(`document.querySelector('.journey-nav a[aria-current]').getAttribute('href')==='#cuidado-${index}'`);
    evidence[`step${index}`] = await evaluate(`new Promise(resolve=>{ const frames=[]; const start=performance.now();function sample(){frames.push(getComputedStyle(document.querySelector('.journey-art')).backgroundColor);if(performance.now()-start<850) requestAnimationFrame(sample);else resolve(frames)} sample()})`);
    if (index > 0) assert.ok(new Set(evidence[`step${index}`]).size > 2, "Transição deve ter quadros intermediários");
    await capture(`step-${index}`);
  }
  // Native Tab + Enter navigates the narrative, without treating panels as tabs.
  await evaluate("document.querySelector('.journey-nav a').focus()");
  await press("Tab", "Tab", 9);
  assert.equal(await evaluate("document.activeElement.hash"), "#cuidado-1");
  await press("Enter", "Enter", 13);
  await until("location.hash==='#cuidado-1'");
  await evaluate(`(() => { const values={name:'Pessoa de teste',school:'Escola de teste',role:'Docente',city:'Brasília / DF',email:'teste@example.com',message:'Teste local com envio interceptado.'};
    for(const [id,value] of Object.entries(values)){const e=document.getElementById(id);Object.getOwnPropertyDescriptor(e.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,'value').set.call(e,value);e.dispatchEvent(new Event('input',{bubbles:true}));}
    const select=document.getElementById('interest');Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,'value').set.call(select,select.options[1].value);select.dispatchEvent(new Event('change',{bubbles:true})); })()`);
  mockStatus = 503;
  await evaluate("document.querySelector('form').requestSubmit();document.querySelector('form').requestSubmit()");
  await until("document.querySelector('form').getAttribute('aria-busy')==='true'");
  assert.equal(await evaluate("document.querySelector('fieldset').disabled"), true);
  await until("document.querySelector('.form-status.error')?.textContent.includes('temporariamente')");
  assert.equal(requests.length, 1);
  assert.equal(await evaluate("document.getElementById('name').value"), "Pessoa de teste");
  mockStatus = 200;
  await evaluate("document.querySelector('form').requestSubmit()");
  await until("!!document.querySelector('.form-status.success')");
  assert.equal(await evaluate("document.getElementById('name').value"), "");
  evidence.mockRequests = requests.length;
  await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  assert.equal(await evaluate("[...document.querySelectorAll('main *')].some(e=>getComputedStyle(e).animationName!=='none')"), false);
  for (const [width, height] of [[390,844],[844,390],[768,1024],[1920,600]]) {
    await command("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
    assert.equal(await evaluate("getComputedStyle(document.querySelector('.journey-aside')).display"), "none");
    assert.equal(await evaluate("document.documentElement.scrollWidth>innerWidth"), false);
  }
  await command("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await command("Emulation.setTouchEmulationEnabled", { enabled: true });
  await evaluate("document.querySelector('.contact-cta').scrollIntoView({behavior:'instant',block:'center'})");
  const point = await evaluate("(()=>{const r=document.querySelector('.contact-cta').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()");
  await command("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [point] });
  await command("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await until("location.hash==='#contato'");
  // Simulate failure of enhancement/observer: no content relies on hidden base styles.
  await evaluate("document.querySelectorAll('.is-visible').forEach(e=>e.classList.remove('is-visible'))");
  assert.equal(await evaluate("[...document.querySelectorAll('.journey-step,.approach-item,.animated-word')].every(e=>getComputedStyle(e).opacity==='1')"), true);
  assert.deepEqual(exceptions, []);
  await writeFile(".cache/motion/frames.json", JSON.stringify(evidence, null, 2));
  console.log("PASS: quadros animados, três etapas, teclado, fallback, movimento reduzido e envio mockado (503 → 200). Nenhum e-mail real.");
} finally {
  await command("Fetch.disable");
  await command("Emulation.setTouchEmulationEnabled", { enabled: false });
  socket.close();
}
