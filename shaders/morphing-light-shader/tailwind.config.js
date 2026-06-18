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
        // Optical-bench graphite — the anodized casing the instrument lives in.
        bench: {
          900: "#070809",
          800: "#0a0b0d",
          700: "#0e1013",
          600: "#13161a",
          500: "#191d22",
        },
        hairline: "#23282f",
        // The shader's own emission, lifted into the UI as the signal colors.
        laser: "#ff5fb0", // pink fringe
        cyan: "#22e6ff", // cyan fringe
        phosphor: "#ffcf6b", // amber caution / data ticks
        chalk: "#eef2f6",
        muted: "#828b95",
      },
      fontFamily: {
        display: ["'Sora'", "system-ui", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'Space Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        ultra: "0.45em",
        wider2: "0.2em",
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
        spin: { to: { transform: "rotate(360deg)" } },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
      },
      animation: {
        rise: "rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1.2s ease-out both",
        "reticle-spin": "spin 48s linear infinite",
        "reticle-spin-rev": "spin 90s linear infinite reverse",
        blink: "blink 1.8s steps(1, end) infinite",
      },
    },
  },
  plugins: [],
};
