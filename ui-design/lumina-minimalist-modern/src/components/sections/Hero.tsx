import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HeroGraphic } from "./HeroGraphic";
import { fadeInUp, stagger } from "@/lib/motion";

const LOGOS = ["Northwind", "Quanta", "Vertex", "Helio", "Monarch"];

export function Hero() {
	return (
		<section id="top" className="relative overflow-hidden pb-24 pt-36 md:pt-44">
			{/* Atmospheric radial glows at the section corners */}
			<div
				aria-hidden
				className="pointer-events-none absolute -left-40 -top-24 h-[36rem] w-[36rem] rounded-full bg-accent/[0.07] blur-[150px]"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute -right-32 top-40 h-[30rem] w-[30rem] rounded-full bg-accent-secondary/[0.06] blur-[150px]"
			/>

			<div className="mx-auto max-w-6xl px-5">
				<motion.div
					variants={stagger}
					initial="hidden"
					animate="visible"
					className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8"
				>
					{/* Text column (subtly dominant) */}
					<div>
						<motion.div variants={fadeInUp}>
							<SectionLabel pulse>Now in public beta</SectionLabel>
						</motion.div>

						<motion.h1
							variants={fadeInUp}
							className="mt-6 font-display text-[2.75rem] leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-[5.25rem]"
						>
							Product clarity,
							<br className="hidden sm:block" /> made{" "}
							<span className="relative inline-block">
								<span className="gradient-text">effortless</span>
								<span aria-hidden className="gradient-underline" />
							</span>
						</motion.h1>

						<motion.p
							variants={fadeInUp}
							className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
						>
							Lumina turns raw product events into a single, calm overview.
							Track the metrics that matter, surface insights automatically, and
							ship with confidence — without drowning in dashboards.
						</motion.p>

						<motion.div
							variants={fadeInUp}
							className="mt-9 flex flex-col gap-3 sm:flex-row"
						>
							<Button size="lg" className="w-full sm:w-auto">
								Start free
								<ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
							</Button>
							<Button variant="outline" size="lg" className="w-full sm:w-auto">
								<Play className="h-4 w-4 fill-current" />
								Watch the tour
							</Button>
						</motion.div>

						<motion.div variants={fadeInUp} className="mt-12">
							<p className="font-mono text-xs uppercase tracking-label text-muted-foreground">
								Trusted by teams at
							</p>
							<div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
								{LOGOS.map((name) => (
									<span
										key={name}
										className="text-base font-semibold tracking-tight text-foreground/35 transition-colors hover:text-foreground/70"
									>
										{name}
									</span>
								))}
							</div>
						</motion.div>
					</div>

					{/* Animated abstract graphic — hidden on small screens */}
					<motion.div
						variants={fadeInUp}
						className="hidden lg:block"
						aria-hidden
					>
						<HeroGraphic />
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
