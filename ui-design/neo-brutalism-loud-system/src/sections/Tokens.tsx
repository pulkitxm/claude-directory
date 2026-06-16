import { COLOR_TOKENS } from "../content";
import { Card } from "../components/Card";
import { SectionLabel, Reveal } from "../components/Section";

const SHADOWS: { label: string; cls: string; value: string }[] = [
	{ label: "SM", cls: "neo-shadow-sm", value: "4px 4px" },
	{ label: "MD", cls: "neo-shadow-md", value: "8px 8px" },
	{ label: "LG", cls: "neo-shadow-lg", value: "12px 12px" },
	{ label: "XL", cls: "neo-shadow-xl", value: "16px 16px" },
];

/* The "DNA" section: a live, interactive token gallery. Color swatches print
   their own hex; the shadow scale is shown on real boxes; radius + type are
   spelled out. Everything reads from the centralized @theme tokens. */
export function Tokens() {
	return (
		<section
			id="tokens"
			className="neo-noise relative overflow-hidden border-b-4 border-neo-ink bg-neo-muted"
		>
			<div
				className="neo-grid pointer-events-none absolute inset-0 opacity-40"
				aria-hidden="true"
			/>
			<div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
				<div className="max-w-3xl">
					<SectionLabel bg="bg-neo-secondary">The DNA</SectionLabel>
					<h2 className="mt-5 text-5xl font-bold uppercase leading-[0.9] tracking-tighter text-neo-ink sm:text-7xl">
						One Source
						<br />
						<span className="text-neo-white neo-text-shadow">Of Truth</span>
					</h2>
					<p className="mt-6 max-w-xl text-lg font-bold text-neo-ink">
						Every color, the radius, and the shadow scale live in a single
						<code className="mx-1 border-2 border-neo-ink bg-neo-white px-1.5 py-0.5">
							@theme
						</code>
						block. Swap three highlighter values and the whole system retunes.
					</p>
				</div>

				{/* Color swatches */}
				<div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
					{COLOR_TOKENS.map((token, i) => (
						<Reveal key={token.name} delay={i * 60}>
							<Card bg="bg-neo-white" shadow="md" className="overflow-hidden">
								<div
									className={`flex h-24 items-end ${token.swatch} border-b-4 border-neo-ink p-2`}
								>
									<span
										className={`text-xs font-bold uppercase tracking-widest ${token.on}`}
									>
										{token.hex}
									</span>
								</div>
								<div className="p-3">
									<p className="text-sm font-bold uppercase tracking-wide text-neo-ink">
										{token.name}
									</p>
									<p className="text-xs font-bold text-neo-ink/60">{token.note}</p>
								</div>
							</Card>
						</Reveal>
					))}
				</div>

				{/* Shadow scale + geometry */}
				<div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
					{/* Shadow scale */}
					<Card
						bg="bg-neo-bg"
						lift={false}
						shadow="lg"
						className="p-6 lg:col-span-2"
					>
						<p className="mb-8 text-sm font-bold uppercase tracking-widest text-neo-ink">
							Hard Shadow Scale · 0 blur · 0 spread
						</p>
						<div className="grid grid-cols-2 gap-x-6 gap-y-10 px-2 sm:grid-cols-4">
							{SHADOWS.map((s) => (
								<div key={s.label} className="flex flex-col items-center gap-3">
									<div
										className={`flex h-14 w-14 items-center justify-center border-4 border-neo-ink bg-neo-accent ${s.cls}`}
									>
										<span className="text-xs font-bold">{s.label}</span>
									</div>
									<span className="text-[11px] font-bold uppercase tracking-wide text-neo-ink/70">
										{s.value}
									</span>
								</div>
							))}
						</div>
					</Card>

					{/* Geometry + type */}
					<Card bg="bg-neo-secondary" lift={false} shadow="lg" className="p-6">
						<p className="mb-5 text-sm font-bold uppercase tracking-widest text-neo-ink">
							Geometry + Type
						</p>
						<dl className="space-y-3 text-sm font-bold">
							{[
								["Radius", "0px"],
								["Border", "4px / 8px"],
								["Family", "Space Grotesk"],
								["Weights", "700 / 900 only"],
							].map(([k, v]) => (
								<div
									key={k}
									className="flex items-center justify-between border-b-2 border-neo-ink/30 pb-2"
								>
									<dt className="uppercase tracking-wide text-neo-ink/70">{k}</dt>
									<dd className="text-neo-ink">{v}</dd>
								</div>
							))}
						</dl>
						<div className="mt-5 flex items-center gap-3">
							<div className="h-12 w-12 border-4 border-neo-ink bg-neo-white" />
							<div className="h-12 w-12 rounded-full border-4 border-neo-ink bg-neo-white" />
							<span className="text-xs font-bold uppercase tracking-wide text-neo-ink/70">
								sharp / pill
							</span>
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}
