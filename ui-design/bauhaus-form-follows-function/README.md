# WERKBUND — Form Follows Function

A full landing page that puts a complete **Bauhaus design system** to work. Built
for a fictional Bauhaus-flavoured design-system studio (a nod to the *Deutscher
Werkbund*), the page treats every section as a constructed poster panel rather
than a generic web layout: three primary colours (red `#D02020`, blue `#1040C0`,
yellow `#F0C020`) grounded by stark black `#121212`, thick 2/4px black borders,
hard offset shadows (never blurred), binary radii (squares or full circles), and
massive uppercase Outfit type.

The whole page is composed from three primitives — circle, square, triangle —
and the design tokens live in exactly one place.

## Sections

A sticky geometric navbar, an asymmetric hero with a blue color-blocked
composition panel, a scrolling marquee, a yellow stats band, a six-card feature
grid, a blue four-step "how it works" with counter-rotated step numbers, a red
benefits band, an elevated three-tier pricing block, testimonials with grayscale
avatars, a blue journal grid (alternating round/square grayscale images), a
red/cream FAQ accordion, a yellow final CTA with large corner shapes, and a
near-black footer.

## Architecture

- `src/index.css` — the **token DNA**: palette, Outfit `@font-face` (vendored
  locally), hard-shadow variables, dot-grid / hatch utilities, and the
  mechanical entrance keyframes. Honours `prefers-reduced-motion`.
- `src/ui.tsx` — composable **primitives** (`Shape`, `BrandMark`, `Eyebrow`,
  `Btn`, `Card`, `Section`, `Container`) so no section re-types a one-off style.
- `src/data.ts` — all copy, kept apart from presentation.
- `src/App.tsx` — the **organisms** (navbar, hero, stats, features … footer).

Stack: React 18, TypeScript, Vite 6, Tailwind CSS v4 (`@tailwindcss/vite`),
`lucide-react`. All assets (Outfit woff2 + photography) are vendored under
`public/` — the project runs fully offline.

## Run

```bash
npm install
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # serve the production build
npm run verify    # headless Playwright checks against the preview build
```

`npm run verify` builds the site, serves it, and asserts (22 checks): no
console/page errors, every section renders, the Outfit webfont actually
resolved, all vendored images load locally with none broken, the FAQ accordion
toggles, and the mobile hamburger menu reveals its links.
