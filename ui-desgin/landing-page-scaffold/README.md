# landing-page-scaffold

A pre-component landing-page **scaffold**, built to an exact specification as the first step of a multi-turn build. No UI sections exist yet — this is the clean foundation that individual components stack into as they arrive in follow-up steps.

The full originating prompt is preserved verbatim (uppercased) in [`prompt.md`](./prompt.md).

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** (v3) + **tailwind-merge** + **clsx** — exposed through a `cn()` helper
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Layout

```
/src
  /components
    /ui               ← All UI components go here
  /lib
    utils.ts          ← cn() utility function
  App.tsx             ← Main landing page (components stack here)
  main.tsx            ← Entry point
  index.css           ← Tailwind base styles
```

The `@/` import alias resolves to `/src/` (configured in both `vite.config.ts` and `tsconfig.json`), so components import shared code as `@/lib/utils`.

`App.tsx` is an intentionally empty `<main className="relative min-h-screen flex flex-col">` shell — the spot where components are added one at a time.

## Run

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # tsc --noEmit && vite build
```

## Verified

- `npm run build` (TypeScript typecheck + Vite production build) passes clean.
- The `@/` alias resolves through Vite (`import { cn } from '@/lib/utils'` bundles).
- Tailwind directives compile into the output CSS.
- Headless Chromium confirms the app mounts and renders the `<main>` shell with zero console/page errors.

`demo.mp4` shows the running scaffold (an empty page by design at this stage).
