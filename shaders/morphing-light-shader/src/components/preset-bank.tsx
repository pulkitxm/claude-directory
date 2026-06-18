import { PRESETS, type FringePreset } from "@/lib/presets";

interface PresetBankProps {
  activeId: string | null;
  onSelect: (p: FringePreset) => void;
}

/** Patch bank — recalls a stored emission line into the interferometer. */
export function PresetBank({ activeId, onSelect }: PresetBankProps) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-wider2 text-cyan/80">
        Source&nbsp;bank
      </p>
      <div className="grid grid-cols-1 gap-1.5">
        {PRESETS.map((p) => {
          const active = p.id === activeId;
          const [r, g, b] = p.state.colorA;
          const [r2, g2, b2] = p.state.colorB;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              className={[
                "group flex items-center gap-3 rounded-[5px] border px-3 py-2 text-left transition-colors",
                active
                  ? "border-laser/50 bg-laser/10"
                  : "border-hairline/70 bg-bench-700/40 hover:border-cyan/40 hover:bg-bench-600/50",
              ].join(" ")}
            >
              <span
                className="h-6 w-1.5 flex-shrink-0 rounded-full"
                style={{
                  background: `linear-gradient(180deg, rgb(${r * 255},${g * 255},${b * 255}), rgb(${r2 * 255},${g2 * 255},${b2 * 255}))`,
                }}
              />
              <span className="min-w-0">
                <span
                  className={[
                    "block font-display text-[13px] font-medium leading-tight",
                    active ? "text-chalk" : "text-chalk/85",
                  ].join(" ")}
                >
                  {p.name}
                </span>
                <span className="block truncate font-mono text-[10px] text-muted">
                  {p.note}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
