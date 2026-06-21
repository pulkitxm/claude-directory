import { Check } from "lucide-react";
import { LinkButton, StickyTag, Tack, cx } from "./primitives";
import { useReveal } from "../lib/reveal";
import { radius } from "../lib/tokens";

type Tier = {
	name: string;
	price: string;
	cadence: string;
	blurb: string;
	features: string[];
	cta: string;
	popular?: boolean;
};

const TIERS: Tier[] = [
	{
		name: "Doodler",
		price: "$0",
		cadence: "free, forever",
		blurb: "For solo scribblers and the occasional napkin sketch.",
		features: [
			"3 active boards",
			"Unlimited sticky notes",
			"Basic pen & shapes",
			"7-day history",
		],
		cta: "Grab a marker",
	},
	{
		name: "Studio",
		price: "$9",
		cadence: "per person / mo",
		blurb: "For teams that brainstorm out loud, all day, every day.",
		features: [
			"Unlimited boards",
			"Live cursors & comments",
			"Tidy-up magic broom",
			"Full version history",
			"Poster & PDF export",
		],
		cta: "Start the mess",
		popular: true,
	},
	{
		name: "Wall",
		price: "$24",
		cadence: "per person / mo",
		blurb: "For big rooms with bigger walls and tighter rules.",
		features: [
			"Everything in Studio",
			"SSO & admin controls",
			"Shared template drawer",
			"Priority pencil support",
		],
		cta: "Talk to us",
	},
];

export function Pricing() {
	const { ref, shown } = useReveal<HTMLDivElement>();
	return (
		<section id="pricing" className="px-6 py-20">
			<div ref={ref} className="mx-auto max-w-5xl">
				<div className="mb-16 text-center">
					<StickyTag color="postit" tilt="-rotate-2">
						Pay for paper, basically
					</StickyTag>
					<h2 className="mt-6 text-4xl text-ink md:text-5xl">
						Pick a marker, start scribbling
					</h2>
					<p className="mx-auto mt-5 max-w-xl text-lg text-ink/70 md:text-xl">
						No seats you forgot you bought, no surprise overage emails. Cancel
						by just… closing the lid.
					</p>
				</div>

				<div className="grid items-center gap-10 md:grid-cols-3 md:gap-6">
					{TIERS.map((t, i) => (
						<div
							key={t.name}
							className={cx(
								"relative transition-all duration-500",
								t.popular ? "md:z-10 md:scale-105" : "",
							)}
							style={{
								opacity: shown ? 1 : 0,
								transform: shown ? undefined : "translateY(26px)",
								transitionDelay: `${i * 110}ms`,
							}}
						>
							{/* dashed circle overlay highlighting the popular tier (desktop) */}
							{t.popular && (
								<svg
									aria-hidden
									viewBox="0 0 340 460"
									preserveAspectRatio="none"
									className="anim-dash pointer-events-none absolute -inset-5 hidden h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)] md:block"
									fill="none"
									stroke="var(--color-accent)"
									strokeWidth="3"
								>
									<path d="M170 8 C 60 8 14 70 14 230 C 14 400 70 452 170 452 C 280 452 326 392 326 230 C 326 64 270 8 170 8 Z" />
								</svg>
							)}

							<div
								className={cx(
									"relative flex h-full flex-col border-[3px] border-ink p-6 transition-transform duration-100 md:p-8",
									t.popular
										? "bg-postit shadow-[var(--shadow-hard-lg)] -rotate-1"
										: "bg-card shadow-[var(--shadow-hard)] " +
												(i === 0 ? "rotate-1" : "-rotate-1"),
								)}
								style={{ borderRadius: radius.wobblyLg }}
							>
								{t.popular && <Tack />}

								{t.popular && (
									<span
										className="absolute -right-3 -top-4 z-10 rotate-6 border-2 border-ink bg-accent px-3 py-1 text-sm text-white shadow-[var(--shadow-hard-sm)]"
										style={{ borderRadius: radius.wobblyMd }}
									>
										most loved
									</span>
								)}

								<h3 className="font-[var(--font-marker)] text-2xl text-ink">
									{t.name}
								</h3>
								<div className="mt-3 flex items-end gap-1.5">
									<span className="font-[var(--font-marker)] text-5xl font-bold text-ink">
										{t.price}
									</span>
									<span className="pb-1.5 text-base text-ink/60">
										{t.cadence}
									</span>
								</div>
								<p className="mt-3 text-lg text-ink/75">{t.blurb}</p>

								<div
									className="my-6 border-t-2 border-dashed border-ink/40"
									aria-hidden
								/>

								<ul className="mb-7 flex-1 space-y-3">
									{t.features.map((f) => (
										<li key={f} className="flex items-start gap-2.5">
											<span
												className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center border-2 border-ink bg-card text-pen"
												style={{ borderRadius: radius.blob }}
											>
												<Check size={14} strokeWidth={3.25} />
											</span>
											<span className="text-lg text-ink/85">{f}</span>
										</li>
									))}
								</ul>

								<LinkButton
									href="#notes"
									variant={t.popular ? "primary" : "secondary"}
									className="w-full"
								>
									{t.cta}
								</LinkButton>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
