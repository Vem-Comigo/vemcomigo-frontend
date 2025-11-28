import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="Início" className="bg-[#FAB900] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
          
          {/* LEFT TEXT */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-tight md:leading-tight font-inter drop-shadow-lg">
              Educação<br />
              Saúde Mental<br />
              e Bem-Estar<br />
              <span className="text-[#63348C]">nas Escolas</span>
            </h1>

            <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md px-4 sm:px-0">
              Um projeto dedicado ao combate ao bullying e à promoção da saúde mental
              em escolas públicas do Distrito Federal.
            </p>

            <div className="flex justify-center lg:justify-start pt-4">
              <Button className="
                bg-white text-[#63348C] px-8 sm:px-10 py-5 sm:py-6 
                hover:bg-white/90 hover:scale-[1.03]
                transition-all duration-300 ease-out
                rounded-full text-base sm:text-lg font-semibold shadow-lg
                w-full sm:w-auto max-w-xs sm:max-w-none
              ">
                Saiba mais
              </Button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex items-center justify-center lg:justify-end order-first lg:order-last">
            
            {/* Decorative Shapes - Responsive */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 sm:top-6 right-0 w-24 sm:w-32 md:w-36 lg:w-40 h-8 sm:h-10 md:h-12 lg:h-14 bg-[#63348C] rounded-full opacity-80 blur-sm translate-x-4 sm:translate-x-6 -translate-y-4 sm:-translate-y-6" />
              <div className="absolute top-12 sm:top-16 right-0 w-8 sm:w-10 md:w-12 lg:w-14 h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 bg-[#63348C] rounded-full opacity-90 translate-x-3 sm:translate-x-4" />
              <div className="absolute bottom-0 right-8 sm:right-12 md:right-16 lg:right-20 w-32 sm:w-40 md:w-48 lg:w-52 h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 bg-[#63348C] rounded-full opacity-90 blur-[1px]" />
              <div className="absolute top-1/4 -left-8 sm:-left-10 md:-left-12 lg:-left-16 w-32 sm:w-40 md:w-48 lg:w-52 h-32 sm:h-40 md:h-44 lg:h-48 xl:h-52 bg-[#63348C] rounded-full opacity-85 blur-[1px]" />
            </div>

            {/* Main Image */}
            <div className="relative z-10 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl drop-shadow-2xl mx-4 sm:mx-0">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden border-4 border-white shadow-xl hover:scale-[1.02] transition-all duration-300">
                <img
                  src="./src/assets/images/kid-1.png"
                  alt="Criança feliz brincando de balanço"
                  className="object-cover w-full h-full"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}