import { useCallback, useRef, useState } from "react";
import { Aperture, Crosshair, Pause, Play, Radio } from "lucide-react";
import { MorphingLight } from "@/components/ui/morphing-light";
import { Controls } from "@/components/controls";
import { PresetBank } from "@/components/preset-bank";
import { Telemetry } from "@/components/telemetry";
import { Reticle } from "@/components/reticle";
import { PRESETS, statesMatch, type FringePreset, type FringeState } from "@/lib/presets";

/** Corner bracket — frames the live field as something under observation. */
function Bracket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M1 12 V1 H12" />
      <path d="M28 1 H39 V12" />
      <path d="M39 28 V39 H28" />
      <path d="M12 39 H1 V28" />
    </svg>
  );
}

export default function App() {
  const [state, setState] = useState<FringeState>(PRESETS[0].state);
  const [activeId, setActiveId] = useState<string | null>(PRESETS[0].id);
  const [paused, setPaused] = useState(false);
  const [sample, setSample] = useState({ time: 0, fps: 60, luma: 0, rgb: [0, 0, 0] as [number, number, number] });
  const [probe, setProbe] = useState({ xPct: 72, yPct: 38, order: 0 });

  const onSample = useCallback((s: typeof sample) => setSample(s), []);

  const setChannel = (key: keyof FringeState, value: number) => {
    setState((prev) => {
      const next = { ...prev, [key]: value };
      setActiveId(PRESETS.find((p) => statesMatch(p.state, next))?.id ?? null);
      return next;
    });
  };

  const selectPreset = (p: FringePreset) => {
    setState(p.state);
    setActiveId(p.id);
  };

  // Cursor probe — reads the fringe order at the pointer's radius from the
  // optical axis (screen center), derived from the shader's own ring frequency.
  const mainRef = useRef<HTMLElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const handleMove = useCallback((e: React.PointerEvent) => {
    const el = mainRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const dx = x - rect.width / 2;
    const dy = y - rect.height / 2;
    const c = Math.hypot(dx, dy) / rect.height; // shader normalizes by height
    const order = Math.max(0, Math.round((c * stateRef.current.outerBands) / Math.PI));
    setProbe({ xPct: (x / rect.width) * 100, yPct: (y / rect.height) * 100, order });
  }, []);

  const activeName = PRESETS.find((p) => p.id === activeId)?.name ?? "Custom";

  return (
    <div className="relative min-h-screen overflow-hidden bg-bench-800 text-chalk lg:h-screen">
      <div className="pointer-events-none absolute inset-0 z-50 grain opacity-[0.04] mix-blend-overlay" />

      <div className="relative z-10 flex min-h-screen flex-col lg:h-screen">
        {/* ── Masthead ─────────────────────────────────────────────── */}
        <header className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-hairline/70 px-5 py-3.5 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-laser/40 bg-laser/10 text-laser">
              <Aperture className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <div className="leading-none">
              <p className="font-display text-[15px] font-semibold tracking-tight text-chalk">
                FRINGE
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider2 text-muted">
                Tabletop&nbsp;Interferometer
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-6 font-mono text-[10px] uppercase tracking-wider2 text-muted sm:flex">
            <span className="flex items-center gap-1.5">
              <Radio className="h-3 w-3 text-cyan/70" strokeWidth={1.5} />
              {activeName}
            </span>
            <span className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full bg-phosphor ${paused ? "" : "animate-blink"}`} />
              {paused ? "shutter closed" : "beam live"}
            </span>
            <span className="text-muted/60">v1.0</span>
          </div>
        </header>

        {/* ── Body ─────────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col lg:min-h-0 lg:flex-row">
          {/* Instrument rail */}
          <aside className="flex w-full flex-col border-b border-hairline/70 bg-bench-700/80 lg:w-[342px] lg:flex-shrink-0 lg:border-b-0 lg:border-r">
            <div className="border-b border-hairline/70 px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-wider2 text-cyan/80">
                Bench&nbsp;·&nbsp;01
              </p>
              <h1 className="mt-1.5 font-display text-2xl font-semibold leading-tight tracking-tight text-chalk text-balance">
                Read the interference.
              </h1>
              <p className="mt-2 max-w-[44ch] font-sans text-[13px] leading-relaxed text-muted">
                A morphing light field on a single full-screen quad. Retune the
                beam, recall an emission source, or sweep the window — the probe
                reports fringe order at the optical axis.
              </p>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <Controls state={state} onChange={setChannel} />
              <div className="rule h-px" />
              <PresetBank activeId={activeId} onSelect={selectPreset} />
              <div className="rule h-px" />
              <Telemetry
                time={sample.time}
                fps={sample.fps}
                luma={sample.luma}
                rgb={sample.rgb}
                fringeOrder={probe.order}
                channel={activeName}
              />
            </div>

            <div className="flex flex-shrink-0 items-center gap-3 border-t border-hairline/70 px-5 py-3">
              <button
                onClick={() => setPaused((p) => !p)}
                className="flex items-center gap-2 rounded-[5px] border border-hairline/80 bg-bench-600/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider2 text-chalk/85 transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                {paused ? "Open shutter" : "Close shutter"}
              </button>
              <p className="font-mono text-[9px] leading-tight text-muted/70">
                <span className="text-laser/80">@/components/ui/morphing-light</span>
              </p>
            </div>
          </aside>

          {/* Observation window */}
          <main
            ref={mainRef}
            onPointerMove={handleMove}
            className="relative min-h-[64vh] flex-1 overflow-hidden bg-black lg:min-h-0"
          >
            {/* The shader fills the window (relative wrapper, not -z-10). */}
            <MorphingLight
              {...state}
              paused={paused}
              onSample={onSample}
              className="absolute inset-0 h-full w-full"
            />

            {/* Vignette for overlay legibility. */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_52%,rgba(7,8,9,0.7)_100%)]" />

            {/* Signature reticle. */}
            <Reticle />

            {/* Corner brackets. */}
            <Bracket className="pointer-events-none absolute left-4 top-4 h-7 w-7 text-cyan/40" />
            <Bracket className="pointer-events-none absolute right-4 top-4 h-7 w-7 text-cyan/40" />
            <Bracket className="pointer-events-none absolute bottom-4 left-4 h-7 w-7 text-cyan/40" />
            <Bracket className="pointer-events-none absolute bottom-4 right-4 h-7 w-7 text-cyan/40" />

            {/* Hero lockup. */}
            <div className="pointer-events-none absolute left-6 top-6 max-w-[20ch] animate-rise sm:left-8 sm:top-8">
              <p className="font-mono text-[10px] uppercase tracking-ultra text-laser/85">
                Source&nbsp;·&nbsp;{activeName}
              </p>
              <h2 className="mt-2 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-[0.9] tracking-tight text-chalk mix-blend-soft-light">
                MORPHING
                <br />
                LIGHT
              </h2>
            </div>

            {/* Cursor probe caliper — follows the pointer, reads fringe order. */}
            <div
              className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 sm:block"
              style={{ left: `${probe.xPct}%`, top: `${probe.yPct}%` }}
            >
              <Crosshair className="h-6 w-6 text-phosphor/90" strokeWidth={1} />
              <span className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-hairline/70 bg-bench-900/70 px-2 py-0.5 font-mono text-[10px] tabular-nums text-phosphor/90 backdrop-blur-sm">
                m·{probe.order}
              </span>
            </div>

            {/* Bottom spectrum readout. */}
            <div className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-hairline/70 bg-bench-900/60 px-4 py-1.5 backdrop-blur-md">
              <span className="font-mono text-[10px] uppercase tracking-wider2 text-muted">
                spectrum
              </span>
              <span
                className="h-2.5 w-24 rounded-full"
                style={{
                  background: `linear-gradient(90deg, rgb(${state.colorA.map((v) => v * 255).join(",")}), rgb(${state.colorB.map((v) => v * 255).join(",")}))`,
                  filter: `hue-rotate(${state.hueShift}deg)`,
                }}
              />
              <span className="font-mono text-[11px] tabular-nums tracking-wide text-chalk/85">
                {sample.fps.toFixed(0)} fps
              </span>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
