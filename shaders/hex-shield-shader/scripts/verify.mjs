#!/usr/bin/env node
/**
 * CLI-only verification for the AEGIS hex-shield deflector console.
 *
 * Boots the production preview server, drives a headless Chromium through the
 * page, and asserts that:
 *   1. the shader <canvas> is mounted in the hero,
 *   2. the WebGL context is real and the canvas is sized,
 *   3. the dome is actually drawing (the composited frame is far heavier than
 *      an all-black page),
 *   4. the dome is animating (two frames a moment apart differ),
 *   5. a fader re-drives the shader (boosting Arc Gain repaints the frame),
 *   6. a deflector profile preset repaints the frame ("Breach Alert"),
 *   7. the FREEZE control halts the shield clock (the CLK readout stops),
 *   8. RESUME restarts it,
 *   9. cursor motion drives the impact charge telemetry, and
 *  10. no uncaught runtime errors fire.
 *
 * Exits non-zero on any failure so it can gate the build.
 */
import { spawn, execSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { chromium } from "playwright";

// Resolve a usable Chromium executable. In this sandbox the Playwright CDN is
// blocked, but a prebuilt Chromium ships under PLAYWRIGHT_BROWSERS_PATH; point
// the launcher straight at it so the verify runs regardless of which browser
// build the installed playwright package expects.
function resolveChromium() {
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  if (!existsSync(root)) return undefined;
  let dirs;
  try {
    dirs = readdirSync(root).filter((d) => d.startsWith("chromium-"));
  } catch {
    return undefined;
  }
  for (const d of dirs) {
    const candidate = `${root}/${d}/chrome-linux/chrome`;
    if (existsSync(candidate)) return candidate;
  }
  return undefined;
}

const PORT = 4327;
const URL = `http://localhost:${PORT}/`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Free the port up front so a leftover preview can't hold it.
try {
  const pids = execSync(`lsof -ti tcp:${PORT} || true`).toString().trim();
  if (pids) execSync(`kill -9 ${pids.split("\n").join(" ")}`);
} catch {
  /* nothing listening — fine */
}

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

// Read the field-clock readout (mm:ss.cc) from the hero telemetry strip.
const readClock = (page) =>
  page.evaluate(() => {
    const el = [...document.querySelectorAll(".tabular-nums")].find((n) =>
      /^\d{2}:\d{2}\.\d{2}$/.test(n.textContent?.trim() ?? ""),
    );
    return el?.textContent?.trim() ?? null;
  });

let server;
let browser;
try {
  server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    stdio: "ignore",
  });
  await waitForServer(URL);
  await sleep(800);

  const executablePath = resolveChromium();
  browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  // The hero canvas repaints every frame, so Playwright's default actionability
  // "stability" wait can stall. We drive the deck through evaluate() instead and
  // keep per-call timeouts modest.
  page.setDefaultTimeout(15000);
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await sleep(2400); // let the dome render a couple of seconds

  // Smaller clip = far cheaper GPU readback under software GL. A 560x360 window
  // over the dome still captures plenty of moving hexes to diff.
  const DOME = { x: 360, y: 120, width: 560, height: 360 };
  const shoot = () => page.screenshot({ clip: DOME });

  // Set a React-controlled range input by value and fire a native input event
  // (deterministic; no keyboard timing against the animating page).
  const setRange = (label, value) =>
    page.evaluate(
      ({ label, value }) => {
        const el = document.querySelector(`input[aria-label="${label}"]`);
        if (!el) return false;
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        ).set;
        setter.call(el, String(value));
        el.dispatchEvent(new Event("input", { bubbles: true }));
        return true;
      },
      { label, value },
    );

  // Click a button by its (case-insensitive) text via evaluate — bypasses the
  // actionability stall on the constantly-repainting page.
  const clickButton = (re) =>
    page.evaluate((source) => {
      const rx = new RegExp(source, "i");
      const btn = [...document.querySelectorAll("button")].find((b) =>
        rx.test(b.textContent?.trim() ?? ""),
      );
      if (!btn) return false;
      btn.click();
      return true;
    }, re.source);

  // 1) Shader canvas mounted in the hero
  const canvas = await page.$("section canvas");
  canvas ? ok("Shader canvas is mounted") : fail("Shader canvas is mounted", "no canvas found");

  // 2) Real WebGL context + sized
  const gl = await page.evaluate(() => {
    const c = document.querySelector("section canvas");
    if (!c) return { ctx: false };
    const g = c.getContext("webgl2") || c.getContext("webgl");
    return { ctx: !!g, w: c.width, h: c.height };
  });
  gl.ctx ? ok("WebGL context is live") : fail("WebGL context is live", "getContext returned null");
  gl.w > 0 && gl.h > 0
    ? ok(`Canvas sized (${gl.w}x${gl.h})`)
    : fail("Canvas sized", `got ${gl.w}x${gl.h}`);

  // 3) Dome is drawing + 4) animating (composited screenshots — no
  // preserveDrawingBuffer, so the compositor shot captures the real frame).
  const shotA = await shoot();
  await sleep(500);
  const shotB = await shoot();
  shotA.length > 6000
    ? ok(`Dome is drawing (frame ${shotA.length} bytes)`)
    : fail("Dome is drawing", `frame only ${shotA.length} bytes (looks black)`);
  !shotA.equals(shotB)
    ? ok("Dome is animating (frames differ)")
    : fail("Dome is animating", "two frames were identical");

  // 5) A fader re-drives the shader — freeze first so the diff is purely the
  // uniform change (not the ongoing animation), then push Arc Gain to its max.
  (await clickButton(/freeze field/i))
    ? ok("Freeze control responds")
    : fail("Freeze control responds", "no freeze button found");
  await sleep(400);
  const before = await shoot();
  const gainSet = await setRange("Arc Gain", 2.2);
  await sleep(500);
  const after = await shoot();
  gainSet
    ? ok("Arc Gain fader exists")
    : fail("Arc Gain fader exists", "no input[aria-label='Arc Gain']");
  !before.equals(after)
    ? ok("Arc Gain fader re-drives the shader (frozen frame changed)")
    : fail("Arc Gain fader re-drives the shader", "frozen frame unchanged after moving gain");

  // 6) A deflector profile preset repaints the (still-frozen) frame.
  const preBreach = await shoot();
  const breachOk = await clickButton(/breach alert/i);
  await sleep(500);
  const postBreach = await shoot();
  breachOk && !preBreach.equals(postBreach)
    ? ok('"Breach Alert" profile repaints the dome')
    : fail('"Breach Alert" profile repaints the dome', `clicked=${breachOk}, frame ${preBreach.equals(postBreach) ? "unchanged" : "changed"}`);

  // 7) The clock is held while frozen.
  const t1 = await readClock(page);
  await sleep(900);
  const t2 = await readClock(page);
  t1 && t2 && t1 === t2
    ? ok(`Freeze halts the shield clock (held ${t1})`)
    : fail("Freeze halts the shield clock", `t1=${t1} t2=${t2}`);

  // 8) RESUME restarts the clock.
  (await clickButton(/resume field/i))
    ? ok("Resume control responds")
    : fail("Resume control responds", "no resume button found");
  const t3 = await readClock(page);
  await sleep(900);
  const t4 = await readClock(page);
  t3 && t4 && t3 !== t4
    ? ok(`Resume restarts the clock (${t3} -> ${t4})`)
    : fail("Resume restarts the clock", `t3=${t3} t4=${t4}`);

  // 9) Cursor motion drives the impact charge telemetry. Read the hero "charge"
  // readout, which climbs as the pointer nears the dome centre.
  const readCharge = () =>
    page.evaluate(() => {
      const labels = [...document.querySelectorAll("span")];
      const el = labels.find((n) => n.textContent?.trim() === "charge");
      const val = el?.parentElement?.querySelector(".tabular-nums");
      return val?.textContent?.trim() ?? null;
    });
  await page.mouse.move(60, 760, { steps: 4 });
  await sleep(400);
  const cLo = await readCharge();
  await page.mouse.move(640, 360, { steps: 30 }); // sweep toward dome centre
  await sleep(700);
  const cHi = await readCharge();
  cLo !== null && cHi !== null && cLo !== cHi
    ? ok(`Cursor drives impact charge (${cLo} -> ${cHi})`)
    : fail("Cursor drives impact charge", `charge unchanged (${cLo} / ${cHi})`);

  // 10) No uncaught runtime errors
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
