import type { Config } from "tailwindcss";

/**
 * Minimalist Dark — centralized design tokens.
 *
 * Every value here maps 1:1 to the design system spec. Colors are surfaced as
 * CSS custom properties (see src/index.css :root) so they can be referenced in
 * arbitrary values like `bg-[var(--accent)]` and stay the single source of
 * truth. The named scales below mirror the spec's type scale, radii, and the
 * signature ambient-glow shadows.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-alt": "var(--background-alt)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        "card-solid": "var(--card-solid)",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        // Spec type scale
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.65" }],
        xl: ["1.25rem", { lineHeight: "1.6" }],
        "2xl": ["1.5rem", { lineHeight: "1.4" }],
        "3xl": ["2rem", { lineHeight: "1.2" }],
        "4xl": ["2.5rem", { lineHeight: "1.1" }],
        "5xl": ["3.5rem", { lineHeight: "1.05" }],
        "6xl": ["4.5rem", { lineHeight: "1.0" }],
        "7xl": ["6rem", { lineHeight: "0.98" }],
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.12em",
      },
      maxWidth: {
        container: "72rem", // max-w-6xl
      },
      boxShadow: {
        // Subtle elevation
        sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
        md: "0 4px 6px rgba(0, 0, 0, 0.3)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.3)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.4)",
        // Signature ambient glows
        "glow-sm": "0 0 20px rgba(245, 158, 11, 0.15)",
        "glow-md": "0 0 40px rgba(245, 158, 11, 0.2)",
        "glow-lg": "0 0 60px rgba(245, 158, 11, 0.25)",
        "glow-btn": "0 0 20px rgba(245, 158, 11, 0.4)",
        "border-glow":
          "0 0 0 1px rgba(245, 158, 11, 0.3), 0 0 20px rgba(245, 158, 11, 0.15)",
        "card-glow":
          "0 0 0 1px rgba(245, 158, 11, 0.2), 0 0 30px rgba(245, 158, 11, 0.15)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 0 0 rgba(245, 158, 11, 0.5)",
          },
          "50%": {
            opacity: "0.6",
            boxShadow: "0 0 0 6px rgba(245, 158, 11, 0)",
          },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "drift-slow": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(40px, -30px) scale(1.08)" },
        },
        "drift-slow-rev": {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1.05)" },
          "50%": { transform: "translate(-50px, 30px) scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "caret-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 1s ease-out forwards",
        "drift-slow": "drift-slow 22s ease-in-out infinite",
        "drift-slow-rev": "drift-slow-rev 28s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        "caret-blink": "caret-blink 1.05s steps(1) infinite",
        shimmer: "shimmer 6s linear infinite",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
