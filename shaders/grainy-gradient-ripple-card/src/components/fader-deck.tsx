import { FADERS, type FieldParams } from "@/lib/field";

interface FaderDeckProps {
  values: FieldParams;
  onChange: (key: keyof FieldParams, value: number) => void;
}

/**
 * The field-control deck — one fader per baked shader constant. Moving a fader
 * mutates the live shader uniform through the component's imperative ref (see
 * App), so the gradient retunes in real time.
 */
export function FaderDeck({ values, onChange }: FaderDeckProps) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-mono text-[10px] uppercase tracking-wide2 text-ink-500">
          Field Controls
        </h2>
        <span className="font-mono text-[9px] uppercase tracking-wide2 text-ink-400">
          live uniforms
        </span>
      </div>

      <div className="space-y-3.5">
        {FADERS.map((f) => {
          const value = values[f.key];
          const pct = ((value - f.min) / (f.max - f.min)) * 100;
          return (
            <div key={f.key}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <label
                  htmlFor={`fader-${f.key}`}
                  className="font-sans text-[12px] font-medium text-ink-700"
                >
                  {f.label}
                  <span className="ml-1.5 font-mono text-[9px] font-normal uppercase tracking-wide text-ink-400">
                    {f.hint}
                  </span>
                </label>
                <span className="tabular font-mono text-[11px] text-ink-600">
                  {value.toFixed(2)}
                </span>
              </div>
              <input
                id={`fader-${f.key}`}
                type="range"
                className="fader"
                min={f.min}
                max={f.max}
                step={f.step}
                value={value}
                aria-label={`${f.label} — ${f.hint}`}
                onChange={(e) => onChange(f.key, parseFloat(e.target.value))}
                style={{
                  background: `linear-gradient(to right, #2b261e ${pct}%, #ccc0a9 ${pct}%)`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
