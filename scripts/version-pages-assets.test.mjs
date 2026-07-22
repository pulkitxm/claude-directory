import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
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
