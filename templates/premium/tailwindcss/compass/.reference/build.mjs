import fs from "node:fs";
import path from "node:path";

const PROJ = "/home/user/claude-directory/templates/premium/tailwindcss/compass";
const REF = `${PROJ}/.reference`;
const pages = JSON.parse(fs.readFileSync(`${REF}/_pages.json`, "utf8"));

function refDirFor(p) {
  if (p.type === "interview") return `${REF}/${p.ref}`; // interview-annie-king
  if (p.ref === "home") return `${REF}/home`;
  return `${REF}/${p.slug}`;
}

// depth = how many '../' to reach project root from the output file
function prefixFor(out) {
  const depth = out.split("/").length - 1; // interviews/annie-king.html -> 1
  return "../".repeat(depth);
}

const FAVICON_RE = /\/favicon\.ico\?[^"']*/g;

function transform(p) {
  const dir = refDirFor(p);
  let h = fs.readFileSync(`${dir}/page.html`, "utf8");
  const pfx = prefixFor(p.out);

  // --- strip all <script> tags (Next runtime + inline hydration) ---
  h = h.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  h = h.replace(/<script\b[^>]*\/?>(?![\s\S])/gi, "");

  // --- strip Next preload/prefetch/modulepreload links & next css link ---
  h = h.replace(/<link\b[^>]*rel="?(?:preload|prefetch|modulepreload|stylesheet)"?[^>]*>/gi, (m) => {
    // keep nothing from next; we inject our own
    return "";
  });
  // strip any leftover <link ... /_next ...>
  h = h.replace(/<link\b[^>]*\/_next[^>]*>/gi, "");
  // strip Next data / RSC noise comments
  h = h.replace(/<!--\$-->|<!--\/\$-->|<!--\?-->/g, "");

  // --- HEAD: replace <head>...</head> content with clean head ---
  const titleMatch = h.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : p.title;
  const head = `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="Compass — a self-contained, offline study clone of the Tailwind Plus Compass course template.">
<link rel="icon" href="${pfx}assets/img/favicon.ico">
<link rel="preload" href="${pfx}assets/fonts/InterVariable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${pfx}assets/css/app.css">
</head>`;
  h = h.replace(/<head>[\s\S]*?<\/head>/i, head);

  // --- rewrite _next/image wrapped srcs -> local asset ---
  h = h.replace(/\/_next\/image\?url=([^"&]+)(?:&[^"]*)?/g, (m, enc) => {
    let u;
    try { u = decodeURIComponent(enc); } catch { u = enc; }
    const mm = u.match(/assets\.tailwindcss\.com\/templates\/compass\/([^?]+)/);
    if (mm) {
      const name = mm[1].replace(/\.mp4$/, "-720p.mp4"); // (images only here normally)
      return `${pfx}assets/img/${mm[1]}`;
    }
    return m;
  });
  // strip srcset that referenced _next/image (now broken) — remove srcset attr entirely
  h = h.replace(/\s+srcset="[^"]*"/g, "");
  h = h.replace(/\s+sizes="[^"]*"/g, "");
  h = h.replace(/\s+loading="lazy"/g, "");

  // --- rewrite direct asset image urls (png/jpg/svg/webp) -> local ---
  h = h.replace(/https:\/\/assets\.tailwindcss\.com\/templates\/compass\/([^"'\s)\\]+\.(?:png|jpg|jpeg|svg|webp|gif|avif))/g,
    (m, name) => `${pfx}assets/img/${name}`);

  // --- rewrite video sources: assets...<name>.mp4 (and 1080p variant) -> local 720p ---
  // handle <source src=".../X-1080p.mp4"> and X-720p.mp4 and X.mp4
  h = h.replace(/https:\/\/assets\.tailwindcss\.com\/templates\/compass\/([^"'\s)\\]+?)(?:-1080p|-720p)?\.mp4/g,
    (m, base) => `${pfx}assets/video/${base}${(["annie-king","eleanor-vann","mick-larson","nolan-grayson","sophia-reid","tom-harris-interview"].includes(base)) ? "-720p" : ""}.mp4`);

  // collapse duplicate <source> tags that now point to same file: keep both is harmless,
  // but drop a source whose src duplicates the previous one in the same <video>
  h = h.replace(/<video\b[\s\S]*?<\/video>/gi, (block) => {
    const seen = new Set();
    return block.replace(/<source\b[^>]*src="([^"]+)"[^>]*>/gi, (s, src) => {
      if (seen.has(src)) return "";
      seen.add(src);
      return s;
    });
  });

  // --- favicon leftover refs ---
  h = h.replace(FAVICON_RE, `${pfx}assets/img/favicon.ico`);

  // --- internal links: "/" -> index, "/foo" -> foo.html, "/interviews/x" -> interviews/x.html ---
  h = h.replace(/href="(\/[^"#?]*)(#[^"]*)?"/g, (m, p1, hash = "") => {
    let target;
    if (p1 === "/") target = "index.html";
    else if (p1 === "/interviews") target = "interviews.html";
    else if (p1.startsWith("/interviews/")) target = `interviews/${p1.split("/").pop()}.html`;
    else if (p1 === "/resources") target = "resources.html";
    else target = `${p1.slice(1)}.html`;
    return `href="${pfx}${target}${hash || ""}"`;
  });

  // --- remove Next.js data attributes that leak hydration ids (cosmetic) ---
  h = h.replace(/\s+data-sentry-[a-z-]+="[^"]*"/gi, "");

  // --- inject JS shim before </body> ---
  h = h.replace(/<\/body>/i, `<script src="${pfx}assets/js/app.js"></script>\n</body>`);

  return h;
}

let count = 0;
for (const p of pages) {
  const out = path.join(PROJ, p.out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const html = transform(p);
  fs.writeFileSync(out, html);
  count++;
}
console.log(`built ${count} pages`);
