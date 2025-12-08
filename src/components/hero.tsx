import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// importa as imagens 
import img1 from "../assets/images/imagem-1.jpg";
import img2 from "../assets/images/imagem-2.jpg";
import img3 from "../assets/images/imagem-3.jpg";
import img4 from "../assets/images/imagem-4.jpg";
import img5 from "../assets/images/imagem-5.jpg";

const heroImages = [
  { src: img1, alt: "Atividade do projeto Vem Comigo" },
  { src: img2, alt: "Dinâmica com alunos em sala" },
  { src: img3, alt: "Equipe Vem Comigo com estudantes" },
  { src: img4, alt: "Ação do projeto em ambiente escolar" },
  { src: img5, alt: "Foto da equipe vemcomigo." },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="Início" className="bg-[#FAB900] relative overflow-hidden scroll-mt-12 md:scroll-mt-20">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 xl:py-24">

        {/* GRID RESPONSIVO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT TEXT */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left px-2 sm:px-0">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-tight font-inter drop-shadow-lg">
              Educação<br />
              Saúde Mental<br />
              e Bem-Estar<br />
              <span className="text-[#63348C]">nas Escolas</span>
            </h1>

            <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md px-3 sm:px-0">
              Um projeto dedicado ao combate ao bullying e à promoção da saúde mental
              em escolas públicas do Distrito Federal.
            </p>

            <div className="flex justify-center lg:justify-start pt-4">
              <Button
                className="
                  bg-white text-[#63348C] 
                  px-8 sm:px-10 py-5 sm:py-6 
                  hover:bg-white/90 hover:scale-[1.03]
                  transition-all duration-300 ease-out
                  rounded-full text-base sm:text-lg font-semibold shadow-lg
                  w-full sm:w-auto max-w-xs sm:max-w-none
                "
              >
                Saiba mais
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE / CAROUSEL */}
          <div className="relative flex items-center justify-center lg:justify-end order-first lg:order-last w-full">

            {/* DECORATIVE SHAPES (Ajustados para mobile) */}
            <div className="absolute inset-0 pointer-events-none hidden sm:block">
              <div className="absolute top-6 right-0 w-28 md:w-36 h-10 md:h-12 bg-[#63348C] rounded-full opacity-70 blur-sm translate-x-4 -translate-y-6" />
              <div className="absolute top-16 right-0 w-10 md:w-14 h-64 md:h-80 bg-[#63348C] rounded-full opacity-90 translate-x-3" />
              <div className="absolute top-1/4 -left-12 w-40 md:w-52 h-40 md:h-52 bg-[#63348C] rounded-full opacity-80 blur-[2px]" />
            </div>

            {/* CAROUSEL BOX – totalmente responsivo */}
            <div className="relative z-10 drop-shadow-2xl w-full max-w-[480px] sm:max-w-[540px] md:max-w-[650px] lg:max-w-[700px] mx-auto">

              <div
                className="
                  relative overflow-hidden rounded-2xl sm:rounded-3xl border-4 border-white shadow-xl
                  hover:scale-[1.02] transition-all duration-300
                  h-[360px] sm:h-[430px] md:h-[500px] lg:h-[560px]
                  w-full
                "
              >
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

              {/* Carousel Dots */}
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
