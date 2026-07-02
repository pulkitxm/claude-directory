# Cube — User-Centric SaaS Landing Page

[![Watch Demo](./poster.jpg)](./demo.mp4)

A pixel-faithful clone of the **Cube** template by Cruip — a polished, dark-themed SaaS landing page built for user analytics and product management tools. Features a deep slate-900 palette with indigo accents, rich scroll animations, interactive pricing, and a feature carousel.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Full marketing home page |
| `signin.html` | Sign-in form with Google OAuth button |
| `signup.html` | Split-layout request demo / sign-up form |
| `reset-password.html` | Password reset form |

## Sections (Home)

1. **Header** — Fixed frosted-glass nav with logo, sign-in link, and primary CTA
2. **Hero** — Two-column layout with headline, sub-copy, dual CTAs, and dashboard screenshot
3. **Testimonials Strip** — Three review cards with 5-star ratings (Trustpilot / Capterra / G2)
4. **Features Carousel** — Swiper.js draggable carousel with 4 feature cards and prev/next arrows
5. **Features Tabs** — Tabbed content box switching between Everyone / Freelancers / Organizations via vanilla JS
6. **Integrations Hub** — Central Cube logo with pulsing halo rings and 6 integration icon boxes
7. **Pricing Table** — Monthly / Yearly toggle with 3-plan comparison grid (Starter / Agency / Team)
8. **Testimonial Quote** — Large centered pull-quote with avatar
9. **FAQs** — Two-column static Q&A grid
10. **CTA Section** — Full-width call-to-action with illustration background
11. **Footer** — Five-column links with social icons and legal links

## Interactions

- **Pricing toggle** — checkbox switches prices between monthly and yearly rates
- **Feature tabs** — vanilla JS tab switcher with active state styling
- **Swiper carousel** — draggable feature carousel with navigation buttons
- **AOS animations** — `fade-up` scroll reveals on hero, integration icons, testimonials, CTA
- **Hover states** — buttons, nav links, integration boxes, footer links, social icons
- **Form validation** — HTML5 `required` on all auth/contact form fields

## Stack

- Plain HTML + CSS (no build step)
- [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- [Swiper 11](https://swiperjs.com/) via CDN
- [AOS 2.3](https://michalsnik.github.io/aos/) via CDN
- Vanilla JS for pricing toggle and tab switching
- All images vendored locally under `assets/images/`

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Cruip — <https://cruip.com/demos/cube/>
