import { PRESETS, type FieldPreset } from "@/lib/field";

interface PresetBankProps {
  activeCode: string | null;
  onSelect: (preset: FieldPreset) => void;
}

/** Named regimes that snap the entire field to a stored set of uniforms. */
export function PresetBank({ activeCode, onSelect }: PresetBankProps) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-mono text-[10px] uppercase tracking-wide2 text-ink-500">
          Patch Bank
        </h2>
        <span className="font-mono text-[9px] uppercase tracking-wide2 text-ink-400">
          {activeCode ?? "custom"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-1.5">
        {PRESETS.map((p) => {
          const active = p.code === activeCode;
          return (
            <button
              key={p.code}
              type="button"
              onClick={() => onSelect(p)}
              aria-pressed={active}
              className={[
                "group flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-left transition-colors",
                active
                  ? "border-ink-700 bg-ink-800 text-bone-50"
                  : "border-line bg-bone-50/60 text-ink-700 hover:border-line-strong hover:bg-bone-50",
              ].join(" ")}
            >
              <span className="flex flex-col">
                <span className="font-display text-[15px] font-medium leading-none">
                  {p.name}
                </span>
                <span
                  className={[
                    "mt-1 font-sans text-[11px] leading-none",
                    active ? "text-bone-200/80" : "text-ink-400",
                  ].join(" ")}
                >
                  {p.blurb}
                </span>
              </span>
              <span
                className={[
                  "font-mono text-[9px] uppercase tracking-wide tabular",
                  active ? "text-bone-200/70" : "text-ink-400/80",
                ].join(" ")}
              >
                {p.code}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
