import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  CloudFog,
  Gauge,
  Layers,
  MountainSnow,
  Pause,
  Play,
  Radar,
  Terminal,
  Waves,
  Wind,
} from "lucide-react";
import { GLSLHills } from "@/components/ui/glsl-hills";
import { CornerBrackets } from "@/components/corner-brackets";
import { CodeBlock } from "@/components/code-block";
import { VisibilityGauge } from "@/components/visibility-gauge";
import { cn } from "@/lib/utils";
import {
  COMPONENT_SOURCE,
  CONFIG_ALIAS,
  INSTALL_DEP,
  INSTALL_SHADCN,
  USAGE_BASIC,
  USAGE_TELEMETRY,
} from "@/source-snippets";

/* ------------------------------------------------------------------ presets */

interface Preset {
  id: string;
  label: string;
  blurb: string;
  speed: number;
  fog: number;
  haze: number;
  cameraZ: number;
}

const PRESETS: Preset[] = [
  { id: "dawn", label: "Dawn Survey", blurb: "Slow drift, deep haze", speed: 0.32, fog: 0.62, haze: 256, cameraZ: 125 },
  { id: "squall", label: "Squall Line", blurb: "Fast, dense, low contrast", speed: 1.1, fog: 0.5, haze: 200, cameraZ: 108 },
  { id: "clearing", label: "Clearing", blurb: "Bright ridges, thin air", speed: 0.55, fog: 0.78, haze: 340, cameraZ: 150 },
  { id: "abyss", label: "Abyssal", blurb: "Dim, distant, glacial", speed: 0.22, fog: 0.42, haze: 230, cameraZ: 175 },
];

/* ---------------------------------------------------------------- HUD cell */

function Cell({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ridge-dim">{label}</dt>
      <dd className="tnum font-mono text-[15px] leading-none text-haze">
        {value}
        {sub ? <span className="ml-1 text-[10px] text-ridge-dim">{sub}</span> : null}
      </dd>
    </div>
  );
}

/* ------------------------------------------------------------------ fader */

function Fader({
  label,
  icon,
  value,
  min,
  max,
  step,
  unit,
  display,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  display?: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block select-none">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-haze/70">
          <span className="text-signal/80">{icon}</span>
          {label}
        </span>
        <span className="tnum font-mono text-[11px] text-haze">
          {display ?? value}
          {unit ? <span className="text-ridge-dim"> {unit}</span> : null}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={label}
        className="fader w-full"
        style={{
          background: `linear-gradient(to right, #3fa8a4 ${pct}%, #27313d ${pct}%)`,
        }}
      />
    </label>
  );
}

/* ------------------------------------------------------------------- tabs */

const SOURCE_TABS = [
  { id: "component", label: "glsl-hills.tsx", code: COMPONENT_SOURCE, lang: "tsx" },
  { id: "usage", label: "usage", code: USAGE_BASIC, lang: "tsx" },
  { id: "telemetry", label: "telemetry hooks", code: USAGE_TELEMETRY, lang: "tsx" },
] as const;

/* ------------------------------------------------------------------- App */

export default function App() {
  // Live shader controls (flow into GLSLHills via props -> refs, no teardown).
  const [speed, setSpeed] = useState(PRESETS[0].speed);
  const [fog, setFog] = useState(PRESETS[0].fog);
  const [haze, setHaze] = useState(PRESETS[0].haze);
  const [cameraZ, setCameraZ] = useState(PRESETS[0].cameraZ);
  const [paused, setPaused] = useState(false);
  const [activePreset, setActivePreset] = useState<string>("dawn");

  // Live telemetry read off the render loop / framebuffer.
  const [hud, setHud] = useState({ time: 0, fps: 0, cameraZ: PRESETS[0].cameraZ });
  const [visibility, setVisibility] = useState(0.5);
  const [crest, setCrest] = useState(0);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const [tab, setTab] = useState<(typeof SOURCE_TABS)[number]["id"]>("component");

  const stageRef = useRef<HTMLDivElement | null>(null);

  // --- Live framebuffer sampling -> "visibility" + ridge "crest" readouts.
  // The shader fades each vertex by distance, so the lit-pixel fraction of the
  // stage *is* the visibility, and the brightest band marks the nearest crest.
  useEffect(() => {
    let raf = 0;
    let last = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (t - last < 120) return; // ~8 Hz sampling is plenty for a gauge
      last = t;
      const canvas = stageRef.current?.querySelector("canvas");
      if (!canvas) return;
      const o = document.createElement("canvas");
      o.width = 96;
      o.height = 60;
      const cx = o.getContext("2d");
      if (!cx) return;
      try {
        cx.drawImage(canvas, 0, 0, o.width, o.height);
      } catch {
        return;
      }
      const { data } = cx.getImageData(0, 0, o.width, o.height);
      let lit = 0;
      let sum = 0;
      let maxRow = 0;
      let n = 0;
      const rows = new Array(o.height).fill(0);
      for (let i = 0; i < data.length; i += 4) {
        const px = (i / 4) % o.width;
        const py = Math.floor(i / 4 / o.width);
        // Ignore the very top sky band — sample the terrain region only.
        if (py < o.height * 0.18) continue;
        const l = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const a = data[i + 3];
        const lum = (l * a) / 255;
        if (lum > 10) lit++;
        sum += lum;
        rows[py] += lum;
        void px;
        n++;
      }
      // Visibility = how much terrain the fog leaves visible (smoothed).
      const frac = n ? Math.min(1, (sum / n / 90) * 1.4) : 0;
      setVisibility((v) => v * 0.78 + frac * 0.22);
      // Crest height: the row with peak brightness, mapped 0..1 from bottom.
      maxRow = rows.indexOf(Math.max(...rows));
      const crestH = 1 - maxRow / o.height;
      setCrest((c) => c * 0.8 + crestH * 0.2);
      void lit;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onFrame = useCallback(
    (s: { time: number; fps: number; cameraZ: number }) => setHud(s),
    [],
  );

  const applyPreset = (p: Preset) => {
    setSpeed(p.speed);
    setFog(p.fog);
    setHaze(p.haze);
    setCameraZ(p.cameraZ);
    setActivePreset(p.id);
  };

  // Mark a control as "off-preset" so the active chip clears when you fiddle.
  const dirty = () => setActivePreset("");

  // Pointer parallax over the stage -> reticle + a small camera lateral feel.
  const onStageMove = (e: React.PointerEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    setPointer({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const clock = `${Math.floor(hud.time / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(hud.time % 60)
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-fog-975 text-haze">
      {/* Ambient backdrop grid + drifting isobars. */}
      <div className="pointer-events-none fixed inset-0 bg-survey-grid opacity-60" />
      <div className="pointer-events-none fixed inset-0 bg-isobars opacity-[0.5] animate-drift" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />

      {/* ============================================================ TOP BAR */}
      <header className="relative z-20 mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-signal/80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-haze/80">
            Fogbank
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-ridge-dim sm:inline">
            / terrain monitor
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ridge-dim">
          <span className="hidden sm:inline">components/ui</span>
          <span className="h-3 w-px bg-fog-line" />
          <span className="text-signal/80">three.js · GLSL</span>
        </div>
      </header>

      {/* ============================================================== HERO */}
      <main className="relative z-10 mx-auto max-w-[1240px] px-5 pb-24 sm:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="animate-fade-up">
            <p className="mb-2 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.26em] text-signal/85">
              <CloudFog className="h-3.5 w-3.5" />
              Perlin-noise hill range · 256² plane
            </p>
            <h1 className="font-display text-[40px] font-medium leading-[0.98] tracking-tightest text-haze sm:text-[56px]">
              The fog-bank, framed
              <br />
              as an <span className="italic text-ridge-bright ridge-split">instrument</span>.
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-haze/60 animate-fade-up">
            A drop-in <code className="rounded bg-fog-850 px-1.5 py-0.5 font-mono text-[12px] text-signal">@/components/ui</code>{" "}
            shader: a single <code className="rounded bg-fog-850 px-1.5 py-0.5 font-mono text-[12px] text-haze/80">RawShaderMaterial</code>{" "}
            plane folded to face you and pushed forever forward through 3D Perlin noise — the far ridges dissolving into haze.
          </p>
        </div>

        {/* ---------- The framed live stage (canonical demo, reused live) ---------- */}
        <section className="relative animate-fade-in">
          <div
            ref={stageRef}
            onPointerMove={onStageMove}
            onPointerLeave={() => setPointer(null)}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-fog-line bg-fog-950 sm:aspect-[16/9]"
          >
            {/* The verbatim component, driven live. */}
            <GLSLHills
              width="100%"
              height="100%"
              speed={speed}
              fog={fog}
              haze={haze}
              cameraZ={cameraZ}
              paused={paused}
              onFrame={onFrame}
            />

            {/* Stage grading + chrome. */}
            <div className="pointer-events-none absolute inset-0 bg-haze-sheet" />
            <div className="pointer-events-none absolute inset-0 stage-vignette" />
            <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-40" />
            <div className="pointer-events-none absolute inset-0 bg-survey-grid-fine opacity-50" />
            <CornerBrackets />

            {/* The canonical demo lockup (preserved copy), floating over the range. */}
            <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
              <h2 className="font-display font-medium leading-[1.0] tracking-tightest text-haze drop-shadow-[0_2px_18px_rgba(5,7,10,0.8)]">
                <span className="block text-2xl font-thin italic text-haze/90 sm:text-4xl md:text-5xl">
                  Designs That Speak
                </span>
                <span className="text-3xl sm:text-5xl md:text-6xl">Louder Than Words</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xs text-[11px] leading-relaxed text-haze/55 sm:max-w-sm sm:text-sm">
                We craft stunning visuals and user-friendly experiences that help
                your brand stand out and connect with your audience.
              </p>
            </div>

            {/* Pointer reticle — survey cross-hair tracking the cursor. */}
            {pointer && (
              <div
                className="pointer-events-none absolute z-20 hidden sm:block"
                style={{ left: `${pointer.x * 100}%`, top: `${pointer.y * 100}%`, transform: "translate(-50%,-50%)" }}
              >
                <div className="relative h-12 w-12">
                  <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-signal/40" />
                  <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-signal/40" />
                  <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal/60" />
                </div>
              </div>
            )}

            {/* Top-left live status. */}
            <div className="pointer-events-none absolute left-3 top-3 z-20 flex items-center gap-2 rounded-md border border-fog-line/70 bg-fog-975/70 px-2.5 py-1.5 backdrop-blur-sm">
              <Radar className={cn("h-3.5 w-3.5 text-signal", !paused && "animate-spin")} style={{ animationDuration: "5s" }} />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-haze/75">
                {paused ? "Hold" : "Sweeping"}
              </span>
            </div>

            {/* Sweep line. */}
            {!paused && (
              <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 animate-sweep-x bg-gradient-to-r from-transparent via-signal/[0.05] to-transparent" />
            )}

            {/* Bottom telemetry strip read off the GPU loop + framebuffer. */}
            <div className="absolute inset-x-0 bottom-0 z-20 border-t border-fog-line/70 bg-fog-975/80 backdrop-blur-sm">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 py-2.5 sm:grid-cols-5">
                <Cell label="Drift clock" value={clock} />
                <Cell label="Render" value={`${hud.fps || "--"}`} sub="fps" />
                <Cell label="Cam depth" value={hud.cameraZ.toFixed(0)} sub="z" />
                <Cell label="Visibility" value={(visibility * 10).toFixed(1)} sub="km" />
                <Cell label="Ridge crest" value={`${Math.round(crest * 100)}`} sub="%" />
              </dl>
            </div>
          </div>

          {/* ---------- Console: gauge + faders + presets ---------- */}
          <div className="mt-4 grid gap-4 lg:grid-cols-[300px_1fr]">
            {/* Visibility gauge panel. */}
            <div className="relative overflow-hidden rounded-2xl border border-fog-line bg-fog-900/70 p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-haze/70">
                  <Gauge className="h-3.5 w-3.5 text-signal/80" />
                  Visibility index
                </span>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em]",
                    visibility > 0.62
                      ? "border-signal/40 text-signal"
                      : visibility > 0.34
                        ? "border-haze/30 text-haze/70"
                        : "border-caution/40 text-caution",
                  )}
                >
                  {visibility > 0.62 ? "Clear" : visibility > 0.34 ? "Hazy" : "Fogbound"}
                </span>
              </div>
              <VisibilityGauge value={visibility} />
              <p className="mt-3 border-t border-fog-line/60 pt-3 text-[11px] leading-relaxed text-haze/45">
                Sampled live off the stage framebuffer — the shader fades each
                vertex by distance, so the lit fraction <em>is</em> the visibility.
              </p>
            </div>

            {/* Drift console. */}
            <div className="relative overflow-hidden rounded-2xl border border-fog-line bg-fog-900/70 p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-haze/70">
                  <Activity className="h-3.5 w-3.5 text-signal/80" />
                  Drift console
                </span>
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-fog-line bg-fog-850/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-haze/80 transition hover:border-signal/50 hover:text-haze"
                >
                  {paused ? <Play className="h-3 w-3 text-signal" /> : <Pause className="h-3 w-3" />}
                  {paused ? "Resume drift" : "Hold drift"}
                </button>
              </div>

              <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                <Fader
                  label="Drift speed"
                  icon={<Wind className="h-3 w-3" />}
                  value={speed}
                  min={0}
                  max={1.6}
                  step={0.01}
                  display={speed.toFixed(2)}
                  unit="×"
                  onChange={(v) => {
                    setSpeed(v);
                    dirty();
                  }}
                />
                <Fader
                  label="Fog tint"
                  icon={<CloudFog className="h-3 w-3" />}
                  value={fog}
                  min={0.25}
                  max={0.95}
                  step={0.01}
                  display={fog.toFixed(2)}
                  onChange={(v) => {
                    setFog(v);
                    dirty();
                  }}
                />
                <Fader
                  label="Haze depth"
                  icon={<Waves className="h-3 w-3" />}
                  value={haze}
                  min={160}
                  max={420}
                  step={2}
                  display={haze.toFixed(0)}
                  onChange={(v) => {
                    setHaze(v);
                    dirty();
                  }}
                />
                <Fader
                  label="Camera depth"
                  icon={<MountainSnow className="h-3 w-3" />}
                  value={cameraZ}
                  min={90}
                  max={200}
                  step={1}
                  display={cameraZ.toFixed(0)}
                  unit="z"
                  onChange={(v) => {
                    setCameraZ(v);
                    dirty();
                  }}
                />
              </div>

              {/* Presets. */}
              <div className="mt-5 border-t border-fog-line/60 pt-4">
                <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-ridge-dim">
                  Field presets
                </span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => applyPreset(p)}
                      aria-label={`Apply ${p.label} preset`}
                      className={cn(
                        "group rounded-lg border px-3 py-2 text-left transition",
                        activePreset === p.id
                          ? "border-signal/55 bg-signal/[0.08]"
                          : "border-fog-line bg-fog-850/50 hover:border-signal/35 hover:bg-fog-800/60",
                      )}
                    >
                      <span className="block font-mono text-[11px] font-medium tracking-wide text-haze">
                        {p.label}
                      </span>
                      <span className="mt-0.5 block text-[10px] leading-tight text-ridge-dim">{p.blurb}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== ANATOMY */}
        <section className="mt-20">
          <SectionHeading icon={<Layers className="h-4 w-4" />} kicker="How it renders" title="Anatomy of the fog-bank" />
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              {
                step: "01",
                head: "One folded plane",
                body: "A 256×256-segment PlaneGeometry, rotated 90° in the vertex shader so it stands up to face the camera — a single draw, no terrain mesh.",
              },
              {
                step: "02",
                head: "Perlin, three octaves",
                body: "Classic 3D cnoise at 0.08 / 0.06 / 0.4 scales, the field offset by time on Z so the whole range marches forward forever.",
              },
              {
                step: "03",
                head: "Distance is the fog",
                body: "The fragment stage sets opacity = (96 − length) / haze · 0.6, so far vertices vanish — the haze is literally the depth falloff.",
              },
            ].map((c) => (
              <div key={c.step} className="relative overflow-hidden rounded-xl border border-fog-line bg-fog-900/60 p-5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-signal/70">{c.step}</span>
                <h3 className="mt-2 font-display text-lg font-medium text-haze">{c.head}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-haze/55">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================== INSTALL */}
        <section className="mt-20 grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading icon={<Terminal className="h-4 w-4" />} kicker="Setup" title="Drop it into a shadcn app" />
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-haze/60">
              This scaffold is already a Vite + React + TypeScript project wired
              for shadcn — Tailwind configured, the <code className="rounded bg-fog-850 px-1 font-mono text-[12px] text-signal">@/*</code> alias
              in place, and a <code className="rounded bg-fog-850 px-1 font-mono text-[12px] text-haze/80">components.json</code>.
              If you're starting fresh, set that up first:
            </p>
            <div className="mt-4 space-y-3">
              <CodeBlock code={INSTALL_SHADCN} lang="bash" />
              <div>
                <p className="mb-2 text-[13px] text-haze/55">
                  Then install the one runtime dependency this component needs:
                </p>
                <CodeBlock code={INSTALL_DEP} lang="bash" />
              </div>
            </div>
          </div>

          <div>
            <SectionHeading icon={<CloudFog className="h-4 w-4" />} kicker="Convention" title="Why it lives in components/ui" />
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-haze/60">
              <p>
                shadcn's <code className="rounded bg-fog-850 px-1 font-mono text-[12px] text-signal">components.json</code> declares a{" "}
                <code className="rounded bg-fog-850 px-1 font-mono text-[12px] text-haze/80">ui</code> alias pointing at{" "}
                <code className="rounded bg-fog-850 px-1 font-mono text-[12px] text-haze/80">@/components/ui</code>. The default path here
                resolves to exactly that folder — so the brief's instruction is satisfied as-is.
              </p>
              <p>
                Keeping primitives under <code className="rounded bg-fog-850 px-1 font-mono text-[12px] text-haze/80">components/ui</code>{" "}
                is what lets the CLI, your editor's path-intellisense, and every other generated component resolve{" "}
                <code className="rounded bg-fog-850 px-1 font-mono text-[12px] text-signal">@/components/ui/glsl-hills</code>{" "}
                without bespoke wiring. It also draws a clean line between reusable building blocks and app-specific screens.
              </p>
              <div className="rounded-xl border border-fog-line bg-fog-900/60 p-4">
                <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ridge-dim">Resolved paths</p>
                <ul className="space-y-1.5 font-mono text-[12px] text-haze/70">
                  <li><span className="text-signal/70">ui</span> → src/components/ui</li>
                  <li><span className="text-signal/70">utils</span> → src/lib/utils</li>
                  <li><span className="text-signal/70">alias</span> → @/* = ./src/*</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================== SOURCE */}
        <section className="mt-20">
          <SectionHeading icon={<Terminal className="h-4 w-4" />} kicker="Paste it" title="Copy the source" />
          <p className="mt-4 max-w-prose text-sm leading-relaxed text-haze/60">
            Save the component to{" "}
            <code className="rounded bg-fog-850 px-1 font-mono text-[12px] text-signal">src/components/ui/glsl-hills.tsx</code>{" "}
            and use it anywhere. The GLSL is the brief's verbatim — the wrapper just
            adds TypeScript types, container-aware sizing, and the optional telemetry hooks.
          </p>
          <div className="mt-5">
            <div className="flex flex-wrap gap-2">
              {SOURCE_TABS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setTab(s.id)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 font-mono text-[11px] tracking-wide transition",
                    tab === s.id
                      ? "border-signal/55 bg-signal/[0.08] text-haze"
                      : "border-fog-line bg-fog-850/50 text-haze/60 hover:border-signal/35 hover:text-haze",
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="mt-3">
              {SOURCE_TABS.map((s) =>
                s.id === tab ? <CodeBlock key={s.id} code={s.code} lang={s.lang} /> : null,
              )}
            </div>
            <div className="mt-3">
              <p className="mb-2 text-[13px] text-haze/55">The <code className="rounded bg-fog-850 px-1 font-mono text-[12px] text-haze/80">@/*</code> alias these imports assume:</p>
              <CodeBlock code={CONFIG_ALIAS} lang="ts" />
            </div>
          </div>
        </section>

        {/* ===================================================== API */}
        <section className="mt-20">
          <SectionHeading icon={<Gauge className="h-4 w-4" />} kicker="Reference" title="API surface" />
          <div className="mt-6 overflow-hidden rounded-xl border border-fog-line">
            <table className="w-full text-left text-[13px]">
              <thead className="bg-fog-900/70 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ridge-dim">
                <tr>
                  <th className="px-4 py-3 font-medium">Prop</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                  <th className="hidden px-4 py-3 font-medium sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-fog-line/60 font-mono text-haze/75">
                {[
                  ["width", "string | number", "'100vw'", "CSS width of the host element"],
                  ["height", "string | number", "'100vh'", "CSS height of the host element"],
                  ["cameraZ", "number", "125", "Camera Z distance from the range"],
                  ["planeSize", "number", "256", "Plane size + segment count (coupled)"],
                  ["speed", "number", "0.5", "Drift multiplier on the per-frame delta"],
                  ["fog", "number", "0.6", "Greyscale fog tint (shader vec3)"],
                  ["haze", "number", "256", "Opacity-falloff divisor — fog depth"],
                  ["paused", "boolean", "false", "Holds the drift clock"],
                  ["onReady", "(handles) => void", "—", "Fires once with uniforms/renderer/camera"],
                  ["onFrame", "(state) => void", "—", "Per-frame { time, fps, cameraZ }"],
                ].map(([prop, type, def, notes]) => (
                  <tr key={prop} className="bg-fog-950/40">
                    <td className="px-4 py-2.5 text-signal/90">{prop}</td>
                    <td className="px-4 py-2.5 text-haze/60">{type}</td>
                    <td className="px-4 py-2.5 text-caution/80">{def}</td>
                    <td className="hidden px-4 py-2.5 text-haze/50 sm:table-cell">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-ridge-dim">
            Note · <span className="text-haze/60">fog</span>, <span className="text-haze/60">haze</span>,{" "}
            <span className="text-haze/60">paused</span> and the two callbacks are additive extensions over the brief's
            five-prop API; the original defaults reproduce the source exactly.
          </p>
        </section>

        {/* ===================================================== FOOTER */}
        <footer className="mt-20 flex flex-col items-start justify-between gap-3 border-t border-fog-line/70 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ridge-dim">
            Fogbank · GLSL Hills · three.js + shadcn
          </p>
          <p className="text-[12px] text-haze/40">
            Component integration · monochrome perlin terrain under haze
          </p>
        </footer>
      </main>
    </div>
  );
}

/* --------------------------------------------------------- section heading */

function SectionHeading({
  icon,
  kicker,
  title,
}: {
  icon: React.ReactNode;
  kicker: string;
  title: string;
}) {
  return (
    <div>
      <p className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.24em] text-signal/85">
        {icon}
        {kicker}
      </p>
      <h2 className="mt-2 font-display text-[28px] font-medium leading-tight tracking-tightest text-haze sm:text-[34px]">
        {title}
      </h2>
    </div>
  );
}
