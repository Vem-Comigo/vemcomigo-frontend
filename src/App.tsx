import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { AboutProject } from "./components/aboutproject";
import { Achievements } from "./components/Achievements";
import { Locations } from "./components/Locations";
import { Partnerships } from "./components/Partnerships";
import { ActionsProjects } from "./components/ActionsProjects";
import { ContactSection } from "./components/ContactSection";
import "./components/ChatCard.css"; // <-- IMPORTAÇÃO CORRETA DO CSS
import { Footer } from "./components/Footer";

function App() {
  useEffect(() => {
    // INJETAR CSS DIRETAMENTE
    const style = document.createElement('style');
    style.innerHTML = `
      /* SEU CSS GIGANTE AQUI (sem alterações) */
    `;
    
    document.head.appendChild(style);
    
    createChat({
      webhookUrl: import.meta.env.VITE_N8N_PRODUCTION_WEBHOOK_URL,
      mode: "window",
      showWelcomeScreen: true,

      initialMessages: [
        "Olá! Sou o assistente virtual do **Vem Comigo**. 🤗💜",
        "Estou aqui para tirar dúvidas sobre **bullying, cyberbullying** ou sobre o nosso projeto. Como posso ajudar? 🌟"
      ],

      i18n: {
        en: {
          title: "Assistente Vem Comigo",
          subtitle: "Tire suas dúvidas aqui!",
          footer: "Projeto Vem Comigo - Transformando vidas",
          getStarted: "Iniciar Conversa ✨",
          inputPlaceholder: "Digite sua mensagem aqui...",
          closeButtonTooltip: "Fechar chat",
        },
      },

      theme: {
        primary: "#66388C",
        secondary: "#FAB900",
      },
    });

    return () => {
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AboutProject />
      <Achievements />
      <Locations />
      <Partnerships />
      <ActionsProjects />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
