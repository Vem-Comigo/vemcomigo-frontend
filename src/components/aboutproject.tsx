// components/sections/AboutProject.tsx
"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export function AboutProject() {
  const [isVisible, setIsVisible] = useState(false);
  const features = [
    "Combater o bullying e promover relações mais empáticas",
    "Conscientizar sobre saúde mental e quebrar tabus",
    "Promover o bem-estar integral dos estudantes"
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="Sobre" className="container mx-auto px-4 mb-20 md:mb-28 ">
      {/* Título centralizado com animação */}
      <div className={`flex justify-center items-center mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <SectionTitle 
          prefix="Sobre o"
          highlighted="Projeto"
        />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Text Content */}
        <div className="space-y-6">
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p className="text-xl md:text-2xl font-semibold text-[#66388C]">
              O Vem Comigo nasceu da necessidade urgente de criar ambientes escolares 
              mais saudáveis e acolhedores para nossos jovens.
            </p>
            <p>
              Desenvolvido especialmente para escolas públicas do Distrito Federal, 
              nosso projeto combina educação, psicologia e ação social.
            </p>
            <p className="font-medium text-gray-700">
              Através de oficinas, palestras e rodas de conversa, trabalhamos diretamente 
              com estudantes, professores e famílias para:
            </p>
          </div>

          <FeatureList features={features} />
        </div>

        {/* Mission Card */}
        <MissionCard />
      </div>
    </section>
  );
}

// Subcomponente: Título da Seção
function SectionTitle({ prefix, highlighted }: { prefix: string; highlighted: string }) {
  return (
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-center pt-9">
      {prefix}{" "}
      <span className="bg-gradient-to-r from-[#66388C] to-[#FAB900] bg-clip-text text-transparent">
        {highlighted}
      </span>
    </h2>
  );
}

// Subcomponente: Lista de Features
function FeatureList({ features }: { features: string[] }) {
  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-[#FAB900] flex-shrink-0 mt-0.5" />
          <span className="text-gray-700 text-lg">{feature}</span>
        </div>
      ))}
    </div>
  );
}

// Subcomponente: Cartão de Missão
function MissionCard() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#66388C] to-[#FAB900] rounded-2xl p-8 lg:p-12 text-white">
        <div className="space-y-6">
          <h3 className="text-2xl lg:text-3xl font-bold">Nossa Missão</h3>
          <p className="text-lg lg:text-xl leading-relaxed opacity-90">
            Transformar escolas em ambientes de acolhimento, respeito e 
            desenvolvimento saudável para todos os estudantes.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FAB900]/20 rounded-full blur-xl" />
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#66388C]/20 rounded-full blur-xl" />
    </div>
  );
}