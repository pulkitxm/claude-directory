/**
 * Headless, CLI-only verification for the animated-dots-rain experiment.
 *
 * Boots the Vite dev server, drives a headless Chromium through the page, and
 * asserts:
 *   - the page loads with no console errors / failed requests,
 *   - the verbatim AnimatedDots component mounts a <canvas>,
 *   - the canvas is actually animating (its pixels change frame-to-frame),
 *   - the control-deck preview re-renders when props change,
 *   - the key showcase sections are present,
 *   - the props API documents the component's full surface.
 *
 * Usage: node scripts/verify.mjs
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";

const PORT = 5249;
const URL = `http://localhost:${PORT}/`;

function startDev() {
	const proc = spawn("npx", ["vite", "--port", String(PORT), "--strictPort"], {
		cwd: process.cwd(),
		stdio: ["ignore", "pipe", "pipe"],
	});
	return proc;
}

async function waitForServer(proc) {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(
			() => reject(new Error("dev server did not start in 40s")),
			40000,
		);
		const onData = (buf) => {
			const s = buf.toString();
			if (s.includes("Local:") || s.includes(`localhost:${PORT}`)) {
				clearTimeout(timer);
				resolve();
			}
		};
		proc.stdout.on("data", onData);
		proc.stderr.on("data", onData);
		proc.on("exit", (code) =>
			reject(new Error(`dev server exited early (code ${code})`)),
		);
	});
}

const checks = [];
const record = (name, ok, detail = "") => {
	checks.push({ name, ok, detail });
	console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
};

let dev;
let browser;
try {
	dev = startDev();
	await waitForServer(dev);
	await wait(1200); // let the optimizer settle

	browser = await chromium.launch({ headless: true });
	const ctx = await browser.newContext({
		viewport: { width: 1280, height: 800 },
	});
	const page = await ctx.newPage();

	const consoleErrors = [];
	const failedRequests = [];
	page.on("console", (m) => {
		if (m.type() === "error") consoleErrors.push(m.text());
	});
	page.on("requestfailed", (r) =>
		failedRequests.push(`${r.url()} (${r.failure()?.errorText})`),
	);

	await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
	await page.waitForLoadState("networkidle");
	await wait(700);

	// 1. Title + hero headline.
	const title = await page.title();
	record("page title set", /Animated Dots/.test(title), title);
	const heroH1 = await page
		.locator("h1", { hasText: "Animated Dots" })
		.count();
	record("hero headline renders", heroH1 >= 1, `${heroH1} match(es)`);

	// 2. AnimatedDots mounts a <canvas>.
	const canvasCount = await page.locator("canvas").count();
	record("AnimatedDots mounts canvas(es)", canvasCount >= 1, `${canvasCount}`);

	// 3. The hero canvas is actually animating: sample its pixels twice.
	const animating = await page.evaluate(async () => {
		const c = document.querySelector("canvas");
		if (!c) return { ok: false, reason: "no canvas" };
		const sample = () => {
			const off = document.createElement("canvas");
			off.width = Math.min(c.width, 160);
			off.height = Math.min(c.height, 160);
			const octx = off.getContext("2d");
			octx.drawImage(c, 0, 0, off.width, off.height);
			const d = octx.getImageData(0, 0, off.width, off.height).data;
			// cheap rolling checksum
			let sum = 0;
			for (let i = 0; i < d.length; i += 97) sum = (sum + d[i]) % 1e9;
			return sum;
		};
		const a = sample();
		await new Promise((r) => setTimeout(r, 600));
		const b = sample();
		return { ok: a !== b, a, b };
	});
	record(
		"canvas is animating (pixels change)",
		!!animating.ok,
		animating.reason ?? `checksum ${animating.a} -> ${animating.b}`,
	);

	// 4. Control deck re-renders preview when a prop changes.
	await page.locator("#deck").scrollIntoViewIfNeeded();
	await wait(400);
	const colInput = page
		.locator('label:has-text("Columns") input[type="range"]')
		.first();
	const before = await colInput.inputValue();
	await colInput.fill("140");
	await page.dispatchEvent(
		'label:has-text("Columns") input[type="range"]',
		"input",
	);
	await wait(300);
	const after = await colInput.inputValue();
	record(
		"control deck fader updates value",
		before !== after && after === "140",
		`${before} -> ${after}`,
	);

	// 5. Live-usage snippet reflects the changed prop.
	const usageHasDots = await page
		.locator("code", { hasText: "dotsNum={140}" })
		.count();
	record("live usage snippet reflects props", usageHasDots >= 1);

	// 6. Blend-mode toggle switches the active button.
	await page.locator('button:has-text("lighter")').first().click();
	await wait(200);
	const usageHasLighter = await page
		.locator("code", { hasText: 'blendMode="lighter"' })
		.count();
	record("blend-mode control updates usage", usageHasLighter >= 1);

	// 7. Required showcase sections exist.
	for (const id of ["deck", "integrate", "api"]) {
		const present = (await page.locator(`#${id}`).count()) >= 1;
		record(`section #${id} present`, present);
	}

	// 8. Props table lists the component's real props.
	const propCount = await page.evaluate(() => {
		const names = [
			"dotsNum",
			"dotRadius",
			"dotSpacing",
			"speedRange",
			"backgroundColor",
			"opacity",
			"blendMode",
			"fullScreen",
			"colors",
		];
		const text = document.body.innerText;
		return names.filter((n) => text.includes(n)).length;
	});
	record("props API documents the surface", propCount >= 9, `${propCount}/9`);

	// 9. No console errors / failed requests (assets all resolve offline).
	record(
		"no console errors",
		consoleErrors.length === 0,
		consoleErrors.slice(0, 3).join(" | "),
	);
	record(
		"no failed requests",
		failedRequests.length === 0,
		failedRequests.slice(0, 3).join(" | "),
	);

	await ctx.close();
} catch (err) {
	record("verification harness", false, String(err));
} finally {
	if (browser) await browser.close();
	if (dev) dev.kill("SIGTERM");
}

const failed = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
process.exit(failed.length === 0 ? 0 : 1);
