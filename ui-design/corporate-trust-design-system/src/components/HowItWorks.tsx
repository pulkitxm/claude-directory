import { Section, Shell, Eyebrow, Reveal, RevealGroup } from "./primitives";
import { STEPS } from "../lib/content";
import { fadeUp } from "../lib/motion";
import { motion } from "motion/react";
import { Route } from "lucide-react";

/* Three-step path. Numbered badges carry the brand gradient + an ethereal glow;
   a dashed connector ties the steps together on desktop. */
export function HowItWorks() {
	return (
		<Section id="how" className="relative overflow-hidden">
			<Shell>
				<Reveal className="mx-auto max-w-2xl text-center">
					<Eyebrow icon={Route}>From zero to shipped</Eyebrow>
					<h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">
						Live in an afternoon,{" "}
						<span className="text-gradient">not a quarter</span>
					</h2>
					<p className="mx-auto mt-5 max-w-xl text-lg text-slate-500">
						No implementation project, no services contract. Three steps and
						your first workflow is running against real data.
					</p>
				</Reveal>

				<div className="relative mt-16">
					{/* Dashed connector behind the badges (desktop). */}
					<div
						aria-hidden="true"
						className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-indigo-200 md:block"
					/>
					<RevealGroup
						className="grid gap-10 md:grid-cols-3 md:gap-8"
						stag={0.14}
					>
						{STEPS.map((step, i) => (
							<motion.div
								key={step.title}
								variants={fadeUp}
								className="relative text-center"
							>
								<div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-extrabold text-white shadow-glow ring-4 ring-white">
									{i + 1}
								</div>
								<h3 className="mt-6 text-xl font-bold text-slate-900">
									{step.title}
								</h3>
								<p className="mx-auto mt-2.5 max-w-xs text-[0.9375rem] leading-relaxed text-slate-500">
									{step.body}
								</p>
							</motion.div>
						))}
					</RevealGroup>
				</div>
			</Shell>
		</Section>
	);
}
