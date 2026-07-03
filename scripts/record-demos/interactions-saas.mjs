import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const URL = process.argv[2];
const OUT = process.argv[3];
fs.mkdirSync(OUT, { recursive: true });

const legacyChromePath = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)/i.test(URL);
const launchOpts = { args: ["--ignore-certificate-errors"] };
if (fs.existsSync(legacyChromePath))
	launchOpts.executablePath = legacyChromePath;
if (!isLocal) {
	launchOpts.args.push("--ssl-version-max=tls1.2");
	if (process.env.PW_PROXY)
		launchOpts.args.push(`--proxy-server=${process.env.PW_PROXY}`);
}
const browser = await chromium.launch(launchOpts);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

const results = [];

async function snap(name) {
	await page.screenshot({ path: path.join(OUT, `${name}.png`) });
}

// 1. Theme toggle
try {
	await snap("theme-before");
	const beforeCls = await page.evaluate(() => document.body.className);
	// Try clicking the theme toggle icon button (moon/sun icon), the one immediately
	// preceding the hamburger button and not carrying aria-label="Toggle menu".
	const moonBtn = await page.$(
		'button:not([aria-label="Toggle menu"]):has(svg path[d^="M21.4,13.7"])',
	);
	if (moonBtn) {
		await moonBtn.click({ force: true }).catch(() => {});
		await page.waitForTimeout(500);
		const afterCls = await page.evaluate(() => document.body.className);
		await snap("theme-after");
		results.push({
			name: "theme-toggle",
			trigger: "header svg icon",
			before: beforeCls,
			after: afterCls,
		});
	}
} catch (e) {
	results.push({ name: "theme-toggle", error: String(e) });
}

// reload to reset
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1000);

// 2. Mobile menu drawer (resize to mobile viewport)
try {
	await page.setViewportSize({ width: 480, height: 900 });
	await page.waitForTimeout(500);
	await snap("mobile-menu-before");
	const beforeCls = await page.evaluate(
		() => document.querySelector(".my-drawer")?.className || "",
	);
	// find hamburger button
	const hamburger = await page.$('button[aria-label="Toggle menu"]');
	if (hamburger) {
		await hamburger.click({ force: true }).catch(() => {});
		await page.waitForTimeout(600);
		const afterCls = await page.evaluate(
			() => document.querySelector(".my-drawer")?.className || "",
		);
		await snap("mobile-menu-after");
		results.push({
			name: "mobile-menu",
			trigger: "hamburger button",
			before: beforeCls,
			after: afterCls,
		});
	}
	await page.setViewportSize({ width: 1440, height: 900 });
} catch (e) {
	results.push({ name: "mobile-menu", error: String(e) });
}

await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1000);

// 3. FAQ accordion (only meaningful on pricing page)
try {
	const faqItems = await page.$$(
		'[class*="accordion" i], [class*="faq" i] > div, details',
	);
	const beforeHTML = await page.evaluate(() => document.body.innerHTML.length);
	// Try clicking first FAQ question-like element by text heuristic
	const clicked = await page.evaluate(() => {
		const candidates = Array.from(
			document.querySelectorAll("div, button"),
		).filter(
			(el) =>
				el.children.length &&
				el.querySelector("svg") &&
				el.textContent.trim().length > 10 &&
				el.textContent.trim().length < 120,
		);
		// find one whose parent looks like FAQ list (has multiple siblings with svg)
		for (const el of candidates) {
			const siblings = el.parentElement
				? Array.from(el.parentElement.children)
				: [];
			if (siblings.length >= 3) {
				el.setAttribute("data-test-clicked", "1");
				el.click();
				return el.textContent.trim().slice(0, 60);
			}
		}
		return null;
	});
	await page.waitForTimeout(500);
	const afterHTML = await page.evaluate(() => document.body.innerHTML.length);
	await snap("faq-accordion-after");
	results.push({
		name: "faq-accordion",
		trigger: clicked,
		beforeHTMLLen: beforeHTML,
		afterHTMLLen: afterHTML,
	});
} catch (e) {
	results.push({ name: "faq-accordion", error: String(e) });
}

fs.writeFileSync(
	path.join(OUT, "custom-interactions.json"),
	JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));

await browser.close();
