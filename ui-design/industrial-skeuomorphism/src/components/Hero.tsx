import { motion } from "motion/react";
import { ArrowRight, Wrench } from "lucide-react";
import { DeviceMockup } from "./DeviceMockup";
import { slideUp, stagger } from "../lib/motion";
import { Badge, Button, Container, MonoLabel } from "./primitives";

const CHIPS = [
	{ value: "12ms", label: "ACTUATION" },
	{ value: "99.99%", label: "UPTIME SLA" },
	{ value: "4.2k", label: "UNITS FIELDED" },
];

export function Hero() {
	return (
		<section id="top" className="relative overflow-hidden pt-14 pb-20 md:pt-24 md:pb-28">
			{/* lighting hotspot, top-left, reinforcing the light source */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full"
				style={{
					background:
						"radial-gradient(circle, rgba(255,255,255,0.7), transparent 65%)",
				}}
			/>
			<Container>
				<motion.div
					variants={stagger}
					initial="hidden"
					animate="show"
					className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10"
				>
					{/* LEFT — copy (≈60%) */}
					<div className="flex flex-col items-start gap-6">
						<motion.div variants={slideUp}>
							<Badge tone="online">SX-1 · SYSTEM OPERATIONAL</Badge>
						</motion.div>

						<motion.h1
							variants={slideUp}
							className="emboss text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] text-ink md:text-[4.4rem] md:leading-[0.98]"
						>
							Control the
							<br />
							physical world,
							<br />
							<span className="relative inline-block text-accent">
								bolt&nbsp;by&nbsp;bolt
								<svg
									className="absolute -bottom-2 left-0 w-full"
									height="10"
									viewBox="0 0 200 10"
									preserveAspectRatio="none"
									aria-hidden="true"
								>
									<path
										d="M2 7 Q 50 2 100 6 T 198 4"
										fill="none"
										stroke="#ff4757"
										strokeWidth="3"
										strokeLinecap="round"
									/>
								</svg>
							</span>
							.
						</motion.h1>

						<motion.p
							variants={slideUp}
							className="max-w-[56ch] text-lg leading-relaxed text-label"
						>
							SCHEMATIC is the machined control plane for hardware
							fleets. Provision actuators, stream telemetry, and ship
							firmware from one tactile deck — engineered to feel as
							solid as the machines it runs.
						</motion.p>

						<motion.div
							variants={slideUp}
							className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
						>
							<Button
								size="lg"
								full
								className="sm:w-auto"
								onClick={() =>
									document
										.querySelector("#cta")
										?.scrollIntoView({ behavior: "smooth" })
								}
							>
								Provision a Unit
								<ArrowRight size={16} strokeWidth={2.5} />
							</Button>
							<Button
								variant="secondary"
								size="lg"
								full
								className="sm:w-auto"
								onClick={() =>
									document
										.querySelector("#how")
										?.scrollIntoView({ behavior: "smooth" })
								}
							>
								<Wrench size={16} strokeWidth={2} />
								See the Assembly
							</Button>
						</motion.div>

						{/* mini spec chips, recessed */}
						<motion.dl
							variants={slideUp}
							className="mt-2 grid w-full grid-cols-3 gap-3 sm:max-w-md"
						>
							{CHIPS.map((c) => (
								<div
									key={c.label}
									className="flex flex-col items-center gap-1 rounded-md bg-chassis px-2 py-3 text-center"
									style={{
										boxShadow: "var(--shadow-recessed-soft)",
									}}
								>
									<dd className="font-mono text-lg font-bold text-ink">
										{c.value}
									</dd>
									<dt className="stamp text-[0.55rem] text-label">
										{c.label}
									</dt>
								</div>
							))}
						</motion.dl>
					</div>

					{/* RIGHT — device (≈40%) */}
					<motion.div
						variants={{
							hidden: { opacity: 0, x: 40, scale: 0.96 },
							show: {
								opacity: 1,
								x: 0,
								scale: 1,
								transition: {
									duration: 0.7,
									ease: [0.175, 0.885, 0.32, 1.275],
									delay: 0.15,
								},
							},
						}}
						className="relative mx-auto w-full max-w-[24rem] lg:max-w-none"
					>
						<DeviceMockup />
						{/* floating status tag */}
						<div
							className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-lg bg-chassis px-3 py-2 sm:flex"
							style={{ boxShadow: "var(--shadow-floating)" }}
						>
							<MonoLabel tone="online">LIVE&nbsp;FEED</MonoLabel>
						</div>
					</motion.div>
				</motion.div>
			</Container>
		</section>
	);
}
