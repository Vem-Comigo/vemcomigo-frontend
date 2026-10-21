import test from "node:test";
import assert from "node:assert/strict";
import {
  emptyContact,
  validateContact,
  sendContact,
} from "../src/lib/contact.ts";

const valid = {
  name: "Pessoa de teste",
  school: "Escola fictícia",
  role: "Docente",
  city: "Cidade / UF",
  email: "teste@example.org",
  phone: "",
  interest: "Formação de professores",
  message: "Mensagem fictícia para testes.",
};

test("formulário exige os campos institucionais e aceita telefone vazio", () => {
  assert.deepEqual(validateContact(valid), {});
  const errors = validateContact(emptyContact);
  assert.equal(Object.keys(errors).length, 7);
  assert.equal(errors.phone, undefined);
});
test("valida tamanho, e-mail, interesse e caracteres de cabeçalho", () => {
  assert.ok(validateContact({ ...valid, name: "a".repeat(101) }).name);
  assert.ok(
    validateContact({
      ...valid,
      email: "pessoa@example.org\r\nBcc: outra@example.org",
    }).email,
  );
  assert.ok(
    validateContact({ ...valid, interest: "adesão automática" }).interest,
  );
  assert.ok(validateContact({ ...valid, school: "Escola\nOutra" }).school);
  assert.ok(validateContact({ ...valid, message: "curta" }).message);
  assert.deepEqual(
    validateContact({ ...valid, message: "Mensagem com\nmais de uma linha." }),
    {},
  );
});
test("usa somente o endpoint local e não aceita resposta falsa de sucesso", async () => {
  await assert.rejects(
    sendContact(valid, "", async (url, options) => {
      assert.equal(url, "/api/contact");
      assert.equal(options.credentials, "same-origin");
      assert.equal(JSON.parse(options.body).email, valid.email);
      return Response.json({});
    }),
    /não confirmou/,
  );
  await assert.rejects(
    sendContact(
      valid,
      "",
      async () => new Response("<html>Fallback SPA</html>"),
    ),
    /não confirmou/,
  );
  await assert.doesNotReject(
    sendContact(valid, "", async () =>
      Response.json({ accepted: true }, { status: 202 }),
    ),
  );
});
test("mantém falhas de configuração, limite, provedor e rede como falhas", async () => {
  for (const status of [400, 403, 429, 502, 503])
    await assert.rejects(
      sendContact(valid, "", async () => Response.json({}, { status })),
    );
  await assert.rejects(
    sendContact(valid, "", async () => {
      throw new TypeError("Falha de rede");
    }),
    /conexão/,
  );
});
