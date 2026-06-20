# Nocturne Bento

A single-page, forced-dark personal portfolio for a fictional independent product designer (Mira Voss) in a "Midnight Atelier" aesthetic: a near-black studio canvas with a slowly drifting perspective grid floor that recedes toward a horizon, oversized editorial serif display type paired with a tight grotesque, and a single electric acid-lime accent used sparingly against greyscale photography. The signature structural device is a bento-grid hero of asymmetric glass panels — one a solid accent-colored CTA tile.

The fixed background layers a solid ink base, an infinite animated perspective grid (panned via a `background-position` keyframe loop), a radial vignette, and a blurred accent orb. The header uses `mix-blend-mode: difference` to stay legible over any panel. Sections run the bento hero, a 2×2 selected-work grid, studio/about, numbered services, and a contact section with a validated form. Vanilla JS drives IntersectionObserver reveals, a pointer-parallax hero, the mobile menu, and the form success state — respecting `prefers-reduced-motion`.

Pure static site (one `index.html`, `styles.css`, `main.js`), all assets vendored locally, runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
