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
        // Optics-bench console — black-blue ink, cool searchlight cyan, warm beam amber.
        ink: {
          950: "#04050a",
          900: "#070912",
          800: "#0a0d1a",
          700: "#0e1222",
          600: "#13182c",
          500: "#1a2138",
        },
        hairline: "#222a44",
        beam: {
          50: "#eef4ff",
          100: "#dbe7ff",
          200: "#b9d0ff",
          300: "#8fb4ff",
          400: "#6f9cff",
          500: "#5b86f5",
          600: "#4566d8",
        },
        amber: {
          glow: "#f4b765",
          ember: "#ef9a4a",
        },
        cyanflux: "#7fe3ff",
        chalk: "#eaf0ff",
        dust: "#8b96b8",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'Space Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        ultra: "0.42em",
        wide2: "0.2em",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "reticle-spin": {
          to: { transform: "rotate(360deg)" },
        },
        "reticle-spin-rev": {
          to: { transform: "rotate(-360deg)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(120%)" },
        },
        "sweep-x": {
          "0%, 100%": { transform: "translateX(-18%)" },
          "50%": { transform: "translateX(18%)" },
        },
      },
      animation: {
        rise: "rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1.4s ease-out both",
        "reticle-spin": "reticle-spin 40s linear infinite",
        "reticle-spin-rev": "reticle-spin-rev 26s linear infinite",
        blink: "blink 1.8s steps(1, end) infinite",
        scan: "scan 7s linear infinite",
        "sweep-x": "sweep-x 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
