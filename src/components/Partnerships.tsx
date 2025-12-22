'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ChevronDown, ChevronUp } from 'lucide-react'

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
  const carouselRef = useRef<HTMLDivElement>(null)
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

      gsap.fromTo('.particle',
        { opacity: 0, scale: 0 },
        {
          opacity: 0.1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out'
        }
      )

    }, partnersRef)

    return () => ctx.revert()
  }, [showAllPartners])

  useEffect(() => {
    if (showAllPartners || !carouselRef.current) return

    const carousel = carouselRef.current
    const logos = Array.from(carousel.children) as HTMLElement[]
    
    const logoWidth = 160
    const gap = 10
    const totalSpacing = logoWidth + gap
    
    logos.forEach((logo, index) => {
      gsap.set(logo, {
        x: index * totalSpacing,
        opacity: 1
      })
    })

    const totalWidth = logos.length * totalSpacing
    const animation = gsap.timeline({ repeat: -1 })
    
    animation.to(logos, {
      x: `-=${totalWidth}`,
      duration: 120,
      ease: "none",
      modifiers: {
        x: gsap.utils.unitize(x => {
          const num = parseFloat(x)
          return num <= -totalWidth ? num + totalWidth : num
        })
      }
    })

    logos.forEach(logo => {
      const updateOpacity = () => {
        const rect = logo.getBoundingClientRect()
        const containerRect = carousel.getBoundingClientRect()
        
        const relativeLeft = (rect.left - containerRect.left) / containerRect.width
        const relativeRight = (rect.right - containerRect.left) / containerRect.width
        
        const fadeZone = 0.05
        let opacity = 1
        
        if (relativeLeft < fadeZone) {
          opacity = Math.pow(relativeLeft / fadeZone, 0.5)
        } else if (relativeRight > (1 - fadeZone)) {
          opacity = Math.pow((1 - relativeRight) / fadeZone, 0.5)
        }
        
        gsap.to(logo, {
          opacity: Math.max(0, opacity),
          duration: 0.2
        })
      }
      
      gsap.ticker.add(updateOpacity)
      
      return () => gsap.ticker.remove(updateOpacity)
    })

    return () => {
      animation.kill()
      gsap.killTweensOf(logos)
    }
  }, [showAllPartners])

  const partnerLogos = [
    { name: 'GEPEM', image: LogoGEPEM, category: 'Governo', description: 'Grupo de Estudos e Pesquisas em Educação Moral' },
    { name: 'Secretaria de Educação', image: LogoSEEDF, category: 'Governo', description: 'Órgão responsável pela educação pública' },
    { name: 'UNESP', image: LogoUNESP, category: 'Educação', description: 'Universidade Estadual Paulista' },
    { name: 'UNICAMP', image: LogoUNICAMP, category: 'Educação', description: 'Universidade Estadual de Campinas' },
    { name: 'Governo do DF', image: LogoGDF, category: 'Governo', description: 'Parceria institucional' },
    { name: 'Universidade de Brasília', image: LogoUNB, category: 'Educação', description: 'Pesquisa e formação acadêmica' },
    { name: 'CRP-DF', image: LogoCRP, category: 'Saúde', description: 'Conselho Regional de Psicologia' },
    { name: 'Conselho Tutelar', image: LogoConselho, category: 'Social', description: 'Proteção de direitos da criança' },
  ]

  const carouselLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos]

  const partnersByCategory = partnerLogos.reduce((acc, partner) => {
    if (!acc[partner.category]) acc[partner.category] = []
    acc[partner.category].push(partner)
    return acc
  }, {} as Record<string, typeof partnerLogos>)

  const categoryIcons = {
    'Governo': <i className="fas fa-landmark text-xl text-[#66388C]"></i>,
    'Educação': <i className="fas fa-book-open text-xl text-[#66388C]"></i>,
    'Saúde': <i className="fas fa-heart-pulse text-xl text-[#FAB900]"></i>,
    'Social': <i className="fas fa-handshake text-xl text-[#FAB900]"></i>
  }

  const toggleShowAllPartners = () => {
    setIsAnimatingToggle(true)
    setShowAllPartners(!showAllPartners)
    setTimeout(() => setIsAnimatingToggle(false), 600)
  }

  return (
    <section 
      id='Parceiros' 
      ref={partnersRef} 
      className="relative py-16 md:py-24 bg-gradient-to-b from-white via-gray-50/30 to-white scroll-mt-20"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Fundo simplificado - apenas gradientes suaves */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#66388C]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#FAB900]/5 to-transparent" />
        
        {/* Elementos decorativos mínimos */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#66388C]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-[#FAB900]/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="partnerships-title text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-center mb-4">
            Nossos{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#66388C] via-[#8B5DAF] to-[#FAB900] bg-clip-text text-transparent">
                Parceiros
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#66388C] via-[#8B5DAF] to-[#FAB900] rounded-full"></div>
            </span>
          </h2>

          <p className="partnerships-description text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Juntos construímos uma <span className="font-semibold text-[#66388C]">rede de apoio sólida</span> para transformar a educação 
            e promover <span className="font-semibold text-[#FAB900]">saúde mental</span> nas escolas do Distrito Federal.
          </p>
        </div>

        {!showAllPartners && (
          <div className="relative mb-12 md:mb-16 overflow-hidden">
            <div 
              ref={carouselRef}
              className="flex items-center h-40 relative"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%)'
              }}
            >
              {carouselLogos.map((partner, index) => (
                <div 
                  key={`${partner.name}-${index}`} 
                  className="absolute carousel-logo"
                  style={{
                    width: '130px',
                    left: `${index * 10}px`
                  }}
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg border border-gray-100/50 flex items-center justify-center hover:shadow-2xl hover:scale-110 hover:border-[#66388C]/30 hover:-translate-y-2 transition-all duration-500 p-3 mx-[5px]">
                    <img 
                      src={partner.image} 
                      alt={partner.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="mt-3 text-center px-1">
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-[#66388C] transition-colors duration-300 line-clamp-1">
                      {partner.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showAllPartners && (
          <div className={`mb-12 md:mb-16 transition-all duration-500 ${isAnimatingToggle ? 'opacity-0' : 'opacity-100'}`}>
            {Object.entries(partnersByCategory).map(([category, partners]) => (
              <div key={category} className="mb-16 last:mb-0">
                
                <div className="flex items-center justify-center gap-6 mb-12">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200" />
                  <div className="flex items-center gap-4 bg-gradient-to-r from-[#66388C]/10 to-[#FAB900]/10 px-8 py-4 rounded-full border border-gray-200">
                    <span className="text-2xl">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-[#66388C] to-[#FAB900] bg-clip-text text-transparent">
                      {category}
                    </h3>
                    <span className="text-sm font-semibold text-gray-500 bg-white px-4 py-1 rounded-full">
                      {partners.length}
                    </span>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {partners.map((partner) => (
                    <div key={partner.name} className="partner-grid-item group">
                      <div className="relative bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-md hover:shadow-2xl hover:scale-105 hover:border-[#66388C]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center">

                        <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:shadow-md group-hover:scale-110 transition-all duration-300 p-2">
                          <img 
                            src={partner.image} 
                            alt={partner.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <h4 className="text-sm font-bold text-gray-800 mb-2 group-hover:text-[#66388C] transition-colors duration-300 line-clamp-2">
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

        <div className="text-center pt-8">
          <button
            onClick={toggleShowAllPartners}
            disabled={isAnimatingToggle}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#66388C] via-[#7A45A3] to-[#8B5DAF] text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg shadow-[#66388C]/20 hover:shadow-xl hover:shadow-[#66388C]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <span className="relative z-10">
              {showAllPartners ? 'Ver Carrossel' : 'Ver Todas as Parcerias'}
            </span>

            {showAllPartners ? (
              <ChevronUp className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 relative z-10" />
            ) : (
              <ChevronDown className="w-5 h-5 group-hover:scale-110 group-hover:translate-y-1 transition-all duration-300 relative z-10" />
            )}
          </button>
        </div>
      </div>
    </section>
  )
}