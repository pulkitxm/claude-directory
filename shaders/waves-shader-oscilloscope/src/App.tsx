import { CircleDot, Crosshair, SignalHigh } from "lucide-react";
import { ShaderComponent } from "@/components/ui/waves-shader";
import { ReticleFrame } from "@/components/reticle";
import { Readout } from "@/components/readout";
import { ChannelLegend } from "@/components/channel-legend";
import { ScopeDeck } from "@/components/scope-deck";
import { useSignalClock } from "@/lib/use-signal-clock";

/**
 * OSCILLON — a waveform observation deck.
 *
 * The verbatim `ShaderComponent` (the coswarp interference field) is dropped in
 * UNTOUCHED at `@/components/ui/waves-shader` and used as the live full-bleed
 * trace. Everything else here is the instrument it lives inside: a phosphor
 * signal analyzer with a framed window, a live readout HUD, a channel legend,
 * and a telemetry deck — all driven by the same real `requestAnimationFrame`
 * clock the shader animates on, so the numbers move with the field.
 */
export default function App() {
  const sample = useSignalClock();

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-carbon-950 text-chalk">
      {/* ── Layer 0: the live field ───────────────────────────────────────
          The verbatim component renders its own full-screen WebGL canvas. We
          pin it behind the chrome and let the console glass float over it. */}
      <div className="absolute inset-0 z-0">
        <ShaderComponent />
      </div>

      {/* ── Layer 1: tube treatment ──────────────────────────────────────
          Scanlines + an edge vignette turn the raw canvas into a CRT screen
          under observation. Both are inert. */}
      <div className="scanlines pointer-events-none absolute inset-0 z-10 opacity-50" />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 50%, transparent 52%, rgba(5,6,8,0.55) 88%, rgba(5,6,8,0.92) 100%)",
        }}
      />
      <div className="grain pointer-events-none absolute inset-0 z-10 opacity-[0.05]" />
      {/* Top + bottom scrims so the masthead and deck stay legible over the
          high-key white regions of the interference field. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-56"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,6,8,0.78) 0%, rgba(5,6,8,0.32) 55%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64"
        style={{
          background:
            "linear-gradient(0deg, rgba(5,6,8,0.82) 0%, rgba(5,6,8,0.35) 55%, transparent 100%)",
        }}
      />

      {/* ── Layer 2: instrument framing ──────────────────────────────────
          Corner reticles + a faint inner keyline define the observation
          window edge. */}
      <div className="pointer-events-none absolute inset-4 z-20 rounded-lg ring-1 ring-inset ring-phosphor-400/10 sm:inset-6">
        <ReticleFrame />
      </div>

      {/* ── Layer 3: the console chrome ──────────────────────────────────
          A column layout: masthead at top, HUD + legend mid, deck at base.
          The wrapper passes pointer events through; only the glass panels
          (which sit on opaque backgrounds) actually catch them. */}
      <div className="pointer-events-none absolute inset-0 z-30 flex flex-col p-4 sm:p-7">
        {/* Masthead */}
        <header className="flex items-start justify-between gap-4">
          <div className="animate-rise">
            <div className="mb-2 flex items-center gap-2 text-phosphor-400">
              <CircleDot className="h-4 w-4 animate-blink" strokeWidth={1.8} />
              <span className="text-[10px] uppercase tracking-ultra text-chalk/70">
                Observation deck
              </span>
            </div>
            <h1 className="font-display text-4xl font-medium leading-[0.92] tracking-tight text-chalk glow-phosphor sm:text-6xl">
              OSCILLON
            </h1>
            <p className="mt-2 max-w-xs text-balance text-[11px] uppercase tracking-wider2 text-dim sm:text-xs">
              Live coswarp interference · single-quad GPU trace
            </p>
          </div>

          {/* Mode tag — a small instrument plate, top-right. */}
          <div
            className="animate-rise rounded-md border border-hairline/80 bg-carbon-900/80 px-3 py-2 backdrop-blur-md"
            style={{ animationDelay: "120ms" }}
          >
            <div className="flex items-center gap-2">
              <SignalHigh
                className="h-3.5 w-3.5 text-phosphor-400"
                strokeWidth={1.8}
              />
              <span className="text-[10px] uppercase tracking-wider2 text-chalk/80">
                XY · free-run
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-[9px] uppercase tracking-wider2 text-dim">
              <Crosshair className="h-3 w-3" strokeWidth={1.6} />
              grid 10× / 20×
            </div>
          </div>
        </header>

        {/* Mid band: live readout (left) + channel legend (right). Pushed to
            the vertical centre so the field's core stays unobstructed. */}
        <div className="flex flex-1 items-center justify-between gap-4">
          <div
            className="pointer-events-auto animate-fade-in"
            style={{ animationDelay: "260ms" }}
          >
            <Readout sample={sample} />
          </div>
          <div
            className="pointer-events-auto hidden animate-fade-in sm:block"
            style={{ animationDelay: "340ms" }}
          >
            <ChannelLegend sample={sample} />
          </div>
        </div>

        {/* Base: the telemetry deck. */}
        <footer
          className="pointer-events-auto animate-rise"
          style={{ animationDelay: "200ms" }}
        >
          <ScopeDeck sample={sample} />
        </footer>
      </div>
    </main>
  );
}
