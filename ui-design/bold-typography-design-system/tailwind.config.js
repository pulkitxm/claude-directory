export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      background: "var(--background)",
      foreground: "var(--foreground)",
      muted: "var(--muted)",
      "muted-foreground": "var(--muted-foreground)",
      accent: "var(--accent)",
      "accent-foreground": "var(--accent-foreground)",
      border: "var(--border)",
      "border-hover": "var(--border-hover)",
      input: "var(--input)",
      card: "var(--card)",
      "card-foreground": "var(--card-foreground)",
      ring: "var(--ring)"
    },
    borderRadius: {
      none: "0px",
      DEFAULT: "0px"
    },
    boxShadow: {
      none: "none"
    },
    extend: {
      fontFamily: {
        sans: ['"Inter Tight"', '"Inter"', "system-ui", "sans-serif"],
        display: ['"Playfair Display"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"]
      },
      fontSize: {
        xs: ["0.75rem", {
          lineHeight: "1.6"
        }],
        sm: ["0.875rem", {
          lineHeight: "1.6"
        }],
        base: ["1rem", {
          lineHeight: "1.6"
        }],
        lg: ["1.125rem", {
          lineHeight: "1.6"
        }],
        xl: ["1.25rem", {
          lineHeight: "1.4"
        }],
        "2xl": ["1.5rem", {
          lineHeight: "1.25"
        }],
        "3xl": ["2rem", {
          lineHeight: "1.1"
        }],
        "4xl": ["2.5rem", {
          lineHeight: "1.1"
        }],
        "5xl": ["3.5rem", {
          lineHeight: "1.05"
        }],
        "6xl": ["4.5rem", {
          lineHeight: "1"
        }],
        "7xl": ["6rem", {
          lineHeight: "1"
        }],
        "8xl": ["8rem", {
          lineHeight: "1"
        }],
        "9xl": ["10rem", {
          lineHeight: "1"
        }]
      },
      letterSpacing: {
        tighter: "-0.06em",
        tight: "-0.04em",
        normal: "-0.01em",
        wide: "0.05em",
        wider: "0.1em",
        widest: "0.2em"
      },
      lineHeight: {
        none: "1",
        tight: "1.1",
        snug: "1.25",
        normal: "1.6",
        relaxed: "1.75"
      },
      maxWidth: {
        container: "1200px"
      },
      borderWidth: {
        DEFAULT: "1px",
        thick: "2px"
      },
      transitionTimingFunction: {
        crisp: "cubic-bezier(0.25, 0, 0, 1)"
      },
      transitionDuration: {
        150: "150ms",
        200: "200ms",
        500: "500ms"
      }
    }
  },
  plugins: []
};
