# Verdant Atelier — Product-Photography Studio

A refined, editorial single-page landing site for **Verdant Atelier**, a fictional high-end product-photography studio fronted by photographer persona **Maya Kapoor**. The aesthetic identity is **"Forest & Gold"**: a deep, moody forest-green canvas paired with warm parchment cream, accented by museum gold and a single charged deep-orange. It reads like a well-printed fashion/still-life magazine translated to the web — part luxury editorial, part boutique darkroom. The signature motif is the **arch**: images masked into tall rounded-top "cathedral arch" shapes that evoke a gallery and a camera aperture at once.

The page runs top-to-bottom through a blurred fixed navbar, an asymmetric 12-column editorial hero, infinite marquees, a cream studio/about section, a staggered work gallery, service cards using varied mask shapes, gallery highlights, and a testimonial/philosophy footer. High-contrast transitional serif display type (Playfair-like) sits against a neutral grotesk body sans, with wide-tracked uppercase micro-labels.

Motion is subtle and tactile: IntersectionObserver scroll-reveal fade-ups, a slowly rotating gold "View · Projects" circular badge with text on a path, two-plus seamless infinite marquees, hover image scale-ups, grayscale-to-color gallery thumbs, and a pulsing ring behind the "Load More" button — all respecting `prefers-reduced-motion`. Everything is vendored locally (self-hosted WOFF2 fonts, locally generated SVG still-life artwork) so it runs offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
