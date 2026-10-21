// QA local via Chromium/Edge já aberto com --remote-debugging-port=9222.
// Não envia formulários nem acessa serviços externos.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const stage = process.argv[2] ?? "after";
if (!["before", "after"].includes(stage))
  throw new Error("Use before ou after.");
const baseUrl = process.env.QA_URL ?? "http://127.0.0.1:5173/";
const directory = resolve(".cache/responsiveness", stage);
await mkdir(directory, { recursive: true });
const targets = await (await fetch("http://127.0.0.1:9222/json")).json();
const target = targets.find(
  (target) =>
    target.type === "page" &&
    (target.url === "about:blank" ||
      target.url.startsWith(new URL(baseUrl).origin)),
);
if (!target)
  throw new Error("Abra uma aba about:blank no navegador dedicado de QA.");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve) =>
  socket.addEventListener("open", resolve, { once: true }),
);
const pending = new Map();
let sequence = 0;
const exceptions = [];
const heldFonts = [];
socket.addEventListener("message", (event) => {
  const response = JSON.parse(event.data);
  if (response.id) {
    const promise = pending.get(response.id);
    pending.delete(response.id);
    if (response.error)
      promise.reject(new Error(JSON.stringify(response.error)));
    else promise.resolve(response.result);
  }
  if (response.method === "Runtime.exceptionThrown")
    exceptions.push(response.params.exceptionDetails.text);
  if (response.method === "Fetch.requestPaused")
    heldFonts.push(response.params.requestId);
});
function command(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const response = await command("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (response.exceptionDetails)
    throw new Error(JSON.stringify(response.exceptionDetails));
  return response.result.value;
}
async function settle() {
  await evaluate(
    "new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve(true))))",
  );
}
async function press(key, code, windowsVirtualKeyCode, text = "") {
  await command("Input.dispatchKeyEvent", {
    type: "keyDown",
    key,
    code,
    windowsVirtualKeyCode,
    text,
  });
  await command("Input.dispatchKeyEvent", {
    type: "keyUp",
    key,
    code,
    windowsVirtualKeyCode,
  });
}
async function until(expression) {
  for (let attempt = 0; attempt < 100; attempt++) {
    if (await evaluate(expression)) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error(`Tempo esgotado: ${expression}`);
}
async function viewport(width, height) {
  await command("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await command("Page.navigate", { url: baseUrl });
  await until(
    "document.readyState === 'complete' && !!document.querySelector('h1') && document.fonts.status === 'loaded'",
  );
  await evaluate("document.fonts.ready.then(() => true)");
  await evaluate("scrollTo(0, 0)");
}
async function capture(name, full = false) {
  const options = { format: "png", captureBeyondViewport: full };
  if (full) {
    const { cssContentSize } = await command("Page.getLayoutMetrics");
    options.clip = {
      x: 0,
      y: 0,
      width: cssContentSize.width,
      height: cssContentSize.height,
      scale: 1,
    };
  }
  const result = await command("Page.captureScreenshot", options);
  await writeFile(
    join(directory, `${name}.png`),
    Buffer.from(result.data, "base64"),
  );
}
async function metrics() {
  return evaluate(`(() => {
    const rect = selector => { const r = document.querySelector(selector).getBoundingClientRect(); return { top:r.top, bottom:r.bottom, height:r.height, width:r.width }; };
    return { width:innerWidth, height:innerHeight, overflow:document.documentElement.scrollWidth>innerWidth, header:rect('header'), hero:rect('.hero'), next:rect('#projeto'), heading:rect('h1'), image:rect('.community-art'), container:rect('.hero-grid'), h1Font:getComputedStyle(document.querySelector('h1')).fontSize,
      outside:[...document.querySelectorAll('main *,header *,footer *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0 && (r.right>innerWidth+1 || r.left< -1) && getComputedStyle(e).position!=='absolute'}).map(e=>({tag:e.tagName,class:e.className?.baseVal??e.className})).slice(0,12) };
  })()`);
}
await command("Runtime.enable");
await command("Page.enable");
await command("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-motion", value: "reduce" }],
});
const sizes = [
  [360, 800],
  [390, 844],
  [844, 390],
  [768, 1024],
  [1024, 768],
  [1280, 720],
  [1366, 768],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
  [3840, 2160],
];
const results = [];
try {
  for (const [width, height] of sizes) {
    await viewport(width, height);
    const result = await metrics();
    await capture(`${width}x${height}`);
    if (width === 1920 || width === 390)
      await capture(`${width}x${height}-full`, true);
    results.push(result);
    if (stage === "after")
      assert.equal(
        result.overflow,
        false,
        `Rolagem horizontal em ${width}×${height}`,
      );
    if (stage === "after") {
      assert.ok(
        Math.abs(result.image.width / result.image.height - 560 / 500) < 0.01,
        "Proporção da ilustração",
      );
      if (width >= 1024 && width <= 2560)
        assert.ok(
          Math.abs(result.hero.bottom - height) < 2,
          `Abertura distante da dobra em ${width}×${height}`,
        );
    }
  }
  await viewport(844, 390);
  await evaluate("document.querySelector('.menu-toggle').click()");
  await until(
    "document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true'",
  );
  const menu = await evaluate(
    "(() => {const e=document.querySelector('.navigation'),r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,scrollHeight:e.scrollHeight,clientHeight:e.clientHeight,overflow:getComputedStyle(e).overflowY,horizontal:e.scrollWidth>e.clientWidth,links:[...e.querySelectorAll('a')].map(a=>a.getBoundingClientRect().top)};})()",
  );
  await capture("landscape-menu");
  results.push({ state: "landscape-menu", ...menu });
  if (stage === "after") {
    assert.ok(menu.bottom <= 390, "Menu cortado em orientação horizontal");
    assert.equal(menu.horizontal, false, "Menu com rolagem horizontal");
    assert.ok(
      menu.links.every(
        (top, index, links) => index === 0 || top > links[index - 1],
      ),
      "Ordem vertical do menu",
    );
    await evaluate("document.querySelector('.menu-toggle').focus()");
    const destinations = await evaluate(
      "[...document.querySelectorAll('.navigation a')].map(a=>a.getAttribute('href'))",
    );
    for (const destination of destinations) {
      await press("Tab", "Tab", 9);
      assert.equal(
        await evaluate("document.activeElement.getAttribute('href')"),
        destination,
        "Ordem de Tab no menu",
      );
    }
    assert.equal(
      await evaluate(
        "document.activeElement.getBoundingClientRect().bottom<=innerHeight",
      ),
      true,
      "Último link inacessível no menu",
    );
    await command("Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "Escape",
      code: "Escape",
      windowsVirtualKeyCode: 27,
    });
    await command("Input.dispatchKeyEvent", {
      type: "keyUp",
      key: "Escape",
      code: "Escape",
      windowsVirtualKeyCode: 27,
    });
    await until(
      "document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='false'",
    );
    assert.equal(
      await evaluate("document.activeElement.className"),
      "menu-toggle",
    );
  }
  await viewport(390, 844);
  if (stage === "after") {
    await evaluate("document.querySelector('.faq-list summary').focus()");
    await press("Enter", "Enter", 13, "\r");
    await until("document.querySelector('.faq-list details').open");
    await press("Enter", "Enter", 13, "\r");
    await until("!document.querySelector('.faq-list details').open");
  }
  await evaluate(
    "document.querySelectorAll('details').forEach(e=>e.open=true);document.querySelector('form').requestSubmit()",
  );
  await until("!!document.querySelector('[aria-invalid=true]')");
  assert.equal(await evaluate("document.activeElement.id"), "name");
  assert.equal((await metrics()).overflow, false);
  await capture("mobile-form-errors", true);
  await evaluate("document.querySelector('#perguntas').scrollIntoView()");
  await capture("mobile-faq");
  assert.equal(
    await evaluate(
      "getComputedStyle(document.querySelector('.art-bubble')).animationName",
    ),
    "none",
  );
  // Refluxo equivalente a zoom: não é alteração do zoom nativo do navegador.
  for (const [baseWidth, baseHeight] of [
    [1920, 1080],
    [1366, 768],
  ]) {
    for (const zoom of [1.25, 1.5, 2]) {
      await viewport(
        Math.floor(baseWidth / zoom),
        Math.floor(baseHeight / zoom),
      );
      const result = await metrics();
      results.push({
        state: "zoom-equivalent",
        baseWidth,
        baseHeight,
        zoom,
        ...result,
      });
      await capture(`zoom-equivalent-${baseWidth}-${zoom}`);
      if (stage === "after") assert.equal(result.overflow, false);
    }
  }
  // Amplia apenas o texto em 200%, preservando dimensões originais dos desenhos.
  for (const [width, height] of [
    [390, 844],
    [1280, 720],
  ]) {
    await viewport(width, height);
    await evaluate(
      `(() => { const elements=[...document.querySelectorAll('body *')].filter(e=>e.namespaceURI==='http://www.w3.org/1999/xhtml'&&([...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())||['INPUT','TEXTAREA','SELECT'].includes(e.tagName)));const sizes=elements.map(e=>parseFloat(getComputedStyle(e).fontSize));elements.forEach((e,i)=>e.style.fontSize=sizes[i]*2+'px'); })()`,
    );
    await settle();
    const result = await metrics();
    results.push({ state: "text-200-percent", ...result });
    await capture(`text-200-${width}`);
    if (width === 390) await capture("text-200-mobile-full", true);
    if (stage === "after")
      assert.equal(result.overflow, false, `Texto 200% em ${width}`);
    if (stage === "after") {
      await evaluate("document.querySelector('#formacao').scrollIntoView()");
      assert.equal(
        await evaluate(
          "document.querySelector('#formacao h2').getBoundingClientRect().top>=document.querySelector('header').getBoundingClientRect().bottom",
        ),
        true,
        "Âncora com texto ampliado",
      );
    }
  }
  if (stage === "after") {
    for (const [width, height] of [
      [390, 844],
      [844, 390],
      [1024, 768],
      [1920, 1080],
    ]) {
      await viewport(width, height);
      for (const target of [
        "#projeto",
        "#atuacao",
        "#formacao",
        "#ccas",
        "#contato",
      ]) {
        await evaluate(
          `document.querySelector(${JSON.stringify(target)}).scrollIntoView()`,
        );
        const visible = await evaluate(
          `document.querySelector(${JSON.stringify(target + " h2")}).getBoundingClientRect().top>=document.querySelector('header').getBoundingClientRect().bottom`,
        );
        assert.equal(
          visible,
          true,
          `Título escondido ${target} em ${width}×${height}`,
        );
        if (width === 390 || width === 1920)
          await capture(`${width}-${target.slice(1)}`);
      }
    }
    assert.deepEqual(exceptions, []);
  }
  // Carregamento frio com rede simulada: observar fontes, imagens e deslocamentos.
  await command("Page.addScriptToEvaluateOnNewDocument", {
    source:
      "window.__qaShifts=[];new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)window.__qaShifts.push(entry.value)}).observe({type:'layout-shift',buffered:true});",
  });
  await command("Network.enable");
  await command("Network.setCacheDisabled", { cacheDisabled: true });
  await command("Fetch.enable", {
    patterns: [
      { urlPattern: "*.ttf*", resourceType: "Font", requestStage: "Request" },
    ],
  });
  await command("Network.emulateNetworkConditions", {
    offline: false,
    latency: 100,
    downloadThroughput: 500000,
    uploadThroughput: 500000,
  });
  await command("Emulation.setDeviceMetricsOverride", {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await command("Page.navigate", { url: baseUrl });
  await until(
    "!!document.querySelector('.hero-grid') && !!document.querySelector('header img')",
  );
  const loading = await metrics();
  const fontState = await evaluate("document.fonts.status");
  await capture("cold-loading");
  // Desativar a interceptação libera também as requisições ainda pausadas;
  // preloads cancelados pelo navegador não precisam ser retomados individualmente.
  await command("Fetch.disable");
  await until(
    "document.readyState==='complete' && document.fonts.status==='loaded' && [...document.images].every(i=>i.complete&&i.naturalWidth>0)",
  );
  await settle();
  const loaded = await metrics();
  const shifts = await evaluate("window.__qaShifts");
  results.push({
    state: "cold-load",
    width: 1920,
    height: 1080,
    fontState,
    fontRequestsHeld: heldFonts.length,
    heroBefore: loading.hero.bottom,
    heroAfter: loaded.hero.bottom,
    imageRatio: loaded.image.width / loaded.image.height,
    layoutShiftTotal: shifts.reduce((total, value) => total + value, 0),
  });
  await capture("cold-loaded");
  if (stage === "after") assert.equal(loaded.overflow, false);
  await command("Network.emulateNetworkConditions", {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1,
  });
  await command("Network.setCacheDisabled", { cacheDisabled: false });
  await writeFile(
    join(directory, "metrics.json"),
    JSON.stringify(results, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        stage,
        directory,
        viewports: results.map((r) => ({
          state: r.state ?? "viewport",
          size: `${r.width ?? 844}×${r.height ?? 390}`,
          overflow: r.overflow,
          heroBottom: r.hero?.bottom,
          menuBottom: r.bottom,
        })),
        passed: stage === "after",
      },
      null,
      2,
    ),
  );
} finally {
  await Promise.allSettled([
    command("Fetch.disable"),
    command("Network.setCacheDisabled", { cacheDisabled: false }),
    command("Network.emulateNetworkConditions", {
      offline: false,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1,
    }),
  ]);
  socket.close();
}
