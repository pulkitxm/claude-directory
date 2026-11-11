export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-secondary": "rgb(var(--accent-secondary-rgb) / <alpha-value>)",
        "accent-foreground": "rgb(var(--accent-foreground-rgb) / <alpha-value>)",
        "accent-muted": "var(--accent-muted)",
        border: "rgb(var(--border-rgb) / <alpha-value>)",
        "border-hover": "rgb(var(--border-hover-rgb) / <alpha-value>)",
        card: "rgb(var(--card-rgb) / <alpha-value>)",
        ring: "rgb(var(--ring-rgb, var(--accent-rgb)) / <alpha-value>)"
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Source Sans 3"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"]
      },
      letterSpacing: {
        nav: "0.05em"
      },
      boxShadow: {
        sm: "0 1px 2px rgba(26,26,26,0.04)",
        md: "0 4px 12px rgba(26,26,26,0.06)",
        lg: "0 8px 24px rgba(26,26,26,0.08)",
        accent: "0 8px 24px rgba(184,134,11,0.18)"
      },
      borderRadius: {
        md: "6px",
        lg: "8px"
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: "0"
          },
          to: {
            opacity: "1"
          }
        },
        "fade-up": {
          from: {
            opacity: "0",
            transform: "translateY(14px)"
          },
          to: {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "rule-grow": {
          from: {
            transform: "scaleX(0)"
          },
          to: {
            transform: "scaleX(1)"
          }
        },
        "marquee-x": {
          from: {
            transform: "translateX(0)"
          },
          to: {
            transform: "translateX(-50%)"
          }
        }
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out both",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "rule-grow": "rule-grow 0.9s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee-x 38s linear infinite"
      }
    }
  },
  plugins: []
};
