# Lumen Launch

A full, multi-section, responsive landing page for a fictional AI SaaS product named Lumen Launch — "turn one screen recording into a full product launch." The named design language is **Periwinkle Aurora**: a bright, optimistic modern-SaaS aesthetic — crisp white paper washed with soft lavender-and-periwinkle aurora gradients, oversized display type, and a single dark "product theatre" section for dramatic contrast. The recurring motif is a large, soft, blurred aurora blob sitting behind the hero product mockup.

Sections span a frosted fixed header, a centered hero with a CSS/SVG browser-chrome dashboard mockup (video preview card, AI-processing pulse badge, progress bar, language chips, and a 3-step pipeline timeline) floating above the aurora blob, a logo marquee of inline-SVG brand marks, a three-step "how it works" row with animated div/SVG illustrations, alternating feature rows, a dark testimonial "product theatre" with infinite-scrolling quote cards, pricing with a working monthly/yearly toggle, an FAQ accordion, and a CTA band + footer. Motion is vanilla JS respecting `prefers-reduced-motion`.

Typography pairs Outfit (display) with DM Sans (body) and a mono stack for chrome labels. All device/dashboard/illustration visuals are built from HTML + CSS + inline SVG; fonts and brand logos vendored locally.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
