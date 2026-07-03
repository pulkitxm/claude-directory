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

// Find the FAQ heading, then locate its sibling accordion list
const info = await page.evaluate(() => {
	const heading = Array.from(document.querySelectorAll("h1,h2,h3,div")).find(
		(h) =>
			h.children.length === 0 &&
			/frequently asked question/i.test(h.textContent),
	);
	if (!heading) return { found: false };
	// find the container after the heading
	let container = heading.parentElement;
	return {
		found: true,
		containerHTML: container ? container.outerHTML.slice(0, 300) : null,
	};
});
results.push({ step: "locate-faq", info });

await page.screenshot({
	path: path.join(OUT, "faq-before.png"),
	fullPage: false,
});

const clickResult = await page.evaluate(() => {
	const heading = Array.from(document.querySelectorAll("h1,h2,h3,div")).find(
		(h) =>
			h.children.length === 0 &&
			/frequently asked question/i.test(h.textContent),
	);
	if (!heading) return null;
	let scope = heading.parentElement;
	// items are the rows below heading with an svg chevron
	const items = Array.from(scope.querySelectorAll("div")).filter(
		(el) =>
			el.querySelector("svg") &&
			el.children.length <= 3 &&
			el.textContent.trim().length > 5 &&
			el.textContent.trim().length < 150,
	);
	if (!items.length) return { itemsFound: 0 };
	const target = items[0];
	target.setAttribute("data-clicked", "true");
	const beforeHeight = target.parentElement.scrollHeight;
	target.click();
	return {
		itemsFound: items.length,
		text: target.textContent.trim().slice(0, 60),
		beforeHeight,
	};
});
results.push({ step: "click", clickResult });

await page.waitForTimeout(600);
await page.screenshot({
	path: path.join(OUT, "faq-after.png"),
	fullPage: false,
});

const afterState = await page.evaluate(() => {
	const el = document.querySelector('[data-clicked="true"]');
	if (!el) return null;
	return {
		parentHTML: el.parentElement.outerHTML.slice(0, 1200),
	};
});
results.push({ step: "after-state", afterState });

fs.writeFileSync(
	path.join(OUT, "faq-interaction.json"),
	JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results, null, 2));

await browser.close();
