/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Roboto', 'system-ui', 'sans-serif']
      },
      // Palette: #F8F6F4  #E3F4F4  #D2E9E9  #C4DFDF  #E3F2FD
      // Token names are kept from the original project so every page recolours automatically.
      colors: {
        lav: { 50: '#F8F6F4', 100: '#E3F4F4', 200: '#D2E9E9', 300: '#C4DFDF' },
        mist: { DEFAULT: '#E3F2FD', 200: '#C9E4F8' },
        // Deeper teals derived from the palette, used for buttons/links/text so contrast stays accessible
        vio: { 400: '#6FB1B5', 500: '#3F8A90', 600: '#2F7378', 700: '#25595E', 900: '#12303A' },
        ink: { 900: '#0E2730', 800: '#153540', 700: '#2B4C57' }
      },
      boxShadow: { soft: '0 8px 30px -12px rgba(37,89,94,.28)' },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } }
      },
      animation: { float: 'float 5s ease-in-out infinite' }
    }
  },
  plugins: []
}
