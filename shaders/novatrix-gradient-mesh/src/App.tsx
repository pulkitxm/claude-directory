import { useCallback, useMemo, useState } from "react";
import { Github, Pause, Play, RotateCcw, Shuffle } from "lucide-react";
import { GradientMesh } from "@/components/ui/gradient-mesh";
import { Slider } from "./components/Slider";
import { TelemetryHud } from "./components/TelemetryHud";
import { DocsDock } from "./components/DocsDock";
import { PALETTES, type Palette } from "./components/palettes";
import { cn } from "@/lib/utils";

/** The full live prop surface of the GradientMesh shader. */
interface MeshState {
  distortion: number;
  swirl: number;
  speed: number;
  scale: number;
  offsetX: number;
  offsetY: number;
  rotation: number;
  waveAmp: number;
  waveFreq: number;
  waveSpeed: number;
  grain: number;
}

const DEFAULTS: MeshState = {
  distortion: 5,
  swirl: 0.5,
  speed: 1.0,
  scale: 1,
  offsetX: 0.0,
  offsetY: 0.0,
  rotation: 90,
  waveAmp: 0.1,
  waveFreq: 10.0,
  waveSpeed: 0.2,
  grain: 0.06,
};

export default function App() {
  const [state, setState] = useState<MeshState>(DEFAULTS);
  const [palette, setPalette] = useState<Palette>(PALETTES[0]);
  const [paused, setPaused] = useState(false);

  const set = useCallback(
    <K extends keyof MeshState>(key: K) =>
      (v: number) =>
        setState((s) => ({ ...s, [key]: v })),
    [],
  );

  // The shader stops animating when speed hits 0 (uTime * speed cancels out),
  // so "pause" is just a zeroed playback rate — no remount, GL context stays.
  const liveSpeed = paused ? 0 : state.speed;

  // colors prop is a fresh array each render; memoize on the palette id so the
  // component's effect (which lists `colors` as a dep) only re-runs on change.
  const colors = useMemo(() => [...palette.colors], [palette.id]);

  const randomize = () => {
    const next = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    setPalette(next);
    setState((s) => ({
      ...s,
      swirl: +(Math.random() * 1.6 - 0.2).toFixed(2),
      waveAmp: +(Math.random() * 0.28).toFixed(2),
      waveFreq: +(4 + Math.random() * 14).toFixed(1),
      rotation: +(Math.random() * 6.28).toFixed(2),
      scale: +(0.7 + Math.random() * 1.1).toFixed(2),
    }));
  };

  const reset = () => {
    setState(DEFAULTS);
    setPalette(PALETTES[0]);
    setPaused(false);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-ink text-paper">
      {/* Ambient backdrop: a dim, blurred instance of the same field so the
          page never reads as a flat black box behind the glass chrome. */}
      <div className="pointer-events-none absolute inset-0 opacity-40 blur-2xl saturate-150">
        <GradientMesh
          colors={colors}
          speed={paused ? 0 : 0.4}
          swirl={0.8}
          scale={1.6}
          waveAmp={0.05}
          grain={0}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-ink/55" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        {/* ── Top bar ─────────────────────────────────────────────────── */}
        <header className="flex shrink-0 items-center justify-between gap-4 pb-3">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-line-strong bg-ink-plate">
              <span
                className="h-4 w-4 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, #aaa7d7, #3b2a8d 55%, #f75092)",
                }}
              />
            </span>
            <div className="leading-tight">
              <h1 className="font-display text-[15px] font-bold tracking-tight">
                NOVATRIX
              </h1>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-haze-dim">
                Gradient Mesh · shader lab
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-haze-dim sm:inline">
              @/components/ui/gradient-mesh
            </span>
            <a
              href="https://github.com/anthropics/claude-code"
              target="_blank"
              rel="noreferrer"
              aria-label="Source"
              className="grid h-9 w-9 place-items-center rounded-xl border border-line text-haze transition hover:border-line-strong hover:text-paper"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </header>

        {/* ── Body: live plate (left) + control rail (right) ──────────── */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Live preview plate */}
          <section
            data-plate
            className="relative min-h-[320px] overflow-hidden rounded-[var(--radius-plate)] border border-line-strong bg-black"
          >
            {/* The shader. key on palette id so a fresh GL program/uniform set
                is built per palette; live numeric props update in place. */}
            <GradientMesh
              key={palette.id}
              colors={colors}
              distortion={state.distortion}
              swirl={state.swirl}
              speed={liveSpeed}
              scale={state.scale}
              offsetX={state.offsetX}
              offsetY={state.offsetY}
              rotation={state.rotation}
              waveAmp={state.waveAmp}
              waveFreq={state.waveFreq}
              waveSpeed={state.waveSpeed}
              grain={state.grain}
            />

            {/* The prompt's headline — verbatim treatment, mix-blend-overlay. */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <h2 className="select-none text-balance px-6 text-center font-display text-5xl font-bold tracking-tighter text-black mix-blend-overlay sm:text-6xl lg:text-7xl">
                Gradient Mesh
              </h2>
            </div>

            {/* Registration brackets */}
            <span className="bracket bracket-tl" />
            <span className="bracket bracket-tr" />
            <span className="bracket bracket-bl" />
            <span className="bracket bracket-br" />

            {/* Plate footer: palette + telemetry, floating glass */}
            <div className="absolute inset-x-3 bottom-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="glass rounded-xl border border-line p-2.5">
                <p className="mb-2 px-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-haze-dim">
                  palette · {palette.name}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PALETTES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPalette(p)}
                      aria-label={`Palette ${p.name}`}
                      aria-pressed={palette.id === p.id}
                      title={p.name}
                      className={cn(
                        "h-7 w-7 overflow-hidden rounded-md ring-offset-2 ring-offset-ink transition",
                        palette.id === p.id
                          ? "ring-2 ring-paper"
                          : "ring-1 ring-line hover:ring-line-strong",
                      )}
                    >
                      <span
                        className="block h-full w-full"
                        style={{
                          background: `linear-gradient(135deg, ${p.colors[0]}, ${p.colors[1]} 50%, ${p.colors[2]})`,
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full sm:w-[260px]">
                <TelemetryHud paused={paused} />
              </div>
            </div>
          </section>

          {/* Control rail */}
          <aside className="flex min-h-0 flex-col gap-3">
            {/* Transport */}
            <div className="glass-strong flex shrink-0 items-center gap-2 rounded-2xl border border-line p-2">
              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Resume animation" : "Pause animation"}
                aria-pressed={paused}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-line-strong bg-paper/5 py-2.5 text-[12px] font-medium transition hover:bg-paper/10"
              >
                {paused ? (
                  <>
                    <Play className="h-3.5 w-3.5" /> Resume
                  </>
                ) : (
                  <>
                    <Pause className="h-3.5 w-3.5" /> Pause
                  </>
                )}
              </button>
              <button
                onClick={randomize}
                aria-label="Randomize"
                className="flex items-center justify-center gap-2 rounded-xl border border-line px-3.5 py-2.5 text-[12px] font-medium text-haze transition hover:border-line-strong hover:text-paper"
              >
                <Shuffle className="h-3.5 w-3.5" /> Random
              </button>
              <button
                onClick={reset}
                aria-label="Reset to defaults"
                className="grid h-[42px] w-[42px] place-items-center rounded-xl border border-line text-haze transition hover:border-line-strong hover:text-paper"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Faders — promote the shader's baked constants to live uniforms */}
            <div className="glass-strong scroll-thin min-h-0 flex-1 overflow-y-auto rounded-2xl border border-line p-4">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-haze-dim">
                Uniform control deck
              </p>
              <div className="grid grid-cols-1 gap-x-5 gap-y-3.5 sm:grid-cols-2">
                <Slider label="Speed" value={state.speed} min={0} max={3} step={0.05} onChange={set("speed")} />
                <Slider label="Swirl" value={state.swirl} min={-1.5} max={1.5} step={0.05} onChange={set("swirl")} />
                <Slider label="Scale" value={state.scale} min={0.4} max={2.5} step={0.05} onChange={set("scale")} />
                <Slider label="Rotation" value={state.rotation} min={0} max={6.28} step={0.01} unit=" rad" onChange={set("rotation")} />
                <Slider label="Wave Amp" value={state.waveAmp} min={0} max={0.4} step={0.01} onChange={set("waveAmp")} />
                <Slider label="Wave Freq" value={state.waveFreq} min={1} max={24} step={0.5} decimals={1} onChange={set("waveFreq")} />
                <Slider label="Wave Speed" value={state.waveSpeed} min={0} max={1} step={0.02} onChange={set("waveSpeed")} />
                <Slider label="Grain" value={state.grain} min={0} max={0.2} step={0.005} decimals={3} onChange={set("grain")} />
                <Slider label="Offset X" value={state.offsetX} min={-1.5} max={1.5} step={0.05} onChange={set("offsetX")} />
                <Slider label="Offset Y" value={state.offsetY} min={-1.5} max={1.5} step={0.05} onChange={set("offsetY")} />
              </div>

              <div className="mt-4 border-t border-line pt-3.5">
                <Slider
                  label="Distortion (rebuilds shader)"
                  value={state.distortion}
                  min={1}
                  max={12}
                  step={1}
                  decimals={0}
                  onChange={set("distortion")}
                />
                <p className="mt-1.5 text-[10.5px] leading-snug text-haze-dim">
                  Distortion is compiled into the GLSL loop, so changing it
                  recompiles the fragment program — the only prop that does.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Docs dock ───────────────────────────────────────────────── */}
        <footer className="mt-4 shrink-0">
          <DocsDock />
        </footer>
      </div>
    </main>
  );
}
