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
        // Chroma Foundry — a warm paper laboratory: bone panels, espresso ink,
        // and accents lifted straight from the shader's own 7-stop gradient.
        bone: {
          50: "#fcfaf6",
          100: "#f6f2ea",
          200: "#efe9dd",
          300: "#e4dccb",
          400: "#d3c8b1",
        },
        ink: {
          400: "#7a7163",
          500: "#5a5346",
          600: "#403a30",
          700: "#2b261e",
          800: "#1c1812",
          900: "#13100b",
        },
        // The shader palette, exposed as named tokens.
        pigment: {
          lilac: "#fad4fb",
          rose: "#fac8e1",
          gold: "#fab615",
          ember: "#fc681e",
          cobalt: "#0d5df4",
          indigo: "#0b4abb",
          char: "#170e07",
        },
        line: "#e0d7c6",
        "line-strong": "#ccc0a9",
      },
      fontFamily: {
        display: ["'Fraunces'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        ultra: "0.4em",
        wide2: "0.2em",
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
        "ping-ring": {
          "0%": { transform: "scale(0.4)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        rise: "rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1.2s ease-out both",
        "reticle-spin": "reticle-spin 38s linear infinite",
        blink: "blink 1.8s steps(1, end) infinite",
        "ping-ring": "ping-ring 1.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};
