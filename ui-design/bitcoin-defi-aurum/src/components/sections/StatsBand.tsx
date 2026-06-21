import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BIG_STATS, type BigStat } from "@/data/content";
import { useCountUp } from "@/lib/useCountUp";
import { cn } from "@/lib/utils";

/** Headline metrics that count up as they enter view. */
export function StatsBand() {
	return (
		<section className="relative py-20 md:py-24" aria-label="Protocol metrics">
			<div
				className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[44rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-burnt opacity-[0.07] blur-[150px]"
				aria-hidden="true"
			/>
			<Container className="relative grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
				{BIG_STATS.map((stat, i) => (
					<Reveal key={stat.label} delay={i * 90}>
						<StatItem stat={stat} />
					</Reveal>
				))}
			</Container>
		</section>
	);
}

function StatItem({ stat }: { stat: BigStat }) {
	const { value, ref } = useCountUp(stat.value, {
		decimals: stat.decimals ?? 0,
	});

	const toneClass = {
		orange: "text-gradient",
		gold: "text-gradient-burnt",
		white: "text-white",
	}[stat.tone];

	return (
		<div
			ref={ref as React.RefObject<HTMLDivElement>}
			className="flex flex-col items-center text-center"
		>
			<span
				className={cn(
					"font-heading text-4xl font-bold tabular-nums tracking-tight md:text-5xl",
					toneClass,
				)}
			>
				{stat.prefix}
				{value}
				{stat.suffix}
			</span>
			<span className="mt-3 font-mono text-xs uppercase tracking-widest text-stardust">
				{stat.label}
			</span>
		</div>
	);
}
