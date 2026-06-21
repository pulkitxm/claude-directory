import { motion } from "framer-motion";
import { MousePointerClick, MoveDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
	return (
		<section
			id="top"
			className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center"
		>
			{/* ambient atmosphere */}
			<div className="bg-linegrid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_72%)] animate-grid-drift opacity-60" />
			<div className="pointer-events-none absolute left-1/2 top-[22%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-iris/20 blur-[120px]" />
			<div className="pointer-events-none absolute left-1/2 top-[20%] h-[18rem] w-[40rem] -translate-x-1/2 rounded-full bg-ember/10 blur-[140px]" />

			<motion.div
				initial={{ opacity: 0, y: 14 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease }}
				className="relative z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-soft/60 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-white/60 backdrop-blur"
			>
				<MousePointerClick className="h-3.5 w-3.5 text-iris-bright" />
				framer-motion · useScroll + useTransform
			</motion.div>

			<motion.h1
				initial={{ opacity: 0, y: 18 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease, delay: 0.05 }}
				className="relative z-10 mt-6 max-w-4xl font-display text-[clamp(2.6rem,7vw,5.4rem)] font-bold leading-[0.98] tracking-tight text-white text-balance"
			>
				The product card that
				<br />
				<span className="relative inline-block">
					<span className="bg-gradient-to-r from-iris-bright via-white to-ember bg-clip-text text-transparent">
						stands up as you scroll
					</span>
				</span>
			</motion.h1>

			<motion.p
				initial={{ opacity: 0, y: 18 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease, delay: 0.12 }}
				className="relative z-10 mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-white/55 md:text-base"
			>
				A drop-in{" "}
				<code className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[13px] text-iris-bright">
					{"<ContainerScroll>"}
				</code>{" "}
				primitive. Scroll progress drives a perspective tilt from 20° to flat, a
				gentle scale, and a rising heading — so any screenshot, dashboard, or
				live UI you nest inside rises to meet the reader.
			</motion.p>

			<motion.div
				initial={{ opacity: 0, y: 18 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7, ease, delay: 0.18 }}
				className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3"
			>
				<a
					href="#stages"
					className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0b0c10] transition hover:bg-iris-bright"
				>
					Scroll the stages
				</a>
				<a
					href="#install"
					className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
				>
					Install in 3 steps
				</a>
			</motion.div>

			{/* scroll cue */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.9, duration: 0.6 }}
				className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35"
			>
				scroll
				<motion.span
					animate={{ y: [0, 6, 0] }}
					transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
				>
					<MoveDown className="h-4 w-4 text-iris" />
				</motion.span>
			</motion.div>
		</section>
	);
}
