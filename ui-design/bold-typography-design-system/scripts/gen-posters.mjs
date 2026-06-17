// ─────────────────────────────────────────────────────────────────────────────
// Generates on-brand editorial poster images for the journal/blog cards.
// Fully offline: each poster is a hand-composed SVG in the Bold Typography
// palette (near-black ground, warm white, single vermillion accent, grain),
// written to assets/images/*.svg. Keeping them as code means the project stays
// self-contained and the imagery never drifts from the design tokens.
// ─────────────────────────────────────────────────────────────────────────────
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../assets/images");
fs.mkdirSync(OUT, { recursive: true });

const BG = "#0A0A0A";
const FG = "#FAFAFA";
const ACCENT = "#FF3D00";
const MUTED = "#1A1A1A";
const BORDER = "#262626";

const W = 1200;
const H = 900;

// A reusable grain + vignette overlay so every poster shares the page's texture.
const grain = (id) => `
  <filter id="grain-${id}">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0"/>
  </filter>`;

function poster({ id, kicker, line1, line2, numeral, mode }) {
  // mode: "ground" = type on black, "accent" = type on vermillion, "outline" = outlined display type
  const ground = mode === "accent" ? ACCENT : BG;
  const ink = mode === "accent" ? BG : FG;
  const sub = mode === "accent" ? "rgba(10,10,10,0.7)" : "#737373";
  const rule = mode === "accent" ? "rgba(10,10,10,0.25)" : BORDER;

  const displayFill = mode === "outline" ? "none" : ink;
  const displayStroke = mode === "outline" ? ink : "none";
  const displayStrokeW = mode === "outline" ? 2 : 0;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">
  <defs>${grain(id)}</defs>
  <rect width="${W}" height="${H}" fill="${ground}"/>

  <!-- Oversized decorative numeral, low contrast, bleeding off the top-right -->
  <text x="${W - 40}" y="${H * 0.62}" text-anchor="end"
        font-family="'Inter Tight','Inter',sans-serif" font-weight="800"
        font-size="640" letter-spacing="-40"
        fill="${mode === "accent" ? "rgba(10,10,10,0.12)" : "rgba(255,255,255,0.05)"}">${numeral}</text>

  <!-- thin top rule + kicker -->
  <line x1="64" y1="120" x2="${W - 64}" y2="120" stroke="${rule}" stroke-width="1"/>
  <text x="64" y="100" font-family="'JetBrains Mono',monospace" font-size="26"
        letter-spacing="6" fill="${sub}">${kicker}</text>
  <text x="${W - 64}" y="100" text-anchor="end" font-family="'JetBrains Mono',monospace"
        font-size="26" letter-spacing="6" fill="${sub}">OBELISK</text>

  <!-- accent bar anchor -->
  <rect x="64" y="${H - 360}" width="120" height="8" fill="${mode === "accent" ? BG : ACCENT}"/>

  <!-- the headline does the work -->
  <text x="60" y="${H - 230}" font-family="'Inter Tight','Inter',sans-serif" font-weight="800"
        font-size="150" letter-spacing="-8"
        fill="${displayFill}" stroke="${displayStroke}" stroke-width="${displayStrokeW}">${line1}</text>
  <text x="60" y="${H - 90}" font-family="'Inter Tight','Inter',sans-serif" font-weight="800"
        font-size="150" letter-spacing="-8"
        fill="${displayFill}" stroke="${displayStroke}" stroke-width="${displayStrokeW}">${line2}</text>

  <!-- grain overlay -->
  <rect width="${W}" height="${H}" filter="url(#grain-${id})"/>
  <rect width="${W}" height="${H}" fill="none" stroke="${rule}" stroke-width="1"/>
</svg>`;
}

const posters = [
  {
    file: "journal-01.svg",
    id: "1",
    kicker: "ESSAY / 01",
    line1: "SCALE IS",
    line2: "MEANING",
    numeral: "1",
    mode: "ground",
  },
  {
    file: "journal-02.svg",
    id: "2",
    kicker: "FIELD NOTES / 02",
    line1: "KERN",
    line2: "EVERYTHING",
    numeral: "2",
    mode: "accent",
  },
  {
    file: "journal-03.svg",
    id: "3",
    kicker: "INTERVIEW / 03",
    line1: "WHITE",
    line2: "SPACE",
    numeral: "3",
    mode: "outline",
  },
];

for (const p of posters) {
  fs.writeFileSync(path.join(OUT, p.file), poster(p));
  console.log("wrote", p.file);
}

// A wide editorial "type specimen" plate used in the Product Detail / benefits area.
const specimen = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${Math.round(H * 0.78)}" viewBox="0 0 ${W} ${Math.round(H * 0.78)}" role="img">
  <defs>${grain("spec")}</defs>
  <rect width="${W}" height="${Math.round(H * 0.78)}" fill="${MUTED}"/>
  <text x="60" y="300" font-family="'Inter Tight','Inter',sans-serif" font-weight="800"
        font-size="300" letter-spacing="-18" fill="${FG}">Aa</text>
  <text x="500" y="300" font-family="'Inter Tight','Inter',sans-serif" font-weight="800"
        font-size="300" letter-spacing="-18" fill="none" stroke="${ACCENT}" stroke-width="2">Aa</text>
  <line x1="60" y1="380" x2="${W - 60}" y2="380" stroke="${BORDER}" stroke-width="1"/>
  <text x="60" y="470" font-family="'Playfair Display',Georgia,serif" font-style="italic"
        font-size="120" fill="${FG}">Quietly loud.</text>
  <text x="60" y="600" font-family="'JetBrains Mono',monospace" font-size="30"
        letter-spacing="8" fill="#737373">INTER TIGHT · PLAYFAIR DISPLAY · JETBRAINS MONO</text>
  <rect width="${W}" height="${Math.round(H * 0.78)}" filter="url(#grain-spec)"/>
</svg>`;
fs.writeFileSync(path.join(OUT, "specimen.svg"), specimen);
console.log("wrote specimen.svg");
