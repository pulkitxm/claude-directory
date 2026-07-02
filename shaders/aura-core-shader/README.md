# Aura Core Shader — Interactive WebGL2 Energy Core with HSV Glow (React + TypeScript + WebGL2 + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

An interactive WebGL2 energy-core shader featuring a glowing HSV core with ten rotating rays, an FBM-distorted surface, and a shimmering particle field that brightens as the cursor nears the center — framed inside a plasma-containment monitoring console. Four shader uniforms (`uColor`, `uPower`, `uFocus`, `uDistortion`) are exposed as live faders with named field profiles (Halcyon, Solar Flare, Ion Bloom, Verdant). Telemetry readouts for containment integrity, field power, coherence, turbulence, and excitation are computed deterministically from live uniforms and cursor proximity. Uses an inlined OGL micro-renderer with no Three.js dependency. Generated with Claude Fable 5.

The shader is the verbatim drop-in from the integration brief
(`src/components/ui/aura-core.tsx`, with its inlined OGL renderer), placed in the
shadcn `components/ui` folder and imported through the `@/` alias exactly as the
brief expects. The surrounding console turns the component's four sliders into
**reactor field controls**, reads the core's live state off the GPU clock
(render rate, containment integrity, excitation), and ships four field profiles
that snap the shader to named regimes.

> The core is a contained plasma specimen behind blast glass — move your cursor
> over the window to excite the field, switch profiles to change its regime, and
> freeze the clock to hold a frame.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS (shadcn-style structure, `@/` → `src/`)
- WebGL2 (the brief's inlined-OGL shader, no 3D engine dependency)
- lucide-react (console icons)
- Chakra Petch / Inter / JetBrains Mono — vendored locally in `public/fonts`

Everything is self-contained and runs **offline** — no remote assets, no CDNs.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
npm run verify     # headless Chromium checks (canvas, draw, faders, freeze)
```

## What the console does

- **Field controls** — `Hue`, `Power`, `Ray Focus`, `Distortion`. These are the
  brief's four sliders, lifted out of the component and wired straight into the
  shader uniforms (`uColor` / `uPower` / `uFocus` / `uDistortion`).
- **Field profiles** — `Halcyon`, `Solar Flare`, `Ion Bloom`, `Verdant`. Each is
  a real point in the parameter space, named for the regime it produces.
- **Move the cursor** over the containment window — drives `uMouse` and lights
  the field; the *Excitation* readout climbs as you approach the core.
- **Freeze** — holds the shader clock so a frame stays put.
- **Reset to Standby** — returns to the `Halcyon` profile.

Every telemetry figure (integrity, field power, coherence, turbulence,
excitation) is a deterministic function of the live uniforms or measured
cursor proximity — nothing is faked.

---

## Integrating the component (the brief)

The task was to drop an existing React component into a project that supports a
**shadcn structure**, **Tailwind CSS**, and **TypeScript**, and to copy it into
`components/ui`. Here is exactly how this project satisfies that, plus how to
reproduce the setup from scratch.

### 1. Project must support shadcn structure, Tailwind, and TypeScript

This experiment already does. If you are starting from an empty folder, scaffold
an equivalent base:

```bash
# Vite + React + TypeScript
npm create vite@latest aura-core -- --template react-ts
cd aura-core

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# then add the @tailwind directives to your CSS and set `content`
# to ["./index.html", "./src/**/*.{ts,tsx}"]

# shadcn CLI (sets up components.json, the @/ alias, and components/ui)
npx shadcn@latest init
```

`shadcn init` writes a `components.json` and configures the `@/*` path alias.
This project wires that same alias by hand so it stays dependency-light: see
`vite.config.ts` (`"@" → ./src`) and `tsconfig.app.json`
(`"paths": { "@/*": ["./src/*"] }`).

### 2. Why the component goes in `/components/ui`

shadcn's convention is that **primitive, reusable UI components live in
`components/ui`**, addressed through the `@/` alias as `@/components/ui/<name>`.
That matters because:

- The brief's `demo.tsx` imports `@/components/ui/aura-core` literally — the
  import only resolves if the file is at that exact path.
- It keeps generated/vendored primitives separate from your app-specific
  composition code, so a future `shadcn add` (or a manual drop-in like this one)
  always lands in a predictable place and your imports never need rewriting.

So the component is copied verbatim to
[`src/components/ui/aura-core.tsx`](./src/components/ui/aura-core.tsx) and the
brief's example lives at [`src/components/demo.tsx`](./src/components/demo.tsx),
unchanged.

### 3. Dependencies

The component is **self-contained**: the brief inlined the bits of the OGL
library it needs, so there is **no `ogl` (or three.js) dependency to install** —
just React. The console adds `lucide-react` for icons, as the brief suggests.

```bash
npm install lucide-react
```

### 4. The questions the brief asks

- **What props does it take?** The verbatim `AuraCore` takes **none** — it owns
  its own state (`hue`, `power`, `focus`, `distortion`) and renders its own
  slider panel. To let a parent own those values, this project adds a typed
  sibling, [`aura-reactor.tsx`](./src/components/ui/aura-reactor.tsx), that runs
  the *same* renderer and *verbatim* GLSL but exposes
  `hue` / `power` / `focus` / `distortion` / `paused` / `onFrame` as props.
- **State management?** Plain React state — no context or external store needed.
  The console holds the four parameters in `useState` and pushes them down.
- **Required assets?** None for the shader (it is fully procedural). The brief
  mentions Unsplash images and lucide icons "if the component requires them" —
  the core needs no imagery, so this build uses **lucide-react** icons for the
  console chrome and vendors its fonts locally instead of hotlinking.
- **Responsive behavior?** The shader fills its container at any size (it reads
  `uResolution` on resize). The console collapses from a three-column desktop
  layout to a single stacked column on mobile, with the profile rail folding
  into chips.
- **Best place to use it?** As a full-bleed interactive background or a framed
  hero/instrument panel — anywhere a living, cursor-reactive focal point earns
  its pixels. Here it is the centerpiece of a monitoring console.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
