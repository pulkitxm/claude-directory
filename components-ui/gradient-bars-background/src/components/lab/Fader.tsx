import { cn } from "@/lib/utils";

interface FaderProps {
	label: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	unit?: string;
	onChange: (v: number) => void;
}

/**
 * A vertical-feeling lab fader rendered as a styled range input. The thumb and
 * fill track use the flame accent so the deck reads like an audio mixer — fitting
 * for an equalizer-shaped background.
 */
export function Fader({
	label,
	value,
	min,
	max,
	step = 1,
	unit = "",
	onChange,
}: FaderProps) {
	const pct = ((value - min) / (max - min)) * 100;
	return (
		<label className="block select-none">
			<div className="flex items-baseline justify-between">
				<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog-400">
					{label}
				</span>
				<span className="font-mono text-xs font-medium text-fog-200 tabular-nums">
					{value}
					{unit}
				</span>
			</div>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="lab-fader mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full"
				style={{
					background: `linear-gradient(to right, var(--color-flame) 0%, var(--color-flame-soft) ${pct}%, var(--color-ink-700) ${pct}%, var(--color-ink-700) 100%)`,
				}}
			/>
		</label>
	);
}

interface SwatchRowProps {
	colors: { hex: string; name: string }[];
	active: string;
	onPick: (hex: string) => void;
	className?: string;
}

/** A row of preset colour swatches; the active one gets a flame ring. */
export function SwatchRow({ colors, active, onPick, className }: SwatchRowProps) {
	return (
		<div className={cn("grid grid-cols-6 gap-2", className)}>
			{colors.map((c) => (
				<button
					key={c.hex}
					type="button"
					onClick={() => onPick(c.hex)}
					title={c.name}
					aria-label={`Set bar colour to ${c.name}`}
					className={cn(
						"aspect-square rounded-md border transition-transform duration-150 hover:scale-110",
						active.toLowerCase() === c.hex.toLowerCase()
							? "border-white/80 ring-2 ring-flame/70 ring-offset-2 ring-offset-ink-900"
							: "border-white/10",
					)}
					style={{ background: c.hex }}
				/>
			))}
		</div>
	);
}
