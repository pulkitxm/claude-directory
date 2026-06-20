# Verdant Pledge — Regenerative Conservation Bento

A full landing page for **Verdant Pledge**, a fictional environmental conservation collective. The aesthetic identity is **"Soft Editorial Bento"** — a light, airy, optimistic eco-brand built entirely from large, generously-rounded "bento" cards floating on a white canvas. The mood is calm, trustworthy, and modern-non-profit, where nature photography meets clean product-design UI, accented by a single electric lime-green highlight used sparingly.

Sections flow through a sticky blurred nav, a two-card bento hero (lime copy card plus a full-bleed nature photo with floating glass UI), a centered mission statement, a "WE RESTORE → EARTH" wordmark strip, an editorial missions table with hover image previews, a 4-up grid of problem image cards, a dark contrast impact band with count-up stats, native `<details>` FAQ accordions, and a newsletter footer. Type is a single family, Inter Tight, with a consistent radius and spacing scale and soft layered shadows.

Interactions are driven by vanilla JS and inline SVG: staggered IntersectionObserver scroll-reveals, a continuously pulsing amber map dot, stat numbers that count up when the impact band enters view, hover previews on table rows, scaling problem images, a nudging wordmark arrow, FAQ plus icons that rotate 45° and turn lime, and a slide/fade mobile menu — all honoring `prefers-reduced-motion`. All fonts, photos, avatars, and textures are vendored locally for offline use.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
