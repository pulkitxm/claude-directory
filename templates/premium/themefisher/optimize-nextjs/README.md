# Optimize — HR-Management SaaS Marketing Website Template Clone (Vanilla HTML/CSS/JS, AOS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

"Optimize" is a light-theme, green/lime-accented SaaS marketing site for an HR-management product, rebuilt as a self-contained, pixel-faithful, 13-page reproduction of the Themefisher "Optimize" Next.js template — no framework, no build step, just plain HTML, CSS, and vanilla JS. The clone reproduces the rounded card-heavy bento-grid layout, Outfit/Inter type pairing, dark-green CTA blocks, lime/yellow/peach accent panels, AOS scroll-triggered fade-up entrance animations, a pure-CSS "All Pages" dropdown nav with morphing hamburger menu, FAQ accordions, and a testimonial carousel, with every font, image, and icon vendored locally so it runs fully offline. Generated with Claude Fable 5.

## Pages

13 unique templates, each a static HTML file sharing the same header/footer chrome:

`index.html` (home), `about.html`, `features.html`, `pricing.html`, `integrations.html`, `changelog.html`, `contact.html`, `book-demo.html`, `blog.html`, `blog-post.html`, `privacy-policy.html`, `terms.html`, `404.html`.

## Stack

Plain HTML + CSS + vanilla JavaScript — no `package.json`, no bundler, no framework. Notable pieces:

- `assets/css/tokens.css` — design-token custom properties (color, radius, type-scale, easing)
- `assets/css/theme-dark.css` + `assets/js/theme-boot.js` — CSS-token-based dark-mode override layered on top of the source's light-only theme
- `assets/vendor/aos/aos.js` + `assets/css/vendor-aos-timing.css` — AOS scroll/entrance animations (`data-aos="fade-up"` etc., staggered per grid item)
- `assets/css/vendor-swiper.css` — Swiper.js testimonial carousel styling (home/about/pricing)
- `assets/js/main.js` — nav dropdown, mobile hamburger toggle, FAQ accordions, pricing billing toggle, blog search/pagination, and other page interactions
- `assets/fonts`, `assets/images` — all fonts and imagery vendored locally for offline use

## Run

No install or build step required — this is a static site.

```sh
python3 -m http.server
```

then open `http://localhost:8000/index.html`, or simply open `index.html` directly in a browser.

## Notes

`prompt.md` in this folder holds the full build spec (palette, type scale, layout breakdown per page, and every interaction reproduced), and `demo.mp4` shows the site in motion. The reference was reconnoitered directly from `https://optimize-nextjs.vercel.app` (the live template behind the Themefisher preview iframe), excluding the Themefisher preview-host chrome but keeping the template's own in-page "Get This Template" button and "All Pages" dropdown.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Themefisher — <https://themefisher.com/demo?theme=optimize-nextjs>

---

Part of the [Templates](../../../) collection in the [claude-directory](../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
