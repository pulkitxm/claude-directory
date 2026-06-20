# Vellum — Sculptural Serif Atelier

A self-contained, multi-section editorial landing page for **Vellum**, a fictional London high-end hair atelier. The named design language is **"Sculptural Serif Atelier"** — a gallery-quiet, couture-editorial aesthetic where oversized display typography, generous negative space, and deep rounded image panels make the page feel like a printed lookbook that breathes. The canvas is warm paper with near-black ink type and a single gold accent; very large border radii are a signature, with hero and CTA panels using extreme top-rounded corners (~120–140px) so dark panels read like soft scoops rising out of the paper. Type pairs a heavy geometric display family (Unbounded) with a humanist sans (Figtree) and a flowing gold script (Sacramento) for eyebrow labels, all vendored locally.

Sections run from a pill-outlined nav and an enormous character-by-character "VELLUM" wordmark, through a top-rounded hero image panel, a two-column philosophy block with a floating white quote card, a dark "The Menu" service list with cursor-tracked hover previews, an offset three-up portfolio grid, a dark booking CTA with a ghosted background letter, and a dark footer with newsletter signup and a giant ghosted wordmark.

Motion includes the hero wordmark rising letter-by-letter and briefly "dancing" before settling, `IntersectionObserver` scroll reveals with staggered portfolio cards and scale-in image zooms, the menu-row hover choreography (padding expansion, text shift, arrow inversion, cursor-tracked preview image), and a slide-in mobile menu that locks body scroll. All motion respects `prefers-reduced-motion`, and the build is vanilla HTML/CSS/JS.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
