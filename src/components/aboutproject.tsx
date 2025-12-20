// components/sections/AboutProject.tsx
"use client";

import { Target, Heart, Users, Tv, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar o ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutProject() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const missionCardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Dados das features
  const features = [
    {
      icon: Users,
      title: "Combater o bullying",
      description: "Conscientizar e sensibilizar a comunidade escolar",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Heart,
      title: "Promover relações respeitosas",
      description: "Fomentar empatia entre os estudantes",
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: Target,
      title: "Saúde mental",
      description: "Conscientizar sobre importância do bem-estar",
      color: "from-amber-500 to-yellow-600",
    }
  ];

  // Animação inicial
  useEffect(() => {
    if (!sectionRef.current || hasAnimated.current) return;

    const ctx = gsap.context(() => {
      // Animação do título
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        }
      });

      // Animação dos elementos de fundo
      gsap.from(".bg-gradient", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
        }
      });

      // Animação das features
      gsap.from(".feature-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top center-=50",
          toggleActions: "play none none reverse",
        }
      });

      // Animação do cartão de missão
      gsap.from(missionCardRef.current, {
        scale: 0.9,
        opacity: 0,
        rotationY: -10,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: missionCardRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        }
      });

      // Animação do conteúdo descritivo
      gsap.from(".content-text", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: ".content-text",
          start: "top center-=30",
        }
      });

    }, sectionRef);

    hasAnimated.current = true;

    return () => ctx.revert();
  }, []);

  // Animação ao interagir com as features
  useEffect(() => {
    if (activeFeature !== null) {
      const featureElement = document.querySelector(`[data-feature-index="${activeFeature}"]`);
      if (featureElement) {
        gsap.to(featureElement, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }

    // Reset das features não ativas
    features.forEach((_, index) => {
      if (index !== activeFeature) {
        const featureElement = document.querySelector(`[data-feature-index="${index}"]`);
        if (featureElement) {
          gsap.to(featureElement, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    });
  }, [activeFeature, features.length]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full bg-gradient-to-br from-white via-purple-50/30 to-amber-50/20 flex items-center justify-center overflow-hidden"
    >
      {/* Elementos de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradientes de fundo com classes para animação */}
        <div className="bg-gradient absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-100/40 to-transparent rounded-full blur-3xl" />
        <div className="bg-gradient absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-amber-100/30 to-transparent rounded-full blur-3xl" />
        
        {/* Grid sutil */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(90deg, #66388C 1px, transparent 1px),
                            linear-gradient(180deg, #66388C 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* TÍTULO CENTRALIZADO */}
        <div ref={titleRef} className="text-center mb-8 md:mb-12 lg:mb-16">
          <SectionTitle prefix="Sobre o" highlighted="Projeto" /> 
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          
          {/* Coluna esquerda - Sobre o projeto */}
          <div className="space-y-8">
            {/* Descrição com classes para animação */}
            <div className="space-y-6">
              <p className="content-text text-gray-700 text-lg leading-relaxed">
                O <span className="font-semibold text-[#66388C]">Projeto VEM COMIGO</span> surgiu para transformar 
                relações através do diálogo e empatia, proporcionando formação para professores 
                como mediadores e combatendo ações perturbadoras.
              </p>

              <div className="content-text bg-gradient-to-r from-purple-50 to-amber-50/50 p-6 rounded-2xl border border-purple-100">
                <p className="font-semibold text-gray-800 text-lg">
                  Por meio de rodas de conversa, assembleias escolares e oficinas, buscamos:
                </p>
              </div>
            </div>

            {/* Features */}
            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  feature={feature}
                  index={index}
                  isActive={activeFeature === index}
                  onClick={() => setActiveFeature(index)}
                />
              ))}
            </div>
          </div>

          {/* Coluna direita - Mission Card */}
          <div ref={missionCardRef}>
            <MissionCard />
          </div>
        </div>
      </div>
    </section>
  );
}

// COMPONENTE SectionTitle
function SectionTitle({
  prefix,
  highlighted,
}: {
  prefix: string;
  highlighted: string;
}) {
  return (
    <div className="inline-block">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-center">
        {prefix}{" "}
        <span className="bg-gradient-to-r from-[#66388C] via-[#8B5DAF] to-[#FAB900] bg-clip-text text-transparent">
          {highlighted}
        </span>
      </h2>
      <div className="h-1 w-24 sm:w-32 md:w-40 mx-auto bg-gradient-to-r from-[#66388C]/50 to-[#FAB900]/50 rounded-full mt-2" />
    </div>
  );
}

// Componente Feature Item - COM ANIMAÇÕES
function FeatureItem({ 
  feature, 
  index, 
  isActive,
  onClick 
}: { 
  feature: any; 
  index: number; 
  isActive: boolean;
  onClick: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  // Animação do ícone ao passar o mouse
  const handleMouseEnter = () => {
    if (itemRef.current) {
      const icon = itemRef.current.querySelector('.feature-icon');
      gsap.to(icon, {
        rotationY: 360,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={itemRef}
      data-feature-index={index}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      className={`feature-item relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
        isActive 
          ? 'bg-white shadow-lg border-2 border-purple-200' 
          : 'bg-white/80 hover:bg-white border border-gray-100'
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 feature-icon`}>
          <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
            <feature.icon className="w-6 h-6" />
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-800 text-sm mb-1">
            {feature.title}
          </h3>
          <p className="text-xs text-gray-600">
            {feature.description}
          </p>
        </div>
      </div>

      {/* Indicador ativo com animação */}
      {isActive && (
        <div 
          className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-[#66388C] to-[#FAB900]"
          style={{
            animation: "pulse 2s infinite"
          }}
        />
      )}
    </div>
  );
}

// Componente Mission Card - COM ANIMAÇÕES
function MissionCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  // Efeito de brilho sutil
  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Animação de brilho contínuo
      gsap.to(".shine-effect", {
        backgroundPosition: "200% center",
        duration: 3,
        repeat: -1,
        ease: "none"
      });

      // Animação do botão ao passar o mouse
      const button = cardRef.current?.querySelector('.report-button');
      if (button) {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative" ref={cardRef}>
      {/* Efeito de brilho */}
      <div className="shine-effect absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] rounded-2xl" />
      
      {/* Cartão principal */}
      <div className="relative bg-gradient-to-br from-[#66388C] via-[#7A4B9E] to-[#FAB900] rounded-2xl p-8 text-white shadow-2xl overflow-hidden">
        <div className="relative z-10 space-y-6">
          {/* Cabeçalho */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                Nossa <span className="text-[#FAB900]">Missão</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-white to-[#FAB900] rounded-full mt-2" />
            </div>
          </div>

          {/* Texto da missão */}
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <p className="text-lg leading-relaxed">
              Melhorar a convivência escolar criando espaços de fala e escuta ativa, 
              promovendo um ambiente acolhedor e democrático através de rodas de conversa 
              e assembleias escolares.
            </p>
          </div>

          {/* Botão de reportagem */}
          <div>
            <a
              href="https://g1.globo.com/df/distrito-federal/df2/video/projeto-de-escola-publica-do-guara-envolve-estudantes-no-combate-ao-bullying-12977444.ghtml"
              target="_blank"
              rel="noopener noreferrer"
              className="report-button group inline-flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FAB900] to-[#FFD700] flex items-center justify-center">
                <Tv className="w-6 h-6 text-[#66388C]" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">Reportagem na Globo</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                </div>
                <p className="text-sm text-white/80">Assista nossa matéria</p>
              </div>
            </a>
          </div>

          {/* Rodapé com pontos animados */}
          <div className="pt-4 border-t border-white/20">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#FAB900]"
                    style={{
                      animation: `bounce 1.5s infinite ${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
              <span>Transformando vidas pela educação</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Adicionar estilos CSS para animações
const styles = `
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
`;

// Adicionar estilos ao documento
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}