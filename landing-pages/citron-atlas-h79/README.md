# Citron Atlas

A multi-section landing page for **Meridian & Voss**, a fictional enterprise growth-advisory firm, built in a "Phosphor Olive" design language — a deep, near-black, expensive boardroom aesthetic lit by a single phosphorescent citron-lime glow (`#F3FFC9`). The mood is quiet, authoritative, and moneyed: a dimly-lit executive floor at midnight, carved from charcoal and olive-ink, with one disciplined accent doing all the talking.

Type is a single Inter family throughout. The page runs deep — a dimmed-photo hero with a capability-pill marquee, a clients strip, an industries snap-scroll slider, a three-card "why us" grid, a cross-fading services accordion, count-up statistics, a case-studies slider with friction/intervention pairs, a staggered methodology step layout, and a two-panel footer. Motion uses IntersectionObserver section reveals, two infinite marquees, native snap-scroll sliders, accordion transitions, and stat count-ups, respecting `prefers-reduced-motion`. Hand-written CSS with custom-property tokens, no framework.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
