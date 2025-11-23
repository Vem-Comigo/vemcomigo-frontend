// components/sections/Achievements.tsx
import { Users, School, Calendar, Heart } from "lucide-react"

export function Achievements() {
  const stats = [
    { icon: Users, number: "2.500+", label: "Alunos Atendidos" },
    { icon: School, number: "15", label: "Escolas Participantes" },
    { icon: Calendar, number: "120+", label: "Eventos Realizados" },
    { icon: Heart, number: "95%", label: "Satisfação dos Participantes" }
  ]

  return (
    <section className="container mx-auto px-4 mb-20 md:mb-28">
      <SectionHeader
        title="Nossas Conquistas"
        description="Resultados que mostram o impacto positivo do nosso trabalho na comunidade escolar"
      />
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            number={stat.number}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  )
}

// Subcomponente: Cabeçalho da Seção
function SectionHeader({ title, description }: { title: string, description: string }) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {title.split(' ')[0]}{' '}
        <span className="bg-gradient-to-r from-[#66388C] to-[#FAB900] bg-clip-text text-transparent">
          {title.split(' ')[1]}
        </span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
    </div>
  )
}

// Subcomponente: Cartão de Estatística
function StatCard({ icon: Icon, number, label }: { 
  icon: any, 
  number: string, 
  label: string 
}) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-[#66388C]/10 rounded-lg mb-4">
        <Icon className="w-6 h-6 text-[#66388C]" />
      </div>
      <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        {number}
      </div>
      <div className="text-sm md:text-base text-gray-600 font-medium">
        {label}
      </div>
    </div>
  )
}