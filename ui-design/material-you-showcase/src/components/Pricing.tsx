import { Reveal, SectionHead, Shell } from "./primitives";
import { Check, Sparkle } from "./icons";

type Tier = {
	name: string;
	price: string;
	cadence: string;
	blurb: string;
	features: string[];
	cta: string;
	featured?: boolean;
};

const TIERS: Tier[] = [
	{
		name: "Solo",
		price: "$0",
		cadence: "forever",
		blurb: "For tinkering and side projects.",
		features: [
			"1 theme, unlimited seeds",
			"Light & dark schemes",
			"CSS & Tailwind export",
			"Community templates",
		],
		cta: "Start free",
	},
	{
		name: "Studio",
		price: "$18",
		cadence: "per editor / mo",
		blurb: "For teams shipping real products.",
		features: [
			"Unlimited themes & brands",
			"Figma + native token sync",
			"Contrast CI checks",
			"Versioned token history",
			"Shared component library",
		],
		cta: "Get Studio",
		featured: true,
	},
	{
		name: "Scale",
		price: "Let's talk",
		cadence: "annual",
		blurb: "For design systems at scale.",
		features: [
			"SSO & audit log",
			"On-prem token pipeline",
			"Dedicated solutions engineer",
			"Custom tonal algorithms",
		],
		cta: "Contact sales",
	},
];

function FeatureRow({
	children,
	onColor,
}: {
	children: string;
	onColor?: boolean;
}) {
	return (
		<li className="group/feat flex items-start gap-3 transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:translate-x-1">
			<span
				className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
					onColor
						? "bg-white/20 text-white"
						: "bg-[var(--color-md-secondary-container)] text-[var(--color-md-on-secondary-container)]"
				}`}
			>
				<Check size={13} />
			</span>
			<span
				className={onColor ? "text-white/90" : "text-[var(--color-md-on-bg)]"}
			>
				{children}
			</span>
		</li>
	);
}

/* Pricing: the featured tier rests lifted (md:-translate-y-4) with a primary
   fill + ring, demonstrating asymmetric elevation. Feature rows slide on hover. */
export function Pricing() {
	return (
		<section
			id="pricing"
			className="relative scroll-mt-20 bg-[var(--color-md-bg)] py-20 sm:py-28"
		>
			<Shell>
				<SectionHead
					eyebrow="Pricing"
					title="Plans that scale with your palette"
					lead="Start free and grow into a full token pipeline. No credit card to begin."
				/>

				<div className="mt-16 grid items-start gap-6 md:grid-cols-3">
					{TIERS.map((t, i) => {
						const featured = !!t.featured;
						return (
							<Reveal key={t.name} delay={i * 90}>
								<article
									className={`group relative flex h-full flex-col rounded-[var(--radius-md-2xl)] p-8 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
										featured
											? "on-color bg-[var(--color-md-primary)] text-[var(--color-md-on-primary)] shadow-[var(--shadow-md-3)] ring-2 ring-[var(--color-md-primary)] md:-translate-y-4 hover:md:-translate-y-5"
											: "bg-[var(--color-md-container)] text-[var(--color-md-on-bg)] shadow-[var(--shadow-md-1)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-md-2)]"
									}`}
								>
									{featured && (
										<span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[var(--color-md-tertiary-container)] px-4 py-1.5 text-xs font-medium text-[var(--color-md-on-tertiary-container)] shadow-[var(--shadow-md-1)]">
											<Sparkle size={13} />
											Most popular
										</span>
									)}

									<h3 className={`t-title ${featured ? "text-white" : ""}`}>
										{t.name}
									</h3>
									<p
										className={`mt-1 text-sm ${
											featured
												? "text-white/80"
												: "text-[var(--color-md-on-variant)]"
										}`}
									>
										{t.blurb}
									</p>

									<div className="mt-6 flex items-end gap-2">
										<span className="text-4xl font-medium tracking-tight">
											{t.price}
										</span>
										<span
											className={`pb-1.5 text-sm ${
												featured
													? "text-white/75"
													: "text-[var(--color-md-on-variant)]"
											}`}
										>
											{t.cadence}
										</span>
									</div>

									<a
										href="#cta"
										className={`btn focus-ring mt-6 w-full ${
											featured ? "btn-on-color" : "btn-tonal"
										}`}
									>
										{t.cta}
									</a>

									<div
										className={`my-6 h-px ${
											featured
												? "bg-white/20"
												: "bg-[var(--color-md-outline-variant)]"
										}`}
										aria-hidden
									/>

									<ul className="flex flex-1 flex-col gap-3.5">
										{t.features.map((f) => (
											<FeatureRow key={f} onColor={featured}>
												{f}
											</FeatureRow>
										))}
									</ul>
								</article>
							</Reveal>
						);
					})}
				</div>
			</Shell>
		</section>
	);
}
