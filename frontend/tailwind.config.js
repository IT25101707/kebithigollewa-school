/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0B1220', soft: '#111A2E', line: '#1E2A44' },
        maroon: { DEFAULT: '#7A1F2B', deep: '#5C1620', bright: '#A63446' },
        gold: { DEFAULT: '#D4A537', soft: '#E8C877', dim: '#9C7A24' },
        ivory: { DEFAULT: '#F7F3EA', soft: '#EFE9DB' }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif']
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'float': 'float 7s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
        'kenburns': 'kenburns 14s ease-in-out infinite alternate'
      },
      keyframes: {
        ticker: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-16px)' } },
        kenburns: { '0%': { transform: 'scale(1) translate(0,0)' }, '100%': { transform: 'scale(1.12) translate(1.5%, -1.5%)' } }
      }
    }
  },
  plugins: []
}
