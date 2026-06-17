import type { Config } from "tailwindcss";

/**
 * "Stellar Cartography" survey-console palette.
 *
 * Deliberately *not* the default near-black + single-acid-accent sci-fi look.
 * The ground is a deep ink-indigo; the instrument chrome is warm brass /
 * parchment (like an old observatory plate-measuring rig); a coral catalog
 * accent and an oxide-cyan readout accent carry the two shader colours.
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0c16",
        "ink-2": "#0f1320",
        plate: "#13182a",
        brass: "#d8c39a",
        "brass-dim": "#9c8b69",
        parchment: "#ece3d0",
        coral: "#ec6a4d",
        oxide: "#86d2e6",
        haze: "#8b93ab",
        line: "rgba(216, 195, 154, 0.18)",
        "line-soft": "rgba(139, 147, 171, 0.14)",
      },
      fontFamily: {
        display: ['"Newsreader"', "Georgia", "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        survey: "0.34em",
      },
    },
  },
  plugins: [],
} satisfies Config;
