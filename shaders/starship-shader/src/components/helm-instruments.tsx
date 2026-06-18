import { cn } from "@/lib/utils";

/* Reticle bracket — drawn at each corner of the helm viewport so the live
   field reads as something framed by an instrument, not a stock background. */
export function Bracket({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M1 13 V1 H13" />
      <path d="M31 1 H43 V13" />
      <path d="M43 31 V43 H31" />
      <path d="M13 43 H1 V31" />
    </svg>
  );
}

/* Velocity ladder — the signature instrument. A vertical tape of tick marks
   with a travelling caret whose position rides the shader's own clock, so the
   needle is sampled from the GPU loop rather than a decorative CSS animation.
   `value` is 0..1 (caret position); `vel` is the formatted readout. */
export function VelocityLadder({
  value,
  vel,
  engaged,
}: {
  value: number;
  vel: string;
  engaged: boolean;
}) {
  const ticks = Array.from({ length: 21 });
  const caretTop = `${(1 - value) * 100}%`;
  return (
    <div className="relative flex h-full select-none items-stretch gap-2">
      {/* Tape */}
      <div className="relative w-9">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-hairline" />
        {ticks.map((_, i) => {
          const major = i % 5 === 0;
          return (
            <div
              key={i}
              className={cn(
                "absolute right-0 h-px",
                major ? "w-9 bg-phosphor-400/50" : "w-4 bg-hairline"
              )}
              style={{ top: `${(i / (ticks.length - 1)) * 100}%` }}
            />
          );
        })}
        {/* Travelling caret */}
        <div
          className="absolute -right-1 flex items-center gap-1 transition-[top] duration-150 ease-out"
          style={{ top: caretTop, transform: "translateY(-50%)" }}
        >
          <span
            className={cn(
              "h-2.5 w-2.5 rotate-45 border",
              engaged
                ? "border-caution-300 bg-caution-400/30 glow-caution"
                : "border-phosphor-300 bg-phosphor-400/30"
            )}
          />
        </div>
      </div>
      {/* Readout column */}
      <div className="flex flex-col justify-between py-0.5">
        <span className="eyebrow">VMAX</span>
        <div className="flex flex-1 items-center">
          <div className="flex flex-col">
            <span
              className={cn(
                "font-mono text-[1.35rem] leading-none",
                engaged ? "text-caution-300 glow-caution" : "text-phosphor-200 glow-phosphor"
              )}
            >
              {vel}
            </span>
            <span className="eyebrow mt-1">× C · VELOCITY</span>
          </div>
        </div>
        <span className="eyebrow">VMIN</span>
      </div>
    </div>
  );
}

/* A single labelled telemetry cell for the bottom strip. */
export function Readout({
  label,
  value,
  unit,
  tone = "phosphor",
  blink = false,
}: {
  label: string;
  value: string;
  unit?: string;
  tone?: "phosphor" | "caution" | "slate";
  blink?: boolean;
}) {
  const toneClass =
    tone === "caution"
      ? "text-caution-300 glow-caution"
      : tone === "slate"
        ? "text-slate"
        : "text-phosphor-200 glow-phosphor";
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="eyebrow truncate">{label}</span>
      <div className="flex items-baseline gap-1">
        <span
          className={cn(
            "font-mono text-sm tabular-nums leading-none",
            toneClass,
            blink && "animate-blink"
          )}
        >
          {value}
        </span>
        {unit && <span className="font-mono text-[0.6rem] text-faint">{unit}</span>}
      </div>
    </div>
  );
}

/* Fader — a labelled range input styled as an avionics trim control. */
export function Fader({
  label,
  value,
  min,
  max,
  step,
  display,
  caution = false,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  caution?: boolean;
  onChange: (v: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="eyebrow">{label}</span>
        <span
          className={cn(
            "font-mono text-xs tabular-nums",
            caution ? "text-caution-300" : "text-phosphor-200"
          )}
        >
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={cn("helm-fader", caution && "caution")}
        style={{ ["--fill" as string]: `${fill}%` }}
        aria-label={label}
      />
    </label>
  );
}
