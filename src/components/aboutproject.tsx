"use client";

import { Target, Heart, Users, Tv, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  const features = [
    {
      icon: Users,
      title: "Combater o bullying",
      description: "Conscientizar e sensibilizar a comunidade escolar",
      color: "from-[#66388C] to-[#8B5DAF]",
    },
    {
      icon: Heart,
      title: "Promover relações respeitosas",
      description: "Fomentar empatia entre os estudantes",
      color: "from-[#FAB900] to-[#FFD166]",
    },
    {
      icon: Target,
      title: "Saúde mental",
      description: "Conscientizar sobre importância do bem-estar",
      color: "from-[#8B5DAF] to-[#66388C]",
    }
  ];

  useEffect(() => {
    if (!sectionRef.current || hasAnimated.current) return;

    const ctx = gsap.context(() => {
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
      id="Sobre"
      className="relative py-16 md:py-24 bg-gradient-to-br from-white via-[#F8F9FA] to-[#FFF9E6] scroll-mt-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-gradient absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#66388C]/10 to-transparent rounded-full blur-3xl" />
        <div className="bg-gradient absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#FAB900]/10 to-transparent rounded-full blur-3xl" />
        
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(90deg, #66388C 1px, transparent 1px),
                            linear-gradient(180deg, #66388C 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-center mb-4">
            Sobre o{" "}
            <span className="bg-gradient-to-r from-[#66388C] via-[#8B5DAF] to-[#FAB900] bg-clip-text text-transparent">
              Projeto
            </span>
          </h2>
          <div className="h-1 w-24 sm:w-32 md:w-40 mx-auto bg-gradient-to-r from-[#66388C]/50 to-[#FAB900]/50 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <p className="content-text text-gray-700 text-base md:text-lg leading-relaxed">
                O <span className="font-semibold text-[#66388C]">Projeto VEM COMIGO</span> surgiu para transformar 
                relações através do diálogo e empatia, proporcionando formação para professores 
                como mediadores e combatendo ações perturbadoras.
              </p>

              <div className="content-text bg-gradient-to-r from-[#66388C]/5 to-[#FAB900]/5 p-6 rounded-2xl border border-[#66388C]/10">
                <p className="font-semibold text-gray-800 text-base md:text-lg">
                  Por meio de rodas de conversa, assembleias escolares e oficinas, buscamos:
                </p>
              </div>
            </div>

            <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  data-feature-index={index}
                  onClick={() => setActiveFeature(index)}
                  className={`feature-item relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-white shadow-lg border-2 border-[#66388C]/20' 
                      : 'bg-white/80 hover:bg-white border border-gray-100'
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-0.5`}>
                      <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-[#66388C]" />
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

                  {activeFeature === index && (
                    <div 
                      className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-r from-[#66388C] to-[#FAB900]"
                      style={{ animation: "pulse 2s infinite" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div ref={missionCardRef} className="relative">
            <div className="shine-effect absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] rounded-2xl" />
            
            <div className="relative bg-gradient-to-br from-[#66388C] via-[#7A4B9E] to-[#FAB900] rounded-2xl p-8 text-white shadow-2xl overflow-hidden">
              <div className="relative z-10 space-y-6">
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

                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <p className="text-base md:text-lg leading-relaxed">
                    Melhorar a convivência escolar criando espaços de fala e escuta ativa, 
                    promovendo um ambiente acolhedor e democrático através de rodas de conversa 
                    e assembleias escolares.
                  </p>
                </div>

                <div>
                  <a
                    href="https://g1.globo.com/df/distrito-federal/df2/video/projeto-de-escola-publica-do-guara-envolve-estudantes-no-combate-ao-bullying-12977444.ghtml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="report-button group inline-flex items-center gap-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#FAB900] to-[#FFD166] flex items-center justify-center">
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

                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#FAB900]"
                          style={{ animation: `bounce 1.5s infinite ${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                    <span>Transformando vidas pela educação</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </section>
  );
}