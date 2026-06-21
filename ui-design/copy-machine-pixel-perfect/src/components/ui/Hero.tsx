import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import { TraceField } from "@/components/ui/TraceField";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
	hidden: {},
	show: {
		transition: { staggerChildren: 0.08, delayChildren: 0.15 },
	},
};

const item = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export function Hero() {
	return (
		<section
			id="top"
			className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-28 sm:pt-32"
		>
			{/* signature: the live autorouter board behind everything */}
			<TraceField />

			{/* substrate vignette to keep copy legible */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_45%,transparent,rgba(7,12,15,0.72)_72%,#070C0F)]"
			/>

			<motion.div
				variants={container}
				initial="hidden"
				animate="show"
				className="mx-auto flex max-w-4xl flex-col items-center text-center"
			>
				<motion.a
					variants={item}
					href="#workflow"
					className="group mb-7 inline-flex items-center gap-2 rounded-full border border-substrate-500/70 bg-substrate-800/60 py-1 pl-1.5 pr-3 text-xs backdrop-blur-sm"
				>
					<span className="inline-flex items-center gap-1.5 rounded-full bg-mask/15 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-mask-bright">
						<span className="h-1.5 w-1.5 animate-pad-pulse rounded-full bg-mask-bright" />
						v4.2
					</span>
					<span className="font-medium text-silk-dim transition-colors group-hover:text-silk">
						Real-time DRC is now live
					</span>
					<ArrowRight className="h-3.5 w-3.5 text-silk-faint transition-transform group-hover:translate-x-0.5 group-hover:text-silk" />
				</motion.a>

				<motion.h1
					variants={item}
					className="text-balance font-display text-[2.7rem] font-bold leading-[0.98] tracking-tightest text-silk sm:text-6xl md:text-[4.6rem]"
				>
					Route the board.
					<br />
					<span className="text-copper-foil">Ship the hardware.</span>
				</motion.h1>

				<motion.p
					variants={item}
					className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-silk-dim sm:text-lg"
				>
					Foundry is the browser-native board studio for hardware teams. Lay out
					copper, run a continuous design-rule check, simulate signal integrity,
					and order assembled boards — without leaving the canvas.
				</motion.p>

				<motion.div
					variants={item}
					className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
				>
					<a
						href="#cta"
						className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-copper px-6 py-3.5 text-sm font-semibold text-substrate-900 transition-all hover:bg-copper-bright hover:shadow-pad sm:w-auto"
					>
						Start a board — free
						<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
					</a>
					<a
						href="#showcase"
						className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-substrate-500/80 bg-substrate-800/50 px-6 py-3.5 text-sm font-semibold text-silk backdrop-blur-sm transition-colors hover:border-copper/40 hover:bg-substrate-700/60 sm:w-auto"
					>
						<Play className="h-3.5 w-3.5 fill-current text-mask-bright" />
						Watch a layout
					</a>
				</motion.div>

				<motion.div
					variants={item}
					className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-silk-faint"
				>
					<ShieldCheck className="h-3.5 w-3.5 text-mask" />
					No card required · 2-layer boards free forever
				</motion.div>
			</motion.div>

			{/* live status strip pinned to the board bottom */}
			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.9, ease }}
				className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-5 rounded-full border border-substrate-500/70 bg-substrate-900/70 px-5 py-2 font-mono text-[11px] tracking-wide text-silk-dim backdrop-blur-md sm:flex"
			>
				<span className="flex items-center gap-1.5">
					<span className="h-1.5 w-1.5 rounded-full bg-mask-bright shadow-mask-glow" />
					DRC: 0 errors
				</span>
				<span className="h-3 w-px bg-substrate-500" />
				<span className="text-copper">4 layers</span>
				<span className="h-3 w-px bg-substrate-500" />
				<span>0.1mm / 0.1mm</span>
				<span className="h-3 w-px bg-substrate-500" />
				<span className="text-signal">42 nets routed</span>
			</motion.div>
		</section>
	);
}
