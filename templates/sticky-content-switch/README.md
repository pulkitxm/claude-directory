# Sticky Content Switch

A two-column, scroll-driven editorial section demonstrating the "sticky content switch" pattern: the left column is pinned and vertically centered, holding the active project's text block (index, large display heading, kicker, paragraph, meta), while the right column is a tall stack of full-height image panels that scroll past. Whenever a new image crosses the vertical center of the viewport, the sticky left-side text swaps to that image's content with a crossfade and vertical slide. The page also includes a fixed top nav, a 100vh intro hero with a per-letter rise reveal, a vertical progress rail, and an outro footer.

Design language is near-black ink (`#0E0E0C`) on warm paper (`#F4F1EA`) with a single burnt-orange accent (`#C4622D`), an Anton display face paired with Inter, and a ~4% SVG fractal-noise grain; the motion signature is `cubic-bezier(0.16, 1, 0.3, 1)`. The core interaction is driven by an IntersectionObserver whose `rootMargin` collapses the viewport to a 1px band at center so a panel becomes active exactly when its midpoint crosses screen center; a second rAF scroll loop applies per-panel parallax scale and the headline's Y-drift, with grayscale-to-color on the active image. Six items (Monument, Terrain, Chroma, Circuit, Quiet, Horizon) match each image. Fonts and images are vendored locally and it honors `prefers-reduced-motion`.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
