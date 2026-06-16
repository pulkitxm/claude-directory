import {
	Activity,
	BellRing,
	GitBranch,
	LineChart,
	ShieldCheck,
	Wand2,
	type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface Feature {
	icon: LucideIcon;
	title: string;
	body: string;
	span?: boolean;
}

const FEATURES: Feature[] = [
	{
		icon: LineChart,
		title: "One overview, every metric",
		body: "Activation, retention, revenue and engagement live on a single calm canvas. No tab-hopping, no stitching dashboards together — just the signal.",
		span: true,
	},
	{
		icon: Wand2,
		title: "Insights that find you",
		body: "Lumina watches your data and surfaces what changed, why it changed, and what to do next — in plain language.",
	},
	{
		icon: BellRing,
		title: "Alerts with intent",
		body: "Threshold and anomaly alerts that route to the right channel, so the team hears about the spike before the customer does.",
	},
	{
		icon: GitBranch,
		title: "Cohorts & funnels",
		body: "Build segments and multi-step funnels in seconds, then watch them update live as events stream in.",
	},
	{
		icon: ShieldCheck,
		title: "Private by design",
		body: "SOC 2 Type II, regional data residency, and granular roles. Your numbers stay yours.",
	},
	{
		icon: Activity,
		title: "Real-time pipeline",
		body: "Events land and resolve in under a second, so the dashboard you're looking at is the truth right now.",
	},
];

function FeatureCard({ feature }: { feature: Feature }) {
	const Icon = feature.icon;
	return (
		<RevealItem className={cn(feature.span && "md:col-span-2 lg:col-span-1")}>
			<Card className="h-full p-7">
				<span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-secondary text-accent-foreground shadow-accent transition-transform duration-300 group-hover:scale-110">
					<Icon className="h-6 w-6" />
				</span>
				<h3 className="mt-5 text-xl font-semibold tracking-[-0.01em]">
					{feature.title}
				</h3>
				<p className="mt-2.5 leading-relaxed text-muted-foreground">
					{feature.body}
				</p>
			</Card>
		</RevealItem>
	);
}

export function Features() {
	return (
		<section id="features" className="relative py-28 md:py-36">
			<div className="mx-auto max-w-6xl px-5">
				<Reveal className="max-w-2xl">
					<RevealItem>
						<SectionLabel>Capabilities</SectionLabel>
					</RevealItem>
					<RevealItem>
						<h2 className="mt-5 font-display text-3xl leading-[1.15] tracking-tight sm:text-[3.25rem]">
							Everything you need to{" "}
							<span className="gradient-text">understand growth</span>.
						</h2>
					</RevealItem>
					<RevealItem>
						<p className="mt-5 text-lg leading-relaxed text-muted-foreground">
							A focused toolkit — not a maze of settings. Each capability earns
							its place and works the moment you connect your first event.
						</p>
					</RevealItem>
				</Reveal>

				<Reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((feature) => (
						<FeatureCard key={feature.title} feature={feature} />
					))}
				</Reveal>
			</div>
		</section>
	);
}
