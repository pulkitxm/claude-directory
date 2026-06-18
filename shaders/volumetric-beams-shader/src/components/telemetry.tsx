import { useEffect, useRef, useState } from "react";
import { Activity, Cpu, Sun, Waves } from "lucide-react";

interface TelemetryProps {
  /** Live FPS, sampled by the parent off the shader's own rAF clock. */
  fps: number;
  /** Shader clock in seconds (THREE.Clock.elapsedTime). */
  clock: number;
  /** 0..1 beam flux — mean luminance read back off the canvas. */
  flux: number;
  /** Dominant channel tag derived from the read-back pixels. */
  cast: string;
  beamCount: number;
}

function Readout({
  Icon,
  label,
  value,
  sub,
}: {
  Icon: typeof Activity;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-hairline bg-ink-900/60 px-3.5 py-3">
      <Icon className="h-4 w-4 shrink-0 text-beam-400" />
      <div className="min-w-0">
        <div className="font-mono text-[9px] uppercase tracking-wide2 text-dust">
          {label}
        </div>
        <div className="font-mono text-[15px] leading-tight tabular-nums text-chalk">
          {value}
          {sub && <span className="ml-1 text-[10px] text-dust">{sub}</span>}
        </div>
      </div>
    </div>
  );
}

export function Telemetry({ fps, clock, flux, cast, beamCount }: TelemetryProps) {
  // A tiny rolling sparkline of flux so the panel reads as a live instrument.
  const [trace, setTrace] = useState<number[]>(() => new Array(40).fill(0));
  const lastPush = useRef(0);

  useEffect(() => {
    const now = performance.now();
    if (now - lastPush.current < 90) return;
    lastPush.current = now;
    setTrace((t) => [...t.slice(1), flux]);
  }, [flux]);

  const path = trace
    .map((v, i) => {
      const x = (i / (trace.length - 1)) * 100;
      const y = 28 - Math.min(1, v) * 26;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const mm = String(Math.floor(clock / 60)).padStart(2, "0");
  const ss = String(Math.floor(clock % 60)).padStart(2, "0");
  const cs = String(Math.floor((clock * 100) % 100)).padStart(2, "0");

  return (
    <div className="rounded-xl border border-hairline bg-ink-800/70 p-5 backdrop-blur-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-beam-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-beam-400" />
          </span>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide2 text-chalk">
            Optics Telemetry
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wide2 text-dust">
          live · gpu
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <Readout
          Icon={Cpu}
          label="Render rate"
          value={fps.toFixed(0)}
          sub="fps"
        />
        <Readout
          Icon={Activity}
          label="Beam clock"
          value={`${mm}:${ss}`}
          sub={`.${cs}`}
        />
        <Readout
          Icon={Sun}
          label="Beam flux"
          value={(flux * 100).toFixed(1)}
          sub="%"
        />
        <Readout Icon={Waves} label="Spectral cast" value={cast} />
      </div>

      {/* Flux sparkline read straight off the composited canvas. */}
      <div className="mt-4 rounded-lg border border-hairline bg-ink-900/60 p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-wide2 text-dust">
            Flux trace · {beamCount} arms
          </span>
          <span className="font-mono text-[9px] tabular-nums text-beam-300">
            {(flux * 100).toFixed(0)}%
          </span>
        </div>
        <svg
          viewBox="0 0 100 30"
          preserveAspectRatio="none"
          className="h-10 w-full"
        >
          <defs>
            <linearGradient id="fluxfill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(111,156,255,0.45)" />
              <stop offset="100%" stopColor="rgba(111,156,255,0)" />
            </linearGradient>
          </defs>
          {path && (
            <>
              <path
                d={`${path} L100,30 L0,30 Z`}
                fill="url(#fluxfill)"
                stroke="none"
              />
              <path
                d={path}
                fill="none"
                stroke="#7f9cff"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
