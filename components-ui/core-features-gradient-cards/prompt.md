# Core Features — Gradient Cards Section

## Overview

Build a "Core Features" marketing section as a single, centered component containing a header block and three gradient feature cards. The component is purely static styling — no JavaScript, no animations, and no hover effects.

## Tech Stack

- **Markup/Styling:** Plain HTML with a single inline `<style>` block (no framework, no build step).
- **Font:** Inter (weights 400, 500, 600), loaded from Google Fonts.
- **Notable techniques:** CSS `radial-gradient` / `linear-gradient` card backgrounds, gradient-clipped text via `-webkit-background-clip: text`, a CSS grid layout with responsive breakpoints, inline SVG for the cursor and search icons, and a masked grid "mesh" overlay using CSS masks.

## Global Setup

- **Font loading:** Load the Inter font CSS from Google Fonts:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  ```
- **Global reset:**
  ```css
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  ```
- **Body:** white background `#ffffff`, padding `80px 20px` (80px top/bottom, 20px left/right), `display: flex` with `justify-content: center` and `align-items: center`, font family `'Inter', sans-serif`.

## Layout

### Container (`.c1-container`)

- `max-width: 1100px`, `width: 100%`, `text-align: center`.

### Header Block

- **Badge (`.c1-badge`):** text "Core Features". `display: inline-block`, `font-size: 0.75rem`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 1px`, `margin-bottom: 16px`. Gradient text using `linear-gradient(90deg, #F5C344, #F28482, #B567C2)` with `-webkit-background-clip: text` / `background-clip: text`, `-webkit-text-fill-color: transparent`, and `color: transparent`.
- **Title (`.c1-title`):** text "Built for Speed & Quality". `font-size: 2.75rem`, `font-weight: 500`, `color: #0f172a`, `letter-spacing: -0.02em`, `margin-bottom: 12px`.
- **Subtitle (`.c1-subtitle`):** text "Everything you need to go" + `<br>` + "from idea to image". `font-size: 1.125rem`, `color: #64748b`, `line-height: 1.5`, `margin-bottom: 50px`.

### Grid (`.c1-grid`)

- `display: grid`, `grid-template-columns: repeat(3, 1fr)` (3 equal columns), `gap: 24px`.
- **Breakpoints:**
  - `@media (max-width: 900px)`: `grid-template-columns: repeat(2, 1fr)` (2 columns).
  - `@media (max-width: 600px)`: `grid-template-columns: 1fr` (1 column), and `.c1-title` scales to `font-size: 2.25rem`.

## Cards

### Card Base (`.c1-card`)

- `border-radius: 20px`, `height: 340px`, `display: flex`, `flex-direction: column`, `justify-content: flex-end`, `position: relative`, `overflow: hidden`, `text-align: left`, `background: #F4F8F9`, `box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1)`.
- **Card title (`.c1-card h3`):** `font-size: 1.05rem`, `font-weight: 600`, `color: #1e293b`, `padding: 24px`, `position: relative`, `z-index: 2`.

### Card 1 — Smart Prompt Suggestions (`.c1-card-1`)

- **Background:** `radial-gradient(circle at 50% 0%, #FFB347 0%, #F9ED96 30%, #F4F8F9 60%, #F4F8F9 100%)`.
- **Prompt box (`.c1-prompt-box`):** `position: absolute`, `top: 30px`, `left: 24px`, `right: 24px`, `background: #ffffff`, `border-radius: 12px`, `padding: 16px`, `font-size: 0.8rem`, `color: #475569`, `line-height: 1.6`, `box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04)`. Text content:

  > A bright, high-resolution 3D illustration of a **cheerful cartoon** of a **girl character** **centred against a** smooth blue background

  The bold phrases — "cheerful cartoon", "girl character", and "centred against a" — are each wrapped in a `<span class="c1-blur-text">`.
- **Gradient phrase (`.c1-blur-text`):** `background: linear-gradient(90deg, #FFB347, #E5A1F5)` with `-webkit-background-clip: text` / `background-clip: text`, `-webkit-text-fill-color: transparent`, `color: transparent`, `font-weight: 600`.
- **"Add more details" pill (`.c1-add-details`):** `position: absolute`, `top: 180px`, `left: 40px`, `display: inline-flex`, `align-items: center`, `gap: 6px`, `background: #ffffff`, `border: 1px solid #000000`, `padding: 5px 14px`, `border-radius: 20px`, `font-size: 0.75rem`, `font-weight: 600`, `color: #1e293b`, `box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08)`. Contains a `✦` character in a `<span class="c1-spark">` styled with `color: #a855f7`; `font-size: 1rem`, followed by the text "Add more details".
- **Cursor SVG arrow (`.c1-cursor`):** `position: absolute`, `top: 205px`, `left: 110px`, `width: 24px`, `height: 24px`, `filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))`, `z-index: 10`. SVG uses `viewBox="0 0 24 24"` with a single path:
  ```html
  <svg class="c1-cursor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 2L20 11L11 13L9 22L4 2Z" fill="#0f172a" stroke="#ffffff" stroke-width="1"/>
  </svg>
  ```
- **Heading (`<h3>`):** "Smart Prompt Suggestions".

### Card 2 — API Access (`.c1-card-2`)

- **Background:** `radial-gradient(circle at 50% 0%, #E5A1F5 0%, #F8ACA0 30%, #F4F8F9 60%, #F4F8F9 100%)`.
- **Visual wrapper (`.c1-api-visual`):** `position: absolute`, `top: 0`, `left: 0`, `right: 0`, `bottom: 70px`, `display: flex`, `justify-content: center`, `align-items: center`, `padding: 0 24px`.
- **Network image (`.c1-network-img`):** `width: 100%`, `height: 180px`, `object-fit: contain`, `margin-top: 20px`. Source: `assets/network.svg`.
- **Heading (`<h3>`):** "API Access".

### Card 3 — Project Library (`.c1-card-3`)

- **Background:** `radial-gradient(circle at 50% 0%, #F9ED96 0%, #E5A1F5 30%, #F4F8F9 60%, #F4F8F9 100%)`.
- **Mesh overlay (`.c1-mesh`):** `position: absolute`, `inset: 0`, with a background image of two `linear-gradient`s of `rgba(255, 255, 255, 0.8) 1px, transparent 1px` (one horizontal, one `90deg` vertical), `background-size: 16px 16px`, masked with `radial-gradient(circle at center top, black 0%, transparent 80%)` (include both `-webkit-mask-image` and `mask-image`):
  ```css
  .c1-mesh {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.8) 1px, transparent 1px);
    background-size: 16px 16px;
    -webkit-mask-image: radial-gradient(circle at center top, black 0%, transparent 80%);
    mask-image: radial-gradient(circle at center top, black 0%, transparent 80%);
  }
  ```
- **Folder image (`.c1-folder`):** `position: absolute`, `top: 50px`, horizontally centered via `left: 50%` + `transform: translateX(-50%)`, `width: 170px`, `filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.08))`. Source: `assets/library%20icon.svg`.
- **Search pill (`.c1-search`):** `position: absolute`, `top: 220px`, centered via `left: 50%` + `transform: translateX(-50%)`, `display: inline-flex`, `align-items: center`, `gap: 8px`, `background: #ffffff`, `border: 1px solid #000000`, `padding: 6px 18px`, `border-radius: 20px`, `font-size: 0.75rem`, `font-weight: 500`, `color: #1e293b`, `box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06)`, `white-space: nowrap`. Contains a 14×14 Lucide-style search SVG followed by the text "Search in library":
  ```html
  <div class="c1-search">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="11" cy="11" r="8" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Search in library
  </div>
  ```
- **Heading (`<h3>`):** "Project Library".

## Animations

None. This component is purely static styling — no JavaScript behavior and no hover effects. (No data persistence is required for this section.)

## Color Palette

- **Page / surfaces:** white `#ffffff`; card base `#F4F8F9`.
- **Text:** title `#0f172a`; card titles / pills `#1e293b`; subtitle `#64748b`; prompt body `#475569`.
- **Badge gradient:** `#F5C344` → `#F28482` → `#B567C2`.
- **Gradient phrase (`.c1-blur-text`):** `#FFB347` → `#E5A1F5`.
- **Card gradient stops:** `#FFB347`, `#F9ED96`, `#E5A1F5`, `#F8ACA0` (over the `#F4F8F9` base).
- **Accents:** spark `✦` `#a855f7`; search icon stroke `#64748b`; pill borders `#000000`.

## File Structure

- `index.html` — the full markup with the inline `<style>` block.
- `assets/network.svg` — API network diagram used by Card 2.
- `assets/library icon.svg` — folder icon used by Card 3 (referenced URL-encoded as `assets/library%20icon.svg`).

> Note on asset URLs: the assets are vendored locally under `assets/`. An earlier version of this brief referenced them from external R2 storage (`https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/network.svg` and `https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/library%20icon.svg`); rebuild against the local `assets/` paths to match the current source.
