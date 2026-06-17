type SectionLabelProps = {
	/** Two-digit index marker, e.g. "01". */
	index: string;
	children: string;
};

/**
 * The small, tracked-wide, uppercase eyebrow that tags every section. An acid
 * square + index marker on the left makes it read like a printed poster's
 * section number.
 */
export function SectionLabel({ index, children }: SectionLabelProps) {
	return (
		<div className="flex items-center gap-4 text-xs uppercase tracking-widest text-muted-foreground md:text-sm">
			<span className="inline-block h-3 w-3 bg-acid" aria-hidden="true" />
			<span className="font-bold text-bone">[{index}]</span>
			<span>{children}</span>
		</div>
	);
}
