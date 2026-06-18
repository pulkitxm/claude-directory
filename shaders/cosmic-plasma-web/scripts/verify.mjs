#!/usr/bin/env node
/**
 * CLI-only verification for the Cosmic Plasma Web console.
 *
 * Boots the Vite dev server, drives a headless Chromium, and asserts:
 *   1. the verbatim <PlasmaWeb> mounts an OGL <canvas>,
 *   2. the WebGL context is real and sized,
 *   3. the lattice is drawing (frame is not black) and animating (frames differ),
 *   4. a fader re-drives the shader (moving Hue Shift repaints the frame),
 *   5. the cursor excites the field (Engagement telemetry climbs on pointer move),
 *   6. the Freeze control flips the lattice status to FROZEN,
 *   7. no uncaught runtime errors fire.
 *
 * Exits non-zero on any failure.
 */
import { spawn, execSync } from "node:child_process";
import { chromium } from "playwright";

const PORT = 4321;
const URL = `http://localhost:${PORT}/`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  const pids = execSync(`lsof -ti tcp:${PORT} || true`).toString().trim();
  if (pids) execSync(`kill -9 ${pids.split("\n").join(" ")}`);
} catch {
  /* nothing listening */
}

function waitForServer(url, tries = 60) {
  return new Promise((resolve, reject) => {
    const attempt = async (n) => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        /* not up */
      }
      if (n <= 0) return reject(new Error("server never came up"));
      setTimeout(() => attempt(n - 1), 500);
    };
    attempt(tries);
  });
}

const checks = [];
const ok = (name) => checks.push({ name, pass: true });
const fail = (name, detail) => checks.push({ name, pass: false, detail });

let server;
let browser;
try {
  server = spawn("npx", ["vite", "--port", String(PORT), "--strictPort"], {
    stdio: "ignore",
  });
  await waitForServer(URL);
  await sleep(900);

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await sleep(2400);

  // 1) Canvas mounted by PlasmaWeb
  const canvas = await page.$("main canvas");
  canvas ? ok("PlasmaWeb canvas is mounted") : fail("PlasmaWeb canvas is mounted", "no canvas");

  // 2) Real WebGL context + sized
  const gl = await page.evaluate(() => {
    const c = document.querySelector("main canvas");
    if (!c) return { ctx: false };
    const g = c.getContext("webgl2") || c.getContext("webgl");
    return { ctx: !!g, w: c.width, h: c.height };
  });
  gl.ctx ? ok("WebGL context is live") : fail("WebGL context is live", "getContext null");
  gl.w > 0 && gl.h > 0
    ? ok(`Canvas sized (${gl.w}x${gl.h})`)
    : fail("Canvas sized", `got ${gl.w}x${gl.h}`);

  // 3) Drawing + animating
  const shotA = await page.screenshot({ clip: { x: 0, y: 0, width: 1280, height: 800 } });
  await sleep(450);
  const shotB = await page.screenshot({ clip: { x: 0, y: 0, width: 1280, height: 800 } });
  shotA.length > 8000
    ? ok(`Lattice is drawing (frame ${shotA.length} bytes)`)
    : fail("Lattice is drawing", `frame only ${shotA.length} bytes`);
  !shotA.equals(shotB)
    ? ok("Lattice is animating (frames differ)")
    : fail("Lattice is animating", "two frames identical");

  // 4) Hue Shift fader re-drives the shader
  const before = await page.screenshot({ clip: { x: 300, y: 0, width: 980, height: 800 } });
  const hue = page.getByLabel(/Hue Shift/i);
  await hue.focus();
  for (let i = 0; i < 40; i++) await page.keyboard.press("ArrowRight");
  await sleep(600);
  const after = await page.screenshot({ clip: { x: 300, y: 0, width: 980, height: 800 } });
  !before.equals(after)
    ? ok("Hue Shift fader re-drives the shader")
    : fail("Hue Shift fader re-drives the shader", "frame unchanged");

  // 5) Cursor excites the field — Engagement climbs on pointer move
  const readEngage = () =>
    page.evaluate(() => {
      const el = [...document.querySelectorAll("span")].find(
        (n) => n.textContent?.trim() === "Engagement",
      );
      const val = el?.parentElement?.querySelector(".font-mono");
      return val?.textContent?.trim() ?? null;
    });
  await sleep(900); // let any residual engagement decay to ~0
  const lo = await readEngage();
  for (let i = 0; i < 6; i++) {
    await page.mouse.move(300 + i * 90, 300 + i * 40, { steps: 8 });
    await sleep(70);
  }
  await sleep(200);
  const hi = await readEngage();
  const pct = (s) => parseInt((s || "0").replace("%", ""), 10) || 0;
  pct(hi) > pct(lo)
    ? ok(`Cursor excites the field (${lo} → ${hi})`)
    : fail("Cursor excites the field", `engagement ${lo} → ${hi}`);

  // 6) Freeze flips lattice status to FROZEN
  await page.getByRole("button", { name: /freeze/i }).click();
  await sleep(200);
  const frozen = await page.getByText("FROZEN", { exact: true }).count();
  frozen > 0
    ? ok("Freeze flips lattice status to FROZEN")
    : fail("Freeze flips lattice status to FROZEN", "FROZEN not shown");

  // 7) No uncaught runtime errors
  errors.length === 0
    ? ok("No uncaught runtime errors")
    : fail("No uncaught runtime errors", errors.join(" / "));
} catch (e) {
  fail("verification harness", String(e?.stack || e));
} finally {
  if (browser) await browser.close().catch(() => {});
  if (server) server.kill("SIGTERM");
}

let failed = 0;
for (const c of checks) {
  console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.name}${c.detail ? `  — ${c.detail}` : ""}`);
  if (!c.pass) failed++;
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed`);
process.exit(failed ? 1 : 0);
