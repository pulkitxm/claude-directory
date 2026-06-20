# Aegis Console

A multi-section marketing landing page for **Aegis**, a fictional enterprise cybersecurity platform, built in a "Precision Grid" design language — a bright, engineering-forward SaaS aesthetic that reads like a well-lit control room rendered on clean paper. Ink-black type sits on a white/bone canvas with a single electric-lime accent (`#DCF986`) used sparingly on icon-chips, bars, and one graph stroke; hairline grid rules fade into the background behind the content.

The centerpiece is a live "security console" product mockup: a stat column with a lime progress bar, an animated SVG line chart that draws itself via stroke-dashoffset, and a status bar of nodes with pulsing dots. Display type is Clash Grotesk over Satoshi body text. Motion includes staggered fade-and-rise on load, IntersectionObserver scroll reveals, count-up metrics, and a floating "real-time monitoring" pill — all respecting `prefers-reduced-motion`.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
