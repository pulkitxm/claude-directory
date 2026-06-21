import { motion } from "framer-motion";
import { ArrowRight, Sprout, Star } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Blob } from "./Blob";
import { HeroBotanical } from "./Botanical";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";

/**
 * Above-the-fold hero. Two drifting blurred blobs wash the page in moss and
 * clay; a staggered blur-up cascade brings in the eyebrow, headline, copy and
 * CTAs; the foraged-jar illustration floats on the right inside its own soft
 * blob frame with a slow sway.
 */
export function Hero() {
	const reduced = useReducedMotion();

	const container = {
		hidden: {},
		show: {
			transition: { staggerChildren: 0.12, delayChildren: 0.05 },
		},
	};
	const item = reduced
		? { hidden: { opacity: 1 }, show: { opacity: 1 } }
		: {
				hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
				show: {
					opacity: 1,
					y: 0,
					filter: "blur(0px)",
					transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
				},
			};

	return (
		<section
			id="top"
			className="relative overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pt-20 lg:px-8"
		>
			{/* ambient blobs */}
			<Blob
				shape={1}
				color="bg-primary/20"
				className="-left-24 top-10 h-[28rem] w-[28rem]"
				animate={!reduced}
			/>
			<Blob
				shape={2}
				color="bg-secondary/20"
				className="-right-20 top-40 h-[26rem] w-[26rem]"
				animate={!reduced}
			/>
			<Blob
				shape={3}
				color="bg-accent/50"
				className="bottom-0 left-1/3 h-72 w-72"
				animate={!reduced}
			/>

			<div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
				{/* copy column */}
				<motion.div
					variants={container}
					initial="hidden"
					animate="show"
					className="max-w-2xl text-center lg:text-left"
				>
					<motion.div variants={item}>
						<Eyebrow
							className="shadow-soft"
							icon={<Sprout size={14} className="text-primary" />}
						>
							Foraged in season · est. 2014
						</Eyebrow>
					</motion.div>

					<motion.h1
						variants={item}
						className="mt-6 text-balance text-5xl font-semibold leading-[1.02] text-foreground md:text-7xl"
					>
						Tea the way the{" "}
						<span className="relative whitespace-nowrap italic text-primary">
							meadow
							<svg
								className="absolute -bottom-2 left-0 w-full text-secondary/70"
								viewBox="0 0 200 14"
								fill="none"
								preserveAspectRatio="none"
								aria-hidden
							>
								<path
									d="M2 9C40 3 80 3 118 7c30 3 58 2 80-3"
									stroke="currentColor"
									strokeWidth="3.5"
									strokeLinecap="round"
								/>
							</svg>
						</span>{" "}
						intended it.
					</motion.h1>

					<motion.p
						variants={item}
						className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground lg:mx-0"
					>
						Verdant is a tiny apothecary of hand-foraged, slowly cured botanical
						blends — built around feelings, not flavour charts. Steeped for
						stillness, packed in paper, planted back into the earth.
					</motion.p>

					<motion.div
						variants={item}
						className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
					>
						<Button size="lg" className="group">
							Begin the ritual
							<ArrowRight
								size={19}
								className="transition-transform duration-300 ease-organic group-hover:translate-x-1"
							/>
						</Button>
						<Button size="lg" variant="outline">
							Explore the apothecary
						</Button>
					</motion.div>

					{/* trust strip */}
					<motion.div
						variants={item}
						className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
					>
						<div className="flex -space-x-3" aria-hidden>
							{["#5D7052", "#C18C5D", "#A8743F", "#475640"].map((c, i) => (
								<span
									key={i}
									className="grid h-10 w-10 place-items-center rounded-full border-2 border-background font-serif text-sm font-bold text-primary-foreground"
									style={{ background: c }}
								>
									{["M", "I", "S", "K"][i]}
								</span>
							))}
						</div>
						<div className="text-center sm:text-left">
							<div className="flex items-center justify-center gap-1 sm:justify-start">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star
										key={i}
										size={15}
										className="fill-secondary text-secondary"
									/>
								))}
							</div>
							<p className="mt-0.5 text-sm font-semibold text-muted-foreground">
								Loved by <span className="text-foreground">3,400+</span> slow
								mornings
							</p>
						</div>
					</motion.div>
				</motion.div>

				{/* illustration column */}
				<motion.div
					initial={
						reduced ? false : { opacity: 0, scale: 0.92, filter: "blur(10px)" }
					}
					animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
					transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
					className="relative mx-auto w-full max-w-md"
				>
					{/* soft blob frame behind */}
					<div className="absolute inset-4 -z-10 bg-card shadow-float blob-1" />
					<div className={`relative ${reduced ? "" : "animate-sway"}`}>
						<HeroBotanical className="h-auto w-full drop-shadow-[0_18px_40px_rgba(93,112,82,0.18)]" />
					</div>

					{/* floating spec chips */}
					<div className="absolute -left-2 top-10 rounded-2xl border border-border/60 bg-card/90 px-4 py-2.5 shadow-soft backdrop-blur-sm sm:-left-6">
						<p className="text-xs font-bold uppercase tracking-wider text-secondary">
							Whole leaf
						</p>
						<p className="font-serif text-base font-semibold text-foreground">
							No dust, ever
						</p>
					</div>
					<div className="absolute -right-1 bottom-14 rounded-2xl border border-border/60 bg-card/90 px-4 py-2.5 shadow-soft backdrop-blur-sm sm:-right-4">
						<p className="text-xs font-bold uppercase tracking-wider text-secondary">
							Returns to soil
						</p>
						<p className="font-serif text-base font-semibold text-foreground">
							100% compostable
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
