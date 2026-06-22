import fs from "node:fs";
import path from "node:path";

const ROOT = "/home/user/claude-directory/.claude/worktrees/compass/templates/premium/tailwindcss/compass";
const REF = path.join(ROOT, ".reference");

// slug -> {ref folder, title, out file, breadcrumb}
const PAGES = JSON.parse(fs.readFileSync(path.join(REF, "_pages.json"), "utf8"));

function decodeNextImage(u) {
  // /_next/image?url=ENCODED&w=..&q=.. -> assets/img/<file>
  const m = u.match(/url=([^&]+)/);
  if (!m) return u;
  const dec = decodeURIComponent(m[1]);
  const fm = dec.match(/templates\/compass\/([^?&"']+)/);
  if (fm) return `assets/img/${fm[1]}`;
  return u;
}

function rewrite(html) {
  // direct asset urls (png/jpg/webp/svg) -> assets/img ; mp4 -> assets/video
  html = html.replace(/https:\/\/assets\.tailwindcss\.com\/templates\/compass\/([^"'\\ )]+)/g, (m, f) => {
    if (/\.mp4$/i.test(f)) return `assets/video/${f}`;
    return `assets/img/${f}`;
  });
  // _next/image src + each srcset entry (decode before w/q params get split)
  html = html.replace(/\/_next\/image\?url=[^"'\s]+/g, (m) => {
    // strip trailing &amp; encoded params handled by decode
    return decodeNextImage(m.replace(/&amp;/g, "&"));
  });
  // srcset density descriptors: collapse to single local src (keep first)
  html = html.replace(/srcset="([^"]*)"/g, (m, s) => {
    const first = s.split(",")[0].trim().split(/\s+/)[0];
    return `srcset="${first}"`;
  });
  // favicon
  html = html.replace(/\/favicon\.ico[^"']*/g, "assets/img/favicon.ico");
  // article slug links stay relative -> add .html ; map "/" -> index.html
  return html;
}

function relinkInternal(html) {
  const slugs = PAGES.filter(p => p.type === "article").map(p => p.slug);
  // map href="/slug" -> slug.html
  html = html.replace(/href="\/([a-z0-9-]+)"/g, (m, s) => {
    if (s === "interviews") return 'href="interviews.html"';
    if (s === "resources") return 'href="resources.html"';
    if (slugs.includes(s)) return `href="${s}.html"`;
    return m;
  });
  // href="/" -> index.html
  html = html.replace(/href="\/"/g, 'href="index.html"');
  // login etc -> keep as # (no page)
  html = html.replace(/href="\/login"/g, 'href="#"');
  return html;
}

function extractBody(html) {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
  let body = m ? m[1] : html;
  // strip all script tags
  body = body.replace(/<script[\s\S]*?<\/script>/g, "");
  // strip next-route-announcer & hidden react markers
  body = body.replace(/<next-route-announcer[\s\S]*?<\/next-route-announcer>/g, "");
  body = body.replace(/<!--\$-->|<!--\/\$-->/g, "");
  body = body.replace(/<div hidden=""><\/div>/g, "");
  // strip data-headlessui ids that are unstable (keep attribute names we need)
  return body.trim();
}

const HEAD = (title) => `<!DOCTYPE html>
<html lang="en" class="geistmono_157ca88a-module__iaM1Ya__variable intervariable_d4ac54f8-module__xNm77a__variable scroll-pt-16 font-sans antialiased">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="icon" href="assets/img/favicon.ico">
<link rel="stylesheet" href="assets/css/app.css">
</head>`;

for (const p of PAGES) {
  const refHtml = fs.readFileSync(path.join(REF, p.ref, "page.html"), "utf8");
  let body = extractBody(refHtml);
  body = rewrite(body);
  body = relinkInternal(body);
  const out = `${HEAD(p.title)}
<body>
${body}
<script src="assets/js/app.js"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(ROOT, p.out), out);
  console.log("wrote", p.out, "(" + out.length + " bytes)");
}
console.log("DONE");
