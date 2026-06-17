# landing-page-foundation-kit

A single-page landing-page **foundation/scaffold** set up to an exact specification, ready for components to be stacked into `App.tsx` one at a time. It is intentionally a clean starting point — `src/components/ui/` is empty and `App.tsx` renders an empty `<main>` — so that future component code can be dropped in verbatim (the "copy machine" rule set in `prompt.md`: copy each component character-for-character, never re-theme, redesign, or alter values; the only permitted change is path translation, e.g. `/components/ui/` → `/src/components/ui/`).

## Stack (fixed by the prompt)

- **Vite + React** (React 18, `@vitejs/plugin-react`)
- **TypeScript**
- **Tailwind CSS** + **tailwind-merge** + **clsx** (a `cn()` helper in `src/lib/utils.ts`)
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Folder structure

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

The `@/` path alias resolves to `/src/` (configured in both `vite.config.ts` and `tsconfig.json`), so components can import the helper as `import { cn } from "@/lib/utils"`.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check (tsc -b) + production build
```

The current `App.tsx`:

```tsx
function App() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Components will be stacked here */}
    </main>
  )
}

export default App
```

See `prompt.md` for the full setup specification and the verbatim component-handling rules.
