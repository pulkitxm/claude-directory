# Copy Machine — Pixel Perfect (Vite + React + TypeScript + Tailwind CSS + Framer Motion)

[![Watch Demo](./poster.jpg)](./demo.mp4)

An experiment in the "copy machine" workflow: a strict project-setup prompt that instructs the assistant to be a pixel-perfect copy machine — copy provided component code character-for-character, never adapting colors, classNames, hex codes, values, or layout to any theme; path translation is the only permitted change. The result is **Foundry**, a single-page PCB-design product landing page ("Design, simulate, and ship custom PCBs"). Built with the prompt's mandated stack: Vite + React + TypeScript, Tailwind CSS with tailwind-merge + clsx (a `cn()` helper), Framer Motion, and Lucide React, with `@/` aliased to `/src/`. Generated with Claude Fable 5.

The page stacks a full set of sections built to the copy-exact discipline: Navbar, Hero, LogoStrip, Features, Stats, Workflow, Showcase, Testimonials, Pricing, CTA, and Footer (with custom BoardCanvas and TraceField visual components). The point of the project is fidelity — each component renders with its own built-in colors, values, and structure exactly as supplied.

## Run

```sh
npm install
npm run dev      # start the Vite dev server
npm run build    # type-check (tsc --noEmit) and build for production
npm run preview  # preview the production build
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [UI design](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
