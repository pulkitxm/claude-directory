import { Activity, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SignalSample } from "@/lib/use-signal-clock";

function pad(n: number, width = 2) {
  return n.toFixed(0).padStart(width, "0");
}

/** Format the elapsed rAF time as a stopwatch HH:MM:SS.cc readout. */
function stamp(t: number) {
  const cs = Math.floor((t * 100) % 100);
  const s = Math.floor(t % 60);
  const m = Math.floor((t / 60) % 60);
  const h = Math.floor(t / 3600);
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(cs)}`;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6">
      <span className="text-[10px] uppercase tracking-wider2 text-dim">
        {label}
      </span>
      <span className="font-mono text-[12px] tabular-nums text-phosphor-200 glow-phosphor">
        {value}
      </span>
    </div>
  );
}

/**
 * The live signal readout — a glass data block pinned to the top-left of the
 * observation window. Every value is sampled from the shared rAF clock, so the
 * numbers advance with the field on screen.
 */
export function Readout({
  sample,
  className,
}: {
  sample: SignalSample;
  className?: string;
}) {
  const locked = sample.fps > 50;
  return (
    <div
      className={cn(
        "w-[220px] rounded-md border border-hairline/80 bg-carbon-900/80 p-3 backdrop-blur-md",
        className,
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Radio className="h-3.5 w-3.5 text-phosphor-400" strokeWidth={1.6} />
          <span className="text-[10px] uppercase tracking-wider2 text-chalk/80">
            Live trace
          </span>
        </div>
        <span
          className={cn(
            "flex items-center gap-1 text-[9px] uppercase tracking-wider2",
            locked ? "text-phosphor-400" : "text-amber-400",
          )}
        >
          <span
            className={cn(
              "inline-block h-1.5 w-1.5 rounded-full animate-blink",
              locked ? "bg-phosphor-400" : "bg-amber-400",
            )}
          />
          {locked ? "lock" : "drift"}
        </span>
      </div>

      <div className="space-y-1.5">
        <Row label="t+" value={stamp(sample.t)} />
        <Row label="phase" value={`${(sample.phase * 360).toFixed(1)}°`} />
        <Row label="freq" value={`${(sample.freq * 24 + 4).toFixed(2)} Hz`} />
        <Row label="frames" value={sample.frames.toLocaleString("en-US")} />
        <Row label="render" value={`${sample.fps.toFixed(0)} fps`} />
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 border-t border-hairline/70 pt-2">
        <Activity className="h-3 w-3 text-phosphor-400/80" strokeWidth={1.6} />
        <span className="text-[9px] uppercase tracking-wider2 text-dim">
          coswarp interference · gpu
        </span>
      </div>
    </div>
  );
}
