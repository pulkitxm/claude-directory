import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

const assetBase = (import.meta as ImportMeta & { env: { BASE_URL: string } })
	.env.BASE_URL;
const VIDEO_SRC = `${assetBase}assets/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4`;

const NAV_LINKS = ["Products", "Docs"] as const;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
	return (
		<section className="relative w-full max-w-[1400px] mx-auto rounded-[48px] bg-white border border-slate-200/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] overflow-hidden h-[600px] flex flex-col">
			<div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
				<video
					src={VIDEO_SRC}
					autoPlay
					loop
					muted
					playsInline
					className="w-full h-full object-cover scale-105 transition-transform duration-1000"
				/>
			</div>

			<div className="relative z-20 flex-1 px-8 md:px-16 pt-12 md:pt-16 flex flex-col items-start">
				<motion.div
					initial={{ opacity: 0, y: 28 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
					className="flex flex-col items-start"
				>
					<h1 className="font-display text-[42px] md:text-[56px] font-medium tracking-tight leading-[1.08] text-[#0a1b33]">
						Foundation of the
						<br />
						new digital epoch
					</h1>
					<p className="mt-5 max-w-[440px] font-sans text-[14px] md:text-[15px] leading-relaxed text-[#64748b]">
						Designing products, powering ecosystems and laying the foundation of
						a decentralized web for enterprises, builders and communities alike.
					</p>
					<motion.button
						type="button"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.96 }}
						transition={{ type: "spring", stiffness: 400, damping: 22 }}
						className="mt-8 bg-[#0a152d] text-white rounded-full px-7 py-3 text-[13px] font-semibold tracking-wide shadow-[0_16px_32px_-12px_rgba(10,21,45,0.45)] cursor-pointer"
					>
						Contact Us
					</motion.button>
				</motion.div>
			</div>

			<div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
				<motion.nav
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.35, ease: EASE_OUT_EXPO }}
					className="flex items-center bg-white/90 backdrop-blur-2xl px-1.5 py-1.5 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200/40"
				>
					<div
						aria-hidden
						className="w-9 h-9 shrink-0 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[15px] leading-none text-[#0a1b33]"
					>
						✦
					</div>
					{NAV_LINKS.map((label) => (
						<button
							key={label}
							type="button"
							className={cn(
								"px-4 py-2 text-[12px] font-semibold text-slate-500 hover:text-[#0a1b33]",
								"transition-colors cursor-pointer",
							)}
						>
							{label}
						</button>
					))}
					<button
						type="button"
						className="ml-1 flex items-center gap-1 bg-white px-5 py-2 rounded-full text-[12px] font-semibold text-[#0a1b33] border border-slate-200/60 shadow-sm hover:border-slate-300 transition-all cursor-pointer"
					>
						Get in touch
						<ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
					</button>
				</motion.nav>
			</div>
		</section>
	);
}
