# Pallet Ross — Scroll-Driven Artist Marketplace Landing Page (React + Vite + Framer Motion)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A single-page, scroll-driven landing page for the fictional artist marketplace **Pallet Ross**. Seven artwork cards perform a choreographed intro — a lead card rises, flies to the right, then sweeps left while the rest reveal in its wake — then become scroll-linked: as you scroll they gather into one centered stack, descend together, fan out into a diagonal cascade ladder, and lock in place anchored to Section 2. Three full-height sections cover Hero, E-Commerce, and a Class page with an autoplay banner carousel. Framer Motion's `useScroll` and `useTransform` power the entire scroll-linked card choreography, including a precise `lockProgress` anchor computed from the Section 2 DOM position. An off-white `#F2F2F0` page background, Inter Tight typography, and a teal/red/blue accent palette give the marketplace a clean editorial feel. Generated with Claude Fable 5.

## Stack

- React + Vite + TypeScript
- Tailwind CSS v4 (`font-heading`, `font-body`, `font-sans` all map to **Inter Tight**)
- Framer Motion (`useScroll`, `useTransform`, choreographed keyframes)
- lucide-react icons

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
```

## Layout overview

| Layer | z-index | What |
| --- | --- | --- |
| Blur blobs | 0 | Fixed full-viewport radial-gradient decoration |
| Cards overlay | 5 | Global `ScrollCards` owning all seven cards |
| Scroll indicator | 40 | Up/down viewport-jump buttons |
| Navbar | 50 | Logo, wordmark, nav, account/settings |

Three full-height sections live inside one container ref:

1. **Hero** — headline, chat bubbles (`@coplin`, `@andrea`), intro card fan.
2. **E-Commerce** (`data-section="two"`) — text column + cascade ladder anchor,
   floating `@howard` / `@robin` tags. The card overlay locks here.
3. **Class** (`data-section="three"`) — heading, `@reatha` tag, autoplay banner
   carousel with dots, a pulsing **Watch** CTA, and prev/next controls.

## Assets

All assets are vendored locally for offline use:

- `public/card-1.png … card-7.png` and `public/banner-1.png … banner-3.png`
  (originally from `qclay.design/lovable/pallet/`).
- `public/fonts/inter-tight-latin.woff2` — self-hosted Inter Tight (variable,
  latin subset) so the page needs no network at runtime.

---

Part of the [Animations & loaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
