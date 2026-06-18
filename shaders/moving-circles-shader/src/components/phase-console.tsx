import { useState } from "react";
import {
  Activity,
  ChevronRight,
  Code2,
  Gauge,
  Grip,
  Pause,
  Play,
  Repeat,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShaderTelemetry } from "@/components/ui/moving-circles-shader";
import { CodeBlock } from "@/components/code-block";

const AXES = ["X", "Y", "Z"] as const;

const INTEGRATION_SNIPPET = `import { Component } from
  "@/components/ui/moving-circles-shader";

export default function DemoOne() {
  return <Component />;
}`;

function pad(n: number, w = 6, d = 2) {
  return n.toFixed(d).padStart(w, " ");
}

/** A 7-segment-ish numeric readout chip. */
function Readout({
  label,
  value,
  unit,
  accent = "phosphor",
}: {
  label: string;
  value: string;
  unit?: string;
  accent?: "phosphor" | "amber" | "ink";
}) {
  const tone =
    accent === "amber"
      ? "text-amber"
      : accent === "ink"
        ? "text-ink"
        : "text-phosphor";
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-widest text-dim">
        {label}
      </span>
      <span className={cn("font-mono text-[13px] tabular-nums", tone)}>
        {value}
        {unit && <span className="ml-1 text-[9px] text-muted">{unit}</span>}
      </span>
    </div>
  );
}

type PhaseConsoleProps = {
  telemetry: ShaderTelemetry;
  paused: boolean;
  onTogglePause: () => void;
  speed: number;
  onCycleSpeed: () => void;
  hidden: boolean;
};

/**
 * The signature instrument: a left transport rail + bottom telemetry ticker
 * whose PHASE AXIS / DIRECTION / SWEEP values are decoded from the exact same
 * GLSL math the GPU runs, so the chrome reports the truth frame-for-frame.
 */
export function PhaseConsole({
  telemetry,
  paused,
  onTogglePause,
  speed,
  onCycleSpeed,
  hidden,
}: PhaseConsoleProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { time, axis, phase, direction, fps } = telemetry;

  const dirLabel = direction === 0 ? "HOLD" : direction > 0 ? "+ADV" : "−RET";
  const dirTone = direction === 0 ? "ink" : direction > 0 ? "phosphor" : "amber";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 flex flex-col justify-between transition-opacity duration-500",
        hidden ? "opacity-0" : "opacity-100"
      )}
    >
      {/* ── Top eyebrow strip ───────────────────────────────────────── */}
      <header className="flex items-start justify-between px-5 pt-5 sm:px-8 sm:pt-7">
        <div className="pointer-events-auto animate-fade-up">
          <div className="flex items-center gap-2.5">
            <Grip className="h-4 w-4 text-phosphor" strokeWidth={1.6} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Phase Lattice
            </span>
            <span className="h-2.5 w-px bg-hairline-bright" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
              Sphere Sonar / rev.03
            </span>
          </div>
          <h1 className="mt-3 max-w-xl font-display text-2xl font-semibold leading-[1.05] tracking-tight text-ink text-shadow-deep sm:text-[2.1rem]">
            Isometric lattice,
            <br />
            <span className="text-phosphor">one axis breathing at a time.</span>
          </h1>
        </div>

        <div className="pointer-events-auto mr-12 hidden animate-fade-up items-center gap-2 sm:flex">
          <span
            className={cn(
              "flex items-center gap-1.5 rounded-full border border-hairline glass px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest",
              paused ? "text-amber" : "text-phosphor"
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                paused ? "bg-amber" : "animate-blink bg-phosphor"
              )}
            />
            {paused ? "Frozen" : "Live · GPU clock"}
          </span>
        </div>
      </header>

      {/* ── Left transport rail (the signature) ─────────────────────── */}
      <div className="pointer-events-auto absolute left-5 top-1/2 hidden -translate-y-1/2 animate-fade-up md:block sm:left-8">
        <div className="w-[208px] rounded-xl border border-hairline glass panel-grain p-4">
          <div className="mb-3 flex items-center gap-2 border-b border-hairline/70 pb-3">
            <Activity className="h-3.5 w-3.5 text-phosphor" strokeWidth={1.8} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
              Phase Axis
            </span>
          </div>

          {/* Axis selector — the GPU translates spheres along ONE axis per
              integer second via mod(time, 3.0). We light the live one. */}
          <div className="grid grid-cols-3 gap-1.5">
            {AXES.map((a, i) => {
              const active = i === axis;
              return (
                <div
                  key={a}
                  className={cn(
                    "relative flex h-14 flex-col items-center justify-center rounded-md border transition-colors duration-200",
                    active
                      ? "border-phosphor/70 bg-phosphor/10"
                      : "border-hairline bg-panel-2/60"
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-lg font-bold leading-none",
                      active ? "text-phosphor" : "text-dim"
                    )}
                  >
                    {a}
                  </span>
                  <span className="mt-1 font-mono text-[8px] uppercase tracking-widest text-dim">
                    {active ? "active" : "idle"}
                  </span>
                  {active && (
                    <span className="absolute -top-px left-1/2 h-px w-6 -translate-x-1/2 bg-phosphor shadow-[0_0_8px_#5fe9d0]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Sweep meter: phase eased by (t - sin(t·τ)/τ) */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest text-dim">
                Sweep
              </span>
              <span className="font-mono text-[9px] tabular-nums text-muted">
                {pad(((phase % 1) + 1) % 1, 4, 3)}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-panel-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-phosphor-dim to-phosphor transition-[width] duration-100"
                style={{ width: `${(((phase % 1) + 1) % 1) * 100}%` }}
              />
            </div>
          </div>

          {/* Direction readout: mod(vec3(2,0,1)-ceil(t),3)-1 on active axis */}
          <div className="mt-4 flex items-center justify-between rounded-md border border-hairline bg-panel-2/60 px-3 py-2">
            <span className="font-mono text-[9px] uppercase tracking-widest text-dim">
              Drift
            </span>
            <span
              className={cn(
                "font-mono text-[12px] font-medium tabular-nums",
                dirTone === "phosphor"
                  ? "text-phosphor"
                  : dirTone === "amber"
                    ? "text-amber"
                    : "text-ink"
              )}
            >
              {dirLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ── Bottom telemetry ticker + transport controls ────────────── */}
      <footer className="px-5 pb-5 sm:px-8 sm:pb-7">
        <div className="pointer-events-auto flex flex-col gap-3 animate-fade-up lg:flex-row lg:items-end lg:justify-between">
          {/* Live readouts */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-hairline glass panel-grain px-5 py-3.5">
            <Readout label="uTime" value={pad(time, 7, 2)} unit="s" />
            <span className="hidden h-7 w-px bg-hairline sm:block" />
            <Readout
              label="Axis"
              value={AXES[axis]}
              accent="amber"
            />
            <span className="hidden h-7 w-px bg-hairline sm:block" />
            <Readout label="Phase" value={pad(phase, 7, 2)} />
            <span className="hidden h-7 w-px bg-hairline sm:block" />
            <Readout
              label="Render"
              value={fps > 0 ? fps.toFixed(0) : "—"}
              unit="fps"
              accent="ink"
            />
          </div>

          {/* Transport */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onTogglePause}
              className="flex items-center gap-2 rounded-lg border border-hairline glass px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-ink transition-colors hover:border-phosphor/60 hover:text-phosphor"
            >
              {paused ? (
                <Play className="h-3.5 w-3.5" />
              ) : (
                <Pause className="h-3.5 w-3.5" />
              )}
              {paused ? "Resume" : "Freeze"}
            </button>

            <button
              type="button"
              onClick={onCycleSpeed}
              className="flex items-center gap-2 rounded-lg border border-hairline glass px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-muted transition-colors hover:border-phosphor/60 hover:text-phosphor"
            >
              <Gauge className="h-3.5 w-3.5" />
              {speed.toFixed(2)}×
            </button>

            <button
              type="button"
              onClick={() => setSheetOpen((v) => !v)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest transition-colors",
                sheetOpen
                  ? "border-phosphor/60 bg-phosphor/10 text-phosphor"
                  : "border-hairline glass text-muted hover:border-phosphor/60 hover:text-phosphor"
              )}
            >
              <Code2 className="h-3.5 w-3.5" />
              Integrate
            </button>
          </div>
        </div>
      </footer>

      {/* ── Integration sheet ───────────────────────────────────────── */}
      <div
        className={cn(
          "pointer-events-auto absolute right-0 top-0 z-20 flex h-full w-full max-w-md flex-col border-l border-hairline glass panel-grain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          sheetOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!sheetOpen}
      >
        <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-dim">
              shadcn · components/ui
            </div>
            <div className="mt-1 font-display text-lg font-semibold text-ink">
              moving-circles-shader
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSheetOpen(false)}
            aria-label="Close integration sheet"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-hairline text-muted transition-colors hover:border-phosphor/60 hover:text-phosphor"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <section>
            <h2 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-dim">
              Dependencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {["three", "@react-three/fiber"].map((dep) => (
                <span
                  key={dep}
                  className="rounded-md border border-hairline bg-panel-2/60 px-2.5 py-1 font-mono text-[11px] text-phosphor"
                >
                  {dep}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-dim">
              Install
            </h2>
            <CodeBlock
              code="npm i three @react-three/fiber"
              className="text-phosphor"
            />
          </section>

          <section>
            <h2 className="mb-2 font-mono text-[10px] uppercase tracking-widest text-dim">
              Drop in
            </h2>
            <CodeBlock label="demo.tsx" code={INTEGRATION_SNIPPET} />
          </section>

          <section className="rounded-lg border border-hairline bg-panel-2/40 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Repeat className="h-3.5 w-3.5 text-amber" />
              <h2 className="font-mono text-[10px] uppercase tracking-widest text-amber">
                How it moves
              </h2>
            </div>
            <p className="font-mono text-[11.5px] leading-relaxed text-muted">
              An isometric matrix projects every pixel into a 3D lattice of
              unit cells. <span className="text-ink">fract()</span> tiles a sphere
              into each cell; the distance field draws their shells. Every integer
              second{" "}
              <span className="text-phosphor">mod(time, 3.0)</span> hands control
              to the next axis (X→Y→Z), and{" "}
              <span className="text-ink">t − sin(t·τ)/τ</span> eases the spheres
              one cell along it — so the grid appears to step, hold, and breathe
              perpetually.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
