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
        // HELM-9 avionics console — void hull, phosphor-cyan telemetry, caution amber.
        void: {
          900: "#020308",
          800: "#04060e",
          700: "#070a16",
          600: "#0b0f1e",
          500: "#111627",
        },
        hull: "#161c30",
        hairline: "#1f2740",
        phosphor: {
          50: "#e9fbff",
          100: "#c9f6ff",
          200: "#8fecff",
          300: "#5cdcf6",
          400: "#34c6e8",
          500: "#19a7cc",
          600: "#1483a6",
        },
        caution: {
          300: "#ffd98a",
          400: "#ffbf4d",
          500: "#f59e22",
          600: "#cf7d12",
        },
        plasma: "#7aa2ff",
        chalk: "#e7ecf6",
        slate: "#8893ad",
        faint: "#5b6682",
      },
      fontFamily: {
        display: ["'Chakra Petch'", "system-ui", "sans-serif"],
        wordmark: ["'Orbitron'", "'Chakra Petch'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        ultra: "0.46em",
        wide2: "0.22em",
        wide3: "0.32em",
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
        "reticle-spin": {
          to: { transform: "rotate(360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        sweep: {
          "0%": { transform: "translateY(-130%)" },
          "100%": { transform: "translateY(130%)" },
        },
        "pulse-ring": {
          "0%": { opacity: "0.7", transform: "scale(0.92)" },
          "70%": { opacity: "0", transform: "scale(1.25)" },
          "100%": { opacity: "0", transform: "scale(1.25)" },
        },
      },
      animation: {
        rise: "rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1.4s ease-out both",
        "reticle-spin": "reticle-spin 36s linear infinite",
        blink: "blink 1.6s steps(1, end) infinite",
        sweep: "sweep 5.5s linear infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};
