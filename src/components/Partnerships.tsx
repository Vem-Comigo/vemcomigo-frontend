// components/sections/Partnerships.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ChevronDown, ChevronUp, TrendingUp } from 'lucide-react'

import LogoGEPEM from "../assets/Parceiros/GEPEM.png"
import LogoSEEDF from "../assets/Parceiros/SecretariaDeEducação.png"
import LogoUNESP from "../assets/Parceiros/UNESP.png"
import LogoUNICAMP from "../assets/Parceiros/UNICAMP.jpg"
import LogoCRP from "../assets/Parceiros/crp-logo.png"
import LogoGDF from "../assets/Parceiros/logo-gdf.jpeg"
import LogoConselho from "../assets/Parceiros/conselho-tutelar-logo.jpg"
import LogoUNB from "../assets/Parceiros/unb-universidade-de-brasilia-logo.png"

export function Partnerships() {
  const partnersRef = useRef<HTMLDivElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)
  const [showAllPartners, setShowAllPartners] = useState(false)
  const [isAnimatingToggle, setIsAnimatingToggle] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.partnerships-title', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )

      gsap.fromTo('.partnerships-description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      )

      if (logosRef.current && !showAllPartners) {
        const logos = logosRef.current
        const totalWidth = logos.scrollWidth / 2
        
        gsap.to(logos, {
          x: -totalWidth,
          duration: 50,
          ease: 'none',
          repeat: -1
        })
      }

      if (showAllPartners) {
        gsap.fromTo('.partner-grid-item',
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out'
          }
        )
      }
    }, partnersRef)

    return () => ctx.revert()
  }, [showAllPartners])

  const partnerLogos = [
    { name: 'GEPEM', icon: <img src={LogoGEPEM} alt="" />, category: 'Governo', description: 'Grupo de Estudos e Pesquisas em Educação Moral' },
    { name: 'Secretaria de Educação', icon: <img src={LogoSEEDF} alt="" />, category: 'Governo', description: 'Órgão responsável pela educação pública' },
    { name: 'UNESP', icon: <img src={LogoUNESP} alt="" />, category: 'Educação', description: 'Universidade Estadual Paulista' },
    { name: 'UNICAMP', icon: <img src={LogoUNICAMP} alt="" />, category: 'Educação', description: 'Universidade Estadual de Campinas' },
    { name: 'Governo do DF', icon: <img src={LogoGDF} alt="" />, category: 'Governo', description: 'Parceria institucional' },
    { name: 'Universidade de Brasília', icon: <img src={LogoUNB} alt="" />, category: 'Educação', description: 'Pesquisa e formação acadêmica' },
    { name: 'CRP-DF', icon: <img src={LogoCRP} alt="" />, category: 'Saúde', description: 'Conselho Regional de Psicologia' },
    { name: 'Conselho Tutelar', icon: <img src={LogoConselho} alt="" />, category: 'Social', description: 'Proteção de direitos da criança' },
  ]

  const partnersByCategory = partnerLogos.reduce((acc, partner) => {
    if (!acc[partner.category]) acc[partner.category] = []
    acc[partner.category].push(partner)
    return acc
  }, {} as Record<string, typeof partnerLogos>)

  const duplicatedLogos = [...partnerLogos.slice(0, 8), ...partnerLogos.slice(0, 8)]

  const categoryIcons = {
    'Governo': <i className="fas fa-landmark text-2xl text-purple-600"></i>,
    'Educação': <i className="fas fa-book-open text-2xl text-blue-600"></i>,
    'Saúde': <i className="fas fa-heart-pulse text-2xl text-red-500"></i>,
    'Social': <i className="fas fa-handshake text-2xl text-green-600"></i>
  }

  const toggleShowAllPartners = () => {
    setIsAnimatingToggle(true)
    setShowAllPartners(!showAllPartners)
    setTimeout(() => setIsAnimatingToggle(false), 600)
  }

  return (
    <section id='Parceiros' ref={partnersRef} className="relative bg-gradient-to-br from-white via-gray-50 to-[#FAB900]/5 pt-9">

      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#66388C]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FAB900]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#66388C]/3 to-[#FAB900]/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="partnerships-title text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight text-center">
            Nossos <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#66388C] via-[#8B4FB3] to-[#FAB900] bg-clip-text text-transparent">
                Parceiros
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path d="M0 4C50 4 50 8 100 4C150 0 150 4 200 4" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                    <stop offset="0%" stopColor="#66388C"/>
                    <stop offset="100%" stopColor="#FAB900"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="partnerships-description text-lg md:text-xl pt-10 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Juntos construímos uma <span className="font-semibold text-[#66388C]">rede de apoio sólida</span> para transformar a educação 
            e promover <span className="font-semibold text-[#FAB900]">saúde mental</span> nas escolas do Distrito Federal.
          </p>
        </div>

        {/* Logos rolando */}
        {!showAllPartners && (
          <div className="relative mb-20 md:mb-24">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <div className="bg-white/50 backdrop-blur-sm rounded-3xl py-8 border border-gray-100 shadow-sm overflow-hidden">
              <div ref={logosRef} className="flex gap-10 md:gap-14 items-center">
                {duplicatedLogos.map((partner, index) => (
                  <div key={`${partner.name}-${index}`} className="flex-shrink-0 group cursor-pointer">
                    <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-md border-2 border-gray-100/50 flex items-center justify-center hover:shadow-2xl hover:scale-110 hover:border-[#66388C]/30 hover:-translate-y-2 transition-all duration-500">
                      <div className="w-full h-full p-4 flex items-center justify-center">
                        {partner.icon}
                      </div>
                    </div>

                    <div className="mt-4 text-center px-2">
                      <span className="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-[#66388C] transition-colors duration-300 line-clamp-2">
                        {partner.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-6">
              <span className="text-xs text-gray-400 font-medium flex items-center justify-center gap-2">
                <TrendingUp className="w-3 h-3" />
                Deslizando automaticamente
              </span>
            </div>
          </div>
        )}

        {/* Grid de parceiros */}
        {showAllPartners && (
          <div className={`mb-20 md:mb-24 transition-all duration-500 ${isAnimatingToggle ? 'opacity-0' : 'opacity-100'}`}>
            {Object.entries(partnersByCategory).map(([category, partners]) => (
              <div key={category} className="mb-16 last:mb-0">
                
                <div className="flex items-center justify-center gap-3 mb-10">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300" />
                  <div className="flex items-center gap-3 bg-gradient-to-r from-[#66388C]/10 to-[#FAB900]/10 px-6 py-3 rounded-full border border-gray-200">
                    <span className="text-2xl">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                    <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#66388C] to-[#FAB900] bg-clip-text text-transparent">
                      {category}
                    </h3>
                    <span className="text-sm font-semibold text-gray-500 bg-white px-3 py-1 rounded-full">
                      {partners.length}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
                  {partners.map((partner) => (
                    <div key={partner.name} className="partner-grid-item group">
                      <div className="relative bg-white rounded-3xl p-6 border-2 border-gray-100 shadow-md hover:shadow-2xl hover:scale-105 hover:border-[#66388C]/30 hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col items-center text-center">

                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-500 p-2">
                          {partner.icon}
                        </div>

                        <h4 className="text-sm md:text-base font-bold text-gray-800 mb-2 group-hover:text-[#66388C] transition-colors duration-300 line-clamp-2">
                          {partner.name}
                        </h4>

                        <p className="text-xs text-gray-500 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {partner.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Botão toggle */}
        <div className="text-center mb-20 md:mb-24 pb-10">
          <button
            onClick={toggleShowAllPartners}
            disabled={isAnimatingToggle}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#66388C] via-[#7A45A3] to-[#8B4FB3] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-[#66388C]/20 hover:shadow-2xl hover:shadow-[#66388C]/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <span className="relative z-10">
              {showAllPartners ? 'Ver Menos Parceiros' : 'Ver Todas as Parcerias'}
            </span>

            {showAllPartners ? (
              <ChevronUp className="w-6 h-6 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 relative z-10" />
            ) : (
              <ChevronDown className="w-6 h-6 group-hover:scale-110 group-hover:translate-y-1 transition-all duration-300 relative z-10" />
            )}
          </button>
        </div>

      </div>
    </section>
  )
}
