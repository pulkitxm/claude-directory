# Celestial Sphere Shader

A single procedural sphere — six-octave fractal Brownian-motion noise for the
cloud deck and a Fresnel rim for the atmosphere — rendered with a Three.js
`ShaderMaterial`, then catalogued as a live **exoplanet survey specimen**.

The shader component from the integration brief is dropped in verbatim (the
GLSL vertex/fragment shaders, uniforms, sphere geometry, animation loop, resize
handling and cleanup are unchanged) at
`src/components/ui/celestial-sphere-shader.tsx` — the canonical shadcn
`@/components/ui` location, so the brief's own import
`@/components/ui/celestial-sphere-shader` resolves untouched.

Around it is a deliberate instrument, **Stellar Cartography**:

- **The scope (hero)** — the sphere is framed inside a circular brass eyepiece
  with an engraved reticle, azimuth ticks and a slow radar sweep. The shader
  fills the bezel via an additive `fill` prop instead of owning the viewport.
- **The catalog entry** — colour chips for the two nebula colours, three brass
  dials for rotation / cloud density / glow, and three "catalogued worlds"
  presets (Orion Nebula, Crimson Gas Giant, Ice Planet) from the brief.
- **Derived survey facts (signature)** — the catalog card reads the live shader
  props back as astronomy: a pseudo Morgan–Keenan **spectral class** from the
  rim colour, a **rotation period** inferred from `rotationSpeed`, and an
  **atmosphere / albedo** read from `cloudDensity` / `glowIntensity`.
- **Live field telemetry** — the shader emits per-frame telemetry (`elapsed`,
  `fps`, `rotation`) through an `onFrame` callback; the bottom strip reports the
  shader's own WebGL clock, smoothed render rate, sphere longitude and geometry.

Palette and type are chosen for an astronomical-journal feel rather than the
default dark-sci-fi look: deep ink-indigo ground, warm brass / parchment
instrument chrome, a coral catalog accent and an oxide-cyan readout accent. Type
pairing: **Newsreader** (display serif) · **Inter** (body) · **Space Mono**
(data). Icons from `lucide-react`. The entrance reveal and radar sweep respect
`prefers-reduced-motion`.

## Stack

React 18, TypeScript, Vite 5, Tailwind CSS v3, Three.js, `lucide-react`.
shadcn-style `@/*` path alias → `./src`.

## Assets

Fully self-contained / offline-ready. The Newsreader, Inter and Space Mono web
fonts (latin subset) and the starfield texture (`stardust.png`, the texture the
brief referenced) are vendored locally to `public/fonts/` and `public/assets/`
and referenced via relative paths — no remote Google Fonts or CDN requests at
runtime. The sphere itself is generated entirely on the GPU.

## Run

```bash
npm install
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # serve the production build
npm run verify    # headless Playwright checks against the preview server
```

## Integration notes (per the prompt)

- **Project structure** — this is a Vite + React + TypeScript app with Tailwind
  CSS and the shadcn `@/components/ui` convention already wired up (the `@`
  alias is configured in both `vite.config.ts` and `tsconfig.app.json`). If you
  are dropping the component into your own app instead, scaffold/extend with the
  shadcn CLI (`npx shadcn@latest init`), which installs Tailwind + TypeScript
  and writes the `components.json` alias map for you. To add Tailwind and
  TypeScript to a bare Vite app manually:
  `npm i -D tailwindcss postcss autoprefixer typescript && npx tailwindcss init -p`.
- **Why `/components/ui`** — shadcn treats `components/ui` as the home for
  primitive, copy-in UI building blocks resolved through the `@/components/ui`
  alias. Placing the shader there means the brief's import resolves unchanged
  and the component sits alongside the rest of your design-system primitives. If
  your default component path is not `components/ui`, create it: the alias map
  and every copy-pasted shadcn block assume that folder exists.
- **Dependencies** — only `three` is required by the component itself
  (`npm i three`); `lucide-react` is used by the surrounding console for icons.
- **Props / state** — the component's props are the brief's: `color1`, `color2`,
  `cloudDensity`, `glowIntensity`, `rotationSpeed`. Two additive, optional props
  are layered on without changing defaults: `fill` (fill the parent instead of
  the viewport) and `onFrame` (per-frame telemetry). State lives in the console
  (`useState`) — the brief needs no context provider or external store.
- **Responsive behaviour** — the console is a two-column grid on desktop that
  collapses to a single stacked column on small screens; the page scrolls when
  the instrument is taller than the viewport, and the scope stays square at
  every width. A `ResizeObserver` keeps the filled canvas crisp on reflow.
- **Where to use it** — as a full-bleed background (the brief's `demo.tsx`
  usage, preserved in `src/components/demo.tsx`) or, as here, framed inside a
  fixed-size container with `fill` — a hero backdrop, a product "specimen"
  viewer, or a settings playground.
- **Images** — no photographic stock imagery is needed; the only raster asset is
  the vendored `stardust.png` starfield the brief referenced.
