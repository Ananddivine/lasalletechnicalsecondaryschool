/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // <-- enable dark mode
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        barWave: {
          "0%, 100%": { transform: "scaleY(0.5)" },
          "50%": { transform: "scaleY(1.2)" },
        },
        
        scaleUp: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleBounce: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },  
          '100%': { transform: 'scale(1)' },  
        },
      },
      animation: {
        scaleUp: 'scaleUp 0.5s ease-out',
        scaleBounce: 'scaleBounce 0.5s ease-in-out',
        'gradient-x': 'gradient-x 6s ease infinite',
          barWave: "barWave 1.5s ease-in-out infinite",
      },
    },
  },
plugins: [require('tailwind-scrollbar')],
};
