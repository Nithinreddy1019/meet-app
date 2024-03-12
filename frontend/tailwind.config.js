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
        'lighta':'#F4F4F2',
        'lightb':'#E8E8E8',
        'textlightb':'#495464',
        'textlighta':'#BBBFCA'
      },
    },
  },
  plugins: [],
}

