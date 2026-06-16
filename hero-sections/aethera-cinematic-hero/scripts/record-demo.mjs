/**
 * Custom demo recorder for the Aethera cinematic hero.
 *
 * The shared repo recorder (scripts/record-demos/record.mjs) only holds on the
 * hero — it can't show the new theme switch. This one boots `vite preview`
 * against the production build, records real-time (so the looping video
 * background and the 0.5s palette transition are captured live), and drives the
 * sequence: hold light -> toggle dark -> hold dark -> toggle light -> hold.
 *
 * Prereq: `npm run build` first, plus ffmpeg on PATH.
 * Usage:   node scripts/record-demo.mjs
 */
import { spawn } from "node:child_process";
import { execFileSync } from "node:child_process";
import { readdirSync, rmSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const PORT = 4318;
const URL = `http://localhost:${PORT}/`;
const OUT = path.resolve("demo.mp4");
const TMP = path.join(process.env.TMPDIR || "/tmp", "aethera-demo-rec");
const VW = 1280;
const VH = 800;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(url, attempts = 80) {
	for (let i = 0; i < attempts; i += 1) {
		try {
			if ((await fetch(url)).ok) return;
		} catch {
			/* not up yet */
		}
		await sleep(250);
	}
	throw new Error(`Preview server never came up at ${url}`);
}

const server = spawn(
	"npx",
	["vite", "preview", "--port", String(PORT), "--strictPort"],
	{ stdio: "ignore" },
);

try {
	await waitForServer(URL);
	rmSync(TMP, { recursive: true, force: true });
	mkdirSync(TMP, { recursive: true });

	const browser = await chromium.launch({ headless: true });
	const ctx = await browser.newContext({
		viewport: { width: VW, height: VH },
		recordVideo: { dir: TMP, size: { width: VW, height: VH } },
		// Start the recording from a clean light slate regardless of the host's
		// OS theme; the pre-paint script in index.html reads this.
		colorScheme: "light",
	});
	const page = await ctx.newPage();
	await page.goto(URL, { waitUntil: "load" });
	await page.evaluate(() => document.fonts && document.fonts.ready).catch(() => {});
	await sleep(2500); // let the hero settle + video fade in

	const toggle = page.locator("[data-theme-toggle]");

	// Light beauty pass.
	await page.mouse.move(VW * 0.35, VH * 0.5, { steps: 20 });
	await sleep(2000);

	// -> Dark, dwell.
	await toggle.click();
	await sleep(3500);
	await page.mouse.move(VW * 0.62, VH * 0.45, { steps: 25 });
	await sleep(1500);

	// -> Light, settle.
	await toggle.click();
	await sleep(2500);

	await page.close();
	await ctx.close();
	await browser.close();

	const webm = readdirSync(TMP)
		.filter((f) => f.endsWith(".webm"))
		.map((f) => ({ f, t: statSync(path.join(TMP, f)).mtimeMs }))
		.sort((a, b) => b.t - a.t)[0];
	if (!webm) throw new Error("No webm produced");

	execFileSync(
		"ffmpeg",
		[
			"-y",
			"-i", path.join(TMP, webm.f),
			"-r", "30",
			"-an",
			"-c:v", "libx264",
			"-preset", "slow",
			"-pix_fmt", "yuv420p",
			"-crf", "18",
			"-movflags", "+faststart",
			OUT,
		],
		{ stdio: "inherit" },
	);
	rmSync(TMP, { recursive: true, force: true });
	console.log(`DONE -> ${OUT}`);
} finally {
	server.kill("SIGTERM");
}
