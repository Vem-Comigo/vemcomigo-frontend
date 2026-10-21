# Contato na Vercel

O processamento usa a API Express existente e o adaptador Resend existente. Como front-end e backend são **repositórios independentes**, cada um mantém seu próprio projeto Vercel. Não há importações de arquivos fora do checkout, SDK de e-mail no navegador ou duplicação do template.

```mermaid
flowchart LR
  A[Formulário no navegador] -->|mesma origem| B[Front-end: /api/contact]
  B -->|HTTPS + chave privada + identificador derivado do IP| C[Backend Express: /api/contact]
  C -->|contador com expiração| D[Upstash Redis REST]
  C -->|HTML e texto simples| E[Resend]
  E --> F[contatovmc3567@gmail.com]
```

O browser só conhece `/api/contact`. Destinatário, assunto, remetente, credenciais, URL do backend e identificação da conexão são tratados no servidor. O endereço do visitante é apenas Reply-To. Não há mensagem automática ao visitante, armazenamento de mensagens em banco ou repetição automática de envio.

## Configuração do projeto front-end

Na Vercel, importar `vemcomigo-frontend` como projeto Vite, com Node 24 e o `vercel.json` versionado. Não é necessário criar rewrite para o domínio do backend: a função `api/contact.ts` já faz o encaminhamento.

| Variável privada | Valor a configurar |
| --- | --- |
| `CONTACT_API_URL` | URL HTTPS completa do backend de produção, terminando exatamente em `/api/contact`, sem query string |
| `CONTACT_ORIGIN` | Origem HTTPS exata do portal, sem caminho ou barra final |
| `CONTACT_PROXY_KEY` | Segredo aleatório de pelo menos 32 caracteres, igual no backend |
| `NODEJS_HELPERS` | `0`, já declarado em `vercel.json`, para ler o corpo como stream e impor o limite de 16 KB antes do JSON |

Nenhuma dessas variáveis usa prefixo `VITE_`. `.env.example` fica vazio para os valores privados. Não colocar chaves no chat, no Git ou em capturas de tela. Gerar o segredo em um gerenciador de senhas e salvá-lo diretamente nas configurações privadas dos dois projetos; não usar a chave do Resend como chave do proxy.

## Configuração do projeto backend

Importar `vemcomigo-backend` como projeto Express, Node 24. `src/app.ts` exporta a aplicação; `src/server.ts` continua sendo o servidor de desenvolvimento local. Seguir também o README do backend.

| Variável privada | Valor a configurar |
| --- | --- |
| `CONTACT_ORIGIN` | A mesma origem exata configurada no front-end |
| `CONTACT_PROXY_KEY` | O mesmo segredo privado do proxy |
| `MAIL_API_KEY` | Chave Resend com autorização de envio no domínio escolhido |
| `MAIL_FROM` | Somente o endereço remetente autorizado, sem nome de exibição; o código acrescenta “Vem Comigo” |
| `UPSTASH_REDIS_REST_URL` | Endpoint HTTPS raiz da instância Upstash, sem caminho, query ou credencial na URL |
| `UPSTASH_REDIS_REST_TOKEN` | Token privado com permissão para executar o comando de limitação |

`VERCEL=1` é fornecido pela plataforma; não é preciso defini-lo. `NODE_ENV=production` também ativa as exigências de produção ao executar fora dela. `MAIL_TO` não é usado: o destinatário é **sempre** `contatovmc3567@gmail.com`.

O Redis é usado exclusivamente para limitar tentativas: contador e expiração de 15 minutos, com chave derivada do identificador HMAC da conexão. Não recebe formulário, texto, nome, e-mail ou IP bruto do visitante. O limite de 5 tentativas é compartilhado entre instâncias. Sem configuração, com timeout ou resposta inválida do limitador, o backend retorna 503 e não chama o Resend. Não existe fallback em memória em produção.

Use a URL de produção do backend, acessível para chamadas servidor-servidor. Uma URL Preview protegida por login da Vercel não funciona como destino sem configuração adicional de acesso. A aplicação continua exigindo a chave privada do proxy e não libera CORS público. Se houver outro proxy na frente da Vercel, rever o IP efetivo com a topologia real; o código só confia em `x-vercel-forwarded-for` quando executado na Vercel.

Para Preview, configurar uma origem exata estável e as variáveis correspondentes nos dois ambientes. Não autorizar indiscriminadamente todos os subdomínios `vercel.app`. Mudanças de variáveis precisam estar presentes na versão de hospedagem usada no teste.

## Resend e remetente

O destino Gmail não exige enviar usando a conta Gmail. A solução mantém o Resend existente, usa HTTP nativo com timeout e exige confirmação por ID. Para produção, configurar um domínio controlado pela instituição, concluir a verificação no Resend e usar um endereço desse domínio em `MAIL_FROM`. Não usar o e-mail do visitante nem presumir autorização para usar `gmail.com` como domínio remetente. Ver [domínios verificados](https://resend.com/docs/dashboard/domains/introduction) e [API de envio](https://resend.com/docs/api-reference/emails/send-email).

O remetente de teste `onboarding@resend.dev` tem restrições: só pode enviar ao e-mail associado à conta Resend. Como o destino aqui é fixo, esse teste só se aplica se a conta estiver associada a `contatovmc3567@gmail.com`. Para outros cenários, verificar um domínio antes. Ver [restrição do domínio de teste](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).

Não foram criados conta, domínio, instância Redis ou credenciais. Confirmar as condições dos serviços e a política institucional de tratamento de e-mails antes de habilitar produção. Rastreamento de abertura/cliques não é ativado pelo código; revisar as configurações do domínio no provedor.

## Execução local

O fluxo habitual continua simples: `npm.cmd run dev` no backend e no front-end. O Vite encaminha `/api` diretamente para `http://127.0.0.1:3000`. No backend local, copiar `.env.example` para `.env` e definir `MAIL_API_KEY`, `MAIL_FROM` e `CONTACT_ORIGIN=http://localhost:5173` para um teste real controlado. Nesse modo de desenvolvimento o limite é apenas em memória, sem alegação de persistência.

As variáveis da função do front-end são necessárias na Vercel. Para exercitar essa função localmente em `vercel dev`, manter seus valores em ambiente privado do projeto; `CONTACT_API_URL` pode apontar para `http://127.0.0.1:3000/api/contact` somente fora da Vercel. O backend deve estar em modo de produção com chave do proxy e Redis configurados para reproduzir as mesmas exigências do deploy. A URL/origem da porta usada em `vercel dev` precisa coincidir com `CONTACT_ORIGIN`.

## Um teste real controlado, depois da configuração

1. Conferir domínio/remetente autorizado, chaves privadas, origem exata e limite compartilhado. Em produção, conferir também os cabeçalhos servidos e o acesso servidor-servidor ao backend.
2. Preencher o formulário uma única vez com dados claramente fictícios e um e-mail de resposta que você controla. Usar uma mensagem como “TESTE CONTROLADO — solicitação fictícia”. Não informar estudantes ou casos sensíveis.
3. Enviar uma vez e aguardar o resultado. 202 e a mensagem de aceitação indicam que o serviço aceitou a solicitação, não que ela chegou ao Gmail.
4. Verificar a caixa de entrada/spam de `contatovmc3567@gmail.com` e, de forma privada, o status no Resend. Conferir assunto, data de São Paulo, HTML/texto e Reply-To, e só então responder manualmente se desejado.
5. Em timeout ou falha de confirmação, conferir primeiro o provedor antes de repetir: o envio anterior pode ter sido aceito. Não disparar tentativas em sequência. Ao atingir 429, aguardar o `Retry-After`.

## Verificações realizadas e limites

Foram executados lint do front-end, tipos e builds dos dois projetos, 11 testes no front-end e 18 no backend, com servidores HTTP locais e mocks. O backend não possui linter próprio. Cobertura: campos inválidos, opcionais, acentos, 3000 caracteres, escape de HTML, quebras de linha, cabeçalhos, tamanho com Content-Length e chunked, autenticação, identificação por conexão, limite compartilhado, falhas/timeouts e respostas sem confirmação.

No Edge local, o template foi inspecionado em 760 e 360 px, e a interface em desktop: validação, estado “Enviando…”, bloqueio de duplo submit, erro com preservação dos campos, nova tentativa e sucesso com limpeza somente após resposta aceita. Todas as chamadas da interface foram interceptadas, sem envio real. Evidências temporárias em `.cache/email-ui/`.

Não houve teste de entrega real, deploy/build remoto autenticado na Vercel ou renderização nos aplicativos Gmail/Outlook. O HTML usa tabelas, estilos inline, fonte local do cliente e alternativa em texto, com moldura condicional para Outlook. A revisão no navegador não garante o resultado em todos os clientes de e-mail. Ver a prévia local documentada no README do backend.

Referências de infraestrutura: [Express na Vercel](https://vercel.com/docs/frameworks/backend/express), [Node.js e corpo das requisições](https://vercel.com/docs/functions/runtimes/node-js), [desativar helpers](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration), [cabeçalhos de IP da Vercel](https://vercel.com/docs/headers/request-headers), [Upstash REST](https://upstash.com/docs/redis/features/restapi).
