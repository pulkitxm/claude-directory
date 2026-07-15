# VaultShield — Cinematic Password-Manager Hero Section

## Overview

Build a fullscreen hero section for a password-manager app called **VaultShield**. The page fills the viewport with a looping background video, overlays a centered navbar with desktop nav links plus a mobile slide-in sheet, and presents an animated hero block (heading with inline icons, subtext, and a CTA button). Everything fades up on load with staggered Framer Motion transitions.

## Tech Stack

- **Framework:** React with TypeScript
- **Styling:** Tailwind CSS plus inline `style` objects for fine-grained values
- **Animation:** Framer Motion
- **Icons:** Lucide React — icons used: `ArrowRightCircle`, `Zap`, `LockKeyhole`, `Fingerprint`, `Menu`, `X`
- **Fonts:** Helvetica Now Display Bold (headings) and Inter (body, weights 300–900)
- **Notable techniques:** fullscreen `object-cover` background video, `AnimatePresence` enter/exit transitions, staggered fade-up reveal via Framer Motion variants

## Global Setup

### Fonts

- **Heading font:** `Helvetica Now Display Bold`, loaded from `https://db.onlinewebfonts.com/c/04e6981992c0e2e7642af2074ebe3901?family=Helvetica+Now+Display+Bold` (added as a `<link>` in `index.html`).

- **Body font:** `Inter` (weights 300–900), imported at the top of the CSS via Google Fonts:

  ```css
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  ```

### CSS variables and base styles (`src/index.css`)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-heading: 'Helvetica Now Display Bold', sans-serif;
  --font-body: 'Inter', sans-serif;
  --color-text: #192837;
  --color-accent: #7342E2;
  --color-login-bg: #F2F2EE;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
}
```

## Color Palette

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-text` | `#192837` | Primary dark text, logo fill, icons |
| `--color-accent` | `#7342E2` | Accent purple (CTA + "Start For Free" buttons) |
| `--color-login-bg` | `#F2F2EE` | Light "Sign In" button background |
| (sheet) | `#CFC8C5` | Mobile menu sheet background |
| (button) | `#ffffff` | CTA button text / "Start For Free" text |

## Background Video

Full-screen background video covering the entire viewport, rendered as the first child of the root container with `absolute inset-0 h-full w-full object-cover`:

- **Source:** `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4`

- **Attributes:** `autoPlay`, `muted`, `loop`, `playsInline`.

## Layout Structure

Defined in `src/App.tsx`:

1. **Container:** `relative w-full min-h-screen overflow-hidden`, with inline style `fontFamily: 'var(--font-body)'` and `color: 'var(--color-text)'`.
2. **Background video** (see above).
3. **Navbar** (`<Navbar />`).
4. **Hero** (`<Hero />`).

```tsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4';

export default function App() {
  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text)' }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
      />
      <Navbar />
      <Hero />
    </div>
  );
}
```

- **Navbar** is wrapped in a `<header>`: `relative z-10 mx-auto w-full max-w-[1280px] px-5 py-4 sm:px-8 sm:py-5`, with an inner `flex items-center justify-between`.
- **Hero content** uses a `<main>`: `relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8`, with an inner block styled `paddingTop: 'clamp(40px, 8vw, 72px)'` and `maxWidth: 560`.

## Logo (SVG)

Custom 32×32 SVG logo with a geometric angular shape, fill `#192837` (`src/components/Logo.tsx`). Accepts an optional `size` prop defaulting to `32`.

```tsx
export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      overflow="visible"
      viewBox="0 0 256 256"
    >
      <path
        d="M 64 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 L 128 64 L 128 64.5 L 161 32 L 192 0 L 256 0 L 256 64 L 192 128 L 128 128 L 128 192 L 96 223 L 63.5 256 L 0 256 L 0 192 Z M 256 192 L 224 223 L 191.5 256 L 128 256 L 128 192 L 192 128 L 256 128 Z"
        fill="#192837"
      />
    </svg>
  );
}
```

## Navbar (`src/components/Navbar.tsx`)

Nav links are defined as `const NAV_LINKS = ['Vault', 'Plans', 'Install', 'News', 'Help'];`. The component holds a `menuOpen` boolean state for the mobile sheet.

- **Left:** the logo, wrapped in `<a href="#" className="flex items-center">`.
- **Center (desktop only, `hidden items-center gap-8 md:flex`):** the 5 links from `NAV_LINKS` — each an `<a href="#">` with `text-sm font-medium transition-opacity` and an opacity hover effect and inline `color: '#192837'`.
- **Right (desktop only, `hidden items-center gap-3 md:flex`):**
  - **"Start For Free"** button — `rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity` with an opacity hover effect, inline `background: '#7342E2'`.
  - **"Sign In"** button — `rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity` with an opacity hover effect, inline `background: '#F2F2EE'`, `color: '#192837'`.
- **Mobile:** a hamburger button (`md:hidden`) — `rounded-full p-2 transition-opacity` with an opacity hover effect, `onClick` sets `menuOpen` true. Renders the Lucide `Menu` icon at `color="#192837"`.
- `<MobileMenu open={menuOpen} links={NAV_LINKS} onClose={() => setMenuOpen(false)} />` is rendered at the end of the header.

## Mobile Menu Sheet (`src/components/MobileMenu.tsx`)

A right-side slide-in sheet built with `AnimatePresence` + Framer Motion.

- **Props:** `{ open: boolean; links: string[]; onClose: () => void }`.
- **Easing constant:** `const EASE = [0.22, 1, 0.36, 1] as const;`

### Backdrop

- `fixed inset-0 z-40`, inline `background: 'rgba(25,40,55,0.35)'`, `backdropFilter: 'blur(4px)'` (and `WebkitBackdropFilter: 'blur(4px)'`).
- Animation: `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`, `exit={{ opacity: 0 }}`, `transition={{ duration: 0.3 }}`.
- `onClick={onClose}`.

### Sheet

- `<motion.aside>`: `fixed right-0 top-0 z-50 flex flex-col`, inline `width: 'min(88vw, 360px)'`, `height: '100dvh'`, `background: '#CFC8C5'`, `boxShadow: '-12px 0 48px rgba(25,40,55,0.18)'`.
- Animation: `initial={{ x: '100%' }}`, `animate={{ x: 0 }}`, `exit={{ x: '100%' }}`, `transition={{ duration: 0.45, ease: EASE }}`.

### Sheet content

- **Header:** `flex items-center justify-between px-6 py-5` containing the `<Logo />` and a close button (`rounded-full p-2 transition-opacity` with an opacity hover effect, `onClick={onClose}`) rendering the Lucide `X` icon at `color="#192837"`.
- **Divider:** a `div` with `height: 1`, `background: 'rgba(25,40,55,0.15)'`.
- **Nav links:** `<nav className="flex flex-1 flex-col gap-1 px-6 pt-6">` mapping `links` to `<motion.a href="#">` items — `py-3 text-2xl font-medium transition-opacity` with an opacity hover effect, inline `color: '#192837'`. Staggered entrance: `initial={{ opacity: 0, x: 24 }}`, `animate={{ opacity: 1, x: 0 }}`, `transition={{ delay: 0.18 + i * 0.07, duration: 0.45, ease: EASE }}`.
- **Bottom CTAs:** a `<motion.div className="flex flex-col gap-3 px-6 pb-8">` entering with `initial={{ opacity: 0, y: 16 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ delay: 0.18 + links.length * 0.07, duration: 0.45, ease: EASE }}`. Contains:
  - **"Start For Free"** — `rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity` with an opacity hover effect, inline `background: '#7342E2'`.
  - **"Sign In"** — `rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity` with an opacity hover effect, inline `background: '#F2F2EE'`, `color: '#192837'`.

## Hero (`src/components/Hero.tsx`)

### Fade-up variant

Applied to the heading (custom `0`), subtext wrapper (custom `1`), and CTA button (custom `2`), each with `initial="hidden"` / `animate="visible"`:

```tsx
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: EASE },
  }),
};
```

This yields delays of 0 (heading), 0.15s (subtext), and 0.30s (CTA).

### Inline icon style

```tsx
const inlineIconStyle: CSSProperties = {
  display: 'inline',
  verticalAlign: 'middle',
  position: 'relative',
  top: -2,
};
```

### Hero heading (`<motion.h1>`)

- Inline style: `fontFamily: 'var(--font-heading)'`, `fontSize: 'clamp(1.65rem, 5vw, 3rem)'`, `lineHeight: 1.05`, `letterSpacing: '-0.01em'`, `color: '#192837'`, `marginBottom: 24`.
- Text: **"Lock Down Your Passwords with Ironclad Security"** with inline Lucide icons (each `size={24}`, `color="#192837"`, `style={inlineIconStyle}`):
  - `Zap` icon **before** "Lock Down".
  - `LockKeyhole` icon **between** "Passwords" and "with".
  - `Fingerprint` icon **after** "Security".

### Hero subtext

Wrapped in a `<motion.div>` (custom `1`) so the fade runs on the wrapper and the paragraph keeps its `0.8` resting opacity. The inner `<p>` is styled:

- `fontFamily: 'var(--font-body)'`, `fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)'`, `lineHeight: 1.65`, `opacity: 0.8`, `maxWidth: 560`.
- Text: **"Zero stress, total control. VaultShield keeps you covered with unbreakable storage, one-tap access, and pro-grade tools for your non-stop world."**

### CTA button (`<motion.button type="button">`)

- Class: `mt-8 inline-flex items-center justify-between font-semibold`.
- Inline style: `background: '#7342E2'`, `color: '#ffffff'`, `borderRadius: 50`, `padding: '17px 24px'`, `fontFamily: 'var(--font-body)'`, `fontSize: 'clamp(0.9rem, 2vw, 1rem)'`, `boxShadow: '0 4px 24px rgba(115,66,226,0.28)'`, `minWidth: 210`, `gap: 32`.
- Interactions: `whileHover={{ scale: 1.04, filter: 'brightness(1.1)' }}`, `whileTap={{ scale: 0.96 }}`.
- Text: **"Get It Free"** followed by the Lucide `ArrowRightCircle` icon (`size={20}`) on the right.

## File Structure

```
vaultshield-hero/
├── index.html
├── package.json
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    └── components/
        ├── Hero.tsx
        ├── Logo.tsx
        ├── MobileMenu.tsx
        └── Navbar.tsx
```

## Dependencies

- `react`, `react-dom`
- `framer-motion`
- `lucide-react` — icons: `ArrowRightCircle`, `Zap`, `LockKeyhole`, `Fingerprint`, `Menu`, `X`
- Tailwind CSS
