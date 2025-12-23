"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Play, Pause, Users, Target, Heart, ArrowRight } from "lucide-react"

import img1 from "../assets/images/imagem-1.jpg"
import img2 from "../assets/images/imagem-2.jpg"
import img3 from "../assets/images/imagem-3.jpg"
import img4 from "../assets/images/imagem-4.jpg"
import img5 from "../assets/images/imagem-5.jpg"

const heroImages = [
  { src: img1, alt: "Atividade do projeto Vem Comigo"},
  { src: img2, alt: "Dinâmica com alunos em sala"},
  { src: img3, alt: "Equipe Vem Comigo com estudantes"},
  { src: img4, alt: "Ação do projeto em ambiente escolar"},
  { src: img5, alt: "Foto da equipe vemcomigo."},
]

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Stats dinâmicos
  const stats = [
    { label: "Alunos Impactados", value: "200+", icon: Users },
    { label: "Escolas Parceiras", value: "7", icon: Target },
    { label: "Taxa de Sucesso", value: "95%", icon: Heart },
  ]

  // Animação de entrada
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Controle do carrossel automático
  useEffect(() => {
    if (!isPlaying || isHovering) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying, isHovering])

  // Navegação do carrossel
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 4000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 4000)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 4000)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="Início"
      className="relative min-h-[calc(100vh-64px)] bg-[#FAB900] overflow-hidden scroll-mt-16 pt-10"
    >
      {/* Círculos de fundo - inspirados na imagem */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Círculo grande amarelo no canto superior direito */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl" />
        
        {/* Círculo roxo no canto inferior esquerdo */} 
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl" />
        
        {/* Círculo amarelo menor no centro esquerdo */}
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-yellow-400/25 rounded-full blur-2xl" />
        
        {/* Círculo roxo no centro direito */}
        <div className="absolute bottom-1/3 -right-20 w-72 h-72 bg-purple-500/15 rounded-full blur-2xl" />
        
        {/* Círculo pequeno central */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-300/10 rounded-full blur-xl" />
        
        {/* Círculos decorativos adicionais */}
        <div className="absolute top-20 left-1/4 w-40 h-40 bg-yellow-200/20 rounded-full blur-lg" />
        <div className="absolute bottom-40 right-1/3 w-32 h-32 bg-purple-200/15 rounded-full blur-lg" />
      </div>

      {/* Pontos decorativos */}
      <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-white/30 rounded-full" />
      <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-white/40 rounded-full" />
      <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-white/30 rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-white/40 rounded-full" />

      <div className="container relative mx-auto px-4 md:px-6 max-w-7xl min-h-[calc(100vh-64px)] flex items-center pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center w-full py-6 md:py-8 lg:py-12">
          
          {/* Coluna de conteúdo */}
          <div className={`relative z-20 space-y-4 md:space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Título principal - ajustado conforme a imagem */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="block text-white">
                  Educação
                </span>
                <span className="block text-white">
                  Saúde Mental
                </span>
                <span className="block text-white">
                  e Bem-Estar
                </span>
                <span className="block text-purple-900 drop-shadow-sm">
                  nas Escolas
                </span>
              </h1>

              {/* Linha decorativa */}
              <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-purple-600 to-yellow-400 rounded-full" />
            </div>

            {/* Descrição */}
            <p className="text-base md:text-lg lg:text-xl text-gray-800 leading-relaxed max-w-xl">
              Um projeto dedicado ao combate ao bullying e à promoção da saúde mental 
              em escolas públicas do Distrito Federal.
            </p>

            {/* CTA Buttons - ajustado conforme imagem */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-1 md:pt-2">
              <button
                className="group relative bg-purple-700 text-white px-6 md:px-8 py-3 md:py-4 hover:bg-purple-800 active:scale-[0.98] transition-all duration-200 rounded-xl text-sm md:text-base font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                onClick={() => scrollToSection("Sobre")}
              >
                Conheça nossas ações
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                className="group relative bg-white text-purple-700 px-6 md:px-8 py-3 md:py-4 border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 active:scale-[0.98] transition-all duration-200 rounded-xl text-sm md:text-base font-semibold shadow-sm"
                onClick={() => scrollToSection("Contato")}
              >
                Participe do Projeto
              </button>
            </div>

            {/* Stats - redesenhado para ficar mais clean */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 pt-4 md:pt-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div
                    key={idx}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-4 hover:bg-white hover:shadow-lg transition-all duration-300"
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex flex-col items-center text-center gap-1 md:gap-2">
                      <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-purple-100 to-yellow-100">
                        <Icon className="w-4 md:w-6 h-4 md:h-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-lg md:text-2xl font-bold text-purple-900">{stat.value}</div>
                        <div className="text-xs md:text-sm text-purple-800/80 leading-tight mt-0.5 md:mt-1">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Coluna da imagem - totalmente responsiva */}
          <div className={`relative z-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div 
              className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl group w-full h-full max-h-[400px] md:max-h-[500px] lg:max-h-[600px] transition-all duration-500 hover:shadow-3xl"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Imagem principal - altura máxima definida */}
              <div className="relative aspect-[4/3] sm:aspect-[4/4] md:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-100 to-yellow-100">
                {heroImages.map((image, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${idx === currentIndex ? "opacity-100 " : "opacity-0  pointer-events-none"}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  </div>
                ))}

                {/* Overlay suave */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
              </div>
            </div>

            {/* Navegação minimalista abaixo da imagem */}
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
              {/* Indicadores de slides */}
              <div className="flex items-center gap-2 md:gap-2.5">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`transition-all duration-300 ${
                      idx === currentIndex 
                        ? "w-10 md:w-12 h-1.5 md:h-2 bg-purple-700 rounded-full" 
                        : "w-2 h-2 bg-purple-300 rounded-full hover:bg-purple-500 hover:scale-110"
                    }`}
                    aria-label={`Ir para imagem ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Controles */}
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-purple-100 hover:bg-purple-200 active:scale-95 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
                  aria-label="Imagem anterior"
                >
                  <ChevronRight className="w-5 h-5 md:w-5 md:h-5 text-purple-700 rotate-180" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-purple-700 hover:bg-purple-800 active:scale-95 flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  )}
                </button>

                <button
                  onClick={nextSlide}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-purple-100 hover:bg-purple-200 active:scale-95 flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow-md"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="w-5 h-5 md:w-5 md:h-5 text-purple-700" />
                </button>
              </div>
            </div>

            {/* Info adicional abaixo da imagem em telas grandes */}
            <div className="hidden lg:block text-center mt-4 md:mt-6">
              <p className="text-xs md:text-sm text-purple-900/70 font-medium">
                Projeto Vem Comigo - Transformando o futuro através da educação emocional
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsividade para mobile */}
      <div className="lg:hidden container px-4 pb-6">
        <div className="text-center mt-4">
          <p className="text-xs md:text-sm text-purple-900/70 font-medium">
            Projeto Vem Comigo - Transformando o futuro através da educação emocional
          </p>
        </div>
      </div>
    </section>
  )
}