import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ASSETS } from "../lib/assets";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function StoryCard() {
	const [slide, setSlide] = useState(0);

	// Alternating headline, synced with the 6s progress-bar cycle.
	useEffect(() => {
		const t = setTimeout(() => setSlide(1), 3000);
		const interval = setInterval(() => {
			setSlide(0);
			setTimeout(() => setSlide(1), 3000);
		}, 6000);
		return () => {
			clearTimeout(t);
			clearInterval(interval);
		};
	}, []);

	// 3D tilt that tracks the mouse relative to the viewport center.
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.4 });
	const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.4 });
	const rotateY = useTransform(sx, [-1, 1], [-18, 18]);
	const rotateX = useTransform(sy, [-1, 1], [12, -12]);

	useEffect(() => {
		const onMove = (e: MouseEvent) => {
			const nx = (e.clientX / window.innerWidth) * 2 - 1;
			const ny = (e.clientY / window.innerHeight) * 2 - 1;
			x.set(nx);
			y.set(ny);
		};
		window.addEventListener("mousemove", onMove);
		return () => window.removeEventListener("mousemove", onMove);
	}, [x, y]);

	return (
		<div
			className="story-card-wrap"
			style={{ marginTop: 48, perspective: 1200 }}
		>
			<motion.div
				className="story-card"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
				style={{
					width: 310,
					height: 455,
					borderRadius: 28,
					background: "#1a1a1a",
					overflow: "hidden",
					position: "relative",
					transformStyle: "preserve-3d",
					rotateX,
					rotateY,
					boxShadow:
						"0 40px 100px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(255,255,255,0.06)",
				}}
			>
				{/* Portrait */}
				<img
					src={ASSETS.person1}
					alt=""
					className="absolute inset-0 h-full w-full object-cover"
					style={{ objectPosition: "center 20%" }}
				/>

				{/* Soft-light green tint */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						mixBlendMode: "soft-light",
						background:
							"linear-gradient(160deg, rgba(220,255,90,0.65) 0%, rgba(170,230,70,0.35) 40%, rgba(80,140,40,0.25) 100%)",
						pointerEvents: "none",
					}}
				/>

				{/* Radial highlight */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						background:
							"radial-gradient(circle at 30% 15%, rgba(230,255,120,0.25), transparent 55%)",
						pointerEvents: "none",
					}}
				/>

				{/* Inset top highlight */}
				<div
					style={{
						position: "absolute",
						inset: 0,
						borderRadius: 28,
						boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
						pointerEvents: "none",
					}}
				/>

				{/* Story progress bars */}
				<div
					style={{
						position: "absolute",
						top: 24,
						left: 24,
						right: 24,
						display: "flex",
						gap: 6,
						zIndex: 20,
					}}
				>
					{(["story-bar-1", "story-bar-2"] as const).map((cls) => (
						<div
							key={cls}
							className={cls}
							style={{
								flex: 1,
								height: 3,
								borderRadius: 9999,
								background: "rgba(0,0,0,0.25)",
								overflow: "hidden",
							}}
						>
							<div
								className="story-bar-fill"
								style={{
									height: "100%",
									width: "100%",
									background: "rgba(0,0,0,0.95)",
								}}
							/>
						</div>
					))}
				</div>

				{/* Lower dark gradient */}
				<div
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						height: "55%",
						background:
							"linear-gradient(0deg, #040504 20.54%, rgba(29,37,9,0) 100%)",
						pointerEvents: "none",
					}}
				/>

				{/* Headline */}
				<motion.h3
					key={slide}
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: EASE }}
					style={{
						position: "absolute",
						left: 24,
						right: 24,
						bottom: 88,
						zIndex: 10,
						margin: 0,
						color: "#fff",
						fontSize: 38,
						lineHeight: "40px",
						letterSpacing: "-0.5px",
						textShadow: "0 2px 18px rgba(0,0,0,0.35)",
					}}
				>
					{slide === 0 ? (
						<>
							<span className="font-heading" style={{ fontWeight: 700 }}>
								Guiding
							</span>{" "}
							<span
								className="font-serif"
								style={{ fontStyle: "italic", fontWeight: 400 }}
							>
								your money
							</span>
						</>
					) : (
						<>
							<span className="font-heading" style={{ fontWeight: 700 }}>
								Building
							</span>{" "}
							<span
								className="font-serif"
								style={{ fontStyle: "italic", fontWeight: 400 }}
							>
								the future
							</span>
						</>
					)}
				</motion.h3>

				{/* Bottom action row */}
				<div
					style={{
						position: "absolute",
						left: 24,
						right: 24,
						bottom: 24,
						display: "flex",
						alignItems: "center",
						gap: 10,
						zIndex: 10,
					}}
				>
					<span
						className="font-heading"
						style={{
							background: "rgba(255,255,255,0.96)",
							color: "#0a0a0a",
							fontSize: 13,
							fontWeight: 500,
							padding: "9px 16px",
							borderRadius: 9999,
							boxShadow:
								"0 6px 18px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
						}}
					>
						Top Rated
					</span>

					{[Heart, MessageCircle].map((Icon, i) => (
						<button
							key={i}
							type="button"
							style={{
								width: 38,
								height: 38,
								borderRadius: 14,
								background: "rgba(20,20,20,0.45)",
								backdropFilter: "blur(10px)",
								WebkitBackdropFilter: "blur(10px)",
								border: "1px solid rgba(255,255,255,0.14)",
								boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
							}}
						>
							<Icon size={18} color="#fff" strokeWidth={1.8} />
						</button>
					))}
				</div>
			</motion.div>
		</div>
	);
}
