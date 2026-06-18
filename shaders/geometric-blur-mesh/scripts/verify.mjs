/* Headless CLI verification for the Polyhedral Scope.
 * Expects a server already running (e.g. `npm run preview`); pass its base URL.
 * Usage: node scripts/verify.mjs [baseURL]   (default http://localhost:4173)
 */
import { chromium } from "playwright";

const BASE_URL = process.argv[2] ?? "http://localhost:4173";

let failures = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures += 1;
};
const norm = (s) => s.replace(/\s+/g, " ").trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
});

const consoleErrors = [];
page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
page.on("pageerror", (e) => consoleErrors.push(String(e)));

await page.goto(BASE_URL, { waitUntil: "networkidle" });
await sleep(1500);

// Take manual control immediately so the autopilot stops cycling solids and
// our deterministic assertions aren't fighting the auto sweep.
await page.mouse.move(60, 60, { steps: 6 });
await sleep(400);

// ── Title + hero ────────────────────────────────────────────────────────────
check("page title", (await page.title()).startsWith("Polyhedral Scope"), await page.title());
check(
  "h1 thesis present",
  norm(await page.locator("h1").innerText()).toLowerCase().includes("out of focus"),
  norm(await page.locator("h1").innerText()),
);

// ── WebGL canvas actually paints pixels ─────────────────────────────────────
const canvas = page.locator("canvas").first();
check("shader canvas exists", (await page.locator("canvas").count()) === 1);
const gl = await canvas.evaluate((c) => {
  const ctx = c.getContext("webgl");
  return { hasCtx: !!ctx, w: c.width, h: c.height };
});
check("webgl context + sized buffer", gl.hasCtx && gl.w > 0 && gl.h > 0, JSON.stringify(gl));

// Screenshot the canvas and confirm the wireframe actually lights pixels (the
// stage is otherwise pure black). Reading the live screenshot avoids relying on
// preserveDrawingBuffer, which the shader intentionally leaves off.
const shot = await canvas.screenshot();
const litFraction = await page.evaluate(async (b64) => {
  const img = new Image();
  img.src = "data:image/png;base64," + b64;
  await img.decode();
  const cv = document.createElement("canvas");
  cv.width = img.width;
  cv.height = img.height;
  const cx = cv.getContext("2d");
  cx.drawImage(img, 0, 0);
  const { data } = cx.getImageData(0, 0, cv.width, cv.height);
  let lit = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] + data[i + 1] + data[i + 2] > 60) lit++;
  }
  return lit / (cv.width * cv.height);
}, shot.toString("base64"));
check("wireframe draws lit pixels", litFraction > 0.0003, `lit=${(litFraction * 100).toFixed(3)}%`);

// ── Registry has 8 solids, click changes active ─────────────────────────────
const regButtons = page.locator('nav[aria-label="Specimen registry"] button');
check("registry lists 8 solids", (await regButtons.count()) === 8, String(await regButtons.count()));

const activeName = () => page.locator("aside .font-display").first().innerText();
const before = norm(await activeName());
await regButtons.nth(3).click(); // Icosahedron
await sleep(400);
const after = norm(await activeName());
check("registry click switches solid", after === "Icosahedron", `${before} -> ${after}`);

// ── Number key jumps ────────────────────────────────────────────────────────
await page.keyboard.press("1");
await sleep(300);
check("number key 1 -> Cube", norm(await activeName()) === "Cube", norm(await activeName()));
await page.keyboard.press("6");
await sleep(300);
check("number key 6 -> Diamond", norm(await activeName()) === "Diamond", norm(await activeName()));

// ── Cursor move drives the DEFOCUS readout up near centre ────────────────────
const readDefocus = () =>
  page.evaluate(() => {
    const el = document.querySelector("[data-defocus]");
    return el ? Number(el.textContent) : NaN;
  });
// Move far to a corner: low defocus.
await page.mouse.move(40, 40, { steps: 10 });
await sleep(500);
const farD = await readDefocus();
// Sweep into the centre where the specimen sits: high defocus.
for (let i = 0; i <= 20; i++) {
  await page.mouse.move(40 + (600 * i) / 20, 40 + (360 * i) / 20, { steps: 2 });
  await sleep(20);
}
await page.mouse.move(640, 400, { steps: 12 });
await sleep(600);
const nearD = await readDefocus();
check(
  "cursor proximity raises DEFOCUS",
  Number.isFinite(farD) && Number.isFinite(nearD) && nearD > farD,
  `far=${farD}% near=${nearD}%`,
);

// ── Click on stage cycles the solid ─────────────────────────────────────────
await page.keyboard.press("1"); // reset to Cube
await sleep(300);
await page.mouse.click(900, 400);
await sleep(400);
check("click cycles solid (Cube -> Tetrahedron)", norm(await activeName()) === "Tetrahedron", norm(await activeName()));

// ── No console / page errors ────────────────────────────────────────────────
check("no console/page errors", consoleErrors.length === 0, consoleErrors.slice(0, 3).join(" | "));

await browser.close();
console.log(`\n${failures === 0 ? "ALL PASS" : failures + " FAILURE(S)"}`);
process.exit(failures === 0 ? 0 : 1);
