# Vem Comigo — portal institucional

React 19, TypeScript e Vite. Conteúdo atualizado diretamente no código; sem login, CMS, chatbot ou rastreadores. A direção e as referências pesquisadas estão em [docs/design.md](docs/design.md).

As adaptações animadas do Cult UI, referências do Refero, licença e validação estão em [docs/cult-ui-motion.md](docs/cult-ui-motion.md). Para testar as transições em movimento e o envio com mocks, execute `node scripts/motion-qa.mjs` no perfil dedicado de navegador descrito nesse documento.

## Executar

Requisito: **Node.js 24 LTS** e npm. No PowerShell, use `npm.cmd` se a política local impedir a execução de `npm.ps1`.

```powershell
cd vemcomigo-frontend
npm.cmd ci
npm.cmd run dev
```

Abra **http://localhost:5173**. Para testar o contato integrado, inicie também o backend em outro terminal; `/api` é encaminhado pelo Vite para `http://127.0.0.1:3000`. Sem backend ou sem configuração de e-mail, o formulário informa a falha e conserva os campos. Não há simulação de sucesso.

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

O build gera `dist/`. `preview` é uma inspeção local, não servidor de produção. Em ambientes restritos onde o esbuild não consiga ler diretórios ancestrais, a alternativa de diagnóstico é `npm.cmd exec -- vite build --configLoader runner`; a checagem de tipos deve ser executada separadamente. O build normal também foi validado.

## Organização

- `src/content/institutional.ts`: navegação, atuação, FAQ e listas de atividades/relatos autorizados.
- `src/components/`: cabeçalho, abertura, história, seções institucionais, formulário e rodapé.
- `src/components/CommunityArt.tsx`: ilustração vetorial original e decorativa, sem representar evento real.
- `src/lib/contact.ts`: validação de experiência e integração de mesma origem. O backend valida independentemente.
- `src/index.css`: tokens, estilos responsivos e preferência por movimento reduzido.
- `public/images/`: logo fornecida, sem alteração de proporção; favicon original em `public/favicon.svg`.
- `tests/contact.test.mjs`: validação, falha de rede, indisponibilidade e confirmação de envio.
- `api/contact.ts` e `server/contact-proxy.ts`: função de servidor da Vercel que encaminha o contato à API Express autenticada.
- `tests/contact-proxy.test.mjs`: origem, tamanho, autenticação, resposta e falhas do proxy, com mocks.
- `docs/validation.md`: evidências e limites da verificação.
- `docs/responsiveness.md`: revisão de enquadramento, cenários de tela e comparação antes/depois.
- `scripts/responsive-qa.mjs`: roteiro de navegador local, executável com `npm.cmd run test:responsive` após preparar o Edge/Chromium dedicado conforme a documentação.

Nenhuma variável pública de ambiente é necessária no navegador. A função de servidor do projeto Vercel precisa de `CONTACT_API_URL`, `CONTACT_ORIGIN` e `CONTACT_PROXY_KEY`, conforme `.env.example` e [docs/contact-vercel.md](docs/contact-vercel.md). Segredos nunca devem usar prefixo `VITE_` nem ser colocados em `public/`. As credenciais Gmail SMTP ficam somente no backend.

As fotos, logos institucionais e demais assets herdados foram preservados, mas não publicados sem confirmação de contexto e autorização. Atividades e depoimentos ficam ocultos enquanto os arrays correspondentes estiverem vazios. Para publicar, adicione apenas registros com autorização, texto alternativo, fonte e dados reais. Use imagens otimizadas com dimensões coerentes com o componente.

## Segurança e publicação

O cliente não salva mensagens em armazenamento local nem registra seu conteúdo em console. Não renderiza HTML recebido. Campos têm limites e instrução para não informar nomes de estudantes ou casos sensíveis. A mensagem só é confirmada após resposta explícita do servidor; aceitação pelo serviço não garante entrega na caixa de entrada.

Na Vercel, `vercel.json` prepara CSP, proteção contra enquadramento, `nosniff`, política de referência e permissões; a API também define seus cabeçalhos. `public/_headers` fica disponível para provedores que interpretam esse outro formato. Verificar os cabeçalhos efetivamente servidos após configurar a hospedagem. CSP de produção não deve ser aplicada ao servidor Vite de desenvolvimento, que usa HMR. Fontes e ilustrações são locais; a fonte de corpo é a do sistema para evitar um download adicional de 875 KB.

Antes de publicar:

1. Configurar o proxy `/api/contact` e os dois projetos Vercel conforme [o guia de contato](docs/contact-vercel.md). Não substituir respostas de API por HTML de fallback.
2. Configurar HTTPS e os cabeçalhos no provedor. Definir HSTS somente após confirmar domínio, subdomínios e HTTPS operacional.
3. Definir a URL de produção real. Só então adicionar canonical, `og:url`, imagem social absoluta e sitemap, e liberar `robots.txt`, hoje bloqueado para ambiente não confirmado. Para staging, preferir também `X-Robots-Tag: noindex` no provedor.
4. O destinatário do formulário foi confirmado como `contatovmc3567@gmail.com` e fixado no backend. Confirmar responsável institucional e demais canais públicos reais.
5. Revisar a política institucional de privacidade, o serviço de e-mail e o tratamento/retenção das mensagens. Nenhum prazo ou declaração de conformidade foi presumido.
6. Confirmar a relação com Sistema de Apoio Entre Iguais / GPEM ou GEPEM / Unicamp, grafias, números e uso de marcas. Não são exibidos como parceiros confirmados.
7. Obter fotos e relatos autorizados e, se possível, uma logo vetorial melhor: o SVG fornecido contém partes rasterizadas e margens grandes.

Nesta etapa de contato não houve push, deploy ou envio real de e-mail.
