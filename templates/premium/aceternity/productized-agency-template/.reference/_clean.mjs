import fs from "node:fs";

const slug = process.argv[2];
if (!slug) { console.error("usage: node _clean.mjs <slug>"); process.exit(2); }

let html = fs.readFileSync(`${slug}/page.html`, "utf8");
const bStart = html.indexOf("<body");
const bOpenEnd = html.indexOf(">", bStart) + 1;
const bEnd = html.lastIndexOf("</body>");
let body = html.slice(bOpenEnd, bEnd);
body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
body = body.replace(/<template[\s\S]*?<\/template>/gi, "");
body = body.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
body = body.replace(/<next-route-announcer[\s\S]*?<\/next-route-announcer>/gi, "");
const deNextImg = (u) => {
  const m = u.match(/_next\/image\?url=([^&"'\s]+)/);
  if (!m) return u;
  let dec = decodeURIComponent(m[1]);
  if (dec.startsWith("http")) {
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
  return "assets/" + dec.replace(/^\//, "");
};
body = body.replace(/src="([^"]*_next\/image[^"]*)"/g, (_, u) => `src="${deNextImg(u.replace(/&amp;/g,'&'))}"`);
body = body.replace(/srcSet="([^"]*)"/gi, () => ""); // drop srcset (single src is enough)
body = body.replace(/srcset="([^"]*)"/gi, () => "");
body = body.replace(/src="\/(assets|logos|avatar|fonts)\//g, 'src="assets/$1/');
body = body.replace(/src="\/(logo|logo-dark|manu|ace|workers)\.webp"/g, 'src="assets/$1.webp"');
const routeMap = (href) => {
  if (!href) return href;
  if (href === "/" ) return "index.html";
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
body = body.replace(/\sdata-sentry[^=]*="[^"]*"/g, "");
body = body.replace(/\sloading="lazy"/g, "");
body = body.replace(/src="(logo|logo-dark|manu|ace|workers)\.webp"/g, 'src="assets/$1.webp"');
body = body.replace(/src="\/favicon[^"]*"/g, 'src="assets/logo.webp"');

fs.writeFileSync(`${slug}/body.clean.html`, body);
console.log(slug, "clean body bytes:", body.length, "imgs:", (body.match(/<img/g)||[]).length, "scripts left:", (body.match(/<script/g)||[]).length);
