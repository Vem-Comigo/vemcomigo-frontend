export const navigation = [
  { href: "#projeto", label: "O projeto" },
  { href: "#atuacao", label: "Como atuamos" },
  { href: "#em-acao", label: "Em ação" },
  { href: "#formacao", label: "Formação" },
  { href: "#ccas", label: "As CCAs" },
] as const;

export const approaches = [
  {
    title: "Estudar para compreender",
    label: "Grupo de estudo",
    description:
      "Um espaço entre professores para compreender a convivência escolar e construir estratégias de cuidado.",
    icon: "book",
  },
  {
    title: "Dar espaço à palavra",
    label: "Rodas de conversa",
    description:
      "Encontros temáticos mediados por professores tutores, que convidam à escuta, ao diálogo e à reflexão.",
    icon: "chat",
  },
  {
    title: "Construir com todos",
    label: "Assembleias escolares",
    description:
      "Momentos de participação para conversar sobre a vida na escola e construir caminhos coletivos.",
    icon: "users",
  },
  {
    title: "Cuidar em comunidade",
    label: "Redes de cuidado",
    description:
      "Apoio à construção das CCAs, aproximando estudantes, professores tutores e a rede de apoio.",
    icon: "heart",
  },
] as const;

export const questions = [
  {
    question: "Para quem é o Vem Comigo?",
    answer:
      "O projeto se dirige a escolas interessadas em fortalecer o diálogo, a participação e a convivência escolar. A formação prepara professores tutores para mediar espaços de conversa e acompanhar redes de cuidado entre estudantes.",
  },
  {
    question: "O que faz um professor tutor?",
    answer:
      "O professor tutor se prepara para mediar rodas de conversa e assembleias escolares, acompanhar as Comunidades de Cuidado e Apoio e articular o apoio dos adultos responsáveis quando necessário.",
  },
  {
    question: "Como os estudantes das CCAs são escolhidos?",
    answer:
      "Os integrantes são escolhidos pelos próprios colegas com base em confiança, compromisso e responsabilidade. Eles recebem formação para acolher, escutar e ajudar, sempre com acompanhamento dos professores tutores.",
  },
  {
    question: "As CCAs substituem o apoio de profissionais?",
    answer:
      "Não. As CCAs são redes de apoio entre estudantes. Seus integrantes acolhem e escutam os colegas, comunicando situações aos professores tutores. Cabe aos adultos responsáveis articular o apoio e os encaminhamentos necessários. Estudantes não assumem o papel de terapeutas nem resolvem situações graves sozinhos.",
  },
  {
    question: "Como minha escola pode participar?",
    answer:
      "O primeiro passo é manifestar interesse pelo contato institucional. A conversa com a equipe permite conhecer o contexto da escola e verificar possibilidades de participação. O contato não representa adesão automática. Formato, disponibilidade e condições precisam ser acordados com a equipe.",
  },
] as const;

// Publicar somente registros com autorização de uso e relatos com fonte verificável.
export type Testimonial = {
  quote: string;
  attribution: string;
  source: string;
  authorized: true;
};
export const testimonials: Testimonial[] = [];
