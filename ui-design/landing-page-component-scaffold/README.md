# landing-page-component-scaffold

A clean, ready-to-fill **single-page landing-page scaffold** built to an exact specification.
The project is set up first; components are then dropped into `src/components/ui/` and
stacked inside `App.tsx` one at a time. Nothing is themed or restyled — each component
keeps its own colors, layout, and values verbatim.

## Stack

- **Vite + React** + **TypeScript**
- **Tailwind CSS** + **tailwind-merge** + **clsx** (`cn()` helper)
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Structure

```
src/
  components/
    ui/            ← all UI components go here
  lib/
    utils.ts       ← cn() utility (clsx + tailwind-merge)
  App.tsx          ← main landing page (components stack here)
  main.tsx         ← entry point
  index.css        ← Tailwind base styles
```

The `@/` path alias resolves to `src/` (configured in both `vite.config.ts` and `tsconfig.json`),
so components can import the helper as `import { cn } from "@/lib/utils"`.

## Run

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # type-check (tsc) + production build
npm run verify   # headless Chromium smoke test (boots dev server, asserts the scaffold renders)
```

## Verification

`npm run verify` boots the dev server, loads the page in headless Chromium, and asserts:

- the `#root` element mounts,
- `App.tsx` renders the `<main class="relative min-h-screen flex flex-col">` shell,
- Tailwind base styles are applied,
- no console or page errors occur on load.
