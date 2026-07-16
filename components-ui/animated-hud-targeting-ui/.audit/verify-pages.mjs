import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const url =
	process.env.AUDIT_URL ??
	"http://127.0.0.1:4218/components-ui/animated-hud-targeting-ui/";
const output = new URL("./screenshots/", import.meta.url);
const sizes = [
	{ name: "mobile", width: 390, height: 844 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "desktop", width: 1280, height: 900 },
];
const browser = await chromium.launch({ headless: true });
const failures = [];

await mkdir(output, { recursive: true });

for (const size of sizes) {
	const page = await browser.newPage({ viewport: size });
	const badResponses = [];
	const runtimeErrors = [];
	page.on("response", (response) => {
		if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
	});
	page.on("pageerror", (error) => runtimeErrors.push(error.message));
	page.on("console", (message) => {
		if (message.type() === "error") runtimeErrors.push(message.text());
	});

	await page.goto(url, { waitUntil: "networkidle" });
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(700);
	const state = await page.evaluate(() => ({
		documentWidth: document.documentElement.scrollWidth,
		viewportWidth: document.documentElement.clientWidth,
		fonts: [
			document.fonts.check('16px "JetBrains Mono"'),
			document.fonts.check('16px "Oswald"'),
		],
		image: (() => {
			const image = document.querySelector("img");
			return image
				? {
						src: image.currentSrc,
						complete: image.complete,
						width: image.naturalWidth,
						height: image.naturalHeight,
					}
				: null;
		})(),
		reticle: document.querySelectorAll('svg[viewBox="0 0 237 220"]').length,
	}));

	if (state.documentWidth > state.viewportWidth + 1) failures.push(`${size.name}: overflow`);
	if (state.fonts.some((loaded) => !loaded)) failures.push(`${size.name}: local font missing`);
	if (!state.image || !state.image.complete || !state.image.width || !state.image.height) {
		failures.push(`${size.name}: recon image did not decode`);
	}
	if (state.reticle !== 1) failures.push(`${size.name}: reticle missing`);

	const hold = page.locator('button[title="Hold sweep"]');
	await hold.click();
	const heldPhase = await page
		.locator("text=/SCANNING|ACQUIRING|TRACKING|LOCKED/")
		.first()
		.textContent();
	await page.waitForTimeout(1100);
	const heldPhaseAfter = await page
		.locator("text=/SCANNING|ACQUIRING|TRACKING|LOCKED/")
		.first()
		.textContent();
	if (heldPhase !== heldPhaseAfter) failures.push(`${size.name}: hold did not pause phase`);
	await page.locator('button[title="Resume sweep"]').click();
	await page.getByRole("button", { name: /OBELISK/ }).click();
	await page.waitForTimeout(250);
	if (!(await page.getByText("OBELISK", { exact: true }).count())) {
		failures.push(`${size.name}: target selection failed`);
	}
	if (badResponses.length) failures.push(`${size.name}: ${badResponses.join(", ")}`);
	if (runtimeErrors.length) failures.push(`${size.name}: ${runtimeErrors.join(", ")}`);

	await page.screenshot({
		path: new URL(`${size.name}.png`, output).pathname,
		fullPage: false,
	});
	await page.close();
}

await browser.close();

if (failures.length) {
	console.error(failures.join("\n"));
	process.exit(1);
}

console.log("Nested Pages verification passed at 390, 768, and 1280 pixels.");
