import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "../../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const projectPath = "templates/premium/lexingtonthemes/ellamae";
const routes = [
	"",
	"system/overview/",
	"changelog/",
	"customers/",
	"helpcenter/",
	"integrations/",
	"blog/",
	"system/buttons/",
	"system/colors/",
	"system/typography/",
	"system/links/",
	"contact/",
	"404.html",
	"forms/login/",
	"forms/signup/",
];
const output = new URL("./local/", import.meta.url);
fs.mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

for (const width of [390, 768, 1280]) {
	for (const route of routes) {
		const page = await browser.newPage({ viewport: { width, height: 900 } });
		const badResponses = [];
		const errors = [];
		page.on("response", (response) => {
			if (response.status() >= 400 && !response.url().endsWith("favicon.ico")) {
				badResponses.push(`${response.status()} ${response.url()}`);
			}
		});
		page.on("pageerror", (error) => errors.push(String(error)));
		page.on("console", (message) => {
			if (message.type() === "error") errors.push(message.text());
		});
		const url = `http://127.0.0.1:4201/${projectPath}/${route}`;
		const response = await page.goto(url, { waitUntil: "networkidle" });
		await page.evaluate(() => {
			for (const image of document.images) {
				const source = image.getAttribute("src");
				image.loading = "eager";
				if (source && !image.complete) {
					image.removeAttribute("src");
					image.setAttribute("src", source);
				}
			}
		});
		await page.waitForFunction(() =>
			Array.from(document.images).every((image) => image.complete),
		);
		const state = await page.evaluate(() => {
			const images = Array.from(document.images);
			return {
				images: images.length,
				brokenImages: images.filter((image) => image.naturalWidth === 0).map((image) => image.src),
				overflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
				textLength: document.body.innerText.trim().length,
			};
		});
		if (route === "" && width === 390) {
			await page.getByRole("button", { name: "Open menu" }).click();
			state.mobileMenuOpen = await page.locator("#navigation-menu.open").isVisible();
			await page.getByRole("button", { name: "Close menu" }).click();
			await page.waitForTimeout(350);
		}
		if (route === "") {
			await page.screenshot({
				path: fileURLToPath(new URL(`${width}.png`, output)),
			});
		}
		results.push({
			width,
			route: route || "index.html",
			status: response?.status(),
			badResponses,
			errors,
			...state,
		});
		await page.close();
	}
}

await browser.close();
fs.writeFileSync(new URL("verification.json", output), `${JSON.stringify(results, null, 2)}\n`);
console.log(
	JSON.stringify(
		{
			checks: results.length,
			failures: results.filter(
				(result) =>
					result.status !== 200 ||
					result.badResponses.length ||
					result.errors.length ||
					result.brokenImages.length ||
					result.overflow,
			),
		},
		null,
		2,
	),
);
