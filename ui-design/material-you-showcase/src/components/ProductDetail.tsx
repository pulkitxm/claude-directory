import { Blob, ButtonLink, Eyebrow, Reveal, Shell } from "./primitives";
import { ArrowRight, Check, Tune } from "./icons";

const POINTS = [
	"13 tonal steps per key color, generated instantly",
	"Roles mapped automatically — surface, container, on-color",
	"Light & dark schemes from the same single seed",
	"Copy any token as CSS, Tailwind or a design-token JSON",
];

/* A recessed (shadow-inner) "visualization" container. Inside: the tonal ramps
   for the three key colors, demonstrating the surface hierarchy the whole
   system rests on. The recessed look is the spec's shadow-inner on the Product
   Detail visualization. */
function TonalLab() {
	const ramps: { label: string; from: string; to: string }[] = [
		{
			label: "Primary",
			from: "#21005d",
			to: "#eaddff",
		},
		{
			label: "Tertiary",
			from: "#31111d",
			to: "#ffd8e4",
		},
		{
			label: "Neutral",
			from: "#1c1b1f",
			to: "#f3edf7",
		},
	];
	// 9 perceptual stops per ramp (dark -> light).
	const stops = (from: string, to: string) => {
		const fa = hexToRgb(from);
		const ta = hexToRgb(to);
		return Array.from({ length: 9 }).map((_, i) => {
			const t = i / 8;
			const r = Math.round(fa[0] + (ta[0] - fa[0]) * t);
			const g = Math.round(fa[1] + (ta[1] - fa[1]) * t);
			const b = Math.round(fa[2] + (ta[2] - fa[2]) * t);
			return `rgb(${r}, ${g}, ${b})`;
		});
	};

	return (
		<div className="rounded-[var(--radius-md-2xl)] bg-[var(--color-md-container-low)] p-5 shadow-[inset_0_2px_10px_rgba(28,27,31,0.12)] sm:p-7">
			<div className="mb-5 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-md-tertiary)] text-[var(--color-md-on-tertiary)]">
						<Tune size={18} />
					</span>
					<p className="text-sm font-medium text-[var(--color-md-on-bg)]">
						Tonal ramps
					</p>
				</div>
				<span className="chip" aria-pressed="true">
					Seed #6750A4
				</span>
			</div>

			<div className="flex flex-col gap-4">
				{ramps.map((r) => (
					<div key={r.label}>
						<p className="t-label-s mb-1.5 text-[var(--color-md-on-variant)]">
							{r.label}
						</p>
						<div className="flex gap-1 overflow-hidden rounded-2xl ring-1 ring-black/5 ring-inset">
							{stops(r.from, r.to).map((c, i) => (
								<span
									key={i}
									className="h-9 flex-1 transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] first:rounded-l-2xl last:rounded-r-2xl hover:scale-y-110"
									style={{ background: c }}
									title={c}
									aria-hidden
								/>
							))}
						</div>
					</div>
				))}
			</div>

			{/* a couple of resolved swatches with on-color text proof */}
			<div className="mt-5 grid grid-cols-2 gap-3">
				<div className="rounded-2xl bg-[var(--color-md-primary)] p-4 text-[var(--color-md-on-primary)]">
					<p className="t-label-s opacity-80">On primary</p>
					<p className="text-base font-medium">Aa · clears AAA</p>
				</div>
				<div className="rounded-2xl bg-[var(--color-md-tertiary-container)] p-4 text-[var(--color-md-on-tertiary-container)]">
					<p className="t-label-s opacity-80">On tertiary container</p>
					<p className="text-base font-medium">Aa · clears AA</p>
				</div>
			</div>
		</div>
	);
}

export function ProductDetail() {
	return (
		<section
			id="product"
			className="relative scroll-mt-20 overflow-hidden bg-[var(--color-md-bg)] py-20 sm:py-28"
		>
			<Blob
				float="c"
				className="-right-32 top-1/4 h-80 w-80 bg-[var(--color-md-primary-container)] opacity-55"
			/>

			<Shell className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
				<Reveal>
					<TonalLab />
				</Reveal>

				<div className="flex flex-col items-start gap-6">
					<Reveal>
						<Eyebrow icon={<Tune size={14} />}>The tonal engine</Eyebrow>
					</Reveal>
					<Reveal delay={80}>
						<h2 className="t-headline text-[var(--color-md-on-bg)]">
							See the palette think
						</h2>
					</Reveal>
					<Reveal delay={140}>
						<p className="t-body-l text-[var(--color-md-on-variant)]">
							Under the hood, Lumi runs the same tonal math as Material You. Drag
							the seed and watch thirteen carefully spaced tones redraw — then
							get mapped to roles your components already understand.
						</p>
					</Reveal>
					<Reveal delay={200}>
						<ul className="flex flex-col gap-3">
							{POINTS.map((p) => (
								<li key={p} className="flex items-start gap-3">
									<span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-md-secondary-container)] text-[var(--color-md-on-secondary-container)]">
										<Check size={15} />
									</span>
									<span className="text-[var(--color-md-on-bg)]">{p}</span>
								</li>
							))}
						</ul>
					</Reveal>
					<Reveal delay={260}>
						<ButtonLink href="#cta" variant="filled" size="lg">
							Open the playground
							<ArrowRight size={20} />
						</ButtonLink>
					</Reveal>
				</div>
			</Shell>
		</section>
	);
}

/* tiny hex parser for the ramp interpolation */
function hexToRgb(hex: string): [number, number, number] {
	const h = hex.replace("#", "");
	return [
		parseInt(h.slice(0, 2), 16),
		parseInt(h.slice(2, 4), 16),
		parseInt(h.slice(4, 6), 16),
	];
}
