/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors:{
        'back-dark':'#27374D',
        'back-low-dark':'#526D82',
        'back-text-dark':'#DDE6ED',
        'back-text-low-dark':'#9DB2BF',
        'back-light':'#F4F4F2',
        'back-low-light':'#E8E8E8',
        'back-text-light':'#495464',
        'back-text-low-light':'#BBBFCA'
      },
    },
  },
  plugins: [],
}

