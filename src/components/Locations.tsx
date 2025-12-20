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
        "https://www.google.com/maps/search/CED+04+GUARÁ+Quadra+4+Guará+DF",
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
      className="bg-gradient-to-br from-[#66388C] via-[#7A45A3] to-[#FAB900] relative overflow-hidden py-10 md:py-12 scroll-mt-12 md:scroll-mt-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-[#FAB900]/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-14 h-14 bg-white/5 rounded-full blur-lg" />
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-[#FAB900]/15 rounded-full blur-xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <SectionTitle prefix="Onde" highlighted="Atuamos" />
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-5 md:gap-6">
          <div className="space-y-4">
            <div className="mb-4">
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                Nossa Presença no Guará
              </h3>
              <p className="text-sm text-white/90 leading-relaxed">
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

          <div className="space-y-4">
            <InteractiveMapCard
              schools={schools}
              selectedSchool={selectedSchool}
              onSchoolSelect={setSelectedSchool}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  prefix,
  highlighted,
}: {
  prefix: string;
  highlighted: string;
}) {
  return (
    <div className="inline-block">
      <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight text-center">
        {prefix}{" "}
        <span className="bg-gradient-to-r from-white to-[#FAB900] bg-clip-text text-transparent">
          {highlighted}
        </span>
      </h2>
      <div className="h-0.5 w-28 md:w-36 mx-auto bg-gradient-to-r from-white/50 to-[#FAB900]/50 rounded-full mt-2" />
    </div>
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
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-3">
      <div className="flex items-center gap-2 mb-3">
        <School className="w-4 h-4 text-white" />
        <h4 className="text-sm md:text-base font-bold text-white">
          Escolas Atendidas
        </h4>
        <span className="bg-[#FAB900] text-white text-xs font-bold rounded-full px-2 py-0.5 ml-auto flex-shrink-0">
          {schools.length} escolas
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {schools.map((school) => (
          <button
            key={school.id}
            onClick={() => onSchoolSelect(school)}
            className={`
              flex items-start gap-2 p-2.5 rounded-lg transition-all duration-300 cursor-pointer
              backdrop-blur-sm border relative overflow-hidden group w-full
              ${
                selectedSchool.id === school.id
                  ? "bg-white/20 border-white/30 shadow-lg"
                  : "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30"
              }
              text-left
            `}
          >
            {selectedSchool.id === school.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-[#FAB900]/10 to-transparent animate-pulse" />
            )}

            <div
              className={`
              w-7 h-7 rounded-full flex-shrink-0 relative z-10
              flex items-center justify-center transition-all duration-300
              ${
                selectedSchool.id === school.id
                  ? "bg-[#FAB900] text-white shadow-md shadow-[#FAB900]/30"
                  : "bg-white/20 text-white group-hover:bg-white/30"
              }
            `}
            >
              <span className="font-bold text-xs">
                {school.id}
              </span>
            </div>

            <div className="relative z-10 flex-1 min-w-0">
              <span className="text-white font-semibold block text-sm">
                {school.name}
              </span>
              {selectedSchool.id === school.id && (
                <span className="text-white/70 text-xs block mt-0.5">
                  {school.address}
                </span>
              )}
              <div className="flex items-center gap-1.5 mt-1 text-xs text-white/60 flex-wrap">
                <Users className="w-3 h-3 flex-shrink-0" />
                <span>{school.students} alunos</span>
                <span className="flex-shrink-0">•</span>
                <Calendar className="w-3 h-3 flex-shrink-0" />
                <span>Desde {school.since}</span>
              </div>
            </div>

            {selectedSchool.id === school.id && (
              <div className="relative z-10 flex-shrink-0">
                <div className="bg-[#FAB900] rounded-full p-1">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
          </button>
        ))}
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
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <button
          onClick={handleViewMap}
          className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#66388C] rounded-full px-2.5 py-1.5 border border-white/50 hover:border-[#FAB900] hover:text-[#FAB900] hover:scale-105 transition-all duration-300 group/btn text-xs font-bold shadow-lg"
        >
          <Navigation className="w-3 h-3 group-hover/btn:rotate-45 transition-transform duration-300" />
          <span>Ver no Google Maps</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
        </button>

        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 text-[#66388C] text-xs font-bold border border-white/30 shadow-lg flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          Guará/DF
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl transition-all duration-500 border border-white/20 relative h-56 md:h-72 w-full group">
        <div className="absolute inset-0 overflow-hidden bg-gray-100">
          <img
            src={mapaGuara}
            alt="Mapa das escolas no Guará"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#66388C]/20 via-transparent to-[#FAB900]/10 pointer-events-none" />
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

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-sm rounded-full px-2.5 py-1 text-white text-xs font-medium border border-white/20 shadow-lg flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-[#FAB900]" />
            Clique nos pinos
          </div>
        </div>
      </div>

      <div className="bg-white backdrop-blur-md rounded-xl p-3 shadow-2xl border-2 border-[#FAB900] transition-all duration-500">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#66388C] rounded-full p-1.5">
                <School className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-[#66388C] uppercase tracking-wider">
                  Escola Selecionada
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 mt-0.5">
                  {selectedSchool.name}
                </h3>
              </div>
            </div>

            <p className="text-gray-600 text-xs mb-2 flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#66388C] flex-shrink-0 mt-0.5" />
              <span>{selectedSchool.address}</span>
            </p>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-gray-700 bg-gray-100 rounded-full px-2.5 py-1">
                <Users className="w-3.5 h-3.5 text-[#66388C] flex-shrink-0" />
                <span className="text-xs font-medium">
                  {selectedSchool.students.toLocaleString()} alunos
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-700 bg-gray-100 rounded-full px-2.5 py-1">
                <Calendar className="w-3.5 h-3.5 text-[#66388C] flex-shrink-0" />
                <span className="text-xs font-medium">
                  Desde {selectedSchool.since}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="bg-gradient-to-br from-[#FAB900] to-[#f5a600] text-white rounded-xl px-2.5 py-2 text-center shadow-lg">
              <div className="text-[10px] font-bold">
                {selectedSchool.name.includes("CED") ? "CED" : selectedSchool.name.includes("CEM") ? "CEM" : "CEF"}
              </div>
              <div className="text-xl font-black leading-none">
                {selectedSchool.id.toString().padStart(2, "0")}
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
      className={`
        absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500
        ${
          isSelected
            ? "z-40 scale-125"
            : "z-30 scale-100 hover:scale-110"
        }
      `}
      style={{
        top: school.coordinates.top,
        left: school.coordinates.left,
      }}
      onClick={onClick}
    >
      <div className="relative group/pin">
        <div
          className={`
          absolute -inset-2 rounded-full transition-all duration-300
          ${
            isSelected
              ? "bg-[#FAB900] animate-pulse opacity-40"
              : "bg-[#66388C]/30 opacity-0 group-hover/pin:opacity-40"
          }
        `}
        />

        <div className="relative filter drop-shadow-lg">
          <MapPin
            className={`
            w-7 h-7 md:w-8 md:h-8 transition-all duration-300
            ${
              isSelected
                ? "text-[#FAB900] fill-[#FAB900]"
                : "text-[#66388C] fill-[#66388C] group-hover/pin:text-[#7A45A3] group-hover/pin:fill-[#7A45A3]"
            }
          `}
          />

          <div
            className="
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[70%] 
            text-white font-black text-[10px] pointer-events-none
            drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]
          "
          >
            {school.id}
          </div>
        </div>

        <div className="hidden md:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover/pin:opacity-100 transition-all duration-300 pointer-events-none z-50">
          <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-2xl border border-white/10 max-w-[200px]">
            <div className="font-bold text-[#FAB900]">
              {school.name}
            </div>
            <div className="text-white/80 text-[10px] mt-1 flex items-center gap-1">
              <Users className="w-3 h-3 text-[#FAB900]" />
              {school.students.toLocaleString()} alunos
            </div>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
            <div className="border-[6px] border-transparent border-t-gray-900" />
          </div>
        </div>
      </div>
    </div>
  );
}