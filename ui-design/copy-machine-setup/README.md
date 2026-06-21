# Copy Machine — Project Setup (Vite + React + TypeScript + Tailwind CSS Scaffold)

A landing-page **scaffold** built to one client's exact, non-negotiable specification — a setup-phase prompt to stand up a single-page landing site on a fixed stack with a fixed folder structure and fixed config files, then **stop and wait** for components that must be copied in *character-for-character*, with their own colours, their own values, no theme adaptation, no "improvements". The motto: **be a copy machine, not a designer.** Generated with Claude Fable 5.

So this project is exactly that — the wired-up starting point. Every
spec-pinned file (`App.tsx`, `main.tsx`, `index.css`, `lib/utils.ts`,
`vite.config.ts`, `tsconfig.json`) is reproduced byte-for-byte from the brief,
and `App.tsx` deliberately renders an empty `<main>` awaiting the first
component.

To make the scaffold *demonstrable* without violating those pinned files, the
running page shows a self-contained **setup-status screen** — a dark
blueprint/IDE console that documents the freshly-initialized project (the
prompt's required confirmation block): "PROJECT SETUP COMPLETE", the created
file tree, the verbatim `App.tsx`, the mandated tech stack, and the copy-machine
rules. It lives as a sibling of `#root`, so React never touches it; the
unmodified `App.tsx` still mounts its empty `<main>` underneath.

The prompt that generated this project is preserved verbatim in
[`prompt.md`](./prompt.md).

## What was set up (to spec)

- **Stack (unchanged from the brief)** — Vite + React, TypeScript, Tailwind CSS
  + `tailwind-merge` + `clsx`, Framer Motion, Lucide React.
- **Folder structure** — `/src/components/ui/` (for the components to come),
  `/src/lib/utils.ts` (the `cn()` helper), `App.tsx`, `main.tsx`, `index.css`.
- **Path alias** — `@/` → `/src/`, configured identically in `vite.config.ts`
  and `tsconfig.json` (verified: `@/lib/utils` resolves under `tsc`).
- **Byte-exact pinned files** — `utils.ts`, `index.css`, `main.tsx`, `App.tsx`,
  `vite.config.ts` reproduced character-for-character; `tsconfig.json` carries
  the brief's `baseUrl`/`paths` additions.

## The setup-status screen

- Dark layered backdrop — blueprint grid (radial-masked), two drifting glow
  orbs, and a sweeping scanline, all `prefers-reduced-motion` aware.
- A reveal cascade and easing count-up readout (`6` files · `4` deps · `100%`
  copy fidelity · `0` design edits).
- Two IDE panels: the created **file tree** (with ✓ status ticks) and the
  **verbatim `/src/App.tsx`** in a syntax-highlit code panel stamped `COPIED 1:1`.
- The full mandated tech stack as chips, plus the copy-machine rules card.
- Self-hosted **Inter** + **JetBrains Mono** under `public/fonts/` — no runtime
  CDN calls, fully offline. Purely presentational (no React import, no
  dependency on any spec-pinned source file).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check (tsc --noEmit) + production build
npm run preview    # serve the build on http://localhost:4173
```

## Verify (headless, CLI-only)

`scripts/verify.mjs` boots the dev server and drives headless Chromium to
assert the scaffold contract: `App.tsx` mounts its empty `<main>` with the exact
spec `className`; the setup overlay shows "PROJECT SETUP COMPLETE", lists all six
created files, renders the verbatim `App.tsx`, and shows the full tech stack;
vendored fonts load; and there are **zero console errors and zero failed/4xx
requests**.

```bash
node scripts/verify.mjs                       # auto-starts vite dev
# or, against an already-running server:
node scripts/verify.mjs http://localhost:4173
```

## Stack

React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · tailwind-merge · clsx ·
Framer Motion · lucide-react.

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
