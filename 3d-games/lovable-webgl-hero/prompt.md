# RECREATE THIS EXACT LOVABLE LANDING PAGE 1:1

RECREATE THIS EXACT LOVABLE LANDING PAGE 1:1. THIS IS NOT AN INSPIRATION REQUEST. DO NOT REDESIGN, SIMPLIFY, APPROXIMATE, SUBSTITUTE, GENERATE NEW IMAGES, OR CREATE A SIMILAR LANDING PAGE. BUILD THE EXACT SAME DESIGN, WEBGL HERO, NAV INTERACTIONS, PROMPT INPUT ANIMATION, AND TRUSTED-BY LOGO CAROUSEL DESCRIBED BELOW.

## CRITICAL REQUIREMENTS

- THE FIRST SCREEN MUST BE A BLACK FULL-VIEWPORT WEBGL HERO WITH THE REAL ANIMATED SHADER BEHIND THE CONTENT.
- THE WEBGL MUST USE THE EXACT CORERENDERER RUNTIME AND EXACT HERO PROJECT DATA LISTED IN THE ASSET MANIFEST. DO NOT REPLACE IT WITH CSS GRADIENTS, CANVAS NOISE, VIDEO, SVG, THREE.JS, OR A GENERATED IMAGE.
- THE USER MUST NOT PROVIDE FILES MANUALLY. YOU MUST CREATE THE FILES IN THE PROJECT AND FETCH/COPY THE EXACT ASSETS FROM THE ASSET MANIFEST INTO `public/vendor/` USING YOUR INTERNAL FILE TOOLS. DO NOT PASTE A BASH SCRIPT INTO THE APP OR ASK THE USER TO RUN ONE.
- USE TANSTACK START / REACT / TAILWIND V4 AS THE LOVABLE DEFAULT STACK.
- ADD `framer-motion` AND `lucide-react` IF THE PROJECT DOES NOT ALREADY HAVE THEM.
- REPLACE THE HOME ROUTE WITH THIS IMPLEMENTATION.
- KEEP ALL MEASUREMENTS, COLORS, TIMINGS, EASING, HOVER BEHAVIOR, AND ASSET PATHS EXACTLY AS SPECIFIED.

## ASSET MANIFEST — SAVE EACH ASSET UNDER `public/vendor/<filename>` WITH THE EXACT FILENAME

- `public/vendor/core-renderer.js` FROM `https://qclay.design/lovable/webgl/core-renderer.js`
- `public/vendor/hero-project.js` FROM `https://qclay.design/lovable/webgl/hero-project.js`
- `public/vendor/back-gl-3.png` FROM `https://qclay.design/lovable/webgl/back-gl-3.png`
- `public/vendor/back-gl.png` FROM `https://qclay.design/lovable/webgl/back-gl.png`
- `public/vendor/back-gl-2.png` FROM `https://qclay.design/lovable/webgl/back-gl-2.png`
- `public/vendor/logo.svg` FROM `https://qclay.design/lovable/webgl/logo.svg`
- `public/vendor/arrow-right.svg` FROM `https://qclay.design/lovable/webgl/arrow-right.svg`
- `public/vendor/arrow-up.svg` FROM `https://qclay.design/lovable/webgl/arrow-up.svg`
- `public/vendor/ai-select.svg` FROM `https://qclay.design/lovable/webgl/ai-select.svg`
- `public/vendor/dots.svg` FROM `https://qclay.design/lovable/webgl/dots.svg`
- `public/vendor/announcement.jpg` FROM `https://qclay.design/lovable/webgl/announcement.jpg`
- `public/vendor/logo-1.svg` FROM `https://qclay.design/lovable/webgl/logo-1.svg`
- `public/vendor/logo-2.svg` FROM `https://qclay.design/lovable/webgl/logo-2.svg`
- `public/vendor/logo-3.svg` FROM `https://qclay.design/lovable/webgl/logo-3.svg`
- `public/vendor/logo-4.svg` FROM `https://qclay.design/lovable/webgl/logo-4.svg`
- `public/vendor/logo-5.svg` FROM `https://qclay.design/lovable/webgl/logo-5.svg`
- `public/vendor/logo-6.svg` FROM `https://qclay.design/lovable/webgl/logo-6.svg`

## IMPORTANT ASSET RULES

- `core-renderer.js`, `hero-project.js`, AND `back-gl-3.png` ARE REQUIRED FOR THE WEBGL HERO.
- `hero-project.js` CONTAINS `/vendor/back-gl-3.png` REFERENCES, SO THE LOCAL PATH MUST EXIST EXACTLY.
- `dots.svg`, `arrow-up.svg`, AND `ai-select.svg` ARE REQUIRED FOR THE PROMPT SEND BUTTON.
- `logo.svg`, `arrow-right.svg`, AND `announcement.jpg` ARE REQUIRED FOR THE NAVBAR AND DROPDOWN.
- `logo-1.svg` THROUGH `logo-6.svg` ARE REQUIRED FOR THE ROTATING TRUSTED-BY CAROUSEL.
- DO NOT INLINE, REDRAW, COMPRESS, OR CONVERT THESE ASSETS.

## CREATE/REPLACE THESE FILES EXACTLY

FILE: `src/routes/index.tsx`

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import HeroShader from "@/components/HeroShader";
import HeroNavbar from "@/components/HeroNavbar";
import PromptInput from "@/components/PromptInput";
import SectionTrustedBy from "@/components/SectionTrustedBy";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative w-full bg-black text-white">
      <HeroNavbar />
      <div className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
        <HeroShader />
        <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
        <div
          className="pointer-events-auto w-full flex flex-col items-center"
          style={{ fontFamily: '"Inter Tight", sans-serif' }}
        >
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "6px 16px 6px 6px",
              borderRadius: 999,
              background: "rgba(15,15,15,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              color: "#fff",
              fontSize: 14,
              textDecoration: "none",
              marginBottom: 28,
            }}
          >
            <span
              style={{
                background: "#2F6BFF",
                color: "#fff",
                fontSize: 12,
                fontWeight: 500,
                padding: "4px 10px",
                borderRadius: 999,
              }}
            >
              New
            </span>
            <span style={{ color: "rgba(255,255,255,0.92)" }}>
              Better SEO – Apps built to be found
            </span>
            <ArrowRight size={16} color="rgba(255,255,255,0.85)" />
          </a>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              paddingBottom: "0.15em",
              margin: 0,
              textAlign: "center",
            }}
            className="gradient-text-animate"
          >
            Build something Lovable
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.35rem)",
              color: "rgba(255,255,255,0.65)",
              marginTop: 6,
              marginBottom: 36,
              textAlign: "center",
            }}
          >
            Create apps and websites by chatting with AI
          </p>
          <PromptInput />
        </div>
        </div>
      </div>
      <SectionTrustedBy />
    </div>
  );
}

```

FILE: `src/components/HeroShader.tsx`

```tsx
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    _heroProjectData?: unknown;
    CoreRenderer?: { init: () => Promise<void> };
  }
}

async function loadScript(src: string) {
  const cacheKey = `__loaded_${src}`;
  if ((window as unknown as Record<string, boolean>)[cacheKey]) return;
  const res = await fetch(src, { credentials: "include" });
  if (!res.ok) throw new Error(`fetch ${src} -> ${res.status}`);
  const text = await res.text();
  // Execute in global scope so it can assign to window.* like a normal <script>.
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  new Function(text).call(window);
  (window as unknown as Record<string, boolean>)[cacheKey] = true;
}

export default function HeroShader({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let blobUrl: string | null = null;

    (async () => {
      try {
        await loadScript("/vendor/core-renderer.js");
        await loadScript("/vendor/hero-project.js");
        if (cancelled) return;

        const projectData = window._heroProjectData;
        const container = containerRef.current;
        if (!projectData || !container || !window.CoreRenderer) return;

        const blob = new Blob([JSON.stringify(projectData)], { type: "application/json" });
        blobUrl = URL.createObjectURL(blob);
        container.setAttribute("data-cr-project-src", blobUrl);

        await window.CoreRenderer.init();
        if (blobUrl) URL.revokeObjectURL(blobUrl);

        if (!cancelled) {
          // wait for renderer to paint a few frames before fading in
          setTimeout(() => {
            if (!cancelled) setReady(true);
          }, 250);
        }

        // Nudge a mousemove so any mouse-tracking layers initialize.
        window.dispatchEvent(
          new MouseEvent("mousemove", {
            clientX: window.innerWidth / 2,
            clientY: window.innerHeight / 2,
            bubbles: true,
          }),
        );
      } catch (err) {
        console.error("[HeroShader] init failed", err);
      }
    })();

    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  return (
    <div
      id="hero-canvas"
      ref={containerRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        overflow: "hidden",
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1), transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "opacity, transform",
      }}
    />
  );
}
```

FILE: `src/components/HeroNavbar.tsx`

```tsx
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type NavItem = { label: string; description?: string; external?: boolean };
type NavColumn = { heading: string; items: NavItem[]; groups?: NavItem[][] };
type Announcement = {
  eyebrow: string;
  image: string;
  title: string;
  ctaLabel: string;
};
type NavLink = {
  label: string;
  active?: boolean;
  dropdown?: boolean;
  columns?: NavColumn[];
  extra?: NavColumn;
  announcement?: Announcement;
};

const navLinks: NavLink[] = [
  {
    label: "Solution",
    dropdown: true,
    columns: [
      {
        heading: "Who is it for?",
        items: [
          { label: "Founders", description: "Ship before you pitch." },
          { label: "Sales", description: "Build the demo live." },
          { label: "Product managers", description: "Prototype, don't spec." },
          { label: "Designers", description: "Your designs, built." },
          { label: "Marketers", description: "Launch pages in minutes." },
          { label: "Ops", description: "Tools that fit your flow." },
          { label: "People", description: "HR tools your team loves." },
        ],
      },
    ],
    extra: {
      heading: "Use cases",
      items: [
        { label: "Prototyping", description: "Proof of concept in hours." },
        { label: "Internal tools", description: "Built for your team." },
      ],
    },
  },
  {
    label: "Resources",
    dropdown: true,
    columns: [
      {
        heading: "Resources",
        items: [],
        groups: [
          [
            { label: "Blog", description: "Ideas, updates, stories." },
            { label: "Partners", description: "Build more together." },
            { label: "Templates", description: "Begin with a template." },
            { label: "Guides", description: "Learn as you build." },
          ],
          [
            { label: "Connectors", description: "Build from what you already use." },
            { label: "Docs", description: "Everything under the hood." },
          ],
        ],
      },
    ],
    announcement: {
      eyebrow: "Announcement",
      image:
        "/vendor/announcement.jpg",
      title: "Building is just the beginning: Introducing Discoverability",
      ctaLabel: "Learn more",
    },
  },
  { label: "Community" },
  { label: "Enterprise" },
  { label: "Pricing" },
  { label: "Security" },
];

const ARROW_SRC = "/vendor/arrow-right.svg";

const ArrowButton = ({ children }: { children: React.ReactNode }) => (
  <button
    className="group relative inline-flex items-center justify-center overflow-hidden"
    style={{
      height: 38,
      padding: "12px 16px",
      gap: 10,
      borderRadius: 9,
      border: "1px solid rgba(250,250,250,0.20)",
      background: "#FFF",
      color: "#111111",
      fontFamily: '"Inter Tight", sans-serif',
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
    }}
  >
    <span>{children}</span>
    <span style={{ position: "relative", width: 14, height: 14, overflow: "hidden", display: "inline-block" }}>
      <img
        src={ARROW_SRC}
        width={14}
        height={14}
        alt=""
        className="absolute inset-0 translate-x-0 group-hover:translate-x-[150%]"
        style={{ transition: "transform 500ms cubic-bezier(0.65,0,0.35,1)" }}
      />
      <img
        src={ARROW_SRC}
        width={14}
        height={14}
        alt=""
        className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-0"
        style={{ transition: "transform 500ms cubic-bezier(0.65,0,0.35,1)" }}
      />
    </span>
  </button>
);

const HeroNavbar = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const currentDropdownLink = navLinks.find((l) => l.label === activeDropdown) as
    | (NavLink & { columns: NavColumn[]; extra?: NavColumn; announcement?: Announcement })
    | undefined;
  const aboutLink = navLinks.find((l) => l.label === "Solution") as NavLink & {
    columns: NavColumn[];
    extra: NavColumn;
  };
  void aboutLink;

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          pointerEvents: "none",
          backdropFilter: aboutOpen ? "blur(8px)" : "blur(0px)",
          WebkitBackdropFilter: aboutOpen ? "blur(8px)" : "blur(0px)",
          background: aboutOpen ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)",
          transition:
            "backdrop-filter 280ms ease, -webkit-backdrop-filter 280ms ease, background 280ms ease",
        }}
      />

      <nav
        className="fixed top-0 left-0 right-0 z-50 grid items-center hero-nav"
        style={{
          gridTemplateColumns: "1fr auto 1fr",
          background: "color-mix(in oklab, #1c1c1c 75%, transparent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 clamp(1rem, 3vw, 2rem)",
          height: 70,
          fontFamily: '"Inter Tight", sans-serif',
        }}
      >
        <style>{`
          @media (max-width: 1024px) {
            .hero-nav-links { display: none !important; }
            .hero-nav { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 600px) {
            .hero-nav-contact { display: none !important; }
          }
          .about-panel { opacity: 0; pointer-events: none; transition: opacity 220ms ease; }
          .about-panel[data-open="true"] { opacity: 1; pointer-events: auto; }
          .about-panel-inner {
            opacity: 0;
            transform: translateY(-12px);
            transition: opacity 320ms ease, transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .about-panel[data-open="true"] .about-panel-inner {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 80ms;
          }
          .about-item {
            color: rgba(255,255,255,0.92);
            font-family: "Inter Tight", sans-serif;
            font-size: 15px;
            font-weight: 600;
            background: transparent;
            border: none;
            padding: 10px 0;
            cursor: pointer;
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            transition: color 180ms ease;
            break-inside: avoid;
          }
          .about-item:hover { color: #fff; }
          .about-item-desc {
            color: rgba(255,255,255,0.55);
            font-size: 13px;
            font-weight: 400;
          }
          .about-heading {
            color: rgba(255,255,255,0.45);
            font-family: "Inter Tight", sans-serif;
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 14px;
            letter-spacing: 0.02em;
          }
          .logo-link {
            position: relative;
            display: inline-block;
            line-height: 0;
            cursor: pointer;
          }
          .logo-img {
            height: 1.1rem;
            width: auto;
            display: block;
          }
          .logo-overlay {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0;
            -webkit-mask: url(/vendor/logo.svg) no-repeat center / contain;
            mask: url(/vendor/logo.svg) no-repeat center / contain;
            background-image: linear-gradient(
              90deg,
              #ffffff 0,
              #ffffff 33.33%,
              #82BCFF 40%,
              #2483FF 45%,
              #FF66F4 50%,
              #FF3029 55%,
              #FE7B02 60%,
              #ffffff 66.67%,
              #ffffff
            );
            background-size: 300% 100%;
            background-position: 100% 0;
          }
          .logo-link:hover .logo-overlay {
            opacity: 1;
            animation: gradient-sweep 1.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
          }
        `}</style>

        <div className="flex items-center">
          <a href="/" className="logo-link" aria-label="Lovable">
            <img
              src="/vendor/logo.svg"
              alt="Lovable"
              className="logo-img"
            />
            <span className="logo-overlay" aria-hidden="true" />
          </a>
        </div>

        <div
          className="flex items-center justify-center hero-nav-links"
          style={{ gap: 4, position: "relative" }}
        >
          {navLinks.map((link) => {
            const hasDropdown = !!link.dropdown;
            const isOpen = hasDropdown && activeDropdown === link.label;
            const highlighted = link.active || isOpen;
            return (
              <button
                key={link.label}
                className="flex items-center transition-colors duration-200"
                style={{
                  gap: 4,
                  fontFamily: '"Inter Tight", sans-serif',
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  padding: "6px 14px",
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  color: highlighted ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)",
                }}
                onMouseEnter={(e) => {
                  if (hasDropdown) {
                    setActiveDropdown(link.label);
                    setAboutOpen(true);
                  } else {
                    setActiveDropdown(null);
                    setAboutOpen(false);
                  }
                  if (!link.active) e.currentTarget.style.color = "rgba(255,255,255,0.95)";
                }}
                onMouseLeave={(e) => {
                  if (!link.active && !isOpen)
                    e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                }}
              >
                {link.label}
                {link.dropdown && (
                  <ChevronDown
                    size={11}
                    color="rgba(255,255,255,0.65)"
                    style={{
                      transition: "transform 220ms ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end" style={{ gap: "1rem" }}>
          <ArrowButton>Open Lovable</ArrowButton>
        </div>
      </nav>

      <div
        className="about-panel"
        data-open={aboutOpen}
        onMouseEnter={() => setAboutOpen(true)}
        onMouseLeave={() => {
          setAboutOpen(false);
          setActiveDropdown(null);
        }}
        style={{
          position: "fixed",
          top: 70,
          left: 0,
          right: 0,
          background: "rgba(15,15,15,0.85)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          padding: "32px 0 40px",
          zIndex: 60,
        }}
      >
        <div
          className="about-panel-inner"
          style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}
        >
          {currentDropdownLink && (
          <>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 64 }}>
            {currentDropdownLink.columns.map((col) => (
              <div key={col.heading} style={{ display: "flex", flexDirection: "column", borderRight: "1px solid rgba(255,255,255,0.08)", paddingRight: 32 }}>
                <div className="about-heading">{col.heading}</div>
                {col.groups ? (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
                    {col.groups.map((group, gi) => (
                      <div key={gi} style={{ display: "flex", flexDirection: "column" }}>
                        {group.map((it) => (
                          <button key={it.label} className="about-item" style={{ width: "100%" }}>
                            <span>{it.label}</span>
                            {it.description && <span className="about-item-desc">{it.description}</span>}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ columnCount: 2, columnGap: 48 }}>
                    {col.items.map((it) => (
                      <button key={it.label} className="about-item" style={{ width: "100%" }}>
                        <span>{it.label}</span>
                        {it.description && <span className="about-item-desc">{it.description}</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {currentDropdownLink.announcement ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="about-heading">{currentDropdownLink.announcement.eyebrow}</div>
                <button
                  className="about-item"
                  style={{ padding: 0, gap: 14, alignItems: "stretch" }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 9",
                      borderRadius: 10,
                      overflow: "hidden",
                      background:
                        "linear-gradient(135deg, #2a1530 0%, #1a1a1a 60%, #2a1a2a 100%)",
                    }}
                  >
                    <img
                      src={currentDropdownLink.announcement.image}
                      alt=""
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35 }}>
                    {currentDropdownLink.announcement.title}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "rgba(255,255,255,0.85)",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {currentDropdownLink.announcement.ctaLabel}
                    <span style={{ transform: "translateY(-1px)" }}>›</span>
                  </span>
                </button>
              </div>
            ) : currentDropdownLink.extra ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="about-heading">{currentDropdownLink.extra.heading}</div>
                {currentDropdownLink.extra.items.map((it) => (
                  <button key={it.label} className="about-item">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      {it.label}
                      {it.external && <span style={{ transform: "translateY(-1px)" }}>↗</span>}
                    </span>
                    {it.description && <span className="about-item-desc">{it.description}</span>}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          </>
          )}
        </div>
      </div>
    </>
  );
};

export default HeroNavbar;
```

FILE: `src/components/PromptInput.tsx`

```tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const A = "/vendor";

const PHRASES = [
  "Create a finance dashboard design",
  "Branding with M letter",
  "Liquid glass effect",
  "Loader animation",
  "SaaS landing page",
];

type Mode = "typing" | "pausing" | "deleting";

const TypewriterPrompt = () => {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [mode, setMode] = useState<Mode>("typing");

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let t: ReturnType<typeof setTimeout>;
    if (mode === "typing") {
      if (text.length < phrase.length) {
        t = setTimeout(
          () => setText(phrase.slice(0, text.length + 1)),
          22 + Math.random() * 25,
        );
      } else {
        t = setTimeout(() => setMode("pausing"), 30);
      }
    } else if (mode === "pausing") {
      t = setTimeout(() => setMode("deleting"), 1400);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), 14);
      } else {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setMode("typing");
        return;
      }
    }
    return () => clearTimeout(t);
  }, [text, mode, phraseIdx]);

  return (
    <div
      style={{
        width: "100%",
        fontFamily: '"Inter Tight"',
        fontSize: 15,
        fontWeight: 400,
        color: "rgba(255,255,255,0.60)",
        padding: "0 0 10px 0",
        display: "flex",
        alignItems: "center",
        height: 32,
        boxSizing: "border-box",
        lineHeight: "22px",
        flexShrink: 0,
        transform: "translate(1%, 18%)",
      }}
    >
      <style>{`@keyframes promptCaretBlink { 0%,49% { opacity:1 } 50%,100% { opacity:0 } }`}</style>
      <span style={{ whiteSpace: "pre" }}>{text}</span>
      <span
        style={{
          display: "inline-block",
          width: 2,
          height: 18,
          marginLeft: 2,
          background: "rgba(255,255,255,0.85)",
          animation: "promptCaretBlink 1s steps(1) infinite",
          flexShrink: 0,
        }}
      />
    </div>
  );
};

const SendButton = () => {
  const [hovered, setHovered] = useState(false);
  const [arrowToggle, setArrowToggle] = useState(0);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef({ angle: 0, speed: 0, last: 0, raf: 0, hovered: false });

  useEffect(() => {
    stateRef.current.hovered = hovered;
    const tick = (now: number) => {
      const s = stateRef.current;
      const dt = s.last ? now - s.last : 16;
      s.last = now;
      const target = s.hovered ? 360 / 1500 : 0;
      const tau = s.hovered ? 250 : 700;
      const k = 1 - Math.exp(-dt / tau);
      s.speed += (target - s.speed) * k;
      s.angle = (s.angle + s.speed * dt) % 360;
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${s.angle}deg)`;
      }
      if (!s.hovered && Math.abs(s.speed) < 0.0005) {
        s.raf = 0;
        s.last = 0;
        return;
      }
      s.raf = requestAnimationFrame(tick);
    };
    if (!stateRef.current.raf) {
      stateRef.current.last = 0;
      stateRef.current.raf = requestAnimationFrame(tick);
    }
    return () => {
      if (stateRef.current.raf) {
        cancelAnimationFrame(stateRef.current.raf);
        stateRef.current.raf = 0;
      }
    };
  }, [hovered]);

  return (
    <motion.div
      onHoverStart={() => {
        setArrowToggle((v) => v + 1);
        setHovered(true);
      }}
      onHoverEnd={() => setHovered(false)}
      animate={{ scale: hovered ? 1.05 : 1 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "relative",
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 15,
          background: "rgb(95 126 167 / 15%)",
          width: 44,
          height: 44,
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 36,
          height: 36,
          borderRadius: 12,
          background:
            "linear-gradient(var(--send-btn-angle, 180deg), #ff660e 0%, #646aed 100%)",
          animation: "send-btn-bg-rotate 4s linear infinite",
          boxShadow:
            "inset 0 1px 18px 2px rgba(173,208,255,0.20), inset 0 1px 4px 2px rgba(222,236,255,0.80), 0 42px 107px 0 rgba(61,130,222,0.34), 0 10px 10px 0 rgba(61,130,222,0.20), 0 3.714px 4.846px 0 rgba(61,130,222,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: 8,
          zIndex: 2,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: 13,
            padding: 1,
            zIndex: 3,
            pointerEvents: "none",
            background:
              "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, #FFFFFF 60deg, #9EC7FF 120deg, rgba(255,255,255,0) 200deg, rgba(255,255,255,0) 360deg)",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
          }}
        >
          <div
            ref={ringRef}
            style={{ width: "100%", height: "100%", borderRadius: 13 }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 12,
            border: "1px solid #9EC7FF",
            pointerEvents: "none",
            zIndex: 4,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          <img
            src={`${A}/dots.svg`}
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
            alt=""
          />
        </div>
        {arrowToggle > 0 && (
          <motion.div
            key={`blink-${arrowToggle}`}
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 4,
              pointerEvents: "none",
              background:
                "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
              mixBlendMode: "screen",
            }}
          />
        )}
        <div
          style={{
            position: "relative",
            width: 16,
            height: 16,
            zIndex: 5,
            overflow: "hidden",
          }}
        >
          <motion.img
            key={`out-${arrowToggle}`}
            src={`${A}/arrow-up.svg`}
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.65, 0, 0.35, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              width: 16,
              height: 16,
              objectFit: "contain",
            }}
            alt=""
          />
          <motion.img
            key={`in-${arrowToggle}`}
            src={`${A}/arrow-up.svg`}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.32, ease: [0.65, 0, 0.35, 1] }}
            style={{
              position: "absolute",
              inset: 0,
              width: 16,
              height: 16,
              objectFit: "contain",
            }}
            alt=""
          />
        </div>
      </div>
    </motion.div>
  );
};

const PromptInput = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
      style={{
        width: 702,
        maxWidth: "100%",
        margin: "0 auto",
        padding: 4,
        borderRadius: 34,
        opacity: 1,
      }}
    >
      <div
        style={{
          width: "100%",
          height: 160,
          background:
            "linear-gradient(180.9deg, rgb(118 100 50 / 23%) -0.58%, rgba(53, 53, 56, 0.7) 66.34%, rgba(38, 38, 39, 0.7) 101.25%), rgb(43 38 38 / 67%)",
          boxShadow:
            "rgba(0, 0, 0, 0.5) 0px 118px 112px, rgba(0, 0, 0, 0.36) 0px 69.4784px 58.4192px, rgba(0, 0, 0, 0.282) 0px 35.6832px 27.4176px, rgba(255, 255, 255, 0.32) 0.5px 0.5px 0.5px inset, rgba(255, 255, 255, 0.05) 0.5px -0.5px 0.5px inset",
          borderRadius: 30,
          padding: "14px 14px 12px 16px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TypewriterPrompt />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            marginTop: "auto",
            transform: "translateY(0%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              transform: "translateX(1%)",
            }}
          >
            <button
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "transparent",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(255,255,255,0.50)",
                padding: 0,
              }}
              aria-label="Add"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div
              style={{
                width: 1,
                height: 18,
                background: "rgba(255,255,255,0.12)",
                margin: "0 2px",
              }}
            />
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                width: 83,
                height: 30,
                background: "hsl(0deg 0% 43.53% / 14.9%)",
                borderRadius: 8,
                padding: "0 8px",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background:
                    "linear-gradient(166deg, #A0E4FF 9.8%, #9CA4FB 184.41%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={`${A}/ai-select.svg`} width={8} height={8} alt="" />
              </div>
              <span
                style={{
                  fontFamily: '"Inter Tight"',
                  fontSize: 12,
                  fontWeight: 400,
                  lineHeight: "16px",
                  color: "#fff",
                  textAlign: "center",
                  flex: 1,
                  whiteSpace: "nowrap",
                }}
              >
                Build
              </span>
              <ChevronDown size={12} stroke="#fff" style={{ flexShrink: 0 }} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, transform: "translateX(-1%)" }}>
            <button
              aria-label="Voice input"
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                border: "none",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(255,255,255,0.70)",
                padding: 0,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
                <path fill="currentColor" d="M11.25 21v-2.286a8.25 8.25 0 0 1-7.5-8.214.75.75 0 0 1 1.5 0 6.75 6.75 0 0 0 13.5 0 .75.75 0 0 1 1.5 0 8.25 8.25 0 0 1-7.5 8.214V21a.75.75 0 0 1-1.5 0m4-14a3.25 3.25 0 0 0-6.5 0v3a3.25 3.25 0 0 0 6.5 0zm1.5 3a4.75 4.75 0 1 1-9.5 0V7a4.75 4.75 0 0 1 9.5 0z"></path>
              </svg>
            </button>
            <SendButton />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PromptInput;
```

FILE: `src/components/SectionTrustedBy.tsx`

```tsx
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const LOGO_BASE = "/vendor/";
const LOGOS = [
  "logo-1.svg",
  "logo-2.svg",
  "logo-3.svg",
  "logo-4.svg",
  "logo-5.svg",
  "logo-6.svg",
];

const useIsMobile = () => {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
};

const SectionTrustedBy = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRefs = useRef<HTMLDivElement[]>([]);
  const slotRefs = useRef<HTMLDivElement[]>([]);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const setWidthRef = useRef(0);

  // Repeat the logos to ensure a continuous strip wider than the viewport
  const REPEATS = 6;
  const strip = Array.from({ length: REPEATS }).flatMap((_, r) =>
    LOGOS.map((file, i) => ({ file, key: `${r}-${i}-${file}`, idx: r * LOGOS.length + i })),
  );

  // Measure one logical "set" width from the unscaled slot widths so the loop
  // distance stays constant regardless of per-item transforms.
  const measure = () => {
    const slots = slotRefs.current;
    if (!slots.length) return;
    const perSet = LOGOS.length;
    let w = 0;
    for (let i = 0; i < perSet; i++) {
      const s = slots[i];
      if (!s) return;
      const r = s.getBoundingClientRect();
      w += r.width;
    }
    // include one gap per item (flex gap is between items)
    const gap = isMobile ? 56 : 88;
    w += gap * perSet;
    setWidthRef.current = w;
  };

  useEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const speed = isMobile ? 55 : 80; // px/s

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!pausedRef.current) offsetRef.current += speed * dt;

      const container = containerRef.current;
      const track = trackRef.current;
      const setWidth = setWidthRef.current;
      if (!container || !track) {
        raf = requestAnimationFrame(tick);
        return;
      }
      // seamless wrap using measured set width (stable, never glitches)
      if (setWidth > 0) {
        offsetRef.current = ((offsetRef.current % setWidth) + setWidth) % setWidth;
      }
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

      const cw = container.clientWidth;
      const cx = cw / 2;
      const cLeft = container.getBoundingClientRect().left;
      const slots = slotRefs.current;
      const inners = innerRefs.current;

      for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];
        const inner = inners[i];
        if (!slot || !inner) continue;
        const r = slot.getBoundingClientRect();
        const elCenter = r.left + r.width / 2 - cLeft;
        // normalized position across viewport: -1 (left) .. 1 (right)
        const t = (elCenter - cx) / (cx || 1);
        const ct = Math.max(-1.3, Math.min(1.3, t));
        // smooth bell — modern orbit-like depth curve
        const bulge = Math.cos(Math.max(-1, Math.min(1, ct)) * (Math.PI / 2));
        // subtle orbit: gentle rotateY + tiny y arc
        const rotY = -ct * 26; // deg
        const yArc = (1 - bulge) * -8; // lift edges slightly
        const tz = bulge * 140;
        const scale = 0.72 + bulge * 0.5; // 0.72 .. 1.22
        const edge = Math.max(0, 1 - Math.pow(Math.abs(ct), 1.5));
        const opacity = edge * (0.5 + bulge * 0.5);
        const blur = (1 - bulge) * 1.4;

        inner.style.transform =
          `translateY(${yArc}px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${scale})`;
        inner.style.opacity = String(opacity);
        inner.style.filter = `brightness(0) invert(1) blur(${blur}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isMobile]);

  return (
    <section
      style={{
        background: "#1c1c1c",
        color: "#fff",
        padding: "70px 24px",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 56,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}
        >
          <h2
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontWeight: 300,
              fontSize: "1rem",
              lineHeight: 1.4,
              color: "#fff",
              opacity: 0.6,
              textAlign: "center",
              maxWidth: 720,
              margin: 0,
            }}
          >
            Teams from top companies build with Lovable
          </h2>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: "100%",
            height: isMobile ? 110 : 140,
            position: "relative",
            overflow: "hidden",
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
            maskImage:
              "linear-gradient(90deg, transparent 0%, #000 20%, #000 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, #000 20%, #000 80%, transparent 100%)",
          }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 56 : 88,
              width: "max-content",
              height: "100%",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {strip.map(({ file, key, idx }) => (
              <div
                key={key}
                ref={(el) => { if (el) slotRefs.current[idx] = el; }}
                style={{
                  flex: "0 0 auto",
                  height: isMobile ? 28 : 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transformStyle: "preserve-3d",
                  pointerEvents: "none",
                }}
              >
                <div
                  ref={(el) => { if (el) innerRefs.current[idx] = el; }}
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity, filter",
                    transformOrigin: "center center",
                  }}
                >
                  <img
                    src={LOGO_BASE + file}
                    alt=""
                    draggable={false}
                    style={{
                      height: isMobile ? 28 : 38,
                      width: "auto",
                      display: "block",
                      userSelect: "none",
                    }}
                    onLoad={measure}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SectionTrustedBy;

```

FILE: `src/styles.css`

```css
@import "tailwindcss" source(none);
@source "../src";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/*
 * Design system definition.
 *
 * The @theme inline block maps CSS custom properties to Tailwind utility
 * classes (e.g. --color-primary -> bg-primary, text-primary).
 *
 * The :root and .dark blocks define the actual color values using oklch.
 * All colors MUST use oklch format.
 *
 * To add a new semantic color:
 * 1. Add the variable to :root (light value) and .dark (dark value)
 * 2. Register it in @theme inline as --color-<name>: var(--<name>)
 */

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-ring-offset-background: var(--background);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.129 0.042 264.695);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.129 0.042 264.695);
  --primary: oklch(0.208 0.042 265.755);
  --primary-foreground: oklch(0.984 0.003 247.858);
  --secondary: oklch(0.968 0.007 247.896);
  --secondary-foreground: oklch(0.208 0.042 265.755);
  --muted: oklch(0.968 0.007 247.896);
  --muted-foreground: oklch(0.554 0.046 257.417);
  --accent: oklch(0.968 0.007 247.896);
  --accent-foreground: oklch(0.208 0.042 265.755);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.984 0.003 247.858);
  --border: oklch(0.929 0.013 255.508);
  --input: oklch(0.929 0.013 255.508);
  --ring: oklch(0.704 0.04 256.788);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.984 0.003 247.858);
  --sidebar-foreground: oklch(0.129 0.042 264.695);
  --sidebar-primary: oklch(0.208 0.042 265.755);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.968 0.007 247.896);
  --sidebar-accent-foreground: oklch(0.208 0.042 265.755);
  --sidebar-border: oklch(0.929 0.013 255.508);
  --sidebar-ring: oklch(0.704 0.04 256.788);
}

.dark {
  --background: oklch(0.129 0.042 264.695);
  --foreground: oklch(0.984 0.003 247.858);
  --card: oklch(0.208 0.042 265.755);
  --card-foreground: oklch(0.984 0.003 247.858);
  --popover: oklch(0.208 0.042 265.755);
  --popover-foreground: oklch(0.984 0.003 247.858);
  --primary: oklch(0.929 0.013 255.508);
  --primary-foreground: oklch(0.208 0.042 265.755);
  --secondary: oklch(0.279 0.041 260.031);
  --secondary-foreground: oklch(0.984 0.003 247.858);
  --muted: oklch(0.279 0.041 260.031);
  --muted-foreground: oklch(0.704 0.04 256.788);
  --accent: oklch(0.279 0.041 260.031);
  --accent-foreground: oklch(0.984 0.003 247.858);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.984 0.003 247.858);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.551 0.027 264.364);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.208 0.042 265.755);
  --sidebar-foreground: oklch(0.984 0.003 247.858);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.279 0.041 260.031);
  --sidebar-accent-foreground: oklch(0.984 0.003 247.858);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.551 0.027 264.364);
}

@layer base {
  * {
    border-color: var(--color-border);
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
  }
}

@keyframes gradient-sweep {
  from { background-position: 100% 0; }
  to { background-position: 0 0; }
}

.gradient-text-animate {
  background-image: linear-gradient(
    90deg,
    #ffffff 0,
    #ffffff 33.33%,
    #82BCFF 40%,
    #2483FF 45%,
    #FF66F4 50%,
    #FF3029 55%,
    #FE7B02 60%,
    transparent 66.67%,
    transparent
  );
  background-size: 300% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation-name: gradient-sweep;
  animation-duration: 1.2s;
  animation-delay: 0.1s;
  animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  animation-fill-mode: forwards;
}

@property --send-btn-angle {
  syntax: "<angle>";
  initial-value: 180deg;
  inherits: false;
}

@keyframes send-btn-bg-rotate {
  from { --send-btn-angle: 0deg; }
  to { --send-btn-angle: 360deg; }
}

@keyframes marquee-x {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes rec-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

```

## PIXEL/FUNCTIONALITY VERIFICATION BEFORE FINISHING

- AT `/`, THE TOP NAV IS FIXED, 70PX TALL, DARK GLASS, WITH LOVABLE LOGO ON THE LEFT, CENTERED NAV ITEMS, AND THE OPEN LOVABLE BUTTON ON THE RIGHT.
- HOVERING "SOLUTION" AND "RESOURCES" OPENS THE FULL-WIDTH BLURRED DROPDOWN BELOW THE NAVBAR; CHEVRONS ROTATE.
- THE HERO WEBGL FADES IN AFTER INITIALIZATION AND FILLS THE VIEWPORT BEHIND THE CONTENT.
- THE ANNOUNCEMENT PILL SAYS "NEW" AND "BETTER SEO – APPS BUILT TO BE FOUND".
- H1 TEXT IS EXACTLY "BUILD SOMETHING LOVABLE" WITH THE 1.2S MULTICOLOR GRADIENT SWEEP.
- SUBTITLE IS EXACTLY "CREATE APPS AND WEBSITES BY CHATTING WITH AI".
- PROMPT BOX IS 702PX WIDE MAX, 160PX TALL, ROUNDED 30PX, WITH THE TYPEWRITER PHRASES AND BLINKING CARET.
- SEND BUTTON HAS THE ROTATING GRADIENT, DOTTED TEXTURE, HOVER SCALE, ARROW ANIMATION, AND SHINE SWEEP.
- THE NEXT SECTION BACKGROUND IS `#1c1c1c`, TEXT SAYS "TEAMS FROM TOP COMPANIES BUILD WITH LOVABLE", AND THE 3D LOGO CAROUSEL MOVES CONTINUOUSLY WITH DEPTH/BLUR/SCALE CHANGES.
- NO PLACEHOLDER CONTENT, NO GENERIC HERO, NO GENERATED REPLACEMENT IMAGERY, NO MISSING ASSETS, AND NO CONSOLE ERRORS.
