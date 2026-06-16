import { motion } from "framer-motion";
import { Activity, ArrowUpRight, BarChart3, Sparkles } from "lucide-react";

/**
 * HeroGraphic — the abstract generative composition that anchors the hero.
 * Layers (back to front): radial accent wash, slow-rotating dashed ring,
 * a 3x3 dot grid, two gently-floating glass cards, a sculptural gradient
 * blob, and a solid accent corner block. Hidden on small screens.
 */
export function HeroGraphic() {
	return (
		<div className="relative mx-auto aspect-square w-full max-w-[520px]">
			{/* Atmospheric accent wash */}
			<div
				aria-hidden
				className="absolute inset-0 rounded-[3rem]"
				style={{
					background:
						"radial-gradient(60% 60% at 70% 30%, rgba(0,82,255,0.10), transparent 70%)",
				}}
			/>

			{/* Slow rotating dashed ring */}
			<motion.div
				aria-hidden
				className="absolute inset-6 rounded-full border border-dashed border-accent/25"
				animate={{ rotate: 360 }}
				transition={{ duration: 60, ease: "linear", repeat: Infinity }}
			>
				<span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-accent" />
				<span className="absolute -bottom-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent-secondary" />
			</motion.div>

			{/* Inner counter-rotating ring */}
			<motion.div
				aria-hidden
				className="absolute inset-20 rounded-full border border-border"
				animate={{ rotate: -360 }}
				transition={{ duration: 90, ease: "linear", repeat: Infinity }}
			/>

			{/* 3x3 decorative dot grid */}
			<div className="absolute bottom-10 left-8 grid grid-cols-3 gap-2.5">
				{Array.from({ length: 9 }).map((_, i) => (
					<span
						key={i}
						className="h-1.5 w-1.5 rounded-full bg-foreground/15"
					/>
				))}
			</div>

			{/* Sculptural gradient blob — the "one unexpected curve" */}
			<div className="absolute right-6 top-10 h-28 w-28 rounded-[2.5rem] rounded-tl-[5rem] bg-gradient-to-br from-accent to-accent-secondary opacity-90 shadow-accent-lg" />

			{/* Solid accent corner block */}
			<div className="absolute bottom-12 right-10 h-16 w-16 rounded-2xl bg-accent shadow-accent" />

			{/* Floating card — primary metric */}
			<motion.div
				className="absolute left-2 top-16 w-56 rounded-2xl border border-border bg-card p-5 shadow-xl sm:left-6"
				animate={{ y: [0, -10, 0] }}
				transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
			>
				<div className="flex items-center justify-between">
					<span className="font-mono text-[10px] uppercase tracking-label text-muted-foreground">
						Active users
					</span>
					<span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-secondary text-accent-foreground">
						<Activity className="h-3.5 w-3.5" />
					</span>
				</div>
				<div className="mt-2 text-3xl font-semibold tracking-tight">
					48,920
				</div>
				<div className="mt-2 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
					<ArrowUpRight className="h-3 w-3" />
					+12.4%
				</div>
			</motion.div>

			{/* Floating card — mini sparkline */}
			<motion.div
				className="absolute bottom-6 right-0 w-52 rounded-2xl border border-border bg-card p-5 shadow-xl sm:right-2"
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
			>
				<div className="flex items-center gap-2">
					<span className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background">
						<BarChart3 className="h-3.5 w-3.5" />
					</span>
					<span className="text-sm font-semibold tracking-tight">
						Conversion
					</span>
				</div>
				<div className="mt-3 flex h-12 items-end gap-1.5">
					{[40, 62, 48, 78, 56, 90, 72].map((h, i) => (
						<span
							key={i}
							className="flex-1 rounded-sm bg-gradient-to-t from-accent/40 to-accent-secondary"
							style={{ height: `${h}%` }}
						/>
					))}
				</div>
			</motion.div>

			{/* Floating pill — "live" indicator */}
			<motion.div
				className="absolute right-12 top-2 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 shadow-lg"
				animate={{ y: [0, -8, 0] }}
				transition={{
					duration: 4.5,
					ease: "easeInOut",
					repeat: Infinity,
					delay: 0.5,
				}}
			>
				<Sparkles className="h-3.5 w-3.5 text-accent" />
				<span className="text-xs font-medium">AI insights</span>
			</motion.div>
		</div>
	);
}
