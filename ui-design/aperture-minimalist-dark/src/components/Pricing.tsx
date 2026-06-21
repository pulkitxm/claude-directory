import { Check } from "lucide-react";
import { Button, GlassCard, Reveal, SectionHeading } from "./Primitives";
import { cn } from "../lib/cn";

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
		cadence: "/forever",
		blurb: "For the side project that ships at midnight.",
		features: [
			"1 runtime, 2 edge regions",
			"Unlimited preview deploys",
			"7-day trace retention",
			"Community support",
		],
		cta: "Start free",
	},
	{
		name: "Studio",
		price: "$24",
		cadence: "/seat · mo",
		blurb: "For small teams that ship every day.",
		features: [
			"Unlimited runtimes, 6 regions",
			"Instant rollback + auto-revert",
			"90-day flame-graph traces",
			"Slack & PagerDuty alerts",
			"Priority email support",
		],
		cta: "Start 14-day trial",
		featured: true,
	},
	{
		name: "Scale",
		price: "Custom",
		cadence: "",
		blurb: "For platforms with on-call rotations.",
		features: [
			"Dedicated edge capacity",
			"SSO, SCIM & audit log",
			"Unlimited trace retention",
			"Private regions on request",
			"Solutions engineer",
		],
		cta: "Talk to us",
	},
];

export function Pricing() {
	return (
		<section id="pricing" className="section-y relative">
			<div className="container-x">
				<SectionHeading
					eyebrow="Pricing"
					title="Priced for the quiet hours."
					lede="Start free and stay free on solo work. Upgrade only when a team and an on-call rotation show up."
				/>

				<div className="mt-16 grid grid-cols-1 items-center gap-6 lg:grid-cols-3">
					{TIERS.map((t, i) => (
						<Reveal
							key={t.name}
							delay={i * 100}
							className={cn(t.featured && "lg:-my-3")}
						>
							<GlassCard
								interactive={!t.featured}
								highlight={t.featured}
								className={cn(
									"relative flex h-full flex-col p-7 md:p-8",
									t.featured && "lg:scale-[1.04]",
								)}
							>
								{t.featured && (
									<span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-accent-foreground shadow-glow-btn">
										Most loved
									</span>
								)}

								<div className="flex items-baseline justify-between">
									<h3 className="font-display text-lg font-medium tracking-tight text-foreground">
										{t.name}
									</h3>
								</div>
								<p className="mt-1.5 text-sm text-muted-foreground">
									{t.blurb}
								</p>

								<div className="mt-6 flex items-end gap-1">
									<span
										className={cn(
											"font-display text-4xl font-semibold tracking-tight md:text-5xl",
											t.featured ? "text-ember" : "text-foreground",
										)}
									>
										{t.price}
									</span>
									{t.cadence && (
										<span className="mb-1.5 font-mono text-xs text-muted-foreground">
											{t.cadence}
										</span>
									)}
								</div>

								<div className="my-6 h-px w-full bg-white/[0.06]" />

								<ul className="flex flex-1 flex-col gap-3.5">
									{t.features.map((feat) => (
										<li key={feat} className="flex items-start gap-3 text-sm">
											<Check
												size={16}
												strokeWidth={2}
												className={cn(
													"mt-0.5 shrink-0",
													t.featured ? "text-accent" : "text-muted-foreground",
												)}
											/>
											<span className="text-foreground/85">{feat}</span>
										</li>
									))}
								</ul>

								<Button
									variant={t.featured ? "primary" : "secondary"}
									href="#"
									className="mt-8 w-full"
								>
									{t.cta}
								</Button>
							</GlassCard>
						</Reveal>
					))}
				</div>

				<Reveal delay={120}>
					<p className="mt-10 text-center font-mono text-xs tracking-wide text-muted-foreground/70">
						All plans include edge secrets, unlimited rollbacks, and a generous
						dark mode.
					</p>
				</Reveal>
			</div>
		</section>
	);
}
