/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deflector-array control room: cold graphite hull, ionised blue plasma.
        hull: "#05070d",
        plate: "#0a0e18",
        steel: "#141a28",
        edge: "#1f2940",
        ion: "#5bd5ff", // shield arc cyan
        violet: "#9a7bff", // outer fringe
        haze: "#7f8db0", // muted label text
        warn: "#ff6b4a",
        ok: "#46f0b0",
      },
      fontFamily: {
        display: ['"Chakra Petch"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      keyframes: {
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        flicker: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        sweep: "sweep 3.2s linear infinite",
        flicker: "flicker 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
