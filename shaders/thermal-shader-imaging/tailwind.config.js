/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Instrument housing — near-black graphite with a cool tint.
        ink: "#05070c",
        panel: "#0a0e16",
        panel2: "#0e131d",
        line: "#1b2330",
        // The component's own 7-stop thermal palette, surfaced as tokens so the
        // surrounding HUD speaks the same language as the shader.
        ice: "#073dff",
        cyan: "#53d5fd",
        cream: "#fefcdd",
        amber: "#ffec6a",
        gold: "#f9d400",
        ember: "#a61904",
        mist: "#8a97ad",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      keyframes: {
        sweep: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        sweep: "sweep 5s linear infinite",
        flicker: "flicker 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
