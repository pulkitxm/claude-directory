# Kairos Academy

A fully self-contained, responsive landing page for Kairos Academy, a premium competitive-exam coaching institute for civil-service, banking, and railway aspirants — "sharpen the decisive hour." The named aesthetic is **Warm Editorial Ember** — a confident, bookish, high-contrast editorial language like a well-printed study annual: cream paper stock, one decisive ember-orange accent, ink-black type, and crisp hairline rules terminated by a small solid dot.

A signature split-tone hero gives way from a solid ember upper band to a cream lower band, with cards and floating exam pill-tags overlapping the seam over a ghosted "KAIROS" watermark. Sections continue through a count-up stats strip, stacked program rows, a subjects grid with color-inverting icon tiles, a 4-step "Kairos Method" grid, auto-rotating testimonials, a single-open FAQ, a final CTA bar, and an ink footer. Motion is vanilla JS: per-word hero reveal, IntersectionObserver reveals, floating tags, count-ups, slide-up double-text nav hovers, and the testimonial cross-fade — respecting `prefers-reduced-motion`.

One typeface throughout — Inter Tight, vendored as WOFF2. Hand-authored CSS; all photography local.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
