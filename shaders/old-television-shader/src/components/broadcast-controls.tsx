import { cn } from "@/lib/utils";

/* ── A single broadcast fader, wired to one shader uniform ──────────────────*/
export function Fader({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="block select-none">
      <div className="flex items-baseline justify-between">
        <span className="etched font-mono text-[10px] uppercase tracking-[0.2em] text-bone-200/80">
          {label}
        </span>
        <span className="phosphor-text font-mono text-[11px] tabular-nums">
          {value.toFixed(2)}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="fader mt-2 w-full"
        style={{ ["--fill" as string]: `${fill}%` }}
        aria-label={label}
      />
    </label>
  );
}

/* ── A tactile toggle switch (e.g. the picture-tube power / hold) ───────────*/
export function ToggleSwitch({
  on,
  onToggle,
  labelOn,
  labelOff,
}: {
  on: boolean;
  onToggle: () => void;
  labelOn: string;
  labelOff: string;
}) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={on}
      className="group flex items-center gap-3 select-none"
    >
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
          on
            ? "border-phosphor-400/60 bg-phosphor-500/25"
            : "border-cabinet-700 bg-cabinet-800",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full transition-all",
            on
              ? "left-[22px] bg-phosphor-300 shadow-[0_0_10px_2px_rgba(38,240,106,0.7)]"
              : "left-0.5 bg-bone-300",
          )}
        />
      </span>
      <span
        className={cn(
          "font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
          on ? "text-phosphor-200" : "text-bone-200/60",
        )}
      >
        {on ? labelOn : labelOff}
      </span>
    </button>
  );
}

/* ── A read-only color swatch + hex chip for the mix endpoints ─────────────*/
export function ColorChip({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="h-7 w-7 shrink-0 rounded-sm border border-cabinet-700"
        style={{
          background: value,
          boxShadow: `0 0 12px -2px ${value}`,
        }}
        aria-hidden
      />
      <div className="leading-tight">
        <p className="etched font-mono text-[9px] uppercase tracking-[0.2em] text-bone-200/60">
          {label}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-bone-100">
          {value}
        </p>
      </div>
    </div>
  );
}
