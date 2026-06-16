/** ASCII rule. `glyph` controls the texture: ─ ═ // etc. */
export function Divider({
	glyph = "─",
	label,
	className = "",
}: {
	glyph?: string;
	label?: string;
	className?: string;
}) {
	if (label) {
		return (
			<div
				className={`flex items-center gap-2 text-2xs tracking-[0.18em] text-dim uppercase select-none ${className}`}
				aria-hidden
			>
				<span className="text-secondary">//</span>
				<span className="text-dim">{label}</span>
				<span className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-muted/60">
					{glyph.repeat(200)}
				</span>
			</div>
		);
	}
	return (
		<div
			aria-hidden
			className={`overflow-hidden whitespace-nowrap text-muted/60 select-none ${className}`}
		>
			{glyph.repeat(400)}
		</div>
	);
}
