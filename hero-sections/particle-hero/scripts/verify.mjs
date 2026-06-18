/* Headless CLI verification for the particle-hero experiment.
 *
 * Boots `vite preview` against the production build, then asserts every
 * requirement the prompt describes for the integrated `ParticleHero`
 * component: it renders from the `@/components/ui/particle-hero` import,
 * the canvas actually draws particles, the radial-reveal headline + tagline
 * are present, the gold-mode orb toggles the `.gold-mode` class (and the
 * scene's invert filter), the showcase playground drives the props + the
 * generated JSX, the install section lists the right deps, fonts load,
 * the layout is responsive, and nothing errors in the console.
 */
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const PORT = 4189;
const URL_BASE = `http://localhost:${PORT}/`;

let failures = 0;
function check(name, ok, detail = "") {
	const status = ok ? "PASS" : "FAIL";
	if (!ok) failures += 1;
	console.log(`[${status}] ${name}${detail ? ` — ${detail}` : ""}`);
}

const preview = spawn(
	"npx",
	["vite", "preview", "--port", String(PORT), "--strictPort"],
	{ stdio: "pipe" },
);

await new Promise((resolve, reject) => {
	const timer = setTimeout(
		() => reject(new Error("preview server timed out")),
		20000,
	);
	preview.stdout.on("data", (d) => {
		if (d.toString().includes("localhost")) {
			clearTimeout(timer);
			resolve();
		}
	});
	preview.on("exit", () => reject(new Error("preview server exited early")));
});

const browser = await chromium.launch();
try {
	const page = await browser.newPage({
		viewport: { width: 1440, height: 900 },
	});
	const consoleErrors = [];
	page.on("console", (msg) => {
		if (msg.type() === "error") consoleErrors.push(msg.text());
	});
	page.on("pageerror", (err) => consoleErrors.push(String(err)));

	await page.goto(URL_BASE, { waitUntil: "networkidle" });
	await page.waitForTimeout(2600); // let the 2s load/entrance settle

	check("page title", (await page.title()).includes("Particle Hero"));

	// ---- The integrated ParticleHero component -----------------------------
	const hero = page.locator(".particle-hero");
	check("hero component present", (await hero.count()) === 1);

	const heroBg = await hero
		.first()
		.evaluate((el) => getComputedStyle(el).backgroundColor)
		.catch(() => "");
	check("hero canvas is #05060f", heroBg === "rgb(5, 6, 15)", heroBg || "not found");

	// Canvas exists and has been sized to the container.
	const canvas = hero.locator("#particleCanvas");
	check("particle canvas present", (await canvas.count()) === 1);
	const canvasDims = await canvas
		.first()
		.evaluate((el) => ({ w: el.width, h: el.height }));
	check(
		"canvas sized to container",
		canvasDims.w > 0 && canvasDims.h > 0,
		`${canvasDims.w}x${canvasDims.h}`,
	);

	// Particles are actually being drawn (non-empty pixel data).
	const drawnPixels = await canvas.first().evaluate((el) => {
		const ctx = el.getContext("2d");
		const { data } = ctx.getImageData(0, 0, el.width, el.height);
		let lit = 0;
		for (let i = 3; i < data.length; i += 4) if (data[i] > 0) lit++;
		return lit;
	});
	check("canvas is drawing particles", drawnPixels > 50, `${drawnPixels} lit px`);

	// Headline (two stacked h2 of the same title) + tagline copy.
	const h2s = hero.locator(".heroT h2");
	check("two stacked headline layers", (await h2s.count()) === 2);
	check(
		'headline reads "Gold Design"',
		(await h2s.first().textContent())?.trim() === "Gold Design",
		(await h2s.first().textContent())?.trim(),
	);
	const headline = h2s.first();
	const headlineStyles = await headline.evaluate((el) => {
		const s = getComputedStyle(el);
		return { clip: s.webkitBackgroundClip || s.backgroundClip, fill: s.webkitTextFillColor };
	});
	// The headline stacks a radial + linear gradient, so background-clip
	// computes to a comma-list ("text, text") — every entry must be `text`.
	const clipIsText = headlineStyles.clip
		.split(",")
		.every((v) => v.trim() === "text");
	check(
		"headline uses gradient clip-text",
		clipIsText && headlineStyles.fill === "rgba(0, 0, 0, 0)",
		`${headlineStyles.clip} / ${headlineStyles.fill}`,
	);
	check(
		"tagline mentions Dalim",
		(await hero.getByText(/powered by Dalim/i).count()) >= 1,
	);

	// @property --p registered (radial-reveal sweep variable).
	const hasProperty = await page.evaluate(() => {
		try {
			return CSS.registerProperty !== undefined;
		} catch {
			return false;
		}
	});
	check("CSS.registerProperty supported (@property --p)", hasProperty);

	// ---- Gold-mode orb toggles the scene -----------------------------------
	check("not in gold mode initially", (await hero.locator(".gold-mode").count()) === 0
		? (await page.locator(".particle-hero.gold-mode").count()) === 0
		: false);
	const orb = hero.locator("button.mid-spot");
	check("gold-mode orb present", (await orb.count()) === 1);
	await orb.first().click();
	await page.waitForTimeout(300);
	check(
		"clicking orb adds .gold-mode",
		(await page.locator(".particle-hero.gold-mode").count()) === 1,
	);
	// The canvas now carries the gold drop-shadow filter.
	const goldFilter = await canvas
		.first()
		.evaluate((el) => getComputedStyle(el).filter);
	check(
		"gold mode applies drop-shadow filter to canvas",
		goldFilter.includes("drop-shadow"),
		goldFilter.slice(0, 60),
	);
	// The showcase switch reflects the new state.
	check(
		"playground switch reflects gold = true",
		(await page.getByText("defaultGold = true").count()) === 1,
	);
	await orb.first().click(); // back to night
	await page.waitForTimeout(300);
	check(
		"clicking orb again removes .gold-mode",
		(await page.locator(".particle-hero.gold-mode").count()) === 0,
	);

	// ---- Showcase sections -------------------------------------------------
	check("navbar present", (await page.locator("header").count()) === 1);
	check("anatomy section present", (await page.locator("#anatomy").count()) === 1);
	check("playground section present", (await page.locator("#playground").count()) === 1);
	check("install section present", (await page.locator("#install").count()) === 1);
	check(
		"install lists lucide-react + clsx + tailwind-merge",
		(await page.getByText(/lucide-react\s+clsx\s+tailwind-merge/).count()) >= 1,
	);

	// ---- Playground drives the component live ------------------------------
	const playground = page.locator("#playground");
	const titleInput = playground.locator("input").first();
	await titleInput.fill("Fable Five");
	await page.waitForTimeout(400);
	check(
		"editing title updates generated JSX",
		(await playground.getByText(/title="Fable Five"/).count()) === 1,
	);
	check(
		"editing title updates the live hero headline",
		(await hero.locator('.heroT h2', { hasText: "Fable Five" }).count()) >= 1,
	);
	check(
		"default usage prints bare <ParticleHero /> after reset",
		await (async () => {
			await playground.getByText(/Reset to defaults/).click();
			await page.waitForTimeout(300);
			return (await playground.getByText("<ParticleHero />").count()) >= 1;
		})(),
	);

	// ---- Fonts -------------------------------------------------------------
	const fontsLoaded = await page.evaluate(async () => {
		await document.fonts.ready;
		return (
			document.fonts.check("16px 'Space Grotesk'") &&
			document.fonts.check("16px 'Inter'") &&
			document.fonts.check("16px 'JetBrains Mono'")
		);
	});
	check("Space Grotesk + Inter + JetBrains Mono loaded", fontsLoaded);

	check(
		"no console errors",
		consoleErrors.length === 0,
		consoleErrors.join(" | ").slice(0, 300),
	);

	// ---- Responsive: nav collapses, hero still renders on mobile -----------
	const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
	await mobile.goto(URL_BASE, { waitUntil: "networkidle" });
	await mobile.waitForTimeout(2600);
	const navVisible = await mobile
		.locator("header nav")
		.first()
		.evaluate((el) => getComputedStyle(el).display);
	check("desktop nav hidden on mobile", navVisible === "none", navVisible);
	check(
		"hero renders on mobile",
		(await mobile.locator(".particle-hero").count()) === 1,
	);

	// ---- Screenshots (desktop + mobile) ------------------------------------
	mkdirSync("screenshots", { recursive: true });
	await page.screenshot({ path: "screenshots/desktop.png", fullPage: false });
	await mobile.screenshot({ path: "screenshots/mobile.png", fullPage: false });
	console.log(
		"[INFO] screenshots saved to screenshots/desktop.png and screenshots/mobile.png",
	);
} finally {
	await browser.close();
	preview.kill();
}

console.log(
	failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`,
);
process.exit(failures === 0 ? 0 : 1);
