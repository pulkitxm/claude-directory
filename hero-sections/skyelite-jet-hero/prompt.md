# SkyElite — Premium. Accessible. (Private Jet Hero Section)

## Overview

Build a premium private-jet landing page hero section: a full-viewport looping video background with a clean, modern navigation bar and centered hero content. The page leans on a calm, light aesthetic, with smooth interactions and hover transitions kept to color changes only.

## Tech Stack

- **Framework:** React with TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React — `Menu` and `X` icons
- **Font:** Inter (Google Fonts; weights 400, 500, 600, 700), applied to the entire body via CSS
- **State:** React `useState` hook for the mobile menu toggle
- **Notable techniques:** full-viewport `object-cover` video background, responsive mobile-first layout

## Layout Structure

- **Outer container:** `min-h-screen bg-gray-50`.
- **Hero section:** `relative h-screen overflow-hidden`.
- **Content wrapper:** `relative flex h-full flex-col` (full-height flex column).
- **Main content area:** `flex flex-1 items-center justify-center`.

Use a full-screen height container (`h-screen`).

## Video Background

- Use this exact CloudFront video URL: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzzbokvigwjottwixh07lwa1p/HF_20260328_091828_E240EB17-6EDC-4129-AD9D-98678E3FD238.MP4`.
- The video should autoplay, be muted, loop continuously, and include the `playsInline` attribute.
- It covers the entire viewport (`100vh`) using `object-cover`.

## Navigation Bar

- **Nav container:** max width `7xl`, centered, with `px-8 py-6`.
- **Brand:** brand name `SkyElite` on the left, classes `text-2xl font-semibold text-gray-900`.
- **Desktop menu:** menu items hidden on mobile and visible at `md:flex`. Menu items, in order: `Start`, `Story`, `Rates`, `Benefits`, `FAQ`.
  - Navigation links are in `gray-900` with a `hover:text-gray-700` transition.
- **Mobile hamburger:** a hamburger menu button using Lucide React icons (`Menu` / `X`), toggling the mobile menu open state.
- **Mobile dropdown:** appears as a dropdown with `white/95` opacity background, backdrop blur, rounded corners, and shadow.

## Hero Content

Centered, pulled upward with `-mt-80`:

- **Eyebrow label:** small uppercase label `Private Jets` — classes `text-sm font-semibold` in `gray-600` with `tracking-wider` and `mb-4`.
- **Heading:** a large two-line heading with an overlapping effect.
  - **Line 1:** `Premium.` — `text-6xl md:text-7xl lg:text-8xl`, `font-normal`, `text-gray-500`, `leading-none`, `tracking-tighter`.
  - **Line 2:** `Accessible.` — same size, color `#202A36`, negative margin-top of `-12px` for overlap.
- **Subtitle:** `Your dedication deserves recognition.` — classes `text-lg md:text-xl`, `gray-600`, `mb-6`, `max-w-2xl`.
- **Call-to-action buttons:** two buttons in a centered row with `gap-4`:
  - **Discover:** `px-4 py-2`, `rounded-full`, `bg-gray-300`, `text-gray-800`, `font-medium`, `hover:bg-gray-400`.
  - **Book Now:** `px-4 py-2`, `rounded-full`, white text, background color `#202A36`, hover color `#1a2229` with smooth transitions.

## Color Palette

- **Page background:** `bg-gray-50`
- **Brand / nav text:** `text-gray-900`, hover `text-gray-700`
- **Eyebrow & subtitle text:** `text-gray-600`
- **Heading line 1:** `text-gray-500`
- **Heading line 2 & "Book Now" button:** `#202A36` (hover `#1a2229`)
- **"Discover" button:** `bg-gray-300` / `text-gray-800`, hover `bg-gray-400`
- **Mobile dropdown surface:** `bg-white/95` with backdrop blur

## Responsiveness & Interaction

- Mobile-first with `md` and `lg` breakpoints.
- Full-screen height container (`h-screen`).
- Desktop menu hidden below `md`; hamburger hidden at `md` and up.
- All interactive transitions use the `transition-colors` class.
- Keep it clean, modern, and premium-looking with smooth interactions.
