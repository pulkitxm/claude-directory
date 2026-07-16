import { chromium } from "playwright";

const baseUrl = process.argv[2] ?? "http://localhost:4173";
let failures = 0;

const check = (name, ok, detail = "") => {
	console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `: ${detail}` : ""}`);
	if (!ok) failures += 1;
};

const browser = await chromium.launch();
for (const width of [390, 768, 1280]) {
	const page = await browser.newPage({ viewport: { width, height: 800 } });
	const errors = [];
	const failedRequests = [];
	const badResponses = [];
	page.on(
		"console",
		(message) => message.type() === "error" && errors.push(message.text()),
	);
	page.on("pageerror", (error) => errors.push(String(error)));
	page.on("requestfailed", (request) =>
		failedRequests.push(
			`${request.url()} ${request.failure()?.errorText ?? "failed"}`,
		),
	);
	page.on(
		"response",
		(response) =>
			response.status() >= 400 &&
			badResponses.push(`${response.status()} ${response.url()}`),
	);

	await page.goto(baseUrl, { waitUntil: "networkidle" });
	await page.waitForTimeout(1200);
	check(
		`${width}px title`,
		(await page.title()) === "Scanner Card Stream",
		await page.title(),
	);
	check(`${width}px canvases`, (await page.locator("canvas").count()) === 2);
	check(
		`${width}px cards`,
		(await page.locator(".card-wrapper").count()) === 30,
	);
	const state = await page.evaluate(() => ({
		imagesLoaded: [...document.querySelectorAll(".card-normal img")].every(
			(image) =>
				image.getAttribute("src")?.includes("assets/cards/") &&
				image.complete &&
				image.naturalWidth > 0,
		),
		overflow: document.documentElement.scrollWidth - window.innerWidth,
	}));
	check(`${width}px card images`, state.imagesLoaded);
	check(`${width}px no overflow`, state.overflow === 0, String(state.overflow));
	check(`${width}px controls`, (await page.getByRole("button").count()) === 3);
	check(
		`${width}px speed gauge`,
		(await page.getByText("scan rate").count()) === 1,
	);

	const stream = page.locator(".card-wrapper").first().locator("..");
	const before = await stream.evaluate((element) => element.style.transform);
	await page.waitForTimeout(500);
	const after = await stream.evaluate((element) => element.style.transform);
	check(`${width}px animation`, before !== after, `${before} to ${after}`);

	await page.getByRole("button", { name: "Pause" }).click();
	await page.waitForTimeout(100);
	const pausedBefore = await stream.evaluate(
		(element) => element.style.transform,
	);
	await page.waitForTimeout(400);
	const pausedAfter = await stream.evaluate(
		(element) => element.style.transform,
	);
	check(
		`${width}px pause`,
		pausedBefore === pausedAfter,
		`${pausedBefore} and ${pausedAfter}`,
	);
	await page.getByRole("button", { name: "Play" }).click();
	await page.waitForTimeout(300);
	const resumed = await stream.evaluate((element) => element.style.transform);
	check(
		`${width}px resume`,
		resumed !== pausedAfter,
		`${pausedAfter} to ${resumed}`,
	);

	check(`${width}px no errors`, errors.length === 0, errors.join(" | "));
	check(
		`${width}px no failed requests`,
		failedRequests.length === 0,
		failedRequests.join(" | "),
	);
	check(
		`${width}px no bad responses`,
		badResponses.length === 0,
		badResponses.join(" | "),
	);
	await page.screenshot({
		path: `.audit/responsive/${width}.png`,
		fullPage: true,
	});
	await page.close();
}

await browser.close();
console.log(failures === 0 ? "ALL CHECKS PASSED" : `${failures} CHECKS FAILED`);
process.exit(failures === 0 ? 0 : 1);
