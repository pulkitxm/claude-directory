import { Activity, Gauge, Thermometer } from "lucide-react";
import type { Telemetry } from "@/lib/use-telemetry";
import { cn } from "@/lib/utils";

interface TelemetryHudProps {
  telemetry: Telemetry;
  className?: string;
}

/**
 * Floating readout for the imaging bay. Reads the page's live rAF clock + frame
 * rate, plus a flavour "core temperature" derived from the clock so the panel
 * breathes like a real thermographic instrument. The seconds readout (e.g.
 * `12.3s`) is what the headless verifier watches to confirm the bay is live.
 */
export function TelemetryHud({ telemetry, className }: TelemetryHudProps) {
  const { clock, fps, frames } = telemetry;
  // Pure cosmetic: a slow oscillation around a warm baseline.
  const coreTemp = 36.4 + Math.sin(clock * 0.6) * 4.2 + (fps > 0 ? 0 : 0);

  return (
    <div
      className={cn(
        "pointer-events-none select-none rounded-lg border border-line/80 bg-panel/80 px-3 py-2 font-mono text-[11px] leading-tight text-mist backdrop-blur-sm",
        className,
      )}
      role="status"
      aria-label="imaging bay telemetry"
    >
      <div className="mb-1.5 flex items-center gap-1.5 text-cyan">
        <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-cyan" />
        <span className="tracking-[0.18em] text-cyan/90">SENSOR ONLINE</span>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 tabular-nums">
        <dt className="flex items-center gap-1 text-mist/70">
          <Activity className="h-3 w-3" /> CLOCK
        </dt>
        <dd className="text-right text-cream">{clock.toFixed(1)}s</dd>

        <dt className="flex items-center gap-1 text-mist/70">
          <Gauge className="h-3 w-3" /> RATE
        </dt>
        <dd className="text-right text-cream">{fps} fps</dd>

        <dt className="flex items-center gap-1 text-mist/70">
          <Thermometer className="h-3 w-3" /> CORE
        </dt>
        <dd className="text-right text-amber">{coreTemp.toFixed(1)}°C</dd>

        <dt className="text-mist/70">FRAMES</dt>
        <dd className="text-right text-mist">{frames.toLocaleString()}</dd>
      </dl>
    </div>
  );
}
