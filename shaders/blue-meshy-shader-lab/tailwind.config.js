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
        // Abyss console — the dark chrome the live shader is mounted into.
        abyss: {
          950: "#03070f",
          900: "#050b16",
          850: "#070f1c",
          800: "#0a1422",
          700: "#0e1b2e",
          600: "#13243c",
        },
        hairline: "#16273f",
        // Mirrors the shader's own 20-step sea palette (deepest -> brightest).
        sea: {
          900: "#00050c",
          800: "#001229",
          700: "#003366",
          600: "#004c8c",
          500: "#0a73bf",
          400: "#2196d8",
          300: "#46b3e6",
          200: "#7ad0f2",
          100: "#b3e6ff",
        },
        foam: "#e8f4fb",
        steel: "#7c93ad",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        ultra: "0.4em",
        wide2: "0.2em",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        sweep: {
          "0%": { transform: "translateX(-110%)" },
          "100%": { transform: "translateX(110%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        rise: "rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1.2s ease-out both",
        blink: "blink 1.9s steps(1, end) infinite",
        sweep: "sweep 7s linear infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
