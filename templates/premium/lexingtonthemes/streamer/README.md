# Streamer — Lexington Themes

A pixel-faithful HTML/CSS/JS clone of the **Streamer** template by [Lexington Themes](https://lexingtonthemes.com/viewports/streamer) — a music and indie media platform with blog, podcast, jobs, authors, pricing, and a full design system.

## Pages (14)

| Page | File |
|------|------|
| Home | `index.html` |
| Magazine (Blog) | `blog.html` |
| Podcast | `podcast.html` |
| Jobs | `jobs.html` |
| About | `about.html` |
| Advertise | `pricing-advertise.html` |
| Membership | `pricing-membership.html` |
| Authors | `authors.html` |
| Blog Post | `blog-post.html` |
| Podcast Episode | `podcast-episode.html` |
| System Overview | `system-overview.html` |
| System Colors | `system-colors.html` |
| System Buttons | `system-buttons.html` |
| System Typography | `system-typography.html` |

## Tech

- **Styles**: Tailwind CSS v4 compiled to `assets/BaseLayout.css`
- **Font**: Inter via rsms.me CDN
- **Search**: Fuse.js v7.0.0 (client-side, inline data)
- **Carousel**: Keen-Slider v6.8.6 (home + podcast pages)
- **Images**: 33 `.webp` assets in `assets/images/`

## Design Tokens

| Token | Value |
|-------|-------|
| `base-900` | `#0d0d0d` — nav background, cards |
| `base-300` | `#f5f0e8` — page background, nav text |
| `accent-500` | `oklch(70.5% .213 47.604)` — orange/amber accent |

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080/index.html
```

## Source

Reference: https://lexingtonthemes.com/viewports/streamer
