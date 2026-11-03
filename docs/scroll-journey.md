# Percurso das Comunidades de Cuidado e Apoio

## Diagnóstico

`CareJourney` escolhia o artigo com maior interseção em uma faixa central da tela,
com apenas cinco thresholds. O resultado era um índice inteiro entre 0 e 2, não
um progresso contínuo. Cada mudança disparava uma transição CSS de 720 ms;
rolar mais devagar não prolongava a transformação e inverter o sentido podia
trocar abruptamente o destino. A nota também era remontada a cada troca.

Os artigos tinham altura mínima fixa de 420 px. A ilustração era sticky somente
a partir de 1100 × 760 e desaparecia nos demais tamanhos.

## Direção e decisões

A referência principal é a seção existente: Nunito, lilás, roxo, amarelo,
pêssego, órbitas e os três símbolos de acolher, escutar e ajudar. Nenhum conteúdo
institucional foi substituído. Pesquisa Refero: estilos completos de
[Martin Laxenaire](https://www.martin-laxenaire.fr) e
[Wayfinder](https://wayfinder.nfb.ca), além do guia de movimento da skill.

| Decisão | Fonte e papel |
| --- | --- |
| Preservar cores, textos, símbolos e formas | Sistema existente e briefing; referência principal |
| Manter a forma expressiva como foco visual | Martin Laxenaire; somente o papel da geometria orgânica, sem importar tokens |
| Integrar a ilustração à narrativa sem controles extras | Wayfinder; somente continuidade e hierarquia, sem importar tema ou fontes |
| Resposta curta, reversível e versão sem movimento | Briefing e guia de movimento Refero |

## Implementação e ajustes

- **Percurso:** `--journey-step-travel` em `src/motion.css` controla a altura
  mínima de cada artigo: `72svh` no desktop, `68svh` a partir de 1600 px e
  `58svh` abaixo de 960 px. A altura natural prevalece com conteúdo maior.
  O percurso efetivo é a altura total de `.care-journey` menos a altura do aside.
  Para alongar ou encurtar, ajuste esses três valores. Não aumente a altura da arte.
- **Visual:** `.journey-art` possui altura independente, entre 260 e 480 px no
  desktop, calibrada em `42svh`. No mobile sua altura é natural e compacta.
  O sticky usa o token de altura real do header, com folga de 24 px no desktop.
  No mobile a superfície opaca avança 2 px sob o header, sem padding superior;
  uma cobertura adicional de 4 px sela a junção contra arredondamento de pixels,
  impedindo que os cards apareçam pela faixa superior.
- **Suavização:** `SCROLL_SMOOTHING_MS = 65` em `CareJourney.tsx` é a constante
  de tempo do filtro exponencial. Menor valor acompanha mais diretamente;
  maior valor suaviza mais e acrescenta atraso. Não é a duração do percurso.
- **Início/fim:** progresso 0 quando o topo da seção alcança o limite sticky;
  progresso 1 quando o fim da seção alcança o fim do aside. Não há pausa longa
  adicionada antes ou depois. Os keyframes usam `ease-in-out` por metade.
- **Texto:** notas e contadores permanecem montados, em uma grade sobreposta.
  Uma frase apaga antes da próxima aparecer para evitar texto sobreposto.

Animações nativas pausadas (Web Animations API) recebem `currentTime` em um único
`requestAnimationFrame`. Não foi adicionada dependência: o projeto já adaptava
Cult UI para CSS/SVG nativo. React atualiza somente ao cruzar uma etapa.
Scroll é passivo e não lê layout; as medidas são armazenadas e recalculadas por
ResizeObserver e resize, incluindo header, conteúdo e mudanças de orientação.
O loop termina ao alcançar o destino. Listeners, observers, frames e animações
são liberados ao desmontar.

A forma interpola `border-radius` com quatro cantos percentuais compatíveis.
Os SVGs de órbitas permanecem estáticos: não existe morph de caminhos SVG.
Ícones usam transform e textos usam opacity. A mudança de fundo e raio exige
pintura, limitada à ilustração; não há leituras de layout por quadro.

Com `prefers-reduced-motion`, altura inferior a 560 px ou aside que não cabe
abaixo do header, a seção fica estática, sem sticky e sem altura mínima extra
nos artigos. O conteúdo permanece no fluxo normal e não há scroll interno.

## Validação reproduzível

Com Vite e um perfil Edge/Chromium dedicado na porta 9222 (ver
`responsiveness.md`), executar sequencialmente:

```sh
node scripts/scroll-qa.mjs
npm run test:responsive
node scripts/motion-qa.mjs
```

`scroll-qa.mjs` testa 10 viewports de 360 × 800 a 3840 × 2160, incluindo
notebook 1280 × 720 e paisagem 844 × 390. Verifica progresso lento, rápido e
inverso em quadros reais, roda nativa, endpoints, ausência de overshoot,
overflow horizontal, orientação sem remontar, crescimento do texto e mudança
de movimento reduzido em tempo real. Capturas e métricas ficam em `.cache/scroll/`.

Limites: emulação headless não comprova desempenho em aparelhos físicos,
Safari/Firefox, zoom nativo ou o comportamento das barras móveis do navegador.

Resultado desta revisão: lint, typecheck, 11 testes unitários, `test:responsive`,
`motion-qa.mjs` e `scroll-qa.mjs` passaram. Build aprovado com
`npm run build -- --configLoader runner`; o carregador padrão do esbuild
encontra uma restrição de leitura de diretórios ancestrais neste ambiente.
Capturas inspecionadas em 390 × 844, 1280 × 720 e 1440 × 900.
