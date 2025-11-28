import { Button } from "@/components/ui/button"

export function Header() {

  //Função que conecta os botões do header com as respectivas seções da página.
  const IrAteSecao = (idSection: string) => {
    const section = document.getElementById(idSection)
    if (section) {
      section.scrollIntoView({behavior: "smooth"})
    }
  }

  return (
    <header className="bg-[#63348C] text-white sticky top-0 z-50 shadow-lg shadow-black/10">
      <div className="container mx-auto px-4 py-4 lg:py-5">
        <div className="flex items-center justify-between gap-4">
          
          {/* LOGO */}
          <a href="/" className="flex-shrink-0 group">
            <div className="text-[#FAB900] font-extrabold text-2xl md:text-3xl font-nunito leading-5 tracking-tight transition-all group-hover:scale-[1.05]">
              <div>VEM</div>
              <div>COMIGO!</div>
            </div>
          </a>

          {/* NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-2">
            {["Início", "Sobre", "Ações", "Recursos", "Contato"].map((item) => (
              <Button
                key={item}
                onClick={() => IrAteSecao(item)}
                variant="ghost"
                className="
                  text-white font-medium text-lg
                  hover:bg-white/20 hover:text-white
                  transition-all duration-200
                  rounded-full px-6 py-2
                "
              >
                {item}
              </Button>
            ))}
          </nav>

          {/* CTA BUTTON */}
          <Button
            className="
              bg-[#FAB900] text-[#63348C]
              hover:bg-[#FAB900]/90
              shadow-md hover:shadow-lg
              transition-all duration-300
              text-md font-bold
              rounded-full px-6 md:px-8 py-2
            "
          >
            Fale Conosco
          </Button>

        </div>
      </div>
    </header>
  )
}
