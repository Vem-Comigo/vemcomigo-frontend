// components/sections/Locations.tsx
import { ExternalLink, School, Users, Calendar } from "lucide-react"
import { useState } from "react"

export function Locations() {
  const schools = [
    {
      id: 1,
      name: "CEF 01 de Planaltina",
      address: "Área Especial, Setor Norte - Planaltina/DF",
      students: 1200,
      since: "2023",
      coordinates: { top: "25%", left: "30%" }
    },
    {
      id: 2,
      name: "CEF 02 de Planaltina",
      address: "Quadra 10, Conjunto A - Planaltina/DF",
      students: 950,
      since: "2023",
      coordinates: { top: "35%", left: "70%" }
    },
    {
      id: 3,
      name: "CEF 03 de Planaltina",
      address: "Setor Educacional, Lote 15 - Planaltina/DF",
      students: 1100,
      since: "2024",
      coordinates: { top: "60%", left: "20%" }
    },
    {
      id: 4,
      name: "CEF 04 de Planaltina",
      address: "Área Rural, Zona de Expansão - Planaltina/DF",
      students: 650,
      since: "2024",
      coordinates: { top: "70%", left: "80%" }
    },
    {
      id: 5,
      name: "CEF 05 de Planaltina",
      address: "Setor Sul, Quadra 5 - Planaltina/DF",
      students: 850,
      since: "2023",
      coordinates: { top: "45%", left: "50%" }
    },
    {
      id: 6,
      name: "CEF 06 de Planaltina",
      address: "Núcleo Rural, Chácara 12 - Planaltina/DF",
      students: 500,
      since: "2024",
      coordinates: { top: "80%", left: "40%" }
    },
    {
      id: 7,
      name: "CEF 07 de Planaltina",
      address: "Setor Central, Quadra 8 - Planaltina/DF",
      students: 1300,
      since: "2023",
      coordinates: { top: "20%", left: "60%" }
    },
    {
      id: 8,
      name: "CEF 08 de Planaltina",
      address: "Setor Oeste, Conjunto B - Planaltina/DF",
      students: 750,
      since: "2024",
      coordinates: { top: "55%", left: "65%" }
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

      <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-6xl relative z-10">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 max-h-[280px] sm:max-h-[320px] md:max-h-[350px] lg:max-h-[400px] overflow-y-auto pr-1">
      {schools.map((school, index) => (
        <div 
          key={school.id}
          onClick={() => onSchoolSelect(school)}
          className={`
            flex items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer
            backdrop-blur-sm border relative overflow-hidden group min-w-0
            ${selectedSchool.id === school.id
              ? 'bg-white/20 border-white/30 shadow-lg scale-[1.02]'
              : index % 2 === 0 
                ? 'bg-white/10 border-white/20 hover:bg-white/15' 
                : 'bg-[#FAB900]/10 border-[#FAB900]/20 hover:bg-[#FAB900]/15'
            }
          `}
        >
          {/* Indicador de seleção */}
          {selectedSchool.id === school.id && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-[#FAB900]/10" />
          )}
          
          <div className={`
            w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0 relative z-10 transition-all duration-300
            ${selectedSchool.id === school.id 
              ? 'bg-[#FAB900] scale-125' 
              : index % 2 === 0 
                ? 'bg-white' 
                : 'bg-[#FAB900]'
            }
          `} />
          
          <div className="relative z-10 flex-1 min-w-0">
            <span className="text-white font-medium block truncate text-xs sm:text-sm">
              {school.name}
            </span>
            {selectedSchool.id === school.id && (
              <span className="text-white/70 text-xs block truncate mt-0.5">
                {school.address}
              </span>
            )}
          </div>

          {/* Badge de seleção */}
          {selectedSchool.id === school.id && (
            <div className="relative z-10 flex-shrink-0">
              <div className="bg-[#FAB900] text-white text-[10px] sm:text-xs rounded-full px-1 sm:px-1.5 py-0.5 font-bold whitespace-nowrap">
                SELECIONADA
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

  const handleCardClick = () => {
    console.log("Card clicado - abrir mapa interativo")
  }

  const handleSchoolPinClick = (school: any, event: React.MouseEvent) => {
    event.stopPropagation()
    onSchoolSelect(school)
  }

  return (
    <div className="relative group">
      <div 
        className="bg-white/10 backdrop-blur-md rounded-lg p-3 sm:p-4 md:p-6 aspect-video flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 group-hover:scale-[1.01] border border-white/20 cursor-pointer relative overflow-hidden min-h-[250px] sm:min-h-[280px] md:min-h-[320px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        {/* Mapa de Fundo Estilizado */}
        <div className="absolute inset-2 sm:inset-3 md:inset-4 bg-gradient-to-br from-[#66388C]/30 to-[#FAB900]/20 rounded-lg border border-white/10">
          {/* Rodovias/Estradas */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 transform -rotate-3" />
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 transform rotate-12" />
          
          {/* Áreas verdes */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-green-500/10 rounded-full" />
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-green-500/15 rounded-full" />
        </div>

        {/* Pinos no Mapa */}
        {schools.map((school) => (
          <LocationPin
            key={school.id}
            school={school}
            isSelected={selectedSchool.id === school.id}
            onClick={(e) => handleSchoolPinClick(school, e)}
          />
        ))}

        {/* Painel de Informações da Escola Selecionada */}
        <div className="absolute bottom-1.5 left-1.5 right-1.5 sm:bottom-2 sm:left-2 sm:right-2 bg-white/95 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg border border-[#FAB900] transform transition-all duration-500 z-20">
          <div className="flex items-start justify-between gap-1.5 sm:gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
                <School className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#66388C]" />
                <span className="font-bold text-[#66388C] text-[10px] sm:text-xs">ESCOLA SELECIONADA</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-800 mb-0.5 sm:mb-1 truncate">
                {selectedSchool.name}
              </h3>
              <p className="text-gray-600 text-[10px] sm:text-xs mb-1.5 sm:mb-2 line-clamp-2">
                {selectedSchool.address}
              </p>
              
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                <div className="flex items-center gap-0.5 sm:gap-1 text-gray-500">
                  <Users className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                  <span>{selectedSchool.students} alunos</span>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1 text-gray-500">
                  <Calendar className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                  <span>Desde {selectedSchool.since}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 ml-1 sm:ml-2">
              <div className="bg-[#FAB900] text-white rounded px-1.5 sm:px-2 py-0.5 sm:py-1 text-center min-w-[35px] sm:min-w-[40px]">
                <div className="text-[10px] sm:text-xs font-bold">CEF</div>
                <div className="text-[10px] sm:text-xs opacity-90">0{selectedSchool.id}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-[#FAB900]/40 rounded-full transition-all duration-300 ${isHovered ? 'scale-125' : 'scale-100'}`} />
        <div className={`absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-white/30 rounded-full transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`} />

        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#FAB900]/20 to-[#66388C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Botão de Ação */}
      <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-30">
        <button 
          onClick={handleCardClick}
          className="inline-flex items-center gap-0.5 sm:gap-1 bg-white/20 backdrop-blur-sm text-white rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 border border-white/30 hover:bg-white/30 transition-all duration-300 group/btn text-[10px] sm:text-xs"
        >
          <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span className="font-semibold whitespace-nowrap">Ver mapa</span>
        </button>
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
        ${isSelected ? 'z-20 scale-110' : 'z-10 scale-100 hover:scale-105'}
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
        {/* Sombra do pino */}
        <div className={`
          absolute inset-0 rounded-full transition-all duration-300
          ${isSelected ? 'bg-[#FAB900] animate-ping' : 'bg-gray-400'}
        `} />
        
        {/* Corpo do pino */}
        <div className={`
          relative w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full border border-white shadow-lg transition-all duration-300
          ${isSelected 
            ? 'bg-[#FAB900] scale-125' 
            : 'bg-[#66388C] group-hover/pin:bg-[#7A45A3]'
          }
        `} />
        
        {/* Haste do pino */}
        <div className={`
          absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 sm:h-1 md:h-2 transition-all duration-300
          ${isSelected ? 'bg-[#FAB900]' : 'bg-gray-300 group-hover/pin:bg-gray-400'}
        `} />

        {/* Tooltip - apenas para desktop */}
        <div className="hidden sm:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover/pin:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
          <div className="bg-black/90 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg border border-white/20 max-w-[150px]">
            <div className="font-bold truncate">{school.name}</div>
            <div className="text-white/70 text-xs">Clique para selecionar</div>
          </div>
          
          {/* Seta do tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90" />
        </div>
      </div>

      {/* Ondas de radiação quando selecionado */}
      {isSelected && (
        <>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border border-[#FAB900] rounded-full animate-ping" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border border-[#FAB900] rounded-full animate-ping delay-300" />
        </>
      )}
    </div>
  )
}