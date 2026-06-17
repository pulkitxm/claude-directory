import { useCallback, useRef, useState } from "react";
import {
  ArrowUpRight,
  Box,
  FolderTree,
  Gauge,
  Layers,
  Pause,
  Play,
  Terminal,
  Waves,
} from "lucide-react";
import { ShaderAnimation, type ShaderFrame } from "@/components/ui/shader-animation";
import { ChannelScope } from "@/components/channel-scope";
import { CodeBlock } from "@/components/code-block";
import DemoOne from "@/demo";
import {
  DEMO_SOURCE,
  INSTALL_SOURCE,
  SHADER_ANIMATION_SOURCE,
  USAGE_SOURCE,
} from "@/source-snippets";

type Tab = "component" | "demo" | "usage";

export default function App() {
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [tab, setTab] = useState<Tab>("component");

  // Live telemetry refs — written every frame, read by the DOM directly so the
  // 60fps stream never triggers a React re-render.
  const fpsRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const uptimeRef = useRef<HTMLSpanElement>(null);

  const handleFrame = useCallback((f: ShaderFrame) => {
    if (fpsRef.current) fpsRef.current.textContent = f.fps.toFixed(0).padStart(2, "0");
    if (timeRef.current) timeRef.current.textContent = f.time.toFixed(1);
    if (uptimeRef.current) {
      const s = Math.floor(f.uptime);
      uptimeRef.current.textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    }
    // Fan out to the channel scope without prop-drilling.
    window.dispatchEvent(new CustomEvent<ShaderFrame>("shader:frame", { detail: f }));
  }, []);

  return (
    <div className="relative min-h-screen bg-ink-900 text-phosphor">
      <Nav />
      <Hero
        paused={paused}
        speed={speed}
        onFrame={handleFrame}
        onTogglePause={() => setPaused((p) => !p)}
        onSpeed={setSpeed}
        fpsRef={fpsRef}
        timeRef={timeRef}
        uptimeRef={uptimeRef}
      />
      <ChannelLab />
      <IntegrationStory />
      <SourcePanels tab={tab} setTab={setTab} />
      <DemoSection />
      <ApiSection />
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ Nav --- */

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-graphite-line/60 bg-ink-900/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-sm border border-graphite-line bg-ink-800">
            <Waves className="h-3.5 w-3.5 text-chan-g" />
          </span>
          <span className="font-mono text-[13px] tracking-[0.18em] text-phosphor/90">
            SHADER<span className="text-chan-b">·</span>ANIMATION
          </span>
        </div>
        <div className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.14em] text-graphite md:flex">
          <a href="#lab" className="transition-colors hover:text-phosphor">Channels</a>
          <a href="#install" className="transition-colors hover:text-phosphor">Install</a>
          <a href="#source" className="transition-colors hover:text-phosphor">Source</a>
          <a href="#api" className="transition-colors hover:text-phosphor">API</a>
        </div>
        <a
          href="#install"
          className="flex items-center gap-1.5 rounded-md border border-graphite-line bg-ink-800 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-phosphor/85 transition-colors hover:border-chan-g/60 hover:text-chan-g"
        >
          <span>components/ui</span>
          <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------- Hero --- */

interface HeroProps {
  paused: boolean;
  speed: number;
  onFrame: (f: ShaderFrame) => void;
  onTogglePause: () => void;
  onSpeed: (n: number) => void;
  fpsRef: React.RefObject<HTMLSpanElement>;
  timeRef: React.RefObject<HTMLSpanElement>;
  uptimeRef: React.RefObject<HTMLSpanElement>;
}

function Hero({
  paused,
  speed,
  onFrame,
  onTogglePause,
  onSpeed,
  fpsRef,
  timeRef,
  uptimeRef,
}: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden pt-14">
      {/* Live shader — the thesis. */}
      <div className="absolute inset-0">
        <ShaderAnimation
          className="h-full w-full"
          speed={speed}
          paused={paused}
          onFrame={onFrame}
        />
        {/* Legibility scrims + instrument vignette over the live canvas. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-900/55 via-transparent to-ink-900" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_42%,rgba(5,6,10,0.82)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-[0.5] mix-blend-soft-light" />
      </div>

      {/* Corner brackets — instrument housing. */}
      <Brackets />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-16 sm:px-8">
        <p className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-chan-g animate-fade-up">
          <span className="h-px w-8 bg-chan-g/60" />
          shadcn · tailwind · typescript
        </p>

        <h1
          className="max-w-4xl font-display text-[clamp(2.7rem,8vw,6.4rem)] font-bold leading-[0.92] tracking-tightest text-phosphor animate-fade-up"
          style={{ animationDelay: "60ms" }}
        >
          A fragment shader that draws
          <br className="hidden sm:block" />{" "}
          <span className="rgb-split text-white">interference rings</span> in
          <span className="text-chan-r"> R</span>,
          <span className="text-chan-g"> G</span>,
          <span className="text-chan-b"> B</span>.
        </h1>

        <p
          className="mt-7 max-w-xl text-balance text-[15px] leading-relaxed text-phosphor/65 animate-fade-up sm:text-base"
          style={{ animationDelay: "120ms" }}
        >
          Three additive loops — one per colour channel — accumulate five thin
          concentric rings on a single full-screen GLSL quad. Drop{" "}
          <code className="rounded bg-ink-700 px-1.5 py-0.5 font-mono text-[13px] text-chan-g">
            &lt;ShaderAnimation /&gt;
          </code>{" "}
          into <span className="font-mono text-phosphor/85">components/ui</span>, import it, ship it.
        </p>

        {/* Live transport + telemetry. */}
        <div
          className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up"
          style={{ animationDelay: "180ms" }}
        >
          <button
            type="button"
            onClick={onTogglePause}
            className="flex items-center gap-2 rounded-md border border-graphite-line bg-ink-800/80 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-phosphor backdrop-blur transition-colors hover:border-chan-g/70 hover:text-chan-g"
          >
            {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            {paused ? "Resume" : "Freeze"}
          </button>

          <div className="flex items-center gap-3 rounded-md border border-graphite-line bg-ink-800/80 px-4 py-2.5 backdrop-blur">
            <Gauge className="h-3.5 w-3.5 text-graphite" />
            <label className="font-mono text-[11px] uppercase tracking-[0.12em] text-graphite" htmlFor="speed">
              speed
            </label>
            <input
              id="speed"
              type="range"
              min={0}
              max={3}
              step={0.05}
              value={speed}
              onChange={(e) => onSpeed(Number(e.target.value))}
              className="accent-chan-g"
              aria-label="Animation speed"
            />
            <span className="tnum w-9 font-mono text-xs text-phosphor/85">{speed.toFixed(2)}×</span>
          </div>

          <div className="flex items-stretch overflow-hidden rounded-md border border-graphite-line bg-ink-800/80 backdrop-blur">
            <Readout label="FPS"><span ref={fpsRef}>00</span></Readout>
            <Readout label="time"><span ref={timeRef}>0.0</span></Readout>
            <Readout label="uptime" last><span ref={uptimeRef}>00:00</span></Readout>
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}

function Readout({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`flex flex-col px-3.5 py-1.5 ${last ? "" : "border-r border-graphite-line"}`}>
      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-graphite">{label}</span>
      <span className="tnum font-mono text-[13px] text-chan-g">{children}</span>
    </div>
  );
}

function Brackets() {
  const base = "pointer-events-none absolute h-8 w-8 border-graphite-line";
  return (
    <>
      <span className={`${base} left-4 top-[4.5rem] border-l border-t`} />
      <span className={`${base} right-4 top-[4.5rem] border-r border-t`} />
      <span className={`${base} bottom-4 left-4 border-b border-l`} />
      <span className={`${base} bottom-4 right-4 border-b border-r`} />
    </>
  );
}

function ScrollCue() {
  return (
    <div className="relative z-10 flex justify-center pb-7">
      <div className="flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-graphite">
          decompose
        </span>
        <span className="relative h-9 w-px overflow-hidden bg-graphite-line">
          <span className="absolute inset-x-0 top-0 h-3 bg-chan-g animate-scan-sweep" />
        </span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------- Channel lab (sig) --- */

function ChannelLab() {
  return (
    <section id="lab" className="border-t border-graphite-line bg-ink-900">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionLabel icon={<Layers className="h-3.5 w-3.5" />} index="01">
          channel decomposition
        </SectionLabel>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.04] tracking-tight text-balance">
              The image is three shaders stacked in one pass.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-phosphor/65">
              The fragment shader runs the same ring math three times — once for
              red, green, and blue — each phase-shifted by{" "}
              <code className="font-mono text-chan-g">0.01·j</code>. The traces
              below are read live from the running quad: where all three peak
              together, the rings bloom white.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-graphite-line bg-graphite-line">
              <Stat k="loops" v="3" hint="R / G / B" />
              <Stat k="rings · loop" v="5" hint="i = 0…4" />
              <Stat k="draw calls" v="1" hint="full-screen quad" />
            </dl>
          </div>
          <div className="rounded-xl border border-graphite-line bg-ink-800/40 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-graphite">
                live · color[j] accumulator
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-chan-g">
                <span className="h-1.5 w-1.5 animate-flicker rounded-full bg-chan-g" />
                streaming
              </span>
            </div>
            <ChannelScope />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v, hint }: { k: string; v: string; hint: string }) {
  return (
    <div className="bg-ink-900 px-4 py-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">{k}</dt>
      <dd className="mt-1 font-display text-3xl font-semibold text-phosphor">{v}</dd>
      <dd className="mt-0.5 font-mono text-[10px] text-graphite">{hint}</dd>
    </div>
  );
}

/* ---------------------------------------------------- Integration story --- */

function IntegrationStory() {
  const steps = [
    {
      icon: <Terminal className="h-4 w-4" />,
      title: "Install the one dependency",
      body: (
        <>
          The component renders through Three.js — that is the only runtime
          dependency. Add it (plus its types for TypeScript) before copying the
          file in.
        </>
      ),
      code: INSTALL_SOURCE,
      filename: "bash",
    },
    {
      icon: <FolderTree className="h-4 w-4" />,
      title: "Why it lives in components/ui",
      body: (
        <>
          shadcn resolves the <code className="font-mono text-chan-g">ui</code>{" "}
          alias to <code className="font-mono text-chan-g">@/components/ui</code>{" "}
          in <code className="font-mono text-chan-g">components.json</code>. Both
          the demo and your own pages import from{" "}
          <code className="font-mono text-chan-g">@/components/ui/shader-animation</code>,
          so the file must sit there for the alias — and any future{" "}
          <code className="font-mono text-chan-g">shadcn add</code> — to line up.
          If your project resolves <code className="font-mono text-chan-g">@</code>{" "}
          elsewhere, create the folder so the import path stays portable.
        </>
      ),
      code: "src/\n└─ components/\n   └─ ui/\n      └─ shader-animation.tsx   ← drop it here",
      filename: "tree",
    },
    {
      icon: <Box className="h-4 w-4" />,
      title: "Import and place it",
      body: (
        <>
          The component fills its parent. Give it a sized, relatively-positioned
          container and layer your content above with{" "}
          <code className="font-mono text-chan-g">z-10</code>. No props are
          required — it is self-contained and cleans up its WebGL context on
          unmount.
        </>
      ),
      code: USAGE_SOURCE,
      filename: "hero.tsx",
    },
  ];

  return (
    <section id="install" className="border-t border-graphite-line bg-ink-800/30">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionLabel icon={<Terminal className="h-3.5 w-3.5" />} index="02">
          integration
        </SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.04] tracking-tight text-balance">
          Three steps from a fresh shadcn app to a shipping shader.
        </h2>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col">
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md border border-graphite-line bg-ink-800 text-chan-g">
                  {s.icon}
                </span>
                <span className="font-mono text-[11px] tracking-[0.18em] text-graphite">
                  STEP {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-phosphor">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-phosphor/60">{s.body}</p>
              <CodeBlock code={s.code} filename={s.filename} className="mt-5" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Source tabs --- */

function SourcePanels({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string; file: string; code: string }[] = [
    { id: "component", label: "Component", file: "components/ui/shader-animation.tsx", code: SHADER_ANIMATION_SOURCE },
    { id: "demo", label: "Demo", file: "demo.tsx", code: DEMO_SOURCE },
    { id: "usage", label: "Usage", file: "hero.tsx", code: USAGE_SOURCE },
  ];
  const active = tabs.find((t) => t.id === tab) ?? tabs[0];

  return (
    <section id="source" className="border-t border-graphite-line bg-ink-900">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionLabel icon={<Box className="h-3.5 w-3.5" />} index="03">
          source
        </SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.04] tracking-tight text-balance">
          Copy the file. It is the whole component.
        </h2>

        <div className="mt-10 flex flex-wrap gap-1.5">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-md border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                tab === t.id
                  ? "border-chan-g/60 bg-chan-g/10 text-chan-g"
                  : "border-graphite-line bg-ink-800/50 text-graphite hover:text-phosphor"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <CodeBlock code={active.code} filename={active.file} className="mt-5" />
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Demo card --- */

function DemoSection() {
  return (
    <section className="border-t border-graphite-line bg-ink-800/30">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionLabel icon={<Play className="h-3.5 w-3.5" />} index="04">
          demo · DemoOne
        </SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,2.9rem)] font-semibold leading-[1.04] tracking-tight text-balance">
          The brief&rsquo;s demo, running unmodified.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-phosphor/60">
          The bordered <span className="font-mono text-phosphor/85">bg-blue-700</span> card with the
          centred label, exactly as specified — the shader on{" "}
          <code className="font-mono text-chan-g">multiply</code>-free additive black makes the blue
          read only at the edges.
        </p>
        <div className="mt-10">
          <DemoOne />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ API table --- */

function ApiSection() {
  const props = [
    { name: "speed", type: "number", def: "1", desc: "Scales the per-frame time step (0.05 × speed). 1 is the canonical look." },
    { name: "paused", type: "boolean", def: "false", desc: "Freezes the loop while keeping the last frame on screen." },
    { name: "onFrame", type: "(f: ShaderFrame) => void", def: "—", desc: "Per-frame telemetry: time, fps, uptime, and per-channel intensity." },
    { name: "className", type: "string", def: '"w-full h-screen"', desc: "Classes for the canvas wrapper. Override the default height to embed." },
    { name: "style", type: "CSSProperties", def: "—", desc: "Inline styles merged onto the wrapper (background defaults to #000)." },
  ];
  const uniforms = [
    { name: "time", glsl: "uniform float", desc: "Advances 0.05 per frame; scrubs every ring's phase." },
    { name: "resolution", glsl: "uniform vec2", desc: "Drawing-buffer size; normalises uv to a centred, aspect-correct space." },
  ];

  return (
    <section id="api" className="border-t border-graphite-line bg-ink-900">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionLabel icon={<Layers className="h-3.5 w-3.5" />} index="05">
          api
        </SectionLabel>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <h3 className="font-display text-xl font-semibold text-phosphor">Props</h3>
            <p className="mt-1.5 text-sm text-phosphor/55">
              Additive conveniences — the original drop-in takes none.
            </p>
            <div className="mt-5 overflow-hidden rounded-lg border border-graphite-line">
              {props.map((p, i) => (
                <div
                  key={p.name}
                  className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 px-4 py-3.5 sm:grid-cols-[140px_1fr] ${
                    i === 0 ? "" : "border-t border-graphite-line"
                  }`}
                >
                  <code className="font-mono text-[13px] text-chan-g">{p.name}</code>
                  <span className="font-mono text-[11px] text-chan-b">{p.type}</span>
                  <span className="hidden sm:block" />
                  <span className="text-[13px] leading-relaxed text-phosphor/65">
                    {p.desc}{" "}
                    <span className="text-graphite">· default {p.def}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-phosphor">Uniforms</h3>
            <p className="mt-1.5 text-sm text-phosphor/55">What the GLSL receives.</p>
            <div className="mt-5 overflow-hidden rounded-lg border border-graphite-line">
              {uniforms.map((u, i) => (
                <div key={u.name} className={`px-4 py-3.5 ${i === 0 ? "" : "border-t border-graphite-line"}`}>
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-[13px] text-chan-r">{u.name}</code>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-graphite">
                      {u.glsl}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-phosphor/65">{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Shared --- */

function SectionLabel({
  icon,
  index,
  children,
}: {
  icon: React.ReactNode;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="grid h-7 w-7 place-items-center rounded-sm border border-graphite-line bg-ink-800 text-chan-g">
        {icon}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-graphite">
        {index} <span className="mx-1.5 text-graphite-line">/</span>{" "}
        <span className="text-phosphor/80">{children}</span>
      </span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-graphite-line bg-ink-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="font-mono text-[11px] tracking-[0.16em] text-graphite">
          SHADER·ANIMATION — components/ui · three.js · webgl
        </span>
        <span className="font-mono text-[11px] tracking-[0.14em] text-graphite">
          drop-in · zero required props · self-cleaning
        </span>
      </div>
    </footer>
  );
}
