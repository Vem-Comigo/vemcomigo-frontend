"use client"

import {
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Shield,
  Users,
  BookOpen,
} from "lucide-react"

export function Footer() {
  const quickLinks = [
    { name: "Início", href: "#Início" },
    { name: "Sobre o Vem Comigo", href: "#Sobre" },
    { name: "Onde Atuamos", href: "#Locais"},
    { name: "Nossos Parceiros", href: "#Parceiros"},
    { name: "Ações & Projetos", href: "#Ações" },
    { name: "Entre em Contato", href: "#Contato" },
  ]

  const services = [
    { name: "Palestras Educativas", icon: BookOpen },
    { name: "Oficinas Interativas", icon: Users },
    { name: "Rodas de Conversa", icon: Heart },
    { name: "Apoio Psicológico", icon: Shield },
  ]

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/projeto.vemcomigo_2019/",
      color: "hover:text-pink-500",
      target: "_blank",
    },
  ]

  const contactInfo = [
    { 
      icon: Mail, 
      text: "projeto.vemcomigooficial@gmail.com", 
      href: "mailto:projeto.vemcomigooficial@gmail.com" 
    },
    { 
      icon: Phone, 
      text: "61 99254-0195 - Prof. Especialista Márcia Delgado", 
      href: "https://wa.me/5561992540195" 
    },
    { 
      icon: Phone, 
      text: "61 99635-9100 - Prof. Doutoranda Rita de Cássia Rezende", 
      href: "https://wa.me/5561996359100" 
    },
    { 
      icon: MapPin, 
      text: "Horário de Atendimento: 08h às 18h", 
      href: "#" 
    }
  ]

  const team = [
    {
      name: "Lucas Fonseca",
      img: "https://avatars.githubusercontent.com/u/126473218?v=4",
      href: "https://www.linkedin.com/in/lucas-andrade-5511022b3/"
    },
    {
      name: "Pedro Delgado",
      img: "https://avatars.githubusercontent.com/u/126472951?v=4",
      href: "https://www.linkedin.com/in/pedrodelgo/"
    },
    {
      name: "Gabriel Lima",
      img: "https://avatars.githubusercontent.com/u/126473024?v=4",
      href: "https://www.linkedin.com/in/gabriel-de-medeiros-lima/"
    },
    {
      name: "Felipe Queiroz",
      img: "https://avatars.githubusercontent.com/u/95952269?v=4",
      href: "https://www.linkedin.com/in/felipe-rodrigues-queiroz-564377171/"
    }
  ]

  return (
    <footer className="bg-[#0d0d0f] text-white border-t border-white/5">
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-72 h-72 bg-[#66388C]/20 blur-3xl rounded-full absolute -top-10 -left-10" />
          <div className="w-72 h-72 bg-[#FAB900]/20 blur-3xl rounded-full absolute bottom-0 right-0" />
        </div>

        <div className="relative container mx-auto px-6 max-w-6xl py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#66388C] to-[#8B5DAF] rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Vem Comigo
              </span>
            </div>

            <p className="text-gray-300/80 leading-relaxed mb-6 text-sm">
              Criamos ambientes escolares mais seguros, acolhedores e positivos.  
              Educação, apoio e transformação social com impacto real.
            </p>

            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, target, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target={target}
                  rel="noopener noreferrer"
                  className={`w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-white/10 ${color} shadow-md hover:shadow-xl`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="mt-6 bg-red-900/30 border border-red-800 rounded-lg p-4 shadow-lg">
              <p className="text-sm text-red-200">
                <strong>Emergência:</strong> risco imediato? Ligue{" "}
                <a href="tel:188" className="underline font-semibold">
                  CVV - 188
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 tracking-wide">
              Links Rápidos
              <div className="w-12 h-1 bg-[#66388C] rounded-full mt-1" />
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="flex items-center gap-2 text-gray-300 hover:text-white transition group text-sm">
                    <ArrowRight className="w-4 h-4 text-[#66388C] group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 tracking-wide">
              Nossos Serviços
              <div className="w-12 h-1 bg-[#FAB900] rounded-full mt-1" />
            </h3>

            <ul className="space-y-4">
              {services.map(({ name, icon: Icon }, i) => (
                <li key={i}>
                  <div className="flex items-center gap-3 text-gray-300 hover:text-white transition text-sm group">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-[#FAB900]/20 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    {name}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 tracking-wide">
              Contato & Newsletter
              <div className="w-12 h-1 bg-[#66388C] rounded-full mt-1" />
            </h3>

            <p className="text-gray-300/80 text-sm mb-4">
              Receba novidades sobre projetos, campanhas e ações sociais.
            </p>

            <div className="mt-6 space-y-3">
              {contactInfo.map(({ icon: Icon, text, href }, i) => (
                <a 
                  key={i} 
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition"
                >
                  <Icon className="w-4 h-4 text-[#FAB900]" />
                  <span className="hover:underline">{text}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-6 mb-10">
          <h3 className="text-center text-xl font-semibold mb-12 tracking-wide">
            Equipe de Desenvolvimento
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center">
            {team.map((person, i) => (
              <a
                key={i}
                href={person.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-20 h-20 rounded-full border border-white/10 shadow-lg group-hover:scale-110 transition-all duration-300"
                />
                <p className="mt-2 text-sm text-gray-300 group-hover:text-white transition">
                  {person.name}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/20">
          <div className="container mx-auto px-6 max-w-6xl py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">&copy; Vem Comigo. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}