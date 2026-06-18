import { useCallback, useMemo, useRef, useState } from "react";
import {
  Activity,
  ChevronDown,
  CircleDot,
  Crosshair,
  Gauge,
  Hexagon,
  Pause,
  Play,
  Radio,
  ShieldHalf,
  Sparkles,
  Target,
  Waypoints,
} from "lucide-react";
import {
  AegisShield,
  type ShieldFrameState,
  type ShieldUniformState,
} from "@/components/ui/aegis-shield";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Deflector regimes: each snaps the shader's promoted uniforms to a   */
/* named operating point. "Standard Aegis" reproduces the brief's      */
/* defaults exactly.                                                   */
/* ------------------------------------------------------------------ */
type Profile = {
  id: string;
  name: string;
  blurb: string;
  state: ShieldUniformState;
};

const PROFILES: Profile[] = [
  {
    id: "aegis",
    name: "Standard Aegis",
    blurb: "Factory deflector tune — the brief's exact constants.",
    state: {
      domeBias: 0.2,
      curve: 0.3,
      hexScale: 0.9,
      drift: 0.2,
      hexEdge: 1.5,
      gain: 1.0,
      falloff: 0.09,
      tint: [2.0, 3.0, 5.0],
    },
  },
  {
    id: "breach",
    name: "Breach Alert",
    blurb: "Tight dome, fast drift, hot amber arcs under load.",
    state: {
      domeBias: 0.14,
      curve: 0.42,
      hexScale: 0.78,
      drift: 0.55,
      hexEdge: 1.85,
      gain: 1.35,
      falloff: 0.11,
      tint: [6.0, 3.2, 1.4],
    },
  },
  {
    id: "lattice",
    name: "Cold Lattice",
    blurb: "Wide hex cells, slow drift, deep cyan idle field.",
    state: {
      domeBias: 0.28,
      curve: 0.22,
      hexScale: 1.15,
      drift: 0.08,
      hexEdge: 1.2,
      gain: 0.85,
      falloff: 0.07,
      tint: [1.4, 3.0, 6.0],
    },
  },
  {
    id: "bloom",
    name: "Plasma Bloom",
    blurb: "High gain, soft edges, violet over-saturated dome.",
    state: {
      domeBias: 0.18,
      curve: 0.36,
      hexScale: 0.95,
      drift: 0.3,
      hexEdge: 1.35,
      gain: 1.8,
      falloff: 0.13,
      tint: [3.4, 2.2, 6.0],
    },
  },
  {
    id: "scan",
    name: "Deep Scan",
    blurb: "Loose dome, long falloff, far hex shells resolve.",
    state: {
      domeBias: 0.34,
      curve: 0.18,
      hexScale: 1.0,
      drift: 0.16,
      hexEdge: 1.6,
      gain: 0.95,
      falloff: 0.16,
      tint: [2.2, 3.6, 5.2],
    },
  },
];

/* ------------------------------------------------------------------ */
/* Fader metadata — maps each promoted uniform to its original literal */
/* and a sane range.                                                   */
/* ------------------------------------------------------------------ */
type Knob = {
  key: keyof Omit<ShieldUniformState, "tint">;
  label: string;
  origin: string;
  min: number;
  max: number;
  step: number;
  fmt?: (v: number) => string;
};

const KNOBS: Knob[] = [
  { key: "domeBias", label: "Dome Bias", origin: ".2", min: 0.08, max: 0.5, step: 0.005 },
  { key: "curve", label: "Curvature", origin: ".3", min: 0.05, max: 0.6, step: 0.005 },
  { key: "hexScale", label: "Hex Scale", origin: "/ .9", min: 0.6, max: 1.4, step: 0.01 },
  { key: "drift", label: "Drift", origin: "t * .2", min: 0.0, max: 0.8, step: 0.01 },
  { key: "hexEdge", label: "Edge Gain", origin: "* 1.5", min: 1.0, max: 2.2, step: 0.01 },
  { key: "gain", label: "Arc Gain", origin: "/ 2e3", min: 0.4, max: 2.2, step: 0.01 },
  { key: "falloff", label: "Falloff", origin: "i * .09", min: 0.04, max: 0.18, step: 0.002 },
];

const fmt2 = (v: number) => v.toFixed(2);
const fmt3 = (v: number) => v.toFixed(3);

/* ================================================================== */

export default function App() {
  const [state, setState] = useState<ShieldUniformState>(PROFILES[0].state);
  const [activeProfile, setActiveProfile] = useState<string>("aegis");
  const [paused, setPaused] = useState(false);

  // Latest GPU frame state, kept in a ref + a throttled mirror in React state
  // so the heavy 60fps stream never thrashes the tree but the HUD still reads
  // the shader's real per-frame values.
  const frameRef = useRef<ShieldFrameState | null>(null);
  const [hud, setHud] = useState<ShieldFrameState | null>(null);
  const lastPush = useRef(0);

  const onFrame = useCallback((s: ShieldFrameState) => {
    frameRef.current = s;
    const now = performance.now();
    if (now - lastPush.current > 110) {
      lastPush.current = now;
      setHud(s);
    }
  }, []);

  const setKnob = (key: Knob["key"], value: number) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setActiveProfile("custom");
  };

  const applyProfile = (p: Profile) => {
    setState(p.state);
    setActiveProfile(p.id);
  };

  // Tint editor works in normalized 0..1 then scales back to the shader's
  // 0..~6 weighting so the colour reads intuitively.
  const tintNorm = useMemo(() => {
    const m = Math.max(...state.tint, 1);
    return state.tint.map((c) => c / m) as [number, number, number];
  }, [state.tint]);

  const tintCss = `rgb(${tintNorm.map((c) => Math.round(c * 255)).join(",")})`;

  const clock = hud?.time ?? 0;
  const fps = hud?.fps ?? 0;
  const charge = hud?.charge ?? 0;
  const impact = hud?.impact ?? { x: 0.5, y: 0.5 };

  return (
    <div className="min-h-screen bg-hull font-body text-[#e7ecf6]">
      {/* ============================= HERO ============================= */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        {/* Live shield */}
        <div className="absolute inset-0">
          <AegisShield
            {...state}
            paused={paused}
            impactStrength={1.0}
            onFrame={onFrame}
          />
        </div>

        {/* Vignette + scanline veil so the chrome reads over the bright dome */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 42%, transparent 38%, rgba(3,5,11,0.55) 78%, rgba(3,5,11,0.92) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
          }}
        />

        {/* Caliper corner brackets */}
        <CornerBrackets />

        {/* Cursor-tracked impact reticle */}
        <ImpactReticle x={impact.x} y={impact.y} charge={charge} />

        {/* Top chrome: wordmark + status */}
        <header className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center rounded-md border border-edge/80 bg-hull/60 backdrop-blur">
              <ShieldHalf className="h-5 w-5 text-ion" strokeWidth={1.6} />
              <span className="absolute inset-0 rounded-md ring-1 ring-ion/20" />
            </div>
            <div className="leading-tight">
              <h1 className="font-display text-sm font-700 tracking-[0.34em] text-white">
                AEGIS
              </h1>
              <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-haze">
                Deflector&nbsp;Array · Sec&nbsp;07
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <StatusPill
              live={!paused}
              label={paused ? "HELD" : "ONLINE"}
            />
            <div className="hidden items-center gap-2 rounded-md border border-edge/70 bg-hull/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-haze backdrop-blur sm:flex">
              <Hexagon className="h-3 w-3 text-ion" strokeWidth={1.6} />
              hex-sphere field
            </div>
          </div>
        </header>

        {/* Hero copy block, lower-left (extra bottom padding clears the
            telemetry strip when it wraps under the copy on narrow viewports). */}
        <div className="absolute bottom-0 left-0 z-20 max-w-xl p-5 pb-12 sm:p-7 sm:pb-7">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-edge/70 bg-hull/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-ion backdrop-blur">
            <Sparkles className="h-3 w-3" strokeWidth={1.6} />
            shadcn · components/ui
          </p>
          <h2 className="font-display text-3xl font-700 leading-[1.05] tracking-tight text-white sm:text-5xl">
            The shield is a<br />
            <span className="text-ion">single&nbsp;hex&nbsp;sphere.</span>
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[#aab6cf] sm:text-[15px]">
            A 100-step fragment shader folds a mirrored hexagonal lattice onto a
            sphere distortion and tonemaps it with <code className="font-mono text-ion">tanh</code>.
            Drop it in <code className="font-mono text-ion">@/components/ui</code>, then drive
            every baked constant live from the deck below.
          </p>
          <a
            href="#deck"
            className="group mt-5 inline-flex items-center gap-2 rounded-md border border-ion/40 bg-ion/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-ion transition hover:bg-ion/20"
          >
            Open control deck
            <ChevronDown className="h-3.5 w-3.5 transition group-hover:translate-y-0.5" strokeWidth={2} />
          </a>
        </div>

        {/* Bottom telemetry strip — read straight off the GPU frame */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-end gap-x-6 gap-y-1 px-5 pb-4 font-mono text-[10px] uppercase tracking-widest text-haze sm:px-7">
            <Telemetry label="clk" value={formatClock(clock)} />
            <Telemetry label="render" value={`${fps.toFixed(0)} fps`} accent={fps < 24} />
            <Telemetry label="charge" value={`${(charge * 100).toFixed(0)}%`} />
            <Telemetry label="impact" value={`${impact.x.toFixed(2)}·${impact.y.toFixed(2)}`} />
          </div>
        </div>
      </section>

      {/* ============================= DECK ============================= */}
      <section id="deck" className="relative border-t border-edge/60 bg-plate">
        {/* faint grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(31,41,64,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(31,41,64,0.35) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(120% 80% at 50% 0%, black 30%, transparent 90%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-6xl gap-6 px-5 py-12 lg:grid-cols-[280px_1fr] sm:px-7">
          {/* ---- left: integrity gauge + freeze ---- */}
          <aside className="flex flex-col gap-5">
            <IntegrityGauge charge={charge} fps={fps} paused={paused} />

            <button
              onClick={() => setPaused((p) => !p)}
              className={cn(
                "group flex items-center justify-center gap-2 rounded-lg border px-4 py-3 font-mono text-xs uppercase tracking-[0.25em] transition",
                paused
                  ? "border-ok/40 bg-ok/10 text-ok hover:bg-ok/20"
                  : "border-edge/70 bg-steel/60 text-haze hover:border-ion/40 hover:text-ion",
              )}
            >
              {paused ? <Play className="h-3.5 w-3.5" strokeWidth={2} /> : <Pause className="h-3.5 w-3.5" strokeWidth={2} />}
              {paused ? "resume field" : "freeze field"}
            </button>

            <div className="rounded-lg border border-edge/60 bg-steel/40 p-4">
              <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-haze">
                <Waypoints className="h-3.5 w-3.5 text-ion" strokeWidth={1.6} />
                deflector profiles
              </div>
              <div className="flex flex-col gap-1.5">
                {PROFILES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => applyProfile(p)}
                    title={p.blurb}
                    className={cn(
                      "group flex items-center justify-between rounded-md border px-3 py-2 text-left transition",
                      activeProfile === p.id
                        ? "border-ion/50 bg-ion/10"
                        : "border-transparent bg-hull/40 hover:border-edge/80",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-[13px] tracking-wide",
                        activeProfile === p.id ? "text-ion" : "text-[#c4cee3]",
                      )}
                    >
                      {p.name}
                    </span>
                    <CircleDot
                      className={cn(
                        "h-3.5 w-3.5 transition",
                        activeProfile === p.id ? "text-ion" : "text-edge group-hover:text-haze",
                      )}
                      strokeWidth={1.6}
                    />
                  </button>
                ))}
                {activeProfile === "custom" && (
                  <div className="mt-1 flex items-center gap-2 px-3 font-mono text-[10px] uppercase tracking-widest text-violet">
                    <CircleDot className="h-3 w-3" strokeWidth={1.6} /> custom tune
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* ---- right: faders + tint + live impact ---- */}
          <div className="flex flex-col gap-6">
            <div className="rounded-lg border border-edge/60 bg-steel/40 p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-ion" strokeWidth={1.6} />
                  <h3 className="font-display text-sm font-600 tracking-[0.18em] text-white">
                    FIELD CALIBRATION
                  </h3>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-haze">
                  promoted uniforms
                </span>
              </div>

              <div className="grid gap-x-7 gap-y-5 sm:grid-cols-2">
                {KNOBS.map((k) => (
                  <Fader
                    key={k.key}
                    knob={k}
                    value={state[k.key]}
                    onChange={(v) => setKnob(k.key, v)}
                  />
                ))}

                {/* Tint channel editor */}
                <div className="sm:col-span-2">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#c4cee3]">
                      Arc Tint
                      <span className="ml-2 text-haze">
                        vec4({state.tint.map((c) => c.toFixed(1)).join(",")})
                      </span>
                    </label>
                    <span
                      className="h-4 w-10 rounded-sm border border-edge/80"
                      style={{ background: tintCss, boxShadow: `0 0 12px ${tintCss}` }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {(["R", "G", "B"] as const).map((ch, i) => (
                      <div key={ch}>
                        <div className="mb-1 flex items-center justify-between font-mono text-[10px] text-haze">
                          <span>{ch}</span>
                          <span className="tabular-nums">{state.tint[i].toFixed(1)}</span>
                        </div>
                        <input
                          type="range"
                          aria-label={`Tint ${ch}`}
                          min={0}
                          max={6}
                          step={0.1}
                          value={state.tint[i]}
                          onChange={(e) => {
                            const next = [...state.tint] as [number, number, number];
                            next[i] = parseFloat(e.target.value);
                            setState((prev) => ({ ...prev, tint: next }));
                            setActiveProfile("custom");
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* live impact panel */}
            <div className="grid gap-6 sm:grid-cols-[1fr_1fr]">
              <ImpactScope x={impact.x} y={impact.y} charge={charge} />
              <ReadoutGrid clock={clock} fps={fps} charge={charge} state={state} paused={paused} />
            </div>
          </div>
        </div>
      </section>

      {/* ========================= FIELD MANUAL ========================= */}
      <FieldManual />

      <footer className="border-t border-edge/60 bg-hull px-5 py-7 sm:px-7">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-haze">
            AEGIS · hex-sphere deflector · shader experiment
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-edge">
            react · three · @react-three/fiber · shadcn · tailwind · ts
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ====================== presentational pieces ====================== */

function Telemetry({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-edge">{label}</span>
      <span className={cn("tabular-nums", accent ? "text-warn" : "text-[#cdd7ec]")}>
        {value}
      </span>
    </span>
  );
}

function StatusPill({ live, label }: { live: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-edge/70 bg-hull/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest backdrop-blur">
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          live ? "bg-ok animate-flicker" : "bg-warn",
        )}
        style={{ boxShadow: live ? "0 0 8px #46f0b0" : "0 0 8px #ff6b4a" }}
      />
      <span className={live ? "text-ok" : "text-warn"}>{label}</span>
    </div>
  );
}

function CornerBrackets() {
  const base =
    "pointer-events-none absolute z-10 h-9 w-9 border-ion/45";
  return (
    <>
      <span className={cn(base, "left-4 top-16 border-l border-t sm:left-6 sm:top-20")} />
      <span className={cn(base, "right-4 top-16 border-r border-t sm:right-6 sm:top-20")} />
      <span className={cn(base, "bottom-16 left-4 border-b border-l sm:bottom-16 sm:left-6")} />
      <span className={cn(base, "bottom-16 right-4 border-b border-r sm:bottom-16 sm:right-6")} />
    </>
  );
}

/** Cursor-tracked deflector impact reticle floating over the dome. */
function ImpactReticle({ x, y, charge }: { x: number; y: number; charge: number }) {
  // y comes from the shader in y-up space; CSS top is y-down.
  const left = `${(x * 100).toFixed(2)}%`;
  const top = `${((1 - y) * 100).toFixed(2)}%`;
  const size = 56 + charge * 70;
  return (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left, top }}
    >
      <div
        className="relative grid place-items-center rounded-full border border-ion/40 transition-[width,height] duration-150"
        style={{
          width: size,
          height: size,
          boxShadow: `0 0 ${10 + charge * 30}px rgba(91,213,255,${0.25 + charge * 0.45})`,
        }}
      >
        <Crosshair
          className="text-ion"
          style={{ width: 18, height: 18, opacity: 0.85 }}
          strokeWidth={1.4}
        />
        <span className="absolute -left-1 top-1/2 h-px w-2 -translate-y-1/2 bg-ion/60" />
        <span className="absolute -right-1 top-1/2 h-px w-2 -translate-y-1/2 bg-ion/60" />
        <span className="absolute -top-1 left-1/2 h-2 w-px -translate-x-1/2 bg-ion/60" />
        <span className="absolute -bottom-1 left-1/2 h-2 w-px -translate-x-1/2 bg-ion/60" />
      </div>
    </div>
  );
}

/** Signature circular shield-integrity gauge driven by live charge + fps. */
function IntegrityGauge({
  charge,
  fps,
  paused,
}: {
  charge: number;
  fps: number;
  paused: boolean;
}) {
  // Integrity = render headroom blended with idle (inverse of impact load).
  const fpsNorm = Math.min(1, fps / 60);
  const integrity = Math.max(0, Math.min(1, fpsNorm * (1 - charge * 0.55)));
  const R = 52;
  const C = 2 * Math.PI * R;
  const dash = C * integrity;
  const pct = Math.round(integrity * 100);
  const hot = integrity < 0.55;

  return (
    <div className="rounded-lg border border-edge/60 bg-steel/40 p-5">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-haze">
        <ShieldHalf className="h-3.5 w-3.5 text-ion" strokeWidth={1.6} />
        shield integrity
      </div>
      <div className="relative mx-auto grid h-[140px] w-[140px] place-items-center">
        <svg viewBox="0 0 140 140" className="absolute inset-0 -rotate-90">
          <circle cx="70" cy="70" r={R} fill="none" stroke="#1f2940" strokeWidth="7" />
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke={hot ? "#ff6b4a" : "#5bd5ff"}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
            style={{
              transition: "stroke-dasharray 180ms linear, stroke 300ms",
              filter: `drop-shadow(0 0 6px ${hot ? "#ff6b4a" : "#5bd5ff"})`,
            }}
          />
          {/* tick marks */}
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i / 36) * Math.PI * 2;
            const r1 = 60;
            const r2 = i % 3 === 0 ? 64 : 62;
            return (
              <line
                key={i}
                x1={70 + Math.cos(a) * r1}
                y1={70 + Math.sin(a) * r1}
                x2={70 + Math.cos(a) * r2}
                y2={70 + Math.sin(a) * r2}
                stroke="#26324c"
                strokeWidth="1"
              />
            );
          })}
        </svg>
        <div className="text-center">
          <div
            className={cn(
              "font-display text-3xl font-700 tabular-nums leading-none",
              hot ? "text-warn" : "text-white",
            )}
          >
            {pct}
            <span className="text-base text-haze">%</span>
          </div>
          <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-haze">
            {paused ? "held" : hot ? "strained" : "nominal"}
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-widest">
        <div className="rounded-md border border-edge/50 bg-hull/40 px-2 py-1.5">
          <div className="text-edge">load</div>
          <div className="tabular-nums text-[#cdd7ec]">{(charge * 100).toFixed(0)}%</div>
        </div>
        <div className="rounded-md border border-edge/50 bg-hull/40 px-2 py-1.5">
          <div className="text-edge">render</div>
          <div className={cn("tabular-nums", fps < 24 ? "text-warn" : "text-[#cdd7ec]")}>
            {fps.toFixed(0)}fps
          </div>
        </div>
      </div>
    </div>
  );
}

function Fader({
  knob,
  value,
  onChange,
}: {
  knob: Knob;
  value: number;
  onChange: (v: number) => void;
}) {
  const f = knob.fmt ?? (knob.step < 0.01 ? fmt3 : fmt2);
  const pct = ((value - knob.min) / (knob.max - knob.min)) * 100;
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#c4cee3]">
          {knob.label}
          <span className="ml-2 text-edge">{knob.origin}</span>
        </label>
        <span className="font-mono text-[11px] tabular-nums text-ion">{f(value)}</span>
      </div>
      <input
        type="range"
        aria-label={knob.label}
        min={knob.min}
        max={knob.max}
        step={knob.step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          background: `linear-gradient(90deg, rgba(91,213,255,0.55) ${pct}%, #141a28 ${pct}%)`,
        }}
      />
    </div>
  );
}

/** A small 2D scope visualising the live impact point on the dome. */
function ImpactScope({ x, y, charge }: { x: number; y: number; charge: number }) {
  return (
    <div className="rounded-lg border border-edge/60 bg-steel/40 p-5">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-haze">
        <Target className="h-3.5 w-3.5 text-ion" strokeWidth={1.6} />
        impact scope
      </div>
      <div className="relative aspect-square w-full overflow-hidden rounded-md border border-edge/50 bg-hull/60">
        {/* concentric dome rings */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          {[44, 32, 20, 9].map((r) => (
            <circle
              key={r}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="#1d273e"
              strokeWidth="0.6"
            />
          ))}
          <line x1="50" y1="4" x2="50" y2="96" stroke="#16203400" />
          <line x1="50" y1="6" x2="50" y2="94" stroke="#1b2740" strokeWidth="0.5" />
          <line x1="6" y1="50" x2="94" y2="50" stroke="#1b2740" strokeWidth="0.5" />
        </svg>
        {/* live impact dot (y-up -> y-down) */}
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion"
          style={{
            left: `${x * 100}%`,
            top: `${(1 - y) * 100}%`,
            width: 8 + charge * 12,
            height: 8 + charge * 12,
            boxShadow: `0 0 ${8 + charge * 18}px rgba(91,213,255,0.9)`,
            transition: "left 90ms linear, top 90ms linear, width 120ms, height 120ms",
          }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-haze">
        <span>
          x <span className="tabular-nums text-[#cdd7ec]">{x.toFixed(3)}</span>
        </span>
        <span>
          y <span className="tabular-nums text-[#cdd7ec]">{y.toFixed(3)}</span>
        </span>
        <span>
          q <span className="tabular-nums text-ion">{(charge * 100).toFixed(0)}%</span>
        </span>
      </div>
    </div>
  );
}

function ReadoutGrid({
  clock,
  fps,
  charge,
  state,
  paused,
}: {
  clock: number;
  fps: number;
  charge: number;
  state: ShieldUniformState;
  paused: boolean;
}) {
  const rows: Array<[string, string, boolean?]> = [
    ["field clock", formatClock(clock), paused],
    ["render rate", `${fps.toFixed(1)} fps`, fps < 24],
    ["impact charge", `${(charge * 100).toFixed(0)} %`],
    ["dome bias", fmt3(state.domeBias)],
    ["curvature", fmt3(state.curve)],
    ["drift rate", fmt2(state.drift)],
    ["arc gain", `${fmt2(state.gain)}×`],
    ["accum steps", "100"],
  ];
  return (
    <div className="rounded-lg border border-edge/60 bg-steel/40 p-5">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-haze">
        <Activity className="h-3.5 w-3.5 text-ion" strokeWidth={1.6} />
        live readout
      </div>
      <dl className="grid grid-cols-2 gap-2">
        {rows.map(([k, v, hot]) => (
          <div
            key={k}
            className="flex flex-col rounded-md border border-edge/50 bg-hull/40 px-3 py-2"
          >
            <dt className="font-mono text-[9px] uppercase tracking-widest text-edge">{k}</dt>
            <dd
              className={cn(
                "font-mono text-sm tabular-nums",
                hot ? "text-warn" : "text-[#cdd7ec]",
              )}
            >
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ========================= field manual ========================= */

function FieldManual() {
  return (
    <section className="border-t border-edge/60 bg-hull">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-7">
        <div className="mb-10 flex items-center gap-3">
          <Radio className="h-4 w-4 text-ion" strokeWidth={1.6} />
          <h3 className="font-display text-sm font-600 tracking-[0.3em] text-white">
            FIELD MANUAL — INTEGRATION
          </h3>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* install */}
          <Panel title="01 · Scaffold & install" icon={<Hexagon className="h-4 w-4 text-ion" strokeWidth={1.6} />}>
            <p className="mb-3 text-sm leading-relaxed text-[#aab6cf]">
              The component imports <Mono>cn</Mono> from <Mono>@/lib/utils</Mono> and pulls in
              Three.js via react-three-fiber. A shadcn-style project (Tailwind + TypeScript
              + the <Mono>@</Mono> alias) is all it needs.
            </p>
            <CodeBlock>
{`# fresh shadcn project (skip if you already have one)
npx create-vite@latest my-app -- --template react-ts
cd my-app
npx shadcn@latest init      # writes components.json + @ alias

# this component's runtime deps
npm i three @react-three/fiber
npm i -D @types/three`}
            </CodeBlock>
          </Panel>

          {/* why components/ui */}
          <Panel title="02 · Why /components/ui" icon={<Waypoints className="h-4 w-4 text-ion" strokeWidth={1.6} />}>
            <p className="mb-3 text-sm leading-relaxed text-[#aab6cf]">
              shadcn's <Mono>components.json</Mono> resolves the <Mono>ui</Mono> alias to{" "}
              <Mono>components/ui</Mono>. The pasted import is{" "}
              <Mono>@/components/ui/shield-shader</Mono> — so the file <em>must</em> live there or
              the alias won't resolve. Keeping primitives in <Mono>components/ui</Mono> also lets{" "}
              <Mono>shadcn add</Mono> drop siblings beside it without collisions.
            </p>
            <CodeBlock>
{`src/
  components/
    ui/
      shield-shader.tsx   # verbatim drop-in (the brief)
      aegis-shield.tsx    # typed, uniform-driven sibling
    demo.tsx              # import { Component } from "@/components/ui/shield-shader"
  lib/
    utils.ts             # cn()`}
            </CodeBlock>
          </Panel>

          {/* props / uniforms */}
          <Panel title="03 · Props ↔ uniforms" icon={<Gauge className="h-4 w-4 text-ion" strokeWidth={1.6} />}>
            <p className="mb-3 text-sm leading-relaxed text-[#aab6cf]">
              The brief's drop-in takes no props — only <Mono>iTime</Mono> / <Mono>iResolution</Mono>.
              The typed sibling promotes every baked literal to a prop so the deck above can drive
              the GPU live:
            </p>
            <div className="overflow-hidden rounded-md border border-edge/60">
              <table className="w-full border-collapse text-left font-mono text-[11px]">
                <thead>
                  <tr className="bg-steel/60 text-haze">
                    <th className="px-3 py-2 font-500">prop</th>
                    <th className="px-3 py-2 font-500">GLSL literal</th>
                    <th className="px-3 py-2 font-500">effect</th>
                  </tr>
                </thead>
                <tbody className="text-[#aeb9d2]">
                  {[
                    ["domeBias", ".2", "sphere projection bias"],
                    ["curve", ".3", "dome curvature"],
                    ["hexScale", "/ .9", "hex cell size"],
                    ["drift", "t * .2", "lattice drift speed"],
                    ["hexEdge", "* 1.5", "edge anisotropy"],
                    ["gain", "/ 2e3", "per-step arc gain"],
                    ["falloff", "i * .09", "outward depth falloff"],
                    ["tint", "vec4(2,3,5)", "arc colour weighting"],
                  ].map(([p, g, e]) => (
                    <tr key={p} className="border-t border-edge/40">
                      <td className="px-3 py-1.5 text-ion">{p}</td>
                      <td className="px-3 py-1.5">{g}</td>
                      <td className="px-3 py-1.5">{e}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          {/* questions answered */}
          <Panel title="04 · Brief answered" icon={<Sparkles className="h-4 w-4 text-ion" strokeWidth={1.6} />}>
            <dl className="space-y-3 text-sm">
              <QA q="What data / props?" a="None required — the drop-in is fully procedural. The typed sibling optionally accepts the eight uniforms above plus paused / onFrame." />
              <QA q="State management?" a="Local React state for the deck; the shader itself is stateless and reads uniforms each frame. onFrame taps GPU state back out at ~12 Hz." />
              <QA q="Required assets?" a="None. No images or textures — the field is 100% math. Fonts are vendored locally; icons are lucide-react." />
              <QA q="Responsive behaviour?" a="The Canvas tracks its container via useThree().size and iResolution updates every frame, so the dome reflows on resize. The deck stacks under lg." />
              <QA q="Where to use it?" a="A full-bleed hero / loading veil / 404 backdrop, or — as here — the centrepiece of a status console." />
            </dl>
          </Panel>
        </div>

        {/* usage snippet */}
        <div className="mt-10">
          <Panel title="05 · Drop it in" icon={<Play className="h-4 w-4 text-ion" strokeWidth={1.6} />}>
            <p className="mb-3 text-sm leading-relaxed text-[#aab6cf]">
              The verbatim brief renders full-screen with no configuration:
            </p>
            <CodeBlock>
{`// src/components/demo.tsx — exactly as pasted
import { Component } from "@/components/ui/shield-shader";

export default function DemoOne() {
  return <Component />;
}`}
            </CodeBlock>
            <p className="mb-3 mt-5 text-sm leading-relaxed text-[#aab6cf]">
              Or drive it live with the typed sibling:
            </p>
            <CodeBlock>
{`import { AegisShield } from "@/components/ui/aegis-shield";

<AegisShield
  drift={0.55}
  gain={1.35}
  tint={[6, 3.2, 1.4]}        // "Breach Alert"
  onFrame={(s) => console.log(s.fps, s.charge)}
/>;`}
            </CodeBlock>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-edge/60 bg-plate/60 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h4 className="font-display text-[13px] font-600 tracking-[0.18em] text-white">
          {title}
        </h4>
      </div>
      {children}
    </div>
  );
}

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-md border border-edge/60 bg-hull/70 p-4 font-mono text-[12px] leading-relaxed text-[#bcd0e6]">
      <code>{children}</code>
    </pre>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-steel/70 px-1 py-0.5 font-mono text-[12px] text-ion">{children}</code>;
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-widest text-ion">{q}</dt>
      <dd className="mt-1 leading-relaxed text-[#aab6cf]">{a}</dd>
    </div>
  );
}

/* ============================== utils ============================== */

function formatClock(t: number): string {
  const total = Math.max(0, t);
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  const cs = Math.floor((total * 100) % 100);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}
