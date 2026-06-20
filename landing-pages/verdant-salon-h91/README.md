# Verdant Salon — Luxury Social-Strategy Agency

A fully responsive, multi-section marketing landing page for **Verdant Salon**, a fictional elite social-media and digital-presence agency. The design language is **"Heritage Verdant"** — a quiet, old-money editorial luxury built on a warm paper-beige canvas, deep midnight-green panels, and cocoa-brown ink. The mood is hushed, expensive, and curatorial: less a SaaS storefront, more a printed prospectus from a Mayfair consultancy that happens to scroll. The luxury comes from an editorial serif at doorway scale, generous negative space, fully-rounded pill buttons, and restrained micro-interactions.

The page moves through a transparent header that gains a blurred beige backdrop on scroll, a full-viewport hero with staggered portrait image cards, an impact/stats block, full-width service rows on a warmer beige panel, an alternating heritage case-study gallery, a midnight-green contact section with a faked client-side inquiry form, and a deep-cocoa footer. Headings use Playfair Display (with occasional italic) over Inter Tight body and wide-tracked uppercase eyebrows.

The signature motion is a **grid demask** reveal: image cards uncover via a grid of beige tiles that each fade and scale away on staggered delays. Alongside it are IntersectionObserver scroll reveals with cubic-bezier easing and staggered children, stat count-ups, the scroll-state header, smooth-scroll anchors, floating service-row preview cards, and gallery zoom-on-hover — all respecting `prefers-reduced-motion`. Hand-written CSS, a small vanilla-JS file, and locally vendored fonts and photography keep it self-contained and offline-runnable.

## Run

This is a static project — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.
