type Tone = "primary" | "secondary" | "error";

const toneText: Record<Tone, string> = {
	primary: "text-primary glow",
	secondary: "text-secondary glow-amber",
	error: "text-error glow-error",
};

/**
 * Raw-data visualisation: a fixed-width character meter `[|||||||.....]`.
 * No SVG, no charts — just monospaced glyphs, which is the whole point.
 * `value` is 0–100. Tone auto-escalates (warn/err) unless overridden.
 */
export function AsciiBar({
	label,
	value,
	cells = 24,
	unit = "%",
	tone,
}: {
	label: string;
	value: number;
	cells?: number;
	unit?: string;
	tone?: Tone;
}) {
	const v = Math.max(0, Math.min(100, value));
	const filled = Math.round((v / 100) * cells);
	const auto: Tone = v >= 90 ? "error" : v >= 75 ? "secondary" : "primary";
	const t = tone ?? auto;

	return (
		<div className="flex flex-col gap-0.5">
			<div className="flex items-baseline justify-between text-2xs tracking-[0.12em] text-dim uppercase">
				<span>{label}</span>
				<span className={`tabular-nums ${toneText[t]}`}>
					{v.toFixed(0)}
					{unit}
				</span>
			</div>
			<div
				role="meter"
				aria-label={label}
				aria-valuenow={Math.round(v)}
				aria-valuemin={0}
				aria-valuemax={100}
				className="flex items-center text-sm leading-none"
			>
				<span aria-hidden className="text-dim">
					[
				</span>
				<span aria-hidden className={`tracking-tighter ${toneText[t]}`}>
					{"|".repeat(filled)}
				</span>
				<span aria-hidden className="tracking-tighter text-muted/70">
					{".".repeat(cells - filled)}
				</span>
				<span aria-hidden className="text-dim">
					]
				</span>
			</div>
		</div>
	);
}
