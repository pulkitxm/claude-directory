import { useId } from "react";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  decimals?: number;
  onChange: (v: number) => void;
}

/**
 * A thin monochrome fader. Promotes one of the GradientMesh shader's baked-in
 * constants to a live, labelled uniform control. The track fill is driven by a
 * CSS custom property so the webkit gradient stays in sync without JS layout.
 */
export function Slider({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  decimals = 2,
  onChange,
}: SliderProps) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div className="group">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label
          htmlFor={id}
          className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-haze"
        >
          {label}
        </label>
        <span className="tnum font-mono text-[11px] text-paper/85">
          {value.toFixed(decimals)}
          {unit && <span className="text-haze-dim">{unit}</span>}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
        aria-label={label}
      />
    </div>
  );
}
