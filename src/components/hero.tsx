import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="bg-[#FAB900] relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT TEXT */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight font-inter drop-shadow-lg">
              Educação<br />
              Saúde Mental<br />
              e Bem-Estar<br />
              <span className="text-[#63348C]">nas Escolas</span>
            </h1>

            <p className="text-white text-lg md:text-2xl font-medium max-w-xl leading-relaxed drop-shadow-md">
              Um projeto dedicado ao combate ao bullying e à promoção da saúde mental
              em escolas públicas do Distrito Federal.
            </p>

            <Button className="
              bg-white text-[#63348C] px-10 py-6 
              hover:bg-white/90 hover:scale-[1.03]
              transition-all duration-300 ease-out
              rounded-full text-lg font-semibold shadow-lg
            ">
              Saiba mais
            </Button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex items-center justify-center lg:justify-end">
            
            {/* Decorative Shapes */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-6 right-0 w-36 md:w-48 h-10 md:h-14 bg-[#63348C] rounded-full opacity-80 blur-sm translate-x-6 -translate-y-6" />
              <div className="absolute top-16 right-0 w-10 md:w-12 h-72 md:h-96 bg-[#63348C] rounded-full opacity-90 translate-x-4" />
              <div className="absolute bottom-0 right-12 md:right-20 w-40 md:w-52 h-40 md:h-52 bg-[#63348C] rounded-full opacity-90 blur-[1px]" />
              <div className="absolute top-1/4 -left-10 md:-left-16 w-40 md:w-52 h-40 md:h-52 bg-[#63348C] rounded-full opacity-85 blur-[1px]" />
            </div>

            {/* Main Image */}
            <div className="relative z-10 max-w-md lg:max-w-xl drop-shadow-2xl">
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-xl hover:scale-[1.02] transition-all duration-300">
                <img
                  src="./src/assets/images/kid-1.png"
                  alt="Criança feliz brincando de balanço"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
