// Cleans a captured Next.js page.html into a self-contained body for the clone.
// Usage: node _clean.mjs <slug>   (reads <slug>/page.html, writes <slug>/body.clean.html)
import fs from "node:fs";

const slug = process.argv[2];
if (!slug) { console.error("usage: node _clean.mjs <slug>"); process.exit(2); }

let html = fs.readFileSync(`${slug}/page.html`, "utf8");

// 1. Extract <body> inner
const bStart = html.indexOf("<body");
const bOpenEnd = html.indexOf(">", bStart) + 1;
const bEnd = html.lastIndexOf("</body>");
let body = html.slice(bOpenEnd, bEnd);

// 2. Remove all <script>...</script> blocks
body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
// 3. Remove <template> next markers and noscript
body = body.replace(/<template[\s\S]*?<\/template>/gi, "");
body = body.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
// 4. Remove next-route-announcer / hidden next portals
body = body.replace(/<next-route-announcer[\s\S]*?<\/next-route-announcer>/gi, "");

// 5. Decode the _next/image optimizer wrapper -> local asset path.
//    e.g. /_next/image?url=%2Fassets%2Fproject-1.webp&w=3840&q=75  ->  assets/project-1.webp (rooted at site root)
const deNextImg = (u) => {
  const m = u.match(/_next\/image\?url=([^&"'\s]+)/);
  if (!m) return u;
  let dec = decodeURIComponent(m[1]);
  if (dec.startsWith("http")) {
    // remote (unsplash) -> map to vendored unsplash file by photo id
    const pm = dec.match(/photo-([a-z0-9-]+)/);
    if (pm) {
      const map = {
        "1535713875002-d1d0cf377fde": "u1",
        "1494790108377-be9c29b29330": "u2",
        "1438761681033-6461ffad8d80": "u3",
        "1580489944761-15a19d654956": "u4",
      };
      const key = pm[1];
      if (map[key]) return `assets/unsplash/${map[key]}.webp`;
    }
    return dec; // leave remote as-is fallback
  }
  // local: site-root path "/X" -> "assets/X" (assets/ mirrors the original site root)
  return "assets/" + dec.replace(/^\//, "");
};

// rewrite src="/_next/image?..."
body = body.replace(/src="([^"]*_next\/image[^"]*)"/g, (_, u) => `src="${deNextImg(u.replace(/&amp;/g,'&'))}"`);
// rewrite srcset="..." (multiple entries)
body = body.replace(/srcSet="([^"]*)"/gi, () => ""); // drop srcset (single src is enough)
body = body.replace(/srcset="([^"]*)"/gi, () => "");
// rewrite plain root-relative webp/ico paths -> assets/ mirror
body = body.replace(/src="\/(assets|logos|avatar|fonts)\//g, 'src="assets/$1/');
body = body.replace(/src="\/(logo|logo-dark|manu|ace|workers)\.webp"/g, 'src="assets/$1.webp"');

// 6. Rewrite anchor hrefs: site-internal routes -> local .html files
const routeMap = (href) => {
  if (!href) return href;
  if (href === "/" ) return "index.html";
  // blog post
  let m = href.match(/^\/blog\/([a-z0-9-]+)\/?$/);
  if (m) return `blog-${m[1]}.html`;
  m = href.match(/^\/(work|products|pricing|blog)\/?$/);
  if (m) return `${m[1]}.html`;
  return href;
};
body = body.replace(/href="([^"]*)"/g, (full, href) => {
  const hh = href.replace(/&amp;/g,'&');
  if (hh.startsWith("/") && !hh.startsWith("//")) {
    return `href="${routeMap(hh.replace(/#$/,''))}"`;
  }
  return full;
});

// 7. Strip Next data attributes noise (optional, keep classes)
body = body.replace(/\sdata-sentry[^=]*="[^"]*"/g, "");

// 7b. Eager-load all images (original used loading="lazy"; eager is visually
//     identical and guarantees thumbnails render in static/offline captures).
body = body.replace(/\sloading="lazy"/g, "");

// 8. Safety: any remaining bare root logo refs -> assets/
body = body.replace(/src="(logo|logo-dark|manu|ace|workers)\.webp"/g, 'src="assets/$1.webp"');
// favicon path cleanup
body = body.replace(/src="\/favicon[^"]*"/g, 'src="assets/logo.webp"');

fs.writeFileSync(`${slug}/body.clean.html`, body);
console.log(slug, "clean body bytes:", body.length, "imgs:", (body.match(/<img/g)||[]).length, "scripts left:", (body.match(/<script/g)||[]).length);
