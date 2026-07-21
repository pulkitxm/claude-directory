import gsap from "gsap";
import { useEffect, useRef } from "react";

const VIDEO_SRC = `${import.meta.env.BASE_URL}assets/hf_20260510_060007_60275ce7-030c-4668-a160-8f364ec537d3.mp4`;

/**
 * Fixed full-screen video backdrop with a GSAP-driven mouse parallax.
 * The wrapper is over-scaled (1.08) so the lerped x/y drift never
 * exposes the viewport edges.
 */
export default function VideoBackground() {
	const parallaxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const videoBg = parallaxRef.current;
		if (!videoBg) return;

		let targetX = 0;
		let targetY = 0;
		let currentX = 0;
		let currentY = 0;
		let rafId = 0;

		const onMouseMove = (e: MouseEvent) => {
			const cx = window.innerWidth / 2;
			const cy = window.innerHeight / 2;
			targetX = ((e.clientX - cx) / cx) * 20;
			targetY = ((e.clientY - cy) / cy) * 20;
		};

		const tick = () => {
			currentX += (targetX - currentX) * 0.06;
			currentY += (targetY - currentY) * 0.06;
			gsap.set(videoBg, { x: currentX, y: currentY });
			rafId = requestAnimationFrame(tick);
		};

		window.addEventListener("mousemove", onMouseMove);
		rafId = requestAnimationFrame(tick);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			cancelAnimationFrame(rafId);
		};
	}, []);

	return (
		<div className="fixed inset-0 z-0" aria-hidden="true">
			<div
				ref={parallaxRef}
				className="h-full w-full origin-center scale-[1.08]"
			>
				<video
					className="h-full w-full object-cover"
					src={VIDEO_SRC}
					autoPlay
					muted
					loop
					playsInline
					onLoadedMetadata={(e) => {
						e.currentTarget.playbackRate = 1.25;
					}}
				/>
			</div>
		</div>
	);
}
