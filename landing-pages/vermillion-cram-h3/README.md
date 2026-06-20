# Vermillion Cram — Brutalist Board-Prep Academy Landing Page

A loud, confident neo-brutalist landing page for **Vermillion Cram**, a fictional elite exam-coaching academy for Grade 10 and 12 board students. The named design language is **"Vermillion Cram"** — a risograph exam-hall notice board crossed with a deployment dashboard: hard 90-degree corners everywhere, 2px obsidian borders, and hard offset "brutal" shadows with zero blur. A hot burnt-orange vermillion drives CTAs, badges, and numerals against white and bone surfaces, with one typeface — Josefin Sans — throughout.

The layout runs from a scrolling vermillion ticker bar and sticky header through a full-bleed Ken-Burns hero, an overlapping stat panel, programs/subjects, why-us feature cards, a count-up counters band, dual counter-direction testimonial marquees, a dashboard-style faculty directory, an admissions trial form with inline success, and a multi-column footer. Built with vanilla HTML, CSS, and JS.

Interaction leans into the brutalist vocabulary: infinite marquees that pause on hover, staggered IntersectionObserver scroll reveals, numbers that count up from zero on first view, grayscale-to-color image hovers, and "press" buttons that start pre-offset and settle flush — all respecting `prefers-reduced-motion`.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
