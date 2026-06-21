/**
 * Serif ornament rule between major sections — three widely-tracked asterisks,
 * the classic printer's "asterism" used to break passages of type.
 */
export function OrnamentDivider({ label }: { label?: string }) {
	return (
		<div className="border-y border-ink bg-paper py-7 text-center">
			<div className="flex items-center justify-center gap-4">
				<span aria-hidden className="h-px w-12 bg-ink/40 sm:w-24" />
				<span className="font-serif text-xl tracking-[0.9em] text-ink/50">
					&#x2727;&#x2727;&#x2727;
				</span>
				<span aria-hidden className="h-px w-12 bg-ink/40 sm:w-24" />
			</div>
			{label && (
				<p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.4em] text-ink/45">
					{label}
				</p>
			)}
		</div>
	);
}
