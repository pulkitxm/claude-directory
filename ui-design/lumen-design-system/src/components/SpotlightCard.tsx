import { useRef, useState, type ReactNode } from "react";

type Variant = "default" | "glass" | "gradient";

interface SpotlightCardProps {
	children: ReactNode;
	className?: string;

	variant?: Variant;

	spotlightSize?: number;
}

const surfaceByVariant: Record<Variant, string> = {
	default: "bg-gradient-to-b from-white/[0.08] to-white/[0.02]",
	glass: "bg-white/[0.04] backdrop-blur-xl",
	gradient:
		"bg-gradient-to-br from-accent/[0.14] via-white/[0.04] to-white/[0.01]",
};


export function SpotlightCard({
	children,
	className = "",
	variant = "default",
	spotlightSize = 320,
}: SpotlightCardProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [pos, setPos] = useState({ x: -9999, y: -9999 });
	const [active, setActive] = useState(false);

	const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const el = ref.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	return (
		<div
			ref={ref}
			onMouseMove={onMove}
			onMouseEnter={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
			className={[
				"edge-hi group relative isolate overflow-hidden rounded-2xl",
				"border border-white/[0.06]",
				surfaceByVariant[variant],
				"shadow-card transition-[box-shadow,border-color,transform] duration-std ease-expo",
				"hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-card-hover",
				className,
			].join(" ")}
		>
			{}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-std ease-expo"
				style={{
					opacity: active ? 1 : 0,
					background: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, rgba(94,106,210,0.15), transparent 60%)`,
				}}
			/>
			<div className="relative z-10 h-full">{children}</div>
		</div>
	);
}
