# Specta — AI Video-Editing SaaS Landing Page Template Clone (Vanilla HTML/CSS/JS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

Specta is a self-contained, pixel-faithful clone of the dark "Specta" marketing landing page template for a fictional AI-powered video-editing SaaS. It is a single-page template built with plain HTML, CSS, and vanilla JavaScript — no build step, all assets vendored locally, and it runs fully offline. The page ships dark by default with a light/dark theme toggle (driven by CSS custom properties and `localStorage`), and features a sticky nav, a gradient hero headline with a framed autoplay product video, an infinite logo and testimonial ticker marquee, scroll-in reveal animations via `IntersectionObserver`, alternating feature sections, a monetize card grid, a testimonial grid on a pink gradient panel, and a multi-column footer. Generated with Claude Fable 5.

## Run

This is a static site with no build step. Serve the folder with any static file server, for example:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/> (entry file is `index.html`).

## Notes

- **Theme**: dark is the shipped default. The theme toggle flips `:root.dark`, and all colors resolve from CSS custom properties that respond to `:root.dark` / `prefers-color-scheme`. The choice is persisted in `localStorage`.
- **Motion**: an infinite horizontal marquee powers the logo/testimonial ticker; sections fade and rise in on scroll via `IntersectionObserver`, with a load-time safety fallback that reveals everything after a short delay (useful for full-page captures and reduced-motion contexts).
- **Hero**: a framed autoplay product video sits in the hero with floating testimonial popovers.
- `prompt.md` holds the full build spec, including the palette, type scale, and section-by-section layout.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Page UI (Specta) — <https://shipixen.com/demo/landing-page-templates/template/specta>

---

Part of the [Templates](../../../) collection in the [claude-directory](../../../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
