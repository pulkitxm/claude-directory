import { motion } from "framer-motion";
import {
	Activity,
	GitBranch,
	Layers,
	Radio,
	ScanLine,
	Workflow as WorkflowIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface Feature {
	icon: LucideIcon;
	title: string;
	body: string;
	/** spans two columns on lg */
	wide?: boolean;
	metric?: string;
}

const FEATURES: Feature[] = [
	{
		icon: ScanLine,
		title: "Continuous DRC",
		body: "Every clearance, annular ring, and trace width is checked as you route. Violations surface inline on the copper — never in a report you forget to open.",
		wide: true,
		metric: "120+ rule checks · live",
	},
	{
		icon: Radio,
		title: "Signal integrity, simulated",
		body: "Impedance-controlled stack-ups with a built-in field solver. See reflections and crosstalk before you fab.",
		metric: "50Ω ±5%",
	},
	{
		icon: Layers,
		title: "Up to 16 layers",
		body: "Define your own stack-up with copper weights, prepreg, and core, then route blind and buried vias.",
		metric: "1–16 layers",
	},
	{
		icon: GitBranch,
		title: "Schematic ↔ layout sync",
		body: "Forward and back annotation keeps the net list honest. Change a part on the schematic; the board follows.",
	},
	{
		icon: Activity,
		title: "Push-and-shove router",
		body: "Drag a trace and watch neighbors move out of the way while staying inside their rules.",
	},
	{
		icon: WorkflowIcon,
		title: "Order assembly inline",
		body: "Generate Gerbers, pick & place, and a BOM, then send to a vetted fab without exporting a single file.",
		wide: true,
		metric: "Fab-ready in one click",
	},
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Features() {
	return (
		<section id="features" className="relative px-5 py-24 sm:py-32">
			<div className="mx-auto max-w-6xl">
				<SectionLabel designator="U1" label="The studio" />
				<motion.h2
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.6, ease }}
					className="mt-5 max-w-2xl text-balance font-display text-3xl font-bold leading-tight tracking-tightest text-silk sm:text-[2.6rem]"
				>
					Everything between the schematic and the solder paste.
				</motion.h2>

				<div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((f, i) => (
						<FeatureCard key={f.title} feature={f} index={i} />
					))}
				</div>
			</div>
		</section>
	);
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
	const Icon = feature.icon;
	return (
		<motion.article
			initial={{ opacity: 0, y: 22 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{ duration: 0.55, ease, delay: (index % 3) * 0.06 }}
			className={cn(
				"group relative flex flex-col overflow-hidden rounded-2xl border border-substrate-600/70 bg-substrate-800/40 p-6 transition-colors duration-300 hover:border-copper/30",
				feature.wide && "lg:col-span-2",
			)}
		>
			{/* hover copper-foil sheen */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{
					background:
						"radial-gradient(420px 200px at 20% 0%, rgba(232,162,75,0.08), transparent 70%)",
				}}
			/>

			<div className="relative flex items-center justify-between">
				<span className="grid h-11 w-11 place-items-center rounded-xl border border-substrate-500/80 bg-substrate-900/60 text-copper transition-colors duration-300 group-hover:border-copper/40 group-hover:text-copper-bright">
					<Icon className="h-5 w-5" strokeWidth={1.75} />
				</span>
				{feature.metric && (
					<span className="font-mono text-[10px] uppercase tracking-wider text-silk-faint">
						{feature.metric}
					</span>
				)}
			</div>

			<h3 className="relative mt-5 font-display text-lg font-semibold tracking-tight text-silk">
				{feature.title}
			</h3>
			<p className="relative mt-2 text-sm leading-relaxed text-silk-dim">
				{feature.body}
			</p>
		</motion.article>
	);
}
