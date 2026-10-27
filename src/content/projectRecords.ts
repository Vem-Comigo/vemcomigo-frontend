export const recordCategories = [
  { id: "formacao", label: "Formação de professores", theme: "sun" },
  { id: "rodas", label: "Rodas de conversa", theme: "lilac" },
  { id: "assembleias", label: "Assembleias escolares", theme: "peach" },
  { id: "ccas", label: "Comunidades de Cuidado e Apoio", theme: "purple" },
  { id: "realizacoes", label: "Realizações", theme: "sage" },
] as const;

export type RecordCategory = (typeof recordCategories)[number]["id"];
export type RecordImage = {
  /** Local public path, e.g. /images/em-acao/encontro-01.webp. Empty = placeholder. */
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};
export type ProjectRecord = {
  id: string;
  title: string;
  category: RecordCategory;
  description: string;
  summary: string;
  featured: boolean;
  demo: boolean;
  /** Real ISO date and location only, when available and authorized. */
  date?: string;
  location?: string;
  images: RecordImage[];
};

// These are layout examples, not claims about activities that have taken place.
// Replace with authorized records following docs/project-gallery.md.
export const projectRecords: ProjectRecord[] = [
  {
    id: "exemplo-formacao",
    title: "Preparar para estar junto",
    summary: "Um espaço para os aprendizados e as trocas entre professores.",
    category: "formacao",
    description: "Exemplo de espaço para apresentar a formação de professores tutores: os temas trabalhados, as trocas e os caminhos de cuidado. O relato e as fotografias serão incluídos quando houver um registro autorizado.",
    featured: true,
    demo: true,
    images: [
      { src: "", alt: "", caption: "Espaço reservado para uma fotografia da formação.", width: 1200, height: 800 },
      { src: "", alt: "", caption: "Espaço reservado para outro olhar sobre o mesmo encontro.", width: 1200, height: 800 },
    ],
  },
  {
    id: "exemplo-rodas",
    title: "Dar espaço à palavra",
    summary: "Um espaço para compartilhar escuta, diálogo e novos olhares.",
    category: "rodas",
    description: "Exemplo de registro de uma roda de conversa. Aqui poderão aparecer o contexto do encontro, o tema do diálogo e imagens autorizadas da atividade. Este conteúdo ainda é demonstrativo.",
    featured: false,
    demo: true,
    images: [{ src: "", alt: "", caption: "Espaço reservado para uma fotografia de uma roda de conversa.", width: 1200, height: 800 }],
  },
  {
    id: "exemplo-assembleia",
    title: "Construir com todos",
    summary: "Um espaço para a participação e as propostas da comunidade escolar.",
    category: "assembleias",
    description: "Exemplo de apresentação de uma assembleia escolar. O registro real poderá contar como a comunidade participa e constrói propostas em conjunto, sem identificar situações sensíveis ou estudantes sem autorização.",
    featured: false,
    demo: true,
    images: [{ src: "", alt: "", caption: "Espaço reservado para uma fotografia de uma assembleia.", width: 1200, height: 800 }],
  },
  {
    id: "exemplo-ccas",
    title: "O cuidado ganha companhia",
    summary: "Um espaço para as iniciativas de acolhimento e apoio entre estudantes.",
    category: "ccas",
    description: "Exemplo de espaço para registrar as Comunidades de Cuidado e Apoio. Os futuros relatos poderão mostrar iniciativas de acolhimento e escuta, sempre acompanhadas pelos adultos responsáveis e com o devido cuidado com a privacidade.",
    featured: false,
    demo: true,
    images: [{ src: "", alt: "", caption: "Espaço reservado para uma imagem autorizada das CCAs.", width: 1200, height: 800 }],
  },
  {
    id: "exemplo-realizacoes",
    title: "Caminhos que se encontram",
    summary: "Um espaço para as iniciativas e realizações do projeto.",
    category: "realizacoes",
    description: "Exemplo de espaço para compartilhar uma realização do projeto. Este cartão aguarda conteúdo real e verificado. Não representa um evento ocorrido, resultado alcançado ou compromisso de participação.",
    featured: false,
    demo: true,
    images: [],
  },
];
