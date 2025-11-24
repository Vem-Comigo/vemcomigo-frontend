// components/sections/Footer.tsx
"use client"

import { useState } from "react"
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Heart,
  Shield,
  Users,
  BookOpen,
  ChevronUp
} from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubscribed(true)
    setEmail("")
    setIsSubmitting(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Sobre Nós", href: "#sobre" },
    { name: "Ações & Projetos", href: "#projetos" },
    { name: "Estatísticas", href: "#estatisticas" },
    { name: "Depoimentos", href: "#depoimentos" },
    { name: "Contato", href: "#contato" }
  ]

  const services = [
    { name: "Palestras Educativas", icon: BookOpen },
    { name: "Oficinas Interativas", icon: Users },
    { name: "Rodas de Conversa", icon: Heart },
    { name: "Apoio Psicológico", icon: Shield }
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-600" }
  ]

  const contactInfo = [
    { icon: Mail, text: "contato@antibullying.org", href: "mailto:contato@antibullying.org" },
    { icon: Phone, text: "(11) 9999-9999", href: "tel:+551199999999" },
    { icon: MapPin, text: "São Paulo, SP - Brasil", href: "#" }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#66388C] rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                AntiBullying
              </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base">
              Trabalhamos incansavelmente para criar ambientes escolares mais seguros, 
              inclusivos e acolhedores para todos os estudantes.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-gray-600 ${social.color} group`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                )
              })}
            </div>

            {/* Emergency Notice */}
            <div className="bg-red-900/30 border border-red-800 rounded-lg p-4">
              <p className="text-sm text-red-200">
                <strong>Emergência:</strong> Em caso de risco imediato, ligue para o{" "}
                <a href="tel:188" className="underline font-semibold">CVV - 188</a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Links Rápidos
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#66388C] rounded-full" />
            </h3>
            
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 group text-sm sm:text-base"
                  >
                    <ArrowRight className="w-4 h-4 text-[#66388C] group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Nossos Serviços
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#FAB900] rounded-full" />
            </h3>
            
            <ul className="space-y-3">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <li key={index}>
                    <a
                      href="#"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group text-sm sm:text-base"
                    >
                      <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-[#FAB900] transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      {service.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Newsletter
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#66388C] rounded-full" />
            </h3>

            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Receba atualizações sobre nossos projetos e campanhas.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#66388C] focus:border-transparent transition-all duration-300 text-white placeholder-gray-400 text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#66388C] hover:bg-[#7A45A3] text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Inscrevendo...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Inscrever
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-green-900/30 border border-green-800 rounded-lg p-4 text-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <p className="text-green-200 text-sm font-semibold">
                  Inscrito com sucesso!
                </p>
              </div>
            )}

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon
                return (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group text-sm"
                  >
                    <Icon className="w-4 h-4 text-[#FAB900] flex-shrink-0" />
                    <span className="group-hover:underline">{contact.text}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Partners/Supporters Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h4 className="text-center text-gray-400 text-sm font-semibold mb-6">
            Apoiado por:
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["Escolas Parceiras", "MEC", "UNICEF", "ONGs Locais"].map((partner, index) => (
              <div
                key={index}
                className="text-gray-400 text-xs font-medium px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} AntiBullying. Todos os direitos reservados.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">
                  Política de Privacidade
                </a>
                <a href="#" className="hover:text-white transition-colors duration-300 hover:underline">
                  Termos de Uso
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>para um mundo melhor</span>
            </div>

            {/* Scroll to Top Button */}
            <button
              onClick={scrollToTop}
              className="bg-[#66388C] hover:bg-[#7A45A3] text-white p-2 rounded-lg transition-all duration-300 hover:scale-110 group"
              aria-label="Voltar ao topo"
            >
              <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}