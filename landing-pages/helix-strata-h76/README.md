# Helix Strata

A full, multi-section, responsive landing page for a fictional enterprise business-architecture & infrastructure consultancy named Helix Strata — "architecting the future of business." The named design language is **Deep-Teal Architectural**: a quiet, engineering-forward aesthetic like the annual report of a firm that builds the invisible foundations of modern enterprises — a deep nocturnal teal canvas, a single soft periwinkle-lavender accent, and crisp bone-cream sections breaking the darkness like monograph pages.

Sections alternate dark teal and bone cream: a fixed glass navbar, a hero with two gently floating widget cards over a rounded-top image, an ethos/about stats row, an expertise split, an interactive solutions section where hovering a service row cross-fades the paired image and description, an intelligence testimonial carousel, a market-intelligence blog grid, and a final CTA with a giant faint wordmark that brightens on hover. Motion is vanilla JS: IntersectionObserver reveals, the 6s widget bob, service-row swaps, the carousel, and hovers — respecting `prefers-reduced-motion`.

One typeface throughout — Inter, vendored as WOFF2. Single `index.html` + local CSS/JS; all images local.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
