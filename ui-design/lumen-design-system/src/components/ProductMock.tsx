import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

const NAV_ROWS = [
	{ label: "Overview", active: true },
	{ label: "Surfaces", active: false },
	{ label: "Motion", active: false },
	{ label: "Tokens", active: false },
	{ label: "Spotlights", active: false },
];

const METRICS = [
	{ label: "Render budget", value: "4.2ms", sub: "p95 frame" },
	{ label: "Bundle", value: "11.4kb", sub: "gzipped" },
	{ label: "A11y score", value: "100", sub: "axe-core" },
];

/**
 * An elevated "mock interface" surface that demonstrates the system's
 * background-elevated treatment, multi-layer shadow, inner highlight, and a
 * slow scan-line that reads like a live application warming up.
 */
export function ProductMock() {
	const reduced = usePrefersReducedMotion();

	return (
		<div className="edge-hi relative overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-elevated shadow-card-hover">
			{/* Window chrome */}
			<div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
				<span className="h-3 w-3 rounded-full bg-white/15" />
				<span className="h-3 w-3 rounded-full bg-white/15" />
				<span className="h-3 w-3 rounded-full bg-white/15" />
				<div className="ml-3 flex h-7 flex-1 items-center gap-2 rounded-lg border border-white/10 bg-bg-deep/60 px-3 font-mono text-[11px] text-fg-muted">
					<span className="text-accent">⌘</span> lumen.app/console
				</div>
				<span className="hidden font-mono text-[11px] text-fg-muted/60 sm:block">
					● live
				</span>
			</div>

			<div className="grid grid-cols-[180px_1fr] max-[640px]:grid-cols-1">
				{/* Sidebar */}
				<aside className="hidden flex-col gap-1 border-r border-white/[0.06] p-3 sm:flex">
					{NAV_ROWS.map((r) => (
						<div
							key={r.label}
							className={[
								"flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px]",
								r.active
									? "bg-accent/[0.14] text-fg shadow-[inset_0_0_0_1px_rgba(94,106,210,0.25)]"
									: "text-fg-muted",
							].join(" ")}
						>
							<span
								className={[
									"h-1.5 w-1.5 rounded-full",
									r.active ? "bg-accent" : "bg-white/20",
								].join(" ")}
							/>
							{r.label}
						</div>
					))}
					<div className="mt-auto rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
						<div className="font-mono text-[10px] uppercase tracking-widest text-accent">
							Build
						</div>
						<div className="mt-1 text-[12px] text-fg-muted">
							Passing · 2m ago
						</div>
					</div>
				</aside>

				{/* Main panel */}
				<div className="relative p-4 sm:p-6">
					{/* slow vertical scan line */}
					{!reduced && (
						<div
							aria-hidden
							className="animate-scan-down pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-accent/[0.08] to-transparent"
						/>
					)}

					<div className="grid grid-cols-3 gap-3 max-[520px]:grid-cols-1">
						{METRICS.map((m) => (
							<div
								key={m.label}
								className="edge-hi rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-4"
							>
								<div className="font-mono text-[10px] uppercase tracking-widest text-fg-muted/70">
									{m.label}
								</div>
								<div className="mt-2 text-2xl font-semibold tracking-tight text-fg">
									{m.value}
								</div>
								<div className="mt-0.5 text-[11px] text-fg-muted">{m.sub}</div>
							</div>
						))}
					</div>

					{/* fake area chart */}
					<div className="mt-4 rounded-xl border border-white/[0.06] bg-bg-deep/40 p-4">
						<div className="mb-3 flex items-center justify-between">
							<span className="text-[13px] font-medium text-fg">
								Frame latency
							</span>
							<span className="font-mono text-[11px] text-accent">
								▲ 12% smoother
							</span>
						</div>
						<svg
							viewBox="0 0 320 80"
							preserveAspectRatio="none"
							className="h-20 w-full"
							aria-hidden
						>
							<defs>
								<linearGradient id="mock-area" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0" stopColor="#5E6AD2" stopOpacity="0.45" />
									<stop offset="1" stopColor="#5E6AD2" stopOpacity="0" />
								</linearGradient>
							</defs>
							<path
								d="M0 60 L26 52 L52 56 L78 40 L104 46 L130 30 L156 36 L182 22 L208 28 L234 16 L260 22 L286 12 L320 18 L320 80 L0 80 Z"
								fill="url(#mock-area)"
							/>
							<path
								d="M0 60 L26 52 L52 56 L78 40 L104 46 L130 30 L156 36 L182 22 L208 28 L234 16 L260 22 L286 12 L320 18"
								fill="none"
								stroke="#8b95e6"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}
