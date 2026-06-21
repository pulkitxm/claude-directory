# The Gilded Hour — Art Deco / Gatsby Design System Showcase (HTML + CSS + Vanilla JS)

A self-contained showcase landing page that fully expresses an Art Deco ("Gatsby") design system: obsidian-and-gold, mathematical ornament, and the architectural grandeur of a 1920s skyscraper ballroom. This dependency-free static page demonstrates a complete Art Deco UI design system with rotated-diamond containers, gold-on-obsidian palette, Roman numerals, double borders, diagonal crosshatch overlays, and Marcellus serif display type — all composed from CSS custom-property tokens. Generated with Claude Fable 5.

It demonstrates the complete system across nine sections:

1. **Sticky header** with a rotated-diamond monogram and animated underline nav.
2. **Hero** — a rotating gold sunburst, a double-frame, a gold-sheen display
   headline, dual CTAs, and Roman-numeral stats.
3. **Brass marquee** strip of house values.
4. **Tenets** — six geometric cards with rotated-diamond icons, Roman numerals,
   L-shaped corner brackets, and a ziggurat top accent on hover.
5. **Heritage** — a double-framed, grayscale-to-colour skyscraper emblem beside
   prose and a diamond checklist.
6. **Atelier** — an alternating left/right timeline with diamond markers (I–IV).
7. **Membership** — three pricing tiers with a featured "Most Coveted" Patron.
8. **The Salon** — testimonial cards with diamond avatars.
9. **FAQ accordion**, an **enquiry form** with underlined inputs over a sunburst,
   and a five-column **footer**.

## Design system signatures

Gold (`#D4AF37`) on obsidian (`#0A0A0A`) · Marcellus + Josefin Sans · radius
locked to `0px` · glows instead of drop shadows · diagonal crosshatch + film-grain
overlays · rotated-diamond containers · Roman numerals · double borders · measured
gold dividers · all-caps display type with extreme tracking. Everything composes
from CSS custom-property tokens declared once in `:root`.

## Tech & assets

Plain, dependency-free **HTML + CSS + vanilla JS** — no build step. All assets are
**vendored locally** so it runs fully offline:

- `assets/fonts/` — Marcellus + Josefin Sans, self-hosted as WOFF2 with a local
  `fonts.css`.
- `assets/grain.png` — a procedurally generated film-grain texture.
- `assets/emblem.svg` — a hand-built Art Deco skyscraper emblem.

Interactions (`main.js`): IntersectionObserver scroll reveals with staggered
delays, an on-load hero cascade, a sticky-header scroll state, a mobile nav
drawer, an accessible FAQ accordion, and client-side form validation. Honours
`prefers-reduced-motion`.

## Run

It's a static page — serve the folder with any static server:

```bash
# from this directory
python3 -m http.server 5199
# then open http://localhost:5199/
```

## Accessibility

Skip-to-content link, decorative elements marked `aria-hidden`, labelled form
controls, `aria-expanded`/`aria-controls` on the accordion and mobile toggle,
visible gold focus states, 48px+ touch targets, and a reduced-motion fallback
that reveals all content immediately.

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
