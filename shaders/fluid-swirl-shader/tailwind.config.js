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
        // Console chrome — near-black violet ink the swirl is bedded onto.
        ink: {
          DEFAULT: "#08070e",
          950: "#08070e",
          900: "#0d0b16",
          800: "#14111f",
          700: "#1d1830",
          600: "#272040",
        },
        // Iridescent accents pulled from the three pigments the shader mixes.
        flux: {
          rose: "#ff6f91", // colour_1 family
          azure: "#6f9bff", // colour_2 family
          gold: "#ffd66f", // colour_3 family
          mist: "#cdd2ff", // cool UI text
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
        sans: ["'Space Grotesk'", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        ultra: "0.5em",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -6px, 0)" },
        },
        sheen: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        rise: "rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1.1s ease-out both",
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        drift: "drift 7s ease-in-out infinite",
        sheen: "sheen 8s ease infinite",
      },
    },
  },
  plugins: [],
};
