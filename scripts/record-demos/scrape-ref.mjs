import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const URL = 'http://p.superdesign.dev/draft/a8f544ea-ba22-4214-ade4-4cbd56118443';
const OUT = process.env.OUT || '/tmp/scrape-ref';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);

// pick largest frame
let target = page;
const frames = page.frames();
let best = null, bestArea = 0;
for (const f of frames) {
  try {
    const dim = await f.evaluate(() => ({ w: document.body.scrollWidth, h: document.body.scrollHeight, html: document.body.innerHTML.length }));
    const area = dim.w * dim.h;
    if (dim.html > 200 && area > bestArea) { bestArea = area; best = f; }
  } catch {}
}
if (best && best !== page.mainFrame()) target = best;
console.log('frames:', frames.length, 'chosen area:', bestArea, 'url:', target.url());

await page.screenshot({ path: path.join(OUT, 'screenshot.png'), fullPage: true });

const html = await target.content();
fs.writeFileSync(path.join(OUT, 'page.html'), html);

const data = await target.evaluate(() => {
  const out = { fonts: new Set(), imgs: [], links: [], colors: {}, nodes: [] };
  const walk = (el, depth) => {
    if (depth > 6) return;
    const cs = getComputedStyle(el);
    out.fonts.add(cs.fontFamily);
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0 && depth < 5) {
      out.nodes.push({
        tag: el.tagName, cls: el.className?.toString?.().slice(0,80),
        text: el.childNodes.length && [...el.childNodes].some(n=>n.nodeType===3) ? el.textContent.trim().slice(0,60) : '',
        color: cs.color, bg: cs.backgroundColor, font: cs.fontFamily.split(',')[0],
        fs: cs.fontSize, fw: cs.fontWeight, ls: cs.letterSpacing, lh: cs.lineHeight,
        border: cs.border, radius: cs.borderRadius, pad: cs.padding,
        w: Math.round(r.width), h: Math.round(r.height)
      });
    }
    for (const c of el.children) walk(c, depth+1);
  };
  walk(document.body, 0);
  document.querySelectorAll('img').forEach(i => out.imgs.push(i.src));
  document.querySelectorAll('a').forEach(a => out.links.push({t:a.textContent.trim().slice(0,40),h:a.href}));
  return { fonts: [...out.fonts], imgs: out.imgs, links: out.links, nodes: out.nodes };
});
fs.writeFileSync(path.join(OUT, 'outline.json'), JSON.stringify(data, null, 2));
console.log('fonts:', data.fonts);
console.log('nodes:', data.nodes.length, 'imgs:', data.imgs.length);
await browser.close();
