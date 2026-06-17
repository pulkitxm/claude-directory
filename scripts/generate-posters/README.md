# Poster generator

Generates a still **`poster.jpg`** next to every project's `demo.mp4`, plus a
single **`posters.json`** manifest at the repo root. These exist so the gallery
site can show something sharp _immediately_ and never render a blank box while a
video is buffering (or failing to load).

## What it produces

For each `**/demo.mp4`:

- `poster.jpg` — a representative frame (max 1280px wide, ~75 KB). ffmpeg's
  `thumbnail` filter picks a content-rich frame from the opening of the clip, so
  black fade-in frames are skipped automatically.

And one root-level `posters.json`, keyed by project path relative to the repo:

```json
{
  "hero-sections/transform-data-hero": {
    "poster": "hero-sections/transform-data-hero/poster.jpg",
    "video": "hero-sections/transform-data-hero/demo.mp4",
    "width": 1280,
    "height": 800,
    "blurDataURL": "data:image/jpeg;base64,…"
  }
}
```

`blurDataURL` is a ~24px JPEG inlined as a data URI — a zero-request placeholder
you can paint instantly (the classic blur-up / LQIP trick).

## Usage

```bash
# from this folder
npm install                 # optional: only needed if you don't have a system ffmpeg
node generate-posters.mjs            # generate only missing posters
node generate-posters.mjs --force    # regenerate everything
node generate-posters.mjs --only hero-sections   # limit to matching paths
```

ffmpeg resolution order: `$FFMPEG_PATH` → `ffmpeg` on `PATH` →
the optional `ffmpeg-static` dependency.

## How the site should consume this (smooth, race-free loading)

The manifest is designed to fix the "video sometimes doesn't show" problem on the
consuming gallery. The recommended pattern per card / project page:

1. **Paint `blurDataURL` immediately** as the element background — zero network,
   so there is never an empty box.
2. **Set `poster={poster}`** on the `<video>` (or render `poster.jpg` as an
   `<img>` underlay). A sharp frame now shows before any video byte arrives, and
   it stays visible if the video is slow or never loads.
3. **Lazy-load the video** with `preload="none"` + `IntersectionObserver`, and
   only set `src` when the card is on/near screen. Use
   `playsInline muted loop` for autoplay previews.
4. **Cancel stale work on category switch / unmount.** This is the root cause of
   requests "piling up": when the visible set changes, for every video leaving
   the viewport call `video.pause()`, `video.removeAttribute("src")`, and
   `video.load()` to abort its in-flight request. Track the active category/route
   in a ref and ignore late `loadeddata` events that belong to a category the
   user already navigated away from.
5. **Fade the video in on `loadeddata`** over the poster, so the swap is seamless.

Because `poster.jpg` + `blurDataURL` are always present, steps 4–5 can be as
aggressive as needed (cancel early, retry) without the user ever seeing a blank
frame.

## Regenerating

`poster.jpg` and `posters.json` are committed artifacts. Re-run this script
whenever you add or re-record a `demo.mp4`; the run below in CI or locally is
idempotent (skips projects that already have a poster + manifest entry unless
`--force`).
