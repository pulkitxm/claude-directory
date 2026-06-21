import { motion } from "motion/react";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { Blob, Square, Shell, ButtonLink } from "./primitives";
import { fadeUp, stagger } from "../lib/motion";

/* HERO — vibrant Blue full-section color block. Big decorative geometry behind
   a bold typographic headline, paired with an abstract flat-shape composition.
   This is the "poster". */
export function Hero() {
	return (
		<section
			id="top"
			className="on-color relative overflow-hidden bg-[var(--color-brand)] text-white"
		>
			{/* Decorative geometry — solid flat shapes, low opacity, no blur. */}
			<Blob className="-right-32 -top-40 h-[34rem] w-[34rem] bg-white/10" />
			<Blob className="-bottom-44 -left-32 h-[30rem] w-[30rem] bg-[var(--color-brand-deep)]/60" />
			<Square
				rotate={18}
				className="right-[8%] top-24 h-40 w-40 bg-[var(--color-sun)]/30"
			/>
			<Square
				rotate={-14}
				className="left-[4%] bottom-24 h-28 w-28 bg-white/10"
			/>
			<Blob className="left-[40%] top-10 h-16 w-16 bg-[var(--color-grass)]/40" />

			<Shell className="relative grid items-center gap-14 py-20 lg:grid-cols-12 lg:py-28">
				{/* Copy */}
				<motion.div
					variants={stagger}
					initial="hidden"
					animate="show"
					className="lg:col-span-7"
				>
					<motion.div variants={fadeUp}>
						<span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
							<Sparkles size={15} strokeWidth={2.5} />
							Flat design system v1.0
						</span>
					</motion.div>

					<motion.h1
						variants={fadeUp}
						className="mt-6 text-[clamp(2.75rem,7vw,5.25rem)] font-extrabold leading-[0.92] tracking-[-0.03em]"
					>
						Design with
						<br />
						<span className="text-[var(--color-sun)]">zero artifice.</span>
					</motion.h1>

					<motion.p
						variants={fadeUp}
						className="mt-6 max-w-xl text-lg leading-relaxed text-blue-50 sm:text-xl"
					>
						A confidently reductive design system. No shadows, no fake depth, no
						gradients — just bold color blocks, geometric purity, and typography
						that carries the entire hierarchy.
					</motion.p>

					<motion.div
						variants={fadeUp}
						className="mt-9 flex flex-col gap-3.5 sm:flex-row"
					>
						<ButtonLink
							href="#pricing"
							size="lg"
							variant="secondary"
							className="!bg-white !text-[var(--color-brand)] hover:!bg-blue-50 group"
						>
							Start building
							<ArrowRight
								size={20}
								strokeWidth={2.5}
								className="transition-transform duration-200 group-hover:translate-x-1"
							/>
						</ButtonLink>
						<ButtonLink href="#features" size="lg" variant="outline-light">
							Explore the system
						</ButtonLink>
					</motion.div>

					<motion.ul
						variants={fadeUp}
						className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-sm font-medium text-blue-50"
					>
						{["No shadows, ever", "WCAG AA contrast", "Fully tokenized"].map(
							(t) => (
								<li key={t} className="flex items-center gap-2">
									<span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[var(--color-brand)]">
										<Check size={13} strokeWidth={3} />
									</span>
									{t}
								</li>
							),
						)}
					</motion.ul>
				</motion.div>

				{/* Abstract flat-shape composition (the "illustration"). */}
				<motion.div
					initial={{ opacity: 0, scale: 0.94 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
					className="lg:col-span-5"
				>
					<FlatComposition />
				</motion.div>
			</Shell>
		</section>
	);
}

/* Pure flat geometry assembled into a balanced poster composition. Every shape
   is solid color with consistent radii — overlap creates interest, not depth. */
function FlatComposition() {
	return (
		<div className="relative mx-auto aspect-square w-full max-w-md">
			{/* Backdrop card */}
			<div className="absolute inset-0 rounded-lg bg-white" />
			{/* Header bar */}
			<div className="absolute left-6 right-6 top-6 flex items-center gap-2">
				<span className="h-3 w-3 rounded-full bg-[var(--color-brand)]" />
				<span className="h-3 w-3 rounded-full bg-[var(--color-sun)]" />
				<span className="h-3 w-3 rounded-full bg-[var(--color-grass)]" />
				<span className="ml-2 h-3 flex-1 rounded-full bg-[var(--color-fog)]" />
			</div>

			{/* Big tile + circle */}
			<motion.div
				animate={{ y: [0, -10, 0] }}
				transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
				className="absolute left-6 top-20 h-40 w-40 rounded-lg bg-[var(--color-brand)]"
			/>
			<motion.div
				animate={{ y: [0, 12, 0] }}
				transition={{
					duration: 6,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 0.4,
				}}
				className="absolute right-6 top-20 h-[4.5rem] w-[4.5rem] rounded-full bg-[var(--color-sun)]"
			/>
			<div className="absolute right-6 top-44 h-[4.5rem] w-[10.5rem] rounded-lg bg-[var(--color-grass)]" />

			{/* Type-scale bars */}
			<div className="absolute bottom-20 left-6 right-6 space-y-3">
				<div className="h-5 w-3/4 rounded bg-[var(--color-ink)]" />
				<div className="h-3 w-full rounded bg-[var(--color-fog)]" />
				<div className="h-3 w-5/6 rounded bg-[var(--color-fog)]" />
			</div>

			{/* Footer chips */}
			<div className="absolute bottom-6 left-6 right-6 flex gap-3">
				<div className="h-9 w-24 rounded-md bg-[var(--color-brand)]" />
				<div className="h-9 w-9 rounded-md border-2 border-[var(--color-hair)]" />
			</div>

			{/* Floating accent square breaking the frame */}
			<motion.div
				animate={{ rotate: [10, 18, 10] }}
				transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
				className="absolute -right-5 -top-5 h-16 w-16 rounded-lg bg-[var(--color-sun)]"
			/>
		</div>
	);
}
