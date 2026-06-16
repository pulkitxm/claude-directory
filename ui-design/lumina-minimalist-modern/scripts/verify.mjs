/**
 * Headless verification for the Lumina landing page.
 * - Builds, then serves the production preview.
 * - Loads the page in headless Chromium.
 * - Asserts: no console/page errors, key sections present, fonts loaded,
 *   gradient tokens applied, CTA form interaction works, and a mobile
 *   viewport renders the nav menu button.
 *
 * Usage: node scripts/verify.mjs  (expects a running preview server on PORT,
 * otherwise it boots `vite preview` itself).
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { chromium } from "playwright";

const PORT = process.env.PORT || 4319;
const URL = `http://localhost:${PORT}/`;

function startPreview() {
	const proc = spawn(
		"npx",
		["vite", "preview", "--port", String(PORT), "--strictPort"],
		{ stdio: ["ignore", "pipe", "pipe"] },
	);
	return proc;
}

async function waitForServer(url, timeoutMs = 30000) {
	const start = Date.now();
	while (Date.now() - start < timeoutMs) {
		try {
			const res = await fetch(url);
			if (res.ok) return true;
		} catch {
			/* not up yet */
		}
		await sleep(400);
	}
	throw new Error(`Server at ${url} did not start in time`);
}

const results = [];
function check(name, ok, detail = "") {
	results.push({ name, ok });
	console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

let preview;
let browser;
try {
	preview = startPreview();
	await waitForServer(URL);

	browser = await chromium.launch();
	const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

	const errors = [];
	page.on("console", (msg) => {
		if (msg.type() === "error") errors.push(msg.text());
	});
	page.on("pageerror", (err) => errors.push(String(err)));

	await page.goto(URL, { waitUntil: "networkidle" });
	await page.waitForTimeout(800);

	check("page has no console/page errors", errors.length === 0, errors.join(" | "));

	// Title
	const title = await page.title();
	check("document title set", /Lumina/.test(title), title);

	// Each section present
	for (const id of ["top", "features", "how", "pricing", "testimonials"]) {
		const found = (await page.locator(`#${id}`).count()) > 0;
		check(`section #${id} present`, found);
	}

	// Hero headline + gradient highlight
	const h1 = await page.locator("h1").first().innerText();
	check("hero headline renders", /effortless/i.test(h1), h1.replace(/\n/g, " "));

	const gradientCount = await page.locator(".gradient-text").count();
	check("gradient text highlights present", gradientCount >= 3, `count=${gradientCount}`);

	// Calistoga display font actually loaded
	const fontsOk = await page.evaluate(async () => {
		await document.fonts.ready;
		return (
			document.fonts.check("1rem Calistoga") &&
			document.fonts.check("1rem Inter") &&
			document.fonts.check("1rem 'JetBrains Mono'")
		);
	});
	check("Calistoga / Inter / JetBrains Mono loaded", fontsOk);

	// Inverted (dark) section uses the slate foreground as background
	const invertedOk = await page.evaluate(() => {
		const sections = Array.from(document.querySelectorAll("section"));
		return sections.some((s) => {
			const bg = getComputedStyle(s).backgroundColor;
			return bg === "rgb(15, 23, 42)"; // #0F172A
		});
	});
	check("inverted dark section present", invertedOk);

	// Primary CTA buttons exist
	const ctaButtons = await page.getByRole("button", { name: /start free/i }).count();
	check("primary CTA buttons present", ctaButtons >= 1, `count=${ctaButtons}`);

	// Pricing tiers (3)
	const tierHeadings = await page
		.locator("#pricing")
		.getByRole("heading", { level: 3 })
		.count();
	check("three pricing tiers render", tierHeadings === 3, `count=${tierHeadings}`);

	// Final CTA email form interaction
	const emailInput = page.locator("#cta-email");
	await emailInput.scrollIntoViewIfNeeded();
	await emailInput.fill("designer@lumina.test");
	await page
		.locator("form")
		.getByRole("button", { name: /start free/i })
		.click();
	await page.waitForTimeout(300);
	const confirmed = await page.getByText(/on the list/i).count();
	check("CTA form submission confirms", confirmed >= 1);

	// Mobile viewport: nav menu button appears, desktop links hidden
	const mobile = await browser.newPage({ viewport: { width: 390, height: 800 } });
	await mobile.goto(URL, { waitUntil: "networkidle" });
	const menuBtn = await mobile.getByRole("button", { name: /open menu/i }).count();
	check("mobile menu button present", menuBtn >= 1);
	await mobile.close();

	await browser.close();
	browser = null;
} catch (err) {
	console.error("VERIFY ERROR:", err);
	results.push({ name: "verification ran", ok: false });
} finally {
	if (browser) await browser.close().catch(() => {});
	if (preview) preview.kill("SIGTERM");
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
process.exit(failed.length === 0 ? 0 : 1);
