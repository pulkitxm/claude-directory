# Tide — Deep-Work Focus App Landing Page (React + Vite + TypeScript + Tailwind CSS + Framer Motion)

A single-page landing page for **Tide**, a fictional deep-work / focus app with a deep oceanic twilight aesthetic — ink navy and abyssal blue lit by bioluminescent teal and coral bloom. Features a canvas-rendered animated tide-of-light hero with a live 50:00 session dial, soundscape bento grid, count-up stats, and ARIA-compliant FAQ accordion. Built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion, with Fraunces display serif and locally vendored fonts. Generated with Claude Fable 5.

A single-page landing page for **Tide**, a fictional deep-work / focus app that
turns concentration into a ritual: set one intention, drift into a living
generative soundscape, and let the rhythm of the session carry your attention.

Built to the exact project scaffold in [`prompt.md`](./prompt.md) — Vite + React +
TypeScript, Tailwind CSS with `tailwind-merge` + `clsx`, Framer Motion, and Lucide
React, with the `@/` → `/src/` path alias and a `cn()` utility. Every UI piece lives
in `src/components/ui/` and is stacked in `src/App.tsx`.

## Design direction

Not one of the usual AI defaults. The page is the surface of dark water at dusk —
a **deep oceanic twilight** palette (ink navy, abyssal blue) lit only by
**bioluminescent teal** and a warm **coral bloom**.

- **Signature** — a full-width, canvas-rendered *tide of light*: layered sine-wave
  bands that drift continuously and lean toward the pointer, the visual analogue of
  being in a focus current. It honors `prefers-reduced-motion` (single still frame).
- **Hero thesis** — instead of a big-number stat, the hero *is* a working focus
  session: a breathing dial with a live 50:00 countdown you can start and pause.
- **Type** — Fraunces (optical-size display serif) paired with Inter (body) and
  JetBrains Mono (timestamps / labels). All three vendored locally as woff2.

## Sections

Navbar · Hero (tide + session dial) · soundscape marquee · the Ritual (a genuine
3-step sequence) · Soundscapes bento · Stats (count-up) · Pricing (featured tier) ·
FAQ accordion (ARIA) · CTA with email validation · Footer.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
```

## Self-contained

Fonts (Fraunces, Inter, JetBrains Mono) and the favicon / grain overlay are all
vendored under `public/` — no runtime network calls, fully offline.

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
