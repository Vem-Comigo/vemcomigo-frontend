export const interests = [
  "Formação de professores",
  "Conhecer as CCAs",
  "Participação da escola",
  "Outros assuntos institucionais",
] as const;
export const limits = {
  name: 100,
  school: 160,
  role: 100,
  city: 120,
  email: 254,
  phone: 25,
  interest: 50,
  message: 3000,
} as const;
export type ContactData = Record<keyof typeof limits, string>;
export type ContactErrors = Partial<Record<keyof ContactData, string>>;
export const emptyContact: ContactData = {
  name: "",
  school: "",
  role: "",
  city: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};

export function validateContact(data: ContactData): ContactErrors {
  const errors: ContactErrors = {};
  for (const key of Object.keys(limits) as (keyof ContactData)[]) {
    const value = data[key].trim();
    if (key !== "phone" && !value) errors[key] = "Preencha este campo.";
    else if (value.length > limits[key])
      errors[key] = `Use até ${limits[key]} caracteres.`;
    else if (
      Array.from(value).some((char) => {
        const code = char.charCodeAt(0);
        return (
          code === 127 ||
          (code < 32 && !(key === "message" && [9, 10, 13].includes(code)))
        );
      })
    )
      errors[key] = "Remova os caracteres inválidos.";
  }
  if (data.name.trim() && data.name.trim().length < 2)
    errors.name = "Informe seu nome com pelo menos 2 caracteres.";
  if (
    data.email &&
    !/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(data.email.trim())
  )
    errors.email = "Informe um e-mail válido.";
  if (data.phone && !/^\+?[\d\s().-]{8,25}$/.test(data.phone.trim()))
    errors.phone = "Informe um telefone válido, com DDD.";
  if (data.interest && !interests.some((value) => value === data.interest))
    errors.interest = "Selecione um interesse da lista.";
  if (data.message.trim() && data.message.trim().length < 10)
    errors.message = "Escreva pelo menos 10 caracteres.";
  return errors;
}

export async function sendContact(
  data: ContactData,
  website: string,
  request: typeof fetch = fetch,
): Promise<void> {
  let response: Response;
  try {
    response = await request("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ ...data, website }),
      signal: AbortSignal.timeout(15000),
    });
  } catch {
    throw new Error(
      "Não foi possível confirmar o envio. Verifique sua conexão antes de tentar novamente.",
    );
  }
  if (response.status === 503)
    throw new Error(
      "O contato por formulário está temporariamente indisponível. Sua mensagem não foi enviada. Tente novamente mais tarde.",
    );
  if (response.status === 429)
    throw new Error(
      "Muitas tentativas em pouco tempo. Aguarde alguns minutos antes de tentar novamente.",
    );
  if (!response.ok)
    throw new Error(
      "Não foi possível confirmar o envio. Confira os campos e tente novamente mais tarde.",
    );
  const result: unknown = await response.json().catch(() => null);
  if (
    !result ||
    typeof result !== "object" ||
    !("accepted" in result) ||
    result.accepted !== true
  )
    throw new Error(
      "O serviço não confirmou o envio. Sua mensagem foi mantida para uma nova tentativa.",
    );
}
