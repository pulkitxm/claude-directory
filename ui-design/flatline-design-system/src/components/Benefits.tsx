import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { Shell, Blob, Square, ButtonLink } from "./primitives";
import { fadeUp, stagger, reveal } from "../lib/motion";

/* BENEFITS — vibrant Emerald color block with an abstract overlapping-shape
   composition. Demonstrates a full bold-color section + geometric layering. */
const POINTS = [
	"One token file drives color, type, radius — change once, ripple everywhere.",
	"Composable primitives mean no one-off styles ever creep into the codebase.",
	"Pure-CSS motion and flat shapes keep bundles tiny and paint cheap.",
	"Print-inspired clarity that reads instantly on any screen size.",
];

export function Benefits() {
	return (
		<section className="on-color relative overflow-hidden bg-[var(--color-grass)] py-20 text-white lg:py-28">
			<Blob className="-left-32 -top-32 h-96 w-96 bg-white/10" />
			<Blob className="-bottom-40 right-[-6rem] h-[28rem] w-[28rem] bg-[var(--color-grass-deep)]/60" />
			<Square
				rotate={-12}
				className="left-[6%] bottom-16 h-24 w-24 bg-white/10"
			/>

			<Shell className="relative grid items-center gap-16 lg:grid-cols-2">
				{/* Abstract overlapping composition */}
				<motion.div
					variants={fadeUp}
					{...reveal}
					className="order-2 lg:order-1"
				>
					<AbstractStack />
				</motion.div>

				{/* Copy */}
				<motion.div
					variants={stagger}
					{...reveal}
					className="order-1 lg:order-2"
				>
					<motion.span variants={fadeUp} className="eyebrow text-emerald-100">
						Why flat wins
					</motion.span>
					<motion.h2
						variants={fadeUp}
						className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl"
					>
						Less surface area.
						<br />
						More clarity.
					</motion.h2>
					<motion.p
						variants={fadeUp}
						className="mt-5 max-w-lg text-lg leading-relaxed text-emerald-50"
					>
						When you strip away the shadows and the fake depth, what's left has
						to be right. Flatline makes the right thing the easy thing.
					</motion.p>

					<motion.ul variants={stagger} className="mt-8 space-y-4">
						{POINTS.map((p) => (
							<motion.li
								key={p}
								variants={fadeUp}
								className="flex items-start gap-3.5"
							>
								<span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-grass)]">
									<Check size={16} strokeWidth={3} />
								</span>
								<span className="text-emerald-50">{p}</span>
							</motion.li>
						))}
					</motion.ul>

					<motion.div variants={fadeUp} className="mt-9">
						<ButtonLink
							href="#how"
							variant="outline-light"
							size="lg"
							className="group"
						>
							See how it works
							<ArrowRight
								size={20}
								strokeWidth={2.5}
								className="transition-transform duration-200 group-hover:translate-x-1"
							/>
						</ButtonLink>
					</motion.div>
				</motion.div>
			</Shell>
		</section>
	);
}

/* Overlapping flat shapes — interest from composition, never depth. */
function AbstractStack() {
	return (
		<div className="relative mx-auto aspect-[5/4] w-full max-w-lg">
			<div className="absolute left-[8%] top-[10%] h-48 w-48 rounded-lg bg-white" />
			<div className="absolute right-[10%] top-0 h-32 w-32 rounded-full bg-[var(--color-sun)]" />
			<div className="absolute bottom-[8%] left-[2%] h-28 w-64 rounded-lg bg-[var(--color-brand)]" />
			<div className="absolute bottom-0 right-[6%] h-40 w-40 rounded-lg bg-[var(--color-grass-deep)]" />
			<motion.div
				animate={{ rotate: [12, 22, 12] }}
				transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
				className="absolute right-[28%] top-[34%] h-24 w-24 rounded-lg bg-white/90"
			/>
			<div className="absolute left-[40%] top-[2%] h-16 w-16 rounded-full bg-[var(--color-ink)]" />
			{/* thin connecting bars to suggest a system/grid */}
			<div className="absolute bottom-[44%] left-[20%] h-2 w-40 rounded-full bg-white/40" />
			<div className="absolute bottom-[30%] left-[34%] h-2 w-28 rounded-full bg-white/40" />
		</div>
	);
}
