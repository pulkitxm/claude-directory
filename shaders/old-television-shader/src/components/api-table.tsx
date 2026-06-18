import { cn } from "@/lib/utils";

export interface PropRow {
  name: string;
  type: string;
  def: string;
  note: string;
}

export const PROP_ROWS: PropRow[] = [
  { name: "colorA", type: "string", def: '"#ffffff"', note: "Bright phosphor the snow mixes toward" },
  { name: "colorB", type: "string", def: '"#000000"', note: "Dark colour between scanlines" },
  { name: "waveIntensity", type: "number", def: "1", note: "Rolling-picture displacement amplitude" },
  { name: "grainIntensity", type: "number", def: "1", note: "Procedural snow / static strength" },
  { name: "brightnessPulse", type: "number", def: "1", note: "Slow brightness-breathing depth" },
  { name: "mouseInfluence", type: "number", def: "0.05", note: "Cursor → uMouse lerp factor (0–1)" },
  { name: "paused", type: "boolean", def: "false", note: "Freeze the animation clock on a held frame" },
  { name: "onSample", type: "(lum: number) => void", def: "—", note: "Per-frame centre-pixel luminance off the GPU" },
  { name: "sampleEveryMs", type: "number", def: "120", note: "Throttle for onSample, in ms" },
];

export function ApiTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="panel overflow-hidden rounded-md">
      <div className="grid grid-cols-[1.2fr_1.3fr_0.7fr_2fr] gap-3 border-b border-cabinet-700/70 bg-cabinet-950/50 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-bone-200/55">
        <span>Prop</span>
        <span className="hidden sm:block">Type</span>
        <span>Default</span>
        <span className="hidden md:block">Description</span>
      </div>
      <div className="divide-y divide-cabinet-800/70">
        {rows.map((r, i) => (
          <div
            key={r.name}
            className={cn(
              "grid grid-cols-[1.2fr_1.3fr_0.7fr_2fr] gap-3 px-4 py-2.5 text-[12px]",
              i % 2 === 1 && "bg-cabinet-950/30",
            )}
          >
            <code className="font-mono text-phosphor-200">{r.name}</code>
            <code className="hidden font-mono text-[11px] text-signal-cyan/80 sm:block">
              {r.type}
            </code>
            <code className="font-mono text-[11px] text-bone-200/80">{r.def}</code>
            <span className="hidden font-sans text-[11px] text-bone-200/70 md:block">
              {r.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
