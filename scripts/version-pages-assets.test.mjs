import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { versionPagesAssets } from "./version-pages-assets.mjs";

test("versions local asset graphs and preserves URL state", async () => {
	const root = await mkdtemp(join(tmpdir(), "pages-assets-"));
	try {
		await writeFile(
			join(root, "index.html"),
			'<link rel="stylesheet" href="./styles.css?theme=dark#sheet"><link rel="stylesheet" href="https://example.com/external.css"><script type="module" src="./app.js?mode=prod#ready"></script>',
		);
		await writeFile(
			join(root, "styles.css"),
			"@import \"./nested.css?density=high#layout\";body{background:url('./hero.svg#crop')}",
		);
		await writeFile(join(root, "nested.css"), "body{color:black}");
		await writeFile(join(root, "hero.svg"), "<svg></svg>");
		await writeFile(
			join(root, "app.js"),
			'import "./module.js?mode=fast#module";export { value } from "./other.mjs";const lazy=import(\'./lazy.js\');import React from "react";',
		);
		await writeFile(join(root, "module.js"), "export default 1");
		await writeFile(join(root, "other.mjs"), "export const value=2");
		await writeFile(join(root, "lazy.js"), "export default 3");

		const first = await versionPagesAssets(root, "1234567890abcdef");
		assert.deepEqual(first, { files: 3, references: 7 });
		const html = await readFile(join(root, "index.html"), "utf8");
		assert.match(
			html,
			/href="\.\/styles\.css\?theme=dark&v=1234567890ab#sheet"/,
		);
		assert.match(html, /src="\.\/app\.js\?mode=prod&v=1234567890ab#ready"/);
		assert.match(html, /https:\/\/example\.com\/external\.css/);
		const css = await readFile(join(root, "styles.css"), "utf8");
		assert.match(
			css,
			/@import "\.\/nested\.css\?density=high&v=1234567890ab#layout"/,
		);
		assert.match(css, /url\('\.\/hero\.svg\?v=1234567890ab#crop'\)/);
		const javaScript = await readFile(join(root, "app.js"), "utf8");
		assert.match(
			javaScript,
			/import "\.\/module\.js\?mode=fast&v=1234567890ab#module"/,
		);
		assert.match(
			javaScript,
			/export \{ value \} from "\.\/other\.mjs\?v=1234567890ab"/,
		);
		assert.match(javaScript, /import\('\.\/lazy\.js\?v=1234567890ab'\)/);
		assert.match(javaScript, /import React from "react"/);

		const before = await Promise.all(
			["index.html", "styles.css", "app.js"].map((file) =>
				readFile(join(root, file), "utf8"),
			),
		);
		const second = await versionPagesAssets(root, "1234567890abcdef");
		assert.deepEqual(second, { files: 0, references: 0 });
		const after = await Promise.all(
			["index.html", "styles.css", "app.js"].map((file) =>
				readFile(join(root, file), "utf8"),
			),
		);
		assert.deepEqual(after, before);

		const third = await versionPagesAssets(root, "fedcba0987654321");
		assert.deepEqual(third, { files: 3, references: 7 });
		assert.match(
			await readFile(join(root, "index.html"), "utf8"),
			/v=fedcba098765/,
		);
	} finally {
		await rm(root, { recursive: true, force: true });
	}
});

test("versions HTML media icons preloads srcsets and SVG references", async () => {
	const root = await mkdtemp(join(tmpdir(), "pages-html-assets-"));
	try {
		await mkdir(join(root, "assets"));
		await mkdir(join(root, "nested", "page"), { recursive: true });
		await writeFile(join(root, "CNAME"), "claude-directory.pulkitxm.com\n");
		for (const file of [
			"asset",
			"audio.mp3",
			"favicon.ico",
			"hero.png",
			"hero@2x.png",
			"manifest.json",
			"mobile.webp",
			"page.html",
			"poster.jpg",
			"sprite.svg",
			"video.mp4",
		])
			await writeFile(join(root, "assets", file), file);
		const source = [
			'<link rel="icon" href="../../assets/favicon.ico?theme=dark#icon">',
			'<link rel="apple-touch-startup-image" href="../../assets/poster.jpg">',
			'<link rel="manifest" href="/assets/manifest.json">',
			'<link rel="preload" as="image" href="../../assets/hero.png#preload" imagesrcset="../../assets/hero.png 1x, ../../assets/hero@2x.png 2x">',
			'<link rel="preload" as="image" href="../../assets/asset"><link rel="preload" as="document" href="../../assets/page.html">',
			'<link rel="prefetch" href="../../assets/hero.png">',
			'<link rel="canonical" href="../../assets/hero.png">',
			'<meta property="og:image" content="../../assets/hero.png#open-graph"><meta name="twitter:image" content="../../assets/hero@2x.png">',
			'<img src="../../assets/hero.png?size=wide#hero" srcset="../../assets/hero.png 480w, ../../assets/hero@2x.png 960w">',
			'<img src="../../assets/asset">',
			'<img srcset="data:image/png;base64,AAAA 1x, ../../assets/hero@2x.png 2x">',
			'<img src="https://claude-directory.pulkitxm.com/assets/hero.png#same-site">',
			'<img src="https://example.com/assets/hero.png"><img src="data:image/png;base64,AAAA"><img src="blob:https://example.com/id">',
			'<picture><source srcset="../../assets/mobile.webp 1x, ../../assets/hero.png 2x"></picture>',
			'<video src="../../assets/video.mp4" poster="../../assets/poster.jpg"><source src="../../assets/video.mp4"></video>',
			'<audio src="../../assets/audio.mp3"></audio>',
			'<object data="../../assets/video.mp4"></object><embed src="../../assets/video.mp4">',
			'<svg><use href="../../assets/sprite.svg#play"></use><image xlink:href="../../assets/hero.png#art"></image><use href="#local-symbol"></use></svg>',
			'<a href="../../assets/hero.png">Navigation remains unchanged</a>',
		].join("");
		const file = join(root, "nested", "page", "index.html");
		await writeFile(file, source);

		const first = await versionPagesAssets(root, "abcdef1234567890");
		assert.deepEqual(first, { files: 1, references: 26 });
		const html = await readFile(file, "utf8");
		assert.match(
			html,
			/href="\.\.\/\.\.\/assets\/favicon\.ico\?theme=dark&v=abcdef123456#icon"/,
		);
		assert.match(html, /href="\/assets\/manifest\.json\?v=abcdef123456"/);
		assert.match(
			html,
			/imagesrcset="\.\.\/\.\.\/assets\/hero\.png\?v=abcdef123456 1x, \.\.\/\.\.\/assets\/hero@2x\.png\?v=abcdef123456 2x"/,
		);
		assert.match(
			html,
			/src="\.\.\/\.\.\/assets\/hero\.png\?size=wide&v=abcdef123456#hero"/,
		);
		assert.match(
			html,
			/srcset="\.\.\/\.\.\/assets\/hero\.png\?v=abcdef123456 480w, \.\.\/\.\.\/assets\/hero@2x\.png\?v=abcdef123456 960w"/,
		);
		assert.match(
			html,
			/src="https:\/\/claude-directory\.pulkitxm\.com\/assets\/hero\.png\?v=abcdef123456#same-site"/,
		);
		assert.match(
			html,
			/poster="\.\.\/\.\.\/assets\/poster\.jpg\?v=abcdef123456"/,
		);
		assert.match(
			html,
			/property="og:image" content="\.\.\/\.\.\/assets\/hero\.png\?v=abcdef123456#open-graph"/,
		);
		assert.match(
			html,
			/srcset="data:image\/png;base64,AAAA 1x, \.\.\/\.\.\/assets\/hero@2x\.png\?v=abcdef123456 2x"/,
		);
		assert.match(html, /data="\.\.\/\.\.\/assets\/video\.mp4\?v=abcdef123456"/);
		assert.match(
			html,
			/href="\.\.\/\.\.\/assets\/sprite\.svg\?v=abcdef123456#play"/,
		);
		assert.match(
			html,
			/xlink:href="\.\.\/\.\.\/assets\/hero\.png\?v=abcdef123456#art"/,
		);
		assert.match(html, /rel="canonical" href="\.\.\/\.\.\/assets\/hero\.png"/);
		assert.match(html, /<a href="\.\.\/\.\.\/assets\/hero\.png">/);
		assert.match(html, /https:\/\/example\.com\/assets\/hero\.png/);
		assert.match(html, /data:image\/png;base64,AAAA/);
		assert.match(html, /blob:https:\/\/example\.com\/id/);
		assert.match(html, /href="#local-symbol"/);
		assert.match(html, /src="\.\.\/\.\.\/assets\/asset\?v=abcdef123456"/);
		assert.match(
			html,
			/rel="preload" as="document" href="\.\.\/\.\.\/assets\/page\.html"/,
		);

		assert.deepEqual(await versionPagesAssets(root, "abcdef1234567890"), {
			files: 0,
			references: 0,
		});
		assert.deepEqual(await versionPagesAssets(root, "654321fedcba"), {
			files: 1,
			references: 26,
		});
		assert.doesNotMatch(await readFile(file, "utf8"), /v=abcdef123456/);
	} finally {
		await rm(root, { recursive: true, force: true });
	}
});

test("versions safe static runtime strings in JavaScript and JSON", async () => {
	const root = await mkdtemp(join(tmpdir(), "pages-runtime-assets-"));
	try {
		await mkdir(join(root, "assets"));
		await writeFile(join(root, "CNAME"), "claude-directory.pulkitxm.com\n");
		for (const file of [
			"config.json",
			"hero.png",
			"icon.svg",
			"page.html",
			"poster.jpg",
			"video.mp4",
		])
			await writeFile(join(root, "assets", file), file);
		await writeFile(
			join(root, "runtime.js"),
			'import chart from "chart.js";export { default as exported } from "chart.js";const dynamicChart=import("chart.js");const common= require("chart.js");define(["moment", "chart.js"],()=>chart);require(["moment","chart.js"],()=>chart);const hero="./assets/hero.png?size=wide#crop";const poster=\'./assets/poster.jpg\';const icon="https://claude-directory.pulkitxm.com/assets/icon.svg#mark";const video=`./assets/video.mp4`;const navigation="./assets/page.html";const external="https://example.com/assets/hero.png";const data="data:image/png;base64,AAAA";const blob="blob:https://example.com/id";const mail="mailto:test@example.com";const phone="tel:+10000000000";const hash="#section";const dynamic=`./assets/${name}.png`;const labels={"./assets/icon.svg":"key remains unchanged"};',
		);
		await writeFile(join(root, "chart.js"), "export default chart");
		await writeFile(
			join(root, "runtime.json"),
			'{"hero":"./assets/hero.png#json","nested":{"poster":"./assets/poster.jpg?size=card","config":"./assets/config.json"},"navigation":"./assets/page.html","external":"https://example.com/assets/hero.png","data":"data:image/png;base64,AAAA","./assets/icon.svg":"key remains unchanged"}',
		);

		const first = await versionPagesAssets(root, "1122334455667788");
		assert.deepEqual(first, { files: 2, references: 7 });
		const javaScript = await readFile(join(root, "runtime.js"), "utf8");
		assert.match(javaScript, /hero\.png\?size=wide&v=112233445566#crop/);
		assert.match(javaScript, /poster\.jpg\?v=112233445566/);
		assert.match(
			javaScript,
			/https:\/\/claude-directory\.pulkitxm\.com\/assets\/icon\.svg\?v=112233445566#mark/,
		);
		assert.match(javaScript, /video\.mp4\?v=112233445566/);
		assert.match(javaScript, /import chart from "chart\.js"/);
		assert.match(
			javaScript,
			/export \{ default as exported \} from "chart\.js"/,
		);
		assert.match(javaScript, /import\("chart\.js"\)/);
		assert.match(javaScript, /require\("chart\.js"\)/);
		assert.match(javaScript, /define\(\["moment", "chart\.js"\]/);
		assert.match(javaScript, /require\(\["moment","chart\.js"\]/);
		assert.match(javaScript, /navigation="\.\/assets\/page\.html"/);
		assert.match(javaScript, /https:\/\/example\.com\/assets\/hero\.png/);
		assert.match(javaScript, /data:image\/png;base64,AAAA/);
		assert.match(javaScript, /blob:https:\/\/example\.com\/id/);
		assert.match(javaScript, /mailto:test@example\.com/);
		assert.match(javaScript, /tel:\+10000000000/);
		assert.match(javaScript, /hash="#section"/);
		assert.match(javaScript, /`\.\/assets\/\$\{name\}\.png`/);
		assert.match(javaScript, /"\.\/assets\/icon\.svg":"key remains unchanged"/);
		const json = await readFile(join(root, "runtime.json"), "utf8");
		assert.match(json, /hero\.png\?v=112233445566#json/);
		assert.match(json, /poster\.jpg\?size=card&v=112233445566/);
		assert.match(json, /config\.json\?v=112233445566/);
		assert.match(json, /"navigation":"\.\/assets\/page\.html"/);
		assert.match(json, /"\.\/assets\/icon\.svg":"key remains unchanged"/);
		assert.match(json, /https:\/\/example\.com\/assets\/hero\.png/);
		assert.match(json, /data:image\/png;base64,AAAA/);
		assert.deepEqual(await versionPagesAssets(root, "1122334455667788"), {
			files: 0,
			references: 0,
		});
	} finally {
		await rm(root, { recursive: true, force: true });
	}
});

test("resolves nested HTML assets against the first valid base URL", async () => {
	const root = await mkdtemp(join(tmpdir(), "pages-base-assets-"));
	try {
		await mkdir(join(root, "site", "about"), { recursive: true });
		await mkdir(join(root, "site", "same"), { recursive: true });
		await mkdir(join(root, "site", "external"), { recursive: true });
		await mkdir(join(root, "site", "assets"), { recursive: true });
		await writeFile(join(root, "CNAME"), "claude-directory.pulkitxm.com\n");
		for (const file of ["app.js", "hero.webp", "page.html", "styles.css"])
			await writeFile(join(root, "site", "assets", file), file);
		await writeFile(
			join(root, "site", "about", "index.html"),
			'<base href="http://["><base href="../?theme=dark#base"><link rel="stylesheet" href="assets/styles.css"><script src="assets/app.js"></script><img src="assets/hero.webp?size=large#hero" srcset="assets/hero.webp 1x"><a href="assets/page.html">Document link</a>',
		);
		await writeFile(
			join(root, "site", "external", "index.html"),
			'<base href="https://cdn.example.com/theme/"><img src="assets/hero.webp"><img src="/site/assets/hero.webp"><script src="assets/app.js"></script><img src="https://claude-directory.pulkitxm.com/site/assets/hero.webp#same-site">',
		);
		await writeFile(
			join(root, "site", "same", "index.html"),
			'<base href="https://claude-directory.pulkitxm.com/site/?theme=dark#base"><img src="assets/hero.webp#same-base">',
		);

		assert.deepEqual(await versionPagesAssets(root, "base1234567890"), {
			files: 3,
			references: 6,
		});
		const local = await readFile(
			join(root, "site", "about", "index.html"),
			"utf8",
		);
		assert.match(local, /href="assets\/styles\.css\?v=base12345678"/);
		assert.match(local, /src="assets\/app\.js\?v=base12345678"/);
		assert.match(
			local,
			/src="assets\/hero\.webp\?size=large&v=base12345678#hero"/,
		);
		assert.match(local, /srcset="assets\/hero\.webp\?v=base12345678 1x"/);
		assert.match(local, /href="assets\/page\.html"/);
		const external = await readFile(
			join(root, "site", "external", "index.html"),
			"utf8",
		);
		assert.match(external, /src="assets\/hero\.webp"/);
		assert.match(external, /src="\/site\/assets\/hero\.webp"/);
		assert.match(external, /src="assets\/app\.js"/);
		assert.match(
			external,
			/src="https:\/\/claude-directory\.pulkitxm\.com\/site\/assets\/hero\.webp\?v=base12345678#same-site"/,
		);
		assert.match(
			await readFile(join(root, "site", "same", "index.html"), "utf8"),
			/src="assets\/hero\.webp\?v=base12345678#same-base"/,
		);
		assert.deepEqual(await versionPagesAssets(root, "base1234567890"), {
			files: 0,
			references: 0,
		});
	} finally {
		await rm(root, { recursive: true, force: true });
	}
});