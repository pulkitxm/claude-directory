# Spectral Orbit — NovaScale

A full, multi-section dark landing page for **NovaScale**, a fictional paid-advertising growth agency. The "Spectral Orbit" aesthetic is a near-black, cosmic, results-obsessed performance-marketing language built around slowly rotating chromatic conic-gradient nebula orbs that bloom behind crisp, minimal content. A single electric coral-red accent cuts through an otherwise monochrome void, with italic Instrument Serif emphasis punctuating a tight Inter sans-serif system.

The page runs top to bottom through a floating pill nav, a full-viewport hero with stacked counter-rotating orbs, a trust marquee, an auto-scrolling testimonials carousel, about/mission, services, an "other agencies vs NovaScale" comparison, a 3-step process, a results/stats CTA, an FAQ accordion, a final CTA, and footer. Motion comes from continuous CSS rotate loops, JS-duplicated infinite marquees, IntersectionObserver fade-up reveals, hover lifts, and a slide-down mobile nav — all respecting `prefers-reduced-motion`.

Vanilla HTML + CSS + a small vanilla-JS file (nav, marquee duplication, accordion, scroll reveal), with all fonts and imagery self-hosted locally so it runs fully offline.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
