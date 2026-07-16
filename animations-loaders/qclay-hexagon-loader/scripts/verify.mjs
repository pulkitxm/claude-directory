import playwright from "/Volumes/Sandisk SSD/codingAndFun/samaan/fable/scripts/record-demos/node_modules/playwright/index.js";

const { chromium } = playwright;
const url =
	process.env.VERIFY_URL || process.argv[2] || "http://127.0.0.1:4173/";
const widths = [390, 768, 1280];
const failures = [];

const browser = await chromium.launch();

for (const width of widths) {
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
	await page.waitForTimeout(1000);
	const initial = await page.evaluate(() => {
		const scene = document.querySelector(".hex-scene-mask");
		const polygons = Array.from(
			document.querySelectorAll(".hex-scene-mask img"),
		).filter((image) => image.src.includes("/polygons/"));
		const icons = Array.from(document.querySelectorAll("img.hex-icon"));
		const fill = document.querySelector(".progress-fill");
		return {
			text: document.querySelector(".loading-text")?.textContent?.trim(),
			polygons: polygons.length,
			icons: icons.length,
			uniqueIcons: new Set(
				icons.map((image) => image.src.match(/icon-(?:w-)?(\d\d)\.svg/)?.[1]),
			).size,
			images: document.images.length,
			brokenImages: Array.from(document.images)
				.filter((image) => !image.complete || image.naturalWidth === 0)
				.map((image) => image.src),
			progress: fill?.getBoundingClientRect().width ?? 0,
			overflowX:
				document.documentElement.scrollWidth >
				document.documentElement.clientWidth + 1,
			overflowY:
				document.documentElement.scrollHeight >
				document.documentElement.clientHeight + 1,
			sceneVisible: Boolean(
				scene &&
					scene.getBoundingClientRect().width > 0 &&
					scene.getBoundingClientRect().height > 0,
			),
		};
	});
	await page.waitForTimeout(2600);
	const changed = await page.evaluate(() => ({
		icons: Array.from(document.querySelectorAll("img.hex-icon"))
			.map((image) => image.src)
			.join("|"),
		progress:
			document.querySelector(".progress-fill")?.getBoundingClientRect().width ??
			0,
	}));
	if (initial.text !== "Loading Resources")
		failures.push(`${width}: loading label missing`);
	if (initial.polygons !== 29 || !initial.sceneVisible)
		failures.push(`${width}: polygon scene unavailable`);
	if (initial.icons < 3 || initial.uniqueIcons !== 3)
		failures.push(`${width}: icon triplet invalid`);
	if (initial.images < 32 || initial.brokenImages.length)
		failures.push(`${width}: broken images ${initial.brokenImages.join(", ")}`);
	if (initial.progress === changed.progress)
		failures.push(`${width}: progress did not animate`);
	if (!changed.icons) failures.push(`${width}: icons did not render`);
	if (initial.overflowX || initial.overflowY)
		failures.push(`${width}: viewport overflow`);
	if (errors.length) failures.push(`${width}: console ${errors.join(" | ")}`);
	if (badResponses.length)
		failures.push(`${width}: responses ${badResponses.join(" | ")}`);
	await page.close();
}

await browser.close();

if (failures.length) {
	console.error(failures.join("\n"));
	process.exit(1);
}

console.log(`Verified ${widths.length} responsive QClay loader views`);
