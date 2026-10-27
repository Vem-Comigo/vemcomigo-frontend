# Marca no cabeçalho

## Origem e arquivo

O quadrado amarelo estava no próprio `public/images/vem-comigo-logo.svg`, não no CSS: dois retângulos de fundo (branco e `#fab900`), um PNG incorporado com amarelo gravado e oito grupos de sobreposição amarelos. O CSS usava dimensões quadradas de 88 × 88 px (76 no celular), deixando o lettering pequeno dentro das grandes margens do arquivo. O SVG público é idêntico ao original `vemcomigo-assets/Vem comigo logo (200 x 200 px).svg`.

O banner e o favicon também foram inspecionados; não foi encontrada uma versão horizontal transparente adequada. A composição original em duas linhas foi mantida, sem reescrever letras ou inventar símbolo.

Novo asset: `public/images/vem-comigo-wordmark.png`, PNG RGBA de 225 × 110 px. Preparado diretamente do raster de 285 × 271 px incorporado no SVG, isolando as duas regiões do lettering existente e retirando a contribuição do amarelo na transparência das bordas. Os vazios de O/G e os espaços entre letras também são transparentes. Não há filtro, mistura de cores, máscara ou fundo substituto no navegador. O original permaneceu intacto e continua disponível aos demais consumidores, inclusive o footer.

A preparação é reproduzível por `powershell -ExecutionPolicy Bypass -File scripts/prepare-header-logo.ps1`, usando System.Drawing do Windows. As coordenadas selecionam as linhas completas e excluem os ornamentos que o SVG original cobria com camadas amarelas. O script conserva posições, proporções e contornos rasterizados; não usa fonte substituta, redesenho, tracing ou ampliação artificial. A resolução é limitada pelo raster original: não é uma nova marca vetorial. Para maior nitidez em escalas superiores, fornecer o lettering original em SVG com curvas ou PNG transparente de maior resolução.

Foi avaliada uma extração pela ferramenta imagegen, com pedido de transparência e preservação exata do lettering. Ela foi **descartada**, pois a comparação mostrou pequenas diferenças nas proporções e bordas. Não está em uso no site. O arquivo final vem da extração determinística descrita acima.

## Referências e decisões

Aplicada a skill Refero Design, com pesquisa ao vivo e leitura dos estilos completos:

- [Handhold](https://handhold.io), estilo Refero `da999138-8b32-4c82-8df7-f6d239c01f2f`: base para a marca integrada ao fundo, sem enquadramento.
- [Aaron Poe & Co](https://aaronpoeandco.com), estilo Refero `b5366346-8c4d-4b66-86e7-abbcd8259c85`: referência secundária para hierarquia da marca e alinhamento com navegação.

| Decisão | Fonte | Aplicação |
| --- | --- | --- |
| Marca diretamente sobre o fundo claro | Handhold + pedido | PNG com alpha real, sem caixa ou moldura |
| Dar prioridade à marca e navegação | Aaron Poe & Co + pedido | Retirada da frase lateral e do separador |
| Preservar identidade e composição | Marca original + pedido | Lettering roxo em duas linhas; cores do portal intactas |
| Evitar aumentar a altura do header | Pedido + layout existente | Marca com 144 px de largura no desktop e 132 px no menu compacto, proporção intrínseca e respiro vertical |

Mantidos o container, o breakpoint de 960 px, o menu existente, o comportamento sticky e o ResizeObserver que mede a altura real para os offsets das âncoras. A marca é link para `#inicio`, com nome acessível único “Vem Comigo — início” e imagem com `alt=""`. Dimensões intrínsecas e `aspect-ratio` reservam espaço antes do carregamento.

## Verificação

Capturas anteriores à edição em `.cache/header/before-desktop.png` e `before-mobile.png`; capturas finais correspondentes em `after-desktop.png` (1440 × 900) e `after-mobile.png` (390 × 844). Capturas posteriores e métricas de tela também em `.cache/responsiveness/after/`, incluindo celular, tablet, laptop, Full HD, 2560 px e 4K. Comparação visual de marca, transparência, alinhamento e proporções. A inspeção do PNG confirmou alpha real, 1404 pixels de suavização parcial nas bordas e ausência de pixels amarelos; a altura medida do header no celular foi 81,53 px, com proporção da imagem de aproximadamente 2,0455, correspondente a 225/110.

Executados lint, checagem de tipos, build e o roteiro `test:responsive`. O roteiro verifica ausência de rolagem horizontal, teclado no menu, Escape, FAQ, foco de validação do formulário, âncoras, enquadramento da ilustração, texto aumentado em 200% e refluxo equivalente a zoom de até 200%. Nenhum envio de e-mail. Zoom nativo, leitor de tela real e aparelhos físicos não foram testados.

Alterações restritas ao header, regras da marca e arquivos necessários de preparação/documentação. Animações, campos e envio do contato preservados. Sem push ou deploy nesta revisão.
