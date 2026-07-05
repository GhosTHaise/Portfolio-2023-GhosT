const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,scss}",
    "./pages/**/*.{js,ts,jsx,tsx,scss}",
    "./components/**/*.{js,ts,jsx,tsx,scss}",
    "./Container/**/*.{js,ts,jsx,tsx,scss}",
    "./wrapper/**/*.{js,ts,jsx,tsx,scss}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        /* ── Legacy brand tokens (kept for compatibility) ── */
        primary: "#edf2f8",
        secondary: "#313bac",
        blackColor: "#030303",
        lightGray: "#e4e4e4",
        grayColor: "#6b7688",
        brownColor: "#46364a",
        whiteColor: "#ffffff",

        /* ── Semantic tokens (brand-derived) ── */
        canvas: "#edf2f8",
        surface: "#ffffff",
        ink: "#0b0d13",
        muted: "#6b7688",
        faint: "#9aa3b2",
        line: "#e4e4e4",
        plum: "#46364a",

        /* Signature indigo (#313bac) as a full scale */
        accent: {
          DEFAULT: "#313bac",
          50: "#eef0fb",
          100: "#dde0f6",
          200: "#bfc4ec",
          300: "#969ede",
          400: "#6b74cf",
          500: "#4b53c0",
          600: "#313bac",
          700: "#2a3291",
          800: "#252c76",
          900: "#20265d",
          ink: "#ffffff",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Space Grotesk", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
        DM: "DM Sans, sans-serif",
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
      },
      borderRadius: {
        bento: "1.75rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      maxWidth: {
        container: "1240px",
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.7) inset, 0 20px 40px -24px rgba(49,59,172,0.22)",
        soft: "0 10px 34px -14px rgba(16,24,40,0.16)",
        lift: "0 28px 70px -28px rgba(49,59,172,0.36)",
        glow: "0 0 0 1px rgba(49,59,172,0.12), 0 16px 50px -20px rgba(49,59,172,0.45)",
        inset: "0 1px 0 0 rgba(255,255,255,0.6) inset",
      },
      backgroundImage: {
        "accent-grad": "linear-gradient(135deg, #4b53c0 0%, #313bac 45%, #46364a 100%)",
        "glass-grad":
          "linear-gradient(150deg, rgba(255,255,255,0.85), rgba(255,255,255,0.45))",
        grid:
          "linear-gradient(to right, rgba(49,59,172,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(49,59,172,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      keyframes: {
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        floatySlow: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(3deg)" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        gradientMove: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        marquee: "marquee 34s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        floatySlow: "floatySlow 9s ease-in-out infinite",
        spinSlow: "spinSlow 26s linear infinite",
        pulseGlow: "pulseGlow 5s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
        blink: "blink 1.1s step-end infinite",
        gradientMove: "gradientMove 8s ease infinite",
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "2000px",
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
