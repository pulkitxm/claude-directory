# Paper Circuit — Agentic Outbound SaaS (DRIFT)

A multi-section marketing landing page for Driftworks (product wordmark: "DRIFT"), a fictional autonomous-outbound SaaS. The named design language is "Paper Circuit" — a bright engineering-notebook aesthetic that reads like a blueprint printed on graph paper: a light neutral canvas with a faint radial dot grid, crisp hairlines, floating white panels with soft shadows, and color used sparingly as wiring (electric indigo, hot magenta).

Sections include a sticky header with hover-dropdown nav, a hero with an auto-advancing icon belt and a detailed product mockup (sidebar, metrics, interactive node canvas, live output panel) that does a mouse-driven 3D parallax, a logo strip, a 12-column features bento, portrait testimonials, an enterprise governance layout, an indigo stats/CTA strip with a live mono counter, and a footer with a cursor-spotlight wordmark. Pure HTML/CSS/vanilla JS with inline SVG icons, IntersectionObserver reveals, node interaction, a click ripple, and `prefers-reduced-motion` support. Self-contained and offline-runnable.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
