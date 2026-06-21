import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
	{
		n: "01",
		title: "It comes off the wire",
		body: "Raw signal — a model release, a dataset, a dispatch — arrives on the wire and is timestamped to the millisecond at the moment of intake.",
	},
	{
		n: "02",
		title: "The fact desk sets it",
		body: "Editors source every claim, rank it against the day, and set it in cold metal type. Unattributed lines never leave the desk.",
	},
	{
		n: "03",
		title: "It runs on the page",
		body: "The story is locked into the twelve-column grid, given a standing head and a Fig. caption, and printed without a single rounded corner.",
	},
	{
		n: "04",
		title: "It stands on the record",
		body: "The edition is archived, dated, and made permanent. Corrections, when they come, run in public on page two — never quietly.",
	},
];

/**
 * The mandatory inverted section. Black ground, paper-white type, editorial-red
 * step numerals. A faint white graph texture keeps the depth; the numerals
 * carry the only colour in the whole block.
 */
export function HowItsFiled() {
	return (
		<section
			id="how-its-filed"
			className="newsprint-texture-inverted relative border-b-4 border-ink bg-ink text-paper"
		>
			<div className="relative mx-auto max-w-screen-xl px-4 py-16 lg:py-20">
				<div className="grid grid-cols-1 gap-8 border-b border-paper/20 pb-8 lg:grid-cols-12 lg:items-end">
					<div className="lg:col-span-8">
						<span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-neutral-400">
							<span className="inline-block h-2 w-2 bg-editorial" />
							Section 03 · The Process
						</span>
						<h2 className="mt-4 font-serif text-4xl font-black uppercase leading-[0.95] tracking-tight lg:text-6xl">
							How a story gets filed
						</h2>
					</div>
					<p className="font-body text-sm leading-relaxed text-neutral-400 lg:col-span-4 lg:text-right">
						From the wire to the record in four movements — the same workflow,
						run every morning before the press at four.
					</p>
				</div>

				<ol className="grid grid-cols-1 border-l border-t border-paper/20 lg:grid-cols-2">
					{STEPS.map((step, i) => (
						<Reveal
							key={step.n}
							as="li"
							delay={(i % 2) * 90}
							className="group relative border-b border-r border-paper/20 p-8 transition-colors duration-200 hover:bg-white/[0.04] lg:p-10"
						>
							<span className="font-serif text-7xl font-black leading-none tracking-tighter text-editorial lg:text-8xl">
								{step.n}
							</span>
							<h3 className="mt-5 font-serif text-2xl font-bold lg:text-3xl">
								{step.title}
							</h3>
							<p className="mt-3 max-w-md font-body text-sm leading-relaxed text-neutral-400">
								{step.body}
							</p>
							<span
								aria-hidden
								className="absolute right-8 top-8 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-paper/30"
							>
								Step
							</span>
						</Reveal>
					))}
				</ol>
			</div>
		</section>
	);
}
