import playwright from "/Volumes/Sandisk SSD/codingAndFun/samaan/fable/scripts/record-demos/node_modules/playwright/index.js";

const { chromium } = playwright;
const base = process.env.VERIFY_URL || "http://127.0.0.1:4182/templates/premium/shadcnblocks/metafi/";
const routes = [
	"index.html",
	"about.html",
	"blog.html",
	"careers.html",
	"contact.html",
	"cookie-policy.html",
	"features.html",
	"integrations.html",
	"login.html",
	"pricing.html",
	"privacy.html",
	"signup.html",
	"terms.html",
	"blog/a-comprehensive-guide-on-importing-customers.html",
	"blog/a-dynamic-back-office-is-the-new-business.html",
	"blog/automate-workflow-with-metafi-zapier-integration.html",
	"blog/do-startup-valuations-matter-for-investment-returns.html",
	"blog/how-metafi-builds-interactive-docs-slack.html",
	"blog/how-to-use-ghost-and-metafi-together.html",
];
const widths = [390, 768, 1280];
const failures = [];
const browser = await chromium.launch();

for (const width of widths) {
	for (const route of routes) {
		const page = await browser.newPage({ viewport: { width, height: 900 } });
		const errors = [];
		const badResponses = [];
		page.on("console", (message) => {
			if (message.type() === "error") errors.push(message.text());
		});
		page.on("pageerror", (error) => errors.push(error.message));
		page.on("response", (response) => {
			if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
		});
		await page.goto(new URL(route, base).href, { waitUntil: "networkidle", timeout: 60000 });
		await page.evaluate(async () => {
			for (let y = 0; y < document.body.scrollHeight; y += Math.max(500, window.innerHeight * 0.8)) {
				window.scrollTo(0, y);
				await new Promise((resolve) => setTimeout(resolve, 30));
			}
			window.scrollTo(0, 0);
		});
		await page.waitForTimeout(200);
		const state = await page.evaluate(() => ({
			heading: document.querySelector("h1")?.textContent?.trim(),
			main: Boolean(document.querySelector("main")),
			content: document.body.innerText.trim().length,
			brokenImages: Array.from(document.images).filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
			overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
			offenders: Array.from(document.querySelectorAll("*"))
				.filter((element) => element.getBoundingClientRect().right > document.documentElement.clientWidth + 1 || element.getBoundingClientRect().left < -1)
				.slice(0, 5)
				.map((element) => `${element.tagName}.${element.className}`),
		}));
		if (!state.main || state.content < 80) failures.push(`${width} ${route}: content missing`);
		if (state.brokenImages.length) failures.push(`${width} ${route}: broken images ${state.brokenImages.join(", ")}`);
		if (state.overflow) failures.push(`${width} ${route}: horizontal overflow ${state.offenders.join(" | ")}`);
		if (errors.length) failures.push(`${width} ${route}: console ${errors.join(" | ")}`);
		if (badResponses.length) failures.push(`${width} ${route}: responses ${badResponses.join(" | ")}`);
		await page.close();
	}
}

const interactionPage = await browser.newPage({ viewport: { width: 390, height: 900 } });
await interactionPage.goto(new URL("index.html", base).href, { waitUntil: "networkidle" });
const menu = interactionPage.getByRole("button", { name: "Toggle main menu" });
await menu.click();
if ((await menu.getAttribute("aria-expanded")) !== "true") failures.push("mobile menu did not open");
const theme = interactionPage.getByText("Toggle theme").locator("..");
await theme.click();
if (!(await interactionPage.locator("html").evaluate((element) => element.classList.contains("dark")))) failures.push("theme did not switch");
await interactionPage.close();

const pricingPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await pricingPage.goto(new URL("pricing.html", base).href, { waitUntil: "networkidle" });
const billing = pricingPage.locator("[role='switch']").first();
if (await billing.count()) {
	const before = await billing.getAttribute("aria-checked");
	await billing.click();
	if ((await billing.getAttribute("aria-checked")) === before) failures.push("billing switch did not change");
}
const accordion = pricingPage.locator("button[aria-controls]").first();
if (await accordion.count()) {
	await accordion.click();
	if ((await accordion.getAttribute("aria-expanded")) !== "true") failures.push("accordion did not open");
}
await pricingPage.close();

const loginPage = await browser.newPage({ viewport: { width: 768, height: 900 } });
await loginPage.goto(new URL("login.html", base).href, { waitUntil: "networkidle" });
const password = loginPage.locator("input#password").first();
await loginPage.getByRole("button", { name: "Show password" }).first().click();
if ((await password.getAttribute("type")) !== "text") failures.push("password visibility did not switch");
await loginPage.close();

await browser.close();

if (failures.length) {
	console.error(failures.join("\n"));
	process.exit(1);
}

console.log(`Verified ${routes.length} Metafi routes at ${widths.length} widths`);
