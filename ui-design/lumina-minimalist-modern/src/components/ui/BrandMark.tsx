import { cn } from "@/lib/utils";

/**
 * BrandMark — the Lumina wordmark: a gradient accent glyph + the name.
 * Shared by the navbar and footer so the brand stays in one place.
 */
export function BrandMark({
	href = "#top",
	className,
}: {
	href?: string;
	className?: string;
}) {
	return (
		<a href={href} className={cn("flex items-center gap-2.5", className)}>
			<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-secondary shadow-accent">
				<span className="h-2.5 w-2.5 rounded-[3px] bg-white" />
			</span>
			<span className="text-lg font-semibold tracking-tight">Lumina</span>
		</a>
	);
}
