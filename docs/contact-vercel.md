# Contato na Vercel

O processamento usa a API Express existente e Nodemailer com Gmail SMTP. Como front-end e backend são **repositórios independentes**, cada um mantém seu próprio projeto Vercel. Não há importações de arquivos fora do checkout, SDK de e-mail no navegador ou duplicação do template.

```mermaid
flowchart LR
  A[Formulário no navegador] -->|mesma origem| B[Front-end: /api/contact]
  B -->|HTTPS + chave privada + identificador derivado do IP| C[Backend Express: /api/contact]
  C -->|contador com expiração| D[Upstash Redis REST]
  C -->|HTML e texto simples| E[Gmail SMTP via Nodemailer]
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

Nenhuma dessas variáveis usa prefixo `VITE_`. `.env.example` fica vazio para os valores privados. Não colocar chaves no chat, no Git ou em capturas de tela. Gerar o segredo em um gerenciador de senhas e salvá-lo diretamente nas configurações privadas dos dois projetos; não usar a senha de app do Gmail como chave do proxy.

## Configuração do projeto backend

Importar `vemcomigo-backend` como projeto Express, Node 24. `src/app.ts` exporta a aplicação; `src/server.ts` continua sendo o servidor de desenvolvimento local. Seguir também o README do backend.

| Variável privada | Valor a configurar |
| --- | --- |
| `CONTACT_ORIGIN` | A mesma origem exata configurada no front-end |
| `CONTACT_PROXY_KEY` | O mesmo segredo privado do proxy |
| `SMTP_USER` | Conta institucional `contatovmc3567@gmail.com`; outra conta é recusada pelo código |
| `SMTP_APP_PASSWORD` | Senha de app gerada nessa mesma conta Gmail, salva somente no ambiente privado |
| `UPSTASH_REDIS_REST_URL` | Endpoint HTTPS raiz da instância Upstash, sem caminho, query ou credencial na URL |
| `UPSTASH_REDIS_REST_TOKEN` | Token privado com permissão para executar o comando de limitação |

`VERCEL=1` é fornecido pela plataforma; não é preciso defini-lo. `NODE_ENV=production` também ativa as exigências de produção ao executar fora dela. `MAIL_TO` não é usado: o destinatário é **sempre** `contatovmc3567@gmail.com`.

O Redis é usado exclusivamente para limitar tentativas: contador e expiração de 15 minutos, com chave derivada do identificador HMAC da conexão. Não recebe formulário, texto, nome, e-mail ou IP bruto do visitante. O limite de 5 tentativas é compartilhado entre instâncias. Sem configuração, com timeout ou resposta inválida do limitador, o backend retorna 503 e não inicia o envio SMTP. Não existe fallback em memória em produção.

Use a URL de produção do backend, acessível para chamadas servidor-servidor. Uma URL Preview protegida por login da Vercel não funciona como destino sem configuração adicional de acesso. A aplicação continua exigindo a chave privada do proxy e não libera CORS público. Se houver outro proxy na frente da Vercel, rever o IP efetivo com a topologia real; o código só confia em `x-vercel-forwarded-for` quando executado na Vercel.

Para Preview, configurar uma origem exata estável e as variáveis correspondentes nos dois ambientes. Não autorizar indiscriminadamente todos os subdomínios `vercel.app`. Mudanças de variáveis precisam estar presentes na versão de hospedagem usada no teste.

## Gmail SMTP e runtime

O backend usa Nodemailer 10 no runtime **Node.js 24**, sem Edge Runtime. O destino SMTP é fixo: `smtp.gmail.com`, porta 465, TLS desde a conexão, certificado validado e mínimo TLS 1.2. A [Vercel permite SMTP de saída nessa porta](https://vercel.com/kb/guide/serverless-functions-and-smtp); o Nodemailer 10 requer Node.js 20 ou superior. Ver [SMTP Nodemailer](https://nodemailer.com/smtp) e [Gmail](https://nodemailer.com/guides/using-gmail).

Remetente fixo: **"Vem Comigo" <contatovmc3567@gmail.com>**. Destinatário e envelope SMTP usam essa mesma conta; apenas Reply-To recebe o e-mail validado do visitante. O HTML, texto simples e horário America/Sao_Paulo são preservados. Não há confirmação automática ao visitante.

Em `SMTP_USER`, cadastrar a conta institucional. Em `SMTP_APP_PASSWORD`, cadastrar a senha de app de 16 caracteres dessa conta, nunca a senha comum. Os espaços de agrupamento exibidos pelo Google são removidos apenas na memória; quebras de linha são recusadas. A conta precisa manter a verificação em duas etapas e permitir senhas de app. Não colar senha no chat, código, logs ou arquivos versionados. Você já gerou a senha; resta cadastrá-la privadamente, sem compartilhá-la aqui.

Não é necessário domínio verificado no Resend. A busca nos dois projetos encontrou o Resend somente no fluxo do contato e documentação; o adaptador HTTP foi removido. `MAIL_API_KEY` e `MAIL_FROM` deixaram de ser lidas e podem ser removidas do ambiente **após a migração autorizada e conferência de outros deployments consumidores**. Nenhuma configuração remota foi alterada.

Uma conexão por solicitação, sem pool ou retry automático. Há deadline total de 10 s para SMTP, além dos timeouts de conexão, DNS, saudação e socket; no encerramento, o socket é destruído e o transporte fechado. O proxy aguarda até 16 s, o navegador até 20 s e as funções têm máximo de 20 s. A resposta 202 só ocorre após resolução do envio com destinatário aceito e resposta final SMTP 250. Isso significa aceitação pelo servidor SMTP, sem garantia de chegada à caixa de entrada.

Gmail pode limitar ou bloquear autenticações da hospedagem; a compatibilidade do código não confirma acesso à conta nem entrega. Erros não expõem respostas SMTP ou credenciais. Não há verificação de conexão no startup ou build, nem envio em testes. Não foram validados autenticação real, entrega, Gmail/Outlook ou deploy remoto nesta alteração.

## Execução local

O fluxo habitual continua simples: `npm.cmd run dev` no backend e no front-end. O Vite encaminha `/api` diretamente para `http://127.0.0.1:3000`. No backend local, copiar `.env.example` para `.env` e definir `SMTP_USER`, `SMTP_APP_PASSWORD` e `CONTACT_ORIGIN=http://localhost:5173` para um teste real controlado. Nesse modo de desenvolvimento o limite é apenas em memória, sem alegação de persistência.

As variáveis da função do front-end são necessárias na Vercel. Para exercitar essa função localmente em `vercel dev`, manter seus valores em ambiente privado do projeto; `CONTACT_API_URL` pode apontar para `http://127.0.0.1:3000/api/contact` somente fora da Vercel. O backend deve estar em modo de produção com chave do proxy e Redis configurados para reproduzir as mesmas exigências do deploy. A URL/origem da porta usada em `vercel dev` precisa coincidir com `CONTACT_ORIGIN`.

## Um teste real controlado, depois da configuração

1. Conferir conta Gmail institucional, senha de app cadastrada privadamente, origem exata e limite compartilhado. Em produção, conferir também os cabeçalhos servidos e o acesso servidor-servidor ao backend.
2. Preencher o formulário uma única vez com dados claramente fictícios e um e-mail de resposta que você controla. Usar uma mensagem como “TESTE CONTROLADO — solicitação fictícia”. Não informar estudantes ou casos sensíveis.
3. Enviar uma vez e aguardar o resultado. 202 e a mensagem de aceitação indicam que o servidor SMTP aceitou a solicitação, não que ela chegou ao Gmail.
4. Verificar a caixa de entrada/spam de `contatovmc3567@gmail.com` e os avisos privados de segurança da conta Google. Conferir assunto, data de São Paulo, HTML/texto e Reply-To, e só então responder manualmente se desejado.
5. Em timeout ou falha de confirmação, conferir primeiro a caixa da conta e os avisos de segurança antes de repetir: o envio anterior pode ter sido aceito. Não disparar tentativas em sequência. Ao atingir 429, aguardar o `Retry-After`.

## Verificações realizadas e limites

Foram executados lint do front-end, tipos e builds dos dois projetos, 11 testes no front-end e 21 no backend, com servidores HTTP locais e mocks. O backend não possui linter próprio. Cobertura: campos inválidos, opcionais, acentos, 3000 caracteres, escape de HTML, quebras de linha, cabeçalhos, tamanho com Content-Length e chunked, autenticação, identificação por conexão, limite compartilhado, falhas/timeouts e respostas sem confirmação.

Na validação anterior no Edge local, o template foi inspecionado em 760 e 360 px, e a interface em desktop: validação, estado “Enviando…”, bloqueio de duplo submit, erro com preservação dos campos, nova tentativa e sucesso com limpeza somente após resposta aceita. Todas as chamadas da interface foram interceptadas, sem envio real. Evidências temporárias em `.cache/email-ui/`. A troca para SMTP preservou o template e esses comportamentos; nesta etapa foram repetidas as verificações automatizadas e gerada novamente a prévia fictícia, sem novo teste visual no navegador.

Não houve teste de entrega real, deploy/build remoto autenticado na Vercel ou renderização nos aplicativos Gmail/Outlook. O HTML usa tabelas, estilos inline, fonte local do cliente e alternativa em texto, com moldura condicional para Outlook. A revisão no navegador não garante o resultado em todos os clientes de e-mail. Ver a prévia local documentada no README do backend.

Referências de infraestrutura: [Express na Vercel](https://vercel.com/docs/frameworks/backend/express), [Node.js e corpo das requisições](https://vercel.com/docs/functions/runtimes/node-js), [desativar helpers](https://vercel.com/docs/functions/runtimes/node-js/advanced-node-configuration), [cabeçalhos de IP da Vercel](https://vercel.com/docs/headers/request-headers), [Upstash REST](https://upstash.com/docs/redis/features/restapi).

## Pendências para ativar

Cadastrar/verificar as variáveis privadas das duas tabelas, a instância Upstash e o acesso servidor-servidor ao backend. Preservar NODEJS_HELPERS conforme vercel.json; VERCEL é fornecida pela plataforma. A senha já foi gerada pelo responsável, mas seu cadastro e validade não foram inspecionados. Não há dependência do MongoDB. Selecionar Production e, quando aplicável, Preview com origem exata e credenciais próprias; alterações de ambiente precisam de novo deployment autorizado. Não houve publicação nem envio real nesta etapa.
