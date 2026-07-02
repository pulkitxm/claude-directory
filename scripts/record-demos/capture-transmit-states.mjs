import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const URL = process.argv[2];
const OUT = process.argv[3];
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ ignoreHTTPSErrors: true });
const page = await browser.newPage({
	viewport: { width: 1440, height: 900 },
	ignoreHTTPSErrors: true,
});
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);

const interactions = [];

// 1. Click a "Listen" play button to spawn the audio player
const before = await page.evaluate(
	() =>
		document.querySelector(".fixed.inset-x-0.bottom-0")?.innerHTML?.length || 0,
);
const listen = await page.$('button[aria-label^="Play episode"]');
if (listen) {
	await listen.click();
	await page.waitForTimeout(1500);
	await page.screenshot({
		path: path.join(OUT, "audio-player-active.png"),
		fullPage: false,
	});
	const playerHTML = await page.evaluate(() => {
		const el = document.querySelector(".fixed.inset-x-0.bottom-0");
		return el ? el.outerHTML : null;
	});
	fs.writeFileSync(path.join(OUT, "audio-player.html"), playerHTML || "");
	interactions.push({
		name: "play-episode",
		trigger: 'button[aria-label^="Play episode"]',
		delta: `audio player div populated (innerHTML ${before} -> populated), fixed bottom bar appears`,
		screenshot: "audio-player-active.png",
	});
}

fs.writeFileSync(
	path.join(OUT, "interactions.json"),
	JSON.stringify(interactions, null, 2),
);
console.log("done", interactions.length);
await browser.close();
