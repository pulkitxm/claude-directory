import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const base = "https://preview.cruip.com/appy";
const pages = ["index.html", "products.html", "product.html", "about.html", "blog.html", "blog-post.html", "testimonials.html", "help.html", "contact.html", "404.html", "privacy.html", "terms.html"];
const assets = ["style.css", "css/vendors/aos.css", "css/vendors/swiper-bundle.min.css", "js/main.js", "js/vendors/alpinejs.min.js", "js/vendors/aos.js", "js/vendors/swiper-bundle.min.js", "images/carousel-item-07.jpg", "images/carousel-item-08.jpg", "favicon/favicon-96x96.png", "favicon/favicon.svg", "favicon/favicon.ico", "favicon/apple-touch-icon.png", "favicon/site.webmanifest"];
for (const file of pages) {
	const response = await fetch(`${base}/${file}`);
	let body = await response.text();
	body = body.replace(/<!--[\s\S]*?-->/g, "").replace(/<script[^>]+cloudflareinsights[^>]*>[\s\S]*?<\/script>/g, "").replaceAll("\u2014", ",");
	fs.writeFileSync(path.join(root, file), body);
}
for (const file of assets) {
	const response = await fetch(`${base}/${file}`);
	if (!response.ok) continue;
	const target = path.join(root, file);
	fs.mkdirSync(path.dirname(target), { recursive: true });
	fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
}
