import type { MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInViewAnimation } from "../hooks/useInViewAnimation";
import Button from "./Button";

const SPAWN_INTERVAL_MS = 80;
const TRAIL_LIFETIME_MS = 1000;

const AVATAR = "./assets/pexels-415829.jpg";

interface TrailItem {
	id: number;
	x: number;
	y: number;
	rotation: number;
	src: string;
}

interface PartnerSectionProps {
	images: string[];
}

export default function PartnerSection({ images }: PartnerSectionProps) {
	const { ref, animationClass } = useInViewAnimation<HTMLElement>();
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [trail, setTrail] = useState<TrailItem[]>([]);
	const lastSpawnRef = useRef(0);
	const nextIdRef = useRef(0);
	const imageIndexRef = useRef(0);
	const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

	useEffect(() => {
		const timeouts = timeoutsRef.current;
		return () => {
			timeouts.forEach(clearTimeout);
			timeouts.clear();
		};
	}, []);

	const handleMouseMove = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			const container = containerRef.current;
			if (!container || images.length === 0) return;

			const now = performance.now();
			if (now - lastSpawnRef.current < SPAWN_INTERVAL_MS) return;
			lastSpawnRef.current = now;

			const rect = container.getBoundingClientRect();
			const item: TrailItem = {
				id: nextIdRef.current++,
				x: event.clientX - rect.left,
				y: event.clientY - rect.top,
				rotation: Math.random() * 20 - 10,
				src: images[imageIndexRef.current % images.length],
			};
			imageIndexRef.current += 1;

			setTrail((items) => [...items, item]);

			const timeout = setTimeout(() => {
				timeoutsRef.current.delete(timeout);
				setTrail((items) => items.filter((t) => t.id !== item.id));
			}, TRAIL_LIFETIME_MS);
			timeoutsRef.current.add(timeout);
		},
		[images],
	);

	return (
		<section ref={ref} className="w-full px-6 py-12">
			<div
				ref={containerRef}
				onMouseMove={handleMouseMove}
				className={`relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-white py-48 text-center shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.06)] ${animationClass}`}
				style={{ animationDelay: "0.1s" }}
			>
				{trail.map((item) => (
					<img
						key={item.id}
						src={item.src}
						alt=""
						aria-hidden="true"
						className="animate-trail-fade pointer-events-none absolute z-0 w-36 rounded-lg shadow-lg"
						style={
							{
								left: `${item.x}px`,
								top: `${item.y}px`,
								"--trail-rotation": `${item.rotation.toFixed(1)}deg`,
							} as React.CSSProperties
						}
					/>
				))}

				<div className="pointer-events-none relative z-10">
					<h2 className="mb-12 font-serif text-[48px] leading-[1.05] text-[#0D212C] md:text-[64px] lg:text-[80px]">
						Partner with us
					</h2>
					<Button
						variant="primary"
						href="https://halaskastudio.com/./book"
						className="pointer-events-auto py-2 pl-2"
					>
						<img
							src={AVATAR}
							alt=""
							aria-hidden="true"
							className="h-10 w-10 rounded-full object-cover"
						/>
						Start chat with Viktor
					</Button>
				</div>
			</div>
		</section>
	);
}
