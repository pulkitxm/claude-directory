# Apex — Scroll-Scrubbed Hero Video (Next.js 16 + React 19 + Tailwind CSS v4)

[![Watch Demo](./poster.jpg)](./demo.mp4)

An Apple-product-page-style scroll-scrubbed hero for the fictional brand **Apex**: a five-second Formula 1 launch film that you scrub by scrolling, with a synced telemetry HUD, a marquee divider, a spec sheet, and a full polished standalone site around it. The `<video>` is pinned full-screen while scroll position drives `video.currentTime` via a single `requestAnimationFrame` loop — no animation library. Generated with Claude Fable 5.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript 5
- Tailwind CSS v4 (`@tailwindcss/postcss`, CSS-first `@theme` tokens)
- `next/font` — Archivo (variable-width display) + Chivo Mono
- No animation libraries: a single `requestAnimationFrame` loop does the scrubbing

## Architecture notes

- **`app/components/ScrollHero.tsx`** — the whole effect. The section is `460vh`
  tall with a `position: sticky` inner stage, so it pins for ~4.6 viewport heights
  while the scroll runs. A rAF loop *lerps* a `current` value toward the scroll
  `target` (factor `0.14`) and writes `video.currentTime = p * duration`, so seeks
  stay smooth even with jumpy wheel/trackpad input. Duration is read from the
  file's `loadedmetadata`, so swapping the video needs **no code changes**.
  - Telemetry (speed/gear) and the progress rail are mutated via refs, never React
    state, so the component never re-renders on scroll.
  - `prefers-reduced-motion` disables the scrub (the video just holds frame 0).
  - A muted `play()`+`pause()` on first interaction primes Safari/iOS, which won't
    decode frames for a video that has never played.
- **`app/page.tsx`** — the standalone site around the hero (chapters, marquee,
  spec sheet, footer).
- **`app/globals.css`** — film-grain overlay, sunset fallback gradient (shown
  while the video loads or if it's missing), and all section styling.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

## Verify

```bash
npm run build    # next build — compile + TypeScript + static generation
npm run lint     # eslint (next/core-web-vitals + next/typescript)
```

## ⚠️ `public/hero.mp4` is currently a placeholder

The brief was to generate the real shot with the **Higgsfield** connector
(Seedance 2.0, 1080p, 5s, F1 sunset). At build time the connector was **down** —
`generate_video` returns *"User not found"* and the balance/cost preflights return
*"Something went wrong"*. It needs the connector to be **re-authenticated**, which
couldn't be done in this session.

So the committed `public/hero.mp4` is an **ffmpeg-generated sunset-gradient
stand-in**, encoded to the real shot's target spec (1920×1080, 5.0s, 25 fps) with
**every frame a keyframe** so `currentTime` scrubbing is perfectly smooth.

## Swapping in the real video

Once Higgsfield is re-authenticated, generate the shot, download it, and re-encode
it so **every frame is a keyframe** — without `-g 1`, `currentTime` seeking snaps
between sparse keyframes and the scrub looks janky:

```bash
ffmpeg -i downloaded.mp4 -c:v libx264 -g 1 -crf 18 -pix_fmt yuv420p \
  -movflags +faststart -an public/hero.mp4
```

No code changes are needed — `ScrollHero` reads the duration from the file's
metadata, so the new clip just drops in.

---

Part of the [Animations & loaders](../) collection in the [claude-directory](../../) — an open-source gallery of AI-generated UI built with Claude Fable 5. [Browse the live gallery](https://pulkitxm.com/claude-directory).
