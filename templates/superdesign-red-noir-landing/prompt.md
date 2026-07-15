# SUPERDESIGN "RED NOIR" LANDING PAGE — PROJECT PROMPT

BUILD A SINGLE-PAGE REACT + TANSTACK START + TYPESCRIPT + TAILWIND APP THAT EXACTLY RECREATES THE "RED NOIR" SUPERDESIGN AI LANDING PAGE SPECIFIED BELOW. THE GOAL IS A SAME-TO-SAME, PIXEL-FAITHFUL RECREATION OF THE REFERENCE. USE LUCIDE-REACT FOR ICONS (THE REFERENCE USES `lucide:*` ICONS VIA ICONIFY — MAP EACH TO THE MATCHING `lucide-react` COMPONENT). IMPLEMENT THE PAGE IN `SRC/ROUTES/INDEX.TSX` WITH HELPER COMPONENTS IN `SRC/COMPONENTS/`. USE THE EXACT COLORS, FONTS, SIZES, AND ANIMATION TIMINGS GIVEN. DO NOT INVENT EXTRA SECTIONS OR DESIGN TOKENS.

REFERENCE LIVE URL: https://component-4739694a-be35-4493-bdef-f43fd1d095ec.preview.superdesign.dev/?projectId=c636c30f-5d52-41e7-a197-20eb42f1c72d

---

## DESIGN LANGUAGE — "RED NOIR"

- Pure black canvas (`#000000`) with a deep maroon top glow (vertical gradient `from #1a0505 to black`).
- Single saturated accent: **`--accent-red: #ef233c`** (with glow `rgba(239,35,60,0.5)`). NOTHING else is colored except small per-card icon accents (blue `#3b82f6`, yellow `#facc15`/`text-yellow-400`, purple `#a855f7`/`text-purple-400`) inside the bento grid.
- Two webfonts: **Manrope** (200/400/600/700/800) for display/headings, **Inter** (300/400/500/600) for body. Load via Google Fonts. Use `.font-manrope` and `.font-inter` utility classes.
- Text selection is red: `::selection { background:#ef233c; color:#fff }` (apply globally / via a `selection-red` class on the root).

## GLOBAL BACKGROUND (fixed, z-0, pointer-events-none, behind everything)

1. `from-[#1a0505] to-black` vertical gradient fill.
2. **Two parallax starfields** built from `box-shadow` dot clusters on a 1px/2px element, each translated upward via keyframes `animStar { from translateY(0) to translateY(-2000px) }` — layer 1 `50s linear infinite`, layer 2 `80s linear infinite`. Reproduce these star coordinates exactly:
   - stars-1: `234px 124px, 654px 345px, 876px 12px, 1200px 800px, 400px 1500px, 1800px 200px, 100px 1000px, 900px 1900px, 500px 600px, 1400px 100px, 300px 400px, 1600px 1200px` (all `#fff`).
   - stars-2: `123px 456px, 789px 234px, 456px 890px, 1100px 300px, 200px 1200px, 1500px 500px, 600px 1700px, 1300px 900px` (all `#fff`).
3. A centered `800x800` red radial glow: `bg-red-600/5 rounded-full blur-[120px]`, absolutely centered.
4. A faint grid overlay: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)` + the 90deg variant, `bg-[size:40px_40px]`, masked with `radial-gradient(circle at center, black 40%, transparent 80%)`.

A fixed top **gradient blur header** sits at z-40: `height:120px`, `linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)`, `backdrop-blur(8px)`, masked `linear-gradient(to bottom, black, transparent)`.

## NAVBAR (fixed top, z-50, `pt-6 px-4`)

Pill nav, `max-w-5xl mx-auto`, `bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl`, flex justify-between.
- Left: a `w-5 h-5 bg-[#ef233c] rounded-sm rotate-45` diamond + "Superdesign" in `font-manrope font-bold text-lg tracking-tight`.
- Center (hidden below md): links **Product, Solutions, Resources, Pricing** — `text-sm text-zinc-400 hover:text-white`.
- Right: "Log In" (hidden below md, `text-zinc-300 hover:text-white`) and a **"Get Access →"** button — a rounded-full button with an animated conic-gradient red sweep on hover (`spin 3s linear infinite`, red conic, opacity 0 → group-hover 100), an inner black fill `inset-[1px]`, and uppercase bold `text-xs tracking-wider` label with a `lucide:arrow-right` that nudges right on hover.

## HERO (`min-h-screen`, centered, `pt-32 pb-20 px-6`)

Each element fades in with keyframe `fade-in-up { opacity 0 translateY(20px) → 1 translateY(0) }`, `0.8s ease-out forwards`, staggered delays 0.1s / 0.2s / 0.3s / 0.4s.

1. **Pill badge**: `rounded-full bg-white/5 border border-white/10 backdrop-blur-md`, a pinging red dot (`animate-ping` halo + solid `#ef233c` core), text "Superdesign AI 2.0 is now live" (`text-xs text-red-100/90 font-manrope`), trailing `lucide:arrow-right` red.
2. **Headline** `text-6xl md:text-8xl font-semibold tracking-tighter font-manrope leading-[1.1]`, two lines, each filled with `bg-gradient-to-b from-white via-white to-white/40` clipped text:
   - Line 1: "Design Intelligence"
   - Line 2: "for the **Future**" — where "Future" is `text-[#ef233c]` with a hand-drawn underline SVG beneath it: `<path d="M0 5 Q 50 10 100 5">` stroke currentColor width 2, `opacity-60`, positioned `-bottom-2`.
3. **Subhead** `text-xl md:text-2xl text-zinc-400 max-w-2xl`: "Superdesign blends advanced generative algorithms with human creativity to ship world-class products 10x faster."
4. **CTA row** (flex col → md:row, gap-6):
   - **Primary "Start Creating →"** — the signature **shiny-cta**: a rounded-full button, black `padding-box` fill, a `conic-gradient(from var(--gradient-angle), transparent 0%, #ef233c 5–30%, transparent 40–100%)` `border-box` 2px border, animated via `@property --gradient-angle` and `border-spin 2.5s linear infinite`, plus a faint dotted radial sparkle overlay (`::before`, `radial-gradient white 0.5px`, `bg-size 4px 4px`, opacity 0.1). Label white `font-medium` + arrow that translates on hover.
   - **Secondary "View on GitHub"** — `bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-full px-8 py-4`, `lucide:github` icon, hover → `bg-zinc-800 text-white`.
5. **Logo strip** (`mt-32`, `border-y border-white/5 bg-white/[0.02] py-10`, `opacity-60 hover:opacity-100`): label "INTEGRATED WITH:" (`text-zinc-500 uppercase tracking-widest text-sm font-bold`) followed by 5 faux logos (a `w-6 h-6 bg-white/20 rounded-full` dot + name, `font-manrope font-semibold`): **OpenAI, Figma, React, Vercel, Stripe**.

## FEATURES — BENTO GRID (`py-32 px-6`, `max-w-7xl`)

Centered heading block (`fade-up`): h2 `text-4xl md:text-5xl font-semibold font-manrope` = "The Operating System for" / "**Modern Design Teams**" (second line `text-[#ef233c]`); sub `text-lg text-zinc-400 font-light` = "Replace your fragmented toolset with one cohesive platform driven by AI."

Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`, `lg:h-[700px]`. Every card: `border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all`, with a per-card radial color glow that appears on hover (`opacity-0 group-hover:opacity-10`).
1. **Main card** `lg:col-span-2 lg:row-span-2`, bg `gradient-to-b from-zinc-900/50 to-black`, red glow. Icon `lucide:bot` (red) in a `rounded-lg bg-white/5 border` chip; h3 `text-3xl font-semibold font-manrope` "Generative UI Systems"; paragraph about generating design systems from a prompt; a footer row "EXPLORE FEATURE →" (`text-xs font-mono text-[#ef233c]`) that fades+rises in on hover.
2. **Code Export** `lg:col-span-2`, `bg-black`, blue glow, icon `lucide:code` (blue), h3 `text-2xl` "Code Export", "Production-ready React & Tailwind code, shipped directly to your repo with zero friction."
3. **Smart Iteration** (1 cell), `bg-black`, icon `lucide:zap` (yellow), h3 `text-xl` "Smart Iteration", "A/B test variations generated by AI based on real user data."
4. **Team Sync** (1 cell), `bg-black`, icon `lucide:layers` (purple), h3 `text-xl` "Team Sync", "Real-time collaboration with automated version control."

## TESTIMONIAL BANNER (full-bleed `bg-[#ef233c] py-20 px-6`, black text)

`max-w-4xl text-center`: a row of 5 filled `lucide:star` (black); a `text-3xl md:text-5xl font-bold font-manrope` quote: "Superdesign has completely transformed how we ship products. What used to take weeks now takes hours."; then an avatar (`w-12 h-12 bg-black rounded-full` with white `lucide:user`) + "**Alex Morgan**" / "CPO at TechFlow" (`text-black/70`).

## PRICING (`py-32 px-6 bg-black border-t border-white/5`)

Centered heading "Simple, Transparent Pricing" (`text-4xl md:text-5xl font-semibold font-manrope`) + "Start for free, scale as you grow." (`text-zinc-400`).
Three cards `grid md:grid-cols-3 gap-8`, each `rounded-xl p-8 flex flex-col`:
- **Starter** — `border-zinc-800 bg-black`, "For individuals exploring AI design possibilities.", **$0/mo**, features (each `lucide:check` red): "1 Project", "Basic AI Generation", "Community Support"; button "GET STARTED" (`bg-white/5 border border-white/10` uppercase).
- **Pro** (FEATURED) — `border-[#ef233c] bg-zinc-900/40 shadow-[0_0_30px_rgba(239,35,60,0.1)] scale-105 z-10`, a "RECOMMENDED" pill badge centered on the top edge (`bg-[#ef233c] text-white text-[10px] uppercase tracking-widest`), "For professional designers and high-growth freelancers.", **$49/mo**, features: "Unlimited Projects", "Advanced AI Models", "Direct Code Export", "Priority Support"; button "GO PRO" (`bg-[#ef233c] hover:bg-red-700`).
- **Team** — `border-zinc-800 bg-black`, "For scale-up design teams and creative agencies.", **$199/mo**, features: "Team Collaboration", "Custom Design Systems", "API Access & SSO"; button "CONTACT SALES".
Price rendering: small `$` (`text-zinc-500`), `text-5xl font-bold text-white` number, `/mo` (`text-zinc-500 text-sm`). Buttons are full-width, uppercase, `tracking-wider`, `text-sm font-bold`.

## CTA WAITLIST (`py-32 px-6 text-center bg-zinc-950/40`)

`max-w-3xl`: h2 `text-5xl md:text-7xl font-bold font-manrope tracking-tighter` = "Ready to **Build?**" (Build? in `text-[#ef233c]`); sub `text-xl text-zinc-400` = "Join the waitlist today and get early access to the next generation of design tools."; a form (`max-w-md`, flex col → sm:row, gap-4): email input `bg-white/5 border border-white/10 rounded-full px-6 py-4` with `focus:border-[#ef233c]`, and a "Join Now" submit button `bg-[#ef233c] hover:bg-red-700 rounded-full`.

## FOOTER (`bg-black border-t border-zinc-900 pt-20 pb-10`)

`max-w-7xl grid md:grid-cols-4 gap-12`:
- Col span 2: diamond + "Superdesign" (`text-2xl font-bold font-manrope`) and tagline "Pioneering the future of digital product design with artificial intelligence and human-centered design principles." (`text-zinc-500 max-w-xs`).
- **Platform** (heading `text-xs font-bold text-[#ef233c] uppercase tracking-widest`): Features, Integrations, Pricing, Docs.
- **Company**: About Us, Careers, Blog, Legal.
All link text `text-zinc-400 text-sm hover:text-white`.
Then a giant outlined wordmark: `text-[15vw] leading-none font-bold font-manrope tracking-tighter` "SUPERDESIGN" with `-webkit-text-stroke: 1px rgba(255,255,255,0.1); color: transparent`, `opacity-20`, non-interactive.
Bottom bar (`border-t border-zinc-900 pt-8`, `text-zinc-600 text-[10px] uppercase tracking-widest`): "© 2024 Superdesign AI Inc. All rights reserved." + Twitter / LinkedIn / GitHub links.

## INTERACTIONS / NOTES

- All hover transitions are smooth (`transition-all` / `transition-colors`, ~150–300ms).
- Continuous animations that must keep running: the two starfields, the navbar "Get Access" conic sweep (on hover), the shiny-cta border spin, the hero badge ping.
- Body must be `overflow-x-hidden`; sections stack vertically in document order: Hero → Bento → Testimonial → Pricing → Waitlist → Footer.
- Keep it a single static page (no routing, no backend); form/buttons are non-functional (visual only).

## AUTHORITATIVE REFERENCE MARKUP

The following Tailwind HTML is the exact reference output. Translate it faithfully into the React/TanStack/Tailwind stack (convert `iconify-icon` `lucide:*` to `lucide-react`, move the custom CSS into a stylesheet / Tailwind config, register the `@property --gradient-angle` and all keyframes). Match it 1:1.

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Superdesign AI | Design Intelligence</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Manrope:wght@200;400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --accent-red: #ef233c;
            --accent-red-glow: rgba(239, 35, 60, 0.5);
        }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes border-spin { from { --gradient-angle: 0deg; } to { --gradient-angle: 360deg; } }
        @keyframes shimmer { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes animStar { from { transform: translateY(0px); } to { transform: translateY(-2000px); } }
        @property --gradient-angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        .animate-fade-up { animation: fade-in-up 0.8s ease-out forwards; }
        .font-manrope { font-family: 'Manrope', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .shiny-cta {
            --gradient-angle: 0deg; position: relative; overflow: hidden; border-radius: 9999px; padding: 1rem 2.5rem;
            background: linear-gradient(#000000, #000000) padding-box,
            conic-gradient(from var(--gradient-angle), transparent 0%, #ef233c 5%, #ef233c 15%, #ef233c 30%, transparent 40%, transparent 100%) border-box;
            border: 2px solid transparent; cursor: pointer; isolation: isolate; animation: border-spin 2.5s linear infinite;
        }
        .shiny-cta::before {
            content: ''; position: absolute; inset: 0;
            background: radial-gradient(circle at 50% 50%, white 0.5px, transparent 0); background-size: 4px 4px; opacity: 0.1; z-index: 0;
        }
        .stars-1 { box-shadow: 234px 124px #fff, 654px 345px #fff, 876px 12px #fff, 1200px 800px #fff, 400px 1500px #fff, 1800px 200px #fff, 100px 1000px #fff, 900px 1900px #fff, 500px 600px #fff, 1400px 100px #fff, 300px 400px #fff, 1600px 1200px #fff; }
        .stars-2 { box-shadow: 123px 456px #fff, 789px 234px #fff, 456px 890px #fff, 1100px 300px #fff, 200px 1200px #fff, 1500px 500px #fff, 600px 1700px #fff, 1300px 900px #fff; }
        .gradient-blur {
            position: fixed; z-index: 40; inset: 0 0 auto 0; height: 120px; pointer-events: none;
            background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent); backdrop-filter: blur(8px);
            mask-image: linear-gradient(to bottom, black, transparent);
        }
        .selection-red::selection { background: #ef233c; color: white; }
        .text-stroke { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1); color: transparent; }
    </style>
</head>
<body class="selection-red">
    <div class="min-h-screen bg-black text-white font-inter relative overflow-x-hidden">
        <div class="fixed inset-0 z-0 pointer-events-none">
            <div class="absolute inset-0 bg-gradient-to-b from-[#1a0505] to-black"></div>
            <div class="absolute top-0 left-0 w-[1px] h-[1px] bg-transparent stars-1 animate-[animStar_50s_linear_infinite]"></div>
            <div class="absolute top-0 left-0 w-[2px] h-[2px] bg-transparent stars-2 animate-[animStar_80s_linear_infinite]"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px]"></div>
            <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_80%)]"></div>
        </div>
        <div class="gradient-blur"></div>
        <header class="fixed top-0 left-0 w-full z-50 pt-6 px-4">
            <nav class="max-w-5xl mx-auto flex items-center justify-between bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl">
                <div class="flex items-center gap-2">
                    <div class="w-5 h-5 bg-[#ef233c] rounded-sm rotate-45"></div>
                    <span class="text-lg font-bold font-manrope tracking-tight">Superdesign</span>
                </div>
                <div class="hidden md:flex items-center gap-8">
                    <a href="#" class="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Product</a>
                    <a href="#" class="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Solutions</a>
                    <a href="#" class="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Resources</a>
                    <a href="#" class="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</a>
                </div>
                <div class="flex items-center gap-4">
                    <a href="#" class="hidden md:block text-sm font-medium text-zinc-300 hover:text-white">Log In</a>
                    <button class="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white/5 px-6 py-2 transition-transform active:scale-95">
                        <span class="absolute inset-0 border border-white/10 rounded-full"></span>
                        <span class="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#ef233c_100%)] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        <span class="absolute inset-[1px] rounded-full bg-black"></span>
                        <span class="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                            Get Access <iconify-icon icon="lucide:arrow-right" class="w-3 h-3 group-hover:translate-x-0.5 transition-transform"></iconify-icon>
                        </span>
                    </button>
                </div>
            </nav>
        </header>
        <main class="relative z-10">
            <section class="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
                <div class="text-center max-w-5xl mx-auto">
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-up" style="animation-delay: 0.1s;">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-[#ef233c]"></span>
                        </span>
                        <span class="text-xs font-medium text-red-100/90 tracking-wide font-manrope">Superdesign AI 2.0 is now live</span>
                        <iconify-icon icon="lucide:arrow-right" class="w-3 h-3 text-red-400"></iconify-icon>
                    </div>
                    <h1 class="text-6xl md:text-8xl font-semibold tracking-tighter font-manrope leading-[1.1] mb-8 animate-fade-up" style="animation-delay: 0.2s;">
                        <span class="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">Design Intelligence</span>
                        <span class="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
                            for the <span class="text-[#ef233c] inline-block relative">Future
                                <svg class="absolute w-full h-3 -bottom-2 left-0 text-[#ef233c] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="2" fill="none" />
                                </svg>
                            </span>
                        </span>
                    </h1>
                    <p class="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up" style="animation-delay: 0.3s;">Superdesign blends advanced generative algorithms with human creativity to ship world-class products 10x faster.</p>
                    <div class="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-up" style="animation-delay: 0.4s;">
                        <button class="shiny-cta group">
                            <span class="relative z-10 flex items-center gap-2 text-white font-medium">Start Creating <iconify-icon icon="lucide:arrow-right" class="transition-transform group-hover:translate-x-1"></iconify-icon></span>
                        </button>
                        <button class="group px-8 py-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-2">
                            <iconify-icon icon="lucide:github" class="w-5 h-5"></iconify-icon> View on GitHub
                        </button>
                    </div>
                </div>
                <div class="w-full mt-32 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm py-10 opacity-60 hover:opacity-100 transition-opacity">
                    <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <p class="text-sm font-bold tracking-widest text-zinc-500 uppercase shrink-0">Integrated with:</p>
                        <div class="flex flex-wrap justify-center gap-8 md:gap-16 items-center w-full">
                            <div class="flex items-center gap-2 font-manrope font-semibold"><div class="w-6 h-6 bg-white/20 rounded-full"></div>OpenAI</div>
                            <div class="flex items-center gap-2 font-manrope font-semibold"><div class="w-6 h-6 bg-white/20 rounded-full"></div>Figma</div>
                            <div class="flex items-center gap-2 font-manrope font-semibold"><div class="w-6 h-6 bg-white/20 rounded-full"></div>React</div>
                            <div class="flex items-center gap-2 font-manrope font-semibold"><div class="w-6 h-6 bg-white/20 rounded-full"></div>Vercel</div>
                            <div class="flex items-center gap-2 font-manrope font-semibold"><div class="w-6 h-6 bg-white/20 rounded-full"></div>Stripe</div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="py-32 px-6">
                <div class="max-w-7xl mx-auto">
                    <div class="mb-20 text-center max-w-3xl mx-auto animate-fade-up">
                        <h2 class="text-4xl md:text-5xl font-semibold text-white tracking-tight font-manrope mb-6">The Operating System for <br /><span class="text-[#ef233c]">Modern Design Teams</span></h2>
                        <p class="text-lg text-zinc-400 font-light">Replace your fragmented toolset with one cohesive platform driven by AI.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-auto lg:h-[700px]">
                        <div class="lg:col-span-2 lg:row-span-2 group relative overflow-hidden p-8 border border-white/10 bg-gradient-to-b from-zinc-900/50 to-black hover:border-white/20 transition-all rounded-xl">
                            <div class="relative z-10 h-full flex flex-col">
                                <div class="mb-6 inline-flex p-3 rounded-lg bg-white/5 border border-white/10 text-[#ef233c]"><iconify-icon icon="lucide:bot" class="w-6 h-6"></iconify-icon></div>
                                <h3 class="text-3xl font-semibold text-white font-manrope mb-4 tracking-tight">Generative UI Systems</h3>
                                <p class="text-zinc-400 text-lg leading-relaxed">Instantly generate comprehensive design systems from a single prompt. Colors, typography, and components are automatically created and documented with industry standards in mind.</p>
                                <div class="mt-auto flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    <span class="text-xs font-mono text-[#ef233c]">EXPLORE FEATURE</span>
                                    <iconify-icon icon="lucide:arrow-right" class="w-4 h-4 text-[#ef233c]"></iconify-icon>
                                </div>
                            </div>
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" style="background: radial-gradient(circle at top right, #ef233c, transparent 70%);"></div>
                        </div>
                        <div class="lg:col-span-2 group relative overflow-hidden p-8 border border-white/10 bg-black hover:border-white/20 transition-all rounded-xl">
                            <div class="relative z-10 flex flex-col h-full">
                                <div class="mb-4 inline-flex p-3 rounded-lg bg-white/5 border border-white/10 text-blue-400"><iconify-icon icon="lucide:code" class="w-6 h-6"></iconify-icon></div>
                                <h3 class="text-2xl font-semibold text-white font-manrope mb-2">Code Export</h3>
                                <p class="text-zinc-400">Production-ready React & Tailwind code, shipped directly to your repo with zero friction.</p>
                            </div>
                            <div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" style="background: radial-gradient(circle at top right, #3b82f6, transparent 70%);"></div>
                        </div>
                        <div class="group relative overflow-hidden p-8 border border-white/10 bg-black hover:border-white/20 transition-all rounded-xl">
                            <div class="relative z-10">
                                <div class="mb-4 inline-flex p-3 rounded-lg bg-white/5 border border-white/10 text-yellow-400"><iconify-icon icon="lucide:zap" class="w-6 h-6"></iconify-icon></div>
                                <h3 class="text-xl font-semibold text-white font-manrope mb-2">Smart Iteration</h3>
                                <p class="text-sm text-zinc-400">A/B test variations generated by AI based on real user data.</p>
                            </div>
                        </div>
                        <div class="group relative overflow-hidden p-8 border border-white/10 bg-black hover:border-white/20 transition-all rounded-xl">
                            <div class="relative z-10">
                                <div class="mb-4 inline-flex p-3 rounded-lg bg-white/5 border border-white/10 text-purple-400"><iconify-icon icon="lucide:layers" class="w-6 h-6"></iconify-icon></div>
                                <h3 class="text-xl font-semibold text-white font-manrope mb-2">Team Sync</h3>
                                <p class="text-sm text-zinc-400">Real-time collaboration with automated version control.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="w-full bg-[#ef233c] py-20 px-6">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="flex justify-center gap-1 text-black mb-6">
                        <iconify-icon icon="lucide:star" class="w-6 h-6" fill="currentColor"></iconify-icon>
                        <iconify-icon icon="lucide:star" class="w-6 h-6" fill="currentColor"></iconify-icon>
                        <iconify-icon icon="lucide:star" class="w-6 h-6" fill="currentColor"></iconify-icon>
                        <iconify-icon icon="lucide:star" class="w-6 h-6" fill="currentColor"></iconify-icon>
                        <iconify-icon icon="lucide:star" class="w-6 h-6" fill="currentColor"></iconify-icon>
                    </div>
                    <h3 class="text-3xl md:text-5xl font-bold text-black font-manrope leading-tight mb-8">"Superdesign has completely transformed how we ship products. What used to take weeks now takes hours."</h3>
                    <div class="flex items-center justify-center gap-4">
                        <div class="w-12 h-12 bg-black rounded-full overflow-hidden flex items-center justify-center"><iconify-icon icon="lucide:user" class="text-white w-6 h-6"></iconify-icon></div>
                        <div class="text-left">
                            <div class="text-black font-bold text-lg">Alex Morgan</div>
                            <div class="text-black/70 font-medium">CPO at TechFlow</div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="py-32 px-6 bg-black relative border-t border-white/5">
                <div class="max-w-7xl mx-auto">
                    <div class="text-center mb-20">
                        <h2 class="text-4xl md:text-5xl font-semibold text-white font-manrope mb-4">Simple, Transparent Pricing</h2>
                        <p class="text-zinc-400">Start for free, scale as you grow.</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="p-8 border border-zinc-800 bg-black hover:border-zinc-700 transition-all rounded-xl flex flex-col">
                            <h3 class="text-xl font-bold font-manrope mb-2">Starter</h3>
                            <p class="text-zinc-500 text-sm mb-8 h-10">For individuals exploring AI design possibilities.</p>
                            <div class="mb-8 flex items-baseline gap-1"><span class="text-zinc-500">$</span><span class="text-5xl font-bold text-white">0</span><span class="text-zinc-500 text-sm">/mo</span></div>
                            <ul class="space-y-4 mb-8 flex-1">
                                <li class="flex items-center gap-3 text-sm text-zinc-300"><iconify-icon icon="lucide:check" class="text-[#ef233c]"></iconify-icon> 1 Project</li>
                                <li class="flex items-center gap-3 text-sm text-zinc-300"><iconify-icon icon="lucide:check" class="text-[#ef233c]"></iconify-icon> Basic AI Generation</li>
                                <li class="flex items-center gap-3 text-sm text-zinc-300"><iconify-icon icon="lucide:check" class="text-[#ef233c]"></iconify-icon> Community Support</li>
                            </ul>
                            <button class="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-sm font-bold uppercase tracking-wider transition-all">Get Started</button>
                        </div>
                        <div class="relative p-8 border border-[#ef233c] bg-zinc-900/40 shadow-[0_0_30px_rgba(239,35,60,0.1)] rounded-xl flex flex-col scale-105 z-10">
                            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ef233c] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Recommended</div>
                            <h3 class="text-xl font-bold font-manrope mb-2">Pro</h3>
                            <p class="text-zinc-400 text-sm mb-8 h-10">For professional designers and high-growth freelancers.</p>
                            <div class="mb-8 flex items-baseline gap-1"><span class="text-zinc-500">$</span><span class="text-5xl font-bold text-white">49</span><span class="text-zinc-500 text-sm">/mo</span></div>
                            <ul class="space-y-4 mb-8 flex-1">
                                <li class="flex items-center gap-3 text-sm text-zinc-300"><iconify-icon icon="lucide:check" class="text-[#ef233c]"></iconify-icon> Unlimited Projects</li>
                                <li class="flex items-center gap-3 text-sm text-zinc-300"><iconify-icon icon="lucide:check" class="text-[#ef233c]"></iconify-icon> Advanced AI Models</li>
                                <li class="flex items-center gap-3 text-sm text-zinc-300"><iconify-icon icon="lucide:check" class="text-[#ef233c]"></iconify-icon> Direct Code Export</li>
                                <li class="flex items-center gap-3 text-sm text-zinc-300"><iconify-icon icon="lucide:check" class="text-[#ef233c]"></iconify-icon> Priority Support</li>
                            </ul>
                            <button class="w-full py-3 px-4 bg-[#ef233c] hover:bg-red-700 text-white rounded-lg text-sm font-bold uppercase tracking-wider transition-all">Go Pro</button>
                        </div>
                        <div class="p-8 border border-zinc-800 bg-black hover:border-zinc-700 transition-all rounded-xl flex flex-col">
                            <h3 class="text-xl font-bold font-manrope mb-2">Team</h3>
                            <p class="text-zinc-500 text-sm mb-8 h-10">For scale-up design teams and creative agencies.</p>
                            <div class="mb-8 flex items-baseline gap-1"><span class="text-zinc-500">$</span><span class="text-5xl font-bold text-white">199</span><span class="text-zinc-500 text-sm">/mo</span></div>
                            <ul class="space-y-4 mb-8 flex-1">
                                <li class="flex items-center gap-3 text-sm text-zinc-300"><iconify-icon icon="lucide:check" class="text-[#ef233c]"></iconify-icon> Team Collaboration</li>
                                <li class="flex items-center gap-3 text-sm text-zinc-300"><iconify-icon icon="lucide:check" class="text-[#ef233c]"></iconify-icon> Custom Design Systems</li>
                                <li class="flex items-center gap-3 text-sm text-zinc-300"><iconify-icon icon="lucide:check" class="text-[#ef233c]"></iconify-icon> API Access & SSO</li>
                            </ul>
                            <button class="w-full py-3 px-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-sm font-bold uppercase tracking-wider transition-all">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </section>
            <section class="py-32 px-6 text-center bg-zinc-950/40">
                <div class="max-w-3xl mx-auto">
                    <h2 class="text-5xl md:text-7xl font-bold font-manrope mb-8 tracking-tighter">Ready to <span class="text-[#ef233c]">Build?</span></h2>
                    <p class="text-xl text-zinc-400 mb-12">Join the waitlist today and get early access to the next generation of design tools.</p>
                    <form class="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                        <input type="email" placeholder="Enter your email" class="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white focus:outline-none focus:border-[#ef233c] transition-all">
                        <button class="bg-[#ef233c] hover:bg-red-700 text-white font-bold rounded-full px-8 py-4 transition-all">Join Now</button>
                    </form>
                </div>
            </section>
        </main>
        <footer class="bg-black border-t border-zinc-900 pt-20 pb-10 relative overflow-hidden">
            <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 relative z-10">
                <div class="md:col-span-2">
                    <div class="flex items-center gap-2 mb-6"><div class="w-5 h-5 bg-[#ef233c] rounded-sm rotate-45"></div><span class="text-2xl font-bold font-manrope tracking-tight">Superdesign</span></div>
                    <p class="text-zinc-500 max-w-xs leading-relaxed">Pioneering the future of digital product design with artificial intelligence and human-centered design principles.</p>
                </div>
                <div>
                    <h4 class="text-xs font-bold text-[#ef233c] uppercase tracking-widest mb-6">Platform</h4>
                    <ul class="space-y-4 text-zinc-400 text-sm">
                        <li><a href="#" class="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Integrations</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Pricing</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Docs</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xs font-bold text-[#ef233c] uppercase tracking-widest mb-6">Company</h4>
                    <ul class="space-y-4 text-zinc-400 text-sm">
                        <li><a href="#" class="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Legal</a></li>
                    </ul>
                </div>
            </div>
            <div class="flex justify-center items-center py-10 opacity-20 pointer-events-none">
                <h1 class="text-[15vw] leading-none font-bold font-manrope tracking-tighter text-stroke select-none">SUPERDESIGN</h1>
            </div>
            <div class="max-w-7xl mx-auto px-6 border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between text-zinc-600 text-[10px] uppercase tracking-widest">
                <p>&copy; 2024 Superdesign AI Inc. All rights reserved.</p>
                <div class="flex gap-6 mt-4 md:mt-0">
                    <a href="#" class="hover:text-zinc-400">Twitter</a>
                    <a href="#" class="hover:text-zinc-400">LinkedIn</a>
                    <a href="#" class="hover:text-zinc-400">GitHub</a>
                </div>
            </div>
        </footer>
    </div>
</body>
</html>
~~~

DELIVER A SAME-TO-SAME, PIXEL-FAITHFUL RECREATION. PLACE IT IN THE `templates` CATEGORY.
