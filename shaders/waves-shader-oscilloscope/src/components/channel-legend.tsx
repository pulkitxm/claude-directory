import { cn } from "@/lib/utils";
import type { SignalSample } from "@/lib/use-signal-clock";

interface Channel {
  id: string;
  label: string;
  /** Phase offset so each indicator pulses on its own cadence. */
  offset: number;
  tone: "phosphor" | "amber" | "dim";
}

const CHANNELS: Channel[] = [
  { id: "CH·1", label: "ring 10×", offset: 0.0, tone: "phosphor" },
  { id: "CH·2", label: "ring 20×", offset: 0.33, tone: "phosphor" },
  { id: "WRP", label: "coswarp", offset: 0.66, tone: "amber" },
  { id: "REF", label: "carrier", offset: 0.5, tone: "dim" },
];

const dot: Record<Channel["tone"], string> = {
  phosphor: "bg-phosphor-400",
  amber: "bg-amber-400",
  dim: "bg-dim",
};

/**
 * The channel legend — labels the field's component bands as if they were
 * oscilloscope inputs, with a per-channel activity indicator whose brightness
 * tracks the shared clock so the strip breathes with the live trace.
 */
export function ChannelLegend({ sample }: { sample: SignalSample }) {
  return (
    <div className="w-[150px] rounded-md border border-hairline/80 bg-carbon-900/80 p-3 backdrop-blur-md">
      <div className="mb-2.5 text-[10px] uppercase tracking-wider2 text-chalk/80">
        Channels
      </div>
      <div className="space-y-2.5">
        {CHANNELS.map((ch) => {
          // 0..1 activity per channel from the rAF clock.
          const act = 0.5 + 0.5 * Math.sin((sample.t + ch.offset * 6.28) * 1.7);
          return (
            <div key={ch.id} className="flex items-center gap-2.5">
              <span
                className={cn("h-2 w-2 rounded-full", dot[ch.tone])}
                style={{ opacity: 0.35 + act * 0.65 }}
              />
              <div className="flex-1 leading-none">
                <div className="font-mono text-[11px] text-chalk">{ch.id}</div>
                <div className="mt-0.5 text-[9px] uppercase tracking-wider2 text-dim">
                  {ch.label}
                </div>
              </div>
              {/* A 5-segment level meter per channel. */}
              <div className="flex gap-[2px]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-3 w-[3px] rounded-sm",
                      i / 5 < act ? dot[ch.tone] : "bg-carbon-600",
                    )}
                    style={{ opacity: i / 5 < act ? 0.5 + act * 0.5 : 1 }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
