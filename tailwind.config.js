/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        natural: {
          100: '#f7f3eb',
          200: '#e8dcc9',
          300: '#dbc5a7',
          400: '#b89f7a',
          500: '#96785c',
          600: '#7a5c3d',
          700: '#5e442e',
          800: '#422d1f',
          900: '#2c1810',
        },
        earth: {
          100: '#f4f1de',
          200: '#e9e5cd',
          300: '#dfd0a7',
          400: '#d4bc82',
          500: '#c9a85d',
          600: '#be9438',
          700: '#8c6d29',
          800: '#5a461a',
          900: '#28200b',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'wood-pattern': "url('https://images.unsplash.com/photo-1541140134513-85a161dc4a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
      }
    },
  },
  plugins: [],
};