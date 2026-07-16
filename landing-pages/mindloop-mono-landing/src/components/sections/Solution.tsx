import { motion } from "framer-motion";

import { fadeUp } from "@/lib/motion";

const SOLUTION_VIDEO =
	"./assets/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4";

const FEATURES = [
	{
		title: "Curated Feed",
		description:
			"A signal-first stream tuned to your curiosity, no engagement bait, no infinite noise, just writing worth your time.",
	},
	{
		title: "Writer Tools",
		description:
			"A focused editor, smart drafts, and analytics that explain resonance, everything you need to publish with intent.",
	},
	{
		title: "Community",
		description:
			"Threads that stay thoughtful. Readers and writers meet in conversations designed for depth, not dunks.",
	},
	{
		title: "Distribution",
		description:
			"Email, web, and AI-readable formats from one publish button, your words travel to wherever answers are made.",
	},
];

export function Solution() {
	return (
		<section
			id="use-cases"
			className="border-t border-border/30 px-6 py-32 md:py-44"
		>
			<div className="mx-auto max-w-6xl">
				<motion.p
					{...fadeUp(0)}
					className="text-center text-xs uppercase tracking-[3px] text-muted-foreground"
				>
					Solution
				</motion.p>

				<motion.h2
					{...fadeUp(0.1)}
					className="mt-6 text-center text-4xl font-medium tracking-[-1px] md:text-6xl"
				>
					The platform for{" "}
					<em className="font-serif font-normal italic">meaningful</em> content
				</motion.h2>

				<motion.div {...fadeUp(0.2)} className="mt-16 md:mt-20">
					<video
						className="aspect-[3/1] w-full rounded-2xl object-cover"
						src={SOLUTION_VIDEO}
						autoPlay
						loop
						muted
						playsInline
						aria-hidden
					/>
				</motion.div>

				<div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-4">
					{FEATURES.map(({ title, description }, i) => (
						<motion.article key={title} {...fadeUp(0.25 + i * 0.08)}>
							<h3 className="text-base font-semibold">{title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
								{description}
							</p>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
