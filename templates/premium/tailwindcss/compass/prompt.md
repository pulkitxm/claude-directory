> A SELF-CONTAINED, PIXEL-FAITHFUL REPRODUCTION OF THE TAILWIND UI "COMPASS" ONLINE COURSE TEMPLATE. ALL PAGES AND INTERACTIONS REPRODUCED AS PLAIN HTML/CSS/JS WITH NO BUILD STEP REQUIRED. REFERENCE: `https://tailwindcss.com/plus/templates/compass/preview`

## SUMMARY

Compass is an online course/learning platform template built with Tailwind CSS. It presents a philosophical course on navigating uncertainty and decision-making. The layout features a collapsible left sidebar with course navigation and a main content area. The template supports a light/dark mode toggle. There are four main page types: the course overview (home), individual lesson pages, an interviews page, and a resources page.

## STYLE

- **Palette:** White/near-white background (`#fff`, `rgb(3,7,18)` for dark mode background), `gray-950` text, `gray-600`/`gray-400` secondary text, `gray-950/10` borders, `gray-950/4` hover backgrounds.
- **Fonts:** Inter Variable (`InterVariable`) — loaded via CDN
- **Type scale:** 16px base, `text-sm/7` (14px/28px), `text-base/7` (16px/28px), `text-2xl/7`, `text-3xl/8`
- **Radii:** `rounded-xl` (12px), `rounded-full`, `rounded-t-2xl`
- **Animation easings:** Standard CSS transitions, backdrop-blur on sticky header
- **Dark mode:** Class-based (`dark`) on `<html>`

## LAYOUT & STRUCTURE

### Pages

1. **Home / Course Overview** (`index.html`)
   - Left sidebar: fixed, collapsible, 288px wide with course navigation (all 20 lessons listed by part)
   - Sticky top bar: breadcrumb + dark mode toggle + mobile menu button
   - Hero section with background image, logo, course description, metadata (4 modules, 20 lessons, 3hr 26min), "Start the course" CTA
   - 4 course parts/sections:
     - Part 1: Orientation: Understanding Where You Are (5 lessons)
     - Part 2: Direction: Choosing a Path (5 lessons)
     - Part 3: Navigation: Steering Through the Inevitable (6 lessons + exercise)
     - Part 4: Destination: Arriving Where You Must (5 lessons)

2. **Lesson Page** (`lesson.html` — template for all 20 lessons, example: The Landscape of Choice)
   - Same sidebar + top bar
   - Lesson header with title, breadcrumb, duration
   - Video player placeholder
   - Rich text lesson content with inline images (diagrams)
   - Prev/Next navigation

3. **Interviews Page** (`interviews.html`)
   - Same sidebar + top bar
   - Grid of 6 interview video thumbnails with names and titles

4. **Resources Page** (`resources.html`)
   - Same sidebar + top bar
   - 3 featured video resources with thumbnails
   - 5 featured articles/blog posts with cover images
