import { mkdir } from "node:fs/promises";
import { chromium } from "../../../../../scripts/record-demos/node_modules/playwright/index.mjs";

const base =
	process.env.AUDIT_URL ??
	"http://127.0.0.1:4215/templates/premium/nextjstemplates/startup-nextjs/";
const output = new URL("./screenshots/", import.meta.url);
const routes = [
	"index.html",
	"about.html",
	"blog.html",
	"blog-sidebar.html",
	"blog-details.html",
	"contact.html",
	"signin.html",
	"signup.html",
	"error.html",
];
const sizes = [
	{ name: "mobile", width: 390, height: 844 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "desktop", width: 1280, height: 900 },
];
const browser = await chromium.launch({ headless: true });
const failures = [];

await mkdir(output, { recursive: true });

for (const size of sizes) {
	for (const route of routes) {
		const page = await browser.newPage({ viewport: size });
		const badResponses = [];
		const runtimeErrors = [];

		page.on("response", (response) => {
			if (response.status() >= 400) {
				badResponses.push(`${response.status()} ${response.url()}`);
			}
		});
		page.on("pageerror", (error) => runtimeErrors.push(error.message));
		page.on("console", (message) => {
			if (message.type() === "error") runtimeErrors.push(message.text());
		});

		await page.goto(new URL(route, base).href, { waitUntil: "networkidle" });
		await page.evaluate(() => document.fonts.ready);
		await page.waitForTimeout(300);

		if (route === "index.html") {
			await page.screenshot({
				path: new URL(`${size.name}-home.png`, output).pathname,
				fullPage: false,
			});
		}

		await page.evaluate(async () => {
			for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) {
				window.scrollTo(0, y);
				await new Promise((resolve) => setTimeout(resolve, 45));
			}
			window.scrollTo(0, 0);
		});
		await page.waitForTimeout(250);

		const state = await page.evaluate(() => ({
			title: document.title,
			textLength: document.body.innerText.trim().length,
			documentWidth: document.documentElement.scrollWidth,
			viewportWidth: document.documentElement.clientWidth,
			fontLoaded: document.fonts.check('16px "Inter"'),
			brokenImages: [...document.images]
				.filter((image) => {
					const style = getComputedStyle(image);
					return (
						style.display !== "none" &&
						style.visibility !== "hidden" &&
						Number(style.opacity) > 0 &&
						image.getBoundingClientRect().width > 0 &&
						image.getBoundingClientRect().height > 0
					);
				})
				.filter(
					(image) =>
						!image.complete || image.naturalWidth === 0 || image.naturalHeight === 0,
				)
				.map((image) => image.getAttribute("src")),
		}));

		if (!state.title || state.textLength < 200) {
			failures.push(`${size.name} ${route}: meaningful content missing`);
		}
		if (state.documentWidth > state.viewportWidth + 1) {
			failures.push(
				`${size.name} ${route}: horizontal overflow ${state.documentWidth}/${state.viewportWidth}`,
			);
		}
		if (!state.fontLoaded) failures.push(`${size.name} ${route}: local font missing`);
		if (state.brokenImages.length) {
			failures.push(
				`${size.name} ${route}: broken visible images ${state.brokenImages.join(", ")}`,
			);
		}
		if (badResponses.length) {
			failures.push(`${size.name} ${route}: ${badResponses.join(", ")}`);
		}
		if (runtimeErrors.length) {
			failures.push(`${size.name} ${route}: ${runtimeErrors.join(", ")}`);
		}

		if (route === "index.html") {
			const theme = page.getByRole("button", { name: "theme toggler" });
			await theme.click();
			if (!(await page.locator("html.light").count())) {
				failures.push(`${size.name}: theme toggle did not switch to light mode`);
			}
			await theme.click();

			const billing = page.getByRole("switch", { name: "Use yearly billing" });
			await billing.scrollIntoViewIfNeeded();
			await billing.click();
			if ((await billing.getAttribute("aria-checked")) !== "true") {
				failures.push(`${size.name}: pricing switch did not update`);
			}

			if (size.name === "mobile") {
				await page.evaluate(() => window.scrollTo(0, 0));
				const menu = page.getByRole("button", { name: "Mobile Menu" });
				await menu.click();
				if ((await menu.getAttribute("aria-expanded")) !== "true") {
					failures.push("mobile: navigation did not open");
				}
				const pages = page.getByRole("button", { name: /Pages/ });
				await pages.click();
				if ((await pages.getAttribute("aria-expanded")) !== "true") {
					failures.push("mobile: pages submenu did not open");
				}
				await page.screenshot({
					path: new URL("mobile-menu.png", output).pathname,
					fullPage: false,
				});
			}
		}

		await page.close();
	}
}

await browser.close();

if (failures.length) {
	console.error(failures.join("\n"));
	process.exit(1);
}

console.log("All 9 Startup pages passed at 390, 768, and 1280 pixels.");
