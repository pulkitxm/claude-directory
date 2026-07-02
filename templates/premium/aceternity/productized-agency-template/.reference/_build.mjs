// Assembles final self-contained .html files from cleaned bodies.
// Wires Base-UI accordion + react-fast-marquee to vanilla data-attributes.
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("..");

const PAGES = {
  home: { file: "index.html", title: "Design and Development Agency | Aceternity Labs" },
  work: { file: "work.html", title: "Work | Aceternity Labs" },
  products: { file: "products.html", title: "Products | Aceternity Labs" },
  pricing: { file: "pricing.html", title: "Pricing | Aceternity Labs" },
  blog: { file: "blog.html", title: "Blog | Aceternity Labs" },
  "blog-why-most-influencer-deals-go-unseen": { file: "blog-why-most-influencer-deals-go-unseen.html", title: "Why Most Influencer Deals Go Unseen | Aceternity Labs" },
  "blog-quick-guide-to-performance-optimization": { file: "blog-quick-guide-to-performance-optimization.html", title: "Quick Guide to Performance Optimization | Aceternity Labs" },
  "blog-lessons-from-successful-product-launches": { file: "blog-lessons-from-successful-product-launches.html", title: "Lessons from Successful Product Launches | Aceternity Labs" },
  "blog-how-to-run-remote-teams-effectively": { file: "blog-how-to-run-remote-teams-effectively.html", title: "How to Run Remote Teams Effectively | Aceternity Labs" },
  "blog-designing-for-accessibility-first": { file: "blog-designing-for-accessibility-first.html", title: "Designing for Accessibility First | Aceternity Labs" },
  "blog-the-rise-of-microservices-in-modern-web": { file: "blog-the-rise-of-microservices-in-modern-web.html", title: "The Rise of Microservices in Modern Web | Aceternity Labs" },
};

const FAQ_ANSWER = "Our platform lets you design, deploy, and manage AI-powered agentic workflows that can combine both automated (AI) and manual steps. These workflows connect to your existing tools (like Slack, Notion, or Google Sheets) and use AI agents to complete tasks.";

function injectFaqContent(body) {
  // Base UI only mounts accordion content when open, so closed items in the
  // captured DOM have a trigger but no content panel. Inject the (single,
  // canned) answer panel after each trigger's <h3>, unless the item already
  // has a content panel.
  // Each accordion item: ...<h3 ...>...accordion-trigger...</h3>[content?]...
  // We split on accordion-item boundaries and patch each one.
  const marker = 'data-slot="accordion-item"';
  if (!body.includes(marker)) return body;
  const contentPanel = `<div role="region" data-slot="accordion-content" class="overflow-hidden text-sm"><div class="faq-answer pt-0 pb-2.5 mt-6 text-muted-foreground -tracking-xs leading-6">${FAQ_ANSWER}</div></div>`;
  // After each trigger's closing </h3>, inject a content panel only if one isn't
  // already present immediately after (avoids duplicating captured-open items).
  body = body.replace(/(<button[^>]*data-slot="accordion-trigger"[\s\S]*?<\/button>\s*<\/h3>)(\s*)(<[^>]*data-slot="accordion-content")?/g,
    (full, trigger, ws, hasContent) => {
      if (hasContent) return full; // already has a content panel
      return trigger + contentPanel;
    });
  return body;
}

function resetCarousels(body) {
  // Captured carousel tracks were mid-scroll (e.g. translate3d(-612px,0,0)).
  // Reset their X offset to 0 so the carousel starts at the first slide,
  // matching the reference's default (first card flush at the left, dot 1).
  body = body.replace(/translate3d\(\s*-?\d+(?:\.\d+)?px\s*,\s*0(?:px)?\s*,\s*0(?:px)?\s*\)/g,
    "translate3d(0px, 0px, 0px)");

  // Reset pagination dots so the FIRST dot is active (matches reset carousel position).
  // Active dot: aria-current="true" + bg-heading. Inactive: aria-current="false" + bg-natural-black/15.
  // 1) make every dot inactive
  body = body.replace(/aria-label="Show testimonial (\d+)" aria-current="true" class="([^"]*)bg-heading([^"]*)"/g,
    'aria-label="Show testimonial $1" aria-current="false" class="$2bg-natural-black/15 hover:bg-natural-black/30$3"');
  // 2) make dot #1 active
  body = body.replace(/aria-label="Show testimonial 1" aria-current="false" class="([^"]*)bg-natural-black\/15 hover:bg-natural-black\/30([^"]*)"/g,
    'aria-label="Show testimonial 1" aria-current="true" class="$1bg-heading$2"');
  return body;
}

function wireInteractions(body) {
  body = injectFaqContent(body);
  body = resetCarousels(body);
  // --- Accordion ---
  // Base UI markup: data-slot="accordion-item" wraps a trigger button + content region.
  // We add data-accordion on the nearest container and hooks on triggers/contents.
  // Tag the root list once: find data-slot="accordion" and add data-accordion.
  body = body.replace(/data-slot="accordion"/g, 'data-slot="accordion" data-accordion');
  body = body.replace(/data-slot="accordion-item"/g, 'data-slot="accordion-item" data-accordion-item data-open="false"');
  body = body.replace(/data-slot="accordion-trigger"/g, 'data-slot="accordion-trigger" data-accordion-trigger');
  body = body.replace(/data-slot="accordion-content"/g, 'data-slot="accordion-content" data-accordion-content');
  // chevron-down icon inside trigger -> mark as chevron
  body = body.replace(/class="lucide lucide-chevron-down pointer-events-none shrink-0([^"]*)"/g,
    'data-accordion-chevron class="lucide lucide-chevron-down pointer-events-none shrink-0$1"');

  return body;
}

for (const [slug, meta] of Object.entries(PAGES)) {
  let body = fs.readFileSync(`${slug}/body.clean.html`, "utf8");
  body = wireInteractions(body);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="A study clone of the Aceternity Productized Agency template, rebuilt as self-contained HTML/CSS/JS." />
<title>${meta.title}</title>
<link rel="icon" href="assets/logo.webp" />
<link rel="stylesheet" href="css/fonts.css" />
<link rel="stylesheet" href="css/main.css" />
<link rel="stylesheet" href="css/app.css" />
</head>
<body class="inter_6d41ed87-module__M1ee4W__variable geist_mono_13159081-module__UeXfrq__variable dm_mono_3205563c-module___Wc8jq__variable bg-background relative font-sans antialiased">
${body}
<script src="js/app.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(OUT, meta.file), html);
  console.log("built", meta.file, "(" + html.length + " bytes)");
}
