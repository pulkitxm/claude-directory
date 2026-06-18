/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // OSCILLON instrument palette — a cold graphite chassis lit by a
        // phosphor signal line, derived from the shader's own grayscale field.
        carbon: {
          950: "#050608",
          900: "#070a0d",
          800: "#0b1014",
          700: "#10171d",
          600: "#161f27",
          500: "#1d2a34",
        },
        hairline: "#22323d",
        // The live trace colour — a CRT phosphor green-cyan.
        phosphor: {
          50: "#e9fff6",
          100: "#c4ffe9",
          200: "#8dffd6",
          300: "#4dffc0",
          400: "#22f5b0",
          500: "#0fd99a",
          600: "#0bb182",
        },
        // Secondary trace / warning heat.
        amber: {
          300: "#ffd27d",
          400: "#ffb443",
          500: "#f59a1f",
        },
        chalk: "#e6f0ee",
        dim: "#7d8f93",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'Space Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        ultra: "0.42em",
        wider2: "0.22em",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "reticle-spin": {
          to: { transform: "rotate(360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        sweep: {
          "0%": { transform: "translateX(-130%)" },
          "100%": { transform: "translateX(130%)" },
        },
      },
      animation: {
        rise: "rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1.4s ease-out both",
        "reticle-spin": "reticle-spin 30s linear infinite",
        blink: "blink 1.6s steps(1, end) infinite",
        sweep: "sweep 5.5s linear infinite",
      },
    },
  },
  plugins: [],
};
