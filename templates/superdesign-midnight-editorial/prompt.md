# SUPERDESIGN — "MIDNIGHT EDITORIAL" CREATIVE-AGENCY LANDING PAGE

BUILD A PIXEL-FAITHFUL, SINGLE-PAGE, DARK-MODE CREATIVE-AGENCY / PORTFOLIO LANDING PAGE FOR A FICTIONAL AI PRODUCT-DESIGN STUDIO CALLED **SUPERDESIGN**, USING THE **MIDNIGHT EDITORIAL** DESIGN LANGUAGE: A NEAR-BLACK `#050505` CANVAS, A SINGLE WARM CORAL `#FF6B50` ACCENT, MASSIVE EDITORIAL TYPE, AND A QUIET, GALLERY-LIKE LAYOUT. REPRODUCE THE REFERENCE SAME-TO-SAME — SAME COPY, SAME LAYOUT, SAME COLORS, SAME COMPONENTS, SAME HOVER MICRO-INTERACTIONS. SHIP IT SELF-CONTAINED AND RUNNABLE OFFLINE.

## REFERENCE

REFERENCE LIVE URL: `HTTPS://COMPONENT-FD7824AA-041A-4B80-9447-60E1F2383C37.PREVIEW.SUPERDESIGN.DEV/?PROJECTID=3CD61F6A-603D-4BCD-975E-793A92A52E5D`

THIS IS A REFERENCE IMPLEMENTATION OF **MIDNIGHT EDITORIAL STYLE**. THE STARTING HTML (TAILWIND CDN + ICONIFY) IS:

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Superdesign | AI Product Designer</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        @font-face {
            font-family: 'Satoshi';
            src: url('https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/4aed2f49-a476-436f-bae8-f31aa18f46fa/1767920861040-60c1c779/Satoshi-Variable.woff2') format('woff2');
            font-weight: 300 900;
            font-display: swap;
            font-style: normal;
        }

        :root {
            --font-satoshi: 'Satoshi', 'Inter', sans-serif;
            --color-bg: #050505;
            --color-accent: #FF6B50;
        }

        body {
            font-family: var(--font-satoshi);
            background-color: var(--color-bg);
            color: #ebebeb;
            scroll-behavior: smooth;
        }

        .selection-coral::selection {
            background-color: var(--color-accent);
            color: white;
        }

        .glass-nav {
            background: rgba(17, 17, 17, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hero-text {
            font-size: 13vw;
            line-height: 0.9;
            letter-spacing: -0.05em;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .animate-float {
            animation: float 4s ease-in-out infinite;
        }

        /* Scroll reveal simulation via intersection observer is typical but here we use utility classes for layout */
    </style>
</head>
<body>
    <div class="min-h-screen bg-[#050505] selection-coral overflow-x-hidden">

        <!-- Top Navigation -->
        <nav class="fixed top-0 left-0 right-0 z-[100] px-6 py-6 flex items-center justify-between text-sm font-medium tracking-tight">
            <div class="flex items-center gap-10">
                <a href="/" id="nav-logo" class="flex items-center group">
                    <div class="w-8 h-8 bg-white rounded flex items-center justify-center text-black font-extrabold text-xl transition-transform group-hover:rotate-12">S.</div>
                </a>

                <div class="hidden lg:flex items-center gap-8 text-[#888888]">
                    <a href="#" id="nav-home-link" class="hover:text-white transition-colors">Home</a>
                    <a href="#" id="nav-about-link" class="hover:text-white transition-colors">About</a>
                    <a href="#" id="nav-work-link" class="hover:text-white transition-colors">Our Work</a>
                    <a href="#" id="nav-contact-link" class="hover:text-white transition-colors">Contact</a>
                </div>
            </div>

            <div class="flex items-center gap-8">
                <a href="#" id="nav-journal-link" class="hidden md:block text-[#888888] hover:text-white transition-colors">Our journal</a>
                <a href="#" id="nav-cta-btn" class="px-5 py-2.5 bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#333333] rounded-lg transition-all duration-300">
                    Get started
                </a>
            </div>
        </nav>

        <!-- Floating Bottom Navigation -->
        <div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] hidden md:flex items-center gap-2 p-2 glass-nav rounded-2xl shadow-2xl">
            <div class="flex items-center gap-1 pr-4 border-r border-[#333333]">
                <button class="p-3 hover:bg-[#222222] rounded-xl transition-all group relative" title="Dashboard">
                    <iconify-icon icon="lucide:layout-grid" class="text-xl text-white"></iconify-icon>
                </button>
                <button class="p-3 hover:bg-[#222222] rounded-xl transition-all group relative" title="Global">
                    <iconify-icon icon="lucide:globe" class="text-xl text-white"></iconify-icon>
                </button>
                <button class="p-3 hover:bg-[#222222] rounded-xl transition-all group relative" title="Mobile">
                    <iconify-icon icon="lucide:smartphone" class="text-xl text-white"></iconify-icon>
                </button>
                <button class="p-3 hover:bg-[#222222] rounded-xl transition-all group relative" title="Services">
                    <iconify-icon icon="lucide:package" class="text-xl text-white"></iconify-icon>
                </button>
                <button class="p-3 hover:bg-[#222222] rounded-xl transition-all group relative" title="Announcements">
                    <iconify-icon icon="lucide:megaphone" class="text-xl text-white"></iconify-icon>
                </button>
            </div>
            <a href="#contact" id="floating-contact-btn" class="px-6 py-3 bg-[#FF6B50] hover:bg-[#E55A40] text-black font-bold text-sm tracking-wide uppercase rounded-xl transition-all">
                Contact
            </a>
        </div>

        <!-- Hero Section -->
        <header class="relative h-screen w-full flex flex-col items-center justify-center">
            <div class="absolute inset-0 z-0 pointer-events-none">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#050505_70%)] opacity-60"></div>
            </div>

            <div class="relative z-10">
                <h1 class="hero-text font-bold text-white text-center italic-none">
                    /design
                </h1>
            </div>

            <!-- Bottom UI Overlays -->
            <div class="absolute bottom-12 left-8 md:left-12 flex items-center gap-5 group">
                <div class="flex -space-x-4">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" alt="Team member" class="w-10 h-10 rounded-full border-2 border-[#050505] object-cover grayscale group-hover:grayscale-0 transition-all">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop" alt="Team member" class="w-10 h-10 rounded-full border-2 border-[#050505] object-cover grayscale group-hover:grayscale-0 transition-all delay-75">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" alt="Team member" class="w-10 h-10 rounded-full border-2 border-[#050505] object-cover grayscale group-hover:grayscale-0 transition-all delay-150">
                </div>
                <p class="text-xs md:text-sm font-medium leading-tight text-[#888888] group-hover:text-white transition-colors">
                    Designing the<br/>future, today.
                </p>
            </div>

            <div class="absolute bottom-12 right-8 md:right-12 text-right">
                <a href="mailto:hello@superdesign.dev" id="hero-email-link" class="text-white font-medium hover:text-[#FF6B50] transition-colors border-b-2 border-white hover:border-[#FF6B50] pb-1">
                    hello@superdesign.dev
                </a>
            </div>
        </header>

        <!-- Benefits Section -->
        <section class="py-32 px-6 md:px-12 max-w-7xl mx-auto">
            <div class="flex items-center gap-3 mb-10">
                <div class="w-2 h-2 rounded-full bg-[#FF6B50] animate-pulse"></div>
                <span class="text-[10px] font-bold tracking-[0.3em] text-[#666666] uppercase">Why launch slow when you can move fast?</span>
            </div>

            <h2 class="text-4xl md:text-7xl font-medium leading-[1.05] tracking-tight text-white max-w-5xl mb-24">
                Clean, scalable design that helps you <span class="text-[#666666]">ship faster</span> and grow your revenue.
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Benefit Card 1 -->
                <div class="bg-[#111111] rounded-[2.5rem] p-12 min-h-[520px] flex flex-col justify-between relative overflow-hidden group hover:bg-[#161616] transition-all duration-500">
                    <div class="absolute top-10 right-10 bg-[#1a1a1a] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest text-[#888888] border border-[#333333]">
                        Hyper-Growth
                    </div>

                    <div class="mt-auto">
                        <h3 class="text-5xl md:text-7xl font-semibold tracking-tighter mb-2 text-white">
                            Start faster.
                        </h3>
                        <h3 class="text-5xl md:text-7xl font-semibold tracking-tighter text-[#444444] group-hover:text-[#666666] transition-colors">
                            Earn sooner.
                        </h3>
                    </div>
                </div>

                <!-- Benefit Card 2 -->
                <div class="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-[2.5rem] p-8 md:p-12 min-h-[520px] flex items-center justify-center relative overflow-hidden group">
                    <!-- Browser Mockup Representation -->
                    <div class="w-full max-w-md bg-[#e5e5e5] rounded-xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-700 ease-out">
                        <div class="bg-[#f5f5f5] px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                            <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                            <div class="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                            <div class="ml-4 h-3 w-32 bg-gray-200 rounded-full"></div>
                        </div>
                        <div class="aspect-video bg-gray-100 relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="Dashboard preview" class="w-full h-full object-cover">
                            <div class="absolute inset-0 bg-black/20"></div>
                            <div class="absolute bottom-6 left-6 text-white">
                                <div class="text-[10px] font-bold uppercase tracking-widest mb-1">Enterprise Edition</div>
                                <div class="text-lg font-bold">Analytics v4.0</div>
                            </div>
                        </div>
                    </div>
                    <div class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
            </div>
        </section>

        <!-- Work Gallery -->
        <section id="work" class="py-32 px-6 md:px-12 max-w-7xl mx-auto">
            <div class="flex justify-between items-end mb-20 border-b border-[#222222] pb-10">
                <h2 class="text-xs font-bold tracking-[0.4em] uppercase text-[#FF6B50]">Selected Work</h2>
                <span class="hidden md:block text-[#444444] text-xs font-medium uppercase tracking-widest">Volume 01 &mdash; 2024</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">

                <!-- Project 1 -->
                <article class="group cursor-pointer">
                    <div class="aspect-[4/3] overflow-hidden bg-[#111111] rounded-sm">
                        <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop" alt="Nebula Project" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                    </div>
                    <div class="mt-8 flex justify-between items-start">
                        <div>
                            <h3 class="text-3xl font-bold tracking-tight mb-2 group-hover:text-[#FF6B50] transition-colors">NEBULA</h3>
                            <p class="text-[#666666] text-[10px] font-bold uppercase tracking-[0.2em]">Brand Identity / AI</p>
                        </div>
                        <div class="p-3 rounded-full border border-[#333333] group-hover:bg-[#FF6B50] group-hover:text-black group-hover:border-transparent transition-all duration-300">
                            <iconify-icon icon="lucide:arrow-up-right" class="text-2xl"></iconify-icon>
                        </div>
                    </div>
                </article>

                <!-- Project 2 -->
                <article class="group cursor-pointer md:mt-24">
                    <div class="aspect-[4/3] overflow-hidden bg-[#111111] rounded-sm">
                        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" alt="Quantum Project" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                    </div>
                    <div class="mt-8 flex justify-between items-start">
                        <div>
                            <h3 class="text-3xl font-bold tracking-tight mb-2 group-hover:text-[#FF6B50] transition-colors">QUANTUM</h3>
                            <p class="text-[#666666] text-[10px] font-bold uppercase tracking-[0.2em]">Web Design / Fintech</p>
                        </div>
                        <div class="p-3 rounded-full border border-[#333333] group-hover:bg-[#FF6B50] group-hover:text-black group-hover:border-transparent transition-all duration-300">
                            <iconify-icon icon="lucide:arrow-up-right" class="text-2xl"></iconify-icon>
                        </div>
                    </div>
                </article>

                <!-- Project 3 -->
                <article class="group cursor-pointer">
                    <div class="aspect-[4/3] overflow-hidden bg-[#111111] rounded-sm">
                        <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop" alt="Echo Project" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                    </div>
                    <div class="mt-8 flex justify-between items-start">
                        <div>
                            <h3 class="text-3xl font-bold tracking-tight mb-2 group-hover:text-[#FF6B50] transition-colors">ECHO</h3>
                            <p class="text-[#666666] text-[10px] font-bold uppercase tracking-[0.2em]">Art Direction / Media</p>
                        </div>
                        <div class="p-3 rounded-full border border-[#333333] group-hover:bg-[#FF6B50] group-hover:text-black group-hover:border-transparent transition-all duration-300">
                            <iconify-icon icon="lucide:arrow-up-right" class="text-2xl"></iconify-icon>
                        </div>
                    </div>
                </article>

                <!-- Project 4 -->
                <article class="group cursor-pointer md:mt-24">
                    <div class="aspect-[4/3] overflow-hidden bg-[#111111] rounded-sm">
                        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop" alt="Flux Project" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
                    </div>
                    <div class="mt-8 flex justify-between items-start">
                        <div>
                            <h3 class="text-3xl font-bold tracking-tight mb-2 group-hover:text-[#FF6B50] transition-colors">FLUX</h3>
                            <p class="text-[#666666] text-[10px] font-bold uppercase tracking-[0.2em]">Development / SaaS</p>
                        </div>
                        <div class="p-3 rounded-full border border-[#333333] group-hover:bg-[#FF6B50] group-hover:text-black group-hover:border-transparent transition-all duration-300">
                            <iconify-icon icon="lucide:arrow-up-right" class="text-2xl"></iconify-icon>
                        </div>
                    </div>
                </article>

            </div>
        </section>

        <!-- CTA / Footer Section -->
        <footer id="contact" class="relative pt-48 pb-32 px-6 md:px-12 border-t border-[#1a1a1a]">
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">

                <div class="flex-1">
                    <h2 class="text-[14vw] md:text-[10vw] leading-[0.85] font-black tracking-tighter text-white mb-12 select-none">
                        LET'S<br />TALK.
                    </h2>
                    <div class="flex flex-col gap-6">
                        <a href="mailto:hello@superdesign.dev" id="footer-email-link" class="text-3xl md:text-4xl font-semibold hover:text-[#FF6B50] transition-all w-fit">
                            hello@superdesign.dev
                        </a>
                        <p class="text-[#666666] flex items-center gap-2">
                            <iconify-icon icon="lucide:map-pin"></iconify-icon>
                            Available for worldwide collaborations.
                        </p>
                    </div>
                </div>

                <div class="flex gap-4 md:mb-6">
                    <a href="#" id="social-ig" class="w-14 h-14 border border-[#333333] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-2">
                        <iconify-icon icon="lucide:instagram" class="text-xl"></iconify-icon>
                    </a>
                    <a href="#" id="social-tw" class="w-14 h-14 border border-[#333333] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-2">
                        <iconify-icon icon="lucide:twitter" class="text-xl"></iconify-icon>
                    </a>
                    <a href="#" id="social-li" class="w-14 h-14 border border-[#333333] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-2">
                        <iconify-icon icon="lucide:linkedin" class="text-xl"></iconify-icon>
                    </a>
                    <a href="#" id="social-web" class="w-14 h-14 border border-[#333333] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all hover:-translate-y-2">
                        <iconify-icon icon="lucide:globe" class="text-xl"></iconify-icon>
                    </a>
                </div>
            </div>

            <div class="max-w-7xl mx-auto mt-40 pt-10 border-t border-[#111111] flex flex-col md:flex-row justify-between text-[#333333] text-[10px] font-bold uppercase tracking-widest">
                <p>&copy; 2024 Superdesign Agency. All rights reserved.</p>
                <div class="flex gap-10 mt-6 md:mt-0">
                    <a href="#" id="footer-privacy" class="hover:text-[#666666] transition-colors">Privacy Policy</a>
                    <a href="#" id="footer-terms" class="hover:text-[#666666] transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>

    </div>
</body>
</html>
~~~

PLEASE USE THE ABOVE AS REFERENCE AND APPLY TO OUR CONTEXT.

# SUMMARY

A SINGLE, VERTICALLY-SCROLLING, DARK CREATIVE-AGENCY LANDING PAGE WITH AN EDITORIAL, GALLERY-LIKE FEEL. SECTIONS IN ORDER (TOP TO BOTTOM): FIXED TOP NAV → FLOATING GLASS BOTTOM DOCK → FULL-VIEWPORT TYPOGRAPHIC HERO (THE WORD `/design` AT ~13VW) WITH TWO BOTTOM-CORNER OVERLAYS → "WHY LAUNCH SLOW" BENEFITS SECTION (TWO-CARD GRID: A DARK "START FASTER. EARN SOONER." CARD AND AN INDIGO→VIOLET GRADIENT CARD HOLDING A BROWSER MOCKUP) → "SELECTED WORK" STAGGERED GALLERY OF FOUR PROJECTS (NEBULA, QUANTUM, ECHO, FLUX) → GIANT "LET'S TALK." CTA / FOOTER WITH SOCIAL ICONS AND A LEGAL BAR. TAB TITLE: `Superdesign | AI Product Designer`.

# STYLE

MIDNIGHT EDITORIAL: NEAR-BLACK CANVAS, ONE WARM CORAL ACCENT, AND OVERSIZED EDITORIAL TYPOGRAPHY WITH GENEROUS NEGATIVE SPACE. RESTRAINED MOTION — EVERYTHING IS DRIVEN BY HOVER MICRO-INTERACTIONS AND ONE GENTLE FLOAT KEYFRAME, NOT BUSY SCROLL CHOREOGRAPHY. THE FEELING IS A QUIET HIGH-END PORTFOLIO / PRINT EDITORIAL, NOT A FLASHY SAAS PAGE.

## SPEC (EXACT VALUES)

- **PAGE BACKGROUND:** `#050505` (NEAR BLACK). BODY TEXT `#EBEBEB`. ROOT WRAPPER `MIN-H-SCREEN BG-[#050505] OVERFLOW-X-HIDDEN`, `SCROLL-BEHAVIOR: SMOOTH`.
- **ACCENT:** CORAL `#FF6B50` (HOVER/DARKER ON THE DOCK CONTACT BUTTON `#E55A40`). TEXT SELECTION IS STYLED CORAL: `::SELECTION { BACKGROUND:#FF6B50; COLOR:WHITE }`.
- **SECONDARY / MUTED COLORS:** MUTED TEXT `#888888` AND `#666666`; FAINT TEXT/BORDERS `#444444`, `#333333`, `#222222`, `#1A1A1A`, `#111111`. SURFACES: BENEFIT CARD 1 `#111111` (HOVER `#161616`), GRADIENT CARD `LINEAR-GRADIENT(TO BR, #4F46E5 → #7C3AED)`, PROJECT IMAGE FRAMES `#111111`.
- **TYPOGRAPHY:** PRIMARY FONT IS **SATOSHI** (VARIABLE, WEIGHTS 300–900) WITH **INTER** AS THE FALLBACK STACK (`--FONT-SATOSHI: 'SATOSHI','INTER',SANS-SERIF`). HEADINGS USE TIGHT/TIGHTER TRACKING. THE HERO WORD AND THE "LET'S TALK." FOOTER ARE THE TWO TYPOGRAPHIC ANCHORS.
- **HERO TYPE:** CLASS `.hero-text` = `FONT-SIZE: 13VW; LINE-HEIGHT: 0.9; LETTER-SPACING: -0.05EM;`, BOLD, WHITE, CENTERED; THE LITERAL TEXT IS `/design`.
- **GLASS DOCK:** `.glass-nav` = `BACKGROUND: RGBA(17,17,17,0.8); BACKDROP-FILTER: BLUR(12PX); BORDER: 1PX SOLID RGBA(255,255,255,0.1)`.
- **FLOAT KEYFRAME:** `@KEYFRAMES FLOAT { 0%,100% { TRANSLATEY(0) } 50% { TRANSLATEY(-10PX) } }`; `.animate-float` = `FLOAT 4S EASE-IN-OUT INFINITE`.
- **ICONS:** USE LUCIDE ICONS (REFERENCE USES `lucide:*` VIA ICONIFY): `layout-grid`, `globe`, `smartphone`, `package`, `megaphone` (DOCK); `arrow-up-right` (PROJECT CARDS); `map-pin`, `instagram`, `twitter`, `linkedin`, `globe` (FOOTER).
- **RADII:** GLASS DOCK `ROUNDED-2XL`; BENEFIT CARDS `ROUNDED-[2.5REM]`; PROJECT FRAMES `ROUNDED-SM`; SOCIAL BUTTONS FULLY ROUND.

# LAYOUT & STRUCTURE (TOP TO BOTTOM)

## 1. FIXED TOP NAV (`Z-[100]`)
- `FIXED TOP-0 LEFT-0 RIGHT-0 PX-6 PY-6 FLEX ITEMS-CENTER JUSTIFY-BETWEEN`, `TEXT-SM FONT-MEDIUM TRACKING-TIGHT`.
- LEFT: LOGO MARK = `W-8 H-8 BG-WHITE ROUNDED` SQUARE WITH BLACK `S.` (FONT-EXTRABOLD), `GROUP-HOVER:ROTATE-12`. THEN A `HIDDEN LG:FLEX` LINK GROUP IN `#888888`: **Home · About · Our Work · Contact** (HOVER → WHITE).
- RIGHT: `HIDDEN MD:BLOCK` **Our journal** LINK (`#888888` → WHITE), THEN A **Get started** PILL: `PX-5 PY-2.5 BG-[#1A1A1A] BORDER-[#333333] ROUNDED-LG`, HOVER INVERTS TO `BG-WHITE TEXT-BLACK`.

## 2. FLOATING BOTTOM DOCK (`Z-[110]`, `HIDDEN MD:FLEX`)
- `FIXED BOTTOM-8 LEFT-1/2 -TRANSLATE-X-1/2`, `GLASS-NAV ROUNDED-2XL SHADOW-2XL P-2`, FLEX ROW.
- LEFT CLUSTER: FIVE ICON BUTTONS (`P-3 HOVER:BG-[#222222] ROUNDED-XL`, `title=` TOOLTIPS: DASHBOARD/GLOBAL/MOBILE/SERVICES/ANNOUNCEMENTS) WITH A RIGHT DIVIDER `BORDER-R BORDER-[#333333] PR-4`.
- RIGHT: CORAL **Contact** BUTTON (`PX-6 PY-3 BG-[#FF6B50] HOVER:BG-[#E55A40] TEXT-BLACK FONT-BOLD UPPERCASE TRACKING-WIDE ROUNDED-XL`) LINKING TO `#contact`.

## 3. HERO (`H-SCREEN`, FLEX COLUMN CENTERED)
- BACKGROUND LAYER: ABSOLUTE INSET RADIAL GRADIENT `RADIAL-GRADIENT(CIRCLE AT CENTER, #1A1A1A 0%, #050505 70%)` AT `OPACITY-60`, POINTER-EVENTS NONE.
- CENTER: THE `.hero-text` WORD `/design` (BOLD WHITE).
- BOTTOM-LEFT OVERLAY (`BOTTOM-12 LEFT-8 MD:LEFT-12`, A HOVER `GROUP`): THREE OVERLAPPING `-SPACE-X-4` ROUND AVATARS (`W-10 H-10`, `BORDER-2 BORDER-[#050505]`, `GRAYSCALE` → `GRAYSCALE-0` ON GROUP HOVER WITH STAGGERED `DELAY-75/150`) NEXT TO TWO-LINE COPY "Designing the / future, today." (`#888888` → WHITE ON HOVER).
- BOTTOM-RIGHT OVERLAY (`BOTTOM-12 RIGHT-8 MD:RIGHT-12`): EMAIL LINK `hello@superdesign.dev` (WHITE, `BORDER-B-2 BORDER-WHITE`, HOVER → CORAL TEXT + CORAL BORDER).

## 4. BENEFITS SECTION (`PY-32 PX-6 MD:PX-12 MAX-W-7XL MX-AUTO`)
- EYEBROW ROW: A PULSING CORAL DOT (`W-2 H-2 ROUNDED-FULL BG-[#FF6B50] ANIMATE-PULSE`) + UPPERCASE LABEL "Why launch slow when you can move fast?" (`TEXT-[10PX] FONT-BOLD TRACKING-[0.3EM] TEXT-[#666666]`).
- HEADLINE: `TEXT-4XL MD:TEXT-7XL FONT-MEDIUM LEADING-[1.05] MAX-W-5XL` — "Clean, scalable design that helps you **ship faster** and grow your revenue." WHERE "ship faster" IS WRAPPED IN `TEXT-[#666666]`.
- TWO-CARD GRID (`MD:GRID-COLS-2 GAP-8`, EACH `MIN-H-[520PX]`):
  - CARD 1 (`BG-[#111111] ROUNDED-[2.5REM] P-12`, HOVER `BG-[#161616]`): A TOP-RIGHT PILL BADGE "Hyper-Growth" (`BG-[#1A1A1A] BORDER-[#333333] ROUNDED-FULL UPPERCASE`), AND BOTTOM-ANCHORED STACKED HEADINGS "Start faster." (WHITE) / "Earn sooner." (`#444444` → `#666666` ON HOVER), BOTH `TEXT-5XL MD:TEXT-7XL FONT-SEMIBOLD TRACKING-TIGHTER`.
  - CARD 2 (`BG-GRADIENT-TO-BR FROM-[#4F46E5] TO-[#7C3AED] ROUNDED-[2.5REM]`, CENTERED): A BROWSER MOCKUP CARD (`BG-[#E5E5E5] ROUNDED-XL`, `GROUP-HOVER:SCALE-105 DURATION-700`) WITH A `#F5F5F5` TITLE-BAR (RED/YELLOW/GREEN TRAFFIC-LIGHT DOTS + A FAKE URL PILL), AN `ASPECT-VIDEO` DASHBOARD IMAGE WITH A `BG-BLACK/20` SCRIM, AND OVERLAID LABELS "Enterprise Edition" / "Analytics v4.0". A `BG-WHITE/5` OVERLAY FADES IN ON HOVER.

## 5. SELECTED WORK GALLERY (`#work`, `PY-32 ... MAX-W-7XL`)
- HEADER ROW (`BORDER-B BORDER-[#222222] PB-10`): CORAL UPPERCASE "Selected Work" (`TRACKING-[0.4EM]`) ON THE LEFT, AND `HIDDEN MD:BLOCK` "Volume 01 — 2024" (`#444444`, UPPERCASE) ON THE RIGHT.
- FOUR PROJECTS IN A `MD:GRID-COLS-2 GAP-X-16 GAP-Y-32` GRID, WITH THE 2ND AND 4TH CARDS PUSHED DOWN VIA `MD:MT-24` FOR A STAGGERED EDITORIAL RHYTHM:
  - **NEBULA** — Brand Identity / AI
  - **QUANTUM** — Web Design / Fintech
  - **ECHO** — Art Direction / Media
  - **FLUX** — Development / SaaS
- EACH CARD: AN `ASPECT-[4/3]` IMAGE FRAME (`BG-[#111111] ROUNDED-SM`) WHOSE IMAGE SITS AT `OPACITY-60` AND ON HOVER GOES `OPACITY-100 SCALE-105 DURATION-700`; BELOW IT, A ROW WITH THE PROJECT NAME (`TEXT-3XL FONT-BOLD`, HOVER → CORAL) OVER A `TEXT-[10PX] UPPERCASE TRACKING-[0.2EM] #666666` CATEGORY, AND A ROUND `ARROW-UP-RIGHT` BUTTON (`BORDER-[#333333]`) THAT ON HOVER FILLS CORAL WITH BLACK ICON.

## 6. CTA / FOOTER (`#contact`, `PT-48 PB-32 ... BORDER-T BORDER-[#1A1A1A]`)
- LEFT: GIANT "LET'S / TALK." (`TEXT-[14VW] MD:TEXT-[10VW] LEADING-[0.85] FONT-BLACK TRACKING-TIGHTER`, TWO LINES, `SELECT-NONE`). BELOW IT, A LARGE EMAIL LINK `hello@superdesign.dev` (`TEXT-3XL MD:TEXT-4XL FONT-SEMIBOLD`, HOVER → CORAL) AND A `MAP-PIN` LINE "Available for worldwide collaborations." (`#666666`).
- RIGHT: FOUR ROUND SOCIAL BUTTONS (`W-14 H-14 BORDER-[#333333] ROUNDED-FULL`, ICONS INSTAGRAM/TWITTER/LINKEDIN/GLOBE) — HOVER → `BG-WHITE TEXT-BLACK -TRANSLATE-Y-2`.
- LEGAL BAR (`MT-40 PT-10 BORDER-T BORDER-[#111111]`, `TEXT-[10PX] UPPERCASE TRACKING-WIDEST TEXT-[#333333]`): "© 2024 Superdesign Agency. All rights reserved." ON THE LEFT, AND "Privacy Policy" / "Terms of Service" LINKS ON THE RIGHT (HOVER → `#666666`).

# IMPLEMENTATION NOTES

- SHIP AS A SINGLE SELF-CONTAINED, BUILD-FREE STATIC PAGE (`index.html`) THAT RUNS OFFLINE.
- VENDOR EVERYTHING LOCALLY INTO AN `assets/` FOLDER: THE **SATOSHI** VARIABLE WOFF2 FONT, ALL UNSPLASH IMAGES (THE THREE HERO AVATARS, THE DASHBOARD MOCKUP, AND THE FOUR PROJECT IMAGES), AND THE LUCIDE ICONS. PREFER INLINING ICONS AS LOCAL SVG (OR A LOCAL ICONIFY/LUCIDE BUNDLE) RATHER THAN HOTLINKING A CDN. REFERENCE ALL ASSETS BY RELATIVE LOCAL PATHS — NO REMOTE URLS AT RUNTIME.
- DO NOT RELY ON THE TAILWIND CDN AT RUNTIME: EITHER COMPILE THE UTILITIES OR HAND-WRITE THE EQUIVALENT CSS SO THE FONT-SIZES, COLORS, SPACING, RADII, AND ALL HOVER TRANSITIONS MATCH THE TOKENS ABOVE EXACTLY.
- KEEP ALL COPY, PROJECT NAMES, CATEGORIES, AND EMAIL/LEGAL TEXT VERBATIM. PRESERVE EVERY HOVER MICRO-INTERACTION (GRAYSCALE → COLOR AVATARS, CORAL TEXT/BORDER FLIPS, IMAGE OPACITY/SCALE, ARROW-BUTTON CORAL FILL, SOCIAL BUTTON LIFT, LOGO ROTATE).
- RESPONSIVE: HERO WORD AND FOOTER USE VIEWPORT-RELATIVE TYPE; THE TOP-NAV LINK GROUP IS `LG`-ONLY, "OUR JOURNAL" AND THE BOTTOM DOCK ARE `MD`-ONLY; THE TWO CONTENT GRIDS COLLAPSE TO A SINGLE COLUMN BELOW `MD`.
