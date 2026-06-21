import { Smartphone, ToggleLeft } from "lucide-react";

const props = [
	{
		name: "titleComponent",
		type: "string | ReactNode",
		req: true,
		desc: "Heading rendered above the card. It drifts upward (translateY 0 → −100) as you scroll.",
	},
	{
		name: "children",
		type: "ReactNode",
		req: true,
		desc: "Whatever you frame inside the device — a screenshot, an <img>, a video, or a live component.",
	},
];

const transforms = [
	{ k: "rotateX", from: "20°", to: "0°", note: "card tilts upright" },
	{
		k: "scale (desktop)",
		from: "1.05",
		to: "1.00",
		note: "settles to true size",
	},
	{
		k: "scale (mobile)",
		from: "0.70",
		to: "0.90",
		note: "fits small viewports",
	},
	{ k: "translateY (title)", from: "0", to: "−100", note: "heading rises" },
];

export function ApiReference() {
	return (
		<section
			id="api"
			className="relative mx-auto max-w-5xl scroll-mt-24 px-6 pb-24"
		>
			<div className="text-center">
				<p className="font-mono text-[11px] uppercase tracking-[0.28em] text-iris/80">
					Reference
				</p>
				<h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
					Props, state &amp; behaviour
				</h2>
			</div>

			<div className="mt-10 grid gap-4 lg:grid-cols-2">
				{/* props table */}
				<div className="rounded-2xl border border-white/[0.08] bg-ink-soft/60 p-5">
					<h3 className="font-display text-base font-semibold text-white">
						Props
					</h3>
					<div className="mt-4 space-y-3">
						{props.map((p) => (
							<div
								key={p.name}
								className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
							>
								<div className="flex flex-wrap items-center gap-2">
									<code className="font-mono text-[13px] font-medium text-iris-bright">
										{p.name}
									</code>
									<code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-white/55">
										{p.type}
									</code>
									{p.req && (
										<span className="rounded bg-ember/15 px-1.5 py-0.5 font-mono text-[10px] text-ember">
											required
										</span>
									)}
								</div>
								<p className="mt-1.5 text-[13px] leading-relaxed text-white/50">
									{p.desc}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* transforms table */}
				<div className="rounded-2xl border border-white/[0.08] bg-ink-soft/60 p-5">
					<h3 className="font-display text-base font-semibold text-white">
						Scroll → transform map
					</h3>
					<div className="mt-4 overflow-hidden rounded-xl border border-white/[0.06]">
						<div className="grid grid-cols-[1.3fr_1fr_1.2fr] bg-white/[0.03] px-3 py-2 font-mono text-[11px] text-white/40">
							<span>value</span>
							<span>0% → 100%</span>
							<span>effect</span>
						</div>
						{transforms.map((t, i) => (
							<div
								key={t.k}
								className={`grid grid-cols-[1.3fr_1fr_1.2fr] items-center px-3 py-2.5 text-[12px] ${
									i % 2 ? "bg-white/[0.015]" : ""
								}`}
							>
								<code className="font-mono text-white/80">{t.k}</code>
								<span className="font-mono text-iris-bright">
									{t.from} <span className="text-white/30">→</span> {t.to}
								</span>
								<span className="text-white/45">{t.note}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* state + responsive cards */}
			<div className="mt-4 grid gap-4 md:grid-cols-2">
				<div className="flex gap-3 rounded-2xl border border-white/[0.08] bg-ink-soft/40 p-5">
					<span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-iris/15 text-iris-bright">
						<ToggleLeft className="h-4 w-4" />
					</span>
					<div>
						<h3 className="font-display text-[15px] font-semibold text-white">
							State it owns
						</h3>
						<p className="mt-1 text-[13px] leading-relaxed text-white/50">
							Just one local boolean,{" "}
							<code className="font-mono text-white/75">isMobile</code>, set
							from a resize listener to pick the scale range. No context or
							store needed — scroll position is read directly via{" "}
							<code className="font-mono text-white/75">useScroll</code>.
						</p>
					</div>
				</div>

				<div className="flex gap-3 rounded-2xl border border-white/[0.08] bg-ink-soft/40 p-5">
					<span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ember/15 text-ember">
						<Smartphone className="h-4 w-4" />
					</span>
					<div>
						<h3 className="font-display text-[15px] font-semibold text-white">
							Responsive behaviour
						</h3>
						<p className="mt-1 text-[13px] leading-relaxed text-white/50">
							Section height drops from{" "}
							<code className="font-mono text-white/75">80rem</code> to{" "}
							<code className="font-mono text-white/75">60rem</code> under 768px
							and the card scales up (0.70 → 0.90) so it never overflows a
							phone. Best used once near the top of a marketing or docs page.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
