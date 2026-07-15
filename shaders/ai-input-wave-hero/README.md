# AI Input Wave Hero — Animated Three.js Waveform Hero with AI Prompt Box (React + TypeScript + Three.js + GSAP)

[![Watch Demo](./poster.jpg)](./demo.mp4)

A full-viewport hero section featuring a Three.js audio-style instanced waveform rising behind an AI prompt textarea. The waveform is driven by two keyframed sine waves — gain, frequency, and wavelength tweened on a looping GSAP timeline — and rendered through a post-processing chain of `UnrealBloomPass` plus a custom film-grain `ShaderPass`. Bars shear at a fixed rotation angle, taper to a pixel-perfect tip in the fragment shader, and accumulate per-bar glow that follows the pointer. An animated typing placeholder cycles through suggestions in the prompt box. The whole component is exposed as `HeroWave` with props for title, subtitle, placeholder, and an `onPromptSubmit` callback, making it a drop-in shadcn-compatible hero for AI product landing pages. Generated with Claude Fable 5.

## Run

```sh
npm install
npm run dev       # dev server
npm run build     # type-check + production build
npm run preview   # serve the production build
npm run verify    # node verify.mjs
```

See `prompt.md` for the full build spec; `demo.mp4` shows it in motion.

---

Part of the [Shaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
