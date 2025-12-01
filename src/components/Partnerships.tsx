// components/sections/WhereWeAct.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { MapPin, School, Users, Heart, Target, ArrowRight, CheckCircle } from 'lucide-react'

export function WhereWeAct() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título
      gsap.fromTo('.where-title', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      )

      gsap.fromTo('.where-description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      )

      // Animação dos cards de escolas
      gsap.fromTo('.school-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.2)',
          delay: 0.6
        }
      )

      // Animação dos stats
      gsap.fromTo('.stat-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.8
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const schools = [
    { id: 'cef01', name: 'CEF 01 de Planaltina', region: 'Planaltina', students: '1200+', status: 'active' },
    { id: 'cef02', name: 'CEF 02 de Planaltina', region: 'Planaltina', students: '950+', status: 'active' },
    { id: 'cef03', name: 'CEF 03 de Planaltina', region: 'Planaltina', students: '800+', status: 'active' },
    { id: 'cef04', name: 'CEF 04 de Planaltina', region: 'Planaltina', students: '1100+', status: 'active' },
    { id: 'cef05', name: 'CEF 05 de Planaltina', region: 'Planaltina', students: '700+', status: 'active' },
    { id: 'cef06', name: 'CEF 06 de Planaltina', region: 'Planaltina', students: '1300+', status: 'active' },
    { id: 'cef07', name: 'CEF 07 de Planaltina', region: 'Planaltina', students: '900+', status: 'active' },
    { id: 'cef08', name: 'CEF 08 de Planaltina', region: 'Planaltina', students: '1000+', status: 'planned' },
    { id: 'selected', name: 'CEF Selecionada', region: 'Setor Especial', students: '1500+', status: 'selected' },
    { id: 'setor', name: 'Setor Educacional', region: 'Novo Desenvolvimento', students: 'Próxima fase', status: 'planned' },
  ]

  const stats = [
    { icon: School, number: '15', label: 'Escolas Atendidas', color: 'purple' },
    { icon: Users, number: '2.5K+', label: 'Estudantes Impactados', color: 'yellow' },
    { icon: Heart, number: '50+', label: 'Profissionais Envolvidos', color: 'purple' },
    { icon: Target, number: '8', label: 'Regiões do DF', color: 'yellow' },
  ]

  const schoolDetails = {
    cef01: { description: 'Pioneira no programa, com resultados expressivos em saúde mental escolar', focus: 'Prevenção e acolhimento' },
    cef02: { description: 'Foco em desenvolvimento socioemocional dos estudantes', focus: 'Habilidades sociais' },
    cef03: { description: 'Trabalho integrado com famílias e comunidade', focus: 'Rede de apoio' },
    cef04: { description: 'Programa de mentoria e orientação profissional', focus: 'Projeto de vida' },
    cef05: { description: 'Intervenções em grupo e atendimentos individuais', focus: 'Saúde mental' },
    cef06: { description: 'Parceria forte com conselho tutelar local', focus: 'Proteção social' },
    cef07: { description: 'Inovação em metodologias ativas de aprendizagem', focus: 'Pedagogia ativa' },
    cef08: { description: 'Próxima escola a receber o programa em 2024', focus: 'Expansão' },
    selected: { description: 'Escola modelo com resultados excepcionais no programa', focus: 'Casos de sucesso' },
    setor: { description: 'Nova região em processo de adesão ao programa', focus: 'Expansão futura' },
  }

  const handleSchoolClick = (schoolId: string) => {
    setSelectedSchool(schoolId === selectedSchool ? null : schoolId)
  }

  return (
    <section id='onde-atuamos' ref={sectionRef} className="relative bg-gradient-to-br from-white via-gray-50 to-[#66388C]/5 py-24">
      
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#FAB900]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#66388C]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-[#66388C]/10 to-[#FAB900]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto pt-22 max-sm:pt-12 max-lg:pt-16 px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-[#66388C]/10 to-[#FAB900]/10">
              <MapPin className="w-8 h-8 text-[#66388C]" />
            </div>
            <span className="text-sm font-semibold text-[#66388C] bg-[#66388C]/10 px-4 py-2 rounded-full">
              Nossa Atuação
            </span>
          </div>

          <h2 className="where-title text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Onde{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#66388C] via-[#8B4FB3] to-[#FAB900] bg-clip-text text-transparent">
                Atuamos
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
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

          <p className="where-description text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Estamos presentes em escolas públicas do Distrito Federal, levando nosso projeto para 
            <span className="font-semibold text-[#66388C]"> comunidades que mais precisam de apoio</span> e 
            transformando <span className="font-semibold text-[#FAB900]">vidas através da educação</span>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className={`
                    inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4
                    ${stat.color === 'purple' 
                      ? 'bg-gradient-to-br from-[#66388C]/10 to-[#66388C]/20 text-[#66388C]' 
                      : 'bg-gradient-to-br from-[#FAB900]/10 to-[#FAB900]/20 text-[#FAB900]'
                    }
                  `}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid interativa de escolas */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Lista de escolas */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map((school) => (
                  <button
                    key={school.id}
                    onClick={() => handleSchoolClick(school.id)}
                    className={`
                      school-card group text-left
                      ${selectedSchool === school.id 
                        ? 'ring-2 ring-[#66388C] ring-offset-2' 
                        : ''
                      }
                    `}
                  >
                    <div className={`
                      relative bg-white rounded-2xl p-6 h-full
                      border-2 transition-all duration-300
                      hover:shadow-xl hover:-translate-y-1
                      ${selectedSchool === school.id 
                        ? 'border-[#66388C] shadow-lg' 
                        : 'border-gray-100 shadow-sm'
                      }
                      ${school.status === 'selected' 
                        ? 'bg-gradient-to-br from-white to-[#FAB900]/5' 
                        : school.status === 'planned' 
                          ? 'bg-gradient-to-br from-white to-gray-50/50' 
                          : ''
                      }
                    `}>
                      
                      {/* Status indicator */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`
                          flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold
                          ${school.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : school.status === 'selected' 
                              ? 'bg-[#66388C]/10 text-[#66388C]' 
                              : 'bg-gray-100 text-gray-600'
                          }
                        `}>
                          <div className={`
                            w-2 h-2 rounded-full
                            ${school.status === 'active' 
                              ? 'bg-green-500' 
                              : school.status === 'selected' 
                                ? 'bg-[#66388C]' 
                                : 'bg-gray-400'
                            }
                          `} />
                          {school.status === 'active' ? 'Ativa' : 
                           school.status === 'selected' ? 'Destaque' : 'Planejada'}
                        </div>
                        
                        {selectedSchool === school.id && (
                          <CheckCircle className="w-5 h-5 text-[#66388C]" />
                        )}
                      </div>

                      {/* School info */}
                      <div className="mb-4">
                        <h3 className={`
                          text-lg font-bold mb-2 line-clamp-2
                          ${selectedSchool === school.id 
                            ? 'text-[#66388C]' 
                            : 'text-gray-900'
                          }
                        `}>
                          {school.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                          <MapPin className="w-4 h-4" />
                          {school.region}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                          <Users className="w-4 h-4" />
                          {school.students} estudantes
                        </div>
                      </div>

                      {/* Hover/Selected details */}
                      <div className={`
                        overflow-hidden transition-all duration-300
                        ${selectedSchool === school.id 
                          ? 'max-h-40 opacity-100' 
                          : 'max-h-0 opacity-0'
                        }
                      `}>
                        <div className="pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-600">
                            {schoolDetails[school.id as keyof typeof schoolDetails]?.description}
                          </p>
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className={`
                        absolute bottom-4 right-4 transition-transform duration-300
                        ${selectedSchool === school.id 
                          ? 'rotate-90 text-[#66388C]' 
                          : 'text-gray-300'
                        }
                      `}>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Painel de detalhes */}
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <div className="bg-gradient-to-br from-[#66388C] to-[#8B4FB3] rounded-2xl p-8 text-white shadow-xl">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                      <Target className="w-4 h-4" />
                      <span className="text-sm font-semibold">Foco da Atuação</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {selectedSchool 
                        ? schools.find(s => s.id === selectedSchool)?.name
                        : 'Nossa Atuação'
                      }
                    </h3>
                    <p className="text-white/80">
                      {selectedSchool 
                        ? schoolDetails[selectedSchool as keyof typeof schoolDetails]?.description
                        : 'Clique em uma escola para ver mais detalhes sobre nosso trabalho e impactos específicos.'
                      }
                    </p>
                  </div>

                  {selectedSchool && (
                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-xl p-4">
                        <div className="text-sm font-semibold mb-2">Foco Principal</div>
                        <div className="text-lg font-bold">
                          {schoolDetails[selectedSchool as keyof typeof schoolDetails]?.focus}
                        </div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <div className="text-sm font-semibold mb-2">Estudantes Atendidos</div>
                        <div className="text-2xl font-bold">
                          {schools.find(s => s.id === selectedSchool)?.students}
                        </div>
                      </div>
                    </div>
                  )}

                  {!selectedSchool && (
                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-xl p-4">
                        <div className="text-sm font-semibold mb-2">Metodologia</div>
                        <p className="text-sm text-white/80">
                          Trabalhamos com intervenções baseadas em evidências científicas, 
                          abordando saúde mental de forma integrada ao currículo escolar.
                        </p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4">
                        <div className="text-sm font-semibold mb-2">Próximos Passos</div>
                        <p className="text-sm text-white/80">
                          Expansão para mais 5 escolas em 2024, com foco em regiões 
                          de maior vulnerabilidade social.
                        </p>
                      </div>
                    </div>
                  )}

                  <button className="
                    w-full mt-6 bg-white text-[#66388C] font-bold py-3 px-6 rounded-xl
                    hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98]
                    transition-all duration-300 flex items-center justify-center gap-2
                  ">
                    <span>Saiba mais sobre nosso trabalho</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mapa visual */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Expansão pelo <span className="text-[#66388C]">Distrito Federal</span>
              </h3>
              <p className="text-gray-600 mb-6">
                Nosso programa já alcança múltiplas regiões administrativas do DF, 
                com planos de expansão para atender todas as escolas públicas da região.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#66388C]" />
                  <span className="text-gray-700">Regiões Atendidas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FAB900]" />
                  <span className="text-gray-700">Expansão 2024</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <span className="text-gray-700">Em Planejamento</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                {/* Mapa simplificado do DF */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 border-2 border-gray-200">
                  <div className="grid grid-cols-3 gap-4">
                    {['Planaltina', 'Brasília', 'Taguatinga', 'Ceilândia', 'Samambaia', 'Gama'].map((region, i) => (
                      <div key={region} className={`
                        p-4 rounded-lg text-center font-semibold transition-all duration-300
                        ${i < 2 
                          ? 'bg-gradient-to-r from-[#66388C]/10 to-[#66388C]/20 text-[#66388C] border border-[#66388C]/20' 
                          : i < 4 
                            ? 'bg-gradient-to-r from-[#FAB900]/10 to-[#FAB900]/20 text-[#FAB900] border border-[#FAB900]/20' 
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }
                        hover:scale-105 hover:shadow-md cursor-pointer
                      `}>
                        {region}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-[#FAB900] text-white px-4 py-2 rounded-full font-bold text-sm">
                  Em Expansão
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6">
            <div className="text-sm font-semibold text-[#66388C] bg-[#66388C]/10 px-6 py-3 rounded-full">
              Faça parte desta transformação
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              Sua escola pode ser a próxima!
            </h3>
            <p className="text-gray-600 max-w-2xl">
              Entre em contato para levar nosso programa de saúde mental e 
              desenvolvimento socioemocional para sua instituição.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="
                bg-gradient-to-r from-[#66388C] to-[#8B4FB3] text-white font-bold py-3 px-8 rounded-xl
                hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
                transition-all duration-300 flex items-center gap-2
              ">
                <span>Quero na minha escola</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="
                bg-white text-[#66388C] font-bold py-3 px-8 rounded-xl border-2 border-[#66388C]
                hover:bg-[#66388C]/5 hover:scale-[1.02] active:scale-[0.98]
                transition-all duration-300
              ">
                Ver Depoimentos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}