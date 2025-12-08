// components/sections/AboutProject.tsx
"use client";

import { Target, Heart, Users, Tv } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

export function AboutProject() {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      text: "Combater o bullying conscientizando e sensibilizando os membros da comunidade escolar.",
      icon: Users,
    },
    {
      text: "Promover relações mais respeitosas e empáticas entre os estudantes.",
      icon: Heart,
    },
    {
      text: "Conscientizar sobre a importância de ter uma boa saúde mental.",
      icon: Target,
    },
  ];

  return (
    <section
      id="Sobre"
      className="container mx-auto px-4 mb-20 md:mb-28 scroll-mt-12 md:scroll-mt-20"
      ref={ref}
      style={{ overflow: "hidden" }}
    >
      {/* Título centralizado */}
      <div className="flex justify-center items-center mb-12 md:mb-16">
        <SectionTitle prefix="Sobre o" highlighted="Projeto" />
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
            <p className="text-2xl md:text-3xl font-bold text-[#66388C] bg-gradient-to-r from-[#66388C] to-[#FAB900] bg-clip-text text-transparent">
              O Projeto VEM COMIGO surgiu da necessidade de criar espaços de fala e de escuta ativa nas escolas.
            </p>

            <p className="text-gray-700 text-lg md:text-xl">
              Proporcionado uma melhor convivência, dando a  formação para professores serem mediadores desses espaços, auxiliando-os no enfrentamento as ações perturbadoras e violentas.
            </p>

            <p className="font-semibold text-gray-800 text-lg md:text-xl">
              Por meio das rodas de conversas temáticas, assembléias escolares, palestras  e oficinas com estudantes, professores e famílias para:
            </p>
          </div>

          <FeatureList features={features} />
        </div>

        {/* Mission Card */}
        <div className="relative">
          <MissionCard />
        </div>
      </div>
    </section>
  );
}

// Subcomponente: Título da Seção
function SectionTitle({
  prefix,
  highlighted,
}: {
  prefix: string;
  highlighted: string;
}) {
  return (
    <div className="relative text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight pt-9">
        {prefix}{" "}
        <span className="relative inline-block">
          <span className="bg-gradient-to-r from-[#66388C] via-[#8B5DAF] to-[#FAB900] bg-clip-text text-transparent">
            {highlighted}
          </span>
        </span>
      </h2>
    </div>
  );
}

// Subcomponente: Lista de Features
function FeatureList({
  features,
}: {
  features: Array<{ text: string; icon: any }>;
}) {
  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#66388C] to-[#FAB900] p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-5 h-5 text-[#66388C]" />
              </div>
            </div>
          </div>

          <span className="text-gray-800 text-lg font-medium group-hover:text-[#66388C] transition-colors duration-300">
            {feature.text}
          </span>
        </div>
      ))}
    </div>
  );
}

// Subcomponente: Cartão de Missão
function MissionCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative" style={{ overflow: "hidden" }}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-gradient-to-br from-[#66388C] via-[#7A4B9E] to-[#FAB900] rounded-2xl p-8 lg:p-12 text-white shadow-2xl"
        style={{ overflow: "hidden" }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ overflow: "hidden" }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-32 -translate-x-32"></div>
        </div>

        <div className="relative z-10 space-y-8" style={{ overflow: "hidden" }}>
          <div className="flex items-center gap-4" style={{ overflow: "hidden" }}>
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl lg:text-4xl font-bold">
              Nossa <span className="text-[#FAB900]">Missão</span>
            </h3>
          </div>

          <p
            className={`text-xl lg:text-xl text-justify leading-relaxed font-medium bg-white/5 p-6 rounded-2xl backdrop-blur-sm transition-transform duration-300 ${
              isHovered ? "scale-102" : ""
            }`}
          >
            Melhoria da convivência escolar, com a criação de  espaços de falas e escuta ativa, por meio das rodas de conversas temáticas e assembléias escolares, proporcionando um ambiente acolhedor e democrático. Potencializando  o protagonismo estudantil com as Comunidades de Cuidado e Apoio.
          </p>

          {/* Botão de Reportagem */}
          <div className="pt-2">
            <a
              href="https://g1.globo.com/df/distrito-federal/df2/video/projeto-de-escola-publica-do-guara-envolve-estudantes-no-combate-ao-bullying-12977444.ghtml"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-lg border border-white/20 hover:border-white/40"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FAB900] to-[#FFD700] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Tv className="w-5 h-5 text-[#66388C]" />
                </div>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white group-hover:text-[#FAB900] transition-colors">
                    Reportagem na globo
                  </span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
                <p className="text-sm text-white/80 group-hover:text-white">
                  Assista nossa matéria no G1
                </p>
              </div>
            </a>
          </div>

          <div className="pt-2">
            <div className="inline-flex items-center gap-2 text-white/80 text-sm lg:text-base">
              <div className="w-2 h-2 rounded-full bg-[#FAB900]"></div>
              Impactando vidas através da educação emocional
            </div>
          </div>
        </div>

        {/* Gradient border */}
        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-br from-white/20 to-transparent -z-10">
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#66388C] via-[#7A4B9E] to-[#FAB900]"></div>
        </div>
      </div>

      {/* Decoration */}
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#FAB900]/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#66388C]/20 rounded-full blur-xl"></div>
    </div>
  );
}
