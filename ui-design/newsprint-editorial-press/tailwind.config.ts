import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      none: "0",
      DEFAULT: "0",
      sm: "0",
      md: "0",
      lg: "0",
      xl: "0",
      "2xl": "0",
      "3xl": "0",
      full: "0"
    },
    extend: {
      colors: {
        paper: "#F9F9F7",
        ink: "#111111",
        divider: "#E5E5E0",
        editorial: "#CC0000"
      },
      fontFamily: {
        serif: ["'Playfair Display'", "'Times New Roman'", "serif"],
        body: ["'Lora'", "Georgia", "serif"],
        sans: ["'Inter'", "'Helvetica Neue'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Courier New'", "monospace"]
      },
      fontSize: {
        "10xl": ["9rem", {
          lineHeight: "0.85"
        }],
        "11xl": ["11rem", {
          lineHeight: "0.82"
        }]
      },
      maxWidth: {
        "screen-xl": "1280px"
      },
      boxShadow: {
        hard: "4px 4px 0px 0px #111111",
        "hard-lg": "8px 8px 0px 0px #111111",
        "hard-red": "4px 4px 0px 0px #CC0000"
      },
      keyframes: {
        ticker: {
          "0%": {
            transform: "translateX(0)"
          },
          "100%": {
            transform: "translateX(-50%)"
          }
        },
        rise: {
          "0%": {
            opacity: "0",
            transform: "translateY(16px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        wipe: {
          "0%": {
            transform: "scaleX(0)"
          },
          "100%": {
            transform: "scaleX(1)"
          }
        }
      },
      animation: {
        ticker: "ticker 32s linear infinite",
        "ticker-slow": "ticker 48s linear infinite",
        rise: "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        wipe: "wipe 0.6s cubic-bezier(0.22, 1, 0.36, 1) both"
      }
    }
  },
  plugins: []
} satisfies Config;
