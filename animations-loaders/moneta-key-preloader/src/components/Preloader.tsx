import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import PreloaderNumberArc from "./PreloaderNumberArc";

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const BG = "#080B14";
const DESIGN_WIDTH = 1394;
const DESIGN_HEIGHT = 938;

// Assets are vendored locally under /public/assets so the project is fully
// self-contained and runnable offline (no qclay.design hotlinks at runtime).
const ASSET = (name: string) => `./assets/${name}`;

/* ------------------------------------------------------------------ */
/* Triangle helper for the wave-cut logo mask                          */
/* ------------------------------------------------------------------ */

interface Triangle {
	width: number;
	height: number;
	offsetY: number;
}

// Downward-pointing triangle centred at x=24, tip at the bottom.
const triPath = (t: Triangle) => {
	const x1 = 24 - t.width / 2;
	const x2 = 24 + t.width / 2;
	const yTop = t.offsetY;
	const yTip = t.offsetY + t.height;
	return `M${x1} ${yTop}L24 ${yTip}L${x2} ${yTop}L${x1} ${yTop}Z`;
};

/* ------------------------------------------------------------------ */
/* OrbitDot — defined as a reusable helper, not rendered in the main   */
/* composition. A small glowing dot with a 20px trailing gradient that */
/* rotates around an (optionally rotated) ellipse via rAF.             */
/* ------------------------------------------------------------------ */

interface OrbitDotProps {
	rx: number;
	ry: number;
	rotateDeg: number;
	duration: number;
	size: number;
	opacity: number;
	trailOpacity: number;
	startOffset?: number;
}

export const OrbitDot = ({
	rx,
	ry,
	rotateDeg,
	duration,
	size,
	opacity,
	trailOpacity,
	startOffset = 0,
}: OrbitDotProps) => {
	const [angle, setAngle] = useState(startOffset * Math.PI * 2);

	useEffect(() => {
		let raf = 0;
		const start = performance.now();
		const tick = (t: number) => {
			const elapsed = (t - start) / 1000;
			const a = startOffset * Math.PI * 2 + (elapsed / duration) * Math.PI * 2;
			setAngle(a);
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [duration, startOffset]);

	const x = Math.cos(angle) * rx;
	const y = Math.sin(angle) * ry;
	const rad = (rotateDeg * Math.PI) / 180;
	const rotX = x * Math.cos(rad) - y * Math.sin(rad);
	const rotY = x * Math.sin(rad) + y * Math.cos(rad);
	const trailAngle = (Math.atan2(rotY, rotX) * 180) / Math.PI;

	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: `translate(${rotX}px, ${rotY}px)`,
				pointerEvents: "none",
			}}
		>
			{/* 20px trailing gradient, pointing back along the direction of travel */}
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					width: 20,
					height: size,
					transform: `translate(-100%, -50%) rotate(${trailAngle}deg)`,
					transformOrigin: "100% 50%",
					borderRadius: size,
					background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${trailOpacity}) 100%)`,
				}}
			/>
			{/* the dot itself with a soft glow */}
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					width: size,
					height: size,
					transform: "translate(-50%, -50%)",
					borderRadius: "50%",
					background: `rgba(255,255,255,${opacity})`,
					boxShadow: `0 0 8px rgba(200,210,255,${opacity})`,
				}}
			/>
		</div>
	);
};

/* ------------------------------------------------------------------ */
/* Bouncing-dot palette                                                */
/* ------------------------------------------------------------------ */

const dotColors = [
	"rgba(255,255,255,0.70)",
	"rgba(255,255,255,0.55)",
	"rgba(255,255,255,0.55)",
	"rgba(255,255,255,0.70)",
];

/* ------------------------------------------------------------------ */
/* Preloader                                                           */
/* ------------------------------------------------------------------ */

const Preloader = () => {
	const [progress, setProgress] = useState(0);
	const [runId] = useState(0);
	const [mounted] = useState(true);
	const [scale, setScale] = useState(1);
	const [tri1] = useState<Triangle>({
		width: 22.8,
		height: 24.4,
		offsetY: 0.2,
	});
	const [tri2] = useState<Triangle>({
		width: 26.3,
		height: 25.51,
		offsetY: 23.5,
	});

	/* Particle field — generated once. */
	const particles = useMemo(
		() =>
			Array.from({ length: 30 }, () => ({
				top: Math.random() * 100,
				left: Math.random() * 100,
				opacity: 0.1 + Math.random() * 0.2,
				duration: 3 + Math.random() * 4,
				delay: Math.random() * 4,
			})),
		[],
	);

	/* Responsive uniform scale of the 1394×938 design canvas. */
	useEffect(() => {
		const update = () =>
			setScale(
				Math.min(
					window.innerWidth / DESIGN_WIDTH,
					window.innerHeight / DESIGN_HEIGHT,
				),
			);
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	/* Non-linear, realistic progress driver: bursts, stalls and crawls. */
	useEffect(() => {
		setProgress(0);
		let cancelled = false;
		let current = 0;

		const segments: { to: number; delay: number; duration: number }[] = [];
		let acc = 0;
		while (acc < 100) {
			const r = Math.random();
			let chunk: number;
			if (r < 0.15)
				chunk = 1 + Math.random() * 3; // tiny stall-ish
			else if (r < 0.85)
				chunk = 4 + Math.random() * 12; // normal
			else chunk = 14 + Math.random() * 18; // burst
			acc = Math.min(100, acc + chunk);
			const delay = 40 + Math.random() * 220;
			const duration = 120 + Math.random() * 380;
			segments.push({ to: acc, delay, duration });
		}

		const animateSegment = (i: number) => {
			if (cancelled || i >= segments.length) return;
			const seg = segments[i];
			setTimeout(() => {
				if (cancelled) return;
				const from = current;
				const start = performance.now();
				const step = (t: number) => {
					if (cancelled) return;
					const k = Math.min(1, (t - start) / seg.duration);
					const eased = 1 - (1 - k) ** 2; // easeOut quadratic
					const value = from + (seg.to - from) * eased;
					current = value;
					setProgress(value);
					if (k < 1) requestAnimationFrame(step);
					else {
						current = seg.to;
						setProgress(seg.to);
						animateSegment(i + 1);
					}
				};
				requestAnimationFrame(step);
			}, seg.delay);
		};

		animateSegment(0);
		return () => {
			cancelled = true;
		};
	}, []);

	return (
		<AnimatePresence>
			{mounted && (
				<motion.div
					key="preloader"
					className="flex flex-col items-center justify-center"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
					transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
					style={{
						position: "fixed",
						inset: 0,
						zIndex: 9999,
						background: BG,
						overflow: "hidden",
						fontFamily: "'Inter Tight', sans-serif",
					}}
				>
					{/* ============ SCALED DESIGN CANVAS (1394×938) ============ */}
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							width: DESIGN_WIDTH,
							height: DESIGN_HEIGHT,
							transform: `translate(-50%, -50%) scale(${scale})`,
							transformOrigin: "center center",
						}}
					>
						{/* LAYER 1 — inner radial bloom (small, blue-violet) */}
						<div
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								width: 600,
								height: 600,
								borderRadius: "50%",
								background:
									"radial-gradient(circle, rgba(100,120,255,0.12) 0%, rgba(80,60,180,0.06) 40%, transparent 70%)",
								pointerEvents: "none",
							}}
						/>

						{/* LAYER 2 — outer radial bloom (large, deep blue) */}
						<div
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								width: 900,
								height: 900,
								borderRadius: "50%",
								background:
									"radial-gradient(circle, rgba(60,80,200,0.06) 0%, transparent 65%)",
								pointerEvents: "none",
							}}
						/>

						{/* LAYER 3 — particle field (30 twinkling dots) */}
						<div
							style={{
								position: "absolute",
								inset: 0,
								zIndex: 0,
								pointerEvents: "none",
							}}
						>
							{particles.map((p, i) => (
								<motion.div
									key={i}
									style={{
										position: "absolute",
										top: `${p.top}%`,
										left: `${p.left}%`,
										width: 1.5,
										height: 1.5,
										borderRadius: "50%",
										background: `rgba(255,255,255,${p.opacity})`,
									}}
									animate={{ opacity: [0.05, 0.25, 0.05] }}
									transition={{
										duration: p.duration,
										delay: p.delay,
										repeat: Infinity,
										ease: "easeInOut",
									}}
								/>
							))}
						</div>

						{/* LAYER 6 — circels.svg (behind the sphere) */}
						<img
							src={ASSET("circels.svg")}
							alt=""
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								width: 766,
								height: 766,
								zIndex: -2,
								pointerEvents: "none",
							}}
						/>

						{/* LAYER 7 — line-c-1 (centered) */}
						<div
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								zIndex: -1,
								pointerEvents: "none",
							}}
						>
							<motion.img
								src={ASSET("line-c-1.svg")}
								alt=""
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
								style={{ display: "block" }}
							/>
						</div>

						{/* LAYER 8 — line-c-2 (centered) */}
						<div
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								zIndex: -1,
								pointerEvents: "none",
							}}
						>
							<motion.img
								src={ASSET("line-c-2.svg")}
								alt=""
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
								style={{ display: "block" }}
							/>
						</div>

						{/* LAYER 9 — line-c-3 (top-centered) */}
						<div
							style={{
								position: "absolute",
								top: 0,
								left: "50%",
								transform: "translateX(-50%)",
								zIndex: -1,
								pointerEvents: "none",
							}}
						>
							<motion.img
								src={ASSET("line-c-3.svg")}
								alt=""
								initial={{ opacity: 0, y: -30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
								style={{ display: "block" }}
							/>
						</div>

						{/* LAYER 5 — dashed orbit line with front-fade mask */}
						<div
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								width: 840,
								height: 420,
								marginLeft: -420,
								marginTop: -210,
								zIndex: 2,
								pointerEvents: "none",
							}}
						>
							<svg
								viewBox="0 0 1044 356"
								preserveAspectRatio="none"
								style={{
									position: "absolute",
									inset: 0,
									width: "100%",
									height: "100%",
									overflow: "visible",
								}}
							>
								<defs>
									<linearGradient
										id="lineDrawGradient"
										x1="0%"
										y1="0%"
										x2="100%"
										y2="0%"
									>
										<stop offset="0%" stopColor="rgba(255,255,255,0)" />
										<stop offset="50%" stopColor="rgba(220,225,255,0.95)" />
										<stop offset="100%" stopColor="rgba(255,255,255,0)" />
									</linearGradient>
									<linearGradient
										id="lineFrontFadeGradient"
										x1="0"
										y1="0"
										x2="0"
										y2="1"
										gradientUnits="objectBoundingBox"
									>
										<stop offset="0%" stopColor="#000" />
										<stop offset="40%" stopColor="#000" />
										<stop offset="58%" stopColor="#fff" />
										<stop offset="100%" stopColor="#fff" />
									</linearGradient>
									<mask
										id="lineFrontFadeMask"
										maskUnits="userSpaceOnUse"
										x={-200}
										y={-200}
										width={1444}
										height={800}
									>
										<rect
											x={-200}
											y={-200}
											width={1444}
											height={800}
											fill="url(#lineFrontFadeGradient)"
										/>
									</mask>
								</defs>
								<g mask="url(#lineFrontFadeMask)">
									<motion.path
										key={`linepath-${runId}`}
										d="M1042.76 35.8838C1058.87 95.0224 838.678 206.483 550.956 284.839C263.235 363.194 16.9353 378.772 0.830078 319.634C-15.2752 260.495 204.913 149.034 492.634 70.6789C780.355 -7.67647 1026.66 -23.2548 1042.76 35.8838Z"
										fill="none"
										stroke="url(#lineDrawGradient)"
										strokeWidth={1}
										strokeLinecap="round"
										pathLength={1}
										initial={{ strokeDashoffset: 0 }}
										animate={{ strokeDashoffset: [0, -1.45] }}
										transition={{
											duration: 5,
											delay: 1.6,
											repeat: Infinity,
											repeatDelay: 0,
											ease: "linear",
										}}
										style={{
											strokeDasharray: "0.45 1",
											filter: "drop-shadow(0 0 4px rgba(200,210,255,0.6))",
										}}
									/>
								</g>
							</svg>
						</div>

						{/* LAYER 4 — sphere (sphere-3.png) */}
						<motion.img
							src={ASSET("sphere-3.png")}
							alt=""
							initial={{ scale: 0.85, opacity: 0, filter: "blur(12px)" }}
							animate={{
								scale: [1, 1.025, 1],
								opacity: 0.7,
								filter: "blur(0px)",
							}}
							transition={{
								scale: {
									duration: 4,
									repeat: Infinity,
									ease: "easeInOut",
									delay: 1.4,
								},
								opacity: { duration: 1.4, delay: 2, ease: "easeOut" },
								filter: { duration: 1.4, delay: 2, ease: "easeOut" },
							}}
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								width: 433,
								height: 394,
								marginLeft: -216.5,
								marginTop: -197,
								objectFit: "contain",
								zIndex: 1,
								pointerEvents: "none",
								mixBlendMode: "color-dodge",
							}}
						/>

						{/* LAYER 10 — logo + wordmark block */}
						<div
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -60%)",
								zIndex: 3,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: 16,
							}}
						>
							{/* logo + halo */}
							<div style={{ position: "relative", width: 80, height: 80 }}>
								<motion.div
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.8, delay: 0.3 }}
									style={{
										position: "absolute",
										inset: -20,
										borderRadius: "50%",
										background:
											"radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 65%)",
										zIndex: -1,
										pointerEvents: "none",
									}}
								/>
								<motion.svg
									viewBox="0 0 48 48"
									preserveAspectRatio="xMidYMid meet"
									initial={{ opacity: 0, y: -12 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
									style={{
										position: "absolute",
										inset: 0,
										width: "100%",
										height: "100%",
										overflow: "visible",
									}}
								>
									<defs>
										<mask
											id="logoCutMask"
											maskUnits="userSpaceOnUse"
											x={0}
											y={0}
											width={48}
											height={48}
										>
											<rect x={0} y={0} width={48} height={48} fill="white" />
											<motion.path
												key={`tri1-${tri1.width}-${tri1.height}-${tri1.offsetY}`}
												d={triPath(tri1)}
												fill="black"
												initial={{ y: -tri1.height, opacity: 0 }}
												animate={{
													y: [
														-tri1.height,
														-tri1.height,
														0,
														0,
														60,
														60,
														-tri1.height,
													],
													opacity: [0, 1, 1, 1, 1, 0, 0],
												}}
												transition={{
													duration: 3,
													times: [0, 0.02, 0.183, 0.617, 0.767, 0.787, 1],
													ease: [
														"linear",
														"easeInOut",
														"linear",
														"easeIn",
														"linear",
														"linear",
													],
													repeat: Infinity,
													repeatDelay: 0,
												}}
											/>
											<motion.path
												key={`tri2-${tri2.width}-${tri2.height}-${tri2.offsetY}`}
												d={triPath(tri2)}
												fill="black"
												initial={{ y: -tri2.height, opacity: 0 }}
												animate={{
													y: [
														-tri2.height,
														-tri2.height,
														-tri2.height,
														0,
														0,
														60,
														60,
														-tri2.height,
													],
													opacity: [0, 0, 1, 1, 1, 1, 0, 0],
												}}
												transition={{
													duration: 3,
													times: [
														0, 0.183, 0.203, 0.367, 0.617, 0.767, 0.787, 1,
													],
													ease: [
														"linear",
														"linear",
														"easeInOut",
														"linear",
														"easeIn",
														"linear",
														"linear",
													],
													repeat: Infinity,
													repeatDelay: 0,
												}}
											/>
										</mask>
									</defs>
									<image
										href={ASSET("full-logo.svg")}
										x={0}
										y={0}
										width={48}
										height={48}
										preserveAspectRatio="xMidYMid meet"
										mask="url(#logoCutMask)"
									/>
								</motion.svg>
							</div>

							{/* wordmark */}
							<motion.div
								initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
								animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
								transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
								style={{
									fontFamily: "'Inter Tight', sans-serif",
									fontSize: 13,
									fontWeight: 400,
									letterSpacing: "5px",
									color: "rgba(255,255,255,0.75)",
									textAlign: "center",
								}}
							>
								MONETA KEY
							</motion.div>
						</div>

						{/* LAYER 11 — number arc */}
						<PreloaderNumberArc key={runId} progress={progress} />

						{/* LAYER 12 — bouncing dots */}
						<div
							style={{
								position: "absolute",
								bottom: 107,
								left: "50%",
								transform: "translateX(-50%)",
								zIndex: 4,
								display: "flex",
								alignItems: "center",
								gap: 7,
							}}
						>
							{dotColors.map((color, i) => (
								<motion.div
									key={i}
									animate={{ y: [-7, 0, -7] }}
									transition={{
										duration: 1.2,
										repeat: Infinity,
										ease: "easeInOut",
										delay: i * 0.18,
									}}
									style={{
										width: 7,
										height: 7,
										borderRadius: "50%",
										background: color,
									}}
								/>
							))}
						</div>
					</div>

					{/* ============ EDGE-PINNED ORNAMENTS (viewport corners) ============ */}
					<motion.img
						src={ASSET("left.svg")}
						alt=""
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
						style={{
							position: "absolute",
							bottom: 0,
							left: 0,
							zIndex: 4,
							pointerEvents: "none",
							display: "block",
						}}
					/>
					<motion.img
						src={ASSET("right.svg")}
						alt=""
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
						style={{
							position: "absolute",
							bottom: 0,
							right: 0,
							zIndex: 4,
							pointerEvents: "none",
							display: "block",
						}}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Preloader;
