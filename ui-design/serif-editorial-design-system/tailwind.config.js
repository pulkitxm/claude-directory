/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // ---- Serif design tokens (sourced from CSS channel vars in index.css) --
      // Channel format `rgb(var(--x-rgb) / <alpha-value>)` so that BOTH solid
      // utilities (bg-accent) AND opacity modifiers (bg-muted/40, text-accent/15)
      // generate real CSS under Tailwind v3.
      colors: {
        background: "rgb(var(--background-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground-rgb) / <alpha-value>)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-secondary": "rgb(var(--accent-secondary-rgb) / <alpha-value>)",
        "accent-foreground": "rgb(var(--accent-foreground-rgb) / <alpha-value>)",
        // pre-baked 6% gold wash for featured card surfaces (no alpha modifier).
        "accent-muted": "var(--accent-muted)",
        border: "rgb(var(--border-rgb) / <alpha-value>)",
        "border-hover": "rgb(var(--border-hover-rgb) / <alpha-value>)",
        card: "rgb(var(--card-rgb) / <alpha-value>)",
        ring: "rgb(var(--ring-rgb, var(--accent-rgb)) / <alpha-value>)",
      },
      fontFamily: {
        // Playfair Display — the signature serif for all display type
        display: ['"Playfair Display"', "Georgia", "serif"],
        // Source Sans 3 — body / UI
        sans: ['"Source Sans 3"', "system-ui", "sans-serif"],
        // IBM Plex Mono — small-caps labels & meta
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        // tracking-nav is used on nav items & buttons; the 0.15em label tracking
        // lives in the canonical `.small-caps` class (index.css).
        nav: "0.05em",
      },
      boxShadow: {
        // Refinement, not depth — very subtle, warm-tinted
        sm: "0 1px 2px rgba(26,26,26,0.04)",
        md: "0 4px 12px rgba(26,26,26,0.06)",
        lg: "0 8px 24px rgba(26,26,26,0.08)",
        accent: "0 8px 24px rgba(184,134,11,0.18)",
      },
      borderRadius: {
        md: "6px",
        lg: "8px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "rule-grow": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out both",
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "rule-grow": "rule-grow 0.9s cubic-bezier(0.22,1,0.36,1) both",
        marquee: "marquee-x 38s linear infinite",
      },
    },
  },
  plugins: [],
};
