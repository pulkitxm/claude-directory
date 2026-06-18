import {
  ArrowUpRight,
  Box,
  Boxes,
  ChevronDown,
  CircleDot,
  Code2,
  Component,
  Cpu,
  Droplets,
  Gauge,
  Layers,
  Palette,
  Sparkles,
  Waves,
} from "lucide-react";
import WavyBackground from "@/components/ui/blue-meshy-background";
import { CodeBlock } from "@/components/code-block";
import { SectionHeader } from "@/components/section";

// Served from public/img — referenced by URL (no import needed for public assets).
const useOcean = "/img/use-ocean.jpg";
const useWaves = "/img/use-waves.jpg";
const useAurora = "/img/use-aurora.jpg";

/* Corner reticle bracket — frames the live field as something under
   observation rather than a stock hero. */
function Bracket({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M1 12 V1 H12" />
      <path d="M28 1 H39 V12" />
      <path d="M39 28 V39 H28" />
      <path d="M12 39 H1 V28" />
    </svg>
  );
}

/* ── Reference data ─────────────────────────────────────────────────────── */

const PROPS = [
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    desc: "Overlay content rendered above the canvas. Give it z-10 so it sits over the WebGL layer.",
  },
  {
    name: "className",
    type: "string",
    required: false,
    desc: "Merged onto the wrapper via cn(). Control height/flex here — e.g. flex min-h-screen items-center justify-center.",
  },
];

/* The verbatim component bakes its look into module-level constants. Exposing
   them here turns the integration page into a readable reference for anyone who
   wants to fork the shader. */
const PARAMS = [
  { name: "ZOOM_FACTOR", value: "0.3", note: "Pattern scale — lower zooms further in." },
  { name: "BASE_WAVE_AMPLITUDE", value: "0.2", note: "Domain-warp strength." },
  { name: "RANDOM_WAVE_FACTOR", value: "0.15", note: "Noise-driven amplitude jitter over time." },
  { name: "WAVE_FREQUENCY", value: "4.0", note: "Sine frequency of the warp." },
  { name: "TIME_FACTOR", value: "0.25", note: "Overall animation speed." },
  { name: "BASE_SWIRL_STRENGTH", value: "1.2", note: "Vortex strength near the centre." },
  { name: "SWIRL_TIME_MULT", value: "5.0", note: "Finer swirl timing." },
  { name: "NOISE_SWIRL_FACTOR", value: "0.2", note: "Extra swirl modulated by the noise field." },
  { name: "FBM_OCTAVES", value: "10", note: "Fractal-noise octaves (must be an integer)." },
  { name: "seaColors[20]", value: "vec3[]", note: "20-step blue ramp; index 0 renders fully transparent." },
];

const FEATURES = [
  {
    icon: Cpu,
    title: "Raw WebGL2, zero deps",
    body: "Compiles its own vertex + fragment program and drives a single full-screen quad. No three.js, no shader library — only react and the cn() helper.",
  },
  {
    icon: Droplets,
    title: "Transparent by design",
    body: "Blending is on and the darkest palette step writes alpha 0, so the canvas composites over whatever sits behind it instead of a hard background.",
  },
  {
    icon: Layers,
    title: "Domain-warped fBm",
    body: "Ten octaves of simplex-style noise, sine domain-warped and swirled around the centre, sampled into a discrete 20-stop sea ramp.",
  },
  {
    icon: Gauge,
    title: "Self-managed render loop",
    body: "A requestAnimationFrame loop plus a resize listener live inside one useEffect, and every GL resource is released on unmount.",
  },
];

const USE_CASES = [
  {
    img: useOcean,
    tag: "SaaS hero",
    title: "Product landing",
    body: "Drop it behind a headline + CTA — exactly the shipped demo. The transparent floor keeps text crisp.",
  },
  {
    img: useWaves,
    tag: "Auth screen",
    title: "Sign-in panel",
    body: "A calm, living backdrop for a centered login card without a heavy hero image.",
  },
  {
    img: useAurora,
    tag: "Section band",
    title: "Feature divider",
    body: "Constrain the height via className and use it as an animated band between content sections.",
  },
];

/* ── Setup snippets ─────────────────────────────────────────────────────── */

const SNIP_VITE = `# 1 · Scaffold a Vite + React + TypeScript app
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install`;

const SNIP_TAILWIND = `# 2 · Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`;

const SNIP_SHADCN = `# 3 · Initialise shadcn (writes components.json + lib/utils.ts)
npx shadcn@latest init`;

const SNIP_ALIAS = `// tsconfig.json — the "@/..." path the component imports rely on
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}`;

const SNIP_UTILS = `// src/lib/utils.ts — the cn() helper the component imports
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

const SNIP_USAGE = `import WavyBackground from "@/components/ui/blue-meshy-background";

export default function Hero() {
  return (
    <WavyBackground className="flex min-h-screen items-center justify-center">
      <div className="z-10 space-y-4 text-center">
        <h4 className="text-4xl font-extrabold text-white drop-shadow-xl">
          Turning Ideas Into Impact
        </h4>
        <button className="rounded-xl bg-white px-6 py-3 font-semibold text-blue-900">
          Start Your Journey
        </button>
      </div>
    </WavyBackground>
  );
}`;

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="relative min-h-screen bg-abyss-950 text-foam">
      {/* Ambient grain over the entire document. */}
      <div className="pointer-events-none fixed inset-0 z-[60] grain opacity-[0.035] mix-blend-overlay" />

      {/* ── Top bar ───────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline/60 glass">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-sea-500/40 bg-sea-500/10 text-sea-300">
              <Waves className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="font-display text-sm font-medium tracking-tight">
              Blue&nbsp;Meshy&nbsp;Lab
            </span>
            <span className="hidden rounded border border-hairline/70 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-steel sm:inline">
              shadcn / ui
            </span>
          </div>
          <nav className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-wide text-steel md:flex">
            <a href="#setup" className="transition-colors hover:text-sea-200">
              Setup
            </a>
            <a href="#anatomy" className="transition-colors hover:text-sea-200">
              Anatomy
            </a>
            <a href="#api" className="transition-colors hover:text-sea-200">
              API
            </a>
            <a href="#usage" className="transition-colors hover:text-sea-200">
              Usage
            </a>
          </nav>
          <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wide text-steel">
            <span className="h-1.5 w-1.5 rounded-full bg-sea-300 animate-blink" />
            WebGL2
          </div>
        </div>
      </header>

      {/* ── HERO — the live verbatim component as a full-bleed background ── */}
      <section className="relative">
        <WavyBackground className="flex min-h-screen items-center justify-center bg-abyss-950">
          {/* Legibility scrim + vignette over the shader. */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_40%,transparent_45%,rgba(3,7,15,0.78)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-abyss-950/90 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-abyss-950 to-transparent" />

          {/* Corner brackets. */}
          <Bracket className="pointer-events-none absolute left-5 top-20 h-7 w-7 text-sea-200/35 sm:left-8" />
          <Bracket className="pointer-events-none absolute right-5 top-20 h-7 w-7 text-sea-200/35 sm:right-8" />
          <Bracket className="pointer-events-none absolute bottom-8 left-5 h-7 w-7 text-sea-200/35 sm:left-8" />
          <Bracket className="pointer-events-none absolute bottom-8 right-5 h-7 w-7 text-sea-200/35 sm:right-8" />

          {/* Hero lockup — the shipped demo content, dressed up. */}
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-sea-500/30 bg-abyss-900/50 px-3.5 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-sea-300" />
              <span className="font-mono text-[11px] uppercase tracking-wide2 text-sea-100">
                blue-meshy-background · live
              </span>
            </div>

            <h1 className="animate-rise font-display text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.95] tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
              Turning Ideas
              <br />
              <span className="bg-gradient-to-r from-sea-100 via-sea-200 to-sea-300 bg-clip-text text-transparent">
                Into Impact
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-balance text-[15px] leading-relaxed text-foam/75 sm:text-base">
              A procedural fractal-noise sea, rendered on a single full-screen
              WebGL2 quad and dropped straight into{" "}
              <code className="rounded bg-abyss-900/70 px-1.5 py-0.5 font-mono text-[13px] text-sea-200">
                @/components/ui
              </code>
              . Everything below this fold is the integration.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#setup"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[15px] font-semibold text-blue-900 shadow-lg shadow-sea-900/40 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              >
                Start Your Journey
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#api"
                className="inline-flex items-center gap-2 rounded-xl border border-sea-300/30 bg-abyss-900/40 px-6 py-3 text-[15px] font-medium text-foam backdrop-blur-sm transition-colors hover:border-sea-300/60 hover:bg-abyss-900/70"
              >
                <Code2 className="h-4 w-4" />
                Read the props
              </a>
            </div>
          </div>

          {/* Scroll cue. */}
          <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 -translate-x-1/2">
            <div className="flex flex-col items-center gap-1.5 text-sea-200/60">
              <span className="font-mono text-[10px] uppercase tracking-wide2">
                Scroll
              </span>
              <ChevronDown className="h-4 w-4 animate-float" />
            </div>
          </div>
        </WavyBackground>
      </section>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <main className="relative z-10">
        {/* Integration brief — answers the prompt's "questions to ask". */}
        <section className="border-t border-hairline/50 bg-abyss-900/40">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <SectionHeader
              index="00"
              kicker="Integration brief"
              title="What we're dropping in, and how it behaves"
            >
              The component is a single default export,{" "}
              <span className="font-mono text-sea-200">WavyBackground</span>,
              living at{" "}
              <span className="font-mono text-sea-200">
                components/ui/blue-meshy-background.tsx
              </span>
              . Here is the contract it ships with.
            </SectionHeader>

            <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-hairline/70 bg-hairline/40 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  q: "Props passed in",
                  a: "children (overlay) + an optional className for height & layout. No data props — every visual is a baked-in constant.",
                },
                {
                  q: "State management",
                  a: "None external. A single useEffect owns the WebGL context, the rAF loop and a resize listener; all torn down on unmount.",
                },
                {
                  q: "Required assets",
                  a: "Zero. The shader is fully procedural — no images, textures or fonts are needed for the effect itself.",
                },
                {
                  q: "Responsive behaviour",
                  a: "The canvas tracks window.innerWidth/Height every frame, so it always fills the viewport and re-fits on resize.",
                },
              ].map((item) => (
                <div key={item.q} className="bg-abyss-900/90 p-6">
                  <dt className="flex items-center gap-2 font-display text-sm font-medium text-sea-200">
                    <CircleDot className="h-3.5 w-3.5 text-sea-400" />
                    {item.q}
                  </dt>
                  <dd className="mt-2.5 text-[13.5px] leading-relaxed text-steel">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-sea-500/20 bg-sea-500/[0.06] p-4 text-[13px] leading-relaxed text-foam/80">
              <Box className="mt-0.5 h-4 w-4 flex-shrink-0 text-sea-300" />
              <p>
                <span className="font-medium text-sea-100">
                  Best place to use it:
                </span>{" "}
                as a full-bleed{" "}
                <span className="font-mono text-sea-200">min-h-screen</span> hero
                background behind a headline and CTA (the shipped pattern), or
                height-constrained as a section band. Mount one instance per view
                — each spins up its own GL context.
              </p>
            </div>
          </div>
        </section>

        {/* SETUP */}
        <section id="setup" className="scroll-mt-20 border-t border-hairline/50">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <SectionHeader
              index="01"
              kicker="Prerequisites"
              title="Set up shadcn, Tailwind & TypeScript"
            >
              The component expects a shadcn-style project: Tailwind for the
              utility classes, TypeScript for the types, and the{" "}
              <span className="font-mono text-sea-200">@/*</span> alias for its
              imports. If your repo already has these, skip ahead. Otherwise:
            </SectionHeader>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="space-y-5">
                <CodeBlock label="terminal" code={SNIP_VITE} />
                <CodeBlock label="terminal" code={SNIP_TAILWIND} />
                <CodeBlock label="terminal" code={SNIP_SHADCN} />
              </div>
              <div className="space-y-5">
                <CodeBlock
                  label="tsconfig.json"
                  language="json"
                  code={SNIP_ALIAS}
                />
                <CodeBlock
                  label="src/lib/utils.ts"
                  language="ts"
                  code={SNIP_UTILS}
                />
              </div>
            </div>

            {/* Why components/ui matters. */}
            <div className="mt-8 grid gap-5 rounded-2xl border border-hairline/70 bg-abyss-900/60 p-6 sm:p-8 lg:grid-cols-[auto,1fr] lg:items-start lg:gap-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-sea-500/30 bg-sea-500/10 text-sea-300">
                <Component className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-foam">
                  Default paths — and why{" "}
                  <span className="font-mono text-sea-200">
                    components/ui
                  </span>{" "}
                  matters
                </h3>
                <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-steel">
                  shadcn resolves two aliases from{" "}
                  <span className="font-mono text-sea-200">components.json</span>
                  : <span className="font-mono text-sea-200">ui</span> →{" "}
                  <span className="font-mono text-sea-200">
                    @/components/ui
                  </span>{" "}
                  and <span className="font-mono text-sea-200">utils</span> →{" "}
                  <span className="font-mono text-sea-200">@/lib/utils</span>. If
                  your default component path is not{" "}
                  <span className="font-mono text-sea-200">
                    /components/ui
                  </span>
                  , create it. It is the convention every shadcn component (and
                  the CLI's <span className="font-mono text-sea-200">add</span>{" "}
                  command) writes to and imports from — keeping it consistent
                  means the <span className="font-mono text-sea-200">@/</span>{" "}
                  imports in this file resolve unchanged, generated components
                  land predictably, and your primitives stay separated from
                  composed app components. This project ships exactly that:
                </p>
                <div className="mt-4 overflow-x-auto rounded-lg border border-hairline/70 bg-abyss-950/70 p-4 font-mono text-[12px] leading-relaxed text-steel">
                  <div>src/</div>
                  <div className="pl-3">
                    components/
                  </div>
                  <div className="pl-6 text-sea-200">
                    ui/blue-meshy-background.tsx{" "}
                    <span className="text-steel/60">· the component</span>
                  </div>
                  <div className="pl-6 text-sea-200">
                    ui/demo.tsx{" "}
                    <span className="text-steel/60">· the shipped demo</span>
                  </div>
                  <div className="pl-3">
                    lib/<span className="text-sea-200">utils.ts</span>{" "}
                    <span className="text-steel/60">· cn() helper</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ANATOMY */}
        <section
          id="anatomy"
          className="scroll-mt-20 border-t border-hairline/50 bg-abyss-900/40"
        >
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <SectionHeader
              index="02"
              kicker="Anatomy"
              title="Procedural, dependency-free, self-cleaning"
            >
              No external libraries power the effect. Here is what is actually
              doing the work inside the component.
            </SectionHeader>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="group relative overflow-hidden rounded-2xl border border-hairline/70 bg-abyss-900/70 p-6 transition-colors hover:border-sea-500/40"
                >
                  <div className="pointer-events-none absolute inset-0 blueprint opacity-40" />
                  <div className="relative">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-sea-500/30 bg-sea-500/10 text-sea-300">
                      <f.icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foam">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-steel">
                      {f.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Usage snippet. */}
            <div className="mt-8">
              <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide2 text-sea-400/90">
                <Code2 className="h-3.5 w-3.5" />
                The whole integration, in one import
              </div>
              <CodeBlock label="Hero.tsx" language="tsx" code={SNIP_USAGE} />
            </div>
          </div>
        </section>

        {/* API */}
        <section id="api" className="scroll-mt-20 border-t border-hairline/50">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <SectionHeader
              index="03"
              kicker="Reference"
              title="Props & shader parameters"
            >
              The public API is intentionally tiny. The richness lives in the
              module-level constants — surfaced here so you can fork the look.
            </SectionHeader>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {/* Props */}
              <div>
                <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide2 text-sea-400/90">
                  <Boxes className="h-3.5 w-3.5" />
                  Component props
                </div>
                <div className="overflow-hidden rounded-2xl border border-hairline/70">
                  {PROPS.map((p, i) => (
                    <div
                      key={p.name}
                      className={`p-5 ${
                        i > 0 ? "border-t border-hairline/60" : ""
                      } bg-abyss-900/70`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <code className="font-mono text-[13.5px] font-medium text-sea-200">
                          {p.name}
                        </code>
                        <code className="rounded bg-abyss-950/70 px-1.5 py-0.5 font-mono text-[11.5px] text-steel">
                          {p.type}
                        </code>
                        <span
                          className={`rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${
                            p.required
                              ? "bg-sea-500/15 text-sea-200"
                              : "bg-abyss-800 text-steel"
                          }`}
                        >
                          {p.required ? "required" : "optional"}
                        </span>
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-steel">
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shader params */}
              <div>
                <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide2 text-sea-400/90">
                  <Palette className="h-3.5 w-3.5" />
                  Shader constants
                </div>
                <div className="overflow-hidden rounded-2xl border border-hairline/70 bg-abyss-900/70">
                  <div className="max-h-[360px] overflow-y-auto">
                    <table className="w-full border-collapse text-left">
                      <tbody>
                        {PARAMS.map((p, i) => (
                          <tr
                            key={p.name}
                            className={i > 0 ? "border-t border-hairline/50" : ""}
                          >
                            <td className="whitespace-nowrap px-4 py-3 align-top font-mono text-[12.5px] text-sea-200">
                              {p.name}
                            </td>
                            <td className="whitespace-nowrap px-2 py-3 align-top font-mono text-[12.5px] tabular-nums text-foam/80">
                              {p.value}
                            </td>
                            <td className="px-4 py-3 align-top text-[12.5px] leading-relaxed text-steel">
                              {p.note}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USAGE GALLERY */}
        <section
          id="usage"
          className="scroll-mt-20 border-t border-hairline/50 bg-abyss-900/40"
        >
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <SectionHeader
              index="04"
              kicker="In the wild"
              title="Where the background earns its place"
            >
              The transparent floor lets it sit under real UI. Three patterns
              that play to its strengths.
            </SectionHeader>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {USE_CASES.map((u) => (
                <article
                  key={u.title}
                  className="group overflow-hidden rounded-2xl border border-hairline/70 bg-abyss-900/70 transition-all duration-300 hover:-translate-y-1 hover:border-sea-500/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={u.img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss-900 via-abyss-900/30 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-md border border-sea-300/30 bg-abyss-950/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-sea-100 backdrop-blur-sm">
                      {u.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold text-foam">
                      {u.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-steel">
                      {u.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="border-t border-hairline/60 bg-abyss-950">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-sea-500/40 bg-sea-500/10 text-sea-300">
              <Waves className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-medium">Blue Meshy Lab</p>
              <p className="font-mono text-[11px] text-steel">
                blue-meshy-background · components/ui
              </p>
            </div>
          </div>
          <p className="max-w-md text-[12.5px] leading-relaxed text-steel">
            A faithful shadcn integration of the verbatim WebGL2 “blue meshy”
            background — rebuilt as a live preview, install guide and props
            reference. Procedural, offline, zero runtime dependencies beyond
            React.
          </p>
        </div>
      </footer>
    </div>
  );
}
