import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { AboutProject } from "./components/aboutproject";
import { Achievements } from "./components/Achievements";
import { Locations } from "./components/Locations";
import { Partnerships } from "./components/Partnerships";
import { ActionsProjects } from "./components/ActionsProjects";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { useEffect } from "react";
import "@n8n/chat/style.css";
import { createChat } from "@n8n/chat";

function App() {
  useEffect(() => {
    const existingChat = document.querySelector('.n8n-chat-widget');
    if (existingChat) return;

    createChat({
      webhookUrl: import.meta.env.VITE_N8N_PRODUCTION_WEBHOOK_URL,
      mode: 'window', 
      showWelcomeScreen: true,
      initialMessages: [
        'Olá! Sou o assistente virtual do Vem Comigo. 🤗💜',
        'Estou aqui para tirar dúvidas sobre bullying, cyberbullying ou sobre o nosso projeto. Como posso ajudar?'
      ],

      i18n: {
        en: {
          title: 'Assistente Virtual Vem Comigo',
          subtitle: '',
          footer: '',
          getStarted: 'Começar conversa',
          inputPlaceholder: 'Digite sua mensagem...',
          closeButtonTooltip: 'Fechar chat',
        },
      },

      style: {
        width: 400,
        height: 600,
        position: 'right',
        backgroundColor: '#2865f1',
        fontFamily: 'sans-serif',
      },
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <AboutProject/>
      <Achievements/>
      <Locations/>
      <Partnerships/>
      <ActionsProjects/>
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;