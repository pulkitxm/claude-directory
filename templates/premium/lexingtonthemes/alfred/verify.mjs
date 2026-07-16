import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const origin = process.argv[2] ?? "http://127.0.0.1:4332/templates/premium/lexingtonthemes/alfred";
const routes = fs
	.readdirSync(root)
	.filter((file) => file.endsWith(".html"))
	.map((file) => (file === "index.html" ? "/" : `/${file}`))
	.sort();
const browser = await chromium.launch();
const results = [];

for (const route of routes) {
	for (const width of [390, 768, 1280]) {
		const page = await browser.newPage({ viewport: { width, height: 800 } });
		const errors = [];
		const failedRequests = [];
		const badResponses = [];
		page.on("console", (message) => {
			if (message.type() === "error") errors.push(message.text());
		});
		page.on("pageerror", (error) => errors.push(String(error)));
		page.on("requestfailed", (request) =>
			failedRequests.push(
				`${request.url()} ${request.failure()?.errorText ?? "failed"}`,
			),
		);
		page.on("response", (response) => {
			if (response.status() >= 400) {
				badResponses.push(`${response.status()} ${response.url()}`);
			}
		});
		const response = await page.goto(`${origin}${route}`, {
			waitUntil: "domcontentloaded",
			timeout: 30000,
		});
		await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
		await page.waitForTimeout(150);
		const state = await page.evaluate(() => ({
			brokenImages: [...document.images].filter(
				(image) => image.complete && image.naturalWidth === 0,
			).length,
			overflow: Math.max(0, document.documentElement.scrollWidth - innerWidth),
			textLength: document.body.innerText.trim().length,
		}));
		results.push({
			route,
			width,
			status: response?.status() ?? 0,
			...state,
			errors,
			failedRequests,
			badResponses,
		});
		await page.close();
	}
}

await browser.close();
const failures = results.filter(
	(result) =>
		result.status !== 200 ||
		result.brokenImages ||
		result.overflow ||
		result.errors.length ||
		result.failedRequests.length ||
		result.badResponses.length ||
		result.textLength < 100,
);
const report = {
	routes: routes.length,
	checks: results.length,
	widths: [390, 768, 1280],
	failures,
};
fs.mkdirSync(path.join(root, ".audit"), { recursive: true });
fs.writeFileSync(
	path.join(root, ".audit/pages-verification-390-768-1280.json"),
	`${JSON.stringify(report, null, 2)}\n`,
);
console.log(
	`Verified ${results.length} route and viewport combinations with ${failures.length} failures`,
);
if (failures.length) process.exitCode = 1;
