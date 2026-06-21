import { motion } from "framer-motion";
import {
	CircuitBoard,
	PencilRuler,
	PackageCheck,
	Waypoints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface Step {
	icon: LucideIcon;
	title: string;
	body: string;
}

// A genuine ordered process — numbering carries real information here.
const STEPS: Step[] = [
	{
		icon: PencilRuler,
		title: "Draw the schematic",
		body: "Drop parts from a 4M-component library or paste a net list. Foundry assigns reference designators and footprints automatically.",
	},
	{
		icon: Waypoints,
		title: "Route the copper",
		body: "Auto-route the easy nets, then take the critical ones by hand with the push-and-shove engine keeping clearances honest.",
	},
	{
		icon: CircuitBoard,
		title: "Verify the board",
		body: "Run DRC and a signal-integrity pass. Foundry flags acid traps, impedance misses, and thermal risks before you commit.",
	},
	{
		icon: PackageCheck,
		title: "Ship to fab",
		body: "Generate Gerbers, pick & place, and BOM, then order assembled boards from a partner fab — delivered in days.",
	},
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Workflow() {
	return (
		<section id="workflow" className="relative px-5 py-24 sm:py-32">
			<div className="mx-auto max-w-6xl">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<SectionLabel designator="R4" label="The route" />
						<motion.h2
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.6, ease }}
							className="mt-5 max-w-xl text-balance font-display text-3xl font-bold leading-tight tracking-tightest text-silk sm:text-[2.6rem]"
						>
							From idea to assembled board in four moves.
						</motion.h2>
					</div>
					<p className="max-w-xs text-sm leading-relaxed text-silk-dim">
						One canvas, one net list, one source of truth — no exporting between
						tools, no version drift between schematic and layout.
					</p>
				</div>

				<ol className="relative mt-16 grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-10 lg:grid-cols-4 lg:gap-x-6">
					{/* the routed trace connecting steps (desktop) */}
					<span
						aria-hidden
						className="absolute left-0 right-0 top-[26px] hidden h-px trace-line lg:block"
					/>
					{STEPS.map((step, i) => (
						<Step key={step.title} step={step} index={i} />
					))}
				</ol>
			</div>
		</section>
	);
}

function Step({ step, index }: { step: Step; index: number }) {
	const Icon = step.icon;
	return (
		<motion.li
			initial={{ opacity: 0, y: 22 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{ duration: 0.55, ease, delay: index * 0.1 }}
			className="relative"
		>
			<div className="relative z-10 mb-5 flex items-center gap-3">
				<span className="grid h-[54px] w-[54px] place-items-center rounded-2xl border border-copper/40 bg-substrate-900 text-copper shadow-pad">
					<Icon className="h-5 w-5" strokeWidth={1.75} />
				</span>
				<span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-silk-faint">
					{String(index + 1).padStart(2, "0")}
				</span>
			</div>
			<h3 className="font-display text-lg font-semibold tracking-tight text-silk">
				{step.title}
			</h3>
			<p className="mt-2 max-w-xs text-sm leading-relaxed text-silk-dim">
				{step.body}
			</p>
		</motion.li>
	);
}
