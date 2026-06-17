/* The Lumi wordmark — an organic squircle holding a soft "drop" glyph, in the
   seed purple. Mirrors the favicon. Decorative SVG -> aria-hidden, with the
   accessible name carried by the adjacent text. */
export function Logo({ className = "" }: { className?: string }) {
	return (
		<span className={`inline-flex items-center gap-2.5 ${className}`}>
			<svg
				width="32"
				height="32"
				viewBox="0 0 32 32"
				aria-hidden
				className="shrink-0"
			>
				<rect width="32" height="32" rx="9" fill="var(--color-md-primary)" />
				<path
					fill="var(--color-md-primary-container)"
					d="M16 6c4.5 0 7 2.6 7 6.4 0 2.7-1.6 4.3-4 5.4-1.7.8-2.6 1.4-2.6 2.9 0 .3 0 .7.1 1.1H13c-.1-.5-.2-1-.2-1.6 0-2.2 1.3-3.4 3.2-4.3 1.7-.8 2.4-1.5 2.4-2.9 0-1.6-1.1-2.6-3-2.6-1.7 0-3 .9-3.5 2.6L9 11.9C9.9 8.4 12.5 6 16 6Z"
				/>
				<circle cx="14.4" cy="25.6" r="2" fill="var(--color-md-tertiary)" />
			</svg>
			<span className="text-[1.35rem] font-medium tracking-tight text-[var(--color-md-on-bg)]">
				Lumi
			</span>
		</span>
	);
}
