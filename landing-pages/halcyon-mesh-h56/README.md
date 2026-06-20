# Halcyon Mesh

A full, multi-section, responsive landing page for a fictional enterprise platform named Halcyon Mesh — "deploy autonomous agents that run your operations while you sleep." The named design language is **Obsidian Control Plane**: a deep, near-black engineering canvas that feels like a mission-control room at 2 a.m., lit by a single aurora glow of teal fading into violet. Everything sits on a faint dashed engineering grid, with a live "Control Mesh" dashboard mockup as the hero centerpiece.

The page spans a fixed blurred nav (with a hover-reveal mega-menu), a hero whose CSS/SVG dashboard mockup includes a live execution log that appends mono lines on a timer and count-up metrics, a trusted-by marquee, a bento feature grid, a connect→orchestrate→autonomous workflow, a stats band, pricing (with a highlighted middle tier), an aurora CTA band, and a footer on a 1200px hairline rail. Motion is vanilla JS: scroll reveals, the live log, count-ups, the marquee, button text-roll, the mega-menu, and a cursor-reactive hero glow — all respecting `prefers-reduced-motion`.

Typography uses Space Grotesk, Inter, and JetBrains Mono. Plain `index.html` + `styles.css` + `main.js`; fonts vendored locally, all visuals drawn in CSS/SVG.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
