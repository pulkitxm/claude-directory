import { Reveal, Shell } from "./primitives";

/* A quiet "trusted by" strip. Wordmarks are set in the on-variant tone so they
   recede; this keeps the tonal hierarchy intact (no loud logos). */
const BRANDS = ["Northwind", "Aperture", "Cadence", "Lumen Labs", "Mosaic", "Verde"];

export function LogoStrip() {
	return (
		<section className="bg-[var(--color-md-bg)] py-10">
			<Shell>
				<Reveal>
					<p className="t-label-s mb-6 text-center uppercase tracking-[0.14em] text-[var(--color-md-on-variant)]">
						Theming the products you use every day
					</p>
				</Reveal>
				<Reveal delay={80}>
					<ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
						{BRANDS.map((b) => (
							<li
								key={b}
								className="text-xl font-medium tracking-tight text-[var(--color-md-on-variant)] opacity-70 transition-opacity duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:opacity-100"
							>
								{b}
							</li>
						))}
					</ul>
				</Reveal>
			</Shell>
		</section>
	);
}
