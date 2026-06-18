interface BearingTapeProps {
	/** current bearing the tape is centered on, 0–359 */
	bearing: number;
	locked: boolean;
}

const CARDINALS: Record<number, string> = {
	0: "N",
	45: "NE",
	90: "E",
	135: "SE",
	180: "S",
	225: "SW",
	270: "W",
	315: "NW",
};

/** A scrolling compass strip pinned under the top notch. */
export function BearingTape({ bearing, locked }: BearingTapeProps) {
	// Show a ±40° window around the current bearing.
	const span = 40;
	const ticks: { deg: number; major: boolean; label?: string }[] = [];
	for (let d = -span; d <= span; d += 5) {
		const raw = ((Math.round(bearing) + d) % 360 + 360) % 360;
		const major = raw % 45 === 0;
		ticks.push({ deg: d, major, label: major ? CARDINALS[raw] : undefined });
	}

	return (
		<div
			className="relative h-9 overflow-hidden select-none"
			style={{
				maskImage: "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
				WebkitMaskImage:
					"linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
			}}
			aria-hidden
		>
			{ticks.map((t) => {
				const pct = 50 + (t.deg / (span * 2)) * 100;
				return (
					<div
						key={t.deg}
						className="absolute top-0 flex flex-col items-center"
						style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
					>
						<div
							style={{
								width: 1,
								height: t.major ? 12 : 6,
								background: t.major ? "var(--phosphor)" : "var(--phosphor-dim)",
								opacity: t.major ? 0.9 : 0.5,
							}}
						/>
						{t.label && (
							<span
								className="mt-0.5 text-[9px] tracking-[0.18em]"
								style={{ color: "var(--phosphor-dim)", fontFamily: "var(--display)" }}
							>
								{t.label}
							</span>
						)}
					</div>
				);
			})}
			{/* center index */}
			<div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center">
				<div
					style={{
						width: 0,
						height: 0,
						borderLeft: "4px solid transparent",
						borderRight: "4px solid transparent",
						borderTop: `6px solid ${locked ? "var(--lock)" : "var(--cyan)"}`,
					}}
				/>
				<div
					className="mt-px text-[10px] font-bold tnum tracking-tight"
					style={{ color: locked ? "var(--lock)" : "var(--phosphor)" }}
				>
					{String(Math.round(bearing)).padStart(3, "0")}
				</div>
			</div>
		</div>
	);
}
