import { chromium } from "./record-demos/node_modules/playwright/index.mjs";
import { readdir, stat, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const root = join(process.cwd(), "templates/premium/lexingtonthemes/sandstone");

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
const results = [];
for (const width of [390, 768, 1280]) {
	const files = await collect(root);
	const batch = await Promise.all(
		files.map(async (file) => {
			const page = await browser.newPage({ viewport: { width, height: 900 } });
			const route = relative(root, file).split(sep).join("/");
			const failures = [];
			const errors = [];
			page.on("response", (response) => {
				if (response.status() >= 400) {
					failures.push({ status: response.status(), url: response.url() });
				}
			});
			page.on("pageerror", (error) => errors.push(error.message));
			const response = await page.goto(
				`http://localhost:4197/templates/premium/lexingtonthemes/sandstone/${route}`,
				{ waitUntil: "load" },
			);
			const metrics = await page.evaluate(() => ({
				bodyHeight: document.body.scrollHeight,
				bodyText: document.body.innerText.length,
				cssSheets: document.styleSheets.length,
				images: [...document.images].filter((image) => image.complete).length,
				imageFailures: [...document.images].filter(
					(image) => image.complete && image.naturalWidth === 0,
				).length,
				horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
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
		result.cssSheets < 3,
);
console.log(JSON.stringify({ checked: results.length, failed }, null, 2));
process.exitCode = failed.length ? 1 : 0;
