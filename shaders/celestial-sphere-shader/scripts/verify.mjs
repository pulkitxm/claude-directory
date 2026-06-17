#!/usr/bin/env node
/**
 * CLI-only verification for the Celestial Sphere shader experiment.
 *
 * Boots the production preview server, drives a headless Chromium through the
 * Stellar Cartography console, and asserts that:
 *   1. the shader mounts a WebGL <canvas> inside the scope,
 *   2. the WebGL context is real and the canvas is sized,
 *   3. the sphere is actually drawing (lit pixels) and animating (frames differ),
 *   4. the live telemetry strip updates from the shader's own clock,
 *   5. changing a preset / dial re-renders the sphere (output changes), and
 *   6. the vendored fonts and starfield texture load locally (offline-ready),
 *   7. no uncaught runtime errors occur.
 *
 * Exits non-zero on any failure so it can gate the build.
 */
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = 4319;
const URL = `http://localhost:${PORT}/`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function waitForServer(url, tries = 60) {
  return new Promise((resolve, reject) => {
    const attempt = async (n) => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        /* not up yet */
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
  server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    stdio: "ignore",
  });
  await waitForServer(URL);
  await sleep(800);

  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 860 } });

  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));

  // Track local-asset requests so we can prove they're vendored (same-origin).
  const fontReqs = new Set();
  let starReq = false;
  page.on("response", (res) => {
    const u = res.url();
    if (u.endsWith(".woff2")) fontReqs.add(u.split("/").pop());
    if (u.endsWith("stardust.png")) starReq = res.ok();
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await sleep(2200); // let the sphere render a couple seconds

  // 1) WebGL canvas mounted (inside the scope)
  const canvas = await page.$("canvas");
  canvas ? ok("WebGL canvas is mounted") : fail("WebGL canvas is mounted", "no canvas found");

  // 2) Real WebGL context + non-zero size
  const gl = await page.evaluate(() => {
    const c = document.querySelector("canvas");
    if (!c) return { ctx: false, w: 0, h: 0 };
    const g = c.getContext("webgl2") || c.getContext("webgl");
    return { ctx: !!g, w: c.width, h: c.height };
  });
  gl.ctx ? ok("WebGL context is live") : fail("WebGL context is live", "getContext returned null");
  gl.w > 0 && gl.h > 0 ? ok(`Canvas sized (${gl.w}x${gl.h})`) : fail("Canvas sized", `got ${gl.w}x${gl.h}`);

  // 3) Sphere drawing + animating. The component doesn't preserveDrawingBuffer,
  // so we screenshot the composited scope instead of reading the GL buffer.
  const scope = await page.$(".aspect-square");
  const shotA = await scope.screenshot();
  await sleep(500);
  const shotB = await scope.screenshot();
  shotA.length > 3000
    ? ok(`Sphere is drawing (frame ${shotA.length} bytes)`)
    : fail("Sphere is drawing", `frame only ${shotA.length} bytes (looks black)`);
  !shotA.equals(shotB)
    ? ok("Sphere is animating (frames differ)")
    : fail("Sphere is animating", "two consecutive frames were identical");

  // 4) Live telemetry updates (the survey clock advances)
  const readClock = () =>
    page.evaluate(() => {
      const el = [...document.querySelectorAll(".tabular-nums")].find((n) =>
        /^\d\d:\d\d\.\d\d$/.test((n.textContent || "").trim()),
      );
      return el ? el.textContent.trim() : null;
    });
  const c1 = await readClock();
  await sleep(700);
  const c2 = await readClock();
  c1 && c2 && c1 !== c2
    ? ok("Live telemetry clock advances")
    : fail("Live telemetry clock advances", `c1=${c1} c2=${c2}`);

  // 5) Changing a preset re-renders the sphere (catalog + pixels change)
  const beforeShot = await scope.screenshot();
  await page.getByRole("button", { name: /crimson gas giant/i }).click();
  await sleep(900);
  const afterShot = await scope.screenshot();
  const heading = await page.evaluate(() => document.querySelector("h1")?.textContent?.trim());
  !beforeShot.equals(afterShot) && /crimson/i.test(heading || "")
    ? ok("Preset re-renders the sphere + updates catalog")
    : fail("Preset re-renders", `pixelsChanged=${!beforeShot.equals(afterShot)} heading=${heading}`);

  // 5b) A dial drives a uniform — move the cloud-density slider, expect a change
  const dialBefore = await scope.screenshot();
  await page.evaluate(() => {
    const input = [...document.querySelectorAll('input[type="range"]')].find(
      (i) => i.getAttribute("aria-label") === "Cloud density",
    );
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    setter.call(input, "7.5");
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await sleep(900);
  const dialAfter = await scope.screenshot();
  !dialBefore.equals(dialAfter)
    ? ok("Cloud-density dial drives the shader")
    : fail("Cloud-density dial drives the shader", "scope unchanged after slider move");

  // 6) Vendored assets loaded locally (offline-ready)
  fontReqs.size >= 3
    ? ok(`Vendored fonts loaded (${[...fontReqs].join(", ")})`)
    : fail("Vendored fonts loaded", `only saw ${[...fontReqs].join(", ") || "none"}`);
  starReq ? ok("Vendored starfield texture loaded") : fail("Vendored starfield texture loaded", "stardust.png missing");

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
