# Bloom — Liquid Glass Hero

## Overview

Build a full-screen hero landing page for **Bloom**, an AI-powered plant/floral design platform. The design layers a liquid glass-morphism UI over a looping, muted video background, using a strict grayscale palette and a two-panel split layout (a glass content slab on the left, floating glass widgets on the right).

## Tech Stack

- **Framework:** React with TypeScript.
- **Styling:** Tailwind CSS.
- **Icons:** Lucide (`lucide-react`).
- **Fonts (Google Fonts):** Poppins (display/body) and Source Serif 4 (serif accent).
- **Notable techniques:** Two-tier CSS glass-morphism via `@layer components` (gradient borders drawn with a masked `::before` using `mask-composite: exclude`), and HSL grayscale CSS variables.

## Background

- Full-screen autoplaying, looping, muted video background.
- Video source: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4`.
- The video covers the entire viewport with `object-cover` and sits at `z-0`. All content floats above at `z-10`.

## Fonts

- **Display/body:** Poppins (Google Fonts) — used for headings and body text.
- **Serif accent:** Source Serif 4 (Google Fonts) — used **only** for italic/emphasis text inside headings (e.g., `<em>`, `<i>`, `.italic` inside `h1`–`h3`).
- Headings use `font-weight: 500`.

## Color Palette

- **Strict grayscale only** — every CSS variable is an `0 0% X%` HSL value. No colored accents whatsoever.
- Text hierarchy uses `text-white`, `text-white/80`, `text-white/60`, `text-white/50`.

## Liquid Glass CSS (Two Tiers)

Define both tiers under `@layer components`. No `border` classes anywhere — the glass effect handles all borders via the masked `::before` gradient.

### `.liquid-glass` (light tier)

- `background: rgba(255, 255, 255, 0.01);`
- `background-blend-mode: luminosity;`
- `backdrop-filter: blur(4px);` (with `-webkit-` prefix)
- `border: none;`
- `box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);`
- `position: relative;` and `overflow: hidden;`
- `::before` pseudo-element draws the gradient border: a `linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 20%, transparent 40%, transparent 60%, rgba(255, 255, 255, 0.15) 80%, rgba(255, 255, 255, 0.45) 100%)` with `padding: 1.4px`, masked via `-webkit-mask-composite: xor;` / `mask-composite: exclude;`.

### `.liquid-glass-strong` (heavy tier — for CTA / panels)

Same structure as the light tier, but with a stronger blur, an outer drop shadow, and brighter gradient-border alpha stops (`0.5`/`0.2` instead of `0.45`/`0.15`):

- `backdrop-filter: blur(50px);` (with `-webkit-` prefix)
- `box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.15);`
- `::before` gradient uses `rgba(255, 255, 255, 0.5)` and `rgba(255, 255, 255, 0.2)` alpha stops in place of `0.45`/`0.15`.

## Layout — Two-Panel Split

- Flex row, `min-h-screen`. Left panel takes `w-[52%]`, right panel `w-[48%]`.
- The right panel is hidden on mobile and shown only at the `lg` breakpoint (`hidden ... lg:flex`).

## Left Panel

- **Frosted slab behind the whole panel:** a `liquid-glass-strong` overlay, `absolute inset-4 rounded-3xl lg:inset-6`.

### Nav (header)

- **Left — logo:** logo image (`/logo.png`, `32×32`) followed by the wordmark text `bloom` (lowercase, semibold, `text-2xl`, `tracking-tighter`, white).
- **Right — Menu button:** a `liquid-glass` pill with the label `Menu` followed by a `Menu` icon.

### Hero Center

Centered, `flex-1` column.

- **Logo image again:** `/logo.png`, `80×80`.
- **H1:** "Innovating the / spirit of bloom AI" — `text-6xl lg:text-7xl`, `tracking-[-0.05em]`, white. The italic word `spirit` uses `font-serif text-white/80`.
- **CTA button** "Explore Now": a `liquid-glass-strong` `rounded-full` button with `hover:scale-105 active:scale-95`. Label `Explore Now` followed by a `Download` icon inside a `w-7 h-7 rounded-full bg-white/15` circle.
- **Three pills:** `Artistic Gallery`, `AI Generation`, `3D Structures` — each `liquid-glass`, `rounded-full`, `text-xs text-white/80`.

### Bottom Quote (footer)

- **Label:** text `Visionary Design`, `text-xs uppercase tracking-widest text-white/50`.
- **Quote:** "We imagined a realm with no ending." — built from mixed `font-display` / `font-serif italic` spans (`realm` and `no ending` are the serif italic emphasis).
- **Author:** `MARCUS AURELIO` with a horizontal hairline on each side.

## Right Panel (desktop only)

### Top Bar

- **Social pill:** a `liquid-glass` pill rendering three social links (Twitter, LinkedIn, Instagram), followed by an `ArrowRight` icon.
- **Right cluster:** an `Account` button (`liquid-glass`) and an AI assistant icon button (`liquid-glass`) with a `Sparkles` icon.

### Community Card

A small `liquid-glass` card (`w-56`).

- **Title:** `Enter our ecosystem`.
- **Description.**

### Bottom Feature Section (`mt-auto`)

Outer `liquid-glass` container with `rounded-[2.5rem]`.

- **Two side-by-side feature cards**, each `liquid-glass rounded-3xl`:
  - **Processing** — `Wand2` icon.
  - **Growth Archive** — `BookOpen` icon.
- **Bottom card:** `liquid-glass`, containing:
  - **Thumbnail:** flower image from `@/assets/hero-flowers.png`, `96×64`.
  - **Title:** `Advanced Plant Sculpting`, plus a description.
  - **"+" button:** a `liquid-glass` round button with content `+`.

## Icons

All from `lucide-react`: `Sparkles`, `Download`, `Wand2`, `BookOpen`, `ArrowRight`, `Twitter`, `Linkedin`, `Instagram`, `Menu`.

## Key Details

- All interactive elements use `transition-transform hover:scale-105` (the CTA button additionally uses `active:scale-95`).
- Social icon links: `text-white hover:text-white/80 transition-colors`.
- Icon containers: `w-8 h-8 rounded-full bg-white/10 flex items-center justify-center`.
- **No `border` classes anywhere** — the glass effect handles all borders via the `::before` gradient.
- Border-radius token: `--radius: 1rem`.
