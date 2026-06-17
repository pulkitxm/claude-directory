import { motion } from "motion/react";
import { Check } from "lucide-react";
import {
	Button,
	Container,
	MonoLabel,
	Panel,
	SectionHeading,
	cx,
} from "./primitives";
import { inView, slideUp, stagger } from "../lib/motion";

type Tier = {
	id: string;
	name: string;
	price: string;
	unit: string;
	blurb: string;
	features: string[];
	cta: string;
	featured?: boolean;
};

const TIERS: Tier[] = [
	{
		id: "bench",
		name: "Bench",
		price: "$0",
		unit: "/ 3 units",
		blurb: "For a single cell or a proof-of-concept on the workbench.",
		features: [
			"Up to 3 connected units",
			"Live telemetry dashboard",
			"7-day signal history",
			"Community support",
		],
		cta: "Start on the bench",
	},
	{
		id: "floor",
		name: "Floor",
		price: "$129",
		unit: "/ unit / mo",
		blurb: "For a production line running fleets of real hardware.",
		features: [
			"Unlimited connected units",
			"Fail-safe interlocks & e-stop",
			"1-year signed signal history",
			"Wire-level console access",
			"Wave firmware rollouts",
			"Priority on-call support",
		],
		cta: "Provision the floor",
		featured: true,
	},
	{
		id: "plant",
		name: "Plant",
		price: "Custom",
		unit: "/ multi-site",
		blurb: "For multi-plant operations with compliance requirements.",
		features: [
			"Everything in Floor",
			"On-prem / air-gapped deploy",
			"SSO, audit log & RBAC",
			"Dedicated solutions engineer",
			"99.99% uptime SLA",
		],
		cta: "Talk to engineering",
	},
];

export function Pricing() {
	return (
		<section id="pricing" className="scroll-mt-24">
			<Container>
				<SectionHeading
					eyebrow="PRICING · PER UNIT"
					tone="alert"
					title="Priced like a part, not a platform"
					lede="Pay for the units you put on the floor. No seat math, no surprise overage — every tier ships with the full tactile control plane."
				/>

				<motion.div
					variants={stagger}
					initial="hidden"
					whileInView="show"
					viewport={inView}
					className="mt-16 grid items-start gap-8 lg:grid-cols-3"
				>
					{TIERS.map((t) => (
						<motion.div
							key={t.id}
							variants={slideUp}
							className={cx(
								"relative",
								t.featured && "lg:-mt-4 lg:mb-4",
							)}
						>
							{/* hanging hole — punched price-tag detail */}
							<span
								aria-hidden="true"
								className="absolute left-1/2 top-3 z-10 h-3 w-10 -translate-x-1/2 rounded-full bg-recessed"
								style={{
									boxShadow:
										"inset 0 2px 4px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.6)",
								}}
							/>

							<Panel
								elevated={t.featured}
								screws
								className={cx(
									"flex h-full flex-col p-8 pt-10",
									t.featured && "ring-2 ring-accent/60",
								)}
								style={
									t.featured
										? {
												boxShadow:
													"var(--shadow-floating), 0 0 0 1px rgba(255,71,87,0.25)",
											}
										: undefined
								}
							>
								{t.featured && (
									<span
										className="stamp absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1.5 text-[0.6rem] text-white"
										style={{ boxShadow: "var(--shadow-glow)" }}
									>
										MOST&nbsp;FIELDED
									</span>
								)}

								<div className="flex items-center justify-between">
									<h3 className="text-lg font-bold text-ink">
										{t.name}
									</h3>
									<MonoLabel className="!text-[0.6rem]">
										TIER
									</MonoLabel>
								</div>

								<div className="mt-4 flex items-end gap-1.5">
									<span className="font-mono text-4xl font-bold text-ink emboss">
										{t.price}
									</span>
									<span className="stamp mb-1 text-[0.6rem] text-label">
										{t.unit}
									</span>
								</div>

								<p className="mt-3 min-h-[2.75rem] text-sm leading-relaxed text-label">
									{t.blurb}
								</p>

								<hr className="my-5 border-0 border-t border-edge-deep/30" />

								<ul className="flex flex-1 flex-col gap-3">
									{t.features.map((f) => (
										<li
											key={f}
											className="flex items-start gap-2.5 text-sm text-ink"
										>
											<span
												className={cx(
													"mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
													t.featured
														? "bg-accent"
														: "bg-chassis",
												)}
												style={{
													boxShadow: t.featured
														? "var(--shadow-glow)"
														: "var(--shadow-recessed-soft)",
												}}
											>
												<Check
													size={12}
													strokeWidth={3}
													className={
														t.featured
															? "text-white"
															: "text-accent"
													}
												/>
											</span>
											<span className="leading-snug">
												{f}
											</span>
										</li>
									))}
								</ul>

								<Button
									variant={t.featured ? "primary" : "secondary"}
									full
									size="md"
									className="mt-8"
									onClick={() =>
										document
											.querySelector("#cta")
											?.scrollIntoView({
												behavior: "smooth",
											})
									}
								>
									{t.cta}
								</Button>
							</Panel>
						</motion.div>
					))}
				</motion.div>
			</Container>
		</section>
	);
}
