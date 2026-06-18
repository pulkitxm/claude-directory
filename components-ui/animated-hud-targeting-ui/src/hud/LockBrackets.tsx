import { motion } from "framer-motion";

interface LockBracketsProps {
	/** when true the four brackets snap inward to clamp the target */
	locked: boolean;
	color: string;
}

const CORNERS = [
	{ x: 0, y: 0, h: 1, v: 1 }, // top-left
	{ x: 1, y: 0, h: -1, v: 1 }, // top-right
	{ x: 0, y: 1, h: 1, v: -1 }, // bottom-left
	{ x: 1, y: 1, h: -1, v: -1 }, // bottom-right
] as const;

/** Four L-brackets that converge on the locked target with a snap. */
export function LockBrackets({ locked, color }: LockBracketsProps) {
	const arm = 26;
	const out = locked ? 0 : 22; // how far the brackets sit from their clamped pose
	return (
		<div className="absolute inset-[18%] pointer-events-none" aria-hidden>
			{CORNERS.map((c, i) => (
				<motion.svg
					key={i}
					width="40"
					height="40"
					className="absolute"
					style={{
						left: c.x === 0 ? 0 : "auto",
						right: c.x === 1 ? 0 : "auto",
						top: c.y === 0 ? 0 : "auto",
						bottom: c.y === 1 ? 0 : "auto",
					}}
					initial={false}
					animate={{
						x: c.h * out,
						y: c.v * out,
						opacity: locked ? 1 : 0.35,
					}}
					transition={{ type: "spring", stiffness: 420, damping: 26 }}
				>
					<path
						d={
							c.x === 0
								? c.y === 0
									? `M2 ${arm} V2 H${arm}`
									: `M2 ${40 - arm} V38 H${arm}`
								: c.y === 0
									? `M38 ${arm} V2 H${40 - arm}`
									: `M38 ${40 - arm} V38 H${40 - arm}`
						}
						fill="none"
						stroke={color}
						strokeWidth={locked ? 2.4 : 1.4}
						strokeLinecap="round"
						style={{ filter: locked ? `drop-shadow(0 0 6px ${color})` : "none" }}
					/>
				</motion.svg>
			))}
		</div>
	);
}
