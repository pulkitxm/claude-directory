# Harbour & Hearth

A full, multi-section landing page for a fictional high-end senior-living community named Harbour & Hearth. The named aesthetic is **Warm Sanctuary** — the feeling of a sun-filled Craftsman home at golden hour, where clinical expertise is wrapped in heart-centered compassion. The whole design lives in warm, grounded, organic tones with pill-shaped buttons, large soft-cornered image cards, generous negative space, and one warm burnt-terracotta accent on a soft oat-cream canvas.

Sections span a floating pill navbar, a full-viewport hero with a glass feature card, an about section with a fanned cluster of rotated polaroid thumbnails, alternating care/service rows, a count-up stats band, a hover-pausing values marquee, a scroll-snap testimonial slider with prev/next buttons, a team grid, a final CTA, and a cocoa-ink footer. Motion is vanilla JS: IntersectionObserver fade-up reveals, count-up stats, the marquee, the testimonial slider, a nav shadow on scroll, and a right-side slide-in mobile menu — all respecting `prefers-reduced-motion`.

One typeface throughout — Inter Tight, vendored as WOFF2. Plain `index.html` + `styles.css` + `script.js`; all assets local.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
