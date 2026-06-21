import { motion } from "motion/react";
import {
	PlugZap,
	ScanLine,
	SlidersHorizontal,
	Rocket,
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

type Step = { n: string; icon: LucideIcon; title: string; body: string };

const STEPS: Step[] = [
	{
		n: "01",
		icon: PlugZap,
		title: "Plug the bridge in",
		body: "Snap the SX-1 bridge onto any RS-485, CAN or Modbus bus. It auto-detects every device on the line.",
	},
	{
		n: "02",
		icon: ScanLine,
		title: "Map the floor",
		body: "Units stream their schematics up automatically. The deck builds a live, labelled map of your machines.",
	},
	{
		n: "03",
		icon: SlidersHorizontal,
		title: "Wire the controls",
		body: "Bind gauges, knobs and interlocks to signals with drag-and-drop. Test against a live mirror first.",
	},
	{
		n: "04",
		icon: Rocket,
		title: "Ship & monitor",
		body: "Roll the program out in signed waves and watch telemetry confirm each node before the next goes live.",
	},
];

export function HowItWorks() {
	return (
		<section id="how" className="scroll-mt-24">
			<Container>
				<SectionHeading
					eyebrow="ASSEMBLY · 4 STEPS"
					tone="warning"
					title="From crate to control in an afternoon"
					lede="No rip-and-replace. SCHEMATIC bolts onto the buses you already run and is driving live hardware before the coffee's cold."
				/>

				<div className="relative mt-16">
					{/* The cylindrical connector pipe — desktop only */}
					<div
						aria-hidden="true"
						className="absolute left-0 right-0 top-7 hidden px-[12.5%] md:block"
					>
						<div
							className="h-3 w-full rounded-full bg-recessed"
							style={{
								boxShadow:
									"inset 0 1px 3px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.7)",
							}}
						/>
					</div>

					<motion.ol
						variants={stagger}
						initial="hidden"
						whileInView="show"
						viewport={inView}
						className="relative grid gap-10 md:grid-cols-4 md:gap-6"
					>
						{STEPS.map((s) => {
							const Icon = s.icon;
							return (
								<motion.li
									key={s.n}
									variants={slideUp}
									className="flex flex-col items-center text-center"
								>
									{/* node */}
									<div className="relative z-10 mb-5">
										<IconHousing size={56}>
											<Icon
												size={24}
												strokeWidth={1.5}
												className="text-accent"
											/>
										</IconHousing>
										{/* step number bezel */}
										<span
											className="stamp absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-accent text-[0.6rem] text-white"
											style={{
												boxShadow:
													"var(--shadow-glow), inset 1px 1px 0 rgba(255,255,255,0.3)",
											}}
										>
											{s.n}
										</span>
									</div>
									<Panel className="w-full p-6">
										<h3 className="emboss text-base font-bold text-ink">
											{s.title}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-label">
											{s.body}
										</p>
									</Panel>
								</motion.li>
							);
						})}
					</motion.ol>
				</div>

				<div className="mt-10 flex justify-center">
					<MonoLabel tone="online">AVG. TIME-TO-FIRST-SIGNAL: 3H 41M</MonoLabel>
				</div>
			</Container>
		</section>
	);
}
