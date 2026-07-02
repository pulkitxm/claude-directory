# Paper Shaders Control Deck — Multi-Channel WebGL Shader Instrument Console (React + React Three Fiber + Vite + Tailwind CSS v4)

[![Watch Demo](./poster.jpg)](./demo.mp4)

An instrument console for driving live WebGL shaders, integrating four shader channels — including `@paper-design/shaders-react` MeshGradient and DotOrbit shaders plus a custom GLSL `ShaderPlane` via React Three Fiber — behind glass in a brushed-graphite scope housing. A left-hand module rack provides a channel patch grid, a patch-bay of faders, transport controls, and a live telemetry strip (FPS, frame count, uptime, source). Built with React 19 + TypeScript + Vite 7 + Tailwind CSS v4 on a shadcn-style project structure. Generated with Claude Fable 5.

## Four shader channels

| # | Channel | Source | What it is |
|---|---------|--------|-----------|
| 1 | **Mesh Gradient** | `@paper-design/shaders-react` | Flowing four-stop gradient field, grain-mixed |
| 2 | **Dot Orbit** | `@paper-design/shaders-react` | Orbiting dot lattice with a stepped colour ramp |
| 3 | **Combined Bus** | `@paper-design/shaders-react` | Mesh base screened with an orbiting dot layer |
| 4 | **Shader Plane** | `react-three-fiber` | The prompt's custom GLSL planes + energy rings |

Press **1–4** to patch a channel, **Space** to hold/run.

## Controls that actually drive the shaders

- **Speed** fader (`0–3×`) and **Intensity** fader (`0–3 amp`) feed live into
  every channel. For the paper-design shaders, intensity maps onto each shader's
  geometric character — mesh `distortion`/`swirl`, dot-field `size`/`spreading` —
  so the fader produces a continuous, visible change. For the R3F channel it
  scales the GLSL `intensity` uniform and the plane warp directly.
- **Hold / Run** transport freezes the animation clock by driving speed to 0.
- **Reset** returns the deck to its default patch (`1.00×` / `1.50 amp`).
- A live telemetry strip and an in-scope `SPD / AMP` readout reflect state in
  real time; **Wire It Up** copies the install command to the clipboard.

## A note on the component API

The prompt's `demo.tsx` was written against an older `@paper-design/shaders-react`
release and uses props that no longer exist (`backgroundColor`, `wireframe`,
`dotColor`, `orbitColor`, `intensity`). This build pins the current
**`@paper-design/shaders-react@0.0.76`** and adapts the same three channels
(mesh / dots / combined) to its real API so the shaders actually render, while
keeping the original intent. The prompt's own R3F component is preserved verbatim
(with only minor TypeScript fixes for `material.opacity` typing) and added as a
fourth channel.

## Stack

React 19, TypeScript, Vite 7, Tailwind CSS v4, `@paper-design/shaders-react`,
`@react-three/fiber`, `three`, `lucide-react`.

## Design

| Token | Value |
|-------|-------|
| Chassis / rail | `#0b0c0e` |
| Module faceplate | `#131519` / `#181b21` |
| Engraved hairline | `#2a2e35` |
| Signal (live) | `#54e6c8` |
| Warning (amber) | `#ffb23e` |
| Paper-white ink | `#f2f0ea` |
| Type | Geist Sans + Geist Mono (vendored locally) |

Signature: the live shader specimen seated in a scope housing — corner
brackets, scanline overlay, inner vignette, and a travelling signal-sweep bar on
the bottom bus.

## Assets

The **Geist Sans** and **Geist Mono** variable fonts are **vendored locally**
under `assets/fonts/*.woff2` and bundled by Vite — the project runs fully
offline, no CDN or remote font calls. Icons are `lucide-react` (no remote SVGs).

## Run

```bash
npm install
npm run dev       # dev server
npm run build     # type-check (tsc -b) + production build
npm run preview   # serve the production build
npm run verify    # headless Playwright checks (boots its own dev server)
```

`npm run verify` boots a dev server, drives a headless Chromium with software
WebGL, and asserts: the header renders, every channel produces a live WebGL
canvas, the WebGL context is real, the faders sweep `0.00 → 3.00`, and no
page/console errors fire.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
