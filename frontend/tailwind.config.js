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
        paper: {
          bg: '#FFFFFF',
          ink: '#000000',
          muted: '#E5E5E5',
          accent: '#E60000',
        },
        swiss: {
          red: '#E60000',
          redHover: '#CC0000',
        }
      },
      fontFamily: {
        sans: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      gridTemplateColumns: {
        'dashboard': '280px minmax(0, 1fr)',
      }
    },
  },
  plugins: [],
}
