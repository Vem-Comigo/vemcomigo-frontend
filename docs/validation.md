# Validação da reformulação

Data: 21/10/2026. Ambiente: Windows, Node 24, Edge em modo headless local.

## Verificações

- Front-end: ESLint, `tsc -b`, build Vite e 4 testes de validação/transporte passaram.
- Backend: checagem TypeScript, build e 9 testes de validação, integração HTTP, limite e adaptador de e-mail passaram. Não existe configuração de lint no backend.
- Auditoria npm após remoção de dependências fora do escopo e correções compatíveis: zero vulnerabilidades conhecidas nos dois repositórios, incluindo desenvolvimento. Isso reflete a base consultada nesta data, não uma garantia futura.
- O build normal exigiu execução fora da restrição de leitura de diretórios ancestrais do sandbox. A alternativa `--configLoader runner` também compilou.

## Navegador e comparação visual

Fonte de verdade: direção registrada em `design.md`, briefing e marca fornecida. Capturas locais de desktop 1440 px e celular 390 px, além de páginas completas, inspecionadas. Confirmados fundo claro, roxo de ação, amarelo decorativo, títulos arredondados, ilustração geométrica e variação das seções. Arquivos temporários de QA ficam em `.cache/`, fora do Git.

Verificados em 320, 390, 768, 1024 e 1440 px: ausência de rolagem horizontal; links de âncora têm destino; título de formação permanece abaixo do cabeçalho. Menu mobile abre/fecha, fecha ao selecionar destino, responde a Escape e devolve foco ao botão. FAQ abre/fecha por Enter. Link de pular conteúdo transfere foco ao main. Formulário vazio informa erros e foca o primeiro campo. Preferência por movimento reduzido remove animação e rolagem suave. Sem exceções de JavaScript durante o roteiro.

axe-core 4.14 executado localmente em desktop e celular com WCAG 2 A/AA, 2.1 AA e boas práticas: nenhuma violação automática após correção do agrupamento de princípios. A ferramenta pediu revisão manual de contraste onde textos se sobrepõem a SVGs ou há elementos fixos. Foram inspecionados os fundos definidos: roxo sobre fundo claro/lilás e branco sobre roxo, sem texto sobre fotografia. As pendências manuais do axe não equivalem a falhas confirmadas nem a certificação de conformidade.

Contato: backend real sem credenciais respondeu 503; a mensagem digitada permaneceu no formulário. Estados 502, 429 e 202 foram exercitados com interceptação local, sem envio real. Somente a confirmação explícita de aceitação limpou os campos. Testes unitários adicionais cobrem resposta falsa/HTML de fallback e falha de rede.

## Limites

Não houve teste com credenciais de produção, entrega de e-mail real, leitores de tela assistidos, aparelhos físicos, Safari/Firefox ou infraestrutura de hospedagem. Não foi medido Lighthouse nem emitida certificação de acessibilidade. Confirmar esses pontos antes da publicação, junto dos cabeçalhos HTTP efetivamente servidos, domínio, privacidade e materiais autorizados. Fotografias e relatos vazios são ocultos, não placeholders públicos. Nenhum push/deploy.
