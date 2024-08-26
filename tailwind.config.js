const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,scss}",
    "./components/**/*.{js,ts,jsx,tsx,scss}",
    "./Container/**/*.{js,ts,jsx,tsx,scss}"
  ],
  mode : "jit",
  theme: {
    extend: {
      colors : {
        primary : "#edf2f8",
        secondary : "#313bac",
        blackColor : "#030303",
        lightGray : "#e4e4e4",
        grayColor : "#6b7688",
        brownColor:"#46364a",
        whiteColor : "#ffffff"
      },
      fontFamily : {
        DM : "DM Sans, sans-serif"
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      }
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
  plugins: [addVariablesForColors],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}