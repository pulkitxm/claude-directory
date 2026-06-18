"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Activity,
  Boxes,
  CircleDot,
  Cpu,
  Gauge,
  Radio,
  Waves,
} from "lucide-react";

import { PhosphorCanvas } from "@/components/ui/phosphor-canvas";
import { Button } from "@/components/ui/button";
import { formatUptime, useUptime } from "@/lib/use-clock";

/* ------------------------------------------------------------------ */
/* Small presentational atoms                                          */
/* ------------------------------------------------------------------ */

/** A right-angle bracket drawn at one corner of the instrument bezel. */
function CornerBracket({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const base =
    "pointer-events-none absolute h-7 w-7 border-[hsl(var(--phosphor)/0.7)]";
  const map: Record<typeof position, string> = {
    tl: "left-0 top-0 border-l border-t",
    tr: "right-0 top-0 border-r border-t",
    bl: "left-0 bottom-0 border-l border-b",
    br: "right-0 bottom-0 border-r border-b",
  };
  return <span aria-hidden className={`${base} ${map[position]}`} />;
}

/** A single telemetry cell: label over a glowing mono value. */
function Readout({
  icon: Icon,
  label,
  value,
  glow = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  glow?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-3.5 text-[hsl(var(--phosphor)/0.8)]" />
      <div className="leading-none">
        <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/35">
          {label}
        </div>
        <div
          className="mt-1 font-mono text-[12px] tabular-nums tracking-wide text-white/85"
          style={
            glow
              ? { textShadow: "0 0 12px hsl(var(--phosphor) / 0.65)" }
              : undefined
          }
        >
          {value}
        </div>
      </div>
    </div>
  );
}

/** Bezel label chip with a pulsing status dot. */
function StatusChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--phosphor)/0.35)] bg-[hsl(var(--phosphor)/0.06)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[hsl(var(--phosphor)/0.9)]">
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--phosphor))] opacity-75" />
        <span className="relative inline-flex size-1.5 rounded-full bg-[hsl(var(--phosphor))]" />
      </span>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function PhosphorHero() {
  const [fps, setFps] = useState(0);
  const uptime = useUptime();

  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden bg-black text-white antialiased">
      {/* ============ Layer 0: the phosphor shader ============ */}
      <PhosphorCanvas onFps={setFps} />

      {/* Cinematic grade: lift the centre, sink the edges so type reads. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 42%, transparent 0%, transparent 38%, rgba(0,0,0,0.55) 72%, rgba(0,0,0,0.9) 100%)",
        }}
      />
      {/* Anchor the headline against a soft floor of darkness. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, transparent 100%)",
        }}
      />
      {/* CRT scanlines. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-soft-light"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* A single phosphor sweep line drifting down the tube. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px animate-scan bg-gradient-to-r from-transparent via-[hsl(var(--phosphor)/0.5)] to-transparent" />
      </div>
      {/* Hairline bezel + corner brackets framing the whole tube. */}
      <div aria-hidden className="pointer-events-none absolute inset-3 sm:inset-5">
        <div className="absolute inset-0 rounded-[4px] border border-white/[0.06]" />
        <CornerBracket position="tl" />
        <CornerBracket position="tr" />
        <CornerBracket position="bl" />
        <CornerBracket position="br" />
      </div>

      {/* ============ Layer 1: HUD ============ */}
      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        {/* ---- Top bar ---- */}
        <header className="flex items-center justify-between gap-4 px-6 pt-8 sm:px-12 sm:pt-10">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-[3px] border border-[hsl(var(--phosphor)/0.45)] bg-[hsl(var(--phosphor)/0.08)] text-[hsl(var(--phosphor))] shadow-[0_0_22px_-8px_hsl(var(--phosphor))]">
              <Waves className="size-4" />
            </span>
            <div className="leading-none">
              <div className="font-mono text-[12px] font-medium uppercase tracking-[0.34em] text-white/90">
                PHOSPHOR
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-white/35">
                Volumetric Field Lab
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 font-mono text-[10px] uppercase tracking-[0.26em] text-white/45 md:flex">
            <a className="transition-colors hover:text-white/90" href="#field">
              Field
            </a>
            <a className="transition-colors hover:text-white/90" href="#signal">
              Signal
            </a>
            <a className="transition-colors hover:text-white/90" href="#archive">
              Archive
            </a>
          </nav>

          <StatusChip>Live · WebGL2</StatusChip>
        </header>

        {/* ---- Centre stage ---- */}
        <section className="flex flex-1 flex-col justify-center px-6 py-14 sm:px-12">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-[hsl(var(--phosphor)/0.85)]">
              <CircleDot className="size-3.5" />
              <span>Specimen 30 — Raymarched Phosphor</span>
            </div>

            <h1 className="font-display text-[clamp(3rem,11vw,9.5rem)] font-semibold leading-[0.86] tracking-[-0.04em]">
              <span
                className="block text-white"
                style={{ textShadow: "0 0 60px hsl(var(--phosphor) / 0.28)" }}
              >
                FIELD OF
              </span>
              <span
                className="block bg-gradient-to-b from-[hsl(var(--phosphor))] via-[hsl(var(--phosphor)/0.9)] to-[hsl(var(--phosphor)/0.45)] bg-clip-text text-transparent"
                style={{
                  filter: "drop-shadow(0 0 42px hsl(var(--phosphor) / 0.45))",
                }}
              >
                LIGHT
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-[15px] leading-relaxed text-white/55 sm:text-base">
              A single fragment shader, raymarched eighty steps a frame, folding a
              rotating signed-distance field into ribbons of phosphor. No textures,
              no geometry — every photon is solved live in GLSL and decays on a
              black tube.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild variant="phosphor">
                <a href="#signal">
                  Enter the field
                  <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
              <Button asChild variant="ghost">
                <a href="#archive">
                  <Radio />
                  Read the signal
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ---- Bottom telemetry strip ---- */}
        <footer className="px-6 pb-9 sm:px-12 sm:pb-11">
          <div className="flex flex-col gap-5 border-t border-white/[0.07] pt-5 md:flex-row md:items-center md:justify-between">
            <div className="grid grid-cols-2 gap-x-9 gap-y-5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-10">
              <Readout
                icon={Gauge}
                label="Render"
                value={`${fps ? fps.toFixed(0).padStart(2, "0") : "--"} FPS`}
                glow
              />
              <Readout
                icon={Activity}
                label="Session"
                value={formatUptime(uptime)}
              />
              <Readout icon={Boxes} label="March Steps" value="80 / frame" />
              <Readout icon={Cpu} label="Pipeline" value="GLSL · ES 3.00" />
            </div>

            <div className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.26em] text-white/30">
              <Waves className="size-3.5 text-[hsl(var(--phosphor)/0.7)]" />
              <span>Move the cursor — the tube is listening</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default PhosphorHero;
