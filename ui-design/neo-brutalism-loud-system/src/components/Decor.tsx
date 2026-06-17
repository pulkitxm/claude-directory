import { Star } from "lucide-react";

/* ----------------------------------------------------------------------------
   Primitive shape motifs — bordered squares, circles, and a 5-point star, all
   with hard shadows. Used as decorative floaters in "chaos zones". Every one
   is aria-hidden: they're texture, not content.
   -------------------------------------------------------------------------- */

type ShapeProps = { className?: string };

export function SquareShape({ className = "" }: ShapeProps) {
	return (
		<div
			aria-hidden="true"
			className={`border-4 border-neo-ink neo-shadow ${className}`}
		/>
	);
}

export function CircleShape({ className = "" }: ShapeProps) {
	return (
		<div
			aria-hidden="true"
			className={`rounded-full border-4 border-neo-ink neo-shadow ${className}`}
		/>
	);
}

export function TriangleShape({ className = "" }: ShapeProps) {
	// A bordered triangle via clip-path; the "border" reads as a black fill
	// behind a slightly smaller colored triangle.
	return (
		<div aria-hidden="true" className={`relative ${className}`}>
			<div
				className="absolute inset-0 bg-neo-ink"
				style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
			/>
			<div
				className="absolute inset-[6px] bg-neo-accent"
				style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
			/>
		</div>
	);
}

/* A spinning bordered star sticker — the recurring motif. */
export function StarSticker({
	className = "",
	bg = "bg-neo-secondary",
	spin = false,
}: {
	className?: string;
	bg?: string;
	spin?: boolean;
}) {
	return (
		<div
			aria-hidden="true"
			className={`flex items-center justify-center rounded-full border-4 border-neo-ink ${bg} neo-shadow ${spin ? "animate-spin-slow" : ""} ${className}`}
		>
			<Star className="h-1/2 w-1/2 fill-neo-ink stroke-neo-ink" strokeWidth={3} />
		</div>
	);
}
