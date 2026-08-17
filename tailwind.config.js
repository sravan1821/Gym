/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gym: {
          dark: '#08080a',
          card: '#111116',
          cardBorder: '#22222b',
          crimson: '#ff1e42',
          neon: '#ff2d55',
          redGlow: '#ff003c',
          amber: '#f59e0b',
          muted: '#8e8e9f',
        }
      },
      fontFamily: {
        sans: ['"Outfit"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Teko"', '"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 25px -5px rgba(255, 30, 66, 0.5)',
        'glow-red-lg': '0 0 45px -5px rgba(255, 30, 66, 0.65)',
        'glow-subtle': '0 0 15px 0px rgba(255, 45, 85, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
