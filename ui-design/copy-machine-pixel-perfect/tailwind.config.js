/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // FR4 substrate — the board itself
        substrate: {
          DEFAULT: "#0A1014",
          900: "#070C0F",
          800: "#0A1014",
          700: "#0E171C",
          600: "#16242B",
          500: "#1E3138",
        },
        // copper traces & pads
        copper: {
          DEFAULT: "#E8A24B",
          bright: "#F5B968",
          dim: "#C97A2B",
          deep: "#8A5318",
        },
        // solder-mask green — the "go" accent
        mask: {
          DEFAULT: "#1FB66E",
          bright: "#34D17F",
          dim: "#147F4C",
        },
        // schematic / signal cyan
        signal: "#3DD6D0",
        // silkscreen ink
        silk: {
          DEFAULT: "#EAF2EF",
          dim: "#9FB3AE",
          faint: "#5E726D",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      boxShadow: {
        pad: "0 0 0 1px rgba(232,162,75,0.35), 0 0 24px -6px rgba(232,162,75,0.45)",
        "mask-glow": "0 0 0 1px rgba(31,182,110,0.4), 0 0 32px -8px rgba(31,182,110,0.5)",
        panel:
          "0 1px 0 0 rgba(234,242,239,0.04) inset, 0 24px 60px -30px rgba(0,0,0,0.8)",
      },
      keyframes: {
        "trace-dash": {
          to: { strokeDashoffset: "-1000" },
        },
        "pad-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "trace-dash": "trace-dash 8s linear infinite",
        "pad-pulse": "pad-pulse 2.4s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};
