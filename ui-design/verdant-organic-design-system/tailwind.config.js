/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────────────────────
// VERDANT · Organic / Natural design system — centralized tokens (the DNA).
// Everything downstream (colours, type, shadows, organic radii, motion) is
// expressed once here so components stay free of one-off hex values.
// ─────────────────────────────────────────────────────────────────────────────
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Earth-drawn palette — forest floor, clay, unbleached paper.
        background: "#FDFCF8", // off-white, rice paper
        foreground: "#2C2C24", // deep loam / charcoal
        primary: {
          DEFAULT: "#5D7052", // moss green
          foreground: "#F3F4F1", // pale mist
        },
        secondary: {
          DEFAULT: "#C18C5D", // terracotta / clay
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#E6DCCD", // sand / beige
          foreground: "#4A4A40", // bark
        },
        muted: {
          DEFAULT: "#F0EBE5", // stone
          foreground: "#78786C", // dried grass
        },
        border: "#DED8CF", // raw timber
        destructive: "#A85448", // burnt sienna
        card: "#FEFEFA", // extremely light beige (cards over the page)
      },
      fontFamily: {
        // Characterful serif for headings, rounded sans for body.
        serif: ["Fraunces", "Georgia", "serif"],
        sans: ["Nunito", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Moderate 1.25 type scale.
        xs: ["0.8rem", { lineHeight: "1.5" }],
        sm: ["0.9rem", { lineHeight: "1.55" }],
        base: ["1rem", { lineHeight: "1.7" }],
        lg: ["1.125rem", { lineHeight: "1.7" }],
        xl: ["1.35rem", { lineHeight: "1.5" }],
        "2xl": ["1.7rem", { lineHeight: "1.35" }],
        "3xl": ["2.1rem", { lineHeight: "1.25" }],
        "4xl": ["2.6rem", { lineHeight: "1.15" }],
        "5xl": ["3.3rem", { lineHeight: "1.08" }],
        "6xl": ["4.1rem", { lineHeight: "1.02" }],
        "7xl": ["5.1rem", { lineHeight: "0.98" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      boxShadow: {
        // Soft, diffused, colour-tinted — never pure black.
        soft: "0 4px 20px -2px rgba(93, 112, 82, 0.15)", // moss tinted
        "soft-lg": "0 20px 40px -10px rgba(93, 112, 82, 0.15)",
        float: "0 10px 40px -10px rgba(193, 140, 93, 0.2)", // clay tinted
        "float-lg": "0 24px 60px -12px rgba(193, 140, 93, 0.28)",
        "soft-hover": "0 6px 24px -4px rgba(93, 112, 82, 0.25)",
      },
      transitionTimingFunction: {
        organic: "cubic-bezier(0.22, 1, 0.36, 1)", // gentle, no harsh snaps
      },
      keyframes: {
        // Slow ambient drift for background blobs.
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(2%, -3%) scale(1.04)" },
          "66%": { transform: "translate(-2%, 2%) scale(0.98)" },
        },
        "morph-a": {
          "0%, 100%": {
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          },
          "50%": {
            borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
          },
        },
        "morph-b": {
          "0%, 100%": {
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          },
          "50%": {
            borderRadius: "70% 30% 40% 60% / 60% 40% 60% 40%",
          },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        "drift-slow": "drift 26s ease-in-out infinite",
        "morph-a": "morph-a 14s ease-in-out infinite",
        "morph-b": "morph-b 16s ease-in-out infinite",
        sway: "sway 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
