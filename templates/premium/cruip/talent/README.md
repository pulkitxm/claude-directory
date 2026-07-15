# Talent — Freelance Marketplace Landing Page Template

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful clone of the Talent template by Cruip — a modern, clean landing page for freelance talent marketplaces and hiring platforms. Built with plain HTML, CSS, and vanilla JavaScript. No build step required.

## Overview

Talent is a professional SaaS / talent marketplace landing page featuring a vibrant blue hero section with gradient illustration, an auto-scrolling client logo carousel, tabbed feature sections, a filterable services grid, animated pricing tables with monthly/annual toggle, and a full responsive footer. The design leverages Aspekta and Cabinet Grotesk typefaces for a distinctive, contemporary look.

**Pages included:**
- `index.html` — Full home page with hero, clients, explainer, features, services, pricing, testimonial, FAQ, and CTA
- `schedule-call.html` — Schedule a call form with split layout and floating talent profile cards
- `signin.html` — Sign in form with the same split layout
- `reset-password.html` — Password reset form

## Features

- Scroll-triggered entrance animations via AOS (Animate On Scroll)
- Auto-scrolling client logos carousel (Swiper.js infinite loop)
- Interactive image carousel with navigation arrows (Swiper.js)
- Tabbed feature sections powered by Alpine.js
- Video modal with Alpine.js open/close transitions
- Monthly / Annual pricing toggle
- Responsive layout with mobile-friendly navigation
- Cabinet Grotesk and Aspekta fonts vendored locally
- All images, fonts, and vendor JS/CSS vendored locally — runs fully offline

## Tech Stack

- **HTML5** — semantic, accessible markup
- **CSS** — Tailwind-compiled utility classes (vendored `style.css`)
- **Alpine.js** — lightweight reactive UI (tabs, modal, pricing toggle)
- **AOS** — scroll-triggered fade-up animations
- **Swiper.js** — touch-friendly carousels

## Run Locally

```bash
# Any static file server works — for example:
npx serve .
# or
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## Verify

```bash
# Check that demo.mp4 plays
ffprobe demo.mp4

# Serve and screenshot
npx serve . &
node ../../../../scripts/record-demos/scrape-ref.mjs "http://localhost:3000/" /tmp/talent-check
```

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Cruip — https://cruip.com/demos/talent/

---

[Back to Cruip templates](../) · [All premium templates](../../) · [Fable gallery](../../../../)
