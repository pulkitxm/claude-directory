import {
  ArrowRight,
  Boxes,
  Box,
  Cpu,
  FileCode2,
  FolderTree,
  Github,
  Layers,
  MonitorSmartphone,
  MousePointerClick,
  Package,
  Palette,
  Sparkles,
  TerminalSquare,
  Waypoints,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { CodeBlock } from "@/components/code-block";
import DemoOne from "@/components/demo";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Static content (kept out of JSX for readability)                   */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Preview", href: "#preview" },
  { label: "Setup", href: "#setup" },
  { label: "Install", href: "#install" },
  { label: "Usage", href: "#usage" },
  { label: "Q&A", href: "#qa" },
];

const FRAMEWORKS = ["shadcn/ui", "Tailwind CSS", "TypeScript", "Three.js"];

const shadcnInit = `# 1 · Scaffold a Vite + React + TypeScript app
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2 · Add Tailwind CSS (v3) + PostCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3 · Initialise shadcn/ui — this writes components.json,
#     the @/ path alias, lib/utils.ts and your CSS tokens
npx shadcn@latest init`;

const installDep = `# This component depends on a single external package
npm install three

# (TypeScript users) pull in the ambient types as well
npm install -D @types/three`;

const fileTree = `my-app/
├─ components.json          # shadcn/ui config (aliases + tokens)
├─ src/
│  ├─ components/
│  │  └─ ui/                # ← the shadcn destination
│  │     ├─ shader-animation.tsx   ← paste it here
│  │     ├─ button.tsx
│  │     └─ badge.tsx
│  ├─ lib/
│  │  └─ utils.ts           # the cn() helper
│  └─ index.css             # @tailwind + CSS variables
└─ tsconfig.json            # "@/*": ["./src/*"]`;

const usageSnippet = `import { ShaderAnimation } from "@/components/ui/shader-animation";

export default function DemoOne() {
  return (
    <div className="relative flex h-[650px] w-full flex-col items-center
                    justify-center overflow-hidden rounded-xl border bg-blue-700">
      <ShaderAnimation />
      <span className="absolute pointer-events-none z-10 text-center
                       text-7xl font-semibold tracking-tighter text-white">
        Shader Animation
      </span>
    </div>
  );
}`;

const heroUsage = `// As a full-bleed page background, place it behind your content
<section className="relative h-screen w-full overflow-hidden">
  <ShaderAnimation />
  <div className="absolute inset-0 z-10 grid place-items-center">
    {/* your headline, nav, CTA … */}
  </div>
</section>`;

const QA: {
  icon: typeof Box;
  q: string;
  a: React.ReactNode;
}[] = [
  {
    icon: Box,
    q: "What data / props does it take?",
    a: (
      <>
        None. <code>ShaderAnimation</code> is a zero-prop, self-driving
        component. The GLSL <span className="text-foreground">resolution</span>{" "}
        and <span className="text-foreground">time</span> uniforms are managed
        internally, so you compose it purely by mounting it.
      </>
    ),
  },
  {
    icon: Layers,
    q: "Any state-management requirements?",
    a: (
      <>
        No global store, no context provider. All Three.js objects live in two{" "}
        <code>useRef</code>s and the render loop runs inside a single{" "}
        <code>useEffect</code> that fully tears itself down on unmount.
      </>
    ),
  },
  {
    icon: Palette,
    q: "Are any assets (images / icons) required?",
    a: (
      <>
        Zero image assets — the visual is generated entirely on the GPU by the
        fragment shader. Icons on this page come from{" "}
        <code>lucide-react</code>; fonts are vendored locally for offline use.
      </>
    ),
  },
  {
    icon: MonitorSmartphone,
    q: "What is the responsive behavior?",
    a: (
      <>
        The renderer listens to <code>window.resize</code> and re-reads its
        container size, and honours <code>devicePixelRatio</code> for crisp
        output on retina screens. The root is <code>w-full h-screen</code>; wrap
        it in an <code>overflow-hidden</code> box to constrain it.
      </>
    ),
  },
  {
    icon: MousePointerClick,
    q: "Where is the best place to use it?",
    a: (
      <>
        As an ambient hero / section background. It is{" "}
        <code>pointer-events</code>-transparent in practice, so overlay a
        headline and CTA on top — exactly the pattern this page&apos;s hero
        uses.
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Small presentational helpers                                       */
/* ------------------------------------------------------------------ */

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: typeof Box;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
      <Icon className="size-4" />
      {children}
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="grid size-7 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 font-mono text-xs font-semibold text-primary">
      {n}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <div className="min-h-screen scroll-smooth bg-background text-foreground">
      {/* ---------------------------------------------------------- Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-blue-400 via-indigo-500 to-fuchsia-500 shadow-lg shadow-indigo-500/30">
              <Waypoints className="size-4 text-white" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              shader<span className="text-muted-foreground">/animation</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Badge variant="mono" className="hidden sm:inline-flex">
              <Package className="size-3" /> three
            </Badge>
            <Button size="sm" className="gap-1.5">
              <Github className="size-4" />
              <span className="hidden sm:inline">Get the component</span>
              <span className="sm:hidden">Get</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- Hero */}
      <section
        id="top"
        className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      >
        {/* The component, used exactly as intended: a full-bleed background.
            It is pulled out of the flex flow into an absolutely-positioned,
            fully-sized layer so its internal `w-full h-screen` measures against
            a deterministic box (a flex child would otherwise be squeezed). */}
        <div className="absolute inset-0 z-0 [&>div]:!h-full">
          <ShaderAnimation />
        </div>

        {/* Readability + vignette so the headline reads over the shader */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,7,15,0.55)_78%,rgba(5,7,15,0.95)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-48 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <div className="animate-fade-up [animation-delay:80ms]">
            <Badge
              variant="outline"
              className="mb-7 border-white/15 bg-white/5 text-white/80 backdrop-blur"
            >
              <Sparkles className="size-3.5 text-blue-300" />
              shadcn/ui · component integration
            </Badge>
          </div>

          <h1 className="animate-fade-up text-balance text-6xl font-semibold leading-none tracking-tighter text-white [animation-delay:160ms] sm:text-7xl md:text-8xl">
            Shader Animation
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-balance text-base leading-relaxed text-white/70 [animation-delay:240ms] sm:text-lg">
            A GPU-driven WebGL fragment shader, wrapped as a drop-in React
            component. Copy it into{" "}
            <span className="font-mono text-white">components/ui</span>, install{" "}
            <span className="font-mono text-white">three</span>, and ship.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col items-center gap-3 [animation-delay:320ms] sm:flex-row">
            <a
              href="#install"
              className={cn(buttonVariants({ size: "lg" }), "group")}
            >
              Install component
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#preview"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/15 bg-white/5 text-white hover:bg-white/10",
              )}
            >
              <Box className="size-4" /> See the demo
            </a>
          </div>

          <div className="mt-12 flex animate-fade-up flex-wrap items-center justify-center gap-2 [animation-delay:420ms]">
            {FRAMEWORKS.map((f) => (
              <span
                key={f}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Main */}
      <main className="relative bg-grid">
        {/* soft top fade from hero into the docs body */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* -------------------------------------------------- Live preview */}
        <section
          id="preview"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24"
        >
          <SectionLabel icon={Box}>Live preview</SectionLabel>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              The component, rendered exactly as the snippet ships.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              This is <code className="text-foreground">demo.tsx</code> from the
              integration brief, mounted untouched — a{" "}
              <span className="text-foreground">650px</span> bordered card with
              the shader behind a centered wordmark.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card/40 p-3 shadow-2xl shadow-black/40 sm:p-4">
            <div className="mb-3 flex items-center justify-between px-2">
              <span className="font-mono text-xs text-muted-foreground">
                components/demo.tsx
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                rendering
              </span>
            </div>
            {/* Faithful render of the provided demo */}
            <DemoOne />
          </div>
        </section>

        {/* -------------------------------------------------- Anatomy strip */}
        <section className="mx-auto max-w-6xl px-5 pb-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Cpu,
                title: "GPU fragment shader",
                body: "A nested-loop GLSL field renders radiating RGB lines — all maths, zero textures.",
              },
              {
                icon: Boxes,
                title: "Self-contained lifecycle",
                body: "Scene, renderer and rAF loop are created and disposed inside one useEffect.",
              },
              {
                icon: MonitorSmartphone,
                title: "Resize-aware",
                body: "Listens to window resize and respects devicePixelRatio for crisp retina output.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="group rounded-xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/30 hover:bg-card/70"
              >
                <div className="mb-3 grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <c.icon className="size-4.5" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold">{c.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ----------------------------------------------- Prerequisites */}
        <section
          id="setup"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24"
        >
          <SectionLabel icon={TerminalSquare}>
            Prerequisites · shadcn / Tailwind / TypeScript
          </SectionLabel>
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Your project should support shadcn, Tailwind&nbsp;CSS and TypeScript.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            If it already does, skip ahead. If not, the shadcn CLI sets up the{" "}
            <code className="text-foreground">@/</code> path alias,{" "}
            <code className="text-foreground">components.json</code>,{" "}
            <code className="text-foreground">lib/utils.ts</code> and your CSS
            tokens in one step:
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <CodeBlock
              code={shadcnInit}
              label="Terminal"
              lang="bash"
            />
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-border bg-card/40 p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <FolderTree className="size-4 text-primary" />
                  Project shape after init
                </h3>
                <CodeBlock code={fileTree} label="tree" lang="txt" />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------- Why components/ui */}
        <section className="mx-auto max-w-6xl px-5 pb-8">
          <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card/70 to-card/30">
            <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
              <div className="p-8 sm:p-10">
                <SectionLabel icon={FolderTree}>
                  Default path · components/ui
                </SectionLabel>
                <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                  Why the component lands in{" "}
                  <span className="font-mono text-primary">
                    components/ui
                  </span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  shadcn/ui resolves its <code>ui</code> alias to this folder in{" "}
                  <code>components.json</code>. Keeping the file there means the
                  canonical import —{" "}
                  <code className="text-foreground">
                    @/components/ui/shader-animation
                  </code>{" "}
                  — works untouched, the CLI can update / diff it later, and your
                  primitives stay in one predictable place that every shadcn
                  project shares.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Matches the alias the demo's import already expects.",
                    "Lets `npx shadcn add/diff` find and manage the file.",
                    "Separates reusable primitives from app-specific screens.",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm text-foreground/90"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  If your <code>components.json</code> points{" "}
                  <code>ui</code> somewhere else, either create{" "}
                  <code>components/ui</code> and update the alias, or adjust the
                  import path to wherever your UI primitives live.
                </p>
              </div>

              <div className="relative flex items-center justify-center border-t border-border bg-[#0a0e1a]/60 p-8 md:border-l md:border-t-0">
                <CodeBlock
                  className="w-full"
                  label="components.json"
                  lang="json"
                  code={`{
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "utils": "@/lib/utils",
    "lib": "@/lib"
  }
}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- Install */}
        <section
          id="install"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24"
        >
          <SectionLabel icon={Package}>Install</SectionLabel>
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Two steps: add the dependency, paste the file.
          </h2>

          <div className="mt-10 space-y-5">
            <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/40 p-6 sm:flex-row sm:items-start">
              <StepBadge n={1} />
              <div className="flex-1">
                <h3 className="mb-1 flex items-center gap-2 text-base font-semibold">
                  <Box className="size-4 text-primary" />
                  Install the one external dependency
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  The component imports{" "}
                  <code className="text-foreground">three</code>. That is the
                  only runtime package it needs.
                </p>
                <CodeBlock code={installDep} label="Terminal" lang="bash" />
              </div>
            </div>

            <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/40 p-6 sm:flex-row sm:items-start">
              <StepBadge n={2} />
              <div className="flex-1">
                <h3 className="mb-1 flex items-center gap-2 text-base font-semibold">
                  <FileCode2 className="size-4 text-primary" />
                  Add{" "}
                  <span className="font-mono text-sm">shader-animation.tsx</span>{" "}
                  to <span className="font-mono text-sm">components/ui</span>
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Paste the source into{" "}
                  <code className="text-foreground">
                    src/components/ui/shader-animation.tsx
                  </code>
                  . No providers, no extra wiring.
                </p>
                <CodeBlock
                  label="components/ui/shader-animation.tsx"
                  lang="tsx"
                  code={`"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  // … Three.js scene, GLSL vertex + fragment shaders,
  //   resize handling and a self-disposing rAF loop …
  return (
    <div
      ref={containerRef}
      className="w-full h-screen"
      style={{ background: "#000", overflow: "hidden" }}
    />
  )
}`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ Usage */}
        <section
          id="usage"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24"
        >
          <SectionLabel icon={Layers}>Usage</SectionLabel>
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Import it, mount it, layer your content on top.
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                As a bordered card (the provided demo)
              </h3>
              <CodeBlock code={usageSnippet} label="demo.tsx" lang="tsx" />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                As a full-bleed page hero
              </h3>
              <CodeBlock code={heroUsage} label="hero.tsx" lang="tsx" />
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- Q&A */}
        <section id="qa" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
          <SectionLabel icon={Sparkles}>Integration Q&amp;A</SectionLabel>
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to know before mounting it.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {QA.map(({ icon: Icon, q, a }) => (
              <div
                key={q}
                className="rounded-xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/30"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <h3 className="text-sm font-semibold">{q}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground [&_code]:rounded [&_code]:bg-secondary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-foreground/80">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ----------------------------------------------------------- Footer */}
      <footer className="border-t border-white/5 bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-blue-400 via-indigo-500 to-fuchsia-500">
              <Waypoints className="size-3.5 text-white" />
            </span>
            <span className="text-sm text-muted-foreground">
              shader/animation · a shadcn/ui + Three.js integration
            </span>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            Built with React · TypeScript · Tailwind · three
          </p>
        </div>
      </footer>
    </div>
  );
}
