# Animações e interações — Cult UI

## Revisão dos botões após feedback

O botão recortado Organic Button foi substituído por `ContactCta` no hero e no convite à escola. Nova pesquisa ao vivo no Refero: **Quizlet**, estilo `d6523b05-a53f-4a2a-8829-d65a5c3724e9` ([origem](https://quizlet.com)), e **Duolingo**, estilo `9457a848-2905-4fe8-bb58-e168049120cf` ([origem](https://duolingo.com)), com leitura dos estilos completos.

Direção fixada: a clareza do CTA de superfície única do Quizlet é a base; do Duolingo, apenas a sombra inferior discreta e o estado pressionado. A identidade existente determina roxo, amarelo e tipografia. O novo botão tem raio de 18 px, texto branco, seta amarela integrada e espaçamento próprio; não há extremidade SVG ou bloco amarelo sobreposto. O texto tem largura natural e pode quebrar quando o espaço ou a ampliação exigirem. Hover e foco deslocam a seta levemente; movimento reduzido preserva cor e foco sem deslocamento.

A descrição abaixo registra a implementação inicial; as menções ao Organic Button são históricas. Os demais componentes Cult UI permanecem em uso, com a licença preservada. O roteiro `motion-qa.mjs` acompanha o novo componente e continua verificando teclado, toque e contato mockado.

Validação desta revisão: lint, tipos, build, `motion-qa.mjs` e `test:responsive` passaram. Abertura inspecionada em 1440 × 1000 e 390 × 844, sem sobreposição no botão. A bateria de responsividade incluiu paisagem, texto a 200% e refluxo equivalente a zoom, mantendo os limites de navegador e dispositivos descritos abaixo. Nenhuma dependência adicionada.

Revisão de 27/10/2026. Implementação no portal existente: React 19.2.0 (lockfile), Tailwind 4, Vite 7, TypeScript 5.9. Nenhuma dependência adicionada; `package.json` e lockfile preservados. Conferir a versão exata pelo lockfile ao atualizar o projeto.

## Pesquisa e direção fixada

Aplicada a skill Refero Design. Pesquisa ao vivo via Refero: estilo **Headspace** (`c73224da-e583-4833-bf39-3f414c317474`), estilo **MindMarket** (`4fe66af6-8ad2-4e04-89c2-58a3907cdca4`) e detalhes da tela [Headspace About Us](https://refero.design/pages/a8f000dd-7203-4626-84d1-bc2437a2c40a). Estilos de origem: [Headspace](https://headspace.com) e [MindMarket](https://mindmarket.com).

A referência principal é Headspace: títulos grandes e arredondados, leitura confortável, superfícies claras, formas geométricas e ações reconhecíveis. De MindMarket, apenas o papel das formas orgânicas como apoio ao conteúdo. O sistema existente do Vem Comigo fixa cores, fontes, enquadramento e ilustração; não foram importados o azul de ação do Headspace nem o verde do MindMarket.

| Decisão | Fonte e papel | Aplicação |
| --- | --- | --- |
| Manter Nunito, roxo, amarelo e tamanhos de texto | Briefing e sistema existente | Toda a página |
| Dar superfície própria a cada frente | Cards suaves do Headspace | Artigos com fundo lilás, amarelo, pêssego e verde claro; sem papel de botão |
| Transformar símbolos em narrativa | Formas orgânicas do MindMarket + briefing | Conexões e mudança de forma na ilustração das CCAs |
| Reservar movimento mais forte à narrativa | Briefing + Feature Sticky Section | Três etapas legíveis; a imagem e a navegação acompanham a rolagem |
| Manter imagem original e ações de contato | Sistema existente | Nenhuma foto externa, nenhum rastreador, nenhuma alteração do contrato da API |

## Candidatos avaliados

Foram lidas as páginas oficiais, exemplos e os arquivos do registry oficial, incluindo imports, estados e dependências. Fontes baixados somente para `.cache/`, sem executar o instalador shadcn ou sobrescrever configurações. Repositório: [nolly-studio/cult-ui](https://github.com/nolly-studio/cult-ui). A reprodução em movimento foi feita nas adaptações integradas ao portal; não houve uma execução isolada dos oito demos originais.

| Candidato / documentação | Comportamento do fonte e dependências originais | Escolha |
| --- | --- | --- |
| [Text Animate](https://www.cult-ui.com/docs/components/text-animate) | Variantes e sequência por caracteres; `motion` | Adaptado para palavras, CSS e entrada curta, com frase única para tecnologias assistivas. Hero, título de atuação e contato. |
| [SVG Shapes Animated](https://www.cult-ui.com/docs/components/svg-shapes-animated) | Desenho de traços via `pathLength` e preferência por movimento reduzido; `motion` | Adaptado para SVG/CSS, desenho finito de círculos e linhas atrás da ilustração. Sem biblioteca adicional. |
| [Organic Button](https://www.cult-ui.com/docs/components/organic-button) | Âncora, extremidades SVG e mudança do ícone; Radix Slot, CVA, lucide | Geometria SVG incorporada e adaptada para âncora nativa com texto quebrável. Hero e convite à escola, com estados de teclado e toque. |
| [Bg Animate Button](https://www.cult-ui.com/docs/components/bg-animate-button) | Gradiente cônico giratório; Radix Slot e CVA | Dispensado: o giro e os gradientes competem com a direção acolhedora. |
| [Shift Card](https://www.cult-ui.com/docs/components/shift-card) | Cabeçalho/conteúdo mudam de posição e altura em hover/tap; `motion` | Dispensado: não há conteúdo secundário que justifique ocultar parte dos artigos. |
| [Expandable](https://www.cult-ui.com/docs/components/expandable) | Expansão, medição de dimensões e spring; `motion`, `react-use-measure` | Dispensado pelo mesmo motivo; sem novos controles artificiais. |
| [Feature Sticky Section](https://www.cult-ui.com/docs/components/feature-sticky-section) | Painel ativo por IntersectionObserver, triggers de rolagem; Radix Slot, controllable-state, import de `next/image` no fonte | Adaptado em `CareJourney`, com estado React e âncoras nativas. Sem Next.js. Painéis sempre presentes; apenas imagem/navegação ficam sticky em telas de pelo menos 1100 × 760 CSS px. |
| [Squiggle Arrow](https://www.cult-ui.com/docs/components/squiggle-arrow) | Caminhos SVG de seta curva, sem dependência de animação | Caminhos da variante bouncy incorporados no convite à escola. Decorativo, oculto em celular. |

Adaptações locais em `src/components/motion/`. A lógica de sticky e os efeitos de texto/desenho foram reimplementados com as APIs já disponíveis; não se trata de instalação dos componentes originais sem mudanças. A geometria do Organic Button e da Squiggle Arrow deriva dos fontes oficiais. Aviso MIT completo preservado e distribuído em [`public/licenses/cult-ui.txt`](../public/licenses/cult-ui.txt).

## Movimento e acessibilidade

- Tokens em `src/motion.css`, usando duração base, curva e cores de `src/index.css`. Sequência por palavra de 26 ms, duração de 580 ms; o título principal termina em aproximadamente 740 ms.
- Entrada dos artigos observada individualmente, com sequência de 85 ms. Conteúdo inteiro visível no estado base, inclusive se o observador falhar. Sem `opacity: 0` persistente controlada por JavaScript.
- Sem animações contínuas. O antigo movimento repetido do balão e a antiga linha das CCAs foram removidos. Não há movimento que precise continuar rodando fora da tela.
- SVGs decorativos sem foco, sem leitura redundante e sem interceptar cliques. Cards continuam artigos sem `tabIndex`, cursor de ação ou detalhes escondidos.
- `prefers-reduced-motion` desliga animações/transições e preserva os estados com cor e contorno. Rolagem reduzida segue a configuração global existente.
- No modo compacto a ilustração e os atalhos sticky saem do layout; as três etapas aparecem como artigos, sem scroll preso ou altura artificial de múltiplas telas.
- Nenhum movimento contínuo nos campos; o formulário não recebe mais a antiga animação de entrada. Campos, limites, mensagens, envio, proteção de duplo envio e integração existentes preservados.

## Validação

Passaram `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd test` (11 testes) e `npm.cmd run build`. O build normal precisou executar fora da restrição de leitura dos diretórios ancestrais do esbuild; não foi necessário mudar configuração. O servidor local usa `--configLoader runner` pelo mesmo motivo.

`npm.cmd run test:responsive` foi executado em Edge headless com perfil dedicado, usando CDP: 360 × 800, 390 × 844, 844 × 390, 768 × 1024, 1024 × 768, 1280 × 720, 1366 × 768, 1440 × 900, 1920 × 1080, 2560 × 1440 e 3840 × 2160. Sem rolagem horizontal. Menu horizontal com rolagem interna, Tab/Escape, FAQ com Enter, foco no erro do formulário, âncoras e enquadramento da imagem aprovados.

Também passaram texto ampliado em 200% e refluxo equivalente a zoom de 125%, 150% e 200%. Isso **não comprova o zoom nativo** do navegador. Verificados fallback da fonte, carregamento sem cache e movimento reduzido.

`node scripts/motion-qa.mjs` verifica quadros via `requestAnimationFrame`, com preferência de movimento normal: título mudando entre quadros e chegando a opacidade 1; transições intermediárias entre cores nas três etapas; estado ativo acompanhando rolagem; foco/Enter no CTA; Tab/Enter nas etapas; apresentação compacta em celular, paisagem, tablet e desktop baixo; CTA por evento de toque; ausência de loops infinitos; movimento reduzido e conteúdo visível sem a classe de entrada. Contato interceptado por CDP: estado enviando, campos desabilitados, bloqueio de duplicação, falha 503 conservando campos e sucesso 200 limpando campos. Nenhuma mensagem real foi enviada.

Capturas inspecionadas: abertura desktop/celular, atuação desktop, CCAs desktop/celular e etapas Escutar/Ajudar. Evidências locais: `.cache/responsiveness/after/` e `.cache/motion/`, incluindo `frames.json`. A pasta `before` desta sessão contém um estado intermediário de integração, não uma comparação confiável com HEAD.

Limites: sem teste em aparelhos físicos, Safari/Firefox, leitor de tela real ou zoom nativo. Conteúdo acessível foi inspecionado pela estrutura DOM; o teste de fallback remove a classe de enhancement, não desliga o JavaScript de toda a SPA. Não houve push nem deploy.

Para repetir: iniciar o Vite e um perfil Edge headless dedicado na porta 9222, conforme `docs/responsiveness.md`; executar primeiro `npm.cmd run test:responsive`, depois `node scripts/motion-qa.mjs`, sequencialmente porque ambos controlam a mesma aba.
