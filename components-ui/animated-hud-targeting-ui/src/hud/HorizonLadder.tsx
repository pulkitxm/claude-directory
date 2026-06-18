interface HorizonLadderProps {
	/** virtual roll in degrees, drifts for a "live" feel */
	roll: number;
	/** pitch offset in degrees */
	pitch: number;
}

/** A pitch/roll ladder centered on the reticle — the canopy-HUD signature. */
export function HorizonLadder({ roll, pitch }: HorizonLadderProps) {
	const rungs = [-20, -10, 10, 20];
	return (
		<svg
			viewBox="0 0 400 400"
			className="absolute inset-0 w-full h-full"
			style={{ opacity: 0.5 }}
			aria-hidden
		>
			<g transform={`rotate(${roll} 200 200)`}>
				{/* boresight wings */}
				<g stroke="var(--phosphor)" strokeWidth="1.2" fill="none" opacity="0.85">
					<path d="M120 200 H168 l8 8" />
					<path d="M280 200 H232 l-8 8" />
				</g>
				{rungs.map((deg) => {
					const y = 200 - deg * 4 - pitch * 4;
					const neg = deg < 0;
					return (
						<g key={deg} stroke="var(--phosphor-dim)" strokeWidth="1" opacity="0.55">
							{neg ? (
								<>
									<line x1="150" y1={y} x2="170" y2={y} strokeDasharray="4 4" />
									<line x1="230" y1={y} x2="250" y2={y} strokeDasharray="4 4" />
								</>
							) : (
								<>
									<line x1="150" y1={y} x2="172" y2={y} />
									<line x1="228" y1={y} x2="250" y2={y} />
								</>
							)}
							<text
								x="138"
								y={y + 3}
								fontSize="9"
								fill="var(--phosphor-dim)"
								textAnchor="end"
								style={{ fontFamily: "var(--mono)" }}
							>
								{Math.abs(deg)}
							</text>
						</g>
					);
				})}
			</g>
		</svg>
	);
}
