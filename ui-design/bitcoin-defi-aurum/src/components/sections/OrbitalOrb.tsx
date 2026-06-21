import { Bitcoin } from "lucide-react";
import { IconTile } from "@/components/ui/IconTile";
import { FLOAT_STATS } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * The hero centerpiece: a glowing Bitcoin orb floating in the void, wrapped in
 * two counter-rotating orbital rings, with three glass stat cards bouncing
 * around it at staggered intervals — "live" data circling digital gold.
 */
export function OrbitalOrb() {
	return (
		<div className="relative mx-auto h-[320px] w-full max-w-md animate-float md:h-[460px]">
			{/* Ambient core glow */}
			<div
				className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange opacity-25 blur-[90px] md:h-72 md:w-72"
				aria-hidden="true"
			/>

			{/* Outer spinning ring */}
			<div
				className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-[spin_18s_linear_infinite] rounded-full border border-orange/30 md:h-96 md:w-96"
				aria-hidden="true"
			>
				<span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-gold shadow-gold" />
				<span className="absolute -bottom-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-orange" />
			</div>

			{/* Middle ring (reverse) */}
			<div
				className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-[spin_14s_linear_infinite_reverse] rounded-full border border-dashed border-white/15 md:h-72 md:w-72"
				aria-hidden="true"
			>
				<span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-orange shadow-glow" />
			</div>

			{/* Inner ring */}
			<div
				className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-[spin_10s_linear_infinite] rounded-full border border-gold/25 md:h-52 md:w-52"
				aria-hidden="true"
			>
				<span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-gold shadow-gold" />
			</div>

			{/* The core orb */}
			<div
				className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-orange/40 bg-gradient-to-br from-burnt via-orange to-gold shadow-glow-lg md:h-36 md:w-36"
				aria-hidden="true"
			>
				{/* Glass sheen */}
				<div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/10 to-white/30 opacity-60" />
				{/* Fine inner grid for the "engineered" feel */}
				<div className="absolute inset-2 overflow-hidden rounded-full bg-grid-fine opacity-30" />
				<Bitcoin
					className="relative h-12 w-12 text-void drop-shadow md:h-16 md:w-16"
					strokeWidth={2}
				/>
			</div>

			{/* Floating glass stat cards */}
			<FloatingStat
				stat={FLOAT_STATS[0]}
				className="left-0 top-4 animate-[float-soft_6s_ease-in-out_infinite] md:-left-6"
			/>
			<FloatingStat
				stat={FLOAT_STATS[1]}
				className="bottom-6 right-0 [animation-delay:1.2s] animate-[drift_5s_ease-in-out_infinite] md:-right-4"
			/>
			<FloatingStat
				stat={FLOAT_STATS[2]}
				className="bottom-2 left-2 [animation-delay:0.6s] animate-[float-soft_7s_ease-in-out_infinite] md:left-6"
			/>
		</div>
	);
}

function FloatingStat({
	stat,
	className,
}: {
	stat: (typeof FLOAT_STATS)[number];
	className?: string;
}) {
	return (
		<div
			className={cn(
				"absolute w-44 rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur-lg",
				"shadow-[0_0_30px_-12px_rgba(247,147,26,0.4)]",
				className,
			)}
		>
			<div className="flex items-center gap-2.5">
				<IconTile
					icon={stat.icon}
					tone={stat.tone}
					className="h-9 w-9 p-2"
					glowOnGroupHover={false}
				/>
				<div className="min-w-0">
					<p className="truncate font-mono text-[0.6rem] uppercase tracking-widest text-stardust">
						{stat.label}
					</p>
					<p className="truncate font-heading text-sm font-semibold text-white">
						{stat.value}
					</p>
				</div>
			</div>
			<div className="mt-2 flex items-center justify-between">
				<span className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
					<span className="block h-full w-2/3 rounded-full bg-gradient-to-r from-burnt to-gold" />
				</span>
				<span
					className={cn(
						"font-mono text-[0.65rem] font-medium",
						stat.tone === "gold" ? "text-gold" : "text-orange",
					)}
				>
					{stat.delta}
				</span>
			</div>
		</div>
	);
}
