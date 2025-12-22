"use client"
import {
  ExternalLink,
  School,
  Users,
  Calendar,
  MapPin,
  Navigation,
} from "lucide-react";
import { useState } from "react";
import mapaGuara from "../assets/images/maps-guara.png";

export function Locations() {
  const schools = [
    {
      id: 1,
      name: "CEF 01 GUARÁ",
      address: "Área Especial - Guará/DF",
      students: 579,
      since: "2023",
      coordinates: { top: "5.5%", left: "35%" },
      googleMapsUrl:
        "https://www.google.com/maps/search/CEF+01+GUARÁ+Área+Especial+Guará+DF",
    },
    {
      id: 2,
      name: "CEF 02 GUARÁ",
      address: "Quadra 2 - Guará/DF",
      students: 717,
      since: "2023",
      coordinates: { top: "13%", left: "53%" },
      googleMapsUrl:
        "https://www.google.com/maps/search/CEF+02+GUARÁ+Quadra+2+Guará+DF",
    },
    {
      id: 3,
      name: "CEF 04 GUARÁ",
      address: "Setor Oeste - Guará/DF",
      students: 865,
      since: "2024",
      coordinates: { top: "21%", left: "36%" },
      googleMapsUrl:
        "https://www.google.com/maps/search/CEF+04+GUARÁ+Setor+Oeste+Guará+DF",
    },
    {
      id: 4,
      name: "CEF 08 GUARÁ",
      address: "Área Especial 8 - Guará/DF",
      students: 648,
      since: "2024",
      coordinates: { top: "42%", left: "53%" },
      googleMapsUrl:
        "https://www.google.com/maps/search/CEF+08+GUARÁ+Área+Especial+8+Guará+DF",
    },
    {
      id: 5,
      name: "CED 01 GUARÁ",
      address: "Setor Educacional - Guará/DF",
      students: 927,
      since: "2023",
      coordinates: { top: "79%", left: "70.5%" },
      googleMapsUrl:
        "https://www.google.com/maps/search/CED+01+GUARÁ+Setor+Educacional+Guará+DF",
    },
    {
      id: 6,
      name: "CED 04 GUARÁ",
      address: "Quadra 4 - Guará/DF",
      students: 773,
      since: "2024",
      coordinates: { top: "27%", left: "59%" },
      googleMapsUrl:
        "https://www.google.com/maps/search/CED+04+GUARÁ+Quadra 4+Guará+DF",
    },
    {
      id: 7,
      name: "CEM 01 GUARÁ",
      address: "Quadra 7 - Guará/DF",
      students: 907,
      since: "2024",
      coordinates: { top: "21%", left: "48%" },
      googleMapsUrl:
        "https://www.google.com/maps/place/CEM+01+do+Guar%C3%A1+-+GG/@-15.8183661,-47.9835306,17z/data=!3m1!4b1!4m6!3m5!1s0x935a31be1a955ba9:0xec8078695e5cd55!8m2!3d-15.8183713!4d-47.9809557!16s%2Fg%2F11cnc2s4dm?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D",
    },
  ];

  const [selectedSchool, setSelectedSchool] = useState(schools[0]);

  return (
    <section
      id="Locais"
      className="relative overflow-hidden py-16 md:py-24 scroll-mt-20"
    >
      {/* Fundo muito mais bonito e complexo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradiente principal com animação sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-indigo-900/90 to-amber-500/90" />
        
        {/* Padrão geométrico de fundo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(250,185,0,0.15)_0%,transparent_50%),radial-gradient(circle_at_70%_70%,rgba(102,56,140,0.2)_0%,transparent_50%),radial-gradient(circle_at_90%_20%,rgba(255,255,255,0.1)_0%,transparent_40%)] animate-pulse" style={{animationDuration: '6s'}} />
        
        {/* Círculos decorativos grandes com animações */}
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/20 to-amber-500/20 rounded-full blur-3xl animate-float" style={{animationDuration: '20s'}} />
        <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-700/15 to-amber-400/15 rounded-full blur-3xl animate-float-slow" style={{animationDuration: '25s'}} />
        <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-32 w-[450px] h-[450px] bg-gradient-to-l from-amber-400/10 to-transparent rounded-full blur-2xl" />
        
        {/* Círculos médios flutuantes */}
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-white/5 to-purple-300/5 rounded-full blur-xl animate-float" style={{animationDuration: '15s', animationDelay: '2s'}} />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-tr from-amber-300/10 to-white/5 rounded-full blur-xl animate-float-slow" style={{animationDuration: '18s', animationDelay: '1s'}} />
        
        {/* Círculos pequenos decorativos */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-amber-300/10 rounded-full blur-lg animate-pulse" style={{animationDuration: '4s'}} />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-l from-amber-400/15 to-purple-400/15 rounded-full blur-lg animate-pulse" style={{animationDuration: '5s'}} />
        
        {/* Pontos luminosos flutuantes */}
        <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-amber-300/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}} />
        <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-purple-300/50 rounded-full animate-bounce" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '1.5s'}} />
        <div className="absolute top-3/4 right-1/4 w-2.5 h-2.5 bg-amber-200/50 rounded-full animate-bounce" style={{animationDelay: '0.8s'}} />
        
        {/* Linhas diagonais decorativas */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rotate-12" />
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent -rotate-6" />
          <div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-300/50 to-transparent rotate-45" />
        </div>
        
        {/* Efeito de partículas finas */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,theme(colors.purple.400/0.1),transparent)]" />

        {/* Efeito de brilho no centro */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-transparent via-purple-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        {/* Header com efeitos especiais */}
        <div className="text-center mb-12 md:mb-16 relative">
          {/* Elemento decorativo atrás do título */}
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-amber-400/10 rounded-full blur-xl -z-10" />
          <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-tr from-amber-400/10 to-purple-500/10 rounded-full blur-xl -z-10" />
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-center mb-4 relative">
            <span className="relative inline-block">
              Onde{" "}
              <span className="bg-gradient-to-r from-white via-amber-200 to-[#FAB900] bg-clip-text text-transparent">
                Atuamos
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
            </span>
          </h2>
          
          <div className="relative w-48 h-1 mx-auto overflow-hidden rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-shimmer" style={{animationDuration: '3s'}} />
          </div>
          
          <p className="text-white/80 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
            Conheça as escolas públicas do Guará que estão transformando vidas através da educação emocional
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="mb-6 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/5 to-amber-500/5 rounded-2xl blur-xl -z-10" />
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-white/20 to-white/10 rounded-lg backdrop-blur-sm">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                Nossa Presença no Guará
              </h3>
              <p className="text-white/90 leading-relaxed text-lg backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10">
                Estamos presentes em escolas públicas do Distrito Federal,
                levando nosso projeto para comunidades que mais precisam de
                apoio. Atualmente atendemos 7 escolas no Guará, incluindo
                Centros de Ensino Fundamental e Educação de Jovens e Adultos.
              </p>
            </div>

            <SchoolList
              schools={schools}
              selectedSchool={selectedSchool}
              onSchoolSelect={setSelectedSchool}
            />
          </div>

          <div className="space-y-6">
            <InteractiveMapCard
              schools={schools}
              selectedSchool={selectedSchool}
              onSchoolSelect={setSelectedSchool}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(90deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer linear infinite;
        }
      `}</style>
    </section>
  );
}

function SchoolList({
  schools,
  selectedSchool,
  onSchoolSelect,
}: {
  schools: any[];
  selectedSchool: any;
  onSchoolSelect: (school: any) => void;
}) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/10 via-transparent to-amber-500/10 rounded-2xl blur-xl -z-10" />
      <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-4 shadow-2xl">
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-white/20 to-white/10 rounded-lg">
              <School className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-base font-bold text-white">
              Escolas Atendidas
            </h4>
          </div>
          <span className="bg-gradient-to-r from-[#FAB900] to-amber-400 text-white text-xs font-bold rounded-full px-2.5 py-1 shadow-lg">
            {schools.length} escolas
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {schools.map((school) => (
            <button
              key={school.id}
              onClick={() => onSchoolSelect(school)}
              className={`group relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200 cursor-pointer w-full text-left ${selectedSchool.id === school.id
                  ? "bg-gradient-to-r from-white/30 to-white/20 border-white/40 shadow-md"
                  : "bg-white/10 border-white/15 hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10 hover:border-white/25"
                } border backdrop-blur-sm overflow-hidden`}
            >
              {selectedSchool.id === school.id && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-[#FAB900]/20 to-transparent" />
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-[#FAB900]/20 to-transparent rounded-bl-full" />
                </>
              )}

              <div className={`relative z-10 w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200 ${selectedSchool.id === school.id
                  ? "bg-gradient-to-br from-[#FAB900] to-amber-400 text-white shadow-md shadow-[#FAB900]/40"
                  : "bg-white/20 text-white group-hover:bg-gradient-to-br group-hover:from-white/30 group-hover:to-white/20"
                }`}
              >
                <span className="font-bold text-xs">{school.id}</span>
              </div>

              <div className="relative z-10 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white font-semibold text-sm truncate">
                    {school.name}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-white/70">
                    <Users className="w-3 h-3 flex-shrink-0" />
                    <span>{school.students}</span>
                  </div>
                </div>
                {selectedSchool.id === school.id && (
                  <span className="text-white/80 text-xs block mt-1 truncate">
                    {school.address}
                  </span>
                )}
              </div>

              {selectedSchool.id === school.id && (
                <div className="relative z-10 flex-shrink-0">
                  <div className="bg-gradient-to-br from-[#FAB900] to-amber-400 rounded-full p-1.5 shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function InteractiveMapCard({
  schools,
  selectedSchool,
  onSchoolSelect,
}: {
  schools: any[];
  selectedSchool: any;
  onSchoolSelect: (school: any) => void;
}) {
  const handleViewMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(selectedSchool.googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  const handleSchoolPinClick = (school: any, event: React.MouseEvent) => {
    event.stopPropagation();
    onSchoolSelect(school);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={handleViewMap}
          className="group/btn inline-flex items-center gap-2 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md text-[#66388C] rounded-full px-5 py-3 border border-white/50 hover:border-[#FAB900] hover:from-[#FAB900] hover:to-amber-400 hover:text-white hover:scale-105 transition-all duration-300 text-sm font-bold shadow-xl hover:shadow-2xl hover:shadow-[#FAB900]/30 w-full sm:w-auto"
        >
          <Navigation className="w-5 h-5 group-hover/btn:rotate-45 transition-transform duration-300" />
          <span>Ver no Google Maps</span>
          <ExternalLink className="w-3 h-3 opacity-70 group-hover/btn:opacity-100" />
        </button>

        <div className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-md rounded-xl px-4 py-3 text-[#66388C] text-sm font-bold border border-white/30 shadow-xl flex items-center gap-2 w-full sm:w-auto justify-center">
          <MapPin className="w-5 h-5" />
          <span className="bg-gradient-to-r from-[#66388C] to-purple-600 bg-clip-text text-transparent">
            Guará/DF
          </span>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-transparent to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 border border-white/20 relative h-72 w-full">
          <div className="absolute inset-0 overflow-hidden bg-gray-100">
            <img
              src={mapaGuara}
              alt="Mapa das escolas no Guará"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#66388C]/30 via-transparent to-[#FAB900]/20 pointer-events-none" />
          </div>

          <div className="absolute inset-0 pointer-events-auto">
            {schools.map((school) => (
              <LocationPin
                key={school.id}
                school={school}
                isSelected={selectedSchool.id === school.id}
                onClick={(e) => handleSchoolPinClick(school, e)}
              />
            ))}
          </div>
          
          {/* Overlay de brilho */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="relative group/card">
        <div className="absolute -inset-3 bg-gradient-to-r from-[#FAB900]/30 via-purple-500/20 to-[#FAB900]/30 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 -z-10" />
        <div className="bg-gradient-to-br from-white via-white/95 to-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border-2 border-[#FAB900] transition-all duration-500">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-[#66388C] to-purple-600 rounded-xl p-2 shadow-lg">
                  <School className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold bg-gradient-to-r from-[#66388C] to-purple-600 bg-clip-text text-transparent uppercase tracking-wider">
                    Escola Selecionada
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                    {selectedSchool.name}
                  </h3>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3 flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#66388C] flex-shrink-0 mt-0.5" />
                <span>{selectedSchool.address}</span>
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-gray-700 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full px-4 py-2 shadow-sm border border-gray-200">
                  <Users className="w-5 h-5 text-[#66388C] flex-shrink-0" />
                  <span className="text-sm font-medium">
                    {selectedSchool.students.toLocaleString()} alunos
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full px-4 py-2 shadow-sm border border-gray-200">
                  <Calendar className="w-5 h-5 text-[#66388C] flex-shrink-0" />
                  <span className="text-sm font-medium">
                    Desde {selectedSchool.since}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-[#FAB900] via-amber-400 to-[#f5a600] text-white rounded-xl px-4 py-3 text-center shadow-xl border border-amber-300">
                <div className="text-xs font-bold tracking-wider">
                  {selectedSchool.name.includes("CED") ? "CED" : selectedSchool.name.includes("CEM") ? "CEM" : "CEF"}
                </div>
                <div className="text-2xl md:text-3xl font-black leading-none mt-1">
                  {selectedSchool.id.toString().padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LocationPin({
  school,
  isSelected,
  onClick,
}: {
  school: any;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ${isSelected ? "z-40 scale-125" : "z-30 scale-100 hover:scale-110"
        }`}
      style={{
        top: school.coordinates.top,
        left: school.coordinates.left,
      }}
      onClick={onClick}
    >
      <div className="relative group/pin">
        {/* Efeito de pulso para escola selecionada */}
        {isSelected && (
          <>
            <div className="absolute -inset-3 bg-gradient-to-r from-[#FAB900]/40 to-amber-400/40 rounded-full blur-md animate-ping" style={{animationDuration: '2s'}} />
            <div className="absolute -inset-3 bg-gradient-to-r from-[#FAB900]/20 to-amber-400/20 rounded-full blur-md animate-pulse" style={{animationDuration: '1.5s'}} />
          </>
        )}

        {/* Anel externo */}
        <div className={`absolute -ins-2 rounded-full transition-all duration-300 ${isSelected
            ? "bg-gradient-to-r from-[#FAB900] to-amber-400 animate-pulse opacity-30"
            : "bg-gradient-to-r from-[#66388C]/30 to-purple-600/30 opacity-0 group-hover/pin:opacity-30"
          }`}
        />

        {/* Pino do mapa */}
        <div className="relative filter drop-shadow-xl">
          <MapPin
            className={`w-10 h-10 transition-all duration-300 ${isSelected
                ? "text-[#FAB900] fill-[#FAB900] drop-shadow-[0_0_10px_rgba(250,185,0,0.5)]"
                : "text-[#66388C] fill-[#66388C] group-hover/pin:text-purple-500 group-hover/pin:fill-purple-500 group-hover/pin:drop-shadow-[0_0_8px_rgba(102,56,140,0.3)]"
              }`}
          />

          {/* Número dentro do pino */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[70%] text-white font-black text-xs pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {school.id}
          </div>
        </div>
      </div>
    </div>
  );
}