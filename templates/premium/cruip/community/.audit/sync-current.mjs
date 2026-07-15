import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const base = "https://preview.cruip.com/community";
const pages = ["index.html", "post.html", "signin.html", "join.html", "about.html", "contact.html", "faq.html", "privacy-terms.html"];
const assets = new Set(["style.css", "js/main.js", "js/vendors/alpinejs.min.js", "fonts/Aspekta-700.woff2"]);
for (const file of pages) {
	const response = await fetch(`${base}/${file}`);
	let body = await response.text();
	for (const match of body.matchAll(/(?:src|href)="\.\/([^"?#]+)"/g)) {
		if (!match[1].endsWith(".html")) assets.add(match[1]);
	}
	body = body.replace(/<!--[\s\S]*?-->/g, "").replace(/<script[^>]+cloudflareinsights[^>]*>[\s\S]*?<\/script>/g, "").replaceAll("\u2014", ",").replace(/[ \t]+$/gm, "");
	fs.writeFileSync(path.join(root, file), body);
}
for (const file of assets) {
	const response = await fetch(`${base}/${file}`);
	if (!response.ok) continue;
	const target = path.join(root, file);
	fs.mkdirSync(path.dirname(target), { recursive: true });
	fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
}
const emailDecoder = "cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js";
const emailResponse = await fetch(`https://preview.cruip.com/${emailDecoder}`);
if (emailResponse.ok) {
	const target = path.join(root, emailDecoder);
	fs.mkdirSync(path.dirname(target), { recursive: true });
	fs.writeFileSync(target, Buffer.from(await emailResponse.arrayBuffer()));
}
