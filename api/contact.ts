import { createContactProxy } from "../server/contact-proxy.ts";

export default createContactProxy({
  endpoint: process.env.CONTACT_API_URL ?? "",
  origin: process.env.CONTACT_ORIGIN ?? "",
  proxyKey: process.env.CONTACT_PROXY_KEY ?? "",
  onVercel: process.env.VERCEL === "1",
  helpersDisabled: process.env.NODEJS_HELPERS === "0",
});
