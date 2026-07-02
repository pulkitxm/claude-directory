# Flabbergasted — Dark SaaS AI Voice Platform Landing Page (Vanilla HTML + CSS + JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

Flabbergasted is a pixel-faithful static clone of the Flabbergasted premium Astro template by Lexington Themes, reproduced as plain HTML, CSS, and vanilla JavaScript with no build step required. It is a single-page dark-mode SaaS landing page for a fictional AI voice platform, covering a hero with an AI chat widget, a scrolling logo marquee, a four-column feature grid, a voice-cloning demo section with Web Audio API pitch shift, a two-column CTA split, a six-card brainwaves feature grid, an integration showcase with hover colorize effect, a five-tier pricing table with monthly/annual toggle, a full feature-comparison table, a testimonials carousel powered by Keen Slider, and a structured footer. The design uses Inter Variable for body text, InterDisplay for headings, Geist Mono for labels, a near-black oklch color palette, named mesh gradients (meshLightBlue, meshRainbow, meshPurple, meshYellow, meshMagenta, meshGreen), and repeating vertical/horizontal stripe pattern backgrounds. Built for SaaS products, AI platforms, and dev tools looking for a sharp, content-dense dark landing page.

## Run

No build step is needed. Open `index.html` directly in a browser, or serve the folder with a local static server:

```sh
python3 -m http.server
```

Then visit `http://localhost:8000`.

## Pages

| File | Page |
|---|---|
| `index.html` | Home — hero, marquee, features, voice cloning, CTA, brainwaves, integrations, pricing, customers, footer |

## Notable techniques

- **No dependencies** — mobile nav, pricing toggle, and voice player stub are implemented in `scripts/main.js` with vanilla JS. Keen Slider loaded via CDN for the testimonials carousel.
- **Mesh gradient backgrounds** — six named mesh gradients built from layered `radial-gradient` + noise SVG filter and `background-blend-mode: overlay`, all declared as CSS custom properties.
- **Stripe patterns** — repeating `linear-gradient` stripes in dark, accent (violet oklch), and light (white) variants used as decorative overlays throughout sections.
- **Cross-indicator corners** — `5×5` absolute-positioned `div` pairs with 0.1px perpendicular lines mark section-border intersections at desktop widths.
- **Pricing toggle** — sliding pill indicator via CSS `transform: translateX`, updates all `.pricing-amount` elements from `data-monthly` / `data-annual` attributes.
- **Voice pitch player** — stub using Web Audio API `playbackRate = 2^(semitones/12)` formula; gracefully no-ops when no audio file is present.
- **Testimonial slider** — Keen Slider CDN with `perView: 2.05` at desktop, prev/next button wiring.
- **Integration hover** — integration logos are grayscale by default, transition to full color on `group:hover` using CSS `filter: grayscale(0)`.

`prompt.md` holds the full build specification and `demo.mp4` shows the template in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Lexington Themes — https://lexingtonthemes.com/viewports/flabbergasted

---

Part of the [Lexington Themes](../) provider collection inside [Templates](../../) in the [claude-directory](../../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
