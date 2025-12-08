import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// importa as imagens
import img1 from "../assets/images/imagem-1.jpg";
import img2 from "../assets/images/imagem-2.jpg";
import img3 from "../assets/images/imagem-3.jpg";
import img4 from "../assets/images/imagem-4.jpg";
import img5 from "../assets/images/imagem-5.jpg";

const heroImages = [
  {
    src: img1,
    alt: "Atividade do projeto Vem Comigo",
  },
  {
    src: img2,
    alt: "Dinâmica com alunos em sala",
  },
  {
    src: img3,
    alt: "Equipe Vem Comigo com estudantes",
  },
  {
    src: img4,
    alt: "Ação do projeto em ambiente escolar",
  },
  {
    src: img5,
    alt: "Foto da equipe vemcomigo.",
  },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // autoplay simples
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="Início"
      className="bg-[#FAB900] relative overflow-hidden scroll-mt-12 md:scroll-mt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* LEFT TEXT */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-tight md:leading-tight font-inter drop-shadow-lg">
              Convivência ética
              <br />
              Saúde mental e<br />
                Bem-estar<br />
              <span className="text-[#63348C]">nas escolas</span>
            </h1>

            <p className="text-white text-base sm:text-lg md:text-xl lg:text-xl font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md px-4 sm:px-0">
              O Projeto "Vem Comigo" foca em prevenir a violência escolar e
              melhorar a convivência, combatendo bullying, preconceito e
              agressões através de estratégias construtivas de resolução de
              conflitos.
            </p>

            <div className="flex justify-center lg:justify-start pt-4">
              <Button
                className="
                  bg-white text-[#63348C] px-8 sm:px-10 py-5 sm:py-6 
                  hover:bg-white/90 hover:scale-[1.03]
                  transition-all duration-300 ease-out
                  rounded-full text-base sm:text-lg font-semibold shadow-lg
                  w-full sm:w-auto max-w-xs sm:max-w-none
                "
                onClick={() => {
                  const contactSection = document.getElementById("Sobre");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Saiba mais
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE / CAROUSEL */}
          <div className="relative flex items-center justify-center lg:justify-end order-first lg:order-last">
            {/* Decorative Shapes - Responsive */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 sm:top-6 right-0 w-24 sm:w-32 md:w-36 lg:w-40 h-8 sm:h-10 md:h-12 lg:h-14 bg-[#63348C] rounded-full opacity-80 blur-sm translate-x-4 sm:translate-x-6 -translate-y-4 sm:-translate-y-6" />
              <div className="absolute top-12 sm:top-16 right-0 w-8 sm:w-10 md:w-12 lg:w-14 h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 bg-[#63348C] rounded-full opacity-90 translate-x-3 sm:translate-x-4" />
              <div className="absolute top-1/4 -left-8 sm:-left-10 md:-left-12 lg:-left-16 w-32 sm:w-40 md:w-48 lg:w-52 h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 bg-[#63348C] rounded-full opacity-85 blur-[1px]" />
            </div>

            {/* Caixa da imagem + carrossel */}
            <div className="relative z-10 drop-shadow-2xl mx-4 sm:mx-0">
              <div
                className="
                  relative
                  rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-white shadow-xl
                  hover:scale-[1.02] transition-all duration-300
                  w-[300px] h-[380px]
                  sm:w-[360px] sm:h-[460px]
                  md:w-[420px] md:h-[520px]
                  lg:w-[700px] lg:h-[580px]
                "
              >
                {/* Imagens em camadas com fade suave */}
                {heroImages.map((image, index) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className={`
                      absolute inset-0 w-full h-full object-cover
                      transition-opacity duration-700 ease-in-out
                      ${index === currentIndex ? "opacity-100" : "opacity-0"}
                    `}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                ))}
              </div>

              {/* Bolinhas do carrossel */}
              <div className="flex justify-center gap-2 mt-4">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full border border-white transition-all ${
                      index === currentIndex
                        ? "bg-white scale-110"
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
