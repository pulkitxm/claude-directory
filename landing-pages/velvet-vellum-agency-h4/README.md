# Velvet Vellum — Precision Marketing Agency

A fully responsive, multi-section landing page for **Velvet Vellum**, a fictional marketing agency, built in a design language called **"Velvet Precision."** The mood is quiet luxury meets surgical rigor: a warm near-white paper canvas punctuated by deep oxblood/maroon panels, generous negative space, oversized editorial display type, and precise, restrained micro-interactions — a high-end consultancy prospectus, never playful or generic. Type pairs a geometric-elegant sans (Josefin Sans) for headlines with Space Grotesk body and a monospace for the wordmark, footer labels, and uppercase eyebrows, all vendored locally.

Sections run through a fixed translucent navbar, a maroon-panel hero with a star eyebrow row and a logo marquee below, a "Future of Growth" services split with a filled maroon middle card, a featured-work bento grid, a maroon method-and-stats panel with glassy stat tiles, an auto-rotating testimonial slider, a final CTA, and a footer that closes on a dramatic faux-3D perspective floor grid with a giant stroked "VELLUM" wordmark mask-faded into the floor.

Motion is driven by an `IntersectionObserver` for staggered fade-and-rise reveals, a seamless infinite logo marquee with edge mask-fade, springy button arrow badges, grayscale-to-color hover on the center work image, a JS auto-rotating testimonial with a morphing active pagination dot, and a pulsing "growth engine active" status dot. All transform-heavy motion respects `prefers-reduced-motion`, and the build is vanilla HTML/CSS/JS with semantic landmarks and keyboard-focusable controls.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
