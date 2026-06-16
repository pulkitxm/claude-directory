import { display } from "./primitives";

/* The Claymakers brand mark: a small convex clay orb (the system's hero shape)
   beside the wordmark. The orb is a real gradient sphere with a specular
   highlight, echoing the design language at favicon scale. */
export function Logo({ className = "" }: { className?: string }) {
	return (
		<a
			href="#top"
			aria-label="Claymakers — home"
			className={`group inline-flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-4 focus-visible:ring-clay-accent/35 ${className}`}
		>
			<span className="relative grid h-9 w-9 place-items-center">
				<svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
					<defs>
						<radialGradient id="logo-orb" cx="34%" cy="28%" r="82%">
							<stop offset="0%" stopColor="#C4B5FD" />
							<stop offset="55%" stopColor="#A78BFA" />
							<stop offset="100%" stopColor="#7C3AED" />
						</radialGradient>
					</defs>
					<circle cx="20" cy="21" r="14" fill="#CDC6D9" opacity="0.5" />
					<circle
						cx="20"
						cy="20"
						r="14"
						fill="url(#logo-orb)"
						className="origin-center transition-transform duration-300 group-hover:scale-110"
					/>
					<ellipse cx="15" cy="14.5" rx="4.4" ry="3" fill="#fff" opacity="0.55" />
				</svg>
			</span>
			<span
				style={display}
				className="text-xl font-extrabold tracking-tight text-clay-foreground"
			>
				Claymakers
			</span>
		</a>
	);
}
