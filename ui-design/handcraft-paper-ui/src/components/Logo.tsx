/* Scribbly wordmark — a hand-drawn pencil squiggle that "writes" the dot of the
   i as a red correction mark. Kept as an inline SVG so it inherits ink color. */
export function Logo({ className }: { className?: string }) {
	return (
		<span className={"inline-flex items-center gap-2 " + (className ?? "")}>
			<svg
				viewBox="0 0 38 38"
				className="h-9 w-9 shrink-0"
				aria-hidden
			>
				<rect
					x="2"
					y="2"
					width="34"
					height="34"
					rx="9"
					fill="#fff9c4"
					stroke="#2d2d2d"
					strokeWidth="2.5"
				/>
				<path
					d="M9 26 Q14 9 19 19 T29 14"
					fill="none"
					stroke="#2d2d2d"
					strokeWidth="3"
					strokeLinecap="round"
				/>
				<circle cx="29" cy="13" r="2.8" fill="#ff4d4d" stroke="#2d2d2d" strokeWidth="1.6" />
			</svg>
			<span className="font-[var(--font-marker)] text-2xl font-bold leading-none text-ink">
				Scribbly
			</span>
		</span>
	);
}
