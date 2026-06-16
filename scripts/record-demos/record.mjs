#!/usr/bin/env node
/**
 * Record a demo.mp4 for a single, already-running Vite dev server.
 *
 * The page is auto-classified:
 *   - SCROLLABLE: captures a deterministic PNG sequence while smoothly scrolling
 *     top -> bottom -> top, then encodes it at a locked frame rate. Because every
 *     output frame is rendered and screenshotted explicitly, motion is perfectly
 *     smooth (no dropped/variable frames). CSS `scroll-behavior` is forced to
 *     `auto` so the page's own smooth-scrolling can't fight our easing.
 *   - STATIC: records real-time video (Playwright) and holds on the hero with
 *     gentle pointer movement, so CSS/JS animations and video backgrounds are
 *     captured live.
 *
 * Both paths emit an .mp4 via ffmpeg, which must be on PATH.
 *
 * Usage:
 *   node record.mjs --url http://localhost:5199/ --out /abs/path/demo.mp4 \
 *                   --tmp /tmp/demo-rec-foo [--fps 30]
 *
 * Tuning knobs live in CONFIG below.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const CONFIG = {
	viewport: { width: 1280, height: 800 }, // capture size (also the page layout width)
	fps: 30,
	scroll: {
		secondsPerScreen: 4.0, // higher = slower scroll
		downMin: 9,
		downMax: 21, // cap so very tall pages don't drag
		upRatio: 0.6, // return scroll duration relative to the down scroll
		upMin: 6,
		upMax: 13,
		holdTop: 0.8,
		holdBottom: 1.0,
		holdEnd: 0.6,
	},
	// A page counts as scrollable when it extends more than this fraction of a
	// viewport beyond the fold. Kept low so pages with a modest amount of real
	// below-the-fold content (e.g. a hero plus a "trusted by" strip) take the
	// smooth deterministic scroll path instead of real-time video capture.
	scrollableThreshold: 0.15,
};

const args = Object.fromEntries(
	process.argv.slice(2).reduce((acc, cur, i, arr) => {
		if (cur.startsWith("--")) acc.push([cur.slice(2), arr[i + 1]]);
		return acc;
	}, []),
);

const URL = args.url || "http://localhost:5173/";
const OUT = args.out;
const TMP = args.tmp || path.join(process.env.TMPDIR || "/tmp", "demo-rec");
const FPS = Number(args.fps) || CONFIG.fps;
const { width: VW, height: VH } = CONFIG.viewport;

if (!OUT) {
	console.error("Missing required --out <demo.mp4>");
	process.exit(2);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ease = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t); // easeInOutSine
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

async function settleLoad(page) {
	try {
		await page.waitForLoadState("networkidle", { timeout: 12000 });
	} catch {}
	try {
		await page.evaluate(() => document.fonts && document.fonts.ready);
	} catch {}
}

const measure = (page) =>
	page.evaluate(() => {
		const doc = document.documentElement;
		return {
			scrollHeight: Math.max(
				document.body.scrollHeight,
				doc.scrollHeight,
				document.body.offsetHeight,
				doc.offsetHeight,
			),
			innerHeight: window.innerHeight,
		};
	});

// Poll until the page height stops changing (late-laying-out / lazy content).
async function stabilize(page) {
	let m = await measure(page);
	let stable = 0;
	for (let i = 0; i < 20; i++) {
		await sleep(400);
		const n = await measure(page);
		if (n.scrollHeight === m.scrollHeight) {
			if (++stable >= 3) break;
		} else stable = 0;
		m = n;
	}
	return m;
}

function resetTmp() {
	fs.rmSync(TMP, { recursive: true, force: true });
	fs.mkdirSync(TMP, { recursive: true });
}

async function recordScrollable(browser) {
	// Fresh context (deps already optimized by the warm-up pass -> single clean load).
	const ctx = await browser.newContext({ viewport: { width: VW, height: VH } });
	const page = await ctx.newPage();
	await page.goto(URL, { waitUntil: "load", timeout: 60000 });
	await settleLoad(page);
	// Defuse the page's own smooth scrolling so our positions apply instantly.
	await page.addStyleTag({
		content: "*, html, body { scroll-behavior: auto !important; }",
	});
	const m = await stabilize(page);
	await sleep(1500); // let hero/intro settle before the first frame
	// Let any fade-in / WebGL warm-up finish on the REAL clock before we freeze
	// time for capture. CSS transitions are compositor-driven and complete here;
	// the opacity probe is best-effort and a no-op on pages with no hero canvas.
	await page
		.waitForFunction(
			() => {
				const el = document.getElementById("hero-canvas");
				return !el || getComputedStyle(el).opacity === "1";
			},
			{ timeout: 8000 },
		)
		.catch(() => {});
	await sleep(600);

	const distance = Math.max(0, m.scrollHeight - m.innerHeight);
	const screens = m.innerHeight > 0 ? distance / m.innerHeight : 0;
	const s = CONFIG.scroll;
	const downSec = clamp(screens * s.secondsPerScreen, s.downMin, s.downMax);
	const upSec = clamp(downSec * s.upRatio, s.upMin, s.upMax);

	resetTmp();

	// --- Deterministic animation clock -------------------------------------
	// Time-based animations advance on either performance.now()+rAF (WebGL
	// shaders, canvas loops, framer-motion) or setTimeout/setInterval (e.g. a
	// typewriter placeholder). A real screenshot takes an uneven amount of wall
	// time and the whole deterministic pass spans real minutes, so anything left
	// on the real clock either judders (uneven rAF sampling) or races (timers
	// firing in real time, then compressed into a short playback). So we freeze
	// ALL of the page's clocks and advance them by exactly one frame (1000/FPS ms)
	// per screenshot: rAF renders one generation, and any timers due in that slice
	// fire in order. Every encoded frame is then an even slice of animation time,
	// so playback matches the live page. Installed AFTER warm-up so load / texture
	// decode / fade-in all run on the real clock first.
	await page.evaluate(() => {
		const w = window;
		const realNow = performance.now();
		let vnow = realNow;
		let raf = []; // queued requestAnimationFrame callbacks
		let timers = []; // virtual setTimeout / setInterval entries
		let id = 1;

		performance.now = () => vnow;
		w.requestAnimationFrame = (cb) => {
			const i = id++;
			raf.push({ i, cb });
			return i;
		};
		w.cancelAnimationFrame = (i) => {
			raf = raf.filter((e) => e.i !== i);
		};
		w.setTimeout = (cb, delay, ...a) => {
			const i = id++;
			timers.push({ i, due: vnow + Math.max(0, +delay || 0), cb: () => cb(...a) });
			return i;
		};
		w.setInterval = (cb, delay, ...a) => {
			const i = id++;
			const every = Math.max(1, +delay || 0);
			timers.push({ i, due: vnow + every, every, cb: () => cb(...a) });
			return i;
		};
		w.clearTimeout = (i) => {
			timers = timers.filter((e) => e.i !== i);
		};
		w.clearInterval = w.clearTimeout;

		const base = Date.now();
		Date.now = () => base + (vnow - realNow);

		w.__rec = {
			// Advance virtual time by ms, firing timers due in that slice in
			// chronological order (and any they schedule). Capped so a pathological
			// fast interval can't spin forever.
			advance: (ms) => {
				const target = vnow + ms;
				for (let guard = 0; guard < 10000; guard++) {
					let next = null;
					for (const t of timers)
						if (t.due <= target && (!next || t.due < next.due)) next = t;
					if (!next) break;
					vnow = next.due;
					if (next.every == null) timers = timers.filter((t) => t !== next);
					else next.due += next.every;
					try {
						next.cb();
					} catch (_) {}
				}
				vnow = target;
			},
			// Run the rAF callbacks queued so far once, at the current virtual
			// time. Self-rescheduling loops re-register into the next generation,
			// so this renders exactly one frame per call.
			flush: () => {
				const due = raf;
				raf = [];
				for (const e of due) {
					try {
						e.cb(vnow);
					} catch (_) {}
				}
				return due.length;
			},
		};
	});
	// Let the renderer's in-flight (real) rAF fire once and hand its loop off
	// into our virtual queue before we start stepping.
	await sleep(150);

	const DT = 1000 / FPS;
	let frame = 0;
	const pad = (n) => String(n).padStart(5, "0");
	const setY = (y) =>
		page.evaluate((yy) => window.scrollTo(0, yy), Math.round(y));
	// One output frame: park the scroll, advance the virtual clock by exactly one
	// frame, render that frame, screenshot.
	const step = async (y) => {
		await setY(y);
		await page.evaluate((dt) => {
			window.__rec.advance(dt);
			window.__rec.flush();
		}, DT);
		await page.screenshot({ path: path.join(TMP, pad(frame) + ".png") });
		frame++;
	};

	// Holds park the scroll but keep the shader animating (no frozen duplicates).
	const hold = async (y, sec) => {
		const n = Math.max(1, Math.round(sec * FPS));
		for (let i = 0; i < n; i++) await step(y);
	};
	const scroll = async (from, to, sec) => {
		const n = Math.max(1, Math.round(sec * FPS));
		for (let i = 1; i <= n; i++) await step(from + (to - from) * ease(i / n));
	};

	console.log(
		`SCROLLABLE distance=${distance} screens=${screens.toFixed(2)} down=${downSec.toFixed(1)}s up=${upSec.toFixed(1)}s`,
	);
	await hold(0, s.holdTop);
	await scroll(0, distance, downSec);
	await hold(distance, s.holdBottom);
	await scroll(distance, 0, upSec);
	await hold(0, s.holdEnd);
	await ctx.close();

	encode(["-framerate", String(FPS), "-i", path.join(TMP, "%05d.png")]);
	fs.rmSync(TMP, { recursive: true, force: true });
	console.log(`DONE -> ${OUT} (${frame} frames @ ${FPS}fps)`);
}

async function recordStatic(browser) {
	resetTmp();
	const ctx = await browser.newContext({
		viewport: { width: VW, height: VH },
		recordVideo: { dir: TMP, size: { width: VW, height: VH } },
	});
	const page = await ctx.newPage();
	await page.goto(URL, { waitUntil: "load", timeout: 60000 });
	await settleLoad(page);
	await stabilize(page);
	await sleep(2000);
	console.log("STATIC: holding to capture animations");
	await page.mouse.move(VW * 0.3, VH * 0.5, { steps: 20 });
	await sleep(2500);
	await page.mouse.move(VW * 0.7, VH * 0.45, { steps: 25 });
	await sleep(2500);
	await page.mouse.move(VW * 0.5, VH * 0.5, { steps: 20 });
	await sleep(3500);
	await page.close();
	await ctx.close();

	const webm = fs
		.readdirSync(TMP)
		.filter((f) => f.endsWith(".webm"))
		.map((f) => ({ f, t: fs.statSync(path.join(TMP, f)).mtimeMs }))
		.sort((a, b) => b.t - a.t)[0];
	if (!webm) {
		console.error("No webm produced");
		process.exit(3);
	}

	encode(["-i", path.join(TMP, webm.f), "-r", "30", "-an"]);
	fs.rmSync(TMP, { recursive: true, force: true });
	console.log(`DONE -> ${OUT} (static)`);
}

function encode(inputArgs) {
	execFileSync(
		"ffmpeg",
		[
			"-y",
			...inputArgs,
			"-c:v",
			"libx264",
			"-preset",
			"slow",
			"-pix_fmt",
			"yuv420p",
			"-crf",
			"18",
			"-movflags",
			"+faststart",
			OUT,
		],
		{ stdio: "inherit" },
	);
}

async function main() {
	fs.mkdirSync(path.dirname(OUT), { recursive: true });
	const browser = await chromium.launch({ headless: true });

	// Warm-up + measure (no recording). The reload absorbs Vite's first-load
	// dependency-optimization full reload so it never lands in the recording.
	const warm = await browser.newContext({
		viewport: { width: VW, height: VH },
	});
	const wp = await warm.newPage();
	await wp.goto(URL, { waitUntil: "load", timeout: 60000 });
	await sleep(1500);
	try {
		await wp.reload({ waitUntil: "load", timeout: 60000 });
	} catch {}
	await settleLoad(wp);
	const metrics = await stabilize(wp);
	await warm.close();

	const distance = metrics.scrollHeight - metrics.innerHeight;
	const scrollable =
		distance > metrics.innerHeight * CONFIG.scrollableThreshold;

	if (scrollable) await recordScrollable(browser);
	else await recordStatic(browser);

	await browser.close();
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
