import { Shell, Blob } from "./primitives";
import { STATS } from "../lib/content";
import { useCountUp } from "../lib/useCountUp";

function Stat({ value, label }: { value: string; label: string }) {
	const { ref, text } = useCountUp<HTMLParagraphElement>(value);
	return (
		<div className="text-center">
			<p
				ref={ref}
				className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
			>
				{text}
			</p>
			<p className="mt-2 text-sm font-medium text-indigo-200">{label}</p>
		</div>
	);
}

/* A dark indigo band — count-up metrics on the brand gradient ground. The
   inverted section gives the page rhythm and shows the palette at full saturation. */
export function Stats() {
	return (
		<section aria-label="Northwind by the numbers" className="py-12 sm:py-16">
			<Shell>
				<div className="on-dark relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 px-6 py-12 shadow-lift sm:px-10 sm:py-14">
					<Blob
						tone="violet"
						className="-right-20 -top-20 h-72 w-72 !from-white/20 !to-white/0 opacity-80"
					/>
					<Blob
						tone="indigo"
						slow
						className="-bottom-24 -left-16 h-72 w-72 !from-white/10 !to-white/0 opacity-70"
					/>
					<div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
						{STATS.map((s) => (
							<Stat key={s.label} value={s.value} label={s.label} />
						))}
					</div>
				</div>
			</Shell>
		</section>
	);
}
