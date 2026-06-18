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
        // Observatory palette — near-black void, warm bone text, the shader's
        // own amber→magenta→cyan signal sampled into accents.
        void: {
          950: "#040406",
          900: "#070709",
          850: "#0a0a0e",
          800: "#0e0e14",
          700: "#15151d",
          600: "#1d1d27",
        },
        hairline: "#23232f",
        bone: "#ece7df",
        ash: "#9a958f",
        dim: "#6b6760",
        signal: {
          amber: "#f0b35e",
          ember: "#ef6f4a",
          rose: "#e85d8a",
          violet: "#9d7bf0",
          cyan: "#5fd0d6",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        ultra: "0.46em",
        wide2: "0.22em",
        wide3: "0.32em",
      },
      maxWidth: {
        readable: "68ch",
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
        "reticle-spin-rev": {
          to: { transform: "rotate(-360deg)" },
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
        "fade-in": "fade-in 1.6s ease-out both",
        "reticle-spin": "reticle-spin 36s linear infinite",
        "reticle-spin-rev": "reticle-spin-rev 60s linear infinite",
        blink: "blink 1.6s steps(1, end) infinite",
        sweep: "sweep 7s linear infinite",
      },
    },
  },
  plugins: [],
};
