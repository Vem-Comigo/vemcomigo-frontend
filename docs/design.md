# Direção visual e decisões

Pesquisa Refero realizada antes da implementação em 21/10/2026. Buscas: Headspace / tipografia arredondada; educação e comunidade; formas geométricas expressivas. Três estilos completos consultados.

Referência principal: [Headspace](https://headspace.com), estilo `c73224da-e583-4833-bf39-3f414c317474`. Preservar fundos claros, tipografia sem serifa arredondada, ilustração geométrica, botões em cápsula e respiro. Adaptação explícita ao briefing: roxo da identidade como ação principal; amarelo apenas em destaques e ilustrações. Não importar o azul de ação nem personagens da referência.

Referências secundárias: [First + Foremost](https://firstandforemost.co), estilo `f3ff7e74-49cd-4ef7-87b8-609844ecd06c`, apenas ritmo tipográfico e seções espaçosas; [Contractbook](https://contractbook.com), estilo `b296c437-59c8-4c32-8697-e11beb027a35`, apenas composição de ilustrações vetoriais e separação por cor sem sombras pesadas. As paletas secundárias não foram importadas.

Telas: About Headspace (`a8f000dd-7203-4626-84d1-bc2437a2c40a`, imagem inspecionada), landing de meditação (`bf2e6fe4-8fb1-4787-a285-bba9d1796244`) e navegação (`303be846-57e4-4092-9d2e-e5273d24ccc9`). Aproveitados: abertura em duas colunas, história em blocos editoriais, navegação curta com ação visível. Depoimentos e métricas das referências não são conteúdo do projeto.

| Decisão | Origem | Aplicação |
| --- | --- | --- |
| Roxo #66388c / amarelo #fab900 | Marca fornecida e briefing | Roxo nas ações e identidade; amarelo decorativo |
| Nunito local e fonte do sistema | Fontes existentes + referência principal | Nunito nos títulos; texto e controles com fonte do sistema para evitar o download de 875 KB da Inter original |
| Abertura com roda de conversa vetorial | Headspace + contexto | SVG original decorativo, sem alegação documental |
| História, colunas abertas, painel de formação, sequência das CCAs | Briefing + telas | Variar composição sem repetir grades de cards |
| FAQ com details/summary | Requisito de acessibilidade | Teclado e estado nativos, sem biblioteca |
| Conteúdo sem prova fica oculto | Briefing | Arrays de atividades e relatos vazios |

Tokens em `src/index.css`. Rejeitados: gradientes genéricos, sombras fortes, fotos sintéticas documentais, números e credibilidade inventados, redesenho da marca. Logo original copiada sem alterar proporção. O SVG original contém trechos rasterizados: solicitar arquivo vetorial de melhor qualidade para usos ampliados.

Nenhuma prévia visual adicional foi encontrada nos anexos, apenas dois pedidos textuais equivalentes. Construção direta autorizada pelo briefing; sem reabrir a escolha de estilo.

## Revisão de tipografia e movimento

Nova pesquisa no Refero para a revisão visual: estilos [Headspace](https://refero.design/pages/a8f000dd-7203-4626-84d1-bc2437a2c40a), [Duolingo](https://duolingo.com) e [August Health](https://www.augusthealth.com), mais telas de Headspace About e [Playbook para escolas](https://refero.design/pages/9e0413e6-6582-466a-a5fe-ea2273cd5cb5). O Headspace permanece a direção principal: espaço entre seções, formas suaves, tipografia humana e ilustração contida. Duolingo contribuiu apenas com a presença de ilustrações junto à mensagem; August Health, com o uso moderado de círculos em uma composição de cuidado. Não foram importadas suas paletas ou fontes. A tela do Playbook mostrou uma hierarquia de educação e comunidade, mas seus números, parceiros e depoimentos não foram incorporados.

| Decisão | Base | Aplicação |
| --- | --- | --- |
| Corpo 17–19 px e descrições 16–18 px | Pedido do usuário + hierarquia Headspace | Tokens fluidos em `src/index.css`, com entrelinha e largura de leitura confortáveis |
| Títulos maiores e controles legíveis | Pedido do usuário + tipografia de referência | Escala `clamp()`; navegação, botões, FAQ e formulário ampliados sem uniformizar todos os papéis |
| Linha entre “Acolher, Escutar, Ajudar” | Conceito do projeto | Desenho progressivo apenas quando a seção aparece; nenhuma nova alegação factual |
| Formas discretas entre seções | Headspace/August Health | Círculos leves em abordagem e contato; roxo na identidade, amarelo no destaque |
| Revelação e intervalos curtos | Pedido do usuário | Movimento de entrada de 580 ms com transform/opacity; nenhuma referência estática foi tratada como prova de animação |
| Menu e FAQ suaves | Pedido do usuário | Transição do menu mobile; `details` nativo com transição do conteúdo onde o navegador suporta |

A implementação mantém o conteúdo visível mesmo sem IntersectionObserver. Em `prefers-reduced-motion: reduce`, as animações e transições são removidas e a linha decorativa aparece pronta. Não há dependência de biblioteca de animação. O formulário e o backend de contato não foram alterados nesta revisão.
