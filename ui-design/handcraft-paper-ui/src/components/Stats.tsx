import { useEffect, useRef, useState } from "react";
import { useReveal } from "../lib/reveal";
import { blobRadii } from "../lib/tokens";

type Stat = {
	value: number;
	suffix?: string;
	prefix?: string;
	label: string;
	tone: "card" | "postit" | "accent" | "pen";
};

const STATS: Stat[] = [
	{ value: 12, suffix: "k+", label: "boards started", tone: "card" },
	{ value: 480, suffix: "k", label: "sticky notes stuck", tone: "postit" },
	{ value: 98, suffix: "%", label: "felt more creative", tone: "pen" },
	{
		value: 0,
		prefix: "",
		suffix: " rules",
		label: "to learn first",
		tone: "accent",
	},
];

/* Count-up that runs once the band scrolls into view. */
function useCountUp(target: number, run: boolean, ms = 1100) {
	const [n, setN] = useState(0);
	const started = useRef(false);
	useEffect(() => {
		if (!run || started.current) return;
		started.current = true;
		if (target === 0) {
			setN(0);
			return;
		}
		const reduce = window.matchMedia?.(
			"(prefers-reduced-motion: reduce)",
		).matches;
		if (reduce) {
			setN(target);
			return;
		}
		const start = performance.now();
		let raf = 0;
		const tick = (t: number) => {
			const p = Math.min(1, (t - start) / ms);
			const eased = 1 - Math.pow(1 - p, 3);
			setN(Math.round(target * eased));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [run, target, ms]);
	return n;
}

const toneClasses: Record<Stat["tone"], string> = {
	card: "bg-card text-ink",
	postit: "bg-postit text-ink",
	pen: "bg-pen text-white",
	accent: "bg-accent text-white",
};

function StatBlob({
	stat,
	run,
	index,
}: {
	stat: Stat;
	run: boolean;
	index: number;
}) {
	const n = useCountUp(stat.value, run);
	const tilt = index % 2 === 0 ? "-rotate-2" : "rotate-2";
	return (
		<li className="flex flex-col items-center gap-3 text-center">
			<span
				className={
					"grid h-24 w-24 place-items-center border-[3px] border-ink shadow-[var(--shadow-hard)] transition-transform duration-100 hover:rotate-0 md:h-32 md:w-32 " +
					toneClasses[stat.tone] +
					" " +
					tilt
				}
				style={{ borderRadius: blobRadii[index % blobRadii.length] }}
			>
				<span className="font-[var(--font-marker)] text-2xl font-bold leading-none md:text-3xl">
					{stat.prefix}
					{n}
					{stat.suffix}
				</span>
			</span>
			<span className="max-w-[8rem] text-base text-ink/70 md:text-lg">
				{stat.label}
			</span>
		</li>
	);
}

export function Stats() {
	const { ref, shown } = useReveal<HTMLDivElement>();
	return (
		<section className="px-6 py-16">
			<div
				ref={ref}
				className="mx-auto max-w-5xl border-2 border-dashed border-ink/60 bg-card/60 px-6 py-10"
				style={{ borderRadius: "40px 14px 40px 14px / 14px 40px 14px 40px" }}
			>
				<ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
					{STATS.map((s, i) => (
						<StatBlob key={s.label} stat={s} run={shown} index={i} />
					))}
				</ul>
			</div>
		</section>
	);
}
