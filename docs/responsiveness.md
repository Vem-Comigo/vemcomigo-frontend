# Revisão de responsividade

Revisão local em 21/10/2026, Windows / Edge headless, com a identidade, textos e imagens existentes preservados. Não houve push nem deploy.

## Causas reproduzidas

A abertura usava `min-height` de 535 px ou 620 px na grade, escolhido apenas pela largura, mais espaçamentos fixos, faixa de princípios e cabeçalho sticky de 97 px. Em 1920 × 1080, o início da seção seguinte ficava em aproximadamente 858 px; em 2560 × 1440 e 3840 × 2160 continuava na mesma posição. O tamanho em polegadas do monitor não determina esses valores.

O menu aberto em 844 × 390 terminava em 391 px, sem limite de altura ou rolagem própria. Ao aumentar o texto em 200%, as grades com mínimo intrínseco, a faixa sem quebra de linha e a altura fixa do cabeçalho provocavam rolagem horizontal ou conteúdo ultrapassando seus limites.

## Correções

- O cabeçalho continua sticky e no fluxo. Tem altura mínima, pode crescer com o texto e informa sua altura real ao token `--header-height` por `ResizeObserver`. O mesmo valor orienta a abertura e o afastamento das âncoras.
- Em largura a partir de 960 px e altura a partir de 720 px, a abertura usa `min-height: min(calc(100svh - var(--header-height)), 90rem)`. `svh` dá uma referência estável; é altura mínima, nunca um corte ou limite do conteúdo.
- A altura mínima é limitada a 90 rem em viewports excepcionalmente altos. Em 3840 × 2160 a seção seguinte começa em 1537 px: ela permanece visível, deliberadamente, para não criar uma abertura quase vazia só para preencher 2160 px. Nada é recortado para disfarçar a dobra.
- Em desktop baixo, espaçamentos e a largura máxima da ilustração diminuem. Abaixo dos limites da abertura, em celular e com conteúdo ampliado, prevalece a altura natural e a rolagem da página.
- Containers centralizados com margens fluidas e largura máxima entre 1200 e 1440 px; título, texto e desenho têm limites próprios. A ilustração preserva a proporção de 560:500.
- Grades usam `minmax(0, …)`, filhos podem encolher e palavras extensas podem quebrar. A faixa de princípios admite quebra de linha. Não há `overflow-x: hidden` global nem redimensionamento da página por `scale`/`zoom`.
- Menu mobile fica abaixo da altura real do cabeçalho, em uma coluna, com limite em `dvh`, rolagem vertical própria e links sem encolher. Escape e foco continuam funcionando.

## Viewports e resultados

Coordenadas em pixels CSS, medidas com a página no topo. Os valores arredondados abaixo são a borda inferior da abertura / início da seção seguinte, incluindo o espaço ocupado pelo cabeçalho.

| Viewport | Antes | Depois | Rolagem horizontal depois |
| --- | ---: | ---: | --- |
| 360 × 800 | 1024 | 1018 | Não |
| 390 × 844 | 1023 | 1017 | Não |
| 844 × 390 | 665 | 619 | Não |
| 768 × 1024 | 665 | 619 | Não |
| 1024 × 768 | 773 | 768 | Não |
| 1280 × 720 | 802 | 720 | Não |
| 1366 × 768 | 816 | 768 | Não |
| 1440 × 900 | 816 | 900 | Não |
| 1920 × 1080 | 858 | 1080 | Não |
| 2560 × 1440 | 858 | 1440 | Não |
| 3840 × 2160 | 858 | 1537 | Não |

Também verificados:

- Menu aberto em 844 × 390: fim em 377 px, rolagem interna, ordem vertical, último link alcançável por foco e Escape devolvendo o foco ao botão.
- FAQ expandida, erros do formulário e foco no primeiro campo obrigatório, sem envio de mensagem real. Estados capturados em celular.
- Âncoras de projeto, atuação, formação, CCAs e contato em 390 × 844, 844 × 390, 1024 × 768 e 1920 × 1080, sem título atrás do cabeçalho.
- Preferência por movimento reduzido; animações desativadas sem esconder conteúdo.
- Texto aumentado em 200% em 390 × 844 e 1280 × 720: sem rolagem horizontal; âncoras também conferidas com o cabeçalho ampliado. No desktop ampliado, o cabeçalho cresceu para aproximadamente 153 px e o afastamento acompanhou essa mudança.
- Refluxo equivalente a 125%, 150% e 200% a partir de duas janelas-base, 1920 × 1080 e 1366 × 768. Foram simulados viewports CSS de 1536 × 864, 1280 × 720, 960 × 540, 1092 × 614, 910 × 512 e 683 × 384. **Isso não altera nem comprova o zoom nativo do navegador.**
- Carregamento sem cache com rede simulada e requisições de fonte temporariamente pausadas. Foram capturados o fallback e a Nunito carregada. A abertura permaneceu em 1080 px antes/depois, e a ilustração manteve a proporção. A soma observada de deslocamentos sem interação foi aproximadamente 0,0055 nesse ensaio de desenvolvimento; não é resultado de Lighthouse ou medição de campo.
- Lint, tipos, build de produção e os quatro testes existentes de contato passaram. O roteiro de navegador não apresentou exceções de JavaScript.

## Evidências e repetição

Capturas antes/depois, páginas completas de celular/desktop, estados e métricas estão em `.cache/responsiveness/before/` e `.cache/responsiveness/after/`, fora do Git. As capturas de abertura, menu, FAQ, ampliação de texto e carregamento foram inspecionadas visualmente; passar no build sozinho não foi usado como evidência visual.

O roteiro nativo Node / Chrome DevTools Protocol está em `scripts/responsive-qa.mjs`; não instala automação ou navegador no projeto. Para repetir:

1. Iniciar o portal com `npm.cmd run dev`.
2. Abrir um **perfil temporário dedicado** de Edge/Chromium com `--headless=new`, `--remote-debugging-port=9222`, `--no-first-run`, `--user-data-dir=<pasta temporária>` e uma aba `about:blank`. Não usar um perfil pessoal com dados de navegação.
3. Executar `npm.cmd run test:responsive`. `QA_URL` permite apontar para outro servidor local.
4. Encerrar o navegador dedicado ao terminar. O roteiro só preenche o formulário vazio para validar erros; não envia dados ao serviço de e-mail.

O argumento `before` apenas registra o estado do checkout servido antes de uma alteração, sem exigir os novos critérios. Não recria automaticamente o código antigo. As capturas de antes desta revisão foram feitas antes das edições.

## Limites e cenário do monitor

Não foram testados TV, projetor, Safari/Firefox ou aparelhos físicos, nem o zoom nativo pelas ferramentas disponíveis. As resoluções simuladas são cenários de layout, não equivalências garantidas entre resolução física e viewport.

Overscan, escala do sistema operacional, barras do navegador, zoom e distância de projeção são fatores externos. Não foi acrescentada compensação global ou “modo TV”. Para reproduzir exatamente o monitor relatado, são necessários `window.innerWidth`, `window.innerHeight`, zoom do navegador e escala do sistema; uma captura da janela ajudaria a comparar a composição. Não é necessário saber o tamanho em polegadas para ajustar o layout.
