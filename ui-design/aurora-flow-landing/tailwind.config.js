/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ---- Tide design tokens ------------------------------------------------
      // Deep oceanic twilight. Channel format `rgb(var(--x) / <alpha-value>)` so
      // BOTH solid utilities (bg-ink) AND opacity modifiers (bg-foam/40) work.
      colors: {
        // surfaces, deep -> shallow
        abyss: "rgb(var(--abyss) / <alpha-value>)", // #04070E deepest backdrop
        ink: "rgb(var(--ink) / <alpha-value>)", // #070B14 page base
        deep: "rgb(var(--deep) / <alpha-value>)", // #0C1424 raised surface
        shelf: "rgb(var(--shelf) / <alpha-value>)", // #14203A elevated card
        // text
        foam: "rgb(var(--foam) / <alpha-value>)", // #E8EDF4 primary text
        mist: "rgb(var(--mist) / <alpha-value>)", // #8A97AD muted text
        haze: "rgb(var(--haze) / <alpha-value>)", // #58657E faint text
        // accents — bioluminescence
        tide: "rgb(var(--tide) / <alpha-value>)", // #3DD4C8 teal-cyan
        glow: "rgb(var(--glow) / <alpha-value>)", // #6FE9DD bright tide
        coral: "rgb(var(--coral) / <alpha-value>)", // #FF7A93 warm bloom
        amber: "rgb(var(--amber) / <alpha-value>)", // #FFB877 lantern
        // hairlines
        line: "rgb(var(--line) / <alpha-value>)", // #1E2A44
        "line-bright": "rgb(var(--line-bright) / <alpha-value>)", // #2C3B5C
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.22em",
        nav: "0.02em",
      },
      borderRadius: {
        card: "18px",
        pill: "999px",
      },
      boxShadow: {
        // soft depth + a faint tide-tinted halo, never a flat black drop
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 60px -28px rgba(4,7,14,0.9)",
        glow: "0 0 0 1px rgba(61,212,200,0.25), 0 18px 50px -18px rgba(61,212,200,0.45)",
        coral:
          "0 0 0 1px rgba(255,122,147,0.25), 0 18px 50px -18px rgba(255,122,147,0.4)",
        lift: "0 30px 80px -40px rgba(4,7,14,0.95)",
      },
      transitionTimingFunction: {
        tide: "cubic-bezier(0.22, 1, 0.36, 1)",
        swell: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        drift: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "rule-grow": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        breathe: {
          "0%,100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.04)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 1s ease-out both",
        drift: "drift 7s ease-in-out infinite",
        "rule-grow": "rule-grow 1s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee 34s linear infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        breathe: "breathe 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
