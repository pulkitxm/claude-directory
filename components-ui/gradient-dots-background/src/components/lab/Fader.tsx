import { cn } from "@/lib/utils";

type FaderProps = {
	label: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	unit?: string;
	uniform?: string;
	onChange: (value: number) => void;
	format?: (value: number) => string;
};

/**
 * A labeled range input styled as an aluminium instrument fader. Each fader
 * is wired straight to one of GradientDots' real props so the control deck
 * drives the live component.
 */
export function Fader({
	label,
	value,
	min,
	max,
	step = 1,
	unit,
	uniform,
	onChange,
	format,
}: FaderProps) {
	const pct = ((value - min) / (max - min)) * 100;
	const display = format ? format(value) : `${value}${unit ?? ""}`;

	return (
		<label className="group block select-none">
			<div className="mb-2 flex items-baseline justify-between gap-3">
				<span className="font-display text-[0.7rem] font-600 uppercase tracking-[0.18em] text-fog-300">
					{label}
				</span>
				<span className="font-mono text-xs tabular-nums text-accent">
					{display}
				</span>
			</div>
			<div className="relative flex h-5 items-center">
				{/* track */}
				<div className="absolute inset-x-0 h-[3px] rounded-full bg-ink-700" />
				{/* fill */}
				<div
					className="absolute h-[3px] rounded-full bg-gradient-to-r from-accent-dim to-accent"
					style={{ width: `${pct}%` }}
				/>
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={(e) => onChange(Number(e.target.value))}
					aria-label={label}
					className={cn(
						"relative z-10 h-5 w-full cursor-pointer appearance-none bg-transparent",
						"[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-accent [&::-webkit-slider-thumb]:bg-ink-900 [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(125,249,255,0.5)] [&::-webkit-slider-thumb]:transition-transform group-hover:[&::-webkit-slider-thumb]:scale-110",
						"[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-accent [&::-moz-range-thumb]:bg-ink-900",
					)}
				/>
			</div>
			{uniform && (
				<div className="mt-1.5 font-mono text-[0.62rem] lowercase tracking-wide text-fog-400/70">
					{uniform}
				</div>
			)}
		</label>
	);
}
