import fs from "node:fs";
let s = fs.readFileSync("/tmp/emerald-clean.html", "utf8");

// Decode &amp; in attribute urls handled inline per-replacement.
const dec = (u) => u.replace(/&amp;/g, "&");

// Map of static webp -> local
const staticMap = {
	"page-ui-log": "./assets/images/page-ui-log.webp",
	"backdrop-19": "./assets/images/backdrop-19.webp",
	"backdrop-5": "./assets/images/backdrop-5.webp",
	"product-sample": "./assets/images/product-sample.webp",
	"icon-logo-dark": "./assets/images/icon-logo-dark.webp",
	"icon-logo": "./assets/images/icon-logo.webp",
};

function localFor(rawUrl) {
	const u = dec(rawUrl);
	// Next image wrapper: /_next/image?url=<enc>&w=..&q=..
	const m = /\/_next\/image\?url=([^&]+)/.exec(u);
	let inner = m ? decodeURIComponent(m[1]) : u;
	// static images
	for (const key of Object.keys(staticMap)) {
		if (inner.includes(`/static/images/${key}.webp`)) return staticMap[key];
	}
	if (inner.includes("/static/images/icon.png")) return "./assets/images/icon.png";
	if (inner.includes("font-pairings/thumbnails")) return "./assets/images/font-pairing.webp";
	// picsum by id
	let pm = /picsum\.photos\/id\/(\d+)\//.exec(inner);
	if (pm) return `./assets/avatars/${pm[1]}.webp`;
	// picsum random
	let pr = /picsum\.photos\/100\/100\.webp\?random=(\d+)/.exec(inner);
	if (pr) return `./assets/avatars/r${pr[1]}.webp`;
	// producthunt badges
	if (inner.includes("top-post-badge")) return "./assets/badges/ph-daily.svg";
	if (inner.includes("top-post-topic-badge")) return "./assets/badges/ph-weekly.svg";
	// videos
	if (inner.includes("11-pricing-page-builder.mp4")) return "./assets/video/feature-1.mp4";
	if (inner.includes("4-deploy-to-vercel-with-1-click.mp4")) return "./assets/video/feature-2.mp4";
	return null;
}

// Replace srcset attributes -> single local src (drop srcset entirely later)
// First handle src="..." and srcSet/srcset="..."
s = s.replace(/\b(src|srcSet|srcset|poster)="([^"]+)"/g, (full, attr, val) => {
	// srcset: take first url
	const firstUrl = val.split(",")[0].trim().split(/\s+/)[0];
	const local = localFor(firstUrl) || localFor(val);
	if (!local) return full; // leave (e.g. data: or already local)
	if (attr === "srcSet" || attr === "srcset") return ""; // drop srcset; src handles it
	return `${attr}="${local}"`;
});

// Rewrite any remaining /_next/image or shipixen absolute that slipped (e.g. in style url())
s = s.replace(/\/_next\/image\?url=[^"')\s]+/g, (u) => localFor(u) || u);

// Repair lazy <img> elements that lost their src/srcset during serialization:
// look the image up by its alt text in the raw reference page.html and resolve locally.
const raw = fs.readFileSync(
	"/home/user/claude-directory/.claude/worktrees/agent-acf7e3fe5c5368c56/templates/premium/shipxen/emerald-ai/.reference/home/page.html",
	"utf8",
);
function srcFromRawByAlt(alt) {
	const idx = raw.indexOf(`alt="${alt}"`);
	if (idx < 0) return null;
	const tag = raw.slice(idx, idx + 800);
	const ss = /srcset="([^"]+)"/.exec(tag) || /srcSet="([^"]+)"/.exec(tag);
	const sc = /\ssrc="([^"]+)"/.exec(tag);
	const cand = ss ? ss[1].split(",")[0].trim().split(/\s+/)[0] : sc ? sc[1] : null;
	return cand ? localFor(cand) : null;
}
s = s.replace(/<img\b[^>]*>/g, (tag) => {
	if (/\ssrc="[^"]+"/.test(tag)) return tag; // already has a real src
	const am = /alt="([^"]*)"/.exec(tag);
	if (!am) return tag;
	const local = srcFromRawByAlt(am[1]);
	if (!local) return tag;
	return tag.replace(/<img\b/, `<img src="${local}"`);
});

// Neutralize internal nav hrefs to "#" (single-page template; host routes don't exist offline)
s = s.replace(/href="\/[^"#][^"]*"/g, 'href="#"');
s = s.replace(/href="\/"/g, 'href="#"');

fs.writeFileSync("/home/user/claude-directory/.claude/worktrees/agent-acf7e3fe5c5368c56/templates/premium/shipxen/emerald-ai/body.html", s);
console.log("body.html written", s.length, "bytes");
console.log("remaining _next refs:", (s.match(/_next/g) || []).length);
console.log("remaining shipixen.com refs:", (s.match(/shipixen\.com/g) || []).length);
console.log("remaining picsum refs:", (s.match(/picsum/g) || []).length);
console.log("remaining cache.shipixen refs:", (s.match(/cache\.shipixen/g) || []).length);
