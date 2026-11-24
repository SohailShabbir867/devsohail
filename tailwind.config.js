/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#08080a',
          100: '#111114',
          200: '#1a1a1f',
          300: '#242429',
        },
        accent: {
          DEFAULT: '#FF6600',
          dark:    '#E65100',
          light:   '#FF8533',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow':   'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':    'spin 8s linear infinite',
        'scroll-dot':   'scrollDot 2s ease-in-out infinite',
        'glow-pulse':   'glowPulse 4s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
      },
      keyframes: {
        scrollDot: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%':      { transform: 'translateY(8px)', opacity: '0.4' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
