# Axis Quotient

A multi-section landing page for **Axis Quotient**, a fictional quantitative strategy consultancy, built in a "Quant Brutalist Editorial" design language — a stark, black-ink-on-ivory aesthetic that reads like a Swiss financial prospectus crossed with a data terminal. Everything sits on a tight editorial grid: hairline rules, section index numbers `(01)`–`(07)`, monospace meta labels, and oversized display wordmarks, punctured by a single electric cobalt accent (`#1F44FF`).

Type pairs Space Grotesk display wordmarks with Inter body and JetBrains Mono labels. The dark hero pairs an animated grid/plotted-points canvas behind a lifted ivory "ticker card" (a redrawing SVG sparkline, rotating metric) with the colossal mask-revealed `QUOTIENT` wordmark. Other sections: a marquee ticker, a capabilities accordion, count-up metrics, engagement-model pricing with live toggles, and a massive cobalt CTA. Motion uses IntersectionObserver mask reveals, the capped-DPR canvas, accordion transitions, and a live clock, respecting `prefers-reduced-motion`.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
