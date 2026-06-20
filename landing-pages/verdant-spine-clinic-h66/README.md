# Verdant Spine — Precision Chiropractic & Movement-Science Clinic

A full, multi-section, fully responsive marketing landing page for **Verdant Spine**, a fictional high-end chiropractic and movement-science clinic. The aesthetic identity is **"Clinical Calm"** — the collision of medical precision with the grounded, botanical stillness of a wellness retreat. The mood is quiet, expensive, trustworthy, and restorative: Scandinavian health-spa meets sports-medicine, carried by a single sage-green brand color across a soft warm-grey-green paper canvas, with restraint and generous negative space throughout.

Sections run from a thin deep-forest top bar and navigation, through a split hero with a signature **glassmorphic appointment card** floating over a rounded clinic image, an about block with gradient stat cards and a glass play button, a deep-forest services section, a sticky-panel "how it works" steps layout, a scroll-snap testimonial carousel, a three-column blog grid, and a rounded deep-forest footer. Display headlines use Schibsted Grotesk with tight negative tracking over Inter body type.

Motion is soft and deliberate: IntersectionObserver fade-ups with a `cubic-bezier(0.16, 1, 0.3, 1)` ease, a seamless infinite marquee of giant uppercase type, a subtle vertical float, hover image scale and button/link color shifts, a `scrollBy`-driven testimonial carousel with boundary-aware prev/next buttons, the sticky "how it works" panel, and a right-side slide-in mobile menu that locks body scroll. All fonts and images are vendored locally so the project is offline-runnable.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
