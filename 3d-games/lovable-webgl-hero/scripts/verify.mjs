import playwright from "/Volumes/Sandisk SSD/codingAndFun/samaan/fable/scripts/record-demos/node_modules/playwright/index.js";

const { chromium } = playwright;
const url = process.env.VERIFY_URL || "http://localhost:3111/";
const widths = [390, 768, 1280];
const failures = [];

for (const width of widths) {
	const browser = await chromium.launch({
		args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
	});
	const page = await browser.newPage({ viewport: { width, height: 900 } });
	const errors = [];
	const badResponses = [];
	page.on("console", (message) => {
		if (message.type() === "error") errors.push(message.text());
	});
	page.on("pageerror", (error) => errors.push(error.message));
	page.on("response", (response) => {
		if (response.status() >= 400)
			badResponses.push(`${response.status()} ${response.url()}`);
	});
	await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
	await page.waitForTimeout(4000);
	const state = await page.evaluate(() => {
		const host = document.querySelector("#hero-canvas");
		const canvas = host?.querySelector("canvas");
		const images = Array.from(document.images);
		return {
			h1: document.querySelector("h1")?.textContent?.trim(),
			canvas: Boolean(canvas && canvas.width > 0 && canvas.height > 0),
			opacity: host ? Number.parseFloat(getComputedStyle(host).opacity) : 0,
			images: images.length,
			brokenImages: images
				.filter((image) => !image.complete || image.naturalWidth === 0)
				.map((image) => image.src),
			overflow:
				document.documentElement.scrollWidth >
				document.documentElement.clientWidth + 1,
			trusted: document.body.textContent?.includes(
				"Teams from top companies build with Lovable",
			),
		};
	});
	if (state.h1 !== "Build something Lovable")
		failures.push(`${width}: heading missing`);
	if (!state.canvas || state.opacity < 0.9)
		failures.push(`${width}: shader unavailable`);
	if (!state.trusted) failures.push(`${width}: trusted section missing`);
	if (state.images < 12 || state.brokenImages.length)
		failures.push(`${width}: broken images ${state.brokenImages.join(", ")}`);
	if (state.overflow) failures.push(`${width}: horizontal overflow`);
	if (errors.length) failures.push(`${width}: console ${errors.join(" | ")}`);
	if (badResponses.length)
		failures.push(`${width}: responses ${badResponses.join(" | ")}`);
	if (width === 1280) {
		await page.getByRole("button", { name: "Solution", exact: true }).click();
		if (!(await page.getByText("Founders", { exact: true }).isVisible()))
			failures.push("1280: solution menu did not open");
		await page.getByRole("button", { name: "Resources", exact: true }).click();
		if (!(await page.getByText("Blog", { exact: true }).isVisible()))
			failures.push("1280: resources menu did not open");
	}
	await page.close();
	await browser.close();
}

if (failures.length) {
	console.error(failures.join("\n"));
	process.exit(1);
}

console.log(
	`Verified ${widths.length} responsive views with no runtime failures`,
);
