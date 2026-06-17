import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Box,
  Cpu,
  Gauge,
  Layers,
  Maximize2,
  Terminal,
  Waypoints,
} from "lucide-react";
import { ShaderAnimation } from "@/components/ui/shader-lines";
import { CodeBlock } from "@/components/code-block";
import {
  COMPONENT_TSX,
  FRAGMENT_GLSL,
  INSTALL_CLI,
  USAGE_TSX,
} from "@/lib/snippets";
import { cn } from "@/lib/utils";

type Tab = "use" | "component" | "shader";

const TABS: { id: Tab; label: string; file: string; lang: string; code: string }[] = [
  { id: "use", label: "Usage", file: "demo.tsx", lang: "tsx", code: USAGE_TSX },
  {
    id: "component",
    label: "Component",
    file: "shader-lines.tsx",
    lang: "tsx",
    code: COMPONENT_TSX,
  },
  {
    id: "shader",
    label: "Fragment shader",
    file: "line-field.frag",
    lang: "glsl",
    code: FRAGMENT_GLSL,
  },
];

const UNIFORMS = [
  { name: "time", glsl: "uniform float", note: "advances ~0.05 / frame × speed" },
  { name: "resolution", glsl: "uniform vec2", note: "tracked by ResizeObserver" },
];

const SPECS = [
  { icon: Box, k: "Geometry", v: "1× full-screen quad" },
  { icon: Layers, k: "Draw calls", v: "1 per frame" },
  { icon: Cpu, k: "Runtime", v: "Three.js r89, vendored" },
  { icon: Maximize2, k: "Sizing", v: "fills any sized parent" },
];

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export default function App() {
  const [tab, setTab] = useState<Tab>("use");
  const [speed, setSpeed] = useState(1);
  const scrolled = useScrolled();
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-900 text-bone">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "border-b border-white/10 bg-ink-900/80 backdrop-blur-md"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex max-w-shell items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <Mark />
            <span className="font-mono text-[13px] tracking-tight text-bone/80">
              shader<span className="text-ember">/</span>lines
            </span>
          </a>
          <nav className="hidden items-center gap-7 font-mono text-[12.5px] text-bone/55 md:flex">
            <a className="transition hover:text-bone" href="#live">
              Live
            </a>
            <a className="transition hover:text-bone" href="#install">
              Install
            </a>
            <a className="transition hover:text-bone" href="#anatomy">
              Anatomy
            </a>
            <a className="transition hover:text-bone" href="#api">
              API
            </a>
          </nav>
          <a
            href="https://threejs.org/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 font-mono text-[12px] text-bone/75 transition hover:border-cyan/45 hover:text-cyan"
          >
            r89
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      {/* ── Hero: the shader IS the thesis ─────────────────────────────── */}
      <section id="top" className="relative">
        <div className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
          <ShaderAnimation speed={speed} className="absolute inset-0 h-full w-full" />

          {/* legibility scrims */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-900/55 via-transparent to-ink-900" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_18%,transparent_38%,rgba(6,6,10,0.72))]" />

          <div className="relative z-10 mx-auto flex h-full max-w-shell flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20">
            <p className="animate-fade-up font-mono text-[12px] uppercase tracking-[0.32em] text-gold [animation-delay:60ms]">
              components / ui / shaders
            </p>
            <h1 className="mt-4 animate-fade-up font-display text-[clamp(3.2rem,12vw,9.5rem)] font-bold leading-[0.86] tracking-tighter text-bone [animation-delay:120ms]">
              Shader Lines
            </h1>
            <p className="mt-5 max-w-xl animate-fade-up text-balance text-[15px] leading-relaxed text-bone/70 [animation-delay:220ms] sm:text-base">
              A single-file React component that fills any sized box with a live
              GLSL line field — chromatic streaks radiating from center, stepped
              through a mosaic. Drop it into{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-cyan">
                components/ui
              </code>{" "}
              and give the parent a height.
            </p>

            <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:320ms]">
              <a
                href="#install"
                className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 font-mono text-[13px] font-medium text-ink-900 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
              >
                <Terminal className="h-4 w-4" /> Get the snippet
              </a>
              <SpeedDial speed={speed} onChange={setSpeed} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Spec band ──────────────────────────────────────────────────── */}
      <section className="border-y border-white/10 bg-ink-800/50">
        <div className="mx-auto grid max-w-shell grid-cols-2 divide-x divide-white/10 px-0 sm:grid-cols-4">
          {SPECS.map(({ icon: Icon, k, v }) => (
            <div key={k} className="px-5 py-6 sm:px-8">
              <Icon className="h-4 w-4 text-ember" />
              <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-bone/40">
                {k}
              </div>
              <div className="mt-1 font-display text-base font-medium text-bone">
                {v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live demo card (the prompt's DemoOne, made interactive) ─────── */}
      <Section
        id="live"
        eyebrow="01 — Live"
        title="The component, exactly as shipped"
        lead="This is the reference demo from the integration brief: a sized, rounded box the shader fills, with a wordmark layered on top. Resize your window — the field re-samples to the box, not the page."
      >
        <figure className="relative flex h-[480px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 sm:h-[560px]">
          <ShaderAnimation speed={speed} className="absolute inset-0 h-full w-full" />
          <span className="pointer-events-none z-10 whitespace-pre-wrap text-center font-display text-[clamp(2.4rem,9vw,5.5rem)] font-semibold leading-none tracking-tighter text-white">
            Shader Lines
          </span>
          <figcaption className="pointer-events-none absolute bottom-4 left-4 z-10 font-mono text-[11px] text-white/55">
            &lt;ShaderAnimation /&gt; · h-[560px] · rounded-2xl
          </figcaption>
        </figure>
      </Section>

      {/* ── Install / code panel ───────────────────────────────────────── */}
      <Section
        id="install"
        eyebrow="02 — Install"
        title="Copy it into components/ui"
        lead={
          <>
            shadcn resolves <code className="font-mono text-cyan">@/components/ui</code>{" "}
            via the alias in <code className="font-mono text-cyan">tsconfig</code> +{" "}
            <code className="font-mono text-cyan">components.json</code>. Keeping the
            file there is what makes the import in the demo resolve unchanged.
          </>
        }
      >
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {/* Tabbed source, like a shadcn docs page */}
            <div className="mb-3 flex flex-wrap gap-1.5">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "rounded-md px-3 py-1.5 font-mono text-[12px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan/60",
                    tab === t.id
                      ? "bg-white/10 text-bone"
                      : "text-bone/45 hover:text-bone/80"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <CodeBlock
              key={active.id}
              code={active.code}
              filename={active.file}
              lang={active.lang}
            />
          </div>

          <div className="lg:col-span-2">
            <p className="mb-3 font-mono text-[12px] uppercase tracking-widest text-bone/40">
              Terminal
            </p>
            <CodeBlock code={INSTALL_CLI} filename="setup.sh" lang="bash" />
            <div className="mt-5 rounded-xl border border-gold/20 bg-gold/[0.05] p-4">
              <p className="font-mono text-[12px] uppercase tracking-widest text-gold/90">
                Why /components/ui?
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-bone/70">
                If your alias doesn't point there, the demo's{" "}
                <code className="font-mono text-cyan">@/components/ui/shader-lines</code>{" "}
                import fails to resolve. The folder is the contract shadcn relies on —
                create it and the rest is copy-paste.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Anatomy ────────────────────────────────────────────────────── */}
      <Section
        id="anatomy"
        eyebrow="03 — Anatomy"
        title="One quad, one shader, three channels"
        lead="No textures, no meshes, no scene graph to speak of. A full-screen quad runs a fragment shader that accumulates five offset lines per colour channel into the glow you see."
      >
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
          {[
            {
              icon: Waypoints,
              step: "Mosaic",
              body: "UV space is quantised to a 4×2 grid, stair-stepping every streak into the signature blocky lines.",
            },
            {
              icon: Layers,
              step: "Accumulate",
              body: "For each of R/G/B, five fract-offset lines are summed by inverse distance — that's the bloom.",
            },
            {
              icon: Gauge,
              step: "Advance",
              body: "The time uniform creeps each frame, sliding the field outward forever from the center point.",
            },
          ].map(({ icon: Icon, step, body }, i) => (
            <li key={step} className="bg-ink-800/80 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] text-bone/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon className="h-4 w-4 text-cyan" />
                <span className="font-display text-lg font-medium text-bone">
                  {step}
                </span>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-bone/65">{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── API ────────────────────────────────────────────────────────── */}
      <Section
        id="api"
        eyebrow="04 — API"
        title="Props & uniforms"
        lead="The surface is tiny on purpose. Two optional props on the React side, two uniforms on the GPU side."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Props" sub="ShaderAnimationProps">
            <Row name="className" type="string?" note="classes for the canvas host — default fills the parent" />
            <Row name="speed" type="number?" note="clock multiplier (default 1)" last />
          </Panel>
          <Panel title="Uniforms" sub="GLSL">
            {UNIFORMS.map((u, i) => (
              <Row
                key={u.name}
                name={u.name}
                type={u.glsl}
                note={u.note}
                last={i === UNIFORMS.length - 1}
              />
            ))}
          </Panel>
        </div>
      </Section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="relative mt-8 border-t border-white/10">
        <div className="relative h-44 overflow-hidden sm:h-56">
          <ShaderAnimation speed={speed * 0.7} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-ink-900/55 scrim-bottom" />
          <div className="relative z-10 mx-auto flex h-full max-w-shell items-end justify-between px-5 pb-7 sm:px-8">
            <div className="flex items-center gap-2.5">
              <Mark />
              <span className="font-mono text-[12px] text-bone/65">
                shader<span className="text-ember">/</span>lines
              </span>
            </div>
            <p className="font-mono text-[11px] text-bone/45">
              GLSL line field · Three.js r89 · vendored & offline
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Local building blocks ────────────────────────────────────────────── */

function Mark() {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-md bg-ink-700 ring-1 ring-white/10">
      <svg width="16" height="16" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M5 11 H27" stroke="#ffd166" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5 16 H27" stroke="#ff7a18" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5 21 H27" stroke="#3ef0ff" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-20 bg-grid">
      <div className="mx-auto max-w-shell px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[12px] uppercase tracking-[0.28em] text-ember">
          {eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.8rem,5vw,3.1rem)] font-bold leading-[1.02] tracking-tight text-bone">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-balance text-[15px] leading-relaxed text-bone/60">
          {lead}
        </p>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Panel({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60">
      <div className="flex items-baseline justify-between border-b border-white/10 px-5 py-3.5">
        <span className="font-display text-base font-medium text-bone">{title}</span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-bone/35">
          {sub}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function Row({
  name,
  type,
  note,
  last,
}: {
  name: string;
  type: string;
  note: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1 px-5 py-4",
        !last && "border-b border-white/10"
      )}
    >
      <code className="font-mono text-[13.5px] text-cyan">{name}</code>
      <code className="justify-self-end rounded bg-white/5 px-2 py-0.5 font-mono text-[11.5px] text-bone/55">
        {type}
      </code>
      <p className="col-span-2 text-[13px] leading-relaxed text-bone/55">{note}</p>
    </div>
  );
}

function SpeedDial({
  speed,
  onChange,
}: {
  speed: number;
  onChange: (v: number) => void;
}) {
  const options = [
    { v: 0.4, label: "Calm" },
    { v: 1, label: "1×" },
    { v: 2, label: "Fast" },
  ];
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/12 bg-ink-900/50 p-1 backdrop-blur">
      <span className="px-2 font-mono text-[11px] text-bone/40">speed</span>
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => onChange(o.v)}
          aria-pressed={speed === o.v}
          className={cn(
            "rounded-full px-3 py-1 font-mono text-[12px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan/60",
            speed === o.v
              ? "bg-ember text-ink-900"
              : "text-bone/60 hover:text-bone"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
