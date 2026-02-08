"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from "lucide-react"

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }

    if (formData.phone && !/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Telefone inválido"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Assunto é obrigatório"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mensagem deve ter pelo menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Form data:", formData)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      })
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "E-mail",
      content: "projeto.vemcomigooficial@gmail.com",
      description: "Envie-nos um e-mail"
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "(61) 992540195",
      description: "Segunda a Sexta, 8h às 18h"
    },
    {
      icon: MapPin,
      title: "Endereço",
      content: "Brasília, DF",
      description: "Atendimento em toda região"
    },
    {
      icon: Clock,
      title: "Horário de Atendimento",
      content: "Segunda a Sexta",
      description: "8h às 18h"
    }
  ]

  const subjects = [
    "Palestras Educativas",
    "Oficinas Interativas",
    "Rodas de Conversa",
    "Apoio Psicológico",
    "Parcerias",
    "Dúvidas Gerais",
    "Denúncias",
    "Outros"
  ]

  if (isSubmitted) {
    return (
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full bg-green-100 mb-6 shadow-inner">
            <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-green-600" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mensagem enviada com sucesso!
          </h2>

          <p className="text-base md:text-lg text-gray-600 mb-8">
            Obrigado pelo seu contato. Retornaremos em até 24 horas.
          </p>

          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-[#66388C] text-white px-6 md:px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-[#7A45A3] transition-all"
          >
            Enviar nova mensagem
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="Contato" className="bg-gray-50 py-12 md:py-20 relative scroll-mt-16 md:scroll-mt-20">
      {/* Background circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-purple-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-56 h-56 md:w-72 md:h-72 bg-yellow-200 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6 max-w-7xl">
        
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Entre em <span className="text-[#66388C]">Contato</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mt-3 md:mt-4 px-4">
            Estamos prontos para ouvir você e construir um ambiente escolar mais seguro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">

          {/* CONTACT SIDEBAR */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">
              Informações de Contato
            </h3>

            <div className="space-y-5 md:space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-start gap-3 md:gap-4 group">
                    <div className="bg-[#66388C] p-2.5 md:p-3 rounded-xl shadow-md transition-all group-hover:scale-110 flex-shrink-0">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 text-base md:text-lg">{item.title}</h4>
                      <p className="font-medium text-gray-700 text-sm md:text-base break-words">{item.content}</p>
                      <p className="text-gray-500 text-xs md:text-sm">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 md:mt-10 p-3 md:p-4 bg-yellow-50 border border-yellow-300 rounded-xl flex gap-2 md:gap-3">
              <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-700 mt-0.5 md:mt-1 flex-shrink-0" />
              <p className="text-xs md:text-sm text-yellow-700 leading-relaxed">
                Em situação de risco, ligue imediatamente para  
                <a href="tel:188" className="font-bold underline ml-1">CVV – 188</a>.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 backdrop-blur-sm">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Envie sua Mensagem</h3>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">

              {/* NAME + EMAIL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

                {/* NAME */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`absolute left-3 md:left-4 transition-all duration-200 pointer-events-none
                      ${formData.name 
                        ? 'top-[-10px] text-xs md:text-sm text-[#66388C] bg-white px-1' 
                        : 'top-2.5 md:top-3 text-sm md:text-base text-gray-500'
                      }`}
                  >
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2.5 md:py-3 border rounded-xl bg-gray-50 focus:bg-white transition-all text-sm md:text-base
                       focus:ring-2 focus:ring-[#66388C] outline-none
                       ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className={`absolute left-3 md:left-4 transition-all duration-200 pointer-events-none
                      ${formData.email 
                        ? 'top-[-10px] text-xs md:text-sm text-[#66388C] bg-white px-1' 
                        : 'top-2.5 md:top-3 text-sm md:text-base text-gray-500'
                      }`}
                  >
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2.5 md:py-3 border rounded-xl bg-gray-50 focus:bg-white transition-all text-sm md:text-base
                       focus:ring-2 focus:ring-[#66388C] outline-none
                       ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* PHONE + SUBJECT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">

                {/* PHONE */}
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className={`absolute left-3 md:left-4 transition-all duration-200 pointer-events-none
                      ${formData.phone 
                        ? 'top-[-10px] text-xs md:text-sm text-[#66388C] bg-white px-1' 
                        : 'top-2.5 md:top-3 text-sm md:text-base text-gray-500'
                      }`}
                  >
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2.5 md:py-3 border rounded-xl bg-gray-50 focus:bg-white transition-all text-sm md:text-base
                       focus:ring-2 focus:ring-[#66388C] outline-none
                       ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* SUBJECT */}
                <div className="relative">
                  <label
                    htmlFor="subject"
                    className="absolute left-3 md:left-4 top-[-10px] text-xs md:text-sm text-[#66388C] bg-white px-1 rounded z-10"
                  >
                    Assunto *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-3 md:px-4 py-2.5 md:py-3 border rounded-xl bg-gray-50 focus:bg-white transition-all text-sm md:text-base
                      focus:ring-2 focus:ring-[#66388C] outline-none appearance-none cursor-pointer
                      ${errors.subject ? "border-red-500" : "border-gray-300"}
                      ${!formData.subject ? "text-gray-500" : "text-gray-900"}`}
                  >
                    <option value="">Selecione um assunto</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  {errors.subject && (
                    <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" /> {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* MESSAGE */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className={`absolute left-3 md:left-4 transition-all duration-200 pointer-events-none
                    ${formData.message 
                      ? 'top-[-10px] text-xs md:text-sm text-[#66388C] bg-white px-1' 
                      : 'top-2.5 md:top-3 text-sm md:text-base text-gray-500'
                    }`}
                >
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-3 md:px-4 py-2.5 md:py-3 border rounded-xl bg-gray-50 focus:bg-white transition-all text-sm md:text-base
                    focus:ring-2 focus:ring-[#66388C] outline-none resize-none
                    ${errors.message ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" /> {errors.message}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 md:py-4 px-6 rounded-xl font-semibold text-white bg-[#66388C] text-sm md:text-base
                  hover:bg-[#7A45A3] transition-all duration-300 shadow-lg
                  flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed
                  hover:shadow-xl active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                    Enviar Mensagem
                  </>
                )}
              </button>

              <p className="text-center text-xs md:text-sm text-gray-500">* Campos obrigatórios</p>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ContactSection