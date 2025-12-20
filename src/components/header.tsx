import * as React from "react"

// Header component
export function Header() {
  const [scrollProgress, setScrollProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      
      const totalScrollableHeight = documentHeight - windowHeight
      const progress = (scrollTop / totalScrollableHeight) * 100
      
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const IrAteSecao = (idSection: string) => {
    const section = document.getElementById(idSection)
    if (section) {
      section.scrollIntoView({behavior: "smooth"})
    }
  }

  return (
    <header className="bg-[#63348C] text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* LOGO */}
          <a href="/" className="flex-shrink-0 group">
            <div className="text-[#FAB900] font-extrabold text-2xl md:text-3xl leading-[0.85] tracking-tight transition-transform group-hover:scale-105">
              <div>VEM</div>
              <div className="ml-4">COMIGO</div>
            </div>
          </a>

          {/* NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-1">
            {["Início", "Sobre", "Locais", "Parceiros", "Ações", "Contato"].map((item) => (
              <button
                key={item}
                onClick={() => IrAteSecao(item)}
                className="text-white font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* CTA BUTTON */}
          <button
            className="bg-[#FAB900] text-[#63348C] hover:bg-[#FAB900]/90 shadow-sm hover:shadow-md transition-all font-semibold rounded-lg px-6 py-2"
            onClick={() => IrAteSecao("Contato")}
          >
            Fale Conosco
          </button>

        </div>
      </div>

      {/* BARRA DE PROGRESSO */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-[#FAB900] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  )
}