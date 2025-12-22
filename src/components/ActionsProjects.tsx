"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  color: string
  bgColor: string
  featured: {
    title: string
    description: string
    icon: string
    benefits: string[]
  }
}

export function ActionsProjects() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const projects: Project[] = [
    {
      id: 1,
      title: "Palestras Educativas",
      description: "Sessões sobre prevenção ao bullying e promoção da cultura de paz.",
      color: "from-[#66388C] to-[#8B5DAF]",
      bgColor: "bg-gradient-to-br from-[#66388C]/10 to-[#8B5DAF]/10",
      featured: {
        title: "Capacitação de Educadores",
        description: "Formação continua para educadores com ferramentas práticas para identificar e agir diante de situações de violência.",
        icon: "fa-solid fa-chalkboard-user",
        benefits: [
          "Identificação de casos de bullying",
          "Técnicas de mediação de conflitos",
          "Implantação de práticas morais"
        ]
      }
    },
    {
      id: 3,
      title: "Rodas de Conversa",
      description: "Espaços seguros para diálogo aberto entre alunos.",
      color: "from-[#8B5DAF] to-[#66388C]",
      bgColor: "bg-gradient-to-br from-[#8B5DAF]/10 to-[#66388C]/10",
      featured: {
        title: "Mediação de Conflitos",
        description: "Ambientes seguros para discussão aberta, facilitando a comunicação entre estudantes.",
        icon: "fa-solid fa-comments",
        benefits: [
          "Ambientes seguros e confidenciais",
          "Facilitação por profissionais",
          "Resolução pacífica de conflitos"
        ]
      }
    },
    {
      id: 2,
      title: "Oficinas Interativas",
      description: "Dinâmicas de grupo, role-playing e debates sobre empatia.",
      color: "from-[#FAB900] to-[#FFD166]",
      bgColor: "bg-gradient-to-br from-[#FAB900]/10 to-[#FFD166]/10",
      featured: {
        title: "Dinâmicas de Grupo",
        description: "Atividades interativas que promovem empatia, trabalho em equipe e resolução pacífica de conflitos.",
        icon: "fa-solid fa-people-group",
        benefits: [
          "Atividades práticas e envolventes",
          "Desenvolvimento de habilidades sociais",
          "Fortalecimento da autoestima"
        ]
      }
    },
    {
      id: 4,
      title: "Apoio Psicológico",
      description: "Atendimento especializado e apoio emocional para desenvolvimento de resiliência.",
      color: "from-[#66388C] to-[#FAB900]",
      bgColor: "bg-gradient-to-br from-[#66388C]/10 to-[#FAB900]/10",
      featured: {
        title: "Suporte Emocional",
        description: "Estudantes capacitados em valores e escuta ativa, criando rede de apoio entre colegas.",
        icon: "fa-solid fa-heart-circle-check",
        benefits: [
          "Rede de ajuda entre os pares",
          "Detecção e análise de conflitos",
          "Encaminhamento aos especialistas"
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

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 8000)
  }

  const currentProject = projects[currentSlide]

  return (
    <section id="Ações" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#66388C]/10 to-[#FAB900]/10 px-4 py-2 rounded-full mb-4">
            <i className="fas fa-bullseye text-[#66388C]"></i>
            <span className="text-sm font-medium text-[#66388C]">4 Projetos Ativos</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
            Ações &{" "}
            <span className="bg-gradient-to-r from-[#66388C] to-[#FAB900] bg-clip-text text-transparent">
              Projetos
            </span>
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Iniciativas para combater bullying e promover ambientes escolares saudáveis.
          </p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid lg:grid-cols-2 min-h-[500px]">
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <i className="fas fa-layer-group text-[#66388C]"></i>
                    Nossos Projetos
                  </h3>
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    {isAutoPlaying ? (
                      <>
                        <i className="fas fa-pause"></i>
                        <span>Pausar</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-play"></i>
                        <span>Reproduzir</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex gap-1 mb-6">
                  {projects.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-1 flex-1 rounded-full transition-all duration-700 ${
                        currentSlide === index 
                          ? 'bg-[#66388C]' 
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {projects.map((project, index) => {
                    const isActive = currentSlide === index
    
                    return (
                      <button
                        key={project.id}
                        onClick={() => handleSlideChange(index)}
                        className={`
                          group relative overflow-hidden rounded-xl transition-all duration-300 text-left
                          ${project.bgColor}
                          ${isActive 
                            ? 'border-2 border-[#66388C] shadow-lg' 
                            : 'border border-gray-200 hover:border-gray-300 hover:shadow-md'
                          }
                        `}
                      >
                        <div className="relative z-10 pt-6 pb-4 px-4">
                          <div className="flex flex-col items-center text-center mb-3">
                            <div className={`p-3 rounded-full mb-3 ${
                              isActive 
                                ? 'bg-white/40 border-2 border-white/50' 
                                : 'bg-white/30 border border-white/40'
                            }`}>
                              <i className={`fas ${
                                // Corrigindo os ícones baseado na imagem
                                project.id === 1 ? 'fa-chalkboard-teacher' : // Palestras Educativas
                                project.id === 3 ? 'fa-comments' : // Rodas de Conversa
                                project.id === 2 ? 'fa-users' : // Oficinas Interativas
                                'fa-heart' // Apoio Psicológico (mudei de fa-hands-helping para fa-heart)
                              } ${isActive ? 'text-white' : 'text-white/90'} text-lg`}></i>
                            </div>
                            
                            <h4 className={`font-bold text-base mb-2 ${
                              isActive ? 'text-gray-900' : 'text-gray-800'
                            }`}>
                              {project.title}
                            </h4>
                            
                            <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                              {project.description}
                            </p>
                          </div>
                          
                          <div className="mt-auto pt-3 border-t border-white/30">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className={`p-1 rounded-md ${
                                  isActive 
                                    ? 'bg-[#66388C]/20 border border-[#66388C]/30' 
                                    : 'bg-white/20 border border-white/30'
                                }`}>
                                  <i className={`fas fa-hashtag ${isActive ? 'text-[#66388C]' : 'text-gray-700'} text-xs`}></i>
                                </div>
                                <span className={`text-sm font-semibold ${
                                  isActive ? 'text-[#66388C]' : 'text-gray-700'
                                }`}>
                                  Projeto {project.id}
                                </span>
                              </div>
                              
                              {isActive && (
                                <div className="absolute top-3 right-3 bg-[#66388C] text-white text-xs px-2 py-1 rounded-full shadow-md">
                                  <i className="fas fa-check mr-1"></i>
                                  Ativo
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="flex justify-center gap-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlideChange(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentSlide === index 
                          ? 'bg-[#66388C] scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#66388C] to-[#7A45A3] p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-[#FAB900] rounded-full" />
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4 self-start">
                    <i className="fas fa-crown"></i>
                    <span>Projeto em Destaque</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 p-3 rounded-lg flex-shrink-0">
                      <i className={`${currentProject.featured.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">
                        {currentProject.featured.title}
                      </h3>
                      <p className="text-white/70 text-sm flex items-center gap-1">
                        <i className="fas fa-tag"></i>
                        {projects[currentSlide].title}
                      </p>
                    </div>
                  </div>

                  <p className="text-white/90 text-base mb-6 flex-grow leading-relaxed">
                    {currentProject.featured.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-white/80 text-sm flex items-center gap-2">
                      <i className="fas fa-medal"></i>
                      Principais Benefícios:
                    </h4>
                    {currentProject.featured.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 bg-white/10 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-[#FAB900]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="fas fa-check text-[#FAB900] text-xs"></i>
                        </div>
                        <span className="text-white/90 text-sm flex-1">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/20 mt-auto">
                    <div className="flex items-center justify-between text-sm text-white/80 mb-2">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-arrow-right-arrow-left"></i>
                        <span>Projeto {currentSlide + 1} de {projects.length}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-project-diagram"></i>
                        <span className="font-medium">{currentProject.title}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#FAB900] to-[#FFD166] rounded-full transition-all duration-700"
                        style={{ width: `${((currentSlide + 1) / projects.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:hidden flex justify-between items-center p-4 border-t border-gray-100">
              <button
                onClick={prevSlide}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Anterior</span>
              </button>
              
              <div className="flex items-center gap-1">
                {projects.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      currentSlide === index ? 'bg-[#66388C]' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                <span>Próximo</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <i className={`fas ${isAutoPlaying ? 'fa-sync-alt animate-spin' : 'fa-pause'} text-gray-400`}></i>
              <span>{isAutoPlaying ? 'Rotação automática ativa' : 'Rotação pausada'}</span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2 px-4"
              >
                <i className="fas fa-chevron-left"></i>
                <span className="text-sm">Anterior</span>
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2 px-4"
              >
                <span className="text-sm">Próximo</span>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}