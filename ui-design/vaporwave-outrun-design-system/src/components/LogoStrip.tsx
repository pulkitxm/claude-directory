/* An infinite, terminal-flavored marquee of fictional synth labels — the
   "trusted by" strip. Duplicated content + translateX(-50%) loop = seamless. */

const LABELS = [
	"SUNSET.SYS",
	"OUTRUN LABS",
	"CRT//DIVISION",
	"NEON DYNAMICS",
	"GRID RUNNER",
	"VHS COLLECTIVE",
	"SYNTH CORP",
	"MIAMI 2099",
];

export function LogoStrip() {
	const row = [...LABELS, ...LABELS];
	return (
		<section className="relative z-10 border-y border-[var(--color-edge)] bg-[var(--color-void)]/60 py-6 backdrop-blur-sm">
			<div className="mb-4 text-center font-mono text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-chrome)]/40">
				&gt; trusted by operators across the grid
			</div>
			<div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
				<div className="marquee gap-12 pr-12">
					{row.map((label, i) => (
						<span
							key={i}
							className="font-heading text-lg font-bold uppercase tracking-[0.2em] text-[var(--color-chrome)]/45 transition-colors duration-200 ease-linear hover:text-[var(--color-cyan)]"
						>
							{label}
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
