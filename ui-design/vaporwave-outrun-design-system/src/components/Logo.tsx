/* The NEONWAVE OS wordmark: a small sun-over-grid glyph beside an Orbitron
   wordmark with a magenta-to-cyan gradient. Used in the nav and footer. */
export function Logo({ className = "" }: { className?: string }) {
	return (
		<a
			href="#top"
			className={`group inline-flex items-center gap-3 ${className}`}
			aria-label="NEONWAVE OS — home"
		>
			<svg
				viewBox="0 0 32 32"
				className="h-8 w-8 shrink-0 transition-transform duration-200 ease-linear group-hover:rotate-12"
				aria-hidden
			>
				<defs>
					<linearGradient id="logo-sun" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0" stopColor="#FF9900" />
						<stop offset="1" stopColor="#FF00FF" />
					</linearGradient>
					<clipPath id="logo-clip">
						<rect x="0" y="0" width="32" height="20" />
					</clipPath>
				</defs>
				<g clipPath="url(#logo-clip)">
					<circle cx="16" cy="16" r="9" fill="url(#logo-sun)" />
					<rect x="0" y="11" width="32" height="1.4" fill="#090014" />
					<rect x="0" y="14" width="32" height="1.6" fill="#090014" />
					<rect x="0" y="17.5" width="32" height="2" fill="#090014" />
				</g>
				<g stroke="#00FFFF" strokeWidth="0.8">
					<line x1="0" y1="22" x2="32" y2="22" />
					<line x1="0" y1="26" x2="32" y2="26" />
					<line x1="0" y1="31" x2="32" y2="31" />
					<line x1="16" y1="20" x2="16" y2="32" />
					<line x1="16" y1="20" x2="2" y2="32" />
					<line x1="16" y1="20" x2="30" y2="32" />
				</g>
			</svg>
			<span className="font-heading text-lg font-black uppercase tracking-[0.15em]">
				<span className="bg-gradient-to-r from-[var(--color-magenta)] to-[var(--color-cyan)] bg-clip-text text-transparent">
					NEONWAVE
				</span>
				<span className="text-[var(--color-chrome)]/60"> OS</span>
			</span>
		</a>
	);
}
