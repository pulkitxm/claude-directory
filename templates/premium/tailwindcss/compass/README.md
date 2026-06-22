# Compass

A pixel-faithful clone of the Tailwind CSS "Compass" online course template — an online learning platform for navigating uncertainty and decision-making.

## Pages

- **`index.html`** — Course overview with collapsible sidebar navigation, hero section, and 4-part course outline (20 lessons)
- **`lesson.html`** — Lesson page with video player, rich text content, inline diagrams, code blocks, and sticky "On this page" TOC
- **`interviews.html`** — 3×2 grid of interview video cards with thumbnails, names, and descriptions
- **`resources.html`** — Resources page with Writing, Podcasts, Books, and Tools sections

## Features

- Fixed collapsible left sidebar with full course navigation (grouped by part)
- Sticky header with breadcrumb, section nav (Course / Interviews / Resources / Account), and sidebar toggle
- Dark/light mode support via CSS `prefers-color-scheme`
- Mobile-responsive layout with hamburger menu
- Video player placeholder with play button interaction
- Sticky TOC on lesson pages with active section highlighting
- Hover states on all interactive elements

## Tech

Plain HTML + CSS (Tailwind CSS v4 extracted) + vanilla JS. No build step required.

Fonts: Inter Variable (local), Geist Mono (local). All assets vendored.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Tailwind CSS Plus — <https://tailwindcss.com/plus/templates/compass/preview>
