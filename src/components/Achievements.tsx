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
      color: "from-[#66388C] to-[#8B5DAF]",
      bgColor: "bg-gradient-to-br from-[#66388C]/5 to-[#8B5DAF]/5",
      borderColor: "border-[#66388C]/20",
      textColor: "text-[#66388C]",
      iconColor: "#66388C",
      description: "Jovens impactados diretamente"
    },
    { 
      icon: School, 
      number: "7", 
      suffix: "",
      label: "Escolas Participantes",
      color: "from-[#FAB900] to-[#FFD166]",
      bgColor: "bg-gradient-to-br from-[#FAB900]/5 to-[#FFD166]/5",
      borderColor: "border-[#FAB900]/20",
      textColor: "text-[#FAB900]",
      iconColor: "#FAB900",
      description: "Instituições parceiras"
    },
    { 
      icon: Calendar, 
      number: "20", 
      suffix: "+",
      label: "Eventos Realizados",
      color: "from-[#8B5DAF] to-[#66388C]",
      bgColor: "bg-gradient-to-br from-[#8B5DAF]/5 to-[#66388C]/5",
      borderColor: "border-[#8B5DAF]/20",
      textColor: "text-[#8B5DAF]",
      iconColor: "#8B5DAF",
      description: "Atividades desenvolvidas"
    },
    { 
      icon: Heart, 
      number: "95", 
      suffix: "%",
      label: "Satisfação",
      color: "from-[#66388C] to-[#FAB900]",
      bgColor: "bg-gradient-to-br from-[#66388C]/5 to-[#FAB900]/5",
      borderColor: "border-[#66388C]/20",
      textColor: "text-[#66388C]",
      iconColor: "#66388C",
      description: "Feedback positivo"
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".section-title", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".section-description", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out"
      });

      gsap.from(".achievement-card", {
        y: 60,
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.4,
        ease: "back.out(1.4)"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="Conquistas" 
      className="relative py-16 md:py-24 bg-gradient-to-b from-white to-[#F8F9FA] scroll-mt-20"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#66388C]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-tr from-[#FAB900]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-bl from-[#8B5DAF]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-tr from-[#66388C]/10 to-transparent rounded-full blur-3xl" />
        
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

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="section-title text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-gray-900">Nossas</span>{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#66388C] via-[#8B5DAF] to-[#FAB900] bg-clip-text text-transparent">
                Conquistas
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#66388C] via-[#8B5DAF] to-[#FAB900] rounded-full"></div>
            </span>
          </h2>
          
          <p className="section-description text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Resultados que mostram o impacto positivo do nosso trabalho na comunidade escolar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            onAnimate();
            
            const targetNumber = parseInt(stat.number);
            let current = 0;
            const increment = targetNumber / 40;
            
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
            }, 25);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(cardRef.current);

    const card = cardRef.current;
    
    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(card, {
        y: -10,
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.2,
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
      <div className={`relative ${stat.bgColor} rounded-2xl p-6 md:p-8 text-center shadow-lg 
        hover:shadow-2xl transition-all duration-300 border-2 ${stat.borderColor} 
        hover:border-opacity-70 overflow-hidden`}>
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
          -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-white/80 to-transparent 
          flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
          <Sparkles className="w-6 h-6" style={{ color: stat.iconColor }} />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex justify-center">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} p-1 shadow-lg`}>
              <div className={`w-full h-full rounded-2xl ${stat.bgColor.includes('gradient') ? 'bg-white/90' : stat.bgColor} flex items-center justify-center 
                transition-transform duration-200 ${isHovered ? 'scale-110' : ''} backdrop-blur-sm`}>
                <stat.icon className="w-10 h-10" style={{ color: stat.iconColor }} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent drop-shadow-sm`}>
                {isAnimated ? displayNumber : `0${stat.suffix}`}
              </span>
            </div>
            
            <h3 className={`text-lg md:text-xl font-bold ${stat.textColor}`}>
              {stat.label}
            </h3>
            
            <p className={`text-sm font-medium opacity-90 ${stat.textColor}`}>
              {stat.description}
            </p>
          </div>   
        </div>

        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${stat.borderColor} rounded-tl-2xl`} />
        <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${stat.borderColor} rounded-tr-2xl`} />
        <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ${stat.borderColor} rounded-bl-2xl`} />
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${stat.borderColor} rounded-br-2xl`} />
      </div>

      <div className={`absolute inset-0 rounded-2xl -z-10 transition-all duration-300 ${
        isHovered 
          ? 'opacity-100 translate-y-4' 
          : 'opacity-0'
      }`}
        style={{ 
          background: stat.bgColor.includes('[#66388C]') 
            ? 'linear-gradient(135deg, #66388C20, #8B5DAF30)'
            : stat.bgColor.includes('[#FAB900]') 
            ? 'linear-gradient(135deg, #FAB90020, #FFD16630)'
            : stat.bgColor.includes('[#8B5DAF]')
            ? 'linear-gradient(135deg, #8B5DAF20, #66388C30)'
            : 'linear-gradient(135deg, #66388C20, #FAB90030)'
        }}
      />
    </div>
  );
}