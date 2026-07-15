# Ironclad — Password Manager Landing Hero

## Overview

Build a single-screen landing page hero section for a password manager called Ironclad. The page features a full-viewport looping background video, a responsive navbar with a slide-in mobile menu, and a centered hero block (heading with inline icons, subtext, and a pill CTA) whose elements fade up in sequence on load.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`) with `StrictMode`.
- **Build tooling:** Vite (`^5.4.11`) + TypeScript (`^5.6.3`), `@vitejs/plugin-react` (`^4.3.4`).
- **Styling:** Tailwind CSS 3 (`^3.4.17`) with the default config and no custom theme extensions, plus inline `style` objects for precise values. PostCSS (`^8.4.49`) + Autoprefixer (`^10.4.20`).
- **Animation:** Framer Motion (`framer-motion` `^11.18.2`) — variants, `AnimatePresence`, and gesture props (`whileHover`, `whileTap`).
- **Icons:** Lucide (`lucide-react` `^0.468.0`) — `ArrowRightCircle`, `Zap`, `LockKeyhole`, `Fingerprint`, `Menu`, `X`.
- **Fonts:** Helvetica Now Display Bold (headings, vendored locally via `@font-face`) and Inter weights 300–900 (body, via Google Fonts).
- **Notable techniques:** full-viewport `object-cover` background video, sequential fade-up reveal via a shared variant with a `custom` index, right-side slide-in mobile sheet with staggered links, inline SVG logo.

## Global Setup

### Fonts

- **Heading font:** "Helvetica Now Display Bold", loaded from a local stylesheet linked in `index.html`:
  ```html
  <link href="/fonts/helvetica-now-display-bold.css" rel="stylesheet">
  ```
  That stylesheet declares the `@font-face` against locally vendored font files (this set originated from OnlineWebFonts, family hash `04e6981992c0e2e7642af2074ebe3901`):
  ```css
  @font-face {
    font-family: "Helvetica Now Display Bold";
    src: url("/fonts/04e6981992c0e2e7642af2074ebe3901.eot");
    src: url("/fonts/04e6981992c0e2e7642af2074ebe3901.eot?#iefix") format("embedded-opentype"),
        url("/fonts/04e6981992c0e2e7642af2074ebe3901.woff") format("woff"),
        url("/fonts/04e6981992c0e2e7642af2074ebe3901.woff2") format("woff2"),
        url("/fonts/04e6981992c0e2e7642af2074ebe3901.ttf") format("truetype"),
        url("/fonts/04e6981992c0e2e7642af2074ebe3901.svg#Helvetica Now Display Bold") format("svg");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  ```

  > Note: the original brief loaded this font remotely via `https://db.onlinewebfonts.com/c/04e6981992c0e2e7642af2074ebe3901?family=Helvetica+Now+Display+Bold`. The asset has since been vendored locally; the values above reflect the current source.

- **Body font:** Inter (weights 300–900), imported at the top of `index.css`:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  ```

### `index.html`

- `lang="en"`, `charset="UTF-8"`, viewport meta `width=device-width, initial-scale=1.0`.
- `<title>`: `Ironclad — Lock Down Your Passwords`.
- Links the heading-font stylesheet (above), renders `<div id="root"></div>`, and loads `/src/main.tsx` as a module script.

### `index.css`

- Imports Inter (above), then `@tailwind base; @tailwind components; @tailwind utilities;`.
- CSS variables defined in `:root`:
  ```css
  :root {
    --font-heading: 'Helvetica Now Display Bold', sans-serif;
    --font-body: 'Inter', sans-serif;
    --color-text: #192837;
    --color-accent: #7342E2;
    --color-login-bg: #F2F2EE;
  }
  ```
- Global reset: `* { box-sizing: border-box; }`. The `body` uses `margin: 0; padding: 0; font-family: var(--font-body); color: var(--color-text);`.

## Layout (`App`)

- Root wrapper: `relative min-h-screen w-full overflow-hidden`.
- Children, in order: background `<video>`, `<Navbar />`, `<Hero />`.

### Background video

- Full-viewport looping background video, absolutely positioned, covering the entire page.
- Classes: `absolute inset-0 z-0 w-full h-full object-cover`.
- Attributes: `autoPlay`, `muted`, `loop`, `playsInline`.
- `src` is a local asset path:
  ```
  /assets/hf_20260606_131516_eca35265-ea66-4fbd-8d52-22aae6e1a503.mp4
  ```

  > Note: the original brief sourced this video from `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260606_131516_eca35265-ea66-4fbd-8d52-22aae6e1a503.mp4`. It has since been vendored into `/public/assets/`; the local path above is what the source uses.

## Logo (inline SVG component)

A custom geometric SVG logo, `32` × `32`, `viewBox="0 0 256 256"`, `fill="#192837"`, with `role="img"` and `aria-label="Ironclad logo"`. Single path:

```
M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z
```

## Navbar

A shared nav-links constant drives both the navbar and the mobile menu:

```ts
export const NAV_LINKS = ['Vault', 'Plans', 'Install', 'News', 'Help'] as const
```

- Header element: `relative z-10 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5`, with inline style `maxWidth: 1280` and `margin: '0 auto'` (max-width `1280px`, centered).
- **Left:** anchor (`href="#"`, `aria-label="Ironclad home"`, `flex items-center`) wrapping the `Logo` component.
- **Center (desktop, hidden on mobile via `hidden md:flex`):** the 5 nav links — "Vault", "Plans", "Install", "News", "Help" — in a `nav` with `items-center gap-8`. Each link: `text-sm font-medium transition-opacity hover:opacity-70`, color `var(--color-text)`.
- **Right (desktop, hidden on mobile via `hidden md:flex`):** two pill buttons in a row with `items-center gap-3`:
  - **"Start For Free":** `text-sm font-semibold px-5 py-2.5 rounded-full text-white transition-all hover:shadow-lg active:scale-95`, inline `backgroundColor: '#7342E2'`.
  - **"Sign In":** `text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-lg active:scale-95`, inline `backgroundColor: '#F2F2EE'`, `color: 'var(--color-text)'`.
- **Mobile (`md:hidden`):** a hamburger button — `md:hidden flex items-center justify-center`, inline styles `color: var(--color-text)`, `background: none`, `border: none`, `padding: 0`, `cursor: pointer`. It uses local state `menuOpen` (`useState(false)`), toggled on click. Shows the Lucide `Menu` icon (size `24`) when closed and the `X` icon (size `24`) when open. `aria-label` is `'Close menu'` / `'Open menu'`; `aria-expanded={menuOpen}`.
- The `MobileMenu` is rendered after the header with `open={menuOpen}` and `onClose={() => setMenuOpen(false)}`.

## Mobile Menu (slide-in sheet)

Wrapped in Framer Motion `AnimatePresence`; renders two layers only when `open` is true.

1. **Backdrop:** `motion.div`, `fixed inset-0 z-40`. Inline style `background: 'rgba(25,40,55,0.35)'`, `backdropFilter: 'blur(4px)'`, `WebkitBackdropFilter: 'blur(4px)'`. Animates `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}` → `exit={{ opacity: 0 }}` with `transition={{ duration: 0.3 }}`. Clicking it calls `onClose`.

2. **Sheet:** `motion.aside`, `fixed top-0 right-0 z-50 flex flex-col`. Inline style `width: 'min(88vw, 360px)'`, `height: '100dvh'`, `background: '#CFC8C5'`, `boxShadow: '-12px 0 48px rgba(25,40,55,0.18)'`. Slides in: `initial={{ x: '100%' }}`, `animate={{ x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}`, `exit={{ x: '100%', transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] } }}`.

   Contents (top to bottom):
   - **Header:** `flex items-center justify-between px-6 py-5` containing the `Logo` and a circular close button. The close button is a `motion.button` with `whileTap={{ scale: 0.9 }}`, classes `flex items-center justify-center rounded-full`, inline style `width: 40`, `height: 40`, `background: 'rgba(25,40,55,0.1)'`, `border: none`, `cursor: pointer`, `color: var(--color-text)`. It holds the `X` icon (size `20`), `aria-label="Close menu"`, and calls `onClose`.
   - **Divider:** a `div` with inline style `height: 1`, `background: 'rgba(25,40,55,0.12)'`, `margin: '0 24px'`.
   - **Nav links:** a `nav` with `flex flex-col gap-1 px-4 py-6`. Each link is a `motion.a` (`href="#"`), classes `rounded-xl px-4 py-3 font-medium transition-colors hover:bg-black/10`, inline style `fontSize: '1.1rem'`, `color: var(--color-text)`. Each staggers in from the right: `initial={{ opacity: 0, x: 24 }}`, `animate={{ opacity: 1, x: 0 }}`, `transition={{ delay: 0.18 + i * 0.07, duration: 0.4 }}`. Clicking calls `onClose`.
   - **CTA buttons:** a `div` with `mt-auto flex flex-col gap-3 px-6 pb-8` containing the same two buttons as desktop, full-width:
     - **"Start For Free":** `w-full py-3.5 rounded-full font-semibold text-white`, inline `backgroundColor: '#7342E2'`, `fontSize: '0.95rem'`, `border: none`, `cursor: pointer`.
     - **"Sign In":** `w-full py-3.5 rounded-full font-semibold`, inline `backgroundColor: '#F2F2EE'`, `color: var(--color-text)`, `fontSize: '0.95rem'`, `border: none`, `cursor: pointer`.

## Hero Content

- Outer `section`: `relative z-10 mx-auto`, inline style `maxWidth: 1280`, `paddingTop: 'clamp(40px, 8vw, 72px)'`, `paddingBottom: 48`.
- Inner content wrapper: `mx-auto flex flex-col items-center px-5`, inline style `maxWidth: 660`.

### Heading (`<motion.h1>`)

- Animation props: `variants={fadeUp}`, `initial="hidden"`, `animate="visible"`, `custom={0}`.
- Inline style: `fontFamily: 'var(--font-heading)'`, `fontSize: 'clamp(1.65rem, 5vw, 3rem)'`, `lineHeight: 1.05`, `letterSpacing: '-0.01em'`, `color: 'var(--color-text)'`, `textAlign: 'center'`, `margin: 0`.
- Two lines (line 1 wrapped in a `span` with `whiteSpace: 'nowrap'`, followed by `<br />`):
  - **Line 1:** `Lock` [`Zap` icon, size `24`] `Down Your` [`LockKeyhole` icon, size `24`] `Passwords`
  - **Line 2:** `with Ironclad Security` [`Fingerprint` icon, size `24`]
- All inline icons share an `inlineIcon` style object: `color: '#192837'`, `display: 'inline'`, `verticalAlign: 'middle'`, `position: 'relative'`, `top: -2`, `margin: '0 4px'`. The `Fingerprint` icon overrides margin: `{ ...inlineIcon, margin: 0, marginLeft: 6 }`.

### Subtext (`<motion.p>`)

- Animation props: `variants={fadeUp}`, `initial="hidden"`, `animate="visible"`, `custom={1}`.
- Inline style: `fontFamily: 'var(--font-body)'`, `fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'`, `color: 'var(--color-text)'`, `maxWidth: 560`, `lineHeight: 1.65`, `textAlign: 'center'`, `margin: '20px auto 0'`.
- The copy is wrapped in an inner `<span style={{ opacity: 0.8 }}>` so the resting opacity stays at `0.8` (the fade-up animation drives the `<p>` opacity to `1`):
  > "Zero stress, total control. Unbreakable storage, one-tap access, and pro-grade tools for your non-stop world."

### CTA button (`<motion.button>`)

- `type="button"`. Animation props: `variants={fadeUp}`, `initial="hidden"`, `animate="visible"`, `custom={2}`. Gestures: `whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}`, `whileTap={{ scale: 0.96 }}`.
- Classes: `flex items-center justify-between text-white font-semibold`.
- Inline style: `borderRadius: 50`, `backgroundColor: '#7342E2'`, `fontSize: 'clamp(0.9rem, 2vw, 1rem)'`, `padding: '17px 24px'`, `minWidth: 210`, `boxShadow: '0 4px 24px rgba(115,66,226,0.28)'`, `gap: 32`, `border: 'none'`, `cursor: 'pointer'`, `marginTop: 32`.
- Label: "Get It Free" followed by an `ArrowRightCircle` icon (size `20`) on the right.

## Animation System (Framer Motion variants)

All three hero elements share a single `fadeUp` variant, driven by their `custom` index `i` (heading `0`, subtext `1`, CTA `2`):

```ts
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}
```

## Color Palette

- **Text / ink:** `#192837` (`--color-text`).
- **Accent (primary CTA):** `#7342E2` (`--color-accent`).
- **Secondary button / login background:** `#F2F2EE` (`--color-login-bg`).
- **Mobile sheet background:** `#CFC8C5`.
- **Backdrop overlay:** `rgba(25,40,55,0.35)`.
- **Sheet shadow:** `rgba(25,40,55,0.18)`; **divider:** `rgba(25,40,55,0.12)`; **close-button background:** `rgba(25,40,55,0.1)`.
- **CTA shadow:** `rgba(115,66,226,0.28)`.

## File Structure

```
ironclad-password-hero/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── public/
│   ├── assets/
│   │   └── hf_20260606_131516_eca35265-ea66-4fbd-8d52-22aae6e1a503.mp4
│   └── fonts/
│       ├── helvetica-now-display-bold.css
│       └── 04e6981992c0e2e7642af2074ebe3901.{eot,woff,woff2,ttf,svg}
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── components/
        ├── Navbar.tsx
        ├── MobileMenu.tsx
        ├── Hero.tsx
        └── Logo.tsx
```

- `src/main.tsx` mounts `<App />` inside `<StrictMode>` via `createRoot(document.getElementById('root')!)`, importing `./index.css`.

## Dependencies

- `react`, `react-dom` (`^18.3.1`)
- `framer-motion` (`^11.18.2`)
- `lucide-react` (`^0.468.0`) — icons used: `ArrowRightCircle`, `Zap`, `LockKeyhole`, `Fingerprint`, `Menu`, `X`
- Tailwind CSS 3 (`^3.4.17`) with the default config and no custom theme extensions
- Vite (`^5.4.11`) + TypeScript (`^5.6.3`), `@vitejs/plugin-react` (`^4.3.4`), PostCSS (`^8.4.49`), Autoprefixer (`^10.4.20`)
- `@types/react` (`^18.3.12`), `@types/react-dom` (`^18.3.1`)
- `playwright` (`^1.60.0`) as a dev dependency
