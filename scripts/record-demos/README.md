# Demo recorder

Records a `demo.mp4` walkthrough for each landing-page project in this repo.

Each project is a Vite app. The recorder boots the project's dev server, drives a
headless Chromium through it, and writes `demo.mp4` into that project's folder.

Pages are classified automatically:

- **Scrollable pages** are captured as a **deterministic screenshot sequence**
  (top → bottom → top) encoded at a locked 30 fps. Every output frame is rendered
  and screenshotted explicitly, so the motion is perfectly smooth — no dropped or
  variable frames. The page's own `scroll-behavior: smooth` is neutralized so it
  can't fight the scroll easing.
- **Static pages** (one viewport tall) are recorded as **real-time video** and held
  on the hero with gentle pointer movement, so CSS/JS animations and video
  backgrounds are captured live.

## Prerequisites

- **Node.js 18+**
- **ffmpeg** on your `PATH` (`brew install ffmpeg`)
- Chromium for Playwright — installed automatically by the `postinstall` below.

## Setup

```bash
cd scripts/record-demos
npm install          # installs Playwright + downloads Chromium (postinstall)
```

## Record everything

```bash
cd scripts/record-demos
./record-all.sh                 # record every project that has no demo.mp4 yet
./record-all.sh --force         # re-record all projects
./record-all.sh --workers 4     # change parallelism (default: 3)
```

`record-all.sh` is **resumable**: it skips projects that already have a `demo.mp4`,
so you can stop and re-run it. Each worker uses its own port, so parallel runs
never collide. Per-project logs are written to `$TMPDIR` (path printed on failure).

## Record one project

```bash
cd scripts/record-demos
./record-one.sh ../../mindloop-mono-landing          # default port 5199
./record-one.sh ../../aethera-cinematic-hero 5205    # custom port
```

## Tuning

Capture size, frame rate, scroll speed, and hold durations live in the `CONFIG`
object at the top of [`record.mjs`](./record.mjs):

- `viewport` — capture resolution and the layout width the page renders at (1280×800).
- `scroll.secondsPerScreen` — scroll pace; **higher = slower** (default `4.0`).
- `scroll.downMax` — cap on the down-scroll duration so very tall pages don't drag.
- `scroll.upRatio` / `upMin` / `upMax` — the return-scroll speed.
- `scroll.hold*` — pauses at the top, bottom, and end.

## Output

`demo.mp4` (H.264, CRF 18) is written into each project directory. These video
files are not meant to be committed — add `demo.mp4` to the repo `.gitignore` if
you want to keep them out of version control.
