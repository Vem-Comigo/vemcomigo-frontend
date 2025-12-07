// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        'flip': 'flip 0.7s ease-in-out',
        'gradient': 'gradient 3s ease infinite',
        'pulse': 'pulse 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce': 'bounce 1s infinite',
        'bounce-slow': 'bounce 3s infinite',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'bounce-delayed': 'bounce 3s infinite 1s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateX(0) scale(1)' },
        },
      },
      // Classes utilitárias customizadas
      perspective: {
        '1000': '1000px',
        '1200': '1200px',
        '2000': '2000px',
      },
      rotate: {
        'y-0': 'rotateY(0deg)',
        'y-90': 'rotateY(90deg)',
        'y-180': 'rotateY(180deg)',
        '-y-90': 'rotateY(-90deg)',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
        'visible': 'visible',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
        'flat': 'flat',
      },
      // Cores customizadas para o projeto
      colors: {
        'vem-primary': '#66388C',
        'vem-secondary': '#FAB900',
        'vem-accent': '#8B5DAF',
        'vem-light': '#FFD166',
      },
      // Gradientes customizados
      backgroundImage: {
        'vem-gradient': 'linear-gradient(to right, #66388C, #FAB900)',
        'vem-gradient-reverse': 'linear-gradient(to right, #FAB900, #66388C)',
        'vem-gradient-diagonal': 'linear-gradient(to bottom right, #66388C, #FAB900)',
        'vem-gradient-card': 'linear-gradient(to bottom right, #66388C, #8B5DAF, #FAB900)',
      },
      // Opacidade customizada
      opacity: {
        '10': '0.1',
        '20': '0.2',
        '30': '0.3',
        '40': '0.4',
        '60': '0.6',
        '70': '0.7',
        '80': '0.8',
        '90': '0.9',
      },
      // Box shadow customizada
      boxShadow: {
        'vem': '0 10px 30px rgba(102, 56, 140, 0.2)',
        'vem-lg': '0 20px 60px rgba(102, 56, 140, 0.3)',
        'vem-xl': '0 35px 60px rgba(102, 56, 140, 0.4)',
        'inner-vem': 'inset 0 2px 4px 0 rgba(102, 56, 140, 0.2)',
      },
      // Transições customizadas
      transitionDuration: {
        '700': '700ms',
        '1000': '1000ms',
        '1500': '1500ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    // Plugin para animações com delays
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Utilities para animation delays
        '.animation-delay-100': {
          'animation-delay': '100ms',
        },
        '.animation-delay-200': {
          'animation-delay': '200ms',
        },
        '.animation-delay-300': {
          'animation-delay': '300ms',
        },
        '.animation-delay-400': {
          'animation-delay': '400ms',
        },
        '.animation-delay-500': {
          'animation-delay': '500ms',
        },
        '.animation-delay-600': {
          'animation-delay': '600ms',
        },
        '.animation-delay-700': {
          'animation-delay': '700ms',
        },
        '.animation-delay-800': {
          'animation-delay': '800ms',
        },
        '.animation-delay-900': {
          'animation-delay': '900ms',
        },
        '.animation-delay-1000': {
          'animation-delay': '1000ms',
        },
        // Utilities para transform preserve-3d
        '.transform-style-preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.backface-visible': {
          'backface-visibility': 'visible',
        },
        // Scroll behavior
        '.scroll-behavior-smooth': {
          'scroll-behavior': 'smooth',
        },
        // Clip path para efeitos especiais
        '.clip-path-circle': {
          'clip-path': 'circle(50% at 50% 50%)',
        },
        '.clip-path-inset': {
          'clip-path': 'inset(0% 0% 0% 0%)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}