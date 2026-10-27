import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowUpRight, HeartHandshake } from "lucide-react";
import { TextAnimate } from "./motion/TextAnimate";
import {
  emptyContact,
  interests,
  limits,
  sendContact,
  validateContact,
} from "../lib/contact";
import type { ContactData, ContactErrors } from "../lib/contact";

const fields: {
  name: keyof ContactData;
  label: string;
  type?: string;
  autoComplete?: string;
}[] = [
  { name: "name", label: "Seu nome", autoComplete: "name" },
  { name: "school", label: "Escola", autoComplete: "organization" },
  {
    name: "role",
    label: "Cargo ou função",
    autoComplete: "organization-title",
  },
  { name: "city", label: "Cidade / UF", autoComplete: "address-level2" },
  { name: "email", label: "E-mail", type: "email", autoComplete: "email" },
  {
    name: "phone",
    label: "Telefone (opcional)",
    type: "tel",
    autoComplete: "tel",
  },
];

export function ContactSection() {
  const [data, setData] = useState<ContactData>({ ...emptyContact });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const inFlight = useRef(false);
  const update = (name: keyof ContactData, value: string) => {
    setData((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    if (status !== "sending") {
      setStatus("idle");
      setMessage("");
    }
  };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const validation = validateContact(data);
    setErrors(validation);
    if (Object.keys(validation).length) {
      setStatus("error");
      setMessage("Revise os campos indicados antes de enviar.");
      const first = Object.keys(validation)[0];
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    setMessage("Enviando sua mensagem…");
    const website = String(
      new FormData(event.currentTarget).get("website") ?? "",
    );
    try {
      await sendContact(data, website);
      setStatus("success");
      setMessage(
        "Mensagem aceita pelo serviço para envio à equipe. Obrigado por iniciar essa conversa!",
      );
      setData({ ...emptyContact });
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível confirmar o envio. Tente novamente mais tarde.",
      );
    } finally {
      inFlight.current = false;
    }
  }
  return (
    <section
      id="contato"
      className="section contact-section"
      aria-labelledby="titulo-contato"
    >
      <div className="container contact-grid">
        <div className="contact-copy">
          <span className="contact-icon">
            <HeartHandshake size={34} aria-hidden="true" />
          </span>
          <p className="eyebrow">ESTAMOS ABERTOS AO DIÁLOGO</p>
          <h2 id="titulo-contato"><TextAnimate text="Toda mudança começa com uma conversa." /></h2>
          <p>
            Quer conhecer o Vem Comigo ou conversar sobre as possibilidades para
            sua escola? Conte para a gente.
          </p>
          <p className="contact-warning">
            Este é um contato institucional. Não envie nomes de estudantes ou
            informações sensíveis sobre casos individuais.
          </p>
          <div id="privacidade" className="privacy-copy">
            <h3>Sobre seus dados</h3>
            <p>
              Os dados preenchidos são usados para responder ao contato
              institucional. Ao enviar, a mensagem é encaminhada pelo servidor
              ao serviço de e-mail configurado. Este portal não salva mensagens
              no navegador nem em banco de dados e não usa rastreadores.
            </p>
            <p>
              O envio utiliza o Gmail. A proteção contra abuso usa contadores
              temporários no Upstash, sem armazenar o texto da mensagem. Este
              canal não oferece atendimento de urgência.
            </p>
          </div>
        </div>
        <form
          className="contact-form"
          noValidate
          ref={form}
          onSubmit={submit}
          aria-describedby="form-help"
          aria-busy={status === "sending"}
        >
          <p id="form-help">
            Vamos nos conhecer? <span>Campos com * são obrigatórios.</span>
          </p>
          <fieldset disabled={status === "sending"}>
            <legend className="sr-only">
              Dados para contato institucional
            </legend>
            <div className="form-grid">
              {fields.map((field) => (
                <div className="field" key={field.name}>
                  <label htmlFor={field.name}>
                    {field.label}
                    {field.name !== "phone" && " *"}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type ?? "text"}
                    autoComplete={field.autoComplete}
                    required={field.name !== "phone"}
                    maxLength={limits[field.name]}
                    value={data[field.name]}
                    onChange={(event) => update(field.name, event.target.value)}
                    aria-invalid={!!errors[field.name]}
                    aria-describedby={
                      errors[field.name] ? `${field.name}-error` : undefined
                    }
                  />
                  {errors[field.name] && (
                    <span className="field-error" id={`${field.name}-error`}>
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="field">
              <label htmlFor="interest">O que traz você aqui? *</label>
              <select
                id="interest"
                name="interest"
                required
                value={data.interest}
                onChange={(event) => update("interest", event.target.value)}
                aria-invalid={!!errors.interest}
                aria-describedby={
                  errors.interest ? "interest-error" : undefined
                }
              >
                <option value="">Selecione seu interesse</option>
                {interests.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
              {errors.interest && (
                <span id="interest-error" className="field-error">
                  {errors.interest}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="message">Sua mensagem *</label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={limits.message}
                rows={5}
                value={data.message}
                onChange={(event) => update("message", event.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={`message-hint${errors.message ? " message-error" : ""}`}
              />
              <span className="field-hint" id="message-hint">
                Fale sobre sua escola e seu interesse. Até 3.000 caracteres.
              </span>
              {errors.message && (
                <span id="message-error" className="field-error">
                  {errors.message}
                </span>
              )}
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="website">Deixe este campo vazio</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                maxLength={200}
              />
            </div>
            <button className="button submit-button" type="submit">
              {status === "sending" ? "Enviando…" : "Enviar mensagem"}
              <ArrowUpRight size={19} aria-hidden="true" />
            </button>
          </fieldset>
          <p
            className={`form-status ${status}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}
