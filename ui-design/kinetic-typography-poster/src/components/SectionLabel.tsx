type SectionLabelProps = {

	index: string;
	children: string;
};


export function SectionLabel({ index, children }: SectionLabelProps) {
	return (
		<div className="flex items-center gap-4 text-xs uppercase tracking-widest text-muted-foreground md:text-sm">
			<span className="inline-block h-3 w-3 bg-acid" aria-hidden="true" />
			<span className="font-bold text-bone">[{index}]</span>
			<span>{children}</span>
		</div>
	);
}
