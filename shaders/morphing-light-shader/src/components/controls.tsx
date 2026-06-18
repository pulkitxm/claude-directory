import type { FringeState } from "@/lib/presets";

interface FaderProps {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}

function Fader({ label, unit, value, min, max, step, onChange }: FaderProps) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider2 text-muted">
          {label}
        </span>
        <span className="font-mono text-[11px] tabular-nums text-chalk/90">
          {value.toFixed(step < 1 ? 2 : 0)}
          <span className="ml-1 text-muted/70">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        className="fader"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
        aria-label={label}
      />
    </label>
  );
}

interface ControlsProps {
  state: FringeState;
  onChange: (key: keyof FringeState, value: number) => void;
}

/** The fader bank — promotes the shader's baked constants to live uniforms. */
export function Controls({ state, onChange }: ControlsProps) {
  return (
    <div className="space-y-4">
      <p className="font-mono text-[10px] uppercase tracking-wider2 text-cyan/80">
        Beam&nbsp;controls
      </p>
      <Fader label="Sweep rate" unit="×" value={state.speed} min={0} max={6} step={0.1} onChange={(v) => onChange("speed", v)} />
      <Fader label="Inner fringes" unit="λ" value={state.innerBands} min={1} max={16} step={0.5} onChange={(v) => onChange("innerBands", v)} />
      <Fader label="Outer fringes" unit="λ" value={state.outerBands} min={2} max={24} step={0.5} onChange={(v) => onChange("outerBands", v)} />
      <Fader label="Hue shift" unit="°" value={state.hueShift} min={0} max={360} step={1} onChange={(v) => onChange("hueShift", v)} />
    </div>
  );
}
