/**
 * Headless, CLI-only verification for the gradient-dots-background experiment.
 *
 * Boots the Vite dev server, drives a headless Chromium through the page, and
 * asserts:
 *   - the page loads with no console errors / failed requests,
 *   - the verbatim GradientDots layer mounts and paints its layered gradients,
 *   - framer-motion is actually animating (backgroundPosition advances),
 *   - the control-deck preview re-renders when props change,
 *   - the key showcase sections are present.
 *
 * Usage: node scripts/verify.mjs
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";

const PORT = 5247;
const URL = `http://localhost:${PORT}/`;

function startDev() {
	const proc = spawn(
		"npx",
		["vite", "--port", String(PORT), "--strictPort"],
		{ cwd: process.cwd(), stdio: ["ignore", "pipe", "pipe"] },
	);
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
	const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
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
	await wait(600);

	// 1. Title + hero headline.
	const title = await page.title();
	record("page title set", /Gradient Dots/.test(title), title);
	const heroH1 = await page.locator("h1", { hasText: "Gradient Dots" }).count();
	record("hero headline renders", heroH1 >= 1, `${heroH1} match(es)`);

	// 2. GradientDots layer mounts with its layered radial-gradient paint.
	const dotsLayer = await page.evaluate(() => {
		const candidates = Array.from(document.querySelectorAll("div"));
		const el = candidates.find((d) => {
			const s = getComputedStyle(d);
			return (
				s.position === "absolute" &&
				/radial-gradient/.test(s.backgroundImage) &&
				(s.backgroundImage.match(/radial-gradient/g) || []).length >= 4
			);
		});
		if (!el) return null;
		const s = getComputedStyle(el);
		return {
			layers: (s.backgroundImage.match(/radial-gradient/g) || []).length,
			pos: s.backgroundPosition,
			size: s.backgroundSize,
		};
	});
	record(
		"GradientDots paints layered radial-gradients",
		!!dotsLayer && dotsLayer.layers >= 6,
		dotsLayer ? `${dotsLayer.layers} radial-gradient layers` : "layer not found",
	);

	// 3. framer-motion is animating: background-position changes over time.
	const motionAnimating = await page.evaluate(async () => {
		const find = () =>
			Array.from(document.querySelectorAll("div")).find((d) => {
				const s = getComputedStyle(d);
				return (
					s.position === "absolute" &&
					(s.backgroundImage.match(/radial-gradient/g) || []).length >= 6
				);
			});
		const el = find();
		if (!el) return false;
		const a = getComputedStyle(el).backgroundPosition;
		await new Promise((r) => setTimeout(r, 700));
		const b = getComputedStyle(el).backgroundPosition;
		return a !== b;
	});
	record("framer-motion animation is live", motionAnimating);

	// 4. Control deck re-renders preview when a prop changes.
	await page.locator("#deck").scrollIntoViewIfNeeded();
	await wait(400);
	const spacingLabel = await page
		.locator('label:has-text("Spacing") input[type="range"]')
		.first();
	const before = await spacingLabel.inputValue();
	await spacingLabel.fill("24");
	await page.dispatchEvent(
		'label:has-text("Spacing") input[type="range"]',
		"input",
	);
	await wait(300);
	const after = await spacingLabel.inputValue();
	record(
		"control deck fader updates value",
		before !== after && after === "24",
		`${before} -> ${after}`,
	);

	// 5. Live-usage snippet reflects the changed prop.
	const usageHasSpacing = await page
		.locator("code", { hasText: "spacing={24}" })
		.count();
	record("live usage snippet reflects props", usageHasSpacing >= 1);

	// 6. Required showcase sections exist.
	for (const id of ["deck", "integrate", "api"]) {
		const present = (await page.locator(`#${id}`).count()) >= 1;
		record(`section #${id} present`, present);
	}

	// 7. Props table lists all five real props + spread.
	const propRows = await page.evaluate(() => {
		const names = [
			"dotSize",
			"spacing",
			"duration",
			"colorCycleDuration",
			"backgroundColor",
		];
		const text = document.body.innerText;
		return names.filter((n) => text.includes(n)).length;
	});
	record("props API documents all 5 props", propRows === 5, `${propRows}/5`);

	// 8. No console errors / failed requests (assets all resolve offline).
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
console.log(
	`\n${checks.length - failed.length}/${checks.length} checks passed`,
);
process.exit(failed.length === 0 ? 0 : 1);
