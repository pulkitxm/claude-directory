export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    borderRadius: {
      none: "0px",
      DEFAULT: "0px"
    },
    extend: {
      colors: {
        background: "#F9F8F6",
        foreground: "#1A1A1A",
        "muted-bg": "#EBE5DE",
        "muted-fg": "#6C6863",
        accent: "#D4AF37",
        "accent-fg": "#FFFFFF"
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"]
      },
      letterSpacing: {
        overline: "0.25em",
        label: "0.3em",
        button: "0.2em"
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      },
      transitionDuration: {
        1500: "1500ms",
        2000: "2000ms"
      },
      boxShadow: {
        hero: "0 8px 32px rgba(0,0,0,0.12)",
        feature: "0 4px 24px rgba(0,0,0,0.08)",
        blog: "0 4px 20px rgba(0,0,0,0.06)",
        "blog-hover": "0 8px 32px rgba(0,0,0,0.12)",
        card: "0 2px 8px rgba(0,0,0,0.02)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.06)",
        btn: "0 4px 16px rgba(0,0,0,0.15)",
        "btn-hover": "0 8px 24px rgba(0,0,0,0.25)",
        frame: "inset 0 0 0 1px rgba(0,0,0,0.06)",
        "frame-light": "inset 0 0 0 1px rgba(255,255,255,0.08)"
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(12px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        riseIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(28px)",
            filter: "blur(8px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
            filter: "blur(0)"
          }
        }
      },
      animation: {
        fadeIn: "fadeIn 0.7s cubic-bezier(0.25,0.46,0.45,0.94) both",
        riseIn: "riseIn 1.2s cubic-bezier(0.25,0.46,0.45,0.94) both"
      }
    }
  },
  plugins: []
};
