/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Phase Lattice instrument palette
        void: "#04060A",
        panel: "#0A0E15",
        "panel-2": "#0D131C",
        hairline: "#19222E",
        "hairline-bright": "#28394A",
        ink: "#E8F0F4",
        muted: "#7B8A99",
        dim: "#46586A",
        // Signal accents
        phosphor: "#5FE9D0",
        "phosphor-dim": "#2E8576",
        amber: "#F0A23B",
        "amber-dim": "#8A5C1E",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest: "0.28em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scan-sweep": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0.25" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scan-sweep": "scan-sweep 6s linear infinite",
        blink: "blink 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};
