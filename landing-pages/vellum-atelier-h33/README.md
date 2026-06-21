# Vellum — Sculptural Serif Atelier Landing Page (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A multi-section editorial landing page for **Vellum**, a fictional London high-end hair atelier, styled in the "Sculptural Serif Atelier" design language — a gallery-quiet, couture-editorial aesthetic where oversized display typography, generous negative space, and deep rounded image panels make the page feel like a printed lookbook. The warm paper canvas is punctuated by near-black ink type and a single gold accent; extremely large border radii (120–140 px on hero and CTA panels) are a signature detail. Typography pairs heavy geometric Unbounded for display with Figtree as a humanist body sans and flowing Sacramento script in gold for eyebrow labels, all locally vendored. Generated with Claude Fable 5.

Sections run from a pill-outlined nav and an enormous character-by-character "VELLUM" wordmark entrance, through a top-rounded hero image panel, a two-column philosophy block with a floating white quote card, a dark "The Menu" service list with cursor-tracked hover preview images, an offset three-up portfolio grid, a dark booking CTA with a ghosted background letter, and a dark footer with newsletter signup and giant ghosted wordmark.

Motion includes the hero wordmark rising letter-by-letter and briefly "dancing" before settling, `IntersectionObserver` scroll reveals with staggered portfolio cards and scale-in image zooms, menu-row hover choreography (padding expansion, text shift, arrow inversion, cursor-tracked preview), and a slide-in mobile menu that locks body scroll. All motion respects `prefers-reduced-motion`, and the build is vanilla HTML/CSS/JS.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Landing pages](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
