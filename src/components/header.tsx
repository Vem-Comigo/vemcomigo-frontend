import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-[#63348C] text-white">
      <div className="container mx-auto px-4 py-4 lg:py-5">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex-shrink-0">
            <div className="text-[#FAB900] font-black text-xl md:text-2xl text-center font-nunito leading-6 cursor-pointer">
              <div>VEM</div>
              <div>COMIGO!</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            <Button
              variant="ghost"
              className="text-white hover:bg-[#FAB900] hover:text-[#63348C] text-md rounded-full px-6 cursor-pointer"
            >
              Início
            </Button>
            <Button variant="ghost" className="text-white hover:bg-[#FAB900] hover:text-[#63348C] text-md rounded-full px-6 cursor-pointer">
              Sobre
            </Button>
            <Button variant="ghost" className="text-white hover:bg-[#FAB900] hover:text-[#63348C] text-md rounded-full px-6 cursor-pointer">
              Ações
            </Button>
            <Button variant="ghost" className="text-white hover:bg-[#FAB900] hover:text-[#63348C] text-md rounded-full px-6 cursor-pointer">
              Recursos
            </Button>
            <Button variant="ghost" className="text-white hover:bg-[#FAB900] hover:text-[#63348C] text-md rounded-full px-6 cursor-pointer">
              Contato
            </Button>
          </nav>
          <Button className="bg-[#FAB900] text-[#63348C] hover:bg-[#FAB900]/90 hover:text-[#63348C] text-md rounded-xl px-6 md:px-8 font-semibold whitespace-nowrap cursor-pointer">
            Fale Conosco
          </Button>
        </div>
      </div>
    </header>
  )
}