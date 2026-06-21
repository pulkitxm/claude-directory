# The Newsprint — Editorial Press Design System Landing Page (React + TypeScript + Tailwind CSS)

A full multi-section editorial landing page implementing the **Newsprint** design system end to end — a fictional publication of record for the age of machine intelligence, set in cold metal type. Zero rounded corners, no soft shadows, no infinite scroll: the page reads as a broadsheet newspaper translated faithfully to the web, with hard-offset ink shadows, a four-font typographic stack (Playfair Display, Lora, Inter, JetBrains Mono), and centralized design tokens in `tailwind.config.ts`. Generated with Claude Fable 5.

## Stack

- React 18 + Vite 5 + TypeScript (strict)
- Tailwind CSS 3 with centralized Newsprint tokens
- `class-variance-authority` + `tailwind-merge` for the button/variant system
- `lucide-react` icons (1.25–1.5 stroke, bordered icon boxes)
- `@fontsource` — Playfair Display, Lora, Inter, JetBrains Mono (vendored locally, no CDN)
- Hand-drawn SVG halftone "engravings" as local grayscale plates (no remote images)

## Page anatomy

1. **Masthead** — top edition strip (Vol. / dateline / Late City Final), big serif
   nameplate that condenses on scroll, mono nav that turns red on hover, sticky
   `z-40`, and a full-bleed mobile drawer index.
2. **Front Page** — asymmetric 8/4 split: viewport-dominating Playfair headline
   with a drop-capped, justified lead, plus a "stop press" rail and the press
   engraving (`Fig. 1.1`).
3. **The Brief** — a black breaking-news ticker (pure-CSS infinite crawl, pauses
   on hover) over a four-up grid of headline figures.
4. **The Desks** — a six-up collapsed-border feature grid; bordered icon boxes
   invert black/white on hover.
5. **How It's Filed** — the mandatory **inverted** section: black ground, paper
   type, giant editorial-red step numerals.
6. **Dispatches** — a 7/5 lead story plus a three-up card rail; cards lift with
   the signature hard offset shadow and warm their grayscale plates on hover.
7. **Subscribe** — three pricing columns (featured plan inverted) with dashed
   feature rules, plus a bottom-border-only newsroom email capture with a
   confirmation state.
8. **Letters / Questions** — a `grid-rows-[0fr→1fr]` accordion (plus glyph rotates
   45°) paired with an engraved editor portrait in a 5/7 split.
9. **Colophon** — black footer with the printer's imprint line, asymmetric link
   columns, and bordered social boxes.

Ornamental asterism dividers (`✧✧✧`) break the major passages, and the page
respects `prefers-reduced-motion`.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check (tsc -b) + production build
npm run preview  # serve the production build
```

## Verification

Built with `npm run build` (strict TypeScript, clean). A headless Playwright
script confirmed 22/22 checks with zero console errors: all sections render, the
inverted block is true ink black, cards have 0px radius, images are grayscale by
default, the ticker and accordion work, the subscribe form reaches its
confirmation state, there is no horizontal overflow on mobile, and the mobile
menu toggles. `demo.mp4` is a headless scroll-through recorded with the repo's
`scripts/record-demos` recorder.

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
