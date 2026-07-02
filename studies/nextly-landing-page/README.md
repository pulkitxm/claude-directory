# Nextly Landing Page Template Clone — Free Startup SaaS Site (Vanilla HTML/CSS/JS)

A pixel-faithful, self-contained reproduction of "Nextly" — the popular free Next.js + TailwindCSS landing page and marketing website template for startups and indie projects by Web3Templates. Built as a single, fully responsive scrolling page in plain HTML, CSS, and vanilla JavaScript with no framework or build step: a navbar with a persisted dark/light mode toggle, a hero with a line-art illustration, a "Trusted by" logo cloud of inline-SVG brand marks, two alternating benefit sections, a decorative video-promo card, a testimonials grid, an independently-toggling FAQ accordion, a CTA banner, a full footer, a mobile hamburger menu, and a floating "Contact form" widget with its own animated panel. Generated with Claude Fable 5.

## Run

This is a static site — no `package.json`, no build step, no dependencies. Serve the folder with any static file server, or open `index.html` directly in a browser:

```sh
python3 -m http.server
```

Then visit `http://localhost:8000/index.html`.

## What to try

- **Dark mode** — click the sun/moon icon in the navbar; the theme persists across reloads via `localStorage`.
- **FAQ accordion** — click any of the 4 questions; each toggles independently (not a single-open group), with a rotating chevron.
- **Contact form widget** — click the floating chat bubble bottom-right to open the "How can we help?" panel (Full Name / Email / Message / Send), then click again (now an X) to close it.
- **Mobile menu** — resize below 1024px and use the hamburger icon; the nav links and a full-width "Get Started" CTA are injected exactly as in the source (mounted only while open).
- **Hover states** — nav links, the illustration play button, and all CTAs use the same Tailwind `transition-colors`/`duration-300` timing as the original.

Styling lives in `styles.css` (a faithfully ported copy of the site's compiled Tailwind utility CSS, plus hand-written additions for the widgets that Tailwind's JIT purge doesn't emit as static rules); behavior (theme toggle, mobile menu, FAQ accordion, contact widget, decorative video button) lives in `script.js`. All images, the Inter webfont, and the favicon are vendored locally under `assets/`.

`prompt.md` holds the full design/content spec this clone was built against, and `demo.mp4` (with `poster.jpg`) shows it in motion. Recon artifacts (reference screenshots, computed-style outlines, extracted CSS/JS, and rest/hover state captures) are preserved under `.reference/home/`.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Nextly by Web3Templates — <https://nextly.web3templates.com>

---

Part of the [Studies](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
