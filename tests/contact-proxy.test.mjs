import test from "node:test";
import assert from "node:assert/strict";
import { createServer, request as httpRequest } from "node:http";
import { once } from "node:events";
import { createContactProxy } from "../server/contact-proxy.ts";

const config = {
  endpoint: "https://api.example.invalid/api/contact",
  origin: "https://portal.example.invalid",
  proxyKey: "fictitious-test-secret-with-at-least-32-characters",
  onVercel: true,
  helpersDisabled: true,
};
const valid = {
  name: "Pessoa Fictícia",
  school: "Escola Exemplo",
  role: "Docente",
  city: "Cidade / UF",
  email: "teste@example.invalid",
  phone: "",
  interest: "Formação de professores",
  message: "Mensagem fictícia para testes.",
  website: "",
};

async function withProxy(options, mock, run) {
  const handler = createContactProxy({ ...config, ...options }, mock);
  const server = createServer((req, res) => {
    void handler(req, res);
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const endpoint = `http://127.0.0.1:${server.address().port}/api/contact`;
  const send = (body = valid, headers = {}, method = "POST") =>
    fetch(endpoint, {
      method,
      headers: {
        Origin: config.origin,
        "Content-Type": "application/json",
        "x-vercel-forwarded-for": "192.0.2.1",
        ...headers,
      },
      ...(method === "GET"
        ? {}
        : { body: typeof body === "string" ? body : JSON.stringify(body) }),
    });
  try {
    await run(send, endpoint);
  } finally {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
}
test("proxy usa URL fixa, segredo privado e identificador sem IP bruto", async () => {
  let calls = 0;
  await withProxy(
    {},
    async (url, options) => {
      calls++;
      assert.equal(url, config.endpoint);
      assert.equal(options.headers["x-contact-proxy-key"], config.proxyKey);
      assert.equal(options.headers.Origin, config.origin);
      assert.match(options.headers["x-contact-client-id"], /^[a-f0-9]{64}$/);
      assert.ok(!options.headers["x-contact-client-id"].includes("192.0.2.1"));
      assert.equal(options.redirect, "error");
      assert.deepEqual(JSON.parse(options.body), valid);
      return Response.json({ accepted: true }, { status: 202 });
    },
    async (send) => {
      const response = await send();
      assert.equal(response.status, 202);
      assert.deepEqual(await response.json(), { accepted: true });
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal(response.headers.get("access-control-allow-origin"), null);
    },
  );
  assert.equal(calls, 1);
});
test("configuração ausente, insegura ou helpers ativos falha sem chamada externa", async () => {
  for (const options of [
    { endpoint: "" },
    { proxyKey: "" },
    { endpoint: "http://api.example.invalid/api/contact" },
    { endpoint: "https://api.example.invalid/api/contact?to=outro" },
    { origin: config.origin + "/" },
    { helpersDisabled: false },
  ]) {
    await withProxy(
      options,
      async () => {
        assert.fail("Não deve chamar serviço");
      },
      async (send) => assert.equal((await send()).status, 503),
    );
  }
});
test("rejeita origem, método, formato, JSON e IP não confiáveis", async () => {
  await withProxy(
    {},
    async () => {
      assert.fail("Não deve chamar serviço");
    },
    async (send) => {
      assert.equal(
        (await send(valid, { Origin: "https://externo.example.invalid" }))
          .status,
        403,
      );
      assert.equal((await send(valid, { Origin: "" })).status, 403);
      assert.equal((await send(undefined, {}, "GET")).status, 405);
      assert.equal(
        (await send(valid, { "Content-Type": "text/plain" })).status,
        415,
      );
      assert.equal((await send("{")).status, 400);
      assert.equal((await send("[]")).status, 400);
      assert.equal(
        (
          await send(valid, {
            "x-vercel-forwarded-for": "192.0.2.1, 203.0.113.1",
          })
        ).status,
        503,
      );
    },
  );
});
test("limita tamanho com Content-Length e com envio chunked", async () => {
  await withProxy(
    {},
    async () => {
      assert.fail("Não deve chamar serviço");
    },
    async (send, endpoint) => {
      assert.equal(
        (await send({ ...valid, message: "x".repeat(20000) })).status,
        413,
      );
      const status = await new Promise((resolve, reject) => {
        const req = httpRequest(
          endpoint,
          {
            method: "POST",
            headers: {
              Origin: config.origin,
              "Content-Type": "application/json",
              "x-vercel-forwarded-for": "192.0.2.1",
              "Transfer-Encoding": "chunked",
            },
          },
          (res) => {
            res.resume();
            res.on("end", () => resolve(res.statusCode));
          },
        );
        req.on("error", reject);
        req.write('{"message":"');
        req.write("x".repeat(20000));
        req.end('"}');
      });
      assert.equal(status, 413);
    },
  );
});
test("respostas falsas, falhas e timeout do upstream não geram sucesso nem expõem detalhes", async () => {
  for (const response of [
    Response.json({ accepted: true }),
    Response.json({}, { status: 202 }),
    new Response("<html>SPA fallback</html>"),
    Response.json({ error: "privado" }, { status: 500 }),
  ]) {
    await withProxy(
      {},
      async () => response,
      async (send) => {
        const result = await send();
        assert.equal(result.status, 502);
        assert.doesNotMatch(await result.text(), /privado|accepted/);
      },
    );
  }
  await withProxy(
    {},
    async () => {
      throw new DOMException("Erro privado", "TimeoutError");
    },
    async (send) => {
      const response = await send();
      assert.equal(response.status, 502);
      assert.doesNotMatch(await response.text(), /privado/);
    },
  );
});
test("propaga limites e indisponibilidade sem ecoar corpo do backend", async () => {
  await withProxy(
    {},
    async () =>
      Response.json(
        { error: "segredo" },
        { status: 429, headers: { "Retry-After": "123" } },
      ),
    async (send) => {
      const response = await send();
      assert.equal(response.status, 429);
      assert.equal(response.headers.get("retry-after"), "123");
      assert.doesNotMatch(await response.text(), /segredo/);
    },
  );
  await withProxy(
    {},
    async () =>
      Response.json({ error: "configuração interna" }, { status: 503 }),
    async (send) => {
      assert.equal((await send()).status, 503);
    },
  );
});
test("fora da Vercel usa o socket e ignora cabeçalhos de IP forjados", async () => {
  const identities = [];
  await withProxy(
    { onVercel: false },
    async (_url, options) => {
      identities.push(options.headers["x-contact-client-id"]);
      return Response.json({ accepted: true }, { status: 202 });
    },
    async (send) => {
      await send(valid, { "x-vercel-forwarded-for": "192.0.2.1" });
      await send(valid, { "x-vercel-forwarded-for": "203.0.113.1" });
    },
  );
  assert.equal(identities[0], identities[1]);
});
