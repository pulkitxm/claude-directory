/* Flat geometric wordmark — the brand built from the same primitives the design
   system preaches: a square, a circle, a bar. No gradient, no shadow. */
export function Logo({
	className = "",
	onDark = false,
}: {
	className?: string;
	onDark?: boolean;
}) {
	return (
		<span className={`inline-flex items-center gap-2.5 ${className}`}>
			<span aria-hidden className="relative block h-7 w-7 shrink-0">
				<span className="absolute left-0 top-0 h-3 w-3 rounded-[3px] bg-[var(--color-brand)]" />
				<span className="absolute right-0 top-0.5 h-3.5 w-3.5 rounded-full bg-[var(--color-sun)]" />
				<span className="absolute bottom-0 left-0 h-3 w-7 rounded-[3px] bg-[var(--color-grass)]" />
			</span>
			<span
				className={`text-xl font-extrabold tracking-tight ${
					onDark ? "text-white" : "text-[var(--color-ink)]"
				}`}
			>
				Flatline
			</span>
		</span>
	);
}
