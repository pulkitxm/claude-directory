import { Fragment } from "react";
import { ArrowRight, Cable, LayoutDashboard, Rocket } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

const STEPS = [
	{
		icon: Cable,
		num: "01",
		title: "Connect your sources",
		body: "Drop in a snippet or pick from 40+ integrations. Events start flowing in minutes, not sprints.",
	},
	{
		icon: LayoutDashboard,
		num: "02",
		title: "Shape your overview",
		body: "Pin the metrics that matter to your team. Lumina lays out a clean, opinionated default you can refine.",
	},
	{
		icon: Rocket,
		num: "03",
		title: "Ship with confidence",
		body: "Watch insights surface automatically and let smart alerts keep the whole team aligned as you grow.",
	},
];

export function HowItWorks() {
	return (
		<section id="how" className="relative overflow-hidden bg-muted py-28 md:py-36">
			<div
				aria-hidden
				className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-accent/[0.05] blur-[150px]"
			/>
			<div className="mx-auto max-w-6xl px-5">
				<Reveal className="max-w-2xl">
					<RevealItem>
						<SectionLabel pulse>How it works</SectionLabel>
					</RevealItem>
					<RevealItem>
						<h2 className="mt-5 font-display text-3xl leading-[1.15] tracking-tight sm:text-[3.25rem]">
							From zero to insight in{" "}
							<span className="gradient-text">three steps</span>.
						</h2>
					</RevealItem>
				</Reveal>

				<Reveal className="mt-16 flex flex-col gap-10 md:flex-row md:items-start md:gap-4">
					{STEPS.map((step, i) => {
						const Icon = step.icon;
						return (
							<Fragment key={step.num}>
								<RevealItem className="flex-1">
									<div className="relative rounded-2xl border border-border bg-card p-8 shadow-md transition-shadow duration-300 hover:shadow-xl">
										<span className="absolute right-7 top-6 font-display text-4xl text-foreground/[0.06]">
											{step.num}
										</span>
										<span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-secondary text-accent-foreground shadow-accent">
											<Icon className="h-7 w-7" />
										</span>
										<h3 className="mt-6 text-xl font-semibold tracking-[-0.01em]">
											{step.title}
										</h3>
										<p className="mt-2.5 leading-relaxed text-muted-foreground">
											{step.body}
										</p>
									</div>
								</RevealItem>

								{/* Arrow connector between steps (desktop only) */}
								{i < STEPS.length - 1 && (
									<RevealItem className="hidden self-center md:block">
										<span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-secondary text-accent-foreground shadow-accent">
											<ArrowRight className="h-4 w-4" />
										</span>
									</RevealItem>
								)}
							</Fragment>
						);
					})}
				</Reveal>
			</div>
		</section>
	);
}
