import { cn } from "../lib/cn";

type BlobProps = {
	/** Picks one of the organic radius presets. */
	shape?: 1 | 2 | 3 | 4;
	/** Tailwind colour class, e.g. "bg-primary/20". */
	color: string;
	className?: string;
	/** Disable the slow ambient drift (e.g. on reduced motion at call site). */
	animate?: boolean;
};

// Each preset pairs an organic radius with its morph keyframe. The morph
// animates `border-radius`; the drift (translate/scale) lives on a separate
// wrapper element so the two CSS `animation` shorthands never overwrite each
// other (a single element can only run one `animation` declaration).
const shapes = {
	1: "blob-1 animate-morph-a",
	2: "blob-2 animate-morph-b",
	3: "blob-3 animate-morph-a",
	4: "blob-4 animate-morph-b",
} as const;

/**
 * A large, soft, blurred colour wash — the ambient atmosphere behind hero,
 * features, product and CTA sections. Absolutely positioned by the caller via
 * `className`. The outer element owns position + the slow ambient drift; the
 * inner element owns the colour, blur and the morphing organic radius.
 */
export function Blob({
	shape = 1,
	color,
	className,
	animate = true,
}: BlobProps) {
	return (
		<div
			aria-hidden
			className={cn(
				"pointer-events-none absolute",
				animate && "animate-drift",
				className,
			)}
		>
			<div className={cn("h-full w-full blur-3xl", color, shapes[shape])} />
		</div>
	);
}
