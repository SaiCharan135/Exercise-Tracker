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
        brand: {
          dark: '#0D1117',
          surface: '#161B22',
          border: '#30363D',
          cyan: '#00F0FF',
          volt: '#CCFF00',
          blue: '#0066FF',
          accent: '#00F0FF',
          card: '#161B22',
          muted: '#8B949E'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
