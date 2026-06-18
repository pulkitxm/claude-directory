/**
 * Headless, CLI-only verification for the gradient-bars-background experiment.
 *
 * Boots the Vite dev server, drives a headless Chromium through the page, and
 * asserts:
 *   - the page loads with no console errors / failed requests,
 *   - the verbatim GradientBars layer mounts and paints linear-gradient bars,
 *   - the CSS @keyframes pulse animation is actually running (transform changes),
 *   - the control-deck fader re-renders the live preview and the usage snippet,
 *   - the key showcase sections are present,
 *   - the props API documents all real props.
 *
 * Usage: node scripts/verify.mjs
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { setTimeout as wait } from "node:timers/promises";

const PORT = 5251;
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
		viewport: { width: 1280, height: 900 },
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
	await wait(600);

	// 1. Title + hero headline.
	const title = await page.title();
	record("page title set", /Gradient Bars/.test(title), title);
	const heroH1 = await page
		.locator("h1", { hasText: "Gradient" })
		.count();
	record("hero headline renders", heroH1 >= 1, `${heroH1} match(es)`);

	// 2. GradientBars layer mounts and paints linear-gradient bars.
	//    (Note: getComputedStyle resolves `transform-origin: bottom` to pixel
	//    coordinates, so we key off the gradient paint + the pulseBar animation
	//    + a non-identity scaleY matrix instead.)
	const barField = await page.evaluate(() => {
		const bars = Array.from(document.querySelectorAll("div")).filter((d) => {
			const s = getComputedStyle(d);
			return (
				/linear-gradient\(to top/.test(s.backgroundImage) &&
				s.animationName === "pulseBar" &&
				/matrix/.test(s.transform || "none")
			);
		});
		return { count: bars.length };
	});
	record(
		"GradientBars paints linear-gradient bars",
		barField.count >= 15,
		`${barField.count} gradient bars detected`,
	);

	// 3. The pulse @keyframes animation is live: a bar's transform matrix changes.
	const animating = await page.evaluate(async () => {
		const findBar = () =>
			Array.from(document.querySelectorAll("div")).find((d) => {
				const s = getComputedStyle(d);
				return (
					/linear-gradient\(to top/.test(s.backgroundImage) &&
					s.animationName === "pulseBar"
				);
			});
		const el = findBar();
		if (!el) return { ok: false, reason: "no animated bar" };
		const a = getComputedStyle(el).transform;
		await new Promise((r) => setTimeout(r, 800));
		const b = getComputedStyle(el).transform;
		return { ok: a !== b, a, b };
	});
	record(
		"pulse @keyframes animation is live",
		animating.ok,
		animating.reason ?? "transform advances over time",
	);

	// 4. Control deck fader changes the live preview headline + bar count.
	await page.locator("#deck").scrollIntoViewIfNeeded();
	await wait(400);
	const beforeHeadline = (
		await page.locator("[data-deck-headline]").innerText()
	).trim();
	const fader = page.locator('label:has-text("numBars") input[type="range"]').first();
	await fader.fill("18");
	await page.dispatchEvent(
		'label:has-text("numBars") input[type="range"]',
		"input",
	);
	await wait(350);
	const afterHeadline = (
		await page.locator("[data-deck-headline]").innerText()
	).trim();
	record(
		"control deck fader drives live preview",
		beforeHeadline !== afterHeadline && /18 bars/.test(afterHeadline),
		`${beforeHeadline} -> ${afterHeadline}`,
	);

	// 5. Usage snippet mirrors the changed prop.
	const usageReflects = await page
		.locator("code", { hasText: "numBars={18}" })
		.count();
	record("live usage snippet reflects props", usageReflects >= 1);

	// 6. Colour preset updates the preview's reported rgb() label.
	await page
		.locator('button[aria-label="Set bar colour to Azure"]')
		.click();
	await wait(300);
	const azureShown = await page
		.locator("text=rgb(58, 134, 255)")
		.count();
	record("colour preset updates preview", azureShown >= 1);

	// 7. Required showcase sections exist.
	for (const id of ["deck", "integrate", "api"]) {
		const present = (await page.locator(`#${id}`).count()) >= 1;
		record(`section #${id} present`, present);
	}

	// 8. Props table lists all real props.
	const propCount = await page.evaluate(() => {
		const names = [
			"numBars",
			"gradientFrom",
			"gradientTo",
			"animationDuration",
			"backgroundColor",
			"className",
			"children",
		];
		const text = document.body.innerText;
		return names.filter((n) => text.includes(n)).length;
	});
	record("props API documents all props", propCount === 7, `${propCount}/7`);

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
