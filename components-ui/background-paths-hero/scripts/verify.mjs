/**
 * Headless E2E verification for the Background Paths hero.
 *
 * Serves the production build via `vite preview`, then drives it with Chromium
 * to assert the integrated shadcn/ui component renders and behaves correctly:
 *   - 72 animated SVG <path>s (2 × 36) render and actually animate (pathLength).
 *   - The per-letter spring headline settles to opacity 1.
 *   - The glassy CTA cycles the headline (preset switcher).
 *   - The theme toggle flips the `dark` class on <html> and repaints the bg.
 *   - Fonts are vendored locally (no remote font requests) and load OK.
 *   - No console / page errors, no failed asset requests.
 *
 * Run: npm run build && node scripts/verify.mjs
 * (Chromium is taken from PLAYWRIGHT_BROWSERS_PATH if set.)
 */
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { chromium } from "playwright";

const PORT = await new Promise((resolve, reject) => {
	const probe = createServer();
	probe.once("error", reject);
	probe.listen(0, () => {
		const { port } = probe.address();
		probe.close(() => resolve(port));
	});
});
const URL = `http://localhost:${PORT}/`;

let failures = 0;
const pass = (msg) => console.log(`  ✓ ${msg}`);
const fail = (msg) => {
	failures += 1;
	console.error(`  ✗ ${msg}`);
};
const check = (cond, msg) => (cond ? pass(msg) : fail(msg));

const waitForServer = async (url, timeoutMs = 20000) => {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const res = await fetch(url);
			if (res.ok) return;
		} catch {
			/* not up yet */
		}
		await new Promise((r) => setTimeout(r, 250));
	}
	throw new Error(`Preview server did not start at ${url}`);
};

const server = spawn(
	"./node_modules/.bin/vite",
	["preview", "--port", String(PORT), "--strictPort"],
	{ stdio: "ignore" },
);
server.on("exit", (code) => {
	if (code !== null && code !== 0) {
		console.error(`Preview server exited with code ${code} (port in use?)`);
		process.exit(1);
	}
});

try {
	await waitForServer(URL);
	console.log(`Preview server up at ${URL}\n`);

	const browser = await chromium.launch();
	const page = await browser.newPage({
		viewport: { width: 1280, height: 800 },
		deviceScaleFactor: 2,
	});
	page.setDefaultTimeout(10000);

	const consoleErrors = [];
	page.on("console", (msg) => {
		if (msg.type() === "error") consoleErrors.push(msg.text());
	});
	page.on("pageerror", (err) => consoleErrors.push(String(err)));

	const failedRequests = [];
	const fontRequests = [];
	page.on("requestfailed", (req) =>
		failedRequests.push(`${req.url()} (${req.failure()?.errorText})`),
	);
	page.on("response", (res) => {
		if (res.status() >= 400)
			failedRequests.push(`${res.url()} -> ${res.status()}`);
		if (res.request().resourceType() === "font") fontRequests.push(res.url());
	});

	await page.goto(URL, { waitUntil: "load" });

	console.log("Section 1 — Animated SVG background paths");
	// The two background SVGs each carry a <title>Background Paths</title>; scope
	// the path count to them so header/favicon/lucide <path>s don't inflate it.
	const bgSvgs = page.locator("svg:has(title)");
	check(
		(await bgSvgs.count()) === 2,
		`both FloatingPaths SVGs present (position 1 and -1) [${await bgSvgs.count()}]`,
	);
	const pathCount = await bgSvgs.locator("path").count();
	check(
		pathCount === 72,
		`72 floating paths rendered (2 × 36) [found ${pathCount}]`,
	);
	// Framer Motion animates `pathLength` by writing inline stroke-dashoffset on
	// every frame; sample the same path twice and confirm it moved.
	const firstPath = bgSvgs.locator("path").first();
	const readOffset = () =>
		firstPath.evaluate(
			(el) =>
				el.style.strokeDashoffset || getComputedStyle(el).strokeDashoffset,
		);
	const off1 = await readOffset();
	await page.waitForTimeout(900);
	const off2 = await readOffset();
	check(
		off1 !== off2,
		`paths animate (stroke-dashoffset changes) [${off1} -> ${off2}]`,
	);
	const len1 = await firstPath.evaluate((el) => el.getTotalLength());
	check(
		Number.isFinite(len1) && len1 > 0,
		`path geometry is valid (length ${len1.toFixed(0)})`,
	);

	console.log("\nSection 2 — Per-letter spring headline");
	const h1 = page.locator("h1").first();
	check(await h1.isVisible(), "headline <h1> rendered");
	// Each visible letter is its own motion.span; "Background Paths" has 15 glyphs.
	const letterSpans = await page.locator("h1 span span").count();
	check(
		letterSpans >= 15,
		`headline split into per-letter spans [${letterSpans}]`,
	);
	await page.waitForTimeout(1600); // let the spring settle
	const letterOpacity = await page
		.locator("h1 span span")
		.first()
		.evaluate((el) => getComputedStyle(el).opacity);
	check(
		letterOpacity === "1",
		`letter entrance settled (opacity ${letterOpacity})`,
	);
	// Words are separated by CSS margins (not whitespace text nodes), so the
	// glyphs concatenate; compare on the whitespace-stripped form.
	const squash = (s) => s.replace(/\s+/g, "").toLowerCase();
	const initialText = squash(await h1.innerText());
	check(
		initialText === "backgroundpaths",
		`initial headline reads "Background Paths" [glyphs "${initialText}"]`,
	);

	console.log("\nSection 3 — Glassy CTA cycles the headline");
	const cta = page.getByRole("button", { name: /Discover Excellence/i });
	check((await cta.count()) === 1, "CTA button 'Discover Excellence' present");
	await cta.click();
	await page.waitForTimeout(700);
	const afterClick = squash(await h1.innerText());
	check(
		afterClick !== initialText,
		`CTA advanced the headline ["${initialText}" -> "${afterClick}"]`,
	);

	console.log("\nSection 4 — Preset dots + 'Next headline' control");
	check(
		(await page.getByRole("button", { name: /Show headline:/ }).count()) === 4,
		"four preset dots rendered",
	);
	const nextBtn = page.getByRole("button", { name: /next headline/i });
	check((await nextBtn.count()) === 1, "'Next headline' pill present");

	console.log("\nSection 5 — Theme toggle (dark <-> light)");
	const htmlIsDark = () =>
		page.evaluate(() => document.documentElement.classList.contains("dark"));
	const bodyBg = () =>
		page.evaluate(() => getComputedStyle(document.body).backgroundColor);
	const startedDark = await htmlIsDark();
	const bgBefore = await bodyBg();
	const themeBtn = page.getByRole("button", {
		name: /Switch to (light|dark) theme/,
	});
	check((await themeBtn.count()) === 1, "theme toggle button present");
	await themeBtn.click();
	await page.waitForTimeout(650);
	const nowDark = await htmlIsDark();
	const bgAfter = await bodyBg();
	check(
		nowDark !== startedDark,
		`toggling flips the 'dark' class [${startedDark} -> ${nowDark}]`,
	);
	check(
		bgBefore !== bgAfter,
		`background repaints on theme change [${bgBefore} -> ${bgAfter}]`,
	);

	console.log("\nSection 6 — Vendored fonts");
	check(
		fontRequests.length > 0,
		`at least one font loaded [${fontRequests.length}]`,
	);
	const remoteFonts = fontRequests.filter(
		(u) => !u.includes(`localhost:${PORT}`) && !u.startsWith("data:"),
	);
	check(
		remoteFonts.length === 0,
		`all fonts served locally (0 remote font requests) [${remoteFonts.length}]`,
	);
	if (remoteFonts.length) remoteFonts.forEach((u) => console.error(`    ${u}`));
	const geistLoaded = await page.evaluate(() =>
		document.fonts ? document.fonts.check('700 64px "Geist"') : true,
	);
	check(geistLoaded, "Geist 700 (heading weight) is available to the document");

	console.log("\nAsset + console health");
	const brokenAssets = failedRequests.filter((u) =>
		/\.(woff2|js|css|svg|png)/.test(u),
	);
	check(brokenAssets.length === 0, `no broken assets [${brokenAssets.length}]`);
	if (brokenAssets.length)
		brokenAssets.forEach((u) => console.error(`    ${u}`));
	check(
		consoleErrors.length === 0,
		`no console/page errors [${consoleErrors.length}]`,
	);
	if (consoleErrors.length)
		consoleErrors.forEach((e) => console.error(`    ${e}`));

	await browser.close();
} finally {
	server.kill("SIGTERM");
}

console.log(
	failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`,
);
process.exit(failures === 0 ? 0 : 1);
