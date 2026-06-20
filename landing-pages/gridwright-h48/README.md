# Gridwright

A full, multi-section, responsive landing page for a fictional developer-infrastructure SaaS named Gridwright — "constructing digital reality through code." The named design language is **Neo-Structuralist Blueprint**: a precise, paper-light, architectural aesthetic like an engineer's drafting table fused with a code editor. The whole page is literally drawn on a ruled structural grid — full-height vertical column lines run edge to edge, a faint diagonal cross-hatch dusts the background, every corner is sharp, and elements carry hard, zero-blur offset "brutal" shadows that collapse on hover.

Sections span a two-tier fixed header (a green status bar with randomly blinking squares above the main nav), an asymmetric 7/5 hero with a live-typing terminal panel, a count-up stats strip, an asymmetric "system modules" card grid, "client_logs" testimonials, a hairline-divided pricing row, a manifesto split, native `<details>` FAQ accordions, and a waitlist CTA with a CSS-drawn envelope that opens to pop a postcard on scroll and on submit. Motion is vanilla JS respecting `prefers-reduced-motion`.

Typography pairs Space Grotesk (display) with Space Mono (body/code), with many `snake_case` captions. Fonts and assets vendored locally.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
