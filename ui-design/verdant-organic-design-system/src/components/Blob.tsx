import { cn } from "../lib/cn";

type BlobProps = {

	shape?: 1 | 2 | 3 | 4;

	color: string;
	className?: string;

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
