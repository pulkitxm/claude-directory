import fs from "node:fs";

const ref = "./home";
let header = fs.readFileSync(`${ref}/header-raw.html`, "utf8");
let main = fs.readFileSync(`${ref}/main-raw.html`, "utf8");
let footer = fs.readFileSync(`${ref}/footer-raw.html`, "utf8");

function clean(html) {
  // strip data-sentry-* and data-nimg attributes
  html = html.replace(/\s+data-sentry-[a-z-]+="[^"]*"/g, "");
  html = html.replace(/\s+data-nimg="[^"]*"/g, "");
  html = html.replace(/\s+data-state="[^"]*"/g, "");
  // remove next prefetch link tags inside
  // map local images
  const imgMap = {
    "%2Fstatic%2Fimages%2Fbackdrop-2.webp": "assets/images/backdrop-2.webp",
    "%2Fstatic%2Fimages%2Fbackdrop-5.webp": "assets/images/backdrop-5.webp",
    "%2Fstatic%2Fimages%2Fbackdrop-6.webp": "assets/images/backdrop-6.webp",
    "%2Fstatic%2Fimages%2Fbackdrop-9.webp": "assets/images/backdrop-9.webp",
    "%2Fstatic%2Fimages%2Fbackdrop-12.webp": "assets/images/backdrop-12.webp",
    "%2Fstatic%2Fimages%2Fbackdrop-14.webp": "assets/images/backdrop-14.webp",
    "%2Fstatic%2Fimages%2Fbackdrop-15.webp": "assets/images/backdrop-15.webp",
    "%2Fstatic%2Fimages%2Fbackdrop-24.webp": "assets/images/backdrop-24.webp",
    "%2Fstatic%2Fimages%2Fbackdrop-25.webp": "assets/images/backdrop-25.webp",
    "%2Fstatic%2Fimages%2Fpage-ui-log.webp": "assets/images/page-ui-logo.webp",
    "%2Fstatic%2Fimages%2Ficon-logo.webp": "assets/images/icon-logo.webp",
    "%2Fstatic%2Fimages%2Ficon-logo-dark.webp": "assets/images/icon-logo-dark.webp",
  };
  // Replace src="/_next/image?url=ENC&w=..&q=.." -> local, and srcset entirely
  // First handle src attributes
  html = html.replace(/(src|srcSet|srcset)="([^"]*)"/g, (m, attr, val) => {
    if (attr.toLowerCase() === "srcset") return ""; // drop srcset
    // decode local backdrop
    for (const [enc, local] of Object.entries(imgMap)) {
      if (val.includes(enc)) return `src="${local}"`;
    }
    // avatars picsum id
    let am;
    if ((am = val.match(/picsum\.photos%2Fid%2F(\d+)/))) return `src="assets/avatars/av-${am[1]}.jpg"`;
    if ((am = val.match(/picsum\.photos%2F100%2F100\.webp%3Frandom%3D(\d)/))) return `src="assets/avatars/grid-${am[1]}.webp"`;
    if (val.includes("shipixen.com%2Fstatic%2Fimages%2Ficon.png")) return `src="assets/images/icon.png"`;
    if (val.includes("font-pairings/thumbnails/Syne+Inter.webp")) return `src="assets/images/syne-inter.webp"`;
    if (val.includes("producthunt.com")) return `src="${val}"`; // keep remote badge (note in PR)
    return `${attr}="${val}"`;
  });
  // hero video
  html = html.replace(/https:\/\/cache\.shipixen\.com\/features\/11-pricing-page-builder\.mp4/g, "assets/hero-video.mp4");
  // make all template-internal nav/cta links anchor to # (they pointed to shipixen marketing site)
  // keep them but neutralize navigation away: leave hrefs as-is is fine for a static clone; convert absolute shipixen links to #
  html = html.replace(/href="https:\/\/shipixen\.com\/demo\/landing-page-templates\/template\/specta#"/g, 'href="#"');
  return html;
}

header = clean(header);
main = clean(main);
footer = clean(footer);

const page = `<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Specta Landing Page Template | Shipixen, Next.js & Shadcn UI</title>
<meta name="description" content="Create & edit stunning videos with AI. Specta is a revolutionary AI-powered video editing tool that automates the entire video creation process." />
<link rel="stylesheet" href="app.css" />
<link rel="stylesheet" href="theme.css" />
</head>
<body class="bg-[#030712] text-white antialiased">
<div class="relative overflow-x-hidden">
<main class="w-full flex flex-col items-center">
${header}
${main.replace(/^<main[^>]*>/, "").replace(/<\/main>$/, "")}
</main>
${footer}
</div>
<script src="main.js" defer></script>
</body>
</html>`;

fs.writeFileSync("../index.html", page);
fs.copyFileSync(`${ref}/raw/app.css`, "../app.css");
console.log("wrote index.html", page.length, "bytes");
