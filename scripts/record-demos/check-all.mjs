import { chromium } from "playwright";
import fs from "node:fs";

const pages = [
	"index", "features", "pricing", "contact", "blog",
	"blog-test-article", "blog-test-article-2", "blog-test-article-3",
	"blog-test-article-4", "blog-test-article-5", "blog-test-article-6",
	"privacy-policy", "cookies-policy", "404",
];

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const p of pages) {
	const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
	const errors = [];
	page.on("pageerror", (e) => errors.push(e.message));
	page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
	page.on("requestfailed", (req) => errors.push("FAILED: " + req.url()));
	await page.goto(`http://localhost:8811/${p}.html`, { waitUntil: "networkidle", timeout: 30000 });
	await page.waitForTimeout(500);
	await page.screenshot({ path: `/tmp/claude-0/-home-user-claude-directory/e0def830-612f-5c8e-8c5f-14d21f8260ea/scratchpad/shot-${p}.png`, fullPage: true });
	console.log(p, errors.length ? "ERRORS: " + JSON.stringify(errors) : "OK");
	await page.close();
}
await browser.close();
