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
    <section id="Locais" className="bg-gradient-to-br from-[#66388C] via-[#7A45A3] to-[#FAB900] relative overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-4 sm:top-10 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-[#FAB900]/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white/5 rounded-full blur-lg" />
        <div className="absolute bottom-16 left-16 sm:bottom-20 sm:left-20 w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 bg-[#FAB900]/15 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto py-8 px-3 sm:px-4 md:px-6 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-start">
          
          {/* Text Content */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            
            <SectionTitle 
              prefix="Onde"
              highlighted="Atuamos"
            />

            <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed max-w-xl">
              Estamos presentes em escolas públicas do Distrito Federal, 
              levando nosso projeto para comunidades que mais precisam de apoio.
            </p>

            <SchoolList 
              schools={schools} 
              selectedSchool={selectedSchool}
              onSchoolSelect={setSelectedSchool}
            />
          </div>

          {/* Map Card */}
          <InteractiveMapCard 
            schools={schools}
            selectedSchool={selectedSchool}
            onSchoolSelect={setSelectedSchool}
          />
        </div>
      </div>
    </section>
  )
}

// Subcomponente: Título
function SectionTitle({ prefix, highlighted }: { prefix: string, highlighted: string }) {
  return (
    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
      {prefix}{' '}
      <span className="bg-gradient-to-r from-white to-[#FAB900] bg-clip-text text-transparent">
        {highlighted}
      </span>
    </h2>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 max-h-[350px] sm:max-h-[400px] md:max-h-[450px] lg:max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
      {schools.map((school, index) => (
        <div 
          key={school.id}
          onClick={() => onSchoolSelect(school)}
          className={`
            flex items-center gap-2 sm:gap-2.5 p-3 sm:p-4 md:p-5 rounded-lg transition-all duration-300 cursor-pointer
            backdrop-blur-sm border relative overflow-hidden group min-w-0 min-h-[60px] sm:min-h-[70px] md:min-h-[80px]
            ${selectedSchool.id === school.id
              ? 'bg-white/20 border-white/30 shadow-lg scale-[1.02] ring-2 ring-white/20'
              : index % 2 === 0 
                ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30 hover:scale-[1.01]' 
                : 'bg-[#FAB900]/10 border-[#FAB900]/20 hover:bg-[#FAB900]/15 hover:border-[#FAB900]/30 hover:scale-[1.01]'
            }
          `}
        >
          {/* Indicador de seleção animado */}
          {selectedSchool.id === school.id && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-[#FAB900]/10 to-transparent animate-pulse" />
          )}
          
          <div className={`
            w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 relative z-10 transition-all duration-300
            ${selectedSchool.id === school.id 
              ? 'bg-[#FAB900] scale-125 shadow-lg shadow-[#FAB900]/50' 
              : index % 2 === 0 
                ? 'bg-white group-hover:scale-110' 
                : 'bg-[#FAB900] group-hover:scale-110'
            }
          `} />
          
          <div className="relative z-10 flex-1 min-w-0">
            <span className="text-white font-medium block truncate text-sm sm:text-base transition-all duration-300">
              {school.name}
            </span>
            {selectedSchool.id === school.id && (
              <span className="text-white/70 text-xs sm:text-sm block truncate mt-1 animate-fade-in">
                {school.address}
              </span>
            )}
          </div>

          {/* Badge de seleção melhorado */}
          {selectedSchool.id === school.id && (
            <div className="relative z-10 flex-shrink-0 animate-fade-in">
              <div className="bg-[#FAB900] text-white text-xs sm:text-sm rounded-full px-2 sm:px-2.5 py-1 font-bold whitespace-nowrap shadow-lg">
                ✓ SELECIONADA
              </div>
            </div>
          )}
        </div>
      ))}
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
    <div className="relative group space-y-3 w-full">
      {/* Mapa com Google Maps Real */}
      <div 
        className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] border border-white/20 relative min-h-[250px] sm:min-h-[280px] md:min-h-[320px] aspect-video w-full"
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

        {/* Indicador de região */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 text-[#66388C] text-xs font-bold border border-white/30 shadow-lg z-20">
          📍 Planaltina/DF
        </div>

        {/* Elementos decorativos animados */}
        <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-[#FAB900]/60 rounded-full transition-all duration-500 z-20 ${isHovered ? 'scale-150 animate-pulse' : 'scale-100'}`} />
        <div className={`absolute bottom-6 right-4 sm:bottom-8 sm:right-6 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-white/60 rounded-full transition-all duration-500 z-20 ${isHovered ? 'scale-125 animate-pulse' : 'scale-100'}`} />

        {/* Botão de Ação */}
        <div className="absolute top-3 left-3 sm:top-3 sm:left-3 z-30">
          <button 
            onClick={handleViewMap}
            className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm text-[#66388C] rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 border-2 border-white/50 hover:from-white hover:to-white hover:border-[#FAB900] hover:text-[#FAB900] hover:scale-105 transition-all duration-300 group/btn text-[10px] sm:text-xs font-bold shadow-lg hover:shadow-xl"
          >
            <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:rotate-45 transition-transform duration-300" />
            <span className="whitespace-nowrap">Ver no Mapa</span>
            <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-70" />
          </button>
        </div>

        {/* Indicador de interatividade */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-white text-[10px] sm:text-xs font-medium border border-white/20 shadow-lg">
            👆 Clique nos pinos para ver detalhes
          </div>
        </div>
      </div>

      {/* Painel de Informações da Escola Selecionada - Mesma largura do mapa */}
      <div className="bg-white backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-2xl border-2 border-[#FAB900] transform transition-all duration-500 hover:shadow-[#FAB900]/20 w-full">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
              <div className="bg-[#66388C] rounded-full p-1 sm:p-1.5">
                <School className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
              </div>
              <span className="font-bold text-[#66388C] text-xs sm:text-sm tracking-wide">
                ESCOLA SELECIONADA
              </span>
            </div>
            
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-1.5">
              {selectedSchool.name}
            </h3>
            
            <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
              📍 {selectedSchool.address}
            </p>
            
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm flex-wrap">
              <div className="flex items-center gap-1 sm:gap-1.5 text-gray-700 bg-gray-100 rounded-full px-2 sm:px-3 py-1 sm:py-1.5">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-[#66388C]" />
                <span className="font-medium">{selectedSchool.students} alunos</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-gray-700 bg-gray-100 rounded-full px-2 sm:px-3 py-1 sm:py-1.5">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#66388C]" />
                <span className="font-medium">Desde {selectedSchool.since}</span>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <div className="bg-gradient-to-br from-[#FAB900] to-[#f5a600] text-white rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 text-center min-w-[45px] sm:min-w-[50px] shadow-lg">
              <div className="text-xs sm:text-sm font-bold">CEF</div>
              <div className="text-xl sm:text-2xl font-black leading-none">0{selectedSchool.id}</div>
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
      {/* Pino Principal */}
      <div className={`
        relative group/pin transition-all duration-300
        ${isSelected ? 'animate-bounce' : ''}
      `}>
        {/* Sombra animada do pino */}
        <div className={`
          absolute -inset-1 rounded-full blur-sm transition-all duration-300
          ${isSelected 
            ? 'bg-[#FAB900] animate-pulse opacity-70' 
            : 'bg-[#66388C]/50 opacity-0 group-hover/pin:opacity-60'
          }
        `} />
        
        {/* Corpo do pino - redesenhado */}
        <div className="relative filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          <MapPin className={`
            w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 transition-all duration-300
            ${isSelected 
              ? 'text-[#FAB900] fill-[#FAB900] filter drop-shadow-[0_0_12px_rgba(250,185,0,0.9)]' 
              : 'text-[#66388C] fill-[#66388C] group-hover/pin:text-[#7A45A3] group-hover/pin:fill-[#7A45A3]'
            }
          `} />
          
          {/* Número da escola no pino */}
          <div className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[70%] 
            text-white font-black text-[9px] sm:text-[10px] pointer-events-none drop-shadow-md
            ${isSelected ? 'scale-110' : ''}
          `}>
            {school.id}
          </div>
        </div>

        {/* Tooltip - melhorado */}
        <div className="hidden sm:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover/pin:opacity-100 transition-all duration-300 pointer-events-none z-50 scale-90 group-hover/pin:scale-100">
          <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-2xl border border-white/10 max-w-[200px]">
            <div className="font-bold truncate text-[#FAB900]">{school.name}</div>
            <div className="text-white/80 text-[10px] mt-0.5">📍 {school.students} alunos</div>
            <div className="text-white/60 text-[10px] mt-1 flex items-center gap-1">
              <span>Clique para ver detalhes</span>
            </div>
          </div>
          
          {/* Seta do tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
            <div className="border-[6px] border-transparent border-t-gray-900" />
          </div>
        </div>
      </div>

      {/* Ondas de radiação quando selecionado - melhoradas */}
      {isSelected && (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-2 border-[#FAB900] rounded-full animate-ping opacity-75" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 border-2 border-[#FAB900] rounded-full animate-ping opacity-40" style={{ animationDelay: '0.3s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 border border-[#FAB900] rounded-full animate-ping opacity-20" style={{ animationDelay: '0.6s' }} />
        </>
      )}
    </div>
  )
}