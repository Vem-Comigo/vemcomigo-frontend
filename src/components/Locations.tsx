// components/sections/Locations.tsx
import { ExternalLink, School, Users, Calendar, MapPin, Navigation } from "lucide-react"
import { useState } from "react"

export function Locations() {
  const schools = [
    {
      id: 1,
      name: "CEF 01 de Planaltina",
      address: "Área Especial, Setor Norte - Planaltina/DF",
      students: 1200,
      since: "2023",
      coordinates: { top: "25%", left: "30%" },
      googleMapsUrl: "https://www.google.com/maps/search/CEF+01+de+Planaltina+Área+Especial+Setor+Norte+Planaltina+DF"
    },
    {
      id: 2,
      name: "CEF 02 de Planaltina",
      address: "Quadra 10, Conjunto A - Planaltina/DF",
      students: 950,
      since: "2023",
      coordinates: { top: "35%", left: "70%" },
      googleMapsUrl: "https://www.google.com/maps/search/CEF+02+de+Planaltina+Quadra+10+Conjunto+A+Planaltina+DF"
    },
    {
      id: 3,
      name: "CEF 03 de Planaltina",
      address: "Setor Educacional, Lote 15 - Planaltina/DF",
      students: 1100,
      since: "2024",
      coordinates: { top: "60%", left: "20%" },
      googleMapsUrl: "https://www.google.com/maps/search/CEF+03+de+Planaltina+Setor+Educacional+Lote+15+Planaltina+DF"
    },
    {
      id: 4,
      name: "CEF 04 de Planaltina",
      address: "Área Rural, Zona de Expansão - Planaltina/DF",
      students: 650,
      since: "2024",
      coordinates: { top: "70%", left: "80%" },
      googleMapsUrl: "https://www.google.com/maps/search/CEF+04+de+Planaltina+Área+Rural+Zona+de+Expansão+Planaltina+DF"
    },
    {
      id: 5,
      name: "CEF 05 de Planaltina",
      address: "Setor Sul, Quadra 5 - Planaltina/DF",
      students: 850,
      since: "2023",
      coordinates: { top: "45%", left: "50%" },
      googleMapsUrl: "https://www.google.com/maps/search/CEF+05+de+Planaltina+Setor+Sul+Quadra+5+Planaltina+DF"
    },
    {
      id: 6,
      name: "CEF 06 de Planaltina",
      address: "Núcleo Rural, Chácara 12 - Planaltina/DF",
      students: 500,
      since: "2024",
      coordinates: { top: "80%", left: "40%" },
      googleMapsUrl: "https://www.google.com/maps/search/CEF+06+de+Planaltina+Núcleo+Rural+Chácara+12+Planaltina+DF"
    },
    {
      id: 7,
      name: "CEF 07 de Planaltina",
      address: "Setor Central, Quadra 8 - Planaltina/DF",
      students: 1300,
      since: "2023",
      coordinates: { top: "20%", left: "60%" },
      googleMapsUrl: "https://www.google.com/maps/search/CEF+07+de+Planaltina+Setor+Central+Quadra+8+Planaltina+DF"
    },
    {
      id: 8,
      name: "CEF 08 de Planaltina",
      address: "Setor Oeste, Conjunto B - Planaltina/DF",
      students: 750,
      since: "2024",
      coordinates: { top: "55%", left: "65%" },
      googleMapsUrl: "https://www.google.com/maps/search/CEF+08+de+Planaltina+Setor+Oeste+Conjunto+B+Planaltina+DF"
    }
  ]

  const [selectedSchool, setSelectedSchool] = useState(schools[0])

  return (
    <section id="Locais" className="bg-gradient-to-br from-[#66388C] via-[#7A45A3] to-[#FAB900] relative overflow-hidden pt-9 py-9 ">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-[#FAB900]/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white/5 rounded-full blur-lg" />
        <div className="absolute bottom-16 left-16 sm:bottom-20 sm:left-20 w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-[#FAB900]/15 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-6xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <SectionTitle 
            prefix="Onde" 
            highlighted="Atuamos" 
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {/* Left Column - Text and School List */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <div className="mb-6 md:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
                Nossa Presença em Planaltina
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed">
                Estamos presentes em escolas públicas do Distrito Federal,
                levando nosso projeto para comunidades que mais precisam de apoio.
                Atualmente atendemos 8 Centros de Ensino Fundamental em Planaltina.
              </p>
            </div>

            <SchoolList
              schools={schools}
              selectedSchool={selectedSchool}
              onSchoolSelect={setSelectedSchool}
            />
          </div>

          {/* Right Column - Map and Info Card */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <InteractiveMapCard
              schools={schools}
              selectedSchool={selectedSchool}
              onSchoolSelect={setSelectedSchool}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Subcomponente: Título
function SectionTitle({ prefix, highlighted }: { prefix: string, highlighted: string }) {
  return (
    <div className="inline-block">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-center">
        {prefix}{' '}
        <span className="bg-gradient-to-r from-white to-[#FAB900] bg-clip-text text-transparent">
          {highlighted}
        </span>
      </h2>
      <div className="h-1 w-24 sm:w-32 md:w-40 mx-auto bg-gradient-to-r from-white/50 to-[#FAB900]/50 rounded-full" />
    </div>
  )
}

// Subcomponente: Lista de Escolas
function SchoolList({
  schools,
  selectedSchool,
  onSchoolSelect
}: {
  schools: any[]
  selectedSchool: any
  onSchoolSelect: (school: any) => void
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <School className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">
          Escolas Atendidas
        </h4>
        <span className="bg-[#FAB900] text-white text-xs font-bold rounded-full px-2 py-1 ml-auto">
          {schools.length} escolas
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-h-[350px] sm:max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {schools.map((school, index) => (
          <button
            key={school.id}
            onClick={() => onSchoolSelect(school)}
            className={`
              flex items-center gap-3 p-3 sm:p-4 rounded-lg transition-all duration-300 cursor-pointer
              backdrop-blur-sm border relative overflow-hidden group min-w-0 min-h-[70px] sm:min-h-[80px]
              ${selectedSchool.id === school.id
                ? 'bg-white/20 border-white/30 shadow-lg scale-[1.02] ring-2 ring-white/20'
                : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30 hover:scale-[1.01]'
              }
              text-left
            `}
          >
            {/* Indicador de seleção animado */}
            {selectedSchool.id === school.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-[#FAB900]/10 to-transparent animate-pulse" />
            )}

            {/* Número da escola */}
            <div className={`
              w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 relative z-10
              flex items-center justify-center transition-all duration-300
              ${selectedSchool.id === school.id
                ? 'bg-[#FAB900] text-white scale-125 shadow-lg shadow-[#FAB900]/50'
                : 'bg-white/20 text-white group-hover:bg-white/30'
              }
            `}>
              <span className="font-bold text-sm sm:text-base">{school.id}</span>
            </div>

            {/* Informações da escola */}
            <div className="relative z-10 flex-1 min-w-0">
              <span className="text-white font-semibold block truncate text-sm sm:text-base">
                {school.name}
              </span>
              {selectedSchool.id === school.id && (
                <span className="text-white/70 text-xs block truncate mt-1">
                  {school.address}
                </span>
              )}
              <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                <Users className="w-3 h-3" />
                <span>{school.students} alunos</span>
                <span className="mx-1">•</span>
                <Calendar className="w-3 h-3" />
                <span>Desde {school.since}</span>
              </div>
            </div>

            {/* Ícone de seleção */}
            {selectedSchool.id === school.id && (
              <div className="relative z-10 flex-shrink-0">
                <div className="bg-[#FAB900] rounded-full p-1.5">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// Subcomponente: Cartão do Mapa Interativo
function InteractiveMapCard({
  schools,
  selectedSchool,
  onSchoolSelect
}: {
  schools: any[]
  selectedSchool: any
  onSchoolSelect: (school: any) => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  const handleViewMap = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(selectedSchool.googleMapsUrl, '_blank', 'noopener,noreferrer')
  }

  const handleSchoolPinClick = (school: any, event: React.MouseEvent) => {
    event.stopPropagation()
    onSchoolSelect(school)
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Mapa Container */}
      <div
        className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 relative min-h-[250px] sm:min-h-[280px] md:min-h-[320px] aspect-video w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Mapa de Fundo Real - iframe do Google Maps */}
        <div className="absolute inset-0 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61645.89527329896!2d-47.68189634863281!3d-15.61880005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3d8a5f4e3e3f%3A0x4f8f5c5e5c5e5c5e!2sPlanaltina%2C%20Bras%C3%ADlia%20-%20Federal%20District!5e0!3m2!1sen!2sbr!4v1234567890123!5m2!1sen!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none"
          />

          {/* Overlay gradiente para melhor contraste dos pinos */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#66388C]/20 via-transparent to-[#FAB900]/10 pointer-events-none" />
        </div>

        {/* Layer de interação - onde ficam os pinos */}
        <div className="absolute inset-0 pointer-events-auto">
          {/* Pinos no Mapa */}
          {schools.map((school) => (
            <LocationPin
              key={school.id}
              school={school}
              isSelected={selectedSchool.id === school.id}
              onClick={(e) => handleSchoolPinClick(school, e)}
            />
          ))}
        </div>

        {/* Botão de Ação */}
        <div className="absolute top-3 left-3 z-30">
          <button
            onClick={handleViewMap}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm text-[#66388C] rounded-full px-3 py-1.5 border-2 border-white/50 hover:from-white hover:to-white hover:border-[#FAB900] hover:text-[#FAB900] hover:scale-105 transition-all duration-300 group/btn text-xs font-bold shadow-lg hover:shadow-xl"
          >
            <Navigation className="w-3.5 h-3.5 group-hover/btn:rotate-45 transition-transform duration-300" />
            <span>Ver no Google Maps</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </button>
        </div>

        {/* Indicador de região */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-[#66388C] text-xs font-bold border border-white/30 shadow-lg z-20">
          📍 Planaltina/DF
        </div>

        {/* Indicador de interatividade */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-xs font-medium border border-white/20 shadow-lg">
            👆 Clique nos pinos para ver detalhes
          </div>
        </div>
      </div>

      {/* Painel de Informações da Escola Selecionada */}
      <div className="bg-white backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-2xl border-2 border-[#FAB900] transform transition-all duration-500 hover:shadow-[#FAB900]/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-[#66388C] rounded-full p-2">
                <School className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#66388C] uppercase tracking-wider">
                  Escola Selecionada
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mt-1">
                  {selectedSchool.name}
                </h3>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#66388C] flex-shrink-0 mt-0.5" />
              <span>{selectedSchool.address}</span>
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-gray-700 bg-gray-100 rounded-full px-3 py-1.5">
                <Users className="w-4 h-4 text-[#66388C]" />
                <span className="text-sm font-medium">{selectedSchool.students.toLocaleString()} alunos</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 bg-gray-100 rounded-full px-3 py-1.5">
                <Calendar className="w-4 h-4 text-[#66388C]" />
                <span className="text-sm font-medium">Desde {selectedSchool.since}</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="bg-gradient-to-br from-[#FAB900] to-[#f5a600] text-white rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-center shadow-lg">
              <div className="text-xs font-bold">CEF</div>
              <div className="text-2xl sm:text-3xl font-black leading-none">
                {selectedSchool.id.toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Subcomponente: Pino de Localização
function LocationPin({ school, isSelected, onClick }: {
  school: any
  isSelected: boolean
  onClick: (e: React.MouseEvent) => void
}) {
  return (
    <div
      className={`
        absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500
        ${isSelected ? 'z-40 scale-125' : 'z-30 scale-100 hover:scale-110 hover:z-35'}
      `}
      style={{
        top: school.coordinates.top,
        left: school.coordinates.left
      }}
      onClick={onClick}
    >
      <div className="relative group/pin">
        {/* Sombra animada do pino */}
        <div className={`
          absolute -inset-2 rounded-full transition-all duration-300
          ${isSelected
            ? 'bg-[#FAB900] animate-pulse opacity-40'
            : 'bg-[#66388C]/30 opacity-0 group-hover/pin:opacity-40'
          }
        `} />

        {/* Corpo do pino */}
        <div className="relative filter drop-shadow-lg">
          <MapPin className={`
            w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 transition-all duration-300
            ${isSelected
              ? 'text-[#FAB900] fill-[#FAB900]'
              : 'text-[#66388C] fill-[#66388C] group-hover/pin:text-[#7A45A3] group-hover/pin:fill-[#7A45A3]'
            }
          `} />

          {/* Número da escola no pino */}
          <div className="
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[70%] 
            text-white font-black text-[10px] sm:text-[11px] pointer-events-none
            drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]
          ">
            {school.id}
          </div>
        </div>

        {/* Tooltip */}
        <div className="hidden sm:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover/pin:opacity-100 transition-all duration-300 pointer-events-none z-50">
          <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-2xl border border-white/10 max-w-[200px]">
            <div className="font-bold text-[#FAB900] truncate">{school.name}</div>
            <div className="text-white/80 text-[10px] mt-1">📍 {school.students.toLocaleString()} alunos</div>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
            <div className="border-[6px] border-transparent border-t-gray-900" />
          </div>
        </div>
      </div>

      {/* Ondas de radiação quando selecionado */}
      {isSelected && (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 border-[#FAB900] rounded-full animate-ping opacity-75" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 border-2 border-[#FAB900] rounded-full animate-ping opacity-40" style={{ animationDelay: '0.3s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 border border-[#FAB900] rounded-full animate-ping opacity-20" style={{ animationDelay: '0.6s' }} />
        </>
      )}
    </div>
  )
}