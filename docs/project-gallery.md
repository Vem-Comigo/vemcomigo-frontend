# Vem Comigo em ação

A galeria fica depois de “Como atuamos”, com a âncora `#em-acao` e o link “Em ação” na navegação. Substitui a antiga lista vazia de atividades; os relatos autorizados continuam independentes. Não há upload, CMS, API ou dependência nova.

## Substituir exemplos por registros reais

1. Coloque as fotografias locais em **`public/images/em-acao/`**. Prefira WebP/AVIF ou JPEG otimizado, aproximadamente 1200–1600 px de largura conforme o original. Evite enviar arquivos enormes direto da câmera.
2. Edite **`src/content/projectRecords.ts`**, no array `projectRecords`. Os componentes não precisam de alterações.
3. Substitua o título, o resumo e a descrição demonstrativos pelo conteúdo real. Troque `demo` para `false` somente quando o registro e o uso das imagens estiverem autorizados. Os cinco exemplos atuais não representam eventos ou resultados realizados.
4. Preencha a lista `images` com caminhos que começam em `/images/em-acao/` — sem o prefixo `public`. Informe texto alternativo, legenda e dimensões reais de cada arquivo.
5. Remova os exemplos que não serão usados. Data e local são opcionais: deixe os campos ausentes quando não houver informação confirmada. A data deve seguir `AAAA-MM-DD`.

Exemplo de estrutura para preencher, sem dados de evento presumidos:

```ts
{
  id: "identificador-estavel",
  title: "Título do registro autorizado",
  summary: "Resumo curto para o cartão da galeria.",
  category: "rodas",
  description: "Relato completo da atividade. Pode conter vários parágrafos.",
  featured: false,
  demo: false,
  images: [
    {
      src: "/images/em-acao/nome-do-arquivo.webp",
      alt: "Descrição objetiva da fotografia e de seu contexto.",
      caption: "Legenda confirmada e crédito, quando aplicável.",
      width: 1200,
      height: 800,
    },
  ],
}
```

As categorias aceitas são `formacao`, `rodas`, `assembleias`, `ccas` e `realizacoes`. As etiquetas e cores estão no mesmo arquivo, em `recordCategories`. O filtro “Todos” é automático. Use um único `featured: true` para o registro principal; a ordem do array determina a leitura. Os filtros preservam essa ordem. O layout não reorganiza visualmente os registros com `order` ou masonry por colunas.

`images: []` ou `src: ""` mantém o placeholder gráfico “Imagem em breve”. Uma falha de carregamento mostra “Imagem indisponível” sem impedir a leitura do relato. Duas ou mais imagens habilitam automaticamente as setas e o contador no modal; não há reprodução automática. No cartão a foto ocupa o espaço com `cover`; no modal ela é apresentada integralmente com `contain`. Dimensões e proporções reservam espaço para evitar saltos de layout. Fotos dos cartões usam lazy loading; apenas a imagem aberta no modal carrega imediatamente.

O aviso geral se adapta quando exemplos e registros reais coexistem e desaparece automaticamente ao substituir todos os exemplos. A marca de conteúdo demonstrativo em cada cartão e modal depende de `demo`. O site não inventa datas, local, depoimentos ou números de impacto.

## Pesquisa e direção visual

Pesquisa ao vivo com Refero Design, antes da implementação:

- **Eventbrite**, estilo `4aa419e7-b05e-48f7-9dd8-4f65d5fc153f`, [origem](https://www.eventbrite.com): base para conteúdo visual predominante, cartões leves, categorias e filtros em pílula.
- **Ryan Stephen**, estilo `a21e4cce-3f07-4d5a-8599-fa492a63622f`, [origem](https://www.ryanstephen.co): referência secundária para a imagem como protagonista e o respiro de uma galeria editorial.
- [Asana Events no Refero](https://refero.design/pages/0070efb7-471b-4676-b4eb-9ab494cedafb): organização de filtros por categoria antes dos cartões.
- [Care — galeria no Refero](https://refero.design/pages/5b5ad04d-9563-4157-8e7c-ff5b5ca0705c): imagem ampliada com controles explícitos para navegar e fechar.

| Decisão | Fonte / papel | Adaptação |
| --- | --- | --- |
| Imagem predominante, texto breve e categoria | Eventbrite | Um destaque e quatro cartões complementares, sem metadados inventados |
| Escala editorial e espaçamento | Galeria Ryan Stephen + pedido de mosaico | Destaque de duas linhas no desktop, composição lateral no tablet e uma coluna no celular |
| Filtros visíveis antes dos registros | Eventbrite / Asana | Pílulas que quebram linha, sem cortar etiquetas nem criar rolagem horizontal na página |
| Ampliação com navegação explícita | Care | Modal nativo com imagem, legenda, texto e controles de 46 px |
| Identidade e placeholders | Sistema Vem Comigo e pedido | Roxo, amarelo, lilás, Nunito, formas de diálogo e conexão, sem simular fotografia |

Os estilos completos e os detalhes das duas telas foram consultados. A variação de tamanho do mosaico vem do pedido do usuário; não foi atribuída a um padrão de masonry que as referências não mostram. Não foram importadas a paleta azul ou as fontes do Eventbrite.

Foi reavaliada a adequação do **Cult UI Expandable**, cujo fonte já havia sido pesquisado: sua expansão no lugar com `motion` e `react-use-measure` não atende sozinha ao foco, à camada modal e à navegação entre imagens solicitados. Foi mantido o CSS nativo e o componente de títulos existente, sem adicionar bibliotecas de animação ou medição. O modal usa `<dialog>` e `showModal()`.

## Comportamento, acessibilidade e movimento

- Cartões são artigos com título e botão nativo para abrir detalhes. A área inteira é clicável por um pseudo-elemento do botão; não há `div` com `onClick` nem conteúdo importante só no hover.
- Filtros são botões com `aria-pressed` em um grupo identificado. Resultado anunciado com `role="status"`. O espaço do indicador selecionado é reservado para evitar mudanças de largura ao trocar o filtro.
- Modal com nome pelo título, aviso demonstrativo associado e conteúdo de fundo inerte. Foco inicial no botão fechar, ciclo de Tab/Shift+Tab, Escape, retorno ao cartão e restauração do overflow/padding anteriores do body.
- Rolagem do fundo fica bloqueada enquanto o modal está aberto, incluindo durante sua saída. O próprio modal rola em telas baixas e mantém o botão fechar no topo. Não há scroll preso na página ou reprodução automática de fotos.
- Cada cartão entra ao alcançar a área visível, observado individualmente e com pequeno escalonamento. Filtros reapresentam os novos cartões com transição curta. O modal tem entrada/saída de 240 ms. CSS centralizado em `gallery.css`, usando curvas e intensidades já existentes; nenhum loop contínuo.
- `prefers-reduced-motion` desliga os efeitos e fecha o modal imediatamente. Conteúdo fica visível no estilo base, mesmo se o observador ou uma animação não rodar. SVGs decorativos não recebem foco.

## Validação e repetição

Checks: `npm.cmd run lint`, `npm.cmd run typecheck`, `npm.cmd test` (11 testes existentes) e `npm.cmd run build`. Nenhuma mudança no backend ou no contrato de contato.

O roteiro **`node scripts/gallery-qa.mjs`** usa o mesmo perfil Edge/Chromium dedicado na porta 9222 dos roteiros existentes. `QA_URL` permite apontar para o servidor local; execute os roteiros sequencialmente, pois controlam a mesma aba.

Verifica nove telas de 360 px a 4K, paisagem, filtros e seleção única, abertura/fechamento, foco, Tab/Shift+Tab, Escape, teclado nas fotos, retorno ao cartão, bloqueio de rolagem, múltiplas imagens, ausência de foto, fallback de imagem ausente e descrição longa. Os testes de foto real e metadados usam apenas fixtures em memória no navegador, removidas ao recarregar, sem acrescentar eventos ao conteúdo publicado. Há também teste de abertura por toque, quadros intermediários da troca de filtro e saída animada, além de movimento reduzido.

Capturas e evidências estão em `.cache/gallery/`, incluindo mosaico desktop/celular, modal, telas baixas, descrição longa, `metrics.json` e `frames.json`. O roteiro não envia formulários. Os roteiros existentes de responsividade e contato com mocks verificam a integração com o restante do portal.

Limites: emulação em Edge headless; sem aparelhos físicos, Safari/Firefox ou leitor de tela real. Texto a 200% e refluxo equivalente a zoom são verificações separadas do zoom nativo do navegador. Nenhum e-mail real, push ou deploy.
