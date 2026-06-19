// Generates editorial photographic textures for the Terroir tasting-room page.
// No remote image hosts are reachable in this environment, so we render
// rich, grainy, gradient-mesh "photographs" locally with sharp. Each evokes a
// wine/terroir subject (vineyard rows, cellar, pour, bottle still-life) using
// layered radial/linear gradients, soft blobs, and a film-grain turbulence.
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "img");

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// Build an SVG "photograph": a base vertical gradient, several soft light
// blobs, faint horizontal striations (vineyard rows / cellar shelving), a
// vignette, and a turbulence grain overlay.
function photoSVG(w, h, opts) {
  const { base, blobs, light, accent, striation, seed, grain = 0.5 } = opts;
  const r = rng(seed);
  let blobEls = "";
  for (let i = 0; i < blobs; i++) {
    const cx = Math.round(r() * w);
    const cy = Math.round(r() * h);
    const rad = Math.round((0.18 + r() * 0.4) * Math.max(w, h));
    const col = r() > 0.5 ? light : accent;
    const op = (0.12 + r() * 0.28).toFixed(2);
    blobEls += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="url(#g${i})"/>
      <radialGradient id="g${i}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${col}" stop-opacity="${op}"/>
        <stop offset="100%" stop-color="${col}" stop-opacity="0"/>
      </radialGradient>`;
  }
  let lines = "";
  if (striation) {
    const n = 9 + Math.floor(r() * 7);
    for (let i = 0; i < n; i++) {
      const y = Math.round((i / n) * h + (r() - 0.5) * 14);
      const o = (0.04 + r() * 0.08).toFixed(3);
      const sw = (1 + r() * 2).toFixed(1);
      lines += `<line x1="-20" y1="${y}" x2="${w + 20}" y2="${y + (r() - 0.5) * 26}" stroke="#000" stroke-opacity="${o}" stroke-width="${sw}"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${base[0]}"/>
        <stop offset="55%" stop-color="${base[1]}"/>
        <stop offset="100%" stop-color="${base[2]}"/>
      </linearGradient>
      <radialGradient id="vig" cx="50%" cy="42%" r="75%">
        <stop offset="55%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
      </radialGradient>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer><feFuncA type="linear" slope="${grain}"/></feComponentTransfer>
        <feComposite operator="over" in2="SourceGraphic"/></filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#base)"/>
    ${blobEls}
    ${lines}
    <rect width="${w}" height="${h}" fill="url(#vig)"/>
    <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.12"/>
  </svg>`;
}

async function render(name, w, h, opts) {
  const svg = photoSVG(w, h, opts);
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT, name));
  console.log("wrote", name);
}

const palettes = {
  burgundy: { base: ["#2a0f17", "#46141f", "#1a0a0e"], light: "#c9788a", accent: "#7a2a3a" },
  sienna:   { base: ["#3a2417", "#5c3a22", "#1f140c"], light: "#d8a273", accent: "#8B5A3C" },
  sage:     { base: ["#1c2620", "#2c3a30", "#101713"], light: "#a7c4b2", accent: "#6B8E7F" },
  ember:    { base: ["#2a1d21", "#3a2228", "#140d10"], light: "#caa0a8", accent: "#8a4a55" },
  gold:     { base: ["#2b2415", "#473a1d", "#15110a"], light: "#d8c98a", accent: "#9a8240" },
  slate:    { base: ["#1a1c20", "#2a2d33", "#0e0f12"], light: "#9aa6b4", accent: "#5a6473" },
};

const jobs = [
  // Flavor wall (4) — tall 4:6
  ["flavor-01.jpg", 800, 1200, { ...palettes.burgundy, blobs: 5, striation: false, seed: 11 }],
  ["flavor-02.jpg", 800, 1200, { ...palettes.gold, blobs: 5, striation: true, seed: 22 }],
  ["flavor-03.jpg", 800, 1200, { ...palettes.sage, blobs: 5, striation: true, seed: 33 }],
  ["flavor-04.jpg", 800, 1200, { ...palettes.ember, blobs: 5, striation: false, seed: 44 }],
  // Product spotlight 3:4
  ["spotlight.jpg", 900, 1200, { ...palettes.sienna, blobs: 6, striation: false, seed: 55, grain: 0.4 }],
  // How it's made (4) — landscape 4:3
  ["made-01.jpg", 1000, 750, { ...palettes.sage, blobs: 5, striation: true, seed: 61 }],
  ["made-02.jpg", 1000, 750, { ...palettes.sienna, blobs: 5, striation: true, seed: 62 }],
  ["made-03.jpg", 1000, 750, { ...palettes.slate, blobs: 5, striation: false, seed: 63 }],
  ["made-04.jpg", 1000, 750, { ...palettes.burgundy, blobs: 5, striation: false, seed: 64 }],
];

for (const [n, w, h, o] of jobs) await render(n, w, h, o);

// Bottle silhouettes for the case builder (transparent PNG, grayscale-friendly)
function bottleSVG(seed) {
  const r = rng(seed);
  const hue = 200 + r() * 60;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="640" viewBox="0 0 256 640">
    <defs>
      <linearGradient id="b" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="hsl(${hue},10%,18%)"/>
        <stop offset="42%" stop-color="hsl(${hue},14%,42%)"/>
        <stop offset="58%" stop-color="hsl(${hue},14%,52%)"/>
        <stop offset="100%" stop-color="hsl(${hue},10%,14%)"/>
      </linearGradient>
    </defs>
    <path d="M104 24 h48 v120 c0 24 36 40 36 110 v320 c0 26 -18 42 -44 42 h-32 c-26 0 -44 -16 -44 -42 v-320 c0 -70 36 -86 36 -110 z"
      fill="url(#b)" stroke="#000" stroke-opacity="0.4" stroke-width="2"/>
    <rect x="74" y="300" width="108" height="150" rx="6" fill="#f4f1ea" opacity="0.92"/>
    <rect x="74" y="300" width="108" height="40" fill="#${["6B8E7F","8B5A3C","4A2C3E"][seed%3]}" opacity="0.85"/>
  </svg>`;
}
for (let i = 1; i <= 3; i++) {
  await sharp(Buffer.from(bottleSVG(i))).png().toFile(path.join(OUT, `bottle-0${i}.png`));
  console.log("wrote", `bottle-0${i}.png`);
}
console.log("done");
