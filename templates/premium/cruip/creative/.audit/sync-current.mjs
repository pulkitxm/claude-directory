import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const base = new URL("https://preview.cruip.com/creative/");
const pages = ["index.html", "signin.html", "signup.html", "reset-password.html"];
const queued = [...pages];
const seen = new Set();

const enqueue = (value, current) => {
	if (!value || value.startsWith("data:") || value.startsWith("#")) return;
	const url = new URL(value, new URL(current, base));
	if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
	const file = decodeURIComponent(url.pathname.slice(base.pathname.length));
	if (file && !seen.has(file)) queued.push(file);
};

while (queued.length) {
	const file = queued.shift();
	if (seen.has(file)) continue;
	seen.add(file);
	const response = await fetch(new URL(file, base));
	if (!response.ok) continue;
	const type = response.headers.get("content-type") || "";
	const target = path.join(root, file);
	fs.mkdirSync(path.dirname(target), { recursive: true });
	if (type.includes("text") || /\.(html|css|js|json|svg|webmanifest)$/.test(file)) {
		let body = await response.text();
		if (file.endsWith(".html")) {
			body = body.replace(/<!--[\s\S]*?-->/g, "").replace(/<script[^>]+cloudflareinsights[^>]*>[\s\S]*?<\/script>/g, "");
		}
		body = body.replaceAll("\u2014", ",");
		fs.writeFileSync(target, body);
		for (const match of body.matchAll(/(?:src|href)=["']([^"']+)["']/g)) enqueue(match[1], file);
		if (file.endsWith(".css")) for (const match of body.matchAll(/url\(["']?([^"')]+)["']?\)/g)) enqueue(match[1], file);
	} else {
		fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
	}
}

fs.writeFileSync(path.join(import.meta.dirname, "synced-files.json"), JSON.stringify([...seen].sort(), null, 2));
