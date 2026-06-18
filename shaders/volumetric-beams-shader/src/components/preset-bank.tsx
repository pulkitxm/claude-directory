import { Radio } from "lucide-react";
import { PRESETS, rgbToCss, type Preset } from "@/lib/presets";

interface PresetBankProps {
  activeId: string;
  onSelect: (preset: Preset) => void;
}

export function PresetBank({ activeId, onSelect }: PresetBankProps) {
  return (
    <div className="rounded-xl border border-hairline bg-ink-800/70 p-5 backdrop-blur-sm sm:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <Radio className="h-4 w-4 text-beam-400" />
        <h3 className="font-display text-sm font-bold uppercase tracking-wide2 text-chalk">
          Beacon Bank
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {PRESETS.map((preset) => {
          const active = preset.id === activeId;
          return (
            <button
              key={preset.id}
              onClick={() => onSelect(preset)}
              className={[
                "group relative flex items-center gap-3.5 rounded-lg border px-3.5 py-3 text-left transition-all",
                active
                  ? "border-beam-500/70 bg-beam-500/10 glow-beam"
                  : "border-hairline bg-ink-700/40 hover:border-beam-500/40 hover:bg-ink-700/70",
              ].join(" ")}
            >
              {/* Twin-tone swatch reading the preset's light core + tint. */}
              <span
                className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md ring-1 ring-white/10"
                style={{
                  background: `radial-gradient(circle at 35% 30%, ${rgbToCss(
                    preset.params.lightColor,
                  )}, ${rgbToCss(preset.params.tint, 0.85)} 70%, #04050a 100%)`,
                }}
                aria-hidden
              >
                <span className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent,transparent_3px,rgba(255,255,255,0.14)_4px)] opacity-70" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      "font-display text-[13px] font-semibold",
                      active ? "text-chalk" : "text-chalk/85",
                    ].join(" ")}
                  >
                    {preset.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wide2 text-dust">
                    {preset.code}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-[11px] leading-snug text-dust">
                  {preset.blurb}
                </p>
              </div>

              <span
                className={[
                  "font-mono text-[9px] uppercase tracking-wide2 transition-opacity",
                  active ? "text-beam-300 opacity-100" : "text-dust opacity-0 group-hover:opacity-60",
                ].join(" ")}
              >
                {active ? "● live" : "load"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
