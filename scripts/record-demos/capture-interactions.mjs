import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

// Usage: node capture-interactions.mjs <url> <outDir> <pageType>
const URL = process.argv[2];
const OUT = process.argv[3];
const PAGE_TYPE = process.argv[4] || "generic";

if (!URL || !OUT) {
	console.error(
		"usage: node capture-interactions.mjs <url> <outDir> <pageType>",
	);
	process.exit(2);
}

const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:|\/|$)/i.test(
	URL,
);
const legacyChromePath = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const legacyExists = fs.existsSync(legacyChromePath);
const launchOpts = { args: ["--ignore-certificate-errors"] };
if (legacyExists) launchOpts.executablePath = legacyChromePath;
if (!isLocal) {
	launchOpts.args.push("--ssl-version-max=tls1.2");
	const proxyUrl = process.env.PW_PROXY || process.env.HTTPS_PROXY;
	if (proxyUrl) launchOpts.args.push(`--proxy-server=${proxyUrl}`);
}

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch(launchOpts);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);
// dismiss cookie banner if present
try {
	const gotIt = page.locator('button:has-text("Got It")').first();
	if (await gotIt.isVisible({ timeout: 1500 })) {
		await gotIt.click();
		await page.waitForTimeout(300);
	}
} catch {}

const interactions = [];

async function snap(name, opts = {}) {
	await page.screenshot({ path: path.join(OUT, `${name}.png`), ...opts });
}

async function domSummary(sel) {
	try {
		return await page
			.locator(sel)
			.first()
			.evaluate((el) => ({
				cls: el.className,
				display: getComputedStyle(el).display,
				visible: el.getBoundingClientRect().height > 0,
			}));
	} catch {
		return null;
	}
}

// 1. Header nav "All Pages" dropdown
try {
	const trigger = page
		.locator(
			'button:has-text("All Pages"), [class*="dropdown" i] >> text=All Pages',
		)
		.first();
	if (await trigger.isVisible({ timeout: 2000 })) {
		await snap("all-pages-dropdown-before");
		await trigger.click();
		await page.waitForTimeout(400);
		await snap("all-pages-dropdown-after");
		const items = await page.locator("a:visible").allTextContents();
		interactions.push({
			name: "all-pages-dropdown",
			trigger: 'header button:has-text("All Pages")',
			delta:
				"Clicking 'All Pages' in the header opens a dropdown/mega-menu panel listing all site pages as links beneath the trigger.",
			before: "all-pages-dropdown-before.png",
			after: "all-pages-dropdown-after.png",
		});
		await page.keyboard.press("Escape");
		await page.waitForTimeout(300);
	}
} catch (e) {
	interactions.push({ name: "all-pages-dropdown", error: e.message });
}

// 2. Mobile hamburger menu
try {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.waitForTimeout(500);
	await snap("mobile-menu-before");
	const hamburger = page
		.locator(
			'button[aria-label*="menu" i], [class*="hamburger" i], [class*="menu-toggle" i], button:has(svg)',
		)
		.last();
	await hamburger.click({ timeout: 3000 });
	await page.waitForTimeout(400);
	await snap("mobile-menu-after");
	interactions.push({
		name: "mobile-menu",
		trigger: "header hamburger button (mobile viewport)",
		delta:
			"Clicking the hamburger icon on mobile viewport opens the mobile nav menu (slide-in or full overlay) listing nav links.",
		before: "mobile-menu-before.png",
		after: "mobile-menu-after.png",
	});
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.waitForTimeout(400);
} catch (e) {
	interactions.push({ name: "mobile-menu", error: e.message });
	await page.setViewportSize({ width: 1440, height: 900 });
}

// 3. FAQ accordion (pricing / features pages)
if (PAGE_TYPE === "pricing" || PAGE_TYPE === "features") {
	try {
		const faqQ = page
			.locator(
				"text=/How secure is my financial data|Do you offer phone support|Can I use my own domain/",
			)
			.first();
		await faqQ.scrollIntoViewIfNeeded();
		await page.waitForTimeout(300);
		await snap("faq-before");
		const beforeBox = await faqQ.locator("xpath=ancestor::*[3]").boundingBox();
		await faqQ.click();
		await page.waitForTimeout(400);
		await snap("faq-after");
		const afterBox = await faqQ.locator("xpath=ancestor::*[3]").boundingBox();
		interactions.push({
			name: "faq-accordion",
			trigger: "FAQ question row click",
			delta: `Clicking a FAQ question expands an answer panel beneath it (height grows from ${beforeBox?.height} to ${afterBox?.height}), and the plus icon typically rotates to an X/minus.`,
			before: "faq-before.png",
			after: "faq-after.png",
		});
	} catch (e) {
		interactions.push({ name: "faq-accordion", error: e.message });
	}
}

// 4. Pricing billing toggle (Monthly/Yearly)
if (PAGE_TYPE === "pricing") {
	try {
		const toggle = page.locator('text="Billed Yearly"').first();
		await toggle.scrollIntoViewIfNeeded();
		await snap("pricing-toggle-before");
		const priceBefore = await page
			.locator("text=/^\\$[0-9]+/")
			.first()
			.textContent();
		await toggle.click();
		await page.waitForTimeout(400);
		await snap("pricing-toggle-after");
		const priceAfter = await page
			.locator("text=/^\\$[0-9]+/")
			.first()
			.textContent();
		interactions.push({
			name: "pricing-billing-toggle",
			trigger: 'text="Billed Yearly" toggle switch',
			delta: `Clicking the Monthly/Yearly toggle switches the displayed price (before: ${priceBefore}, after: ${priceAfter}) and slides the toggle knob.`,
			before: "pricing-toggle-before.png",
			after: "pricing-toggle-after.png",
		});
	} catch (e) {
		interactions.push({ name: "pricing-billing-toggle", error: e.message });
	}
}

// 5. Testimonial carousel arrows (home, pricing, about)
if (["home", "pricing", "about"].includes(PAGE_TYPE)) {
	try {
		const nextBtn = page
			.locator("button:has(svg)")
			.filter({ hasText: "" })
			.last();
		const carousel = page
			.locator(
				"text=/Optimize is super easy to edit|has been instrumental|working at Optimize/",
			)
			.first();
		if (await carousel.isVisible({ timeout: 2000 }).catch(() => false)) {
			await carousel.scrollIntoViewIfNeeded();
			await page.waitForTimeout(300);
			await snap("carousel-before");
			const textBefore = await carousel.textContent();
			// find nearby right-arrow button
			const arrowBtn = page
				.locator(
					'[class*="carousel" i] button, [class*="testimonial" i] button',
				)
				.last();
			await arrowBtn.click({ timeout: 3000 });
			await page.waitForTimeout(500);
			await snap("carousel-after");
			const textAfter = await carousel.textContent().catch(() => "");
			interactions.push({
				name: "testimonial-carousel",
				trigger: "testimonial carousel next-arrow button",
				delta: `Clicking the right arrow advances the testimonial slide (quote/author text changes). Before starts with "${(textBefore || "").slice(0, 40)}", after "${(textAfter || "").slice(0, 40)}".`,
				before: "carousel-before.png",
				after: "carousel-after.png",
			});
		}
	} catch (e) {
		interactions.push({ name: "testimonial-carousel", error: e.message });
	}
}

// 6. Blog search input (blog page)
if (PAGE_TYPE === "blog") {
	try {
		const search = page.locator('input[placeholder*="Search" i]').first();
		await search.scrollIntoViewIfNeeded();
		await snap("blog-search-before");
		await search.fill("Wealth");
		await page.waitForTimeout(500);
		await snap("blog-search-after");
		const cardCountAfter = await page
			.locator("h2, h3")
			.filter({ hasText: /Wealth/i })
			.count();
		interactions.push({
			name: "blog-search-filter",
			trigger: 'input[placeholder*="Search any blog"]',
			delta: `Typing into the search box live-filters the blog post grid to matching titles (e.g. ${cardCountAfter} cards containing "Wealth" remain visible).`,
			before: "blog-search-before.png",
			after: "blog-search-after.png",
		});
	} catch (e) {
		interactions.push({ name: "blog-search-filter", error: e.message });
	}
}

// 7. Generic hover states for nav links, primary buttons, and cards
try {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.mouse.move(0, 0);
	await page.waitForTimeout(200);
	const hoverTargets = await page
		.locator(
			'header a, header button, a[class*="btn" i], button[class*="btn" i], [class*="card" i]',
		)
		.all();
	const hoverDir = path.join(OUT, "hover");
	fs.mkdirSync(hoverDir, { recursive: true });
	const hoverIndex = [];
	let count = 0;
	for (const el of hoverTargets) {
		if (count >= 8) break;
		try {
			if (!(await el.isVisible())) continue;
			const label = (await el.innerText().catch(() => "")).trim().slice(0, 30);
			await el.scrollIntoViewIfNeeded();
			await el.screenshot({
				path: path.join(hoverDir, `hov-${count}-rest.png`),
			});
			await el.hover({ timeout: 2000 });
			await page.waitForTimeout(300);
			await el.screenshot({
				path: path.join(hoverDir, `hov-${count}-hover.png`),
			});
			hoverIndex.push({ i: count, label });
			count++;
		} catch {}
	}
	fs.writeFileSync(
		path.join(hoverDir, "index.json"),
		JSON.stringify(hoverIndex, null, 2),
	);
	interactions.push({
		name: "generic-hover-states",
		trigger: "various nav links / buttons / cards",
		delta: `Captured ${count} rest/hover screenshot pairs in hover/ subfolder — see hover/index.json for labels.`,
	});
} catch (e) {
	interactions.push({ name: "generic-hover-states", error: e.message });
}

fs.writeFileSync(
	path.join(OUT, "interactions.json"),
	JSON.stringify(interactions, null, 2),
);
console.log("Interactions captured:", interactions.length);
await browser.close();
