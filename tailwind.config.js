/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./Container/**/*.{js,ts,jsx,tsx}"
  ],
  mode : "jit",
  theme: {
    extend: {
      colors : {
        primary : "#edf2f8",
        secondary : "#313bac",
        blackColor : "#030303",
        lightGray : "#e4e4e4",
        grayColor : "6b7688",
        brownColor:"#46364a",
        whiteColor : "#ffffff"
      },
    },
    screens :{
      xs : "480px",
      ss : "620px",
      sm : "768px",
      md : "1060px",
      lg : "1200px",
      xl : "2000px"
    },
  },
  plugins: [],
}
