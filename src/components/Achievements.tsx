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
        <section id="Conquistas" className="container mx-auto px-4 mb-20 md:mb-28">
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
                        index={index}
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

function StatCard({ icon: Icon, number, label, index }: {
    icon: any,
    number: string,
    label: string,
    index: number
}) {
    const isYellow = index % 2 === 0;

    const bgColor = isYellow ? 'bg-[#FAB900]' : 'bg-[#66388C]';
    const glowColor = isYellow ? 'hover:shadow-[#FAB900]/40' : 'hover:shadow-[#66388C]/40';

    return (
        <div className={`
      ${bgColor} rounded-2xl p-6 text-center border-2 border-white/10
      shadow-lg ${glowColor} hover:shadow-2xl
      transition-all duration-500 hover:scale-[1.03]
      group cursor-pointer relative overflow-hidden
    `}>
            {/* Efeito de brilho no hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 transition-all duration-300 group-hover:scale-105">
                    {number}
                </div>
                <div className="text-sm md:text-base font-medium text-white/90">
                    {label}
                </div>
            </div>
        </div>
    )
}