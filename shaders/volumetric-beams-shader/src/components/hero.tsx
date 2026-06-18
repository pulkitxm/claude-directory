import { ChevronDown, MousePointer2 } from "lucide-react";

interface HeroProps {
  beamCount: number;
  fps: number;
  presetName: string;
}

/** A corner reticle bracket. */
function Bracket({ className }: { className: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-6 w-6 border-beam-400/50 ${className}`}
      aria-hidden
    />
  );
}

export function Hero({ beamCount, fps, presetName }: HeroProps) {
  return (
    <header className="relative flex min-h-[100svh] flex-col">
      {/* Top status bar */}
      <div className="flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-beam-400 shadow-[0_0_10px_rgba(111,156,255,0.9)]" />
          <span className="font-mono text-[11px] uppercase tracking-wide2 text-chalk">
            BEAMWORKS
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-wide2 text-dust sm:inline">
            · optics bench
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-wide2 text-dust">
          <span className="hidden sm:inline">
            patch <span className="text-beam-200">{presetName}</span>
          </span>
          <span>
            <span className="text-beam-200 tabular-nums">{fps.toFixed(0)}</span>{" "}
            fps
          </span>
          <span className="hidden items-center gap-1.5 md:flex">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-amber-glow" />
            armed
          </span>
        </div>
      </div>

      {/* Centre lockup */}
      <div className="relative flex flex-1 items-center justify-center px-5">
        {/* Reticle ring framing the wordmark */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[clamp(280px,46vw,560px)] w-[clamp(280px,46vw,560px)]">
            <div className="absolute inset-0 animate-reticle-spin rounded-full border border-beam-500/15" />
            <div className="absolute inset-[10%] animate-reticle-spin-rev rounded-full border border-dashed border-beam-500/12" />
            <div className="absolute inset-[26%] rounded-full border border-beam-500/10" />
            {/* tick crosshair */}
            <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-beam-400/40" />
            <span className="absolute bottom-0 left-1/2 h-4 w-px -translate-x-1/2 bg-beam-400/40" />
            <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-beam-400/40" />
            <span className="absolute right-0 top-1/2 h-px w-4 -translate-y-1/2 bg-beam-400/40" />
          </div>
        </div>

        <div className="relative z-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-hairline bg-ink-900/50 px-3 py-1 backdrop-blur-sm">
            <span className="h-1 w-1 rounded-full bg-amber-glow" />
            <span className="font-mono text-[10px] uppercase tracking-wide2 text-dust">
              single-scatter volumetric raymarch
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.6rem,9vw,7rem)] font-bold uppercase leading-[0.92] tracking-tight text-balance">
            <span className="bg-gradient-to-b from-white via-beam-100 to-beam-400/80 bg-clip-text text-transparent drop-shadow-[0_8px_40px_rgba(91,134,245,0.45)]">
              Beam
            </span>
            <span className="bg-gradient-to-b from-beam-300 via-beam-400 to-beam-600/70 bg-clip-text text-transparent drop-shadow-[0_8px_40px_rgba(91,134,245,0.45)]">
              works
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-[14px] leading-relaxed text-dust sm:text-[15px]">
            A volumetric light synthesizer — a single full-screen Three.js
            raymarch firing{" "}
            <span className="tabular-nums text-beam-200">{beamCount}</span> angular
            beams through a scattering medium. Wired into shadcn{" "}
            <code className="rounded bg-ink-900/70 px-1 py-0.5 font-mono text-[12px] text-beam-100">
              components/ui
            </code>{" "}
            and framed as an optics calibration bench.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#console"
              className="pointer-events-auto rounded-lg border border-beam-500/60 bg-beam-500/15 px-5 py-2.5 font-mono text-[12px] uppercase tracking-wide2 text-beam-100 transition-all hover:bg-beam-500/25 glow-beam"
            >
              Open console
            </a>
            <a
              href="#api"
              className="pointer-events-auto rounded-lg border border-hairline px-5 py-2.5 font-mono text-[12px] uppercase tracking-wide2 text-dust transition-colors hover:border-beam-500/40 hover:text-beam-200"
            >
              Props API
            </a>
          </div>

          <div className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide2 text-dust/70">
            <MousePointer2 className="h-3 w-3" />
            move the cursor to steer the beam
          </div>
        </div>

        <Bracket className="left-4 top-4 border-l border-t sm:left-8 sm:top-8" />
        <Bracket className="right-4 top-4 border-r border-t sm:right-8 sm:top-8" />
        <Bracket className="bottom-4 left-4 border-b border-l sm:bottom-8 sm:left-8" />
        <Bracket className="bottom-4 right-4 border-b border-r sm:bottom-8 sm:right-8" />
      </div>

      {/* Scroll cue */}
      <div className="flex justify-center pb-6">
        <div className="flex flex-col items-center gap-1.5 text-dust/60">
          <span className="font-mono text-[9px] uppercase tracking-wide2">
            scroll
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </header>
  );
}
