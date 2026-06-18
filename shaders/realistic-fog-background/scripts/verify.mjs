// Headless verification for the HAAR realistic-fog-background lab.
// Boots the dev server, asserts no fatal console/page errors, confirms the
// WebGL fog canvas mounts and paints non-black mist, checks the lab UI
// (wordmark, import line, control deck faders, visibility gauge, telemetry,
// integration story, API, source), exercises Hold + a preset, and captures
// desktop + mobile screenshots.
//
//   URL=http://localhost:5317/ \
//   NODE_PATH=../../scripts/record-demos/node_modules \
//   CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
//     node scripts/verify.mjs
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { inflateSync } from "zlib";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

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
  let maxLum = 0, lit = 0, total = 0;
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
      total++;
    }
    prev.set(cur);
  }
  return { width, height, maxLum, litFraction: lit / total };
}

const TARGET = process.env.URL || "http://localhost:5317/";
const OUT = join(dirname(fileURLToPath(import.meta.url)), ".verify");
mkdirSync(OUT, { recursive: true });

const errors = [];
const IGNORABLE = /WebGL|swiftshader|GroupMarkerNotSet|software WebGL|GL_|clipboard/i;
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--no-sandbox", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
const note = (s) => { if (!IGNORABLE.test(s)) errors.push(s); };
page.on("console", (m) => { if (m.type() === "error") note(`console.error: ${m.text()}`); });
page.on("pageerror", (e) => note(`pageerror: ${e.message}`));

await page.goto(TARGET, { waitUntil: "networkidle", timeout: 30000 });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(1600);

const checks = [];
const must = async (name, fn) => {
  try { checks.push([name, !!(await fn())]); }
  catch (e) { checks.push([name, false, String(e)]); }
};

const webgl = await page.evaluate(() => !!document.createElement("canvas").getContext("webgl"));
console.log(`(environment: WebGL ${webgl ? "available" : "UNAVAILABLE"})`);

await must("fog <canvas> mounted", () => page.locator("canvas").count().then((n) => n >= 1));
await must("canvas fills viewport", async () => {
  const box = await page.locator("canvas").first().boundingBox();
  return box && box.width >= 1200 && box.height >= 700;
});
if (webgl) {
  await must("fog paints visible mist (not flat black)", async () => {
    const png = await page.screenshot({ clip: { x: 300, y: 180, width: 680, height: 420 } });
    const s = pngStats(png);
    if (!s) throw new Error("could not decode screenshot");
    console.log(`   fog: maxLum=${s.maxLum.toFixed(1)} lit=${(s.litFraction * 100).toFixed(1)}%`);
    return s.maxLum > 24 && s.litFraction > 0.05;
  });
}

await must("HAAR wordmark present", () => page.getByRole("heading", { level: 1 }).innerText().then((t) => /HAAR/i.test(t)));
await must("import line @/components/ui/demo shown", () =>
  page.getByText('"@/components/ui/demo"').first().count().then((n) => n >= 1));
await must("visibility gauge (transmissometer) present", () =>
  page.getByText(/transmissometer/i).count().then((n) => n >= 1));
await must("≥ 7 faders wired", () => page.locator('input[type="range"]').count().then((n) => n >= 7));
await must("preset bank present (Pea Souper)", () => page.getByText(/Pea Souper/i).count().then((n) => n >= 1));
await must("live telemetry present", () => page.getByText(/Live telemetry/i).count().then((n) => n >= 1));
await must("integration section present", () => page.locator("#integrate").count().then((n) => n >= 1));
await must("parameterized API table present", () => page.getByText(/Parameterized API/i).count().then((n) => n >= 1));

// Functional: Hold freezes the drift clock (state -> held).
await must("Hold toggles state to 'held'", async () => {
  await page.getByRole("button", { name: /Hold/i }).click();
  await page.waitForTimeout(300);
  return (await page.getByText(/\bheld\b/i).count()) >= 1;
});
// Functional: a preset sets the active patch.
await must("preset selects a patch", async () => {
  await page.getByText("Pea Souper").click();
  await page.waitForTimeout(300);
  return (await page.getByText(/active patch/i).count()) >= 1;
});

await page.screenshot({ path: join(OUT, "desktop.png") });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(600);
await must("mobile: wordmark visible", () => page.getByRole("heading", { level: 1 }).isVisible());
await must("mobile: no horizontal overflow", () =>
  page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1));
await page.screenshot({ path: join(OUT, "mobile.png") });

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
if (failed > 0 || errors.length > 0) {
  console.log(`\nRESULT: FAIL (${failed} checks failed, ${errors.length} errors)`);
  process.exit(1);
}
console.log("\nRESULT: ALL PASS");
