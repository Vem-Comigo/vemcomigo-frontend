// Run against the dedicated local Edge/Chromium profile on CDP port 9222.
// Does not submit forms. Development-only fixtures are changed in memory then reloaded.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const baseUrl = process.env.QA_URL ?? "http://127.0.0.1:5173/";
const targets = await (await fetch("http://127.0.0.1:9222/json")).json();
const target = targets.find(t => t.type === "page" && (t.url === "about:blank" || t.url.startsWith(new URL(baseUrl).origin)));
assert.ok(target, "Abra o perfil dedicado de QA");
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener("open", resolve, { once: true }));
const pending = new Map();
let id = 0;
const exceptions = [];
ws.addEventListener("message", event => {
  const r = JSON.parse(event.data);
  if (r.id) { const p = pending.get(r.id); pending.delete(r.id); if (r.error) p.reject(r.error); else p.resolve(r.result); }
  if (r.method === "Runtime.exceptionThrown") exceptions.push(r.params.exceptionDetails.text);
});
function command(method, params = {}) { return new Promise((resolve, reject) => { const next = ++id; pending.set(next, { resolve, reject }); ws.send(JSON.stringify({ id: next, method, params })); }); }
async function evaluate(expression) {
  const r = await command("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
}
async function until(expression) { for (let n = 0; n < 140; n++) { if (await evaluate(expression)) return; await new Promise(r => setTimeout(r, 50)); } throw new Error(`Tempo esgotado: ${expression}`); }
async function press(key, code, windowsVirtualKeyCode, modifiers = 0) { for (const type of ["keyDown", "keyUp"]) await command("Input.dispatchKeyEvent", { type, key, code, windowsVirtualKeyCode, modifiers }); }
async function viewport(width, height) {
  await command("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  await command("Page.navigate", { url: baseUrl });
  await until("!!document.querySelector('.project-gallery') && document.readyState==='complete' && document.fonts.status==='loaded'");
  await evaluate("document.querySelector('#em-acao').scrollIntoView({behavior:'instant'})");
}
async function capture(name) {
  const r = await command("Page.captureScreenshot", { format: "png" });
  await writeFile(`.cache/gallery/${name}.png`, Buffer.from(r.data, "base64"));
}
async function openFirst() {
  await evaluate("document.querySelector('.record-open').focus();document.querySelector('.record-open').click()");
  await until("!!document.querySelector('dialog[open]')");
}
async function closeByButton() {
  await evaluate("document.querySelector('[aria-label=\"Fechar detalhes\"]').click()");
  await until("!document.querySelector('dialog')");
}
const evidence = [];
try {
  await mkdir(".cache/gallery", { recursive: true });
  await command("Page.enable");
  await command("Runtime.enable");
  await command("Emulation.setFocusEmulationEnabled", { enabled: true });
  await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  for (const [width, height] of [[360,800],[390,844],[844,390],[768,1024],[1024,768],[1366,768],[1920,1080],[2560,1440],[3840,2160]]) {
    await viewport(width, height);
    assert.equal(await evaluate("document.documentElement.scrollWidth>innerWidth"), false, `Overflow ${width}`);
    assert.equal(await evaluate("document.querySelectorAll('#em-acao').length"), 1);
    assert.equal(await evaluate("document.querySelectorAll('.action-record').length"), 5);
    assert.ok(await evaluate("!!document.querySelector('.navigation a[href=\"#em-acao\"]')"));
    await capture(`gallery-${width}`);
    if (width === 390 || width === 1920) {
      await evaluate("document.querySelector('.gallery-mosaic').scrollIntoView({behavior:'instant'})");
      await capture(`mosaic-${width}`);
    }
    if (width === 390 || width === 1920 || height === 390) {
      await openFirst();
      assert.equal(await evaluate("document.body.style.overflow"), "hidden");
      assert.equal(await evaluate("document.activeElement.getAttribute('aria-label')"), "Fechar detalhes");
      assert.equal(await evaluate("document.querySelector('dialog').scrollWidth>document.querySelector('dialog').clientWidth"), false);
      await capture(`dialog-${width}`);
      await press("Escape", "Escape", 27);
      await until("!document.querySelector('dialog')");
      assert.equal(await evaluate("document.activeElement.className"), "record-open");
      assert.equal(await evaluate("document.body.style.overflow"), "");
    }
    evidence.push({ width, height, overflow: false });
  }
  await viewport(1440, 1000);
  for (let index = 0; index < 6; index++) {
    await evaluate(`document.querySelectorAll('.gallery-filters button')[${index}].click()`);
    assert.equal(await evaluate("document.querySelectorAll('.action-record').length"), index === 0 ? 5 : 1);
    assert.equal(await evaluate("document.querySelectorAll('.gallery-filters button[aria-pressed=true]').length"), 1);
    const categories = await evaluate("[...document.querySelectorAll('.action-record .record-category')].map(e=>e.textContent)");
    if (index > 0) assert.equal(categories[0], await evaluate(`document.querySelectorAll('.gallery-filters button')[${index}].textContent`));
    if (index === 5) {
      await openFirst();
      assert.equal(await evaluate("document.querySelectorAll('.record-photo-controls').length"), 0);
      assert.equal(await evaluate("document.querySelectorAll('.record-metadata').length"), 0);
      await closeByButton();
    }
  }
  await evaluate("document.querySelector('.gallery-filters button').click()");
  const scrollBefore = await evaluate("scrollY");
  await openFirst();
  await evaluate("document.querySelector('#contato input').focus()");
  assert.equal(await evaluate("document.querySelector('dialog').contains(document.activeElement)"), true, "Background must be inert");
  await evaluate("document.querySelector('[aria-label=\"Próxima imagem\"]').focus()");
  for (let n = 0; n < 7; n++) { await press("Tab", "Tab", 9); assert.equal(await evaluate("document.querySelector('dialog').contains(document.activeElement)"), true, "Tab focus remains in dialog"); }
  await press("Tab", "Tab", 9, 8);
  assert.equal(await evaluate("document.querySelector('dialog').contains(document.activeElement)"), true);
  await press("ArrowRight", "ArrowRight", 39);
  assert.equal(await evaluate("document.querySelector('.record-photo-controls [role=status]').textContent"), "Imagem 2 de 2");
  await press("ArrowLeft", "ArrowLeft", 37);
  assert.equal(await evaluate("document.querySelector('.record-photo-controls [role=status]').textContent"), "Imagem 1 de 2");
  await command("Input.dispatchMouseEvent", { type: "mouseWheel", x: 5, y: 5, deltaX: 0, deltaY: 500 });
  assert.equal(await evaluate("scrollY"), scrollBefore, "Background scrolling stays locked");
  await closeByButton();
  assert.equal(await evaluate("document.activeElement.className"), "record-open");
  // Exercise future local images, long descriptions, missing image, and optional metadata.
  await evaluate(`(async()=>{const {projectRecords}=await import('/src/content/projectRecords.ts');const r=projectRecords[0];r.description='Descrição longa de teste. '.repeat(160);r.date='2026-10-27';r.location='Local de teste';r.images=[{src:'/images/vem-comigo-wordmark.png',alt:'Asset local usado somente no teste',caption:'Legenda de teste',width:225,height:110},{src:'/images/arquivo-ausente-qa.webp',alt:'Imagem ausente para teste',caption:'Fallback de teste',width:1200,height:800}];})()`);
  await openFirst();
  await until("document.querySelector('.record-dialog-media img')?.complete");
  assert.equal(await evaluate("document.querySelector('time').dateTime"), "2026-10-27");
  await evaluate("document.querySelector('[aria-label=\"Próxima imagem\"]').click()");
  await until("document.querySelector('.record-dialog-media .placeholder-label')?.textContent==='Imagem indisponível'");
  await evaluate("document.querySelector('dialog').scrollTop=document.querySelector('dialog').scrollHeight");
  assert.equal(await evaluate("document.querySelector('[aria-label=\"Fechar detalhes\"]').getBoundingClientRect().top>=0"), true);
  await capture("dialog-long-description");
  for (const [width, height] of [[390,844],[844,390]]) {
    await command("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
    await evaluate("document.querySelector('dialog').scrollTop=document.querySelector('dialog').scrollHeight");
    assert.equal(await evaluate("document.querySelector('dialog').scrollWidth>document.querySelector('dialog').clientWidth"), false);
    assert.equal(await evaluate("document.querySelector('[aria-label=\"Fechar detalhes\"]').getBoundingClientRect().top>=0"), true);
    await capture(`long-description-${width}`);
  }
  await closeByButton();
  await command("Emulation.setTouchEmulationEnabled", { enabled: true });
  await evaluate("document.querySelector('.record-open').scrollIntoView({behavior:'instant',block:'center'})");
  const touchPoint = await evaluate("(()=>{const r=document.querySelector('.record-open').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()");
  await command("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [touchPoint] });
  await command("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await until("!!document.querySelector('dialog[open]')");
  await closeByButton();
  await command("Emulation.setTouchEmulationEnabled", { enabled: false });
  await evaluate("import('/src/content/projectRecords.ts').then(({projectRecords})=>{projectRecords[0].demo=false})");
  await evaluate("document.querySelectorAll('.gallery-filters button')[1].click()");
  assert.equal(await evaluate("document.querySelector('.gallery-demo-note').textContent.includes('reúne registros')"), true);
  await evaluate("import('/src/content/projectRecords.ts').then(({projectRecords})=>projectRecords.forEach(r=>{r.demo=false}))");
  await evaluate("document.querySelector('.gallery-filters button').click()");
  assert.equal(await evaluate("document.querySelector('.gallery-demo-note')===null"), true, "Preparação sai automaticamente ao substituir todos os exemplos");
  // Reload removes all in-memory fixtures. Check normal motion frame by frame.
  await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });
  await viewport(1440, 1000);
  await evaluate("document.querySelectorAll('.gallery-filters button')[2].click()");
  const frames = await evaluate(`new Promise(resolve=>{const start=performance.now(),frames=[];function frame(){const s=getComputedStyle(document.querySelector('.action-record'));frames.push({opacity:s.opacity,transform:s.transform});if(performance.now()-start<650)requestAnimationFrame(frame);else resolve(frames)}frame()})`);
  assert.ok(new Set(frames.map(f=>f.transform)).size > 2, "Filter transition has intermediate frames");
  await openFirst();
  await evaluate("document.querySelector('[aria-label=\"Fechar detalhes\"]').click()");
  assert.equal(await evaluate("document.querySelector('dialog')?.dataset.closing"), "true");
  await until("!document.querySelector('dialog')");
  assert.equal(await evaluate("document.activeElement.className"), "record-open");
  await writeFile(".cache/gallery/frames.json", JSON.stringify(frames));
  await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  assert.equal(await evaluate("[...document.querySelectorAll('.action-record')].every(e=>getComputedStyle(e).animationName==='none')"), true);
  assert.deepEqual(exceptions, []);
  await writeFile(".cache/gallery/metrics.json", JSON.stringify(evidence, null, 2));
  console.log("PASS: 9 telas, seis filtros, modais, foco/Tab/Escape, múltiplas imagens, fallback, descrição longa, metadados opcionais, animação entre quadros e movimento reduzido. Sem envio de formulário.");
} finally { ws.close(); }
