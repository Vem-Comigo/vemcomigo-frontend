// components/sections/Locations.tsx
import { MapPin } from "lucide-react"

export function Locations() {
  const schools = [
    "CEF 01 de Planaltina",
    "CEF 02 de Planaltina", 
    "CEF 03 de Planaltina",
    "CEF 04 de Planaltina",
    "CEF 05 de Planaltina",
    "CEF 06 de Planaltina",
    "CEF 07 de Planaltina",
    "CEF 08 de Planaltina"
  ]

  return (
    <section className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Text Content */}
        <div className="space-y-6">
          <SectionBadge icon={MapPin} text="Atuação" />
          
          <SectionTitle 
            prefix="Onde"
            highlighted="Atuamos"
          />

          <p className="text-lg text-gray-600 leading-relaxed">
            Estamos presentes em escolas públicas do Distrito Federal, 
            levando nosso projeto para comunidades que mais precisam de apoio.
          </p>

          <SchoolList schools={schools} />
        </div>

        {/* Map Card */}
        <MapCard />
      </div>
    </section>
  )
}

// Subcomponente: Badge (reutilizado)
function SectionBadge({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[#FAB900]/10 text-[#66388C] rounded-full px-4 py-2 border border-[#FAB900]/20">
      <Icon className="w-4 h-4" />
      <span className="text-sm font-semibold">{text}</span>
    </div>
  )
}

// Subcomponente: Título (reutilizado)
function SectionTitle({ prefix, highlighted }: { prefix: string, highlighted: string }) {
  return (
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
      {prefix}{' '}
      <span className="bg-gradient-to-r from-[#66388C] to-[#FAB900] bg-clip-text text-transparent">
        {highlighted}
      </span>
    </h2>
  )
}

// Subcomponente: Lista de Escolas
function SchoolList({ schools }: { schools: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {schools.map((school, index) => (
        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-[#66388C]/5 transition-colors duration-200">
          <div className="w-2 h-2 bg-[#FAB900] rounded-full" />
          <span className="text-gray-700 font-medium">{school}</span>
        </div>
      ))}
    </div>
  )
}

// Subcomponente: Cartão do Mapa
function MapCard() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#66388C] to-[#8A4CB6] rounded-2xl p-8 aspect-video flex items-center justify-center">
        <div className="text-center text-white">
          <MapPin className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-2">Distrito Federal</h3>
          <p className="opacity-90">Escolas públicas atendidas</p>
        </div>
      </div>
      
      {/* Floating Elements */}
      <LocationPin position="top-left" text="Planaltina" />
      <SchoolCountBadge />
    </div>
  )
}

// Subcomponente: Pino de Localização
function LocationPin({ position, text }: { position: string, text: string }) {
  const positionClasses = {
    "top-left": "-top-4 -left-4",
    "top-right": "-top-4 -right-4",
    "bottom-left": "-bottom-4 -left-4", 
    "bottom-right": "-bottom-4 -right-4"
  }[position]

  return (
    <div className={`absolute ${positionClasses} bg-white rounded-xl p-3 shadow-lg border border-gray-200`}>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-[#FAB900] rounded-full" />
        <span className="text-sm font-semibold text-gray-700">{text}</span>
      </div>
    </div>
  )
}

// Subcomponente: Badge de Contagem de Escolas
function SchoolCountBadge() {
  return (
    <div className="absolute -bottom-4 -right-4 bg-[#FAB900] rounded-xl p-3 shadow-lg">
      <div className="text-white text-sm font-semibold">+15 Escolas</div>
    </div>
  )
}