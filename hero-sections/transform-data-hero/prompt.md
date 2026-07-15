# Transform Data Quickly — Cinematic Hero Section

## Overview

Build a modern, full-bleed hero section that sits over a looping background video. The video opacity is driven entirely by a custom `requestAnimationFrame` fade engine (no CSS transitions on the video): it fades in on load and on every loop restart, fades out just before the clip ends, holds on black briefly, then seeks back to the start and fades in again. On top of the video sit a navbar, a headline block (badge + title + subtitle), and a glassy AI-style search box.

## Fonts Required

Each at weights 400, 500, 600, and 700:

- Schibsted Grotesk
- Inter
- Noto Sans
- Fustat

## Layout

- The video background renders first as the full-screen backdrop.
- All content sits above the video in a `z-10` layer, with the navigation bar first.
- The hero content region provides a **60px gap** below the nav (see Spacing) and the horizontal padding of **120px**.
- Inside that region, an inner wrapper nudges the hero content **up 50px** (negative margin), holding the hero header then the search box.

## Video Background

### Asset

- **Video URL:** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4`

### Positioning

- **Size:** 115% width and height.
- **Position:** centered horizontally, anchored to the top, with an `object-top` focal point.

### Custom JavaScript fade system (no CSS transitions)

- **250ms `requestAnimationFrame`-based fade-in** on load / loop start.
- **250ms fade-out** when **0.55 seconds** remain before the video ends.
- A `fadingOutRef` boolean prevents re-triggering the fade-out from repeated `timeupdate` events.
- On `ended`: opacity is set to `0`, a **100ms** delay, then reset to `currentTime = 0`, `play()`, and fade back in.
- Each new fade cancels running animation frames to prevent competing animations.
- Fades resume from the current opacity (no snapping).

## Navigation Bar

- **Padding:** 120px horizontal, 16px vertical.
- **Logo:** text `Logoipsum` — Schibsted Grotesk semibold, 24px, -1.44px tracking.
- **Menu items** (Schibsted Grotesk medium, 16px, -0.2px tracking):
  - `Platform`
  - `Features` (with a dropdown chevron icon)
  - `Projects`
  - `Community`
  - `Contact`
- **Right-side buttons:**
  - `Sign Up` — transparent background, 82px width.
  - `Log In` — black background, white text, 101px width.

## Hero Content (moved up 50px)

The hero content block is centered with **34px gaps** between elements (badge → title, title → subtitle), and nudged up 50px.

### Badge

- Dark badge with a star icon + `New` text.
- Light background with text: `Discover what's possible`.
- Font: Inter regular, 14px.
- Rounded corners with a subtle shadow.

### Headline

- Text: `Transform Data Quickly`.
- Font: Fustat bold, 80px, -4.8px tracking, line-height: none.
- Color: black, center-aligned.

### Subtitle

- Text: `Upload your information and get powerful insights right away. Work smarter and achieve goals effortlessly.`
- Font: Fustat medium, 20px, -0.4px tracking.
- Color: `#505050`.
- Max-width: 736px, width: 542px.

## Search Input Box

- Backdrop blur with a dark transparent background (`rgba(0,0,0,0.24)`).
- Dimensions: 728px max-width, 200px height, rounded 18px.

### Top row — credit info

- Left: `60/450 credits` with a green `Upgrade` button.
- Right: AI icon + `Powered by GPT-4o`.
- Font: Schibsted Grotesk medium, 12px, white text.

### Main input area

- White background, rounded 12px, shadow.
- Placeholder: `Type question...` (16px, `rgba(0,0,0,0.6)`).
- Black circular submit button with an up-arrow icon (36px size).

### Bottom row

- Left: three action buttons (gray backgrounds, rounded 6px):
  - `Attach` with a paperclip icon
  - `Voice` with a microphone icon
  - `Prompts` with a search icon
- Right: character counter `0/3,000` (12px, gray).

## Icons (SVG paths from imported file)

- Chevron down arrow
- Up arrow
- Star icon
- AI sparkle icon
- Attach / paperclip icon
- Voice / microphone icon
- Search icon

## Spacing Summary

- **Gap between navigation and hero:** 60px.
- **Gap between header and search box:** 44px.
- **Gap within header elements:** 34px (badge → title, title → subtitle).
- **Hero content moved up:** 50px negative margin.
- **Horizontal padding:** 120px.

## Color Palette

- **Black text:** `#000000`
- **Gray text:** `#505050`
- **Light gray backgrounds:** `#f8f8f8`
- **Green "Upgrade" button:** `rgba(90,225,76,0.89)`
- **Dark badge:** `#0e1311`
- **White:** `#ffffff`
- **Transparent overlay:** `rgba(0,0,0,0.24)`

## Component Structure

- A `VideoBackground` component with the custom fade logic.
- A navigation bar (fixed spacing, horizontal layout).
- A hero content container (centered, max-width constraints).
- Nested components for the badge, header, and search input.

All elements are positioned over the full-screen video background.
