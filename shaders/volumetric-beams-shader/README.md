# BEAMWORKS — Volumetric Beams Shader with Optics Control Deck (React Three Fiber + GLSL + Tailwind CSS)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-screen volumetric light-beam shader rendered via a Three.js + React Three Fiber fragment raymarch — firing an angular star of light beams through a scattering medium with single-scatter in-scattering, Beer-Lambert transmittance, Henyey-Greenstein phase, depth twist, striation ribbing, and film-grain post — wrapped in a polished optics calibration bench UI. The live observation window is driven by 18 grouped faders, six named beacon presets (Searchlight, Aurora Fan, Ember Cross, Twist Drill, Veil, Supernova), mouse-steered beam orbit, and a GPU telemetry panel reading real FPS, beam flux, and spectral cast from the composited canvas. Built as a shadcn/Tailwind/TypeScript component on React + Vite. Generated with Claude Fable 5.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
```

External runtime deps, exactly as the brief lists: **`three`**,
**`@react-three/fiber`** (+ `@types/three` for the TypeScript port).

## What you can do

- **Calibrate the optics** — 18 faders grouped into four instrument sections
  (Optics, Volume, Camera / Motion, Film) map straight onto the shader's `u*`
  uniforms: beam count, half-angle, edge softness, rotation, depth-twist,
  density, falloff, anisotropy, light gain, time scale, orbit yaw, dolly, FOV,
  mouse-look, exposure, vignette, grain and gamma.
- **Recall a beacon** — six named patches (**Searchlight**, **Aurora Fan**,
  **Ember Cross**, **Twist Drill**, **Veil**, **Supernova**) snap the whole prop
  set to a stored regime. *Searchlight* is the brief's `demo.tsx` configuration,
  field-for-field. Move any fader and the active patch flips to **Custom**.
- **Steer the beam** — moving the pointer over the stage drives the component's
  own `uMouse` orbit (azimuth + elevation), eased by `pointerSmoothing`.
- **Read the GPU** — the telemetry panel samples the live canvas every ~120 ms:
  render rate, beam clock, **beam flux** (mean luminance read back off the
  composited frame), spectral cast, and a rolling flux sparkline.

## Why `/components/ui`

shadcn's `components.json` maps the `ui` alias to `@/components/ui`. The brief's
import — `import VolumetricBeamsFullScreen from "@/components/ui/volumetric-beams"`
— only resolves when the file lives exactly there, so the folder is the contract
that lets the shadcn CLI add components, the `@/` alias resolve, and future
pieces co-locate cleanly. The integration page documents this in its "Drop It
In" section.

## Design notes

- **Subject:** an imaginary optics calibration bench — a console for sculpting a
  volumetric searchlight. The shader *is* the hero; the volume is fully
  procedural, so **no stock photography is required** (the brief's "fill image
  assets with Unsplash" step is a no-op for this component — there are no
  `<img>` slots to fill).
- **Type:** Space Grotesk (geometric display), Inter (body / utility), Space
  Mono (telemetry / data). All three are **vendored locally** (latin `woff2` in
  `src/fonts/`) so the project runs fully offline — no runtime CDN calls.
- **Icons:** `lucide-react` throughout (aperture, gauge, orbit, film, radio,
  activity, …), per the brief's "use lucide-react for SVGs/logos" step.
- **Palette:** a black-blue optics ink with a cool searchlight beam-blue and a
  warm amber accent, so the violet/cyan/amber beams of the presets always read
  against the chrome.
- **Verbatim component:** `src/components/ui/volumetric-beams.tsx` keeps the
  brief's shader source, props, defaults, uniform table and `useFrame` logic
  byte-for-byte; the only additions are TypeScript types (the JSX→TSX port),
  wiring the otherwise-unused `mat` ref to the material, and an optional
  `children` slot. `src/demo.tsx` is verbatim.

## File map

```
src/
├─ components/
│  ├─ ui/
│  │  └─ volumetric-beams.tsx   # verbatim drop-in (typed)
│  ├─ beam-stage.tsx            # live r3f <Canvas> background (drives uniforms)
│  ├─ hero.tsx                  # reticle hero / wordmark
│  ├─ control-deck.tsx          # grouped calibration faders
│  ├─ fader.tsx                 # reskinned range control
│  ├─ preset-bank.tsx           # beacon presets
│  ├─ telemetry.tsx             # live GPU read-out panel
│  ├─ use-canvas-telemetry.ts   # canvas read-back hook (fps / flux / cast)
│  ├─ props-table.tsx           # props & uniforms API
│  ├─ install-story.tsx         # shadcn / tailwind / ts integration steps
│  └─ verbatim-demo.tsx         # the brief's demo.tsx, framed & unmodified
├─ demo.tsx                     # verbatim demo from the brief
├─ lib/
│  ├─ presets.ts                # BeamParams model + six beacons
│  └─ utils.ts                  # cn() helper (shadcn)
├─ fonts/                       # locally-vendored woff2 + @font-face
├─ App.tsx
├─ main.tsx
└─ index.css
```

## Notes on rendering

`BeamStage` mounts its r3f `<Canvas>` with `preserveDrawingBuffer: true` so the
telemetry probe can read the composited frame back via `drawImage` (a WebGL
canvas reads empty otherwise). The component degrades to the browser's software
WebGL path where no GPU is present, which is also how the bundled `demo.mp4` was
recorded headlessly.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
