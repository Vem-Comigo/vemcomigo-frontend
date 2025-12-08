import { useEffect } from "react";
import { createChat } from "@n8n/chat";

export function N8NChat() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    .chat-widget {
      border-radius: 20px !important;
    }

    .chat-window {
      border: none !important;
    }

    .chat-header {
      background: #66388C !important;
      color: #fff !important;
      border-radius: 20px 20px 0 0 !important;
      font-weight: bold !important;
      font-size: 1rem !important;
      text-align: center !important;
      padding: 15px !important;
    }

    .chat-message-from-bot {
      background: #66388C !important;
      color: #fff !important;
    }

    .chat-message-from-user {
      background: #FAB900 !important;
      color: #000 !important;
    }

    .chat-window-toggle {
      background: #542c74 !important;
    }

    .chat-window-toggle:hover {
      background: #FAB900 !important;
    }

    .chat-message-typing-body {
      color: #fff !important;
    `;

    document.head.appendChild(style);

    createChat({
      webhookUrl: import.meta.env.VITE_N8N_PRODUCTION_WEBHOOK_URL,
      mode: "window",
      showWelcomeScreen: true,
      initialMessages: [
        "Olá! Sou o assistente virtual do **Vem Comigo**. 🤗💜",
        "Estou aqui para tirar dúvidas sobre **bullying, cyberbullying** ou sobre o nosso projeto. Como posso ajudar? 🌟",
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
      style.remove();
    };
  }, []);

  return null;
}
