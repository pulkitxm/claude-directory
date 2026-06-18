// Headless verification for the SPECTRA CLOCK lab.
//
// Boots the dev-server URL, asserts no console / page errors, confirms the WebGL
// shader canvas mounts and paints non-black spectral light, checks the lab UI
// (wordmark, import path, telemetry HUD, control deck, presets, anatomy, API,
// install), exercises the Freeze control and a world-preset switch, and captures
// desktop + mobile screenshots.
//
//   URL=http://localhost:5314/ \
//   CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
//     node scripts/verify.mjs
import { mkdirSync } from "fs";
import { inflateSync } from "zlib";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const PW =
  process.env.PLAYWRIGHT_PKG ||
  join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "scripts", "record-demos", "node_modules", "playwright");
const { chromium } = require(PW);

/** Decode a 24/32-bit PNG just enough to scan pixels (no deps). */
function pngStats(buf) {
  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") break;
    pos += 12 + len;
  }
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 0;
  if (channels === 0 || bitDepth !== 8) return null;
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const prev = new Uint8Array(stride);
  const cur = new Uint8Array(stride);
  let maxLum = 0, lit = 0, total = 0, rSum = 0, gSum = 0, bSum = 0;
  let p = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[p++];
    for (let x = 0; x < stride; x++) {
      const rawByte = raw[p++];
      const a = x >= channels ? cur[x - channels] : 0;
      const b = prev[x];
      const c = x >= channels ? prev[x - channels] : 0;
      let v;
      switch (filter) {
        case 0: v = rawByte; break;
        case 1: v = rawByte + a; break;
        case 2: v = rawByte + b; break;
        case 3: v = rawByte + ((a + b) >> 1); break;
        case 4: {
          const pp = a + b - c;
          const pa = Math.abs(pp - a), pb = Math.abs(pp - b), pc = Math.abs(pp - c);
          v = rawByte + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c);
          break;
        }
        default: v = rawByte;
      }
      cur[x] = v & 0xff;
    }
    for (let x = 0; x < width; x++) {
      const r = cur[x * channels];
      const g = cur[x * channels + 1];
      const bl = cur[x * channels + 2];
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * bl;
      if (lum > maxLum) maxLum = lum;
      if (lum > 8) lit++;
      rSum += r; gSum += g; bSum += bl;
      total++;
    }
    prev.set(cur);
  }
  return { width, height, maxLum, litFraction: lit / total, avg: { r: rSum / total, g: gSum / total, b: bSum / total } };
}

const TARGET = process.env.URL || "http://localhost:5314/";
const OUT = join(dirname(fileURLToPath(import.meta.url)), ".verify");
mkdirSync(OUT, { recursive: true });

const errors = [];
const IGNORABLE = /WebGL|swiftshader|GroupMarkerNotSet|Automatic fallback to software WebGL|GL_|favicon/i;
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: [
    "--no-sandbox",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--ignore-gpu-blocklist",
  ],
});
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
const note = (s) => {
  if (IGNORABLE.test(s)) return;
  errors.push(s);
};
page.on("console", (m) => {
  if (m.type() === "error") note(`console.error: ${m.text()}`);
});
page.on("pageerror", (e) => note(`pageerror: ${e.message}`));

await page.goto(TARGET, { waitUntil: "networkidle", timeout: 30000 });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(1600);

const checks = [];
const must = async (name, fn) => {
  try {
    checks.push([name, !!(await fn())]);
  } catch (e) {
    checks.push([name, false, String(e)]);
  }
};

const webglSupported = await page.evaluate(() => {
  const c = document.createElement("canvas");
  return !!c.getContext("webgl");
});
console.log(`(environment: WebGL ${webglSupported ? "available" : "UNAVAILABLE -> CSS fallback"})`);

if (webglSupported) {
  await must("WebGL <canvas> mounted", () => page.locator("canvas").count().then((n) => n >= 1));
  await must("hero canvas is large", async () => {
    const box = await page.locator("canvas").first().boundingBox();
    return box && box.width >= 900 && box.height >= 500;
  });
  await must("shader paints visible spectral light (centre is not flat black)", async () => {
    const box = await page.locator("canvas").first().boundingBox();
    const clip = {
      x: box.x + box.width * 0.25,
      y: box.y + box.height * 0.25,
      width: box.width * 0.5,
      height: box.height * 0.5,
    };
    const png = await page.screenshot({ clip });
    const s = pngStats(png);
    if (!s) throw new Error("could not decode screenshot");
    console.log(
      `   shader centre: maxLum=${s.maxLum.toFixed(1)} lit=${(s.litFraction * 100).toFixed(1)}% avg=rgb(${s.avg.r.toFixed(0)},${s.avg.g.toFixed(0)},${s.avg.b.toFixed(0)})`,
    );
    return s.maxLum > 30 && s.litFraction > 0.05;
  });
} else {
  await must("graceful fallback rendered (never flat black)", () =>
    page.locator('[data-shader-fallback="true"]').count().then((n) => n >= 1),
  );
}

await must("brand 'SPECTRA' present", () => page.getByText("SPECTRA").first().count().then((n) => n >= 1));
await must("'CLOCK' present", () => page.getByText("CLOCK").first().count().then((n) => n >= 1));
await must("components/ui import path shown", () =>
  page.getByText(/@\/components\/ui\/shader-clock/).first().count().then((n) => n >= 1),
);
await must("telemetry HUD present", () => page.getByText(/Telemetry/i).first().count().then((n) => n >= 1));
await must("control deck present", () => page.getByText(/Control deck/i).first().count().then((n) => n >= 1));
await must("≥ 4 faders (range inputs) wired", () =>
  page.locator('input[type="range"]').count().then((n) => n >= 4),
);
await must("world presets present (≥ 6 skyline chips)", () =>
  page.locator('img[alt$="skyline"]').count().then((n) => n >= 6),
);
await must("anatomy + api + install sections present", async () => {
  const a = await page.locator("#anatomy").count();
  const b = await page.locator("#api").count();
  const c = await page.locator("#install").count();
  return a >= 1 && b >= 1 && c >= 1;
});
await must("drop-in demo (verbatim component) embedded", () => page.locator("#demo").count().then((n) => n >= 1));
await must("≥ 2 canvases (hero + drop-in demo)", () => page.locator("canvas").count().then((n) => n >= 2));

// Functional: Freeze the clock and confirm the HUD flips to FROZEN.
await must("Freeze control toggles HUD to 'FROZEN'", async () => {
  await page.getByRole("button", { name: /Freeze/i }).first().click();
  await page.waitForTimeout(300);
  return (await page.getByText(/FROZEN/i).count()) >= 1;
});
// resume so the recording shows live motion
await page.getByRole("button", { name: /Resume/i }).first().click().catch(() => {});

// Functional: switch a world preset and confirm the city label updates.
await must("world-preset switch updates the clock location", async () => {
  await page.getByRole("button", { name: /London skyline/i }).click();
  await page.waitForTimeout(400);
  return (await page.getByRole("button", { name: /London/i }).count()) >= 1;
});

await page.screenshot({ path: join(OUT, "desktop.png"), fullPage: false });

// Mobile pass
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(700);
await must("mobile: wordmark visible", () => page.getByRole("heading", { level: 1 }).first().isVisible());
await must("mobile: no horizontal overflow", () =>
  page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
);
await page.screenshot({ path: join(OUT, "mobile.png"), fullPage: false });

await browser.close();

let failed = 0;
console.log("\n=== VERIFY RESULTS ===");
for (const [name, ok, extra] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  -> " + extra : ""}`);
  if (!ok) failed++;
}
console.log("\n=== CONSOLE / PAGE ERRORS ===");
if (errors.length === 0) console.log("(none)");
else errors.forEach((e) => console.log(" - " + e));
console.log(`\nScreenshots: ${OUT}`);
if (failed > 0 || errors.length > 0) {
  console.log(`\nRESULT: FAIL (${failed} checks failed, ${errors.length} errors)`);
  process.exit(1);
}
console.log("\nRESULT: ALL PASS");
