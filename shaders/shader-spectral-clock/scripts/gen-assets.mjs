// Generate the vendored world-clock preset stills locally.
//
// The brief asks to "fill image assets with Unsplash stock images". The sandbox
// proxy blocks images.unsplash.com (and every other image CDN) with HTTP 403, so
// remote Unsplash stills are genuinely unfetchable here AND would leave the project
// non-self-contained. Instead we render six distinctive procedural city-skyline
// stills with headless Chromium and save them as JPGs in assets/images, so the
// preset bank ships in-repo and runs fully offline.
//
//   CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
//   NODE_PATH=../../scripts/record-demos/node_modules \
//     node scripts/gen-assets.mjs
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createRequire } from "module";

// Resolve Playwright from the repo's record-demos toolchain (or an env override)
// without needing it as a project dependency.
const require = createRequire(import.meta.url);
const PW =
  process.env.PLAYWRIGHT_PKG ||
  join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "scripts", "record-demos", "node_modules", "playwright");
const { chromium } = require(PW);

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "assets", "images");
mkdirSync(OUT, { recursive: true });

// Each preset: a city, its IANA zone, and a palette (sky top → horizon, building
// tint, glow) chosen to read as a distinct time-of-day mood.
const CITIES = [
  { id: "tokyo", name: "Tokyo", sky: ["#1b0e3a", "#ff5e7e"], building: "#0a0618", glow: "#ff8bb0", stars: 0.0, density: 1.0 },
  { id: "newyork", name: "New York", sky: ["#0a1330", "#3a6ea5"], building: "#070b1c", glow: "#9fd0ff", stars: 0.4, density: 1.1 },
  { id: "london", name: "London", sky: ["#26303f", "#8a93a6"], building: "#10151f", glow: "#c9d4e6", stars: 0.05, density: 0.85 },
  { id: "dubai", name: "Dubai", sky: ["#2a1206", "#ffb066"], building: "#160b04", glow: "#ffd28a", stars: 0.0, density: 0.95 },
  { id: "singapore", name: "Singapore", sky: ["#062019", "#1fae8f"], building: "#03100c", glow: "#7af2cf", stars: 0.1, density: 1.05 },
  { id: "reykjavik", name: "Reykjavik", sky: ["#04102a", "#3aa0c9"], building: "#05101f", glow: "#8be0ff", stars: 0.7, density: 0.6 },
];

const W = 640;
const H = 400;

// Deterministic PRNG so every regeneration is identical.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function skylineSVG(c, seed) {
  const rng = mulberry32(seed);
  const horizon = H * 0.62;
  // Background sky gradient + soft glow disc near the horizon.
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`;
  svg += `<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.sky[0]}"/>
      <stop offset="78%" stop-color="${c.sky[1]}"/>
      <stop offset="100%" stop-color="${c.sky[1]}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="100%" r="70%">
      <stop offset="0%" stop-color="${c.glow}" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="${c.glow}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${c.glow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.building}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${c.building}" stop-opacity="0.9"/>
    </linearGradient>
  </defs>`;
  svg += `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  svg += `<ellipse cx="${W * 0.5}" cy="${horizon + 14}" rx="${W * 0.7}" ry="${H * 0.42}" fill="url(#glow)"/>`;

  // Stars
  const starCount = Math.round(c.stars * 90);
  for (let i = 0; i < starCount; i++) {
    const x = rng() * W;
    const y = rng() * horizon * 0.85;
    const r = 0.4 + rng() * 1.1;
    svg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="#ffffff" opacity="${(0.25 + rng() * 0.6).toFixed(2)}"/>`;
  }

  // Three parallax layers of buildings, back (faint) → front (solid).
  const layers = [
    { y: horizon - 6, scale: 0.55, op: 0.45, w: 26 },
    { y: horizon + 6, scale: 0.78, op: 0.72, w: 32 },
    { y: horizon + 20, scale: 1.0, op: 1.0, w: 40 },
  ];
  for (const layer of layers) {
    let x = -10;
    while (x < W + 10) {
      const bw = (layer.w * (0.5 + rng())) * c.density;
      const bh = (40 + rng() * 150) * layer.scale * c.density;
      const top = layer.y - bh;
      svg += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${(H - top).toFixed(1)}" fill="${c.building}" opacity="${layer.op}"/>`;
      // Antenna on tall front-layer towers.
      if (layer.scale === 1 && bh > 130 && rng() > 0.5) {
        svg += `<rect x="${(x + bw / 2 - 1).toFixed(1)}" y="${(top - 16).toFixed(1)}" width="2" height="16" fill="${c.building}" opacity="${layer.op}"/>`;
      }
      // Lit windows on the front two layers.
      if (layer.op > 0.6) {
        const cols = Math.max(1, Math.floor(bw / 8));
        const rows = Math.max(1, Math.floor(bh / 12));
        for (let cx = 0; cx < cols; cx++) {
          for (let cy = 0; cy < rows; cy++) {
            if (rng() > 0.62) {
              const wx = x + 4 + cx * 8;
              const wy = top + 8 + cy * 12;
              if (wx < x + bw - 3) {
                svg += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="3" height="4" fill="${c.glow}" opacity="${(0.5 + rng() * 0.5).toFixed(2)}"/>`;
              }
            }
          }
        }
      }
      x += bw + rng() * 6;
    }
  }
  // Bottom haze fade so the foreground grounds into shadow.
  svg += `<rect x="0" y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#haze)"/>`;
  svg += `</svg>`;
  return svg;
}

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--no-sandbox", "--force-color-profile=srgb"],
});
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const page = await ctx.newPage();

let seed = 1337;
for (const c of CITIES) {
  const svg = skylineSVG(c, seed++);
  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#000">${svg}</body></html>`;
  await page.setContent(html, { waitUntil: "load" });
  await page.waitForTimeout(120);
  const path = join(OUT, `${c.id}.jpg`);
  await page.screenshot({ path, type: "jpeg", quality: 82, clip: { x: 0, y: 0, width: W, height: H } });
  console.log(`wrote ${c.id}.jpg (${c.name})`);
}

await browser.close();
console.log("DONE");
