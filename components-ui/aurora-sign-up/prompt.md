# Aurora Sign Up — Two-Column Registration Interface

## Overview

Build a modern, two-column registration interface called "Aurora Sign Up". The left column is a cinematic hero panel layered over a looping background video with a three-step progress list; the right column holds the sign-up form with social buttons, an "Or" divider, and the registration fields. The entire app lives in `App.tsx` and `index.css`.

## Tech Stack

- **Framework:** React 18 (`react` `^18.3.1`, `react-dom` `^18.3.1`)
- **Build tool:** Vite (`vite` `^6.0.0`, `@vitejs/plugin-react` `^4.3.4`)
- **Language:** TypeScript (`typescript` `^5.7.2`)
- **Styling:** Tailwind CSS v4 (`tailwindcss` `^4.1.0`, `@tailwindcss/vite` `^4.1.0`)
- **Animations:** Motion / Framer Motion (`motion` `^12.0.0`), imported from `motion/react`
- **Icons:** Lucide (`lucide-react` `^0.525.0`)
- **Font:** Inter (Google Fonts, weights 300, 400, 500, 600, 700)
- **Notable techniques:** Staggered reveal via Motion `Variants`, autoplaying muted background video, controlled password-visibility toggle.

## Global Setup & CSS (`index.css`)

- Import the Inter font from Google Fonts (weights 300, 400, 500, 600, 700):

  ```css
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
  @import "tailwindcss";
  ```

- Extend the Tailwind theme with a custom font stack and a custom brand color using the `@theme` block:

  ```css
  @theme {
    --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
    --color-brand-gray: #1A1A1A;
  }
  ```

- Apply base styles to the `body`:

  ```css
  @layer base {
    body {
      @apply font-sans bg-black text-white antialiased;
    }
  }
  ```

## Main Layout (`App.tsx` container)

- The `<main>` element uses: `flex min-h-screen w-full bg-black selection:bg-white/30 p-2 transition-all duration-500`.
- On `lg` breakpoints add: `lg:h-screen lg:overflow-hidden lg:p-4`.
- Split this container into a left column (hero) and a right column (form), each rendered as a `<section>`.
- The component is the default export: `export default function App()`.

## Left Column — Hero & Background Video

- Width on large screens is exactly `w-[52%]`. The column is hidden on mobile/tablet and only visible at `lg` (`hidden lg:flex`).
- Full class list: `hidden lg:flex relative w-[52%] flex-col items-center justify-end pb-32 px-12 rounded-3xl overflow-hidden shadow-2xl h-full`.

### Background Video

- Add an absolutely positioned `<video>` tag with classes `absolute inset-0 w-full h-full object-cover`.
- It must have `autoPlay`, `muted`, `loop`, and `playsInline` (plus `aria-hidden="true"`).
- The `<source>` references a locally vendored asset and uses `type="video/mp4"`:

  ```tsx
  const VIDEO_SRC =
    "/assets/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4";
  ```

  The file lives at `public/assets/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4`.

  > Note: An earlier version of this brief specified a remote CloudFront URL (`https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4`). The asset has since been vendored locally; the source of truth is the local `/assets/...` path above (the file basename matches the original CloudFront object).

- **Critical:** Do not add any dark overlay, gradient, or tint mask over the video. Let it play purely without overlays.

### Hero Content Container

- Place content over the video inside a `motion.div` with classes `z-10 w-full max-w-xs space-y-8`.
- **Animations:** Use `motion.div` for a staggered reveal. The container transitions `opacity: 0` to `1` with `staggerChildren: 0.15` and `delayChildren: 0.2`. Every child element inside fades in and slides up (`y: 10` to `y: 0`, duration `0.5`). Define these as Motion `Variants`:

  ```tsx
  import { motion, type Variants } from "motion/react";

  const heroContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const heroItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  ```

  The container uses `variants={heroContainer}` with `initial="hidden"` and `animate="show"`; each child is wrapped in a `motion.div` with `variants={heroItem}`.

### Brand / Logo

- A flex row (`flex items-center justify-center gap-2`) with the `Circle` icon from Lucide (`fill-white text-white`, sized `h-5 w-5`) and the text "Aurora" (`text-xl font-semibold tracking-tight`).

### Heading Block

- Centered block (`space-y-3 text-center`):
  - Heading "Join Aurora" (`text-4xl font-medium tracking-tight whitespace-nowrap`).
  - Description "Follow these 3 quick phases to activate your space." (`text-white/60 text-sm leading-relaxed px-4`).

### Steps

- A `space-y-3` container that renders a custom `<StepItem>` component three times, each wrapped in a `motion.div` with `variants={heroItem}`:
  1. "Register your identity" (active state — passes the `active` prop)
  2. "Configure your studio"
  3. "Finalize your profile"

## Right Column — Sign Up Form

- A `<section>` with `flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden`.
- **Animation:** Wrap the interior content in a `motion.div` that fades in (`opacity: 0` to `1`, `duration: 0.8`, `ease: "easeOut"`). Inner width `w-full max-w-xl`, spacing `space-y-8 lg:space-y-6 sm:space-y-10`.

  ```tsx
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
  >
  ```

### Header

- A `header` (`space-y-2`):
  - Title "Create New Profile" (`text-3xl font-medium tracking-tight`).
  - Subtitle "Input your basic details to begin the journey." (`text-white/40 text-sm`).

### Social Buttons

- A 2-column grid (`grid grid-cols-2 gap-4`).
- Render Google (`Chrome` icon) and Github (`Github` icon) using the `<SocialButton>` component, with labels "Google" and "Github" respectively.

### Divider

- A relative container with a horizontal line (`w-full border-t border-white/10`) and the text "Or" centered on top:

  ```tsx
  <span className="bg-black px-4 text-xs font-medium text-white/40 uppercase tracking-widest">
    Or
  </span>
  ```

### Form Layout

The `<form>` uses `space-y-5` and calls `event.preventDefault()` on submit.

- **First Name** and **Last Name** in a 2-column grid (`grid grid-cols-2 gap-4`), rendered via `<InputGroup>` with placeholders "Ava" and "Reyes" (both `type="text"`).
- **Email** (full width) via `<InputGroup label="Email" placeholder="ava@studio.com" type="email" />`.
- **Password** (full width) rendered as a bespoke block rather than via `<InputGroup>` because of the toggle:
  - A `<label htmlFor="password">` "Password" (`text-sm font-medium text-white`).
  - A relative wrapper holding the `<input>` with `id="password"`, `name="password"`, `type={showPassword ? "text" : "password"}`, `placeholder="••••••••"`, `minLength={8}`, `autoComplete="new-password"`, classes `w-full bg-brand-gray border-none rounded-xl h-11 px-4 pr-12 text-sm text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-white/20 transition-shadow duration-200`.
  - A custom Lucide toggle button absolutely positioned at the right of the input (`absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors duration-200`) that swaps between the `Eye` and `EyeOff` icons (`h-4 w-4`) and toggles `showPassword`. The `aria-label` reads "Hide password" / "Show password".
  - A tiny helper text "Requires at least 8 symbols." (`text-xs text-white/30`).
- **Submit Button:** "Create Account" — `w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] mt-4 text-sm transition-all duration-200`.

### Footer Link

- Centered text (`text-center text-sm text-white/40`): "Member of the team?" followed by a "Log in" link (`href="#"`, classes `font-medium text-white underline-offset-4 hover:underline`).

### Password state

The password visibility is controlled with React state:

```tsx
import { useState } from "react";

const [showPassword, setShowPassword] = useState(false);
// toggle: setShowPassword((visible) => !visible)
```

## Reusable Components

Create these exact functional components at the bottom of the file.

### `<StepItem>`

Takes `number`, `text`, and an optional `active` boolean (default `false`).

- Wrapper: `flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium transition-colors duration-300`, then state-dependent:
  - **Active:** `bg-white text-black border border-white`. The number circle is `bg-black text-white`.
  - **Inactive:** `bg-brand-gray text-white border-none`. The number circle is `bg-white/10 text-white/40`.
- The number circle: `flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold` plus the state classes above.

### `<SocialButton>`

Takes `icon` (a `LucideIcon`) and `label`.

- Button: `flex h-12 items-center justify-center gap-2.5 bg-black border border-white/10 rounded-xl hover:bg-white/5 text-sm font-medium text-white transition-colors duration-200`.
- Renders the icon at `h-4 w-4` followed by the label.

### `<InputGroup>`

Takes `label`, `placeholder`, and `type`.

- Derives an `id` from the label: `label.toLowerCase().replace(/\s+/g, "-")` (used for both `id` and `name`, and the label's `htmlFor`).
- The label is `text-sm font-medium text-white`.
- The input is `w-full bg-brand-gray border-none rounded-xl h-11 px-4 text-sm text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-white/20 transition-shadow duration-200`.

## Imports

```tsx
import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { Chrome, Circle, Eye, EyeOff, Github, type LucideIcon } from "lucide-react";
```

## Color Palette

- Background: `bg-black` (black)
- Text: `text-white`, with muted variants `text-white/60`, `text-white/40`, `text-white/30`, `text-white/20`, `text-white/10`
- Brand gray surface: `--color-brand-gray: #1A1A1A` (used as `bg-brand-gray`)
- Selection highlight: `selection:bg-white/30`
- Focus ring: `focus:ring-white/20`

## File Structure

- `index.html` — entry document. `lang="en"`, `<title>Aurora Sign Up</title>`, meta description "Aurora Sign Up — register your identity, configure your studio, finalize your profile.", a `<div id="root"></div>`, and `<script type="module" src="/src/main.tsx"></script>`.
- `src/main.tsx` — mounts `<App />` inside `<StrictMode>` via `createRoot(document.getElementById("root")!)`, imports `./index.css`.
- `src/App.tsx` — the entire app: `App` default export plus the `StepItem`, `SocialButton`, and `InputGroup` components.
- `src/index.css` — font import, Tailwind import, `@theme`, and base body styles.
- `public/assets/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4` — the locally vendored hero background video.
