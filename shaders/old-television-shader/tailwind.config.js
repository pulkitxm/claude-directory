/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        slate: ['"Anton"', "system-ui", "sans-serif"],
        crt: ['"VT323"', "ui-monospace", "monospace"],
        sans: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        // shadcn tokens, mapped to the broadcast palette via CSS variables.
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Named broadcast palette — a phosphor signal lab on warm-cold cabinet.
        cabinet: {
          950: "#0a0908",
          900: "#12100e",
          850: "#181613",
          800: "#211d18",
          700: "#2e2820",
        },
        phosphor: {
          50: "#f4fff6",
          100: "#d6ffe0",
          200: "#9bffb6",
          300: "#5cff8c",
          400: "#26f06a",
          500: "#11c44f",
        },
        signal: {
          amber: "#ffb347",
          red: "#ff5145",
          cyan: "#54e6ff",
        },
        bone: {
          50: "#f7f3ea",
          100: "#ece4d2",
          200: "#d8cbb0",
          300: "#bcab86",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      letterSpacing: {
        ultra: "0.42em",
      },
      boxShadow: {
        tube: "inset 0 0 80px 30px rgba(0,0,0,0.7), inset 0 0 14px 4px rgba(0,0,0,0.85)",
        cabinet:
          "0 2px 0 0 rgba(255,255,255,0.04) inset, 0 -18px 40px -20px rgba(0,0,0,0.9) inset, 0 30px 60px -25px rgba(0,0,0,0.85)",
        knob: "0 1px 1px rgba(0,0,0,0.6), inset 0 2px 3px rgba(255,255,255,0.18), inset 0 -3px 5px rgba(0,0,0,0.7)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // CRT power-on flash overlay: a thin bright band blooms open then fades
        // out to transparent (never an ancestor of the canvas, so it is safe).
        "power-on": {
          "0%": { opacity: "0.9", transform: "scaleY(0.01)" },
          "10%": { opacity: "1", transform: "scaleY(0.02)" },
          "34%": { opacity: "0.85", transform: "scaleY(1.06)" },
          "60%": { opacity: "0.35", transform: "scaleY(1)" },
          "100%": { opacity: "0", transform: "scaleY(1)" },
        },
        "scan-drift": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "rec-blink": {
          "0%, 60%": { opacity: "1" },
          "61%, 100%": { opacity: "0.18" },
        },
        flicker: {
          "0%, 19%, 21%, 55%, 57%, 100%": { opacity: "1" },
          "20%, 56%": { opacity: "0.86" },
        },
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "dial-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "tracking-jog": {
          "0%, 92%, 100%": { transform: "translateX(0)" },
          "94%": { transform: "translateX(-2px)" },
          "96%": { transform: "translateX(2px)" },
          "98%": { transform: "translateX(-1px)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "power-on": "power-on 1.1s cubic-bezier(0.16,1,0.3,1) both",
        "scan-drift": "scan-drift 7s linear infinite",
        "rec-blink": "rec-blink 1.1s steps(1,end) infinite",
        flicker: "flicker 4.5s linear infinite",
        caret: "caret 1s steps(1,end) infinite",
        "dial-spin": "dial-spin 16s linear infinite",
        "tracking-jog": "tracking-jog 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
