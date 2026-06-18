import { useId } from "react";

interface FaderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  /** Decimal places to show in the readout. */
  precision?: number;
  onChange: (v: number) => void;
}

/**
 * A single calibration fader: engraved label + live numeric readout above a
 * reskinned native range input. The track fill is driven by a --fill CSS var
 * computed from the value so the groove reads as a precision instrument trim.
 */
export function Fader({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  precision = 2,
  onChange,
}: FaderProps) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="group">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label
          htmlFor={id}
          className="font-mono text-[10px] uppercase tracking-wide2 text-dust transition-colors group-hover:text-beam-200"
        >
          {label}
        </label>
        <span className="font-mono text-[11px] tabular-nums text-chalk">
          {value.toFixed(precision)}
          {unit && <span className="ml-0.5 text-dust">{unit}</span>}
        </span>
      </div>
      <input
        id={id}
        type="range"
        className="beam-fader"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ ["--fill" as string]: `${pct}%` }}
        aria-label={label}
      />
    </div>
  );
}
