# claude-directory

A directory of experimental landing pages, hero sections, and interactive prototypes generated with Claude Fable 5.

Most project folders are self-contained and include the originating prompt as `prompt.md`, preserved alongside the generated code. Some prompts were inspired by or adapted from public prompt/design references, including [cnemri's gist](https://gist.github.com/cnemri/c917e11b3a6936823b509dcff53392aa), [motionsites.ai](https://motionsites.ai/), and [lafys.com](https://lafys.com/).

The code in this repository was generated on my side with Claude Fable 5. This whole repo is vibe coded, so use it with precautions: review the code, check dependencies, verify accessibility/responsiveness, and run the local project checks before using anything in production.

## Contributing

Got a cool experiment? Toss it in. No issues, no templates, no ceremony — just shoot a PR.

Only two things are non-negotiable:

- **`prompt.md`** — the prompt you used to generate the project, dropped in the project folder.
- **`demo.mp4`** — a short screen recording of the thing actually working.

Beyond that, do whatever: any stack, any vibe, as long as your project lives in its own self-contained folder. Bonus points if you add a row to the table below, but no stress if you forget.

All PRs get reviewed and merged by Claude Opus, so don't be shy — if the prompt and demo are there, you're golden. 🤙

## Projects

Projects are grouped by what they are. Each lives in its category folder (e.g. `./hero-sections/<project>/`).

<details>
<summary><b>Hero sections (32)</b></summary>

| Project | Description | Stack |
|---------|-------------|-------|
| [aethera-cinematic-hero](./hero-sections/aethera-cinematic-hero/) | Cinematic hero for Aethera with video-driven visual treatment and headless verification | React, TypeScript, Vite, Tailwind CSS |
| [ai-builder-dark-hero](./hero-sections/ai-builder-dark-hero/) | Dark-mode hero section for an AI website builder with animated reveals and HLS video streaming | React, TypeScript, Vite, Tailwind CSS, Motion, hls.js, Lucide |
| [bloom-liquid-glass-hero](./hero-sections/bloom-liquid-glass-hero/) | Bloom hero experiment with floral imagery, liquid-glass styling, and generated visual assets | React, TypeScript, Vite, Tailwind CSS |
| [cinematic-stream-hero](./hero-sections/cinematic-stream-hero/) | LUMIERE full-viewport streaming hero with looping cinematic background video | React, TypeScript, Vite, Tailwind CSS |
| [codenest-hero](./hero-sections/codenest-hero/) | Dark coding-education hero for "CodeNest" with an HLS (Mux) video background, grid lines, central glow, and a liquid-glass floating card | React, TypeScript, Vite, Tailwind CSS, hls.js, Lucide, Vitest |
| [convix-pr-agency-hero](./hero-sections/convix-pr-agency-hero/) | Full-viewport hero for PR-agency SaaS "Convix Software" with a rounded-card layout, background video, and floating pill navbar | React, TypeScript, Vite, Tailwind CSS, Lucide |
| [datacore-video-hero](./hero-sections/datacore-video-hero/) | Responsive full-screen hero with a purple palette and an opaque fullscreen video background | React, TypeScript, Vite, Tailwind CSS, Lucide |
| [designpro-video-hero](./hero-sections/designpro-video-hero/) | Full-screen hero for product-design education platform "DesignPro" with a looping video background and animated shiny gradient heading | React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide |
| [digital-epoch-hero](./hero-sections/digital-epoch-hero/) | Rounded-card hero with looping video background, floating glass bottom navbar, and seamless CSS marquee logo scroller | React, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide |
| [equilibrium-liquid-glass-hero](./hero-sections/equilibrium-liquid-glass-hero/) | Full-screen "Equilibrium" wellness hero with a liquid-glass UI over a looping background video | React, TypeScript, Vite, Tailwind CSS, Lucide |
| [fearless-vision-hero](./hero-sections/fearless-vision-hero/) | Full-screen hero with a background video, deep-purple accent, and Inter typography | React, JavaScript, Vite, Tailwind CSS, Framer Motion, Lucide |
| [ironclad-password-hero](./hero-sections/ironclad-password-hero/) | Password-manager hero section for Ironclad with animated product-style presentation | React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide |
| [kubric-hero-landing](./hero-sections/kubric-hero-landing/) | Desktop-only dark hero for fictional studio "Kubric™" with a looping background video, an 8-layer progressive bottom blur, a self-drawing animated SVG logo, a character-by-character headline, and a video-ready reveal sequence | TanStack Start, React 19, Vite 7, Tailwind CSS v4 |
| [mainframe-hero-landing](./hero-sections/mainframe-hero-landing/) | Full-screen hero landing page for a creative agency called "Mainframe" with custom Helvetica Now display fonts | React, TypeScript, Vite, Tailwind CSS |
| [nexora-automation-hero](./hero-sections/nexora-automation-hero/) | Single-viewport SaaS automation hero ("Nexora") with Instrument Serif / Inter type and Framer Motion | React, TypeScript, Vite, Tailwind CSS, Framer Motion, shadcn/ui, Lucide |
| [noctis-cinematic-hero](./hero-sections/noctis-cinematic-hero/) | NOCTIS full-screen dark cinematic hero with video background, nav, and timecode details | React, TypeScript, Vite, CSS |
| [power-ai-hero](./hero-sections/power-ai-hero/) | Full-screen dark AI hero with a JS-controlled fade-loop background video, headline, CTA, and logo marquee | React, TypeScript, Vite, Tailwind CSS, Geist Sans, Lucide |
| [rivr-defi-hero](./hero-sections/rivr-defi-hero/) | DeFi dashboard hero for RIVR with glassmorphism, badge/cards, and verification script | React, TypeScript, Vite, Tailwind CSS |
| [securify-data-hero](./hero-sections/securify-data-hero/) | Full-screen hero section for a fictional data-security SaaS called securify | React, TypeScript, Vite, Tailwind CSS |
| [sentinel-ai-hero](./hero-sections/sentinel-ai-hero/) | Full-screen dark hero for security company "Sentinel AI" with an embedded Spline 3D scene background | React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Spline |
| [skyelite-jet-hero](./hero-sections/skyelite-jet-hero/) | Premium private jet hero section with full-viewport video background and luxury UI treatment | React, TypeScript, Vite, Tailwind CSS |
| [smart-prosthetics-hero](./hero-sections/smart-prosthetics-hero/) | Single-page hero with a fullscreen video background and pill-style navbar for a smart-prosthetics concept | React, TypeScript, Vite, Tailwind CSS, Lucide |
| [stellar-ai-landing-hero](./hero-sections/stellar-ai-landing-hero/) | "Stellar.ai" landing hero on a white background with staggered fade-in animations and Inter type | React, TypeScript, Vite, Tailwind CSS, Lucide |
| [synex-wealth-hero](./hero-sections/synex-wealth-hero/) | Editorial-minimal full-viewport hero for fictional wealth platform "Synex" on a warm paper background, with two photorealistic stones that reveal a cursor-following moss patch via a spring-driven radial mask, and a staggered blur-up load cascade | React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide |
| [taskly-liquid-glass-hero](./hero-sections/taskly-liquid-glass-hero/) | High-fidelity "liquid glass" hero for Taskly with a sticky glass navbar and dual-column layout on a white gradient-glow background | React, Vite |
| [toonhub-figurine-carousel](./hero-sections/toonhub-figurine-carousel/) | TOONHUB full-viewport character figurine carousel hero | React, TypeScript, Vite, Tailwind CSS, Lucide |
| [transform-data-hero](./hero-sections/transform-data-hero/) | Modern hero with a looping video background and a custom requestAnimationFrame fade system | React, TypeScript, Vite, Tailwind CSS |
| [vanguard hero landing](./hero-sections/vanguard%20hero%20landing/) | Fullscreen hero landing page for the creative agency VANGUARD with looping background video | React, TypeScript, Vite, Tailwind CSS |
| [vaultshield-hero](./hero-sections/vaultshield-hero/) | VaultShield hero experiment with security-product positioning and CLI/headless verification | React, TypeScript, Vite, Tailwind CSS |
| [velorah-hero-landing](./hero-sections/velorah-hero-landing/) | Velorah hero landing page built with a modern Tailwind/shadcn-style component approach | React, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| [wanderful-cinematic-hero](./hero-sections/wanderful-cinematic-hero/) | Full-viewport cinematic hero for travel brand "Wanderful" with GSAP animation and a custom display font | React, TypeScript, Vite, Tailwind CSS, GSAP, Lucide |
| [xero-encryption-hero](./hero-sections/xero-encryption-hero/) | Single-page encryption-product hero for "Xero" with an animated icon pipeline and a pink-magenta gradient arc on a black page, written in plain CSS | React, TypeScript, Vite, CSS |

</details>

<details>
<summary><b>Landing pages (21)</b></summary>

| Project | Description | Stack |
|---------|-------------|-------|
| [asme-hero-landing](./landing-pages/asme-hero-landing/) | Full-screen dark Asme landing page with Mux/HLS-style video, liquid-glass navbar, and email-capture CTA | React, JavaScript, Vite, CSS |
| [asme-liquid-glass-landing](./landing-pages/asme-liquid-glass-landing/) | Dark cinematic Asme single-page landing site with liquid-glass UI details | React, TypeScript, Vite, Tailwind CSS |
| [aura-email-landing](./landing-pages/aura-email-landing/) | Dark, cinematic landing page for "Aura", an AI-native email client, with fullscreen video, a shiny gradient headline, a macOS-style menu bar, and a liquid-glass inbox mockup | React, TypeScript, Vite, Tailwind CSS, Motion, Lucide, Supabase |
| [auroracast-hls-landing](./landing-pages/auroracast-hls-landing/) | Modern landing page with a full-screen HLS video background, glassmorphic navigation header, and bottom-left hero content | React, Vite, hls.js |
| [axion-studio-landing](./landing-pages/axion-studio-landing/) | Design agency landing page for Axion Studio with shader-based hero background and multi-section layout | React, TypeScript, Vite, Tailwind CSS, shaders, Lucide |
| [design-rocket-email](./landing-pages/design-rocket-email/) | Email-style marketing landing page for a "Design Rocket Certificates" AI leadership course | React, TypeScript, Vite, Tailwind CSS, Lucide |
| [dot-daily-calm-landing](./landing-pages/dot-daily-calm-landing/) | "Dot." calm-living landing page with a glassmorphic pill navbar, typing messages, and a Nokia-style accent font | React 19, Vite, Tailwind CSS v4, Motion |
| [forma-video-landing](./landing-pages/forma-video-landing/) | Full-screen video-background landing page with rounded card layout and contact form | React, TypeScript, Vite, Tailwind CSS, Lucide |
| [groundai-landing](./landing-pages/groundai-landing/) | Single-page landing for interior-design AI product "GroundAI" with a video hero, expanding glass nav pill, brand marquee, and three animated feature cards (style carousel, morphing chat, adaptable list) | TanStack Start, React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide |
| [mentality-landing](./landing-pages/mentality-landing/) | MENTALITY landing page with video hero, glassmorphic navbar, and animated mobile drawer | React, TypeScript, Vite, Tailwind CSS, Motion |
| [mindloop-mono-landing](./landing-pages/mindloop-mono-landing/) | Pure-black monochrome newsletter/content landing page for Mindloop | React, TypeScript, Vite, Tailwind CSS, shadcn-style UI |
| [neuralyn-dark-landing](./landing-pages/neuralyn-dark-landing/) | Dark landing page for analytics-dashboard SaaS "Neuralyn" with Framer Motion and shadcn/ui components | React, TypeScript, Vite, Tailwind CSS, Framer Motion, shadcn/ui, Lucide |
| [nhm-paleontology-landing](./landing-pages/nhm-paleontology-landing/) | Paleontology-themed museum landing page with Inter / JetBrains Mono typography | React 19, Vite 6, Tailwind CSS v4, Motion, Lucide |
| [orbis-nft-landing](./landing-pages/orbis-nft-landing/) | Dark, space-themed NFT landing page "Orbis.nft" with CloudFront video backgrounds and liquid-glass UI | React, TypeScript, Vite, Tailwind CSS, Lucide |
| [pelmatech-health-companion](./landing-pages/pelmatech-health-companion/) | Pixel-faithful "Pelmatech" health-companion landing with a full-bleed hero, a hover-driven team carousel, a custom-gridline benefits grid, uniform CSS-zoom responsive scaling, and blur-up / fade-up / clip-path animation primitives | React, TanStack Start, TypeScript, Tailwind CSS v4, shadcn/ui, Motion, Lucide |
| [prisma landing](./landing-pages/prisma%20landing/) | Cinematic landing page for the creative studio PRISMA with dark, moody, warm cream palette | React, TypeScript, Vite, Tailwind CSS, Framer Motion |
| [space-voyage-landing](./landing-pages/space-voyage-landing/) | Cinematic space-travel landing page with two video-backed full-height sections and liquid-glass UI | React via CDN, Tailwind CDN, Framer Motion, single-page HTML |
| [synergeus-landing](./landing-pages/synergeus-landing/) | Pixel-faithful dark AI-fintech "Synergeus" landing with three scroll-revealed sections — an HLS video hero with a 3D-tilt story card, an analytics card with count-ups, and an AI-intelligence trio (NL queries, wipe-reveal chart, animated SVG node tree) | React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, hls.js, Lucide, React Router |
| [usd-halo-landing](./landing-pages/usd-halo-landing/) | Premium fintech-style landing page for the stablecoin product "Halo / USD Halo" with a custom logo mark and TT Norms Pro type | React, TypeScript, Vite, Tailwind CSS, Lucide |
| [valmax-photography-landing](./landing-pages/valmax-photography-landing/) | Single-page dark recreation of the "Valmax" photography studio landing with an orchestrated intro sequence, a lime accent, oklch design tokens, and photo-driven sections | TanStack Start, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, Lucide |
| [viktor-oddy-landing](./landing-pages/viktor-oddy-landing/) | Single-page landing for creative design studio "Viktor Oddy" with custom PP Neue Montreal / PP Mondwest fonts and staggered animations | React, TypeScript, Vite, Tailwind CSS, Lucide |

</details>

<details>
<summary><b>Animations &amp; loaders (9)</b></summary>

| Project | Description | Stack |
|---------|-------------|-------|
| [apex-scroll-hero](./animations-loaders/apex-scroll-hero/) | Apple-product-page-style "Apex" hero whose 5-second F1 sunset film is scroll-scrubbed full-screen (scroll drives `video.currentTime`) with a synced speed/gear telemetry HUD | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| [bags-editorial-collage](./animations-loaders/bags-editorial-collage/) | Three-section animated bags landing — a warm cream editorial sticker-collage hero, a scroll-driven unfolding-envelope collection stage, and an orbiting "perfect match" field, tied together by glowing serif accent words | React, TypeScript, Vite, Tailwind CSS, Framer Motion |
| [dot-nokia-typing-hero](./animations-loaders/dot-nokia-typing-hero/) | Single-screen "dot." calm-messaging hero with a full-bleed Nokia-phone background video, a live typing/deleting animation in a Nokia cellphone font overlaid on the phone screen, and a floating glass pill navbar | React 19, Vite, TypeScript, Tailwind CSS v4, Motion |
| [linkflow-boomerang-hero](./animations-loaders/linkflow-boomerang-hero/) | Linkflow hero concept with boomerang-style visual direction and CSS-only animations | React, TypeScript, Vite, Tailwind CSS, Lucide |
| [mainframe-scrub-hero](./animations-loaders/mainframe-scrub-hero/) | Mainframe contact hero whose background film is scrubbed by cursor movement, with typewriter headline and multi-select service pills | React, TypeScript, Vite, Tailwind CSS, Motion, Lucide |
| [microvisuals-boomerang-hero](./animations-loaders/microvisuals-boomerang-hero/) | Fullscreen hero with GSAP boomerang-style animation and a custom display font | React, TypeScript, Vite, Tailwind CSS, GSAP, Lucide |
| [moneta-key-preloader](./animations-loaders/moneta-key-preloader/) | Full-viewport cinematic "Moneta Key" preloader — color-dodge glowing sphere, masked dashed orbit line, wave-cut logo, and a curved canvas-based 0–100 number arc that idles forever | React, TypeScript, Vite, Tailwind CSS, Framer Motion, Canvas 2D |
| [pallet-ross-landing](./animations-loaders/pallet-ross-landing/) | Scroll-driven landing for fictional artist marketplace "Pallet Ross" where seven artwork cards perform a choreographed intro, then gather into a stack, descend, and fan into a diagonal cascade ladder locked across three full-height sections | React, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide |
| [qclay-hexagon-loader](./animations-loaders/qclay-hexagon-loader/) | Full-screen recreation of the QClay loader — an animated honeycomb of real SVG hexagon tiles with a glowing blue active center, breathing rAF motion, crossfading icons, a shimmering label, and an organic looping progress bar | React, TypeScript, Vite, SVG |

</details>

<details>
<summary><b>3D &amp; games (2)</b></summary>

| Project | Description | Stack |
|---------|-------------|-------|
| [lovable-webgl-hero](./3d-games/lovable-webgl-hero/) | 1:1 recreation of the Lovable landing page — a full-viewport WebGL hero driven by the real CoreRenderer runtime, a glass navbar with full-width dropdowns, an animated typewriter prompt input, and a 3D trusted-by logo carousel | TanStack Start, React 19, Tailwind CSS v4, Framer Motion, Lucide, WebGL |
| [sidi-bou-said-3d-walk](./3d-games/sidi-bou-said-3d-walk/) | Navigable, fully procedural 3D walk through Sidi Bou Said, Tunisia in a single HTML file | Three.js, single-file HTML/JS |

</details>

<details>
<summary><b>Portfolios (2)</b></summary>

| Project | Description | Stack |
|---------|-------------|-------|
| [jack-3d-portfolio](./portfolios/jack-3d-portfolio/) | Dark-themed 3D creator portfolio landing page for Jack with gradient hero text | React, TypeScript, Vite, Tailwind CSS, Framer Motion |
| [michael-smith-portfolio](./portfolios/michael-smith-portfolio/) | Dark single-page creator portfolio with GSAP / Framer Motion animations and HLS video | React, TypeScript, Vite, Tailwind CSS, GSAP, Framer Motion, hls.js, React Router |

</details>

<details>
<summary><b>Components &amp; UI (5)</b></summary>

| Project | Description | Stack |
|---------|-------------|-------|
| [aurora-sign-up](./components-ui/aurora-sign-up/) | Two-column "Aurora" registration interface with a background-video hero, staggered Motion reveals, and a multi-step sign-up form | React, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide |
| [core-features-gradient-cards](./components-ui/core-features-gradient-cards/) | Static "Core Features" marketing section with three gradient feature cards | Single-file HTML/CSS |
| [nexto-404-hero](./components-ui/nexto-404-hero/) | Full-viewport 404 "Page Not Found" hero for fictional brand "nexto." with a layered alien-spaceship background, floating gradient Material Symbols, a dashed-gradient navbar, and a morphing mobile menu overlay | React, Vite, Tailwind CSS, Material Symbols |
| [sixsense-reference-finder](./components-ui/sixsense-reference-finder/) | Pixel-faithful "Sixsense" AI reference-finder page with canvas pixel-grid glass backgrounds, an organic cursor hover blob, a layered folder/lights stack, three floating reference cards, and a glass typewriter prompt box with a spinning gradient send button | React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion, Lucide, Canvas |
| [terminal-cli-control-deck](./components-ui/terminal-cli-control-deck/) | "ACME Control Deck" infrastructure panel built in a phosphor-green Terminal CLI design system — centralized tokens, composable windows/panes, ASCII art logo, typewriter headline, raw-data ASCII progress meters, a live syslog feed, an interactive zsh console, a box-less access form, and a subtle CRT scanline overlay | React, TypeScript, Vite, Tailwind CSS v4, Lucide |

</details>

<details>
<summary><b>UI design (10)</b></summary>

| Project | Description | Stack |
|---------|-------------|-------|
| [art-deco-gatsby-showcase](./ui-design/art-deco-gatsby-showcase/) | Self-contained Art Deco ("Gatsby") design-system showcase — gold-on-obsidian, vendored Marcellus/Josefin Sans, a rotating sunburst hero, stepped-corner cards with rotated-diamond icons, a Roman-numeral timeline, pricing tiers, testimonials, an accordion FAQ, underlined-input enquiry form, and a 5-column footer | HTML, CSS, vanilla JS |
| [bauhaus-form-follows-function](./ui-design/bauhaus-form-follows-function/) | "WERKBUND" Bauhaus design-system landing page — a constructivist poster brought to life with three primary colours, thick black borders, hard offset shadows, binary radii, geometric circle/square/triangle primitives, color-blocked sections, a stats band, feature grid, pricing tiers, testimonials, journal, and a red/cream FAQ accordion | React, TypeScript, Vite, Tailwind CSS v4, Lucide |
| [flatline-design-system](./ui-design/flatline-design-system/) | Complete flat-design-system showcase landing page — centralized tokens, sharp full-section color blocks (Blue/Emerald/Amber/dark), tinted color-block cards, thick outline buttons, a scaled "popular" pricing tier, multi-color stat count-ups, and high-contrast solid focus rings with zero box-shadows anywhere | React, TypeScript, Vite, Tailwind CSS v4, Motion, Lucide |
| [kinetic-typography-poster](./ui-design/kinetic-typography-poster/) | Kinetic Typography design-system showcase — a festival poster page with viewport-width `clamp()` headlines, two infinite marquees, towering background numbers, hard acid-yellow color-inversion hover states, sticky-stacking cards, scroll-driven hero zoom, and a `prefers-reduced-motion` static fallback | React, TypeScript, Vite, Tailwind CSS v4, Framer Motion, react-fast-marquee, Space Grotesk |
| [lumen-design-system](./ui-design/lumen-design-system/) | Showcase landing page that fully expresses the Linear/Modern design language — four-layer ambient background with floating gradient blobs, mouse-tracking spotlight cards, gradient typography, scroll-linked hero parallax, multi-layer shadows, an asymmetric bento grid, a live token gallery and component playground, and a responsive hamburger menu, all on centralized design tokens | React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide |
| [lumina-minimalist-modern](./ui-design/lumina-minimalist-modern/) | Full "Minimalist Modern" design-system landing page for analytics platform Lumina — Electric Blue signature gradient, inverted slate sections, Calistoga/Inter dual-font type, an animated abstract hero graphic, and centralized design tokens | React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide |
| [neo-brutalism-loud-system](./ui-design/neo-brutalism-loud-system/) | "LOUDHOUSE" Neo-brutalism design-system showcase — centralized `@theme` tokens (cream/black + red/yellow/violet highlighters), hard offset shadows (zero blur) as `shadow-neo*` utilities, hollow text-stroke display type, sticker rotations, a chaos-zone hero, live token gallery, count-up stats, an interactive component playground, scaled pricing, two marquees, a keyboard FAQ, mechanical click-down buttons / lift cards / yellow-flood inputs, and a full `prefers-reduced-motion` fallback | React, TypeScript, Vite, Tailwind CSS v4, react-fast-marquee, Lucide, Space Grotesk |
| [luxury-editorial-design-system](./ui-design/luxury-editorial-design-system/) | "MAISON" Luxury / Editorial design-system showcase — a full editorial landing (hero, drop-cap features, dark stats, multi-layer testimonials, ARIA FAQ accordion, blog grid, footer CTA) with vendored Playfair/Inter fonts, vertical writing-mode labels, fixed gridlines, a gold-sliding button, and a paper-grain noise overlay | React, TypeScript, Vite, Tailwind CSS, Lucide |
| [newsprint-editorial-press](./ui-design/newsprint-editorial-press/) | Full editorial landing page expressing the "Newsprint" design system — massive Playfair headlines, zero radius, collapsed grid borders, drop caps, a breaking-news ticker, an inverted black "How It's Filed" section, grayscale halftone engravings, hard offset hover shadows, and sparing editorial red | React, TypeScript, Vite, Tailwind CSS, CVA, tailwind-merge, Lucide |
| [swiss-design-system](./ui-design/swiss-design-system/) | Self-contained Swiss International (International Typographic Style) design-system showcase — strict B/W/Swiss-Red tokens, four CSS texture patterns (grid, dots, diagonal, noise), a Bauhaus hero composition, a mathematical type specimen, a 2×2 component gallery, and bold mechanical interactions (color inversions, rotating plus icons, count-up); fully offline | HTML, CSS, vanilla JS, Inter |

</details>
