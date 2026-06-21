type BackgroundNumberProps = {
	children: string;
	/** Position/size/color overrides — each call places its own giant numeral. */
	className?: string;
};

/**
 * A massive, purely-decorative numeral used as a graphic shape in the depth
 * layer. Centralising it guarantees every instance is `aria-hidden`, non-
 * interactive, and unselectable — so a stray copy can't leak into the
 * accessibility tree or hijack a pointer. Callers pass position/size/color via
 * `className` (e.g. `text-[34vw] text-muted/50 absolute -left-[3vw] bottom-0`).
 */
export function BackgroundNumber({
	children,
	className = "",
}: BackgroundNumberProps) {
	return (
		<span
			aria-hidden="true"
			className={`pointer-events-none select-none font-bold tracking-tighter ${className}`}
		>
			{children}
		</span>
	);
}
