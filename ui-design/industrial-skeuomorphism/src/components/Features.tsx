import { motion } from "motion/react";
import {
	Gauge,
	Radio,
	ShieldCheck,
	SlidersHorizontal,
	TerminalSquare,
	Waypoints,
	type LucideIcon,
} from "lucide-react";
import {
	Container,
	IconHousing,
	MonoLabel,
	Panel,
	SectionHeading,
} from "./primitives";
import { inView, slideUp, stagger } from "../lib/motion";

type Feature = {
	icon: LucideIcon;
	code: string;
	title: string;
	body: string;
};

const FEATURES: Feature[] = [
	{
		icon: Gauge,
		code: "MOD-01",
		title: "Real-time telemetry",
		body: "Stream pressure, temperature and vibration off every actuator at 1kHz, plotted on tactile gauges you can actually read at a glance.",
	},
	{
		icon: SlidersHorizontal,
		code: "MOD-02",
		title: "Tactile control plane",
		body: "Drive setpoints with knobs, switches and sliders that respond like real hardware — every change is logged, signed and reversible.",
	},
	{
		icon: ShieldCheck,
		code: "MOD-03",
		title: "Fail-safe interlocks",
		body: "Hardware-backed emergency stops and rule interlocks halt a fleet in under 12ms. The safety-orange button is never just decoration.",
	},
	{
		icon: Waypoints,
		code: "MOD-04",
		title: "Fleet orchestration",
		body: "Group thousands of units into cells, roll firmware in waves, and watch the mesh converge node by node on a live schematic map.",
	},
	{
		icon: TerminalSquare,
		code: "MOD-05",
		title: "Wire-level console",
		body: "Drop into a monospace shell on any device. Pipe raw bus traffic, replay sessions, and script maintenance without leaving the deck.",
	},
	{
		icon: Radio,
		code: "MOD-06",
		title: "Edge-resilient mesh",
		body: "Units keep running their last signed program through outages, then reconcile state the instant the link comes back online.",
	},
];

export function Features() {
	return (
		<section id="features" className="scroll-mt-24">
			<Container>
				<SectionHeading
					eyebrow="THE SYSTEM"
					tone="alert"
					title={
						<>
							Six modules.
							<br className="hidden sm:block" /> One machined deck.
						</>
					}
					lede="Every capability is a swappable module bolted onto the same chassis — provision only what your floor needs, upgrade the rest later."
				/>

				<motion.ul
					variants={stagger}
					initial="hidden"
					whileInView="show"
					viewport={inView}
					className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
				>
					{FEATURES.map((f) => {
						const Icon = f.icon;
						return (
							<motion.li key={f.code} variants={slideUp}>
								<Panel
									as="article"
									hover
									screws
									vents
									className="group h-full p-7 pt-8"
								>
									<div className="mb-5 flex items-center justify-between">
										<IconHousing size={56}>
											<Icon
												size={26}
												strokeWidth={1.5}
												className="text-accent transition-transform duration-200 ease-mech group-hover:rotate-[12deg] group-hover:scale-110"
											/>
										</IconHousing>
										<MonoLabel className="!text-[0.6rem] text-label/70">
											{f.code}
										</MonoLabel>
									</div>
									<h3 className="emboss text-xl font-bold tracking-[-0.01em] text-ink">
										{f.title}
									</h3>
									<p className="mt-2.5 max-w-[42ch] text-[0.95rem] leading-relaxed text-label">
										{f.body}
									</p>
								</Panel>
							</motion.li>
						);
					})}
				</motion.ul>
			</Container>
		</section>
	);
}
