"use client";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A parametric extension of the canonical NestedSquares component.
 *
 * The shipped studio drives this so its instrument panel can retune the live
 * specimen — count, growth, spin, tempo, stagger and palette — while the
 * untouched `NestedSquares` in `bloom.tsx` stays byte-faithful to the prompt.
 * The animation math (padding = step * (i+1), staggered delay = i * stagger,
 * scale/rotate loop with repeatType "reverse") mirrors the original exactly.
 */
export interface BloomStops {
	id: string;
	label: string;
	stops: [string, string, string, string, string];
}

export interface BloomLabProps {
	count: number;
	scale: number;
	rotate: number;
	duration: number;
	stagger: number;
	step: number;
	angle: number;
	palette: BloomStops;
	className?: string;
}

export function BloomLab({
	count,
	scale,
	rotate,
	duration,
	stagger,
	step,
	angle,
	palette,
	className,
}: BloomLabProps) {
	const squares = Array.from({ length: count }, (_, i) => i);
	const reduce = useReducedMotion();
	const gradient = `linear-gradient(${angle}deg, ${palette.stops.join(", ")}) 1`;

	return (
		<div
			className={cn(
				"relative flex h-96 w-96 items-center justify-center",
				className,
			)}
		>
			{squares.map((index) => {
				const padding = (index + 1) * step;
				const delay = index * stagger;

				return (
					<motion.div
						key={index}
						className="absolute border-2 border-transparent"
						style={{
							padding: `${padding}px`,
							borderImage: gradient,
							willChange: "transform",
						}}
						initial={reduce ? false : { scale: 0, rotate: 0 }}
						animate={
							reduce
								? { scale: scale * 0.6, rotate: rotate / 2 }
								: { scale, rotate }
						}
						transition={
							reduce
								? { duration: 0.6, ease: "easeOut" }
								: {
										duration,
										delay,
										ease: "easeInOut",
										repeat: Infinity,
										repeatType: "reverse",
									}
						}
					/>
				);
			})}
		</div>
	);
}
