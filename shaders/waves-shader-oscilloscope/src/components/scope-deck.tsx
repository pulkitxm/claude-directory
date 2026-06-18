import { Gauge, Layers, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SignalSample } from "@/lib/use-signal-clock";

/** A labelled value cell with a unit, mono numerals. */
function Cell({
  icon,
  label,
  value,
  unit,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-phosphor-400/80">{icon}</span>
      <div className="leading-none">
        <div className="text-[9px] uppercase tracking-wider2 text-dim">
          {label}
        </div>
        <div className="mt-1 font-mono text-[13px] tabular-nums text-chalk">
          {value}
          {unit && <span className="ml-1 text-[10px] text-dim">{unit}</span>}
        </div>
      </div>
    </div>
  );
}

/** A thin meter bar that fills to `value` (0..1) in phosphor. */
function Meter({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-carbon-600">
      <div
        className="h-full rounded-full bg-gradient-to-r from-phosphor-600 to-phosphor-300"
        style={{ width: `${Math.max(2, Math.min(100, value * 100))}%` }}
      />
    </div>
  );
}

/**
 * The bottom instrument strip. A row of derived measurements drawn from the
 * shared rAF clock, a live phase meter, and a sweeping bar — the readouts that
 * make the field feel like a signal under observation.
 */
export function ScopeDeck({ sample }: { sample: SignalSample }) {
  return (
    <div className="rounded-md border border-hairline/80 bg-carbon-900/80 backdrop-blur-md">
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-[auto_auto_auto_1fr]">
        <Cell
          icon={<Waves className="h-4 w-4" strokeWidth={1.6} />}
          label="amplitude"
          value={(0.5 + 0.42 * Math.sin(sample.t * 1.3)).toFixed(3)}
          unit="rms"
        />
        <Cell
          icon={<Gauge className="h-4 w-4" strokeWidth={1.6} />}
          label="sweep rate"
          value={(sample.freq * 24 + 4).toFixed(2)}
          unit="Hz"
        />
        <Cell
          icon={<Layers className="h-4 w-4" strokeWidth={1.6} />}
          label="octaves"
          value="3"
          unit="cos"
        />

        <div className="flex min-w-[180px] flex-col justify-center gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-wider2 text-dim">
              phase lock
            </span>
            <span className="font-mono text-[11px] tabular-nums text-phosphor-300">
              {(sample.phase * 100).toFixed(0)}%
            </span>
          </div>
          <Meter value={sample.phase} />
        </div>
      </div>

      {/* Sweep line: a phosphor head tracking left→right across the deck base. */}
      <div className="relative h-[3px] overflow-hidden rounded-b-md bg-carbon-700">
        <div
          className={cn(
            "absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-phosphor-400 to-transparent",
            "animate-sweep",
          )}
        />
      </div>
    </div>
  );
}
