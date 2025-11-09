import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="bg-[#FAB900] relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-balance leading-16 font-inter [text-shadow:2px_4px_12px_rgba(0,0,0,0.25)]">
              Educação <br/>
              Saúde Mental<br/>e Bem-Estar<br/>
              <span className="text-[#63348C]">nas Escolas</span>
            </h1>

            <p className="text-white text-lg md:text-xl leading-relaxed max-w-lg font-inter font-semibold [text-shadow:2px_4px_12px_rgba(0,0,0,0.25)]">
              Um projeto dedicado ao combate ao bullying e à promoção da saúde mental em escolas públicas do Distrito
              Federal.
            </p>

            <Button className="bg-white text-[#63348C] hover:bg-white/90 hover:text-[#63348C] rounded-full px-8 py-6 text-lg font-semibold cursor-pointer">
              Saiba mais
            </Button>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute top-0 right-0 w-32 md:w-40 h-8 md:h-10 bg-[#63348C] rounded-full transform translate-x-8 -translate-y-4" />

              <div className="absolute top-8 right-0 w-8 md:w-10 h-64 md:h-80 bg-[#63348C] rounded-full transform translate-x-4" />

              <div className="absolute -bottom-8 right-12 md:right-20 w-32 md:w-40 h-32 md:h-40 bg-[#63348C] rounded-full" />

              <div className="absolute top-1/4 -left-12 md:-left-16 w-32 md:w-40 h-32 md:h-40 bg-[#63348C] rounded-full" />
            </div>

            <div className="relative z-10 w-full h-full max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="./src/assets/images/kid-1.png"   
                  alt="Criança feliz brincando de balanço"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
