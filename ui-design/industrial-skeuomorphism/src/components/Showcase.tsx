import { motion } from "motion/react";
import { Check } from "lucide-react";
import {
	Container,
	MonoLabel,
	Panel,
	SectionHeading,
} from "./primitives";
import { inView, slideIn, slideUp } from "../lib/motion";

const SPECS = [
	"IP67 die-cast aluminium enclosure, fanless to 60°C",
	"Quad-core 1.2GHz MCU with hardware-isolated safety core",
	"Signed-firmware boot chain with rollback on fault",
	"Hot-swappable I/O modules — no downtime to expand",
];

export function Showcase() {
	return (
		<section id="showcase" className="scroll-mt-24">
			<Container>
				<div
					className="relative overflow-hidden rounded-2xl bg-chassis p-7 md:p-12"
					style={{ boxShadow: "var(--shadow-card)" }}
				>
					{/* faint blueprint grid wash */}
					<div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.08]" />

					<div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
						{/* schematic image — grayscale until hovered */}
						<motion.figure
							variants={slideIn(-36)}
							initial="hidden"
							whileInView="show"
							viewport={inView}
							className="group order-2 lg:order-1"
						>
							<Panel screws className="overflow-hidden p-3">
								<div
									className="overflow-hidden rounded-md"
									style={{ boxShadow: "var(--shadow-recessed)" }}
								>
									<img
										src="/assets/blueprint-unit.svg"
										alt="Exploded engineering schematic of the SCHEMATIC SX-1 control unit, annotated with dimensions and a bill of materials"
										loading="lazy"
										width={640}
										height={480}
										className="w-full grayscale transition-all duration-500 ease-out group-hover:grayscale-0"
									/>
								</div>
								<figcaption className="mt-3 flex items-center justify-between px-1">
									<MonoLabel>DWG&nbsp;0xA417&nbsp;·&nbsp;REV&nbsp;C</MonoLabel>
									<MonoLabel tone="online">VERIFIED</MonoLabel>
								</figcaption>
							</Panel>
						</motion.figure>

						{/* copy */}
						<motion.div
							variants={slideUp}
							initial="hidden"
							whileInView="show"
							viewport={inView}
							className="order-1 flex flex-col items-start gap-5 lg:order-2"
						>
							<SectionHeading
								align="left"
								eyebrow="THE HARDWARE"
								tone="alert"
								title="Engineered like the machines it commands"
								lede="The SX-1 bridge is built to industrial spec — sealed, signed, and serviceable. It's the tactile core every SCHEMATIC deck is mounted on."
							/>

							<ul className="mt-1 flex w-full flex-col gap-3">
								{SPECS.map((s) => (
									<li
										key={s}
										className="flex items-start gap-3 rounded-md bg-chassis p-3"
										style={{
											boxShadow:
												"var(--shadow-recessed-soft)",
										}}
									>
										<span
											className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent"
											style={{
												boxShadow:
													"var(--shadow-glow)",
											}}
										>
											<Check
												size={13}
												strokeWidth={3}
												className="text-white"
											/>
										</span>
										<span className="text-[0.95rem] leading-snug text-ink">
											{s}
										</span>
									</li>
								))}
							</ul>
						</motion.div>
					</div>
				</div>
			</Container>
		</section>
	);
}
