import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  Box,
  CircleDot,
  Code2,
  Copy,
  Check,
  Cpu,
  FileCode2,
  FolderTree,
  Gauge,
  Layers,
  MousePointer2,
  Radical,
  Sparkles,
  Terminal,
  Waves,
} from "lucide-react";
import RadialShader from "@/components/ui/radial-shader";
import { cn } from "@/lib/utils";

/* ============================================================================
 * Radial Bloom — a showcase that integrates the verbatim `radial-shader.tsx`
 * shadcn `components/ui` piece.
 *
 * The component itself ships a single fullscreen WebGL2 fragment shader: seven
 * polar-gated rings that bloom out of the centre and rotate at per-ring rates.
 * It is rendered UNMODIFIED as the page's fixed background layer (its intended
 * `position:fixed; inset:0` fullscreen mode), and this file frames it as an
 * observatory instrument — a glass hero lockup, a live telemetry HUD that
 * mirrors the shader's own per-frame clock, and a scrollable integration guide
 * documenting the shadcn/Tailwind/TypeScript setup.
 * ========================================================================== */

/* ---- Telemetry: a faithful mirror of the shader's clock --------------------
 * The verbatim component keeps `iTime` / `iFrame` private inside its render
 * loop and exposes no callback, so to surface live numbers without touching the
 * component we run the IDENTICAL clock here (seconds since mount + a per-frame
 * counter). It reads the same wall clock the shader does, so the HUD tracks the
 * visuals frame-for-frame. The "ringPhase" values reproduce the shader's
 * per-ring rotation term `t * sin(i*i) + i*i` so the readout genuinely
 * describes what is on screen. */
type Telemetry = {
  time: number;
  frame: number;
  fps: number;
  ringPhase: number[];
};

const RING_COUNT = 7;

function useShaderTelemetry(running: boolean): Telemetry {
  const [telemetry, setTelemetry] = useState<Telemetry>({
    time: 0,
    frame: 0,
    fps: 0,
    ringPhase: new Array(RING_COUNT).fill(0),
  });
  const frame = useRef(0);
  const last = useRef(performance.now());
  const fpsAccum = useRef({ frames: 0, since: performance.now(), fps: 0 });
  const raf = useRef<number | null>(null);
  const accumulated = useRef(0); // frozen-time accumulator when paused

  useEffect(() => {
    let mounted = true;
    function tick(now: number) {
      if (!mounted) return;
      const dt = now - last.current;
      last.current = now;
      if (running) accumulated.current += dt;
      const t = accumulated.current / 1000;
      frame.current += 1;

      // rolling FPS, recomputed ~3x/sec
      const fa = fpsAccum.current;
      fa.frames += 1;
      if (now - fa.since >= 333) {
        fa.fps = (fa.frames * 1000) / (now - fa.since);
        fa.frames = 0;
        fa.since = now;
      }

      // mirror the shader's per-ring rotation phase: t*sin(i*i) + i*i  (i = 1..7)
      const phases: number[] = [];
      for (let i = 1; i <= RING_COUNT; i++) {
        const p = (t * Math.sin(i * i) + i * i) % (Math.PI * 2);
        phases.push(p < 0 ? p + Math.PI * 2 : p);
      }

      setTelemetry({
        time: t,
        frame: frame.current,
        fps: fa.fps,
        ringPhase: phases,
      });
      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => {
      mounted = false;
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [running]);

  return telemetry;
}

/* ---- Small presentational atoms ------------------------------------------ */

function Pill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-hairline/80 bg-void-900/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wide2 text-ash",
        className,
      )}
    >
      {children}
    </span>
  );
}

function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wide3 text-signal-amber">
      <span className="text-dim">{index}</span>
      <span className="h-px w-8 bg-hairline" />
      <span className="text-ash">{children}</span>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="relative min-w-0">
      <div className="font-mono text-[10px] uppercase tracking-wide2 text-dim">
        {label}
      </div>
      <div className="mt-1 truncate font-mono text-base tabular-nums text-bone">
        {value}
        {sub && <span className="ml-1 text-xs text-ash">{sub}</span>}
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          },
          () => {},
        );
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-hairline/80 bg-void-800/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide2 text-ash transition-colors hover:border-signal-amber/50 hover:text-bone"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="h-3 w-3 text-signal-cyan" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function CodeBlock({
  code,
  lang = "bash",
}: {
  code: string;
  lang?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-hairline/70 bg-void-950/80 ring-hairline">
      <div className="flex items-center justify-between border-b border-hairline/60 px-3.5 py-2">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-dim">
          <span className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-signal-ember/70" />
            <span className="h-2 w-2 rounded-full bg-signal-amber/70" />
            <span className="h-2 w-2 rounded-full bg-signal-cyan/70" />
          </span>
          {lang}
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-relaxed text-bone/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ---- Page ---------------------------------------------------------------- */

const STEP_NEW = `# 1 · scaffold a Vite + React + TypeScript app
npm create vite@latest radial-bloom -- --template react-ts
cd radial-bloom

# 2 · Tailwind CSS (+ PostCSS / Autoprefixer)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 3 · initialise shadcn/ui (writes components.json + the @/ alias)
npx shadcn@latest init`;

const STEP_ALIAS = `// tsconfig.json — teach TypeScript the "@/..." alias
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}

// vite.config.ts — teach the bundler the same alias
import path from "path";
export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});`;

const STEP_DEPS = `# the component is pure WebGL2 — no shader runtime, no three.js.
# the only runtime dep is React (already present). lucide-react +
# the cn() helpers below are used by THIS showcase, not the shader.
npm install lucide-react clsx tailwind-merge`;

const STEP_USAGE = `// src/demo.tsx — the canonical usage from the brief
import Component from "@/components/ui/radial-shader";

export default function DemoOne() {
  return <Component />;
}`;

const COMPONENTS_JSON = `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "utils": "@/lib/utils"
  }
}`;

export default function App() {
  const [running, setRunning] = useState(true);
  const t = useShaderTelemetry(running);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const [mouseLabel, setMouseLabel] = useState("0.50, 0.50");

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const x = e.clientX / window.innerWidth;
      const y = 1 - e.clientY / window.innerHeight;
      mouse.current = { x, y };
      setMouseLabel(`${x.toFixed(2)}, ${y.toFixed(2)}`);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // The dominant ring (the brightest petal at this instant) — a cheap proxy
  // for "what the bloom is doing right now", derived from the mirrored phase.
  const activeRing = useMemo(() => {
    let best = 0;
    let bestVal = -Infinity;
    t.ringPhase.forEach((p, i) => {
      const v = Math.cos(p);
      if (v > bestVal) {
        bestVal = v;
        best = i;
      }
    });
    return best + 1;
  }, [t.ringPhase]);

  return (
    <div className="relative min-h-screen w-full text-bone">
      {/* ---- Layer 0: the verbatim shadcn component, fullscreen + fixed ----
          Rendered unmodified — this is its intended `position:fixed inset:0`
          fullscreen mode. Everything below scrolls over it; opaque panels mask
          it where we want type to read, and it shows through the hero + gaps. */}
      <div aria-hidden className="fixed inset-0 z-0">
        <RadialShader />
        {/* legibility scrims so white type survives over the bright bloom */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void-950/70 via-transparent to-void-950/85" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_18%,transparent_38%,rgba(4,4,6,0.78)_100%)]" />
      </div>

      {/* ---- Fixed instrument chrome over the shader --------------------- */}
      <TopBar running={running} onToggle={() => setRunning((r) => !r)} />
      <TelemetryHud telemetry={t} activeRing={activeRing} mouseLabel={mouseLabel} />

      {/* ---- Scrollable content ---------------------------------------- */}
      <main className="relative z-10">
        <Hero activeRing={activeRing} />
        <DocumentationDeck />
      </main>
    </div>
  );
}

/* ---- Fixed top bar ------------------------------------------------------- */

function TopBar({
  running,
  onToggle,
}: {
  running: boolean;
  onToggle: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="glass border-b border-hairline/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-md border border-signal-amber/40 bg-void-900/70">
              <Radical className="h-3.5 w-3.5 text-signal-amber" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wide2 text-bone">
              radial<span className="text-signal-amber">·</span>bloom
            </span>
          </div>

          <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-wide2 text-ash md:flex">
            <a href="#overview" className="transition-colors hover:text-bone">
              Overview
            </a>
            <a href="#anatomy" className="transition-colors hover:text-bone">
              Anatomy
            </a>
            <a href="#integration" className="transition-colors hover:text-bone">
              Integration
            </a>
            <a href="#api" className="transition-colors hover:text-bone">
              API
            </a>
          </nav>

          <button
            type="button"
            onClick={onToggle}
            className="inline-flex items-center gap-2 rounded-md border border-hairline/80 bg-void-800/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide2 text-ash transition-colors hover:border-signal-amber/50 hover:text-bone"
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                running ? "animate-blink bg-signal-cyan" : "bg-dim",
              )}
            />
            {running ? "clock · live" : "clock · held"}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---- Fixed telemetry HUD (right rail) ------------------------------------ */

function TelemetryHud({
  telemetry,
  activeRing,
  mouseLabel,
}: {
  telemetry: Telemetry;
  activeRing: number;
  mouseLabel: string;
}) {
  return (
    <aside className="fixed right-5 top-1/2 z-20 hidden w-60 -translate-y-1/2 lg:block">
      <div className="glass-strong relative rounded-2xl border border-hairline/70 p-4 ring-hairline">
        <span className="corner-tl" />
        <span className="corner-tr" />
        <span className="corner-bl" />
        <span className="corner-br" />

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-signal-amber">
            <Activity className="h-3 w-3" />
            telemetry
          </span>
          <span className="font-mono text-[10px] text-dim">WEBGL2</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4">
          <Stat label="iTime" value={telemetry.time.toFixed(2)} sub="s" />
          <Stat label="iFrame" value={String(telemetry.frame)} />
          <Stat label="render" value={telemetry.fps.toFixed(0)} sub="fps" />
          <Stat label="rings" value={`${RING_COUNT}`} />
        </div>

        <div className="my-4 h-px w-full bg-hairline/70" />

        {/* per-ring phase meters — mirror of t*sin(i*i)+i*i */}
        <div className="font-mono text-[10px] uppercase tracking-wide2 text-dim">
          ring phase
        </div>
        <div className="mt-2 space-y-1.5">
          {telemetry.ringPhase.map((p, i) => {
            const frac = p / (Math.PI * 2);
            const hot = i + 1 === activeRing;
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 font-mono text-[9px] text-dim">{i + 1}</span>
                <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-void-700">
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full",
                      hot ? "bg-signal-amber" : "bg-signal-violet/60",
                    )}
                    style={{ width: `${frac * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="my-4 h-px w-full bg-hairline/70" />

        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wide2">
          <span className="flex items-center gap-1.5 text-dim">
            <MousePointer2 className="h-3 w-3" />
            iMouse
          </span>
          <span className="tabular-nums text-ash">{mouseLabel}</span>
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wide2">
          <span className="flex items-center gap-1.5 text-dim">
            <CircleDot className="h-3 w-3" />
            peak ring
          </span>
          <span className="tabular-nums text-signal-amber">#{activeRing}</span>
        </div>
      </div>
    </aside>
  );
}

/* ---- Hero ---------------------------------------------------------------- */

function Hero({ activeRing }: { activeRing: number }) {
  return (
    <section
      id="overview"
      className="relative flex min-h-screen flex-col justify-center px-5 pt-24 pb-16 sm:px-8"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <div className="animate-fade-in flex flex-wrap items-center gap-2.5">
            <Pill className="border-signal-amber/30 text-signal-amber">
              <Sparkles className="h-3 w-3" />
              shadcn · components/ui
            </Pill>
            <Pill>
              <Cpu className="h-3 w-3" />
              WebGL2 · GLSL ES 3.00
            </Pill>
            <Pill>single full-screen triangle</Pill>
          </div>

          <h1 className="mt-7 font-display text-[15vw] font-bold leading-[0.86] tracking-tight text-bone sm:text-7xl lg:text-8xl">
            Radial
            <br />
            <span className="font-serif font-normal italic text-transparent [background:linear-gradient(100deg,#f0b35e,#ef6f4a_38%,#e85d8a_66%,#9d7bf0)] [-webkit-background-clip:text] [background-clip:text]">
              Bloom
            </span>
          </h1>

          <p className="mt-6 max-w-readable text-pretty font-sans text-base leading-relaxed text-ash sm:text-lg">
            A single-file WebGL2 fragment shader — seven polar-gated rings that
            bloom out of the centre, each rotating at its own{" "}
            <span className="text-bone">t·sin(i²)</span> rate and tinted by a
            phase-shifted cosine palette — dropped verbatim into a shadcn{" "}
            <code className="rounded bg-void-800/80 px-1.5 py-0.5 font-mono text-[13px] text-signal-amber">
              @/components/ui
            </code>{" "}
            slot and framed as a live instrument.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#integration"
              className="group inline-flex items-center gap-2 rounded-lg border border-signal-amber/40 bg-signal-amber/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wide2 text-signal-amber transition-colors hover:bg-signal-amber/20"
            >
              <Terminal className="h-3.5 w-3.5" />
              Integration guide
              <ArrowDownRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#anatomy"
              className="inline-flex items-center gap-2 rounded-lg border border-hairline/80 bg-void-900/50 px-5 py-2.5 font-mono text-xs uppercase tracking-wide2 text-ash transition-colors hover:border-bone/30 hover:text-bone"
            >
              <Layers className="h-3.5 w-3.5" />
              How it draws
            </a>
          </div>

          {/* hero footer ticker */}
          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-hairline/60 pt-6 font-mono text-[11px] uppercase tracking-wide2 text-dim">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal-cyan" />
              shader live · peak ring{" "}
              <span className="text-signal-amber">#{activeRing}</span>
            </span>
            <span>0 image assets</span>
            <span>0 shader libraries</span>
            <span className="hidden sm:inline">~6 KB component</span>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#anatomy"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-dim transition-colors hover:text-ash sm:flex"
      >
        scroll
        <span className="h-9 w-px bg-gradient-to-b from-signal-amber/60 to-transparent" />
      </a>
    </section>
  );
}

/* ---- Documentation deck (the scrollable integration story) -------------- */

function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-hairline/70 bg-void-900/85 p-6 ring-hairline backdrop-blur-sm sm:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

function DocumentationDeck() {
  return (
    <div className="relative">
      {/* solid backdrop so the long-form text reads cleanly over the shader */}
      <div className="absolute inset-0 -z-10 bg-void-950/92" />
      <div className="absolute inset-0 -z-10 grain opacity-[0.5]" />

      <div className="mx-auto max-w-7xl space-y-24 px-5 py-24 sm:px-8 lg:py-32">
        <Anatomy />
        <Integration />
        <Api />
        <Footer />
      </div>
    </div>
  );
}

/* -- Anatomy --------------------------------------------------------------- */

const ANATOMY = [
  {
    icon: Box,
    title: "One fullscreen triangle",
    body: "A single oversized triangle (-1,-1 / 3,-1 / -1,3) covers the viewport via one drawArrays — no quad, no index buffer. Every pixel runs the fragment shader.",
    tag: "VAO + VBO",
  },
  {
    icon: Waves,
    title: "Seven polar rings",
    body: "A 7-iteration loop builds concentric bands: a radial denom term sets each ring's radius and thickness, and a smoothstep over cos(atan(p)·3) gates it into rotating petals.",
    tag: "for i < 7",
  },
  {
    icon: Sparkles,
    title: "Phase-shifted palette",
    body: "Colour comes from 1 + sin(a − i + vec4(0,0.2,0.5,0)): each channel is offset, so the same geometry reads amber → magenta → violet → cyan as it turns.",
    tag: "cosine tint",
  },
  {
    icon: Gauge,
    title: "Tone-mapped + DPR aware",
    body: "tanh(o) compresses the accumulated glow into [0,1] so highlights never clip, and a ResizeObserver keeps the backing store at devicePixelRatio (capped at 2).",
    tag: "tanh · ResizeObserver",
  },
];

function Anatomy() {
  return (
    <section id="anatomy" className="scroll-mt-24">
      <SectionLabel index="01">Anatomy of the shader</SectionLabel>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h2 className="font-display text-3xl font-semibold leading-tight text-bone sm:text-4xl">
            A whole bloom from{" "}
            <span className="font-serif font-normal italic text-signal-amber">
              one loop
            </span>{" "}
            and one triangle.
          </h2>
          <p className="mt-5 max-w-readable text-pretty leading-relaxed text-ash">
            The component is a faithful WebGL2 port of a compact GLSL one-liner.
            There is no scene graph and no shader framework — just a vertex
            shader that emits a full-screen triangle and a fragment shader that
            accumulates seven rotating rings per pixel, then tone-maps the
            result. The TypeScript wrapper handles compilation, the render loop,
            DPR-aware sizing, pointer state, and WebGL context loss/restore.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {ANATOMY.map((a) => (
              <div
                key={a.title}
                className="group relative rounded-xl border border-hairline/70 bg-void-900/70 p-4 transition-colors hover:border-signal-amber/40"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-8 w-8 place-items-center rounded-md border border-hairline/80 bg-void-800/80 text-signal-amber">
                    <a.icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wide2 text-dim">
                    {a.tag}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-sm font-semibold text-bone">
                  {a.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ash">
                  {a.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* annotated fragment-shader core */}
        <Panel className="self-start">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-signal-amber">
              <FileCode2 className="h-3.5 w-3.5" />
              fragment core
            </span>
            <span className="font-mono text-[10px] text-dim">GLSL ES 3.00</span>
          </div>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-hairline/60 bg-void-950/80 p-4 font-mono text-[12px] leading-relaxed text-bone/90">
            <code>{`vec2 p = FC.xy - r * 0.5;
for (float i, a; i++ < 7.0; ) {
  // ring radius + thickness
  a = length(p)/r.y - i*i/50.0;
  float denom = max(a, -a*4.0) + 2.0/r.y;

  // gate into rotating petals
  a = atan(p.y, p.x)*3.0
      + t*sin(i*i) + i*i;
  float gate = smoothstep(0.0, 0.6, cos(a));

  // accumulate, phase-shifted palette
  o += 0.02/denom * gate
     * (1.0 + sin(a - i
       + vec4(0.0, 0.2, 0.5, 0.0)));
}
o = tanh(o);   // tone-map`}</code>
          </pre>
          <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-wide2">
            <div className="rounded-md border border-hairline/60 bg-void-900/60 px-2.5 py-2">
              <div className="text-dim">rings</div>
              <div className="mt-0.5 text-bone">7</div>
            </div>
            <div className="rounded-md border border-hairline/60 bg-void-900/60 px-2.5 py-2">
              <div className="text-dim">uniforms</div>
              <div className="mt-0.5 text-bone">4</div>
            </div>
            <div className="rounded-md border border-hairline/60 bg-void-900/60 px-2.5 py-2">
              <div className="text-dim">draws</div>
              <div className="mt-0.5 text-bone">1</div>
            </div>
          </div>
        </Panel>
      </div>
    </section>
  );
}

/* -- Integration ----------------------------------------------------------- */

const TREE = `src/
├─ components/
│  └─ ui/
│     └─ radial-shader.tsx   ← drop the component here
├─ lib/
│  └─ utils.ts               ← cn() helper
├─ demo.tsx                  ← import Component from "@/components/ui/radial-shader"
└─ index.css
components.json               ← shadcn aliases + Tailwind config`;

function Integration() {
  return (
    <section id="integration" className="scroll-mt-24">
      <SectionLabel index="02">shadcn integration</SectionLabel>
      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <h2 className="font-display text-3xl font-semibold leading-tight text-bone sm:text-4xl">
            Drop it into{" "}
            <code className="font-mono text-2xl text-signal-amber">
              components/ui
            </code>
          </h2>
          <p className="max-w-readable text-pretty leading-relaxed text-ash">
            This project already ships the required structure — Tailwind,
            TypeScript, and a shadcn{" "}
            <code className="rounded bg-void-800/80 px-1 py-0.5 font-mono text-[13px] text-bone">
              components.json
            </code>{" "}
            with the{" "}
            <code className="rounded bg-void-800/80 px-1 py-0.5 font-mono text-[13px] text-bone">
              @/
            </code>{" "}
            alias. If you are starting from scratch, the steps on the right
            scaffold an equivalent codebase.
          </p>

          <Panel className="bg-void-900/80">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-signal-amber">
              <FolderTree className="h-3.5 w-3.5" />
              resolved structure
            </div>
            <pre className="mt-3 overflow-x-auto font-mono text-[12px] leading-relaxed text-ash">
              <code>{TREE}</code>
            </pre>
          </Panel>

          <div className="rounded-xl border border-signal-amber/25 bg-signal-amber/[0.06] p-5">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-signal-amber">
              <CircleDot className="h-3.5 w-3.5" />
              why <span className="text-bone">/components/ui</span> matters
            </div>
            <p className="mt-2.5 text-[13px] leading-relaxed text-ash">
              shadcn resolves the{" "}
              <code className="font-mono text-bone">ui</code> alias to{" "}
              <code className="font-mono text-bone">@/components/ui</code>. Every
              generated or copied primitive lands there, so imports stay stable
              (<code className="font-mono text-bone">@/components/ui/…</code>),
              the CLI can find and update components in place, and your own
              composite components sit one level up in{" "}
              <code className="font-mono text-bone">@/components</code> without
              colliding. The brief's{" "}
              <code className="font-mono text-bone">demo.tsx</code> imports from
              exactly that path — keeping the folder is what makes the import
              resolve.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Step n="A" title="Scaffold the codebase (if needed)">
            <CodeBlock code={STEP_NEW} lang="bash · setup" />
          </Step>
          <Step n="B" title="Wire the @/ alias (TS + Vite)">
            <CodeBlock code={STEP_ALIAS} lang="ts · aliases" />
          </Step>
          <Step n="C" title="Install dependencies">
            <CodeBlock code={STEP_DEPS} lang="bash · deps" />
          </Step>
          <Step n="D" title="Use it">
            <CodeBlock code={STEP_USAGE} lang="tsx · demo.tsx" />
          </Step>
        </div>
      </div>
    </section>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-9">
      <span className="absolute left-0 top-0 grid h-6 w-6 place-items-center rounded-full border border-signal-amber/40 bg-void-900/80 font-mono text-[11px] text-signal-amber">
        {n}
      </span>
      <h3 className="mb-2.5 pt-0.5 font-display text-sm font-semibold text-bone">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* -- API ------------------------------------------------------------------- */

const UNIFORMS = [
  {
    name: "iResolution",
    type: "vec3",
    note: "(width, height, dpr) of the backing store",
  },
  { name: "iTime", type: "float", note: "seconds since mount, drives rotation" },
  { name: "iFrame", type: "int", note: "monotonic frame counter" },
  { name: "iMouse", type: "vec4", note: "(x, y, leftDown, rightDown), y flipped" },
];

const PROPS = [
  {
    name: "fragSource",
    type: "string",
    note: "GLSL ES 3.00 source for the inner <ShaderCanvas>",
  },
  {
    name: "pixelRatio",
    type: "number?",
    note: "override DPR (1–2). Defaults to window.devicePixelRatio",
  },
];

function Api() {
  return (
    <section id="api" className="scroll-mt-24">
      <SectionLabel index="03">Props &amp; uniforms</SectionLabel>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-signal-amber">
            <Code2 className="h-3.5 w-3.5" />
            ShaderCanvas props
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-ash">
            The default export <code className="font-mono text-bone">Component</code>{" "}
            renders a fixed-fullscreen{" "}
            <code className="font-mono text-bone">ShaderCanvas</code> with the
            built-in radial source. The inner canvas accepts:
          </p>
          <div className="mt-4 divide-y divide-hairline/60 overflow-hidden rounded-lg border border-hairline/60">
            {PROPS.map((p) => (
              <Row key={p.name} name={p.name} type={p.type} note={p.note} />
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-signal-amber">
            <Cpu className="h-3.5 w-3.5" />
            shader uniforms
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-ash">
            Provided automatically every frame — write a custom{" "}
            <code className="font-mono text-bone">fragSource</code> against this
            contract and the wrapper feeds it for free.
          </p>
          <div className="mt-4 divide-y divide-hairline/60 overflow-hidden rounded-lg border border-hairline/60">
            {UNIFORMS.map((u) => (
              <Row key={u.name} name={u.name} type={u.type} note={u.note} />
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <MiniFact icon={Layers} label="Render strategy" value="Single triangle" />
        <MiniFact icon={Box} label="Dependencies" value="React only" />
        <MiniFact icon={Gauge} label="Fallback" value="Red clear on error" />
      </div>
    </section>
  );
}

function Row({
  name,
  type,
  note,
}: {
  name: string;
  type: string;
  note: string;
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 bg-void-900/40 px-4 py-3">
      <div className="flex items-baseline gap-2">
        <code className="font-mono text-[13px] text-bone">{name}</code>
        <code className="font-mono text-[10px] text-signal-violet">{type}</code>
      </div>
      <p className="text-[12.5px] leading-relaxed text-ash">{note}</p>
    </div>
  );
}

function MiniFact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Box;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-hairline/70 bg-void-900/70 px-4 py-3.5">
      <span className="grid h-9 w-9 place-items-center rounded-lg border border-hairline/80 bg-void-800/80 text-signal-amber">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-wide2 text-dim">
          {label}
        </div>
        <div className="truncate font-display text-sm font-semibold text-bone">
          {value}
        </div>
      </div>
    </div>
  );
}

/* -- Footer ---------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-2xl border border-hairline/70 bg-void-900/85 p-8 ring-hairline sm:p-10">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-md border border-signal-amber/40 bg-void-900/70">
              <Radical className="h-3.5 w-3.5 text-signal-amber" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wide2 text-bone">
              radial<span className="text-signal-amber">·</span>bloom
            </span>
          </div>
          <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-ash">
            Drop{" "}
            <code className="font-mono text-bone">radial-shader.tsx</code> into{" "}
            <code className="font-mono text-bone">@/components/ui</code>, import
            it, and you have a fullscreen WebGL2 bloom with zero asset
            dependencies. Everything on this page — the hero, the HUD, the docs —
            is layered on top of that one component.
          </p>
        </div>

        <div className="shrink-0">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-wide2 text-dim">
            install path
          </div>
          <CodeBlock code={`# alias → @/components/ui\n${COMPONENTS_JSON}`} lang="components.json" />
        </div>
      </div>

      <div className="relative mt-9 flex flex-col items-start justify-between gap-3 border-t border-hairline/60 pt-5 font-mono text-[10px] uppercase tracking-wide2 text-dim sm:flex-row sm:items-center">
        <span>React · TypeScript · Vite · Tailwind · shadcn/ui · WebGL2 · Lucide</span>
        <span>built with Fable 5</span>
      </div>
    </footer>
  );
}
