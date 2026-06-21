import { Fragment } from "react";
import { cn } from "@/lib/utils";

export interface TickerItem {
	label: string;
	value: string;
	/** Mark a stat as "breaking" to give it the red badge treatment. */
	breaking?: boolean;
}

/**
 * Breaking-news crawl. Black bar, white type, red badges — a stock-ticker /
 * newsroom wire built from pure CSS translation (no marquee dependency) so the
 * project stays self-contained. The track is duplicated and shifted -50% for a
 * seamless infinite loop; hovering the bar pauses the crawl to read a figure.
 */
export function Ticker({
	items,
	className,
	speed = "animate-ticker",
}: {
	items: TickerItem[];
	className?: string;
	speed?: "animate-ticker" | "animate-ticker-slow";
}) {
	const Row = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
		<div
			aria-hidden={ariaHidden || undefined}
			className={cn(
				"flex shrink-0 items-stretch whitespace-nowrap",
				speed,
				"group-hover:[animation-play-state:paused]",
			)}
		>
			{items.map((item, i) => (
				<Fragment key={`${item.label}-${i}`}>
					<span className="flex items-center gap-3 px-7 py-3.5">
						{item.breaking && (
							<span className="bg-editorial px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-paper">
								Wire
							</span>
						)}
						<span className="font-serif text-lg font-bold tabular-nums tracking-tight">
							{item.value}
						</span>
						<span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-neutral-400">
							{item.label}
						</span>
					</span>
					<span aria-hidden className="self-center text-neutral-600">
						&#x2727;
					</span>
				</Fragment>
			))}
		</div>
	);

	return (
		<div
			className={cn(
				"group flex overflow-hidden border-y-4 border-ink bg-ink text-paper",
				className,
			)}
			role="marquee"
			aria-label="Live editorial wire"
		>
			<Row />
			<Row ariaHidden />
		</div>
	);
}
