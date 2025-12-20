// components/sections/Achievements.tsx
"use client";

import { Users, School, Calendar, Heart, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animatedNumbers, setAnimatedNumbers] = useState<boolean[]>([]);
  
  const stats = [
    { 
      icon: Users, 
      number: "200", 
      suffix: "+",
      label: "Alunos Participantes",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-white",
      borderColor: "border-purple-200",
      textColor: "text-purple-800",
      iconColor: "#66388C",
      description: "Jovens impactados diretamente"
    },
    { 
      icon: School, 
      number: "7", 
      suffix: "",
      label: "Escolas Participantes",
      color: "from-yellow-500 to-amber-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-white",
      borderColor: "border-amber-200",
      textColor: "text-amber-800",
      iconColor: "#FAB900",
      description: "Instituições parceiras"
    },
    { 
      icon: Calendar, 
      number: "20", 
      suffix: "+",
      label: "Eventos Realizados",
      color: "from-purple-600 to-purple-700",
      bgColor: "bg-white",
      borderColor: "border-purple-100",
      textColor: "text-purple-900",
      iconColor: "#8B5DAF",
      description: "Atividades desenvolvidas"
    },
    { 
      icon: Heart, 
      number: "95", 
      suffix: "%",
      label: "Satisfação",
      color: "from-yellow-600 to-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-white",
      borderColor: "border-orange-200",
      textColor: "text-orange-800",
      iconColor: "#FF8C00",
      description: "Feedback positivo"
    }
  ];

  // Animações de entrada - MAIS RÁPIDAS
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animação do título - delay reduzido de 0.2 para 0
      gsap.from(".section-title", {
        y: 50,
        opacity: 0,
        duration: 0.6, // reduzido de 1
        ease: "power3.out",
        delay: 0 // reduzido de 0.2
      });

      // Animação da descrição - delay reduzido
      gsap.from(".section-description", {
        y: 30,
        opacity: 0,
        duration: 0.5, // reduzido de 0.8
        delay: 0.15, // reduzido de 0.5
        ease: "power2.out"
      });

      // Animação dos cards com stagger - delay reduzido
      gsap.from(".achievement-card", {
        y: 60,
        opacity: 0,
        scale: 0.8,
        stagger: 0.08, // reduzido de 0.15
        duration: 0.5, // reduzido de 0.8
        delay: 0.3, // reduzido de 0.8
        ease: "back.out(1.4)"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="Conquistas" 
      className="relative py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-100/30 to-transparent rounded-full blur-3xl" />
        
        {/* Grid sutil */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #66388C 1px, transparent 1px),
              linear-gradient(180deg, #66388C 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="section-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-gray-900">Nossas</span>{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#66388C] via-[#8B5DAF] to-[#FAB900] bg-clip-text text-transparent">
                Conquistas
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#66388C] via-[#8B5DAF] to-[#FAB900] rounded-full"></div>
            </span>
          </h2>
          
          <p className="section-description text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Resultados que mostram o impacto positivo do nosso trabalho na comunidade escolar
          </p>
        </div>

        {/* Grid de conquistas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <AchievementCard
              key={index}
              stat={stat}
              isAnimated={animatedNumbers[index] || false}
              onAnimate={() => {
                const newState = [...animatedNumbers];
                newState[index] = true;
                setAnimatedNumbers(newState);
              }}
            />
          ))}
        </div>

       
      </div>
    </section>
  );
}

// Componente Achievement Card
function AchievementCard({ 
  stat, 
  isAnimated,
  onAnimate 
}: { 
  stat: any; 
  isAnimated: boolean;
  onAnimate: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [displayNumber, setDisplayNumber] = useState("0" + stat.suffix);

  useEffect(() => {
    if (!cardRef.current) return;

    // Animar número quando entrar na viewport - threshold reduzido para começar mais cedo
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            onAnimate();
            
            // Animar contagem - MAIS RÁPIDO
            const targetNumber = parseInt(stat.number);
            let current = 0;
            const increment = targetNumber / 40; // reduzido de 50 para 40 para ser mais rápido
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= targetNumber) {
                current = targetNumber;
                clearInterval(timer);
              }
              
              const displayValue = stat.suffix === "+" 
                ? Math.floor(current) + "+"
                : stat.suffix === "%"
                ? Math.floor(current) + "%"
                : Math.floor(current).toString();
              
              setDisplayNumber(displayValue);
            }, 25); // reduzido de 40 para 25ms para animação mais rápida
          }
        });
      },
      { threshold: 0.2 } // reduzido de 0.5 para 0.2 - inicia animação mais cedo
    );

    observer.observe(cardRef.current);

    // Efeito de hover com GSAP - MAIS RÁPIDO
    const card = cardRef.current;
    
    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(card, {
        y: -10,
        scale: 1.05,
        duration: 0.2, // reduzido de 0.3
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.2, // reduzido de 0.3
        ease: "power2.out"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      observer.disconnect();
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isAnimated, stat.number, stat.suffix, onAnimate]);

  return (
    <div
      ref={cardRef}
      className="achievement-card group relative"
    >
      {/* Cartão principal */}
      <div className={`relative ${stat.bgColor} rounded-2xl p-6 md:p-8 text-center shadow-lg 
        hover:shadow-2xl transition-all duration-300 border ${stat.borderColor} 
        hover:border-opacity-50 overflow-hidden`}>
        
        {/* Efeito de brilho no hover - MAIS RÁPIDO */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0 to-transparent 
          -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

        {/* Ícone decorativo superior - MAIS RÁPIDO */}
        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-white/80 to-transparent 
          flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
          <Sparkles className="w-6 h-6" style={{ color: stat.iconColor }} />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 space-y-6">
          {/* Ícone principal */}
          <div className="flex justify-center">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} p-1`}>
              <div className={`w-full h-full rounded-2xl ${stat.bgColor.includes('gradient') ? 'bg-white' : stat.bgColor} flex items-center justify-center 
                transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}>
                <stat.icon className="w-10 h-10" 
                  style={{ 
                    color: stat.iconColor
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Número animado */}
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                {isAnimated ? displayNumber : `0${stat.suffix}`}
              </span>
            </div>
            
            {/* Título */}
            <h3 className={`text-lg md:text-xl font-bold ${stat.textColor}`}>
              {stat.label}
            </h3>
            
            {/* Descrição */}
            <p className={`text-sm ${stat.textColor.includes('purple') ? 'text-purple-700' : stat.textColor.includes('amber') ? 'text-amber-700' : 'text-orange-700'}`}>
              {stat.description}
            </p>
          </div>   
        </div>

        {/* Decoração dos cantos - cores personalizadas */}
        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${stat.borderColor} rounded-tl-2xl`} />
        <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${stat.borderColor} rounded-tr-2xl`} />
        <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ${stat.borderColor} rounded-bl-2xl`} />
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${stat.borderColor} rounded-br-2xl`} />
      </div>

      {/* Sombra projetada personalizada - MAIS RÁPIDA */}
      <div className={`absolute inset-0 rounded-2xl -z-10 transition-all duration-300 ${
        isHovered 
          ? 'bg-gradient-to-br opacity-100 translate-y-4' 
          : 'opacity-0'
      }`}
        style={{ 
          background: stat.bgColor.includes('purple') 
            ? 'linear-gradient(135deg, #66388C10, #8B5DAF20)' 
            : stat.bgColor.includes('amber') 
            ? 'linear-gradient(135deg, #FAB90010, #FFC10720)'
            : stat.bgColor.includes('orange')
            ? 'linear-gradient(135deg, #FF8C0010, #FFA50020)'
            : 'linear-gradient(135deg, #66388C10, #8B5DAF20)'
        }}
      />
    </div>
  );
}