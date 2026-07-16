import { chromium } from "./record-demos/node_modules/playwright/index.mjs";
import { readdir, stat, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const root = join(process.cwd(), "templates/premium/lexingtonthemes/quartiere");

async function collect(directory) {
	const files = [];
	for (const entry of await readdir(directory)) {
		const path = join(directory, entry);
		const details = await stat(path);
		if (
			details.isDirectory() &&
			![".audit", ".reference", "assets"].includes(entry)
		) {
			files.push(...(await collect(path)));
		} else if (details.isFile() && entry.endsWith(".html")) {
			files.push(path);
		}
	}
	return files;
}

const browser = await chromium.launch({ headless: true });
const files = await collect(root);
const results = [];
for (const width of [390, 768, 1280]) {
	for (let offset = 0; offset < files.length; offset += 8) {
		const batch = await Promise.all(
			files.slice(offset, offset + 8).map(async (file) => {
				const page = await browser.newPage({
					viewport: { width, height: 900 },
				});
				const route = relative(root, file).split(sep).join("/");
				const failures = [];
				const errors = [];
				page.on("requestfailed", (request) => {
					const error = request.failure()?.errorText;
					if (
						!(
							request.resourceType() === "media" && error === "net::ERR_ABORTED"
						)
					) {
						failures.push({ error, url: request.url() });
					}
				});
				page.on("response", (response) => {
					if (response.status() >= 400) {
						failures.push({ status: response.status(), url: response.url() });
					}
				});
				page.on("pageerror", (error) => errors.push(error.message));
				const response = await page.goto(
					`http://localhost:4197/templates/premium/lexingtonthemes/quartiere/${route}`,
					{ waitUntil: "networkidle" },
				);
				await page.evaluate(async () => {
					for (
						let top = 0;
						top <= document.body.scrollHeight;
						top += innerHeight
					) {
						scrollTo(0, top);
						await new Promise((resolve) => setTimeout(resolve, 40));
					}
					scrollTo(0, 0);
				});
				await page.waitForTimeout(300);
				const metrics = await page.evaluate(() => ({
					bodyHeight: document.body.scrollHeight,
					bodyText: document.body.innerText.trim().length,
					cssSheets: document.styleSheets.length,
					imageFailures: [...document.images].filter(
						(image) => image.complete && image.naturalWidth === 0,
					).length,
					horizontalOverflow:
						document.documentElement.scrollWidth > innerWidth + 1,
					visibleContent: [
						...document.querySelectorAll("main, section, article"),
					].some((element) => {
						const box = element.getBoundingClientRect();
						const style = getComputedStyle(element);
						return (
							box.height > 100 &&
							style.display !== "none" &&
							style.visibility !== "hidden"
						);
					}),
				}));
				await page.close();
				return {
					width,
					route,
					status: response?.status(),
					failures,
					errors,
					...metrics,
				};
			}),
		);
		results.push(...batch);
	}
}
await browser.close();
await writeFile(
	join(root, ".audit", "nested-pages-verification.json"),
	`${JSON.stringify(results, null, 2)}\n`,
);
const failed = results.filter(
	(result) =>
		result.status !== 200 ||
		result.failures.length ||
		result.errors.length ||
		result.imageFailures ||
		result.horizontalOverflow ||
		result.cssSheets < 3 ||
		result.bodyText < 40 ||
		!result.visibleContent,
);
console.log(JSON.stringify({ checked: results.length, failed }, null, 2));
process.exitCode = failed.length ? 1 : 0;
