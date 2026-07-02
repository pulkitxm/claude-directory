# Atelier Archive — Quiet-Luxury Architectural Furniture Catalog (Vanilla HTML + CSS + JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A single-page, vertically-scrolling magazine-spread landing page for a fictional furniture house styled after high-end architectural publications — cream off-white background (`#fdfbf9`), vertical 1px page borders at 1440px max width, and a neutral border-grid that reinforces the archival feel. Typography pairs Cormorant Garamond (vendored as "Zodiak", light 300/400 with italics) for editorial headings with Hanken Grotesk (vendored as "General Sans") for 10px uppercase wide-tracked UI labels. All imagery is procedurally generated SVG — architectural interiors, material close-ups, and sculptural objects — desaturated with `grayscale(0.15)` to unify them. Animations are slow and atmospheric: 1.2s IntersectionObserver fade-in reveals, 2s image hover scales, animated 1px underline CTAs, white slide-up overlays on the material grid, and faint-to-black italic transitions on the interactive room index. Generated with Claude Fable 5.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Templates](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
