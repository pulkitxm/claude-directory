import { STATS } from "../content";
import { useCountUp, useInView } from "../hooks";

function Stat({
	value,
	suffix,
	label,
	active,
}: {
	value: number;
	suffix: string;
	label: string;
	active: boolean;
}) {
	const n = useCountUp(value, active);
	const display = Math.round(n);
	return (
		<div className="flex flex-col items-center border-4 border-neo-ink bg-neo-bg px-4 py-8 neo-shadow-md">
			<span className="text-5xl font-bold tracking-tighter text-neo-ink sm:text-6xl">
				{display}
				<span className="text-neo-accent">{suffix}</span>
			</span>
			<span className="mt-2 text-center text-xs font-bold uppercase tracking-widest text-neo-ink/70">
				{label}
			</span>
		</div>
	);
}

/* A black color-block band with a graph-paper grid and four bordered stat
   cards that count up the moment the band scrolls into view. */
export function Stats() {
	const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4 });
	return (
		<section className="relative overflow-hidden border-b-4 border-neo-ink bg-neo-ink">
			<div
				className="neo-grid-inverted pointer-events-none absolute inset-0"
				aria-hidden="true"
			/>
			<div
				ref={ref}
				className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20"
			>
				<p className="mb-10 text-center text-sm font-bold uppercase tracking-[0.3em] text-neo-secondary">
					The Numbers Are Not Subtle Either
				</p>
				<div className="grid grid-cols-2 gap-5 sm:gap-7 lg:grid-cols-4">
					{STATS.map((s) => (
						<Stat
							key={s.label}
							value={s.value}
							suffix={s.suffix}
							label={s.label}
							active={inView}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
