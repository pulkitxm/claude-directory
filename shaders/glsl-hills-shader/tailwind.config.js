/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cold charcoal ink — the stage and panel substrate. The shader renders
        // monochrome grey on a transparent clear, so the chrome stays near-mono.
        fog: {
          975: "#05070A",
          950: "#080B10",
          900: "#0C1015",
          850: "#10151C",
          800: "#151B24",
          700: "#1C2530",
          600: "#27323F",
          line: "#27313D",
        },
        // The hill range's own value — the shader's vec3(0.6) grey, as a ramp.
        ridge: {
          DEFAULT: "#999999",
          bright: "#CFCFCF",
          dim: "#6B7177",
        },
        // Atmospheric haze — the foggy off-white used for headlines + body.
        haze: "#D7DEE6",
        // Instrument accents: a cold meteorological cyan + a low-visibility amber.
        signal: {
          DEFAULT: "#7FD4D1",
          bright: "#A7E9E6",
          deep: "#3FA8A4",
        },
        caution: "#E9B24A",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      keyframes: {
        "scan-sweep": {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(120%)" },
        },
        "sweep-x": {
          "0%": { transform: "translateX(-130%)" },
          "100%": { transform: "translateX(130%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.9" },
          "50%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.65)" },
        },
        drift: {
          "0%": { backgroundPosition: "0px 0px" },
          "100%": { backgroundPosition: "-220px 0px" },
        },
      },
      animation: {
        "scan-sweep": "scan-sweep 8s linear infinite",
        "sweep-x": "sweep-x 11s linear infinite",
        flicker: "flicker 4.5s ease-in-out infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 1s ease both",
        "pulse-dot": "pulse-dot 1.7s ease-in-out infinite",
        drift: "drift 26s linear infinite",
      },
    },
  },
  plugins: [],
};
