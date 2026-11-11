# Apex : Scroll-Scrubbed Hero Video

An independent interface experiment with fictional content. The retained layout and interactions explore scroll-scrubbed hero video (next.js 16 + react 19 + tailwind css v4).

Run `npm install`, `npm run dev`, or `npm run build`. Scroll to scrub the locally generated abstract gradient film.

Typography uses system fonts.

Asset and dependency licensing is recorded in the root [provenance manifest](../../ASSET_PROVENANCE.md). Historical posters, recordings, and unverified vendored assets have been removed.

The 5-second 1280x720 film contains 125 all-keyframe frames. Recreate it with:

```sh
ffmpeg -y -f lavfi -i 'gradients=size=1280x720:rate=25:c0=0x19182e:c1=0xe88b4a:x0=0:y0=0:x1=1280:y1=720:n=2:seed=618:duration=5:speed=0.1' -c:v libx264 -g 1 -crf 24 -pix_fmt yuv420p -movflags +faststart -an public/hero.mp4
```
