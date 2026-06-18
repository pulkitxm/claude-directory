/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cool optical-instrument palette. Deliberately *not* the warm-cream,
        // acid-green, or broadsheet AI defaults: the wireframe specimen supplies
        // the cold blue-white light, so the chrome around it stays a graphite
        // scope housing with a single periwinkle "lens-glass" accent.
        ink: "#05070d", // void behind everything (matches shader black)
        graphite: "#0b1019", // panel / housing
        seam: "#1a2536", // hairline divider blue-grey
        frost: "#e8edf6", // near-white headings
        steel: "#7c8aa3", // muted body text
        dim: "#516074", // faint captions
        glass: "#a8b4ff", // periwinkle optical-glass accent
        signal: "#ffd5a8", // warm focus-lock amber (used only on lock)
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        body: ['"Space Grotesk"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.36em",
      },
    },
  },
  plugins: [],
};
