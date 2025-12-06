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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6 shadow-inner">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mensagem enviada com sucesso!
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Obrigado pelo seu contato. Retornaremos em até 24 horas.
          </p>

          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-[#66388C] text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-[#7A45A3] transition-all"
          >
            Enviar nova mensagem
          </button>
        </div>
      </section>
    )
  }

  return (
    <section id="Contato" className="bg-gray-50 py-20 relative">
      {/* Background circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container relative mx-auto px-4 max-w-7xl">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Entre em <span className="text-[#66388C]">Contato</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mt-4">
            Estamos prontos para ouvir você e construir um ambiente escolar mais seguro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* CONTACT SIDEBAR */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Informações de Contato
            </h3>

            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="bg-[#66388C] p-3 rounded-xl shadow-md transition-all group-hover:scale-110">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">{item.title}</h4>
                      <p className="font-medium text-gray-700">{item.content}</p>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 p-4 bg-yellow-50 border border-yellow-300 rounded-xl flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-700 mt-1" />
              <p className="text-sm text-yellow-700 leading-relaxed">
                Em situação de risco, ligue imediatamente para  
                <a href="tel:188" className="font-bold underline ml-1">CVV – 188</a>.
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 border border-gray-100 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Envie sua Mensagem</h3>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME + EMAIL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* NAME */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full px-4 py-3 border rounded-xl bg-gray-50 focus:bg-white transition-all
                       focus:ring-2 focus:ring-[#66388C] outline-none
                       ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-3 text-gray-500 peer-placeholder-shown:text-gray-400
                      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                      peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-[#66388C]
                      transition-all bg-white px-1 rounded"
                  >
                    Nome Completo *
                  </label>

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full px-4 py-3 border rounded-xl bg-gray-50 focus:bg-white transition-all
                       focus:ring-2 focus:ring-[#66388C] outline-none
                       ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3 text-gray-500 peer-placeholder-shown:text-gray-400
                      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                      peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-[#66388C]
                      transition-all bg-white px-1 rounded"
                  >
                    E-mail *
                  </label>

                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* PHONE + SUBJECT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* PHONE */}
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder=" "
                    className={`peer w-full px-4 py-3 border rounded-xl bg-gray-50 focus:bg-white transition-all
                       focus:ring-2 focus:ring-[#66388C] outline-none
                       ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-4 top-3 text-gray-500 peer-placeholder-shown:text-gray-400
                      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                      peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-[#66388C]
                      transition-all bg-white px-1 rounded"
                  >
                    Telefone
                  </label>

                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* SUBJECT */}
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl bg-gray-50 focus:bg-white transition-all
                      focus:ring-2 focus:ring-[#66388C] outline-none
                      ${errors.subject ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Selecione um assunto</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>

                  <label
                    htmlFor="subject"
                    className="absolute left-4 top-[-10px] text-sm text-[#66388C] bg-white px-1 rounded"
                  >
                    Assunto *
                  </label>

                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.subject}
                    </p>
                  )}
                </div>
              </div>

              {/* MESSAGE */}
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder=" "
                  className={`peer w-full px-4 py-3 border rounded-xl bg-gray-50 focus:bg-white transition-all 
                    focus:ring-2 focus:ring-[#66388C] outline-none resize-none
                    ${errors.message ? "border-red-500" : "border-gray-300"}`}
                />

                <label
                  htmlFor="message"
                  className="absolute left-4 top-3 text-gray-500 peer-placeholder-shown:text-gray-400
                    peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
                    peer-focus:top-[-10px] peer-focus:text-sm peer-focus:text-[#66388C]
                    transition-all bg-white px-1 rounded"
                >
                  Mensagem *
                </label>

                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> {errors.message}
                  </p>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-[#66388C] 
                  hover:bg-[#7A45A3] transition-all duration-300 shadow-lg
                  flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar Mensagem
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500">* Campos obrigatórios</p>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}
