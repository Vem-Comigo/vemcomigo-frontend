import { useEffect } from "react";
import { createChat } from "@n8n/chat";

export function N8NChat() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    /* ===== ESTILOS GERAIS DO CHAT ===== */
    .chat-widget {
      border-radius: 24px !important;
      overflow: hidden !important;
      box-shadow: 
        0 20px 60px rgba(102, 56, 140, 0.25),
        0 0 0 2px rgba(102, 56, 140, 0.15),
        0 10px 30px rgba(250, 185, 0, 0.15) !important;
      border: 2px solid rgba(102, 56, 140, 0.2) !important;
      background: linear-gradient(145deg, #ffffff 0%, #f8f7ff 100%) !important;
      backdrop-filter: blur(20px) !important;
      font-family: 'Segoe UI', 'Inter', -apple-system, sans-serif !important;
    }

    /* ===== JANELA DO CHAT ===== */
    .chat-window {
      border: none !important;
      border-radius: 24px !important;
      overflow: hidden !important;
      width: 720px !important;
      height: 600px !important;
      max-height: 80vh !important;
      position: fixed !important;
      bottom: 100px !important;
      right: 30px !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      animation: chatSlideIn 0.5s ease-out !important;
    }

    @keyframes chatSlideIn {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* ===== CABEÇALHO ===== */
    .chat-header {
      background: linear-gradient(135deg, #66388C 0%, #7A45A3 45%, #8B4FB3 100%) !important;
      color: #ffffff !important;
      border-radius: 24px 24px 0 0 !important;
      font-weight: 700 !important;
      font-size: 1.25rem !important;
      text-align: center !important;
      padding: 24px 20px !important;
      border-bottom: 2px solid rgba(255, 255, 255, 0.2) !important;
      position: relative !important;
      overflow: hidden !important;
    }

    .chat-header::before {
      content: '' !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 3px !important;
      background: linear-gradient(90deg, #FAB900, #FFD700, #FAB900) !important;
      animation: shimmerHeader 3s infinite linear !important;
    }

    @keyframes shimmerHeader {
      0% {
        background-position: -200% center;
      }
      100% {
        background-position: 200% center;
      }
    }

    .chat-header h3 {
      font-size: 1.4rem !important;
      font-weight: 800 !important;
      letter-spacing: -0.3px !important;
      margin-bottom: 6px !important;
      background: linear-gradient(135deg, #fff 0%, #FFEC80 100%) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
    }

    .chat-header p {
      font-size: 0.9rem !important;
      opacity: 0.95 !important;
      font-weight: 400 !important;
      color: rgba(255, 255, 255, 0.9) !important;
      margin: 0 !important;
    }

    /* ===== ÁREA DE MENSAGENS ===== */
    .chat-messages {
      background: linear-gradient(rgba(248, 247, 255, 0.8), rgba(248, 247, 255, 0.8)),
                  url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2366388C' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") !important;
      padding: 20px !important;
      height: calc(100% - 180px) !important;
      overflow-y: auto !important;
    }

    /* ===== MENSAGENS DO BOT ===== */
    .chat-message-from-bot {
      background: linear-gradient(135deg, rgba(102, 56, 140, 0.95) 0%, rgba(122, 69, 163, 0.95) 100%) !important;
      color: #ffffff !important;
      border-radius: 20px 20px 20px 8px !important;
      padding: 16px 20px !important;
      margin: 8px 0 !important;
      max-width: 85% !important;
      border: 2px solid rgba(255, 255, 255, 0.15) !important;
      box-shadow: 
        0 4px 16px rgba(102, 56, 140, 0.25),
        0 1px 3px rgba(0, 0, 0, 0.1) !important;
      backdrop-filter: blur(10px) !important;
      position: relative !important;
      animation: messageSlideIn 0.4s ease-out !important;
    }

    .chat-message-from-bot strong {
      color: #FFEC80 !important;
    }

    /* ===== MENSAGENS DO USUÁRIO ===== */
    .chat-message-from-user {
      background: linear-gradient(135deg, #FAB900 0%, #FFD700 100%) !important;
      color: #333333 !important;
      border-radius: 20px 20px 8px 20px !important;
      padding: 16px 20px !important;
      margin: 8px 0 8px auto !important;
      max-width: 85% !important;
      border: 2px solid rgba(102, 56, 140, 0.2) !important;
      box-shadow: 
        0 4px 16px rgba(250, 185, 0, 0.2),
        0 1px 3px rgba(0, 0, 0, 0.1) !important;
      backdrop-filter: blur(10px) !important;
      position: relative !important;
      animation: messageSlideIn 0.4s ease-out !important;
    }

    @keyframes messageSlideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* ===== INDICADOR DE DIGITAÇÃO ===== */
    .chat-message-typing-body {
      color: #ffffff !important;
      background: rgba(102, 56, 140, 0.8) !important;
      border-radius: 20px 20px 20px 8px !important;
      padding: 16px 20px !important;
      margin: 8px 0 !important;
      max-width: 120px !important;
    }

    .chat-typing-indicator {
      display: flex !important;
      gap: 6px !important;
    }

    .chat-typing-indicator span {
      width: 8px !important;
      height: 8px !important;
      background: #FFEC80 !important;
      border-radius: 50% !important;
      animation: typing 1.4s infinite ease-in-out !important;
    }

    .chat-typing-indicator span:nth-child(1) { animation-delay: -0.32s !important; }
    .chat-typing-indicator span:nth-child(2) { animation-delay: -0.16s !important; }

    @keyframes typing {
      0%, 80%, 100% {
        transform: translateY(0);
        opacity: 0.5;
      }
      40% {
        transform: translateY(-8px);
        opacity: 1;
      }
    }

    /* ===== CAMPO DE ENTRADA ===== */
    .chat-input {
      background: rgba(255, 255, 255, 0.95) !important;
      border: 2px solid rgba(102, 56, 140, 0.2) !important;
      border-radius: 16px !important;
      padding: 16px 20px !important;
      font-size: 1rem !important;
      color: #333333 !important;
      transition: all 0.3s ease !important;
      box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.05),
        inset 0 1px 2px rgba(0, 0, 0, 0.05) !important;
    }

    .chat-input:focus {
      outline: none !important;
      border-color: #66388C !important;
      box-shadow: 
        0 4px 20px rgba(102, 56, 140, 0.15),
        0 0 0 3px rgba(102, 56, 140, 0.1) !important;
    }

    .chat-input::placeholder {
      color: #999999 !important;
      font-weight: 400 !important;
    }

    /* ===== BOTÃO DE ENVIAR ===== */
    .chat-send-button {
      background: linear-gradient(135deg, #66388C 0%, #7A45A3 100%) !important;
      color: #ffffff !important;
      border: none !important;
      border-radius: 16px !important;
      padding: 0 24px !important;
      font-weight: 600 !important;
      font-size: 1rem !important;
      cursor: pointer !important;
      transition: all 0.3s ease !important;
      box-shadow: 
        0 4px 16px rgba(102, 56, 140, 0.3),
        0 1px 3px rgba(0, 0, 0, 0.1) !important;
    }

    .chat-send-button:hover:not(:disabled) {
      background: linear-gradient(135deg, #7A45A3 0%, #8B4FB3 100%) !important;
      transform: translateY(-2px) !important;
      box-shadow: 
        0 6px 24px rgba(102, 56, 140, 0.4),
        0 2px 6px rgba(0, 0, 0, 0.15) !important;
    }

    .chat-send-button:disabled {
      opacity: 0.6 !important;
      cursor: not-allowed !important;
    }

    /* ===== BOTÃO DE TOGGLE (ABRIR/FECHAR) ===== */
    .chat-window-toggle {
      background: linear-gradient(135deg, #66388C 0%, #7A45A3 100%) !important;
      border: none !important;
      border-radius: 50% !important;
      width: 64px !important;
      height: 64px !important;
      position: fixed !important;
      bottom: 30px !important;
      right: 30px !important;
      cursor: pointer !important;
      box-shadow: 
        0 10px 40px rgba(102, 56, 140, 0.4),
        0 0 0 4px rgba(250, 185, 0, 0.6),
        0 10px 40px rgba(250, 185, 0, 0.3) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      z-index: 1000 !important;
      animation: 
        togglePulse 3s infinite ease-in-out,
        toggleFloat 8s infinite ease-in-out !important;
    }

    @keyframes togglePulse {
      0%, 100% {
        box-shadow: 
          0 10px 40px rgba(102, 56, 140, 0.4),
          0 0 0 4px rgba(250, 185, 0, 0.6),
          0 10px 40px rgba(250, 185, 0, 0.3);
      }
      50% {
        box-shadow: 
          0 15px 50px rgba(102, 56, 140, 0.6),
          0 0 0 6px rgba(250, 185, 0, 0.9),
          0 15px 50px rgba(250, 185, 0, 0.5);
      }
    }

    @keyframes toggleFloat {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      25% {
        transform: translateY(-10px) rotate(3deg);
      }
      75% {
        transform: translateY(-5px) rotate(-2deg);
      }
    }

    .chat-window-toggle:hover {
      background: linear-gradient(135deg, #7A45A3 0%, #8B4FB3 100%) !important;
      transform: scale(1.1) rotate(5deg) !important;
      box-shadow: 
        0 15px 50px rgba(102, 56, 140, 0.6),
        0 0 0 6px rgba(250, 185, 0, 0.9),
        0 15px 50px rgba(250, 185, 0, 0.5) !important;
    }

    /* ===== FOOTER DO CHAT ===== */
    .chat-footer {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 247, 255, 0.8) 100%) !important;
      border-top: 2px solid rgba(102, 56, 140, 0.15) !important;
      padding: 16px 20px !important;
      backdrop-filter: blur(20px) !important;
      text-align: center !important;
    }

    .chat-footer p {
      color: #66388C !important;
      font-size: 0.85rem !important;
      font-weight: 600 !important;
      margin: 0 !important;
      opacity: 0.9 !important;
    }

    /* ===== TELA DE BOAS-VINDAS ===== */
    .chat-welcome-screen {
      background: linear-gradient(145deg, #ffffff 0%, #f8f7ff 100%) !important;
      border-radius: 24px !important;
      padding: 40px 30px !important;
      text-align: center !important;
    }

    .chat-welcome-screen h2 {
      color: #66388C !important;
      font-size: 1.8rem !important;
      font-weight: 800 !important;
      margin-bottom: 16px !important;
      background: linear-gradient(135deg, #66388C 0%, #7A45A3 100%) !important;
      -webkit-background-clip: text !important;
      -webkit-text-fill-color: transparent !important;
    }

    .chat-welcome-screen p {
      color: #666666 !important;
      font-size: 1rem !important;
      line-height: 1.5 !important;
      margin-bottom: 32px !important;
    }

    .chat-get-started-button {
      background: linear-gradient(135deg, #66388C 0%, #7A45A3 100%) !important;
      color: #ffffff !important;
      border: none !important;
      border-radius: 16px !important;
      padding: 16px 32px !important;
      font-size: 1.1rem !important;
      font-weight: 700 !important;
      cursor: pointer !important;
      transition: all 0.3s ease !important;
      box-shadow: 
        0 4px 20px rgba(102, 56, 140, 0.3),
        0 1px 3px rgba(0, 0, 0, 0.1) !important;
      margin-top: 20px !important;
    }

    .chat-get-started-button:hover {
      background: linear-gradient(135deg, #7A45A3 0%, #8B4FB3 100%) !important;
      transform: translateY(-3px) !important;
      box-shadow: 
        0 8px 30px rgba(102, 56, 140, 0.4),
        0 2px 6px rgba(0, 0, 0, 0.15) !important;
    }

    /* ===== SCROLLBAR CUSTOMIZADA ===== */
    .chat-messages::-webkit-scrollbar {
      width: 10px !important;
    }

    .chat-messages::-webkit-scrollbar-track {
      background: linear-gradient(to bottom, rgba(248, 247, 255, 0.8), rgba(248, 247, 255, 0.4)) !important;
      border-radius: 10px !important;
      border: 2px solid rgba(102, 56, 140, 0.1) !important;
    }

    .chat-messages::-webkit-scrollbar-thumb {
      background: linear-gradient(to bottom, #66388C, #7A45A3, #8B4FB3) !important;
      border-radius: 10px !important;
      border: 3px solid rgba(248, 247, 255, 0.8) !important;
    }

    .chat-messages::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(to bottom, #7A45A3, #8B4FB3, #9A5CC0) !important;
    }

    /* ===== RESPONSIVIDADE ===== */
    @media (max-width: 768px) {
      .chat-window {
        width: 90vw !important;
        max-width: 380px !important;
        height: 70vh !important;
        right: 5vw !important;
        bottom: 80px !important;
      }

      .chat-window-toggle {
        width: 56px !important;
        height: 56px !important;
        bottom: 20px !important;
        right: 20px !important;
      }

      .chat-header {
        padding: 20px 16px !important;
        font-size: 1.1rem !important;
      }

      .chat-messages {
        padding: 16px !important;
      }
    }

    /* ===== ESTILOS PARA BOTÕES DE AÇÃO ===== */
    .chat-action-button {
      background: rgba(102, 56, 140, 0.1) !important;
      color: #66388C !important;
      border: 1px solid rgba(102, 56, 140, 0.2) !important;
      border-radius: 12px !important;
      padding: 10px 16px !important;
      font-size: 0.9rem !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
      margin: 4px !important;
    }

    .chat-action-button:hover {
      background: rgba(102, 56, 140, 0.15) !important;
      border-color: #66388C !important;
      transform: translateY(-2px) !important;
    }
    `;

    document.head.appendChild(style);

    createChat({
      webhookUrl: import.meta.env.VITE_N8N_PRODUCTION_WEBHOOK_URL,
      mode: "window",
      showWelcomeScreen: true,
      initialMessages: [
        "Olá! Sou o assistente virtual do **Vem Comigo**.",
        "Estou aqui para tirar dúvidas sobre **bullying, cyberbullying** ou sobre o nosso projeto. Como posso ajudar?",
      ],
      i18n: {
        en: {
          title: "Assistente Vem Comigo",
          subtitle: "Tire suas dúvidas aqui!",
          footer: "Projeto Vem Comigo - Transformando vidas",
          getStarted: "Iniciar Conversa",
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