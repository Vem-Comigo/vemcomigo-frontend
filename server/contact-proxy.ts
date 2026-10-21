import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import type { IncomingMessage, ServerResponse } from "node:http";

export interface ContactProxyConfig {
  endpoint: string;
  origin: string;
  proxyKey: string;
  onVercel: boolean;
  helpersDisabled: boolean;
}
const MAX_BYTES = 16 * 1024;

class BodyError extends Error {
  status: number;
  constructor(status: number) {
    super("Requisição inválida");
    this.status = status;
  }
}

async function readBody(req: IncomingMessage): Promise<string> {
  const length = req.headers["content-length"];
  if (length && (!/^\d+$/.test(length) || Number(length) > MAX_BYTES)) {
    req.resume();
    throw new BodyError(413);
  }
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const part of req.iterator({ destroyOnReturn: false })) {
    const chunk = Buffer.isBuffer(part) ? part : Buffer.from(part);
    size += chunk.length;
    if (size > MAX_BYTES) {
      req.resume();
      throw new BodyError(413);
    }
    chunks.push(chunk);
  }
  const text = Buffer.concat(chunks).toString("utf8");
  try {
    const body: unknown = JSON.parse(text);
    if (!body || typeof body !== "object" || Array.isArray(body))
      throw new Error();
  } catch {
    throw new BodyError(400);
  }
  return text;
}

function configurationValid(config: ContactProxyConfig): boolean {
  try {
    const endpoint = new URL(config.endpoint);
    const origin = new URL(config.origin);
    const local =
      !config.onVercel &&
      endpoint.protocol === "http:" &&
      ["127.0.0.1", "localhost"].includes(endpoint.hostname);
    return (
      (endpoint.protocol === "https:" || local) &&
      endpoint.origin !== origin.origin &&
      endpoint.pathname === "/api/contact" &&
      !endpoint.username &&
      !endpoint.password &&
      !endpoint.search &&
      !endpoint.hash &&
      origin.origin === config.origin &&
      ["https:", "http:"].includes(origin.protocol) &&
      (!config.onVercel ||
        (origin.protocol === "https:" && config.helpersDisabled)) &&
      config.proxyKey.length >= 32 &&
      config.proxyKey.length <= 256 &&
      !/\s/.test(config.proxyKey)
    );
  } catch {
    return false;
  }
}

export function createContactProxy(
  config: ContactProxyConfig,
  request: typeof fetch = fetch,
) {
  return async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
    );
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), payment=()",
    );
    const respond = (status: number, body: Record<string, unknown>) => {
      res.statusCode = status;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify(body));
    };
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      respond(405, { error: "Método não permitido." });
      return;
    }
    if (!configurationValid(config)) {
      respond(503, { error: "Contato temporariamente indisponível." });
      return;
    }
    if (req.headers.origin !== config.origin) {
      respond(403, { error: "Solicitação não permitida." });
      return;
    }
    if (
      typeof req.headers["content-type"] !== "string" ||
      req.headers["content-type"].split(";")[0]?.trim().toLowerCase() !==
        "application/json"
    ) {
      respond(415, { error: "Formato inválido." });
      return;
    }
    // Só confiar neste cabeçalho na Vercel, que o define na borda. Fora dela, usar o socket.
    const forwarded = req.headers["x-vercel-forwarded-for"];
    const ip = config.onVercel
      ? typeof forwarded === "string"
        ? forwarded.trim()
        : ""
      : (req.socket.remoteAddress ?? "");
    if (!isIP(ip)) {
      respond(503, { error: "Contato temporariamente indisponível." });
      return;
    }
    let body: string;
    try {
      body = await readBody(req);
    } catch (error) {
      respond(error instanceof BodyError ? error.status : 400, {
        error: "Revise os campos e tente novamente.",
      });
      return;
    }
    try {
      const upstream = await request(config.endpoint, {
        method: "POST",
        redirect: "error",
        signal: AbortSignal.timeout(16000),
        headers: {
          "Content-Type": "application/json",
          Origin: config.origin,
          "x-contact-proxy-key": config.proxyKey,
          "x-contact-client-id": createHmac("sha256", config.proxyKey)
            .update("contact-v1:" + ip)
            .digest("hex"),
        },
        body,
      });
      const payload: unknown = await upstream.json().catch(() => null);
      if (
        upstream.status === 202 &&
        payload &&
        typeof payload === "object" &&
        "accepted" in payload &&
        payload.accepted === true
      ) {
        respond(202, { accepted: true });
        return;
      }
      if (upstream.status === 429) {
        const retry = Number(upstream.headers.get("Retry-After"));
        res.setHeader(
          "Retry-After",
          String(
            Number.isInteger(retry) && retry > 0 && retry <= 900 ? retry : 900,
          ),
        );
      }
      const status = [400, 413, 415, 429, 503].includes(upstream.status)
        ? upstream.status
        : 502;
      respond(status, {
        error:
          status === 429
            ? "Aguarde antes de tentar novamente."
            : "Não foi possível confirmar o envio.",
      });
    } catch {
      respond(502, { error: "Não foi possível confirmar o envio." });
    }
  };
}
