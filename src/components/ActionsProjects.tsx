// components/sections/ActionsProjects.tsx
"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Users, MessageCircle, Heart, Shield, BookOpen, Users2 } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  featured: {
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    benefits: string[]
  }
}

interface ProjectCardProps {
  project: Project
  isActive: boolean
  onClick: () => void
}

export function ActionsProjects() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const projects: Project[] = [
    {
      id: 1,
      title: "Palestras Educativas",
      description: "Sessões informativas sobre prevenção ao bullying, cyberbullying e promoção da cultura de paz nas escolas.",
      icon: MessageCircle,
      color: "from-blue-500 to-cyan-500",
      featured: {
        title: "Capacitação de Educadores",
        description: "Oferecemos formação continuada para professores e coordenadores, fornecendo ferramentas práticas para identificar situações de bullying, mediar conflitos e promover um ambiente escolar mais acolhedor e inclusivo.",
        icon: BookOpen,
        benefits: [
          "Identificação de sinais de bullying",
          "Técnicas de mediação de conflitos",
          "Estratégias de intervenção eficazes",
          "Suporte psicológico para educadores"
        ]
      }
    },
    {
      id: 2,
      title: "Oficinas Interativas",
      description: "Atividades práticas que envolvem estudantes em dinâmicas de grupo, role-playing e debates sobre empatia.",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      featured: {
        title: "Dinâmicas de Grupo",
        description: "Desenvolvemos atividades interativas que promovem a empatia, trabalho em equipe e resolução pacífica de conflitos entre os estudantes.",
        icon: Users2,
        benefits: [
          "Atividades práticas e envolventes",
          "Desenvolvimento de habilidades sociais",
          "Fortalecimento da autoestima",
          "Promoção do trabalho em equipe"
        ]
      }
    },
    {
      id: 3,
      title: "Rodas de Conversa",
      description: "Espaços seguros para diálogo aberto onde alunos podem compartilhar experiências e buscar soluções.",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      featured: {
        title: "Mediação de Conflitos",
        description: "Criamos ambientes seguros para discussão aberta, facilitando a comunicação entre estudantes e promovendo entendimento mútuo.",
        icon: Heart,
        benefits: [
          "Ambientes seguros e confidenciais",
          "Facilitação por profissionais",
          "Resolução pacífica de conflitos",
          "Desenvolvimento da comunicação"
        ]
      }
    },
    {
      id: 4,
      title: "Apoio Psicológico",
      description: "Atendimento especializado para vítimas de bullying e apoio emocional para desenvolvimento de resiliência.",
      icon: Shield,
      color: "from-purple-500 to-violet-500",
      featured: {
        title: "Suporte Emocional",
        description: "Oferecemos acompanhamento psicológico especializado para estudantes, com foco no desenvolvimento de resiliência e saúde mental.",
        icon: Shield,
        benefits: [
          "Atendimento individual especializado",
          "Desenvolvimento de resiliência",
          "Acompanhamento contínuo",
          "Suporte à família e educadores"
        ]
      }
    }
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % projects.length)
  }, [projects.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length)
  }, [projects.length])

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  const currentProject = projects[currentSlide]

  return (
    <section id="Ações" className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight text-center">
            Ações & <span className="text-[#66388C]">Projetos</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Desenvolvemos iniciativas completas para combater o bullying e promover 
            ambientes escolares mais saudáveis e inclusivos.
          </p>
        </div>

        <div className="relative">
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
              
              {/* Left Side - Project Cards */}
              <div className="relative p-6 sm:p-8 md:p-12">
                {/* Progress Bar */}
                <div className="flex gap-1 mb-6">
                  {projects.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-1 flex-1 rounded-full transition-all duration-1000 ${
                        currentSlide === index 
                          ? 'bg-[#66388C]' 
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Cards Container */}
                <div className="relative h-64 sm:h-72 md:h-80">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isActive={currentSlide === index}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-8">
                  {projects.map((project, index) => (
                    <button
                      key={project.id}
                      onClick={() => setCurrentSlide(index)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                        currentSlide === index 
                          ? 'bg-[#66388C] text-white shadow-lg scale-105' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        currentSlide === index ? 'bg-white' : 'bg-gray-400'
                      }`} />
                      <span className="text-sm font-medium">{project.title.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side - Featured Content */}
              <div className="bg-gradient-to-br from-[#66388C] to-[#7A45A3] p-6 sm:p-8 md:p-12 text-white relative overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-[#FAB900] rounded-full transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FAB900] rounded-full opacity-20 blur-xl" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#FAB900] p-2 rounded-lg transition-transform duration-300 group-hover:scale-110">
                      <currentProject.featured.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold transition-all duration-500">
                      {currentProject.featured.title}
                    </h3>
                  </div>

                  <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90 mb-6 transition-all duration-500">
                    {currentProject.featured.description}
                  </p>

                  <div className="space-y-3">
                    {currentProject.featured.benefits.map((benefit, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-2"
                        style={{ transitionDelay: `${index * 100}ms` }}
                      >
                        <div className="flex-shrink-0 w-2 h-2 bg-[#FAB900] rounded-full" />
                        <span className="text-white/90 text-sm sm:text-base">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Indicator */}
                  <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2 text-white/70">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                        {currentSlide + 1}
                      </div>
                      <span className="text-sm">de {projects.length}</span>
                    </div>
                    <div className="flex-1 h-1 bg-white/20 rounded-full">
                      <div 
                        className="h-full bg-[#FAB900] rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentSlide + 1) / projects.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-20 group"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-20 group"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Project Card Component
function ProjectCard({ project, isActive, onClick }: ProjectCardProps) {
  const Icon = project.icon

  const getCardPosition = () => {
    if (isActive) {
      return "z-30 scale-100 opacity-100 translate-x-0 cursor-default"
    }
    return "z-10 scale-75 opacity-30 translate-x-0 cursor-pointer hover:opacity-50"
  }

  return (
    <div
      className={`
        absolute inset-0 transition-all duration-500 ease-out cursor-pointer
        ${getCardPosition()}
      `}
      onClick={onClick}
    >
      <div className={`
        bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 h-full
        transition-all duration-300
        ${isActive 
          ? 'border-[#66388C] shadow-xl cursor-default' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
        }
      `}>
        {/* Icon */}
        <div className={`
          w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r flex items-center justify-center mb-4
          transition-transform duration-300
          ${isActive ? 'scale-110' : 'scale-100'}
          ${project.color}
        `}>
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>

        {/* Content */}
        <h3 className={`
          text-xl sm:text-2xl font-bold mb-3 transition-colors duration-300
          ${isActive ? 'text-gray-900' : 'text-gray-600'}
        `}>
          {project.title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          {project.description}
        </p>

        {/* Active Indicator */}
        {isActive && (
          <div className="absolute bottom-4 right-4 animate-pulse">
            <div className="bg-[#66388C] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              ATUAL
            </div>
          </div>
        )}

        {/* Hover Arrow for inactive cards */}
        {!isActive && (
          <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
              <ChevronRight className="w-3 h-3 inline" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}