import { motion } from "motion/react";
import { Quote } from "lucide-react";
import {
	Container,
	MonoLabel,
	Panel,
	SectionHeading,
	cx,
} from "./primitives";
import { inView, slideUp, stagger } from "../lib/motion";

type Note = {
	quote: string;
	name: string;
	role: string;
	avatar: string;
	tag: string;
	tilt: string;
};

const NOTES: Note[] = [
	{
		quote:
			"We retrofitted SCHEMATIC onto a 30-year-old stamping line in a weekend. The e-stop interlocks alone paid for the year.",
		name: "Marisol Vega",
		role: "Plant Engineer · Northgate Robotics",
		avatar: "/assets/avatar-op-01.svg",
		tag: "LOG #2241",
		tilt: "-rotate-1",
	},
	{
		quote:
			"The deck feels like real hardware. My operators trust the knobs because they behave like the machines they've run for years.",
		name: "Daniel Okafor",
		role: "Ops Lead · Omni-Fab",
		avatar: "/assets/avatar-op-02.svg",
		tag: "LOG #1907",
		tilt: "rotate-1",
	},
	{
		quote:
			"Wave rollouts changed how we ship firmware. We watch each cell confirm before the next goes live — zero floor-wide outages since.",
		name: "Hannah Lindqvist",
		role: "Reliability · Helios Power",
		avatar: "/assets/avatar-op-03.svg",
		tag: "LOG #3102",
		tilt: "-rotate-1",
	},
];

export function Testimonials() {
	return (
		<section id="testimonials" className="scroll-mt-24">
			<Container>
				<SectionHeading
					eyebrow="FIELD NOTES"
					tone="warning"
					title="Pinned up by the people on the floor"
					lede="Real reports from the engineers running SCHEMATIC on live lines — straight off the maintenance board."
				/>

				<motion.ul
					variants={stagger}
					initial="hidden"
					whileInView="show"
					viewport={inView}
					className="mt-16 grid gap-8 md:grid-cols-3"
				>
					{NOTES.map((n) => (
						<motion.li
							key={n.tag}
							variants={slideUp}
							className={cx("relative", n.tilt)}
						>
							{/* red push-pin */}
							<span
								aria-hidden="true"
								className="absolute left-1/2 top-1 z-20 h-5 w-5 -translate-x-1/2 rounded-full"
								style={{
									background:
										"radial-gradient(circle at 35% 30%, #ff8a93, #ff4757 55%, #c4303c)",
									boxShadow:
										"0 4px 6px rgba(0,0,0,0.3), var(--shadow-glow)",
								}}
							>
								<span className="absolute left-[30%] top-[24%] h-1.5 w-1.5 rounded-full bg-white/80" />
							</span>

							<Panel
								as="article"
								hover
								className="flex h-full flex-col p-7 pt-9"
							>
								{/* masking-tape label */}
								<span
									aria-hidden="true"
									className="absolute -right-2 top-5 -skew-x-12 px-3 py-1 backdrop-blur-sm"
									style={{
										background: "rgba(255,230,0,0.28)",
										boxShadow:
											"0 1px 2px rgba(0,0,0,0.12)",
									}}
								>
									<span className="stamp text-[0.55rem] text-ink/70">
										{n.tag}
									</span>
								</span>

								<Quote
									size={26}
									strokeWidth={1.5}
									className="text-accent/60"
								/>
								<p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink">
									{n.quote}
								</p>

								<figcaption className="mt-6 flex items-center gap-3">
									<span
										className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-recessed"
										style={{
											boxShadow:
												"var(--shadow-recessed-soft)",
										}}
									>
										<img
											src={n.avatar}
											alt={`Portrait of ${n.name}`}
											loading="lazy"
											width={48}
											height={48}
											className="h-full w-full grayscale transition-all duration-500 ease-out hover:grayscale-0"
										/>
									</span>
									<span className="flex flex-col">
										<span className="text-sm font-bold text-ink">
											{n.name}
										</span>
										<span className="stamp text-[0.55rem] text-label">
											{n.role}
										</span>
									</span>
								</figcaption>
							</Panel>
						</motion.li>
					))}
				</motion.ul>

				<div className="mt-10 flex justify-center">
					<MonoLabel tone="online">
						4.9 / 5 AVG · 312 VERIFIED DEPLOYMENTS
					</MonoLabel>
				</div>
			</Container>
		</section>
	);
}
