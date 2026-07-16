import { motion } from "framer-motion";
import Navbar from "./Navbar";
import StoneReveal from "./StoneReveal";

// Expo-out easing for the dashboard rise — a confident, decelerating lift.
const EXPO_OUT = [0.22, 1, 0.36, 1] as const;
const BASE_URL = import.meta.env.BASE_URL;

export default function Hero() {
	return (
		<section
			className="relative min-h-screen w-full overflow-hidden"
			style={{ backgroundColor: "#F2F2F0" }}
		>
			{/* z-0 — soft top-down radial halo behind the headline */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					zIndex: 0,
					background:
						"radial-gradient(ellipse 80% 60% at 50% 30%, rgba(220,220,215,0.6) 0%, rgba(220,220,215,0) 70%)",
				}}
			/>

			{/* z-10 — centered text column */}
			<div
				className="relative flex flex-col items-center px-6 text-center pt-[90px] sm:pt-[110px] md:pt-[140px]"
				style={{ zIndex: 10 }}
			>
				{/* Eyebrow */}
				<motion.p
					initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
					animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
					className="mb-3 text-[12px] sm:text-[13px] md:text-[14px] sm:mb-4"
					style={{ fontWeight: 500, color: "rgba(0,0,0,0.50)" }}
				>
					Finance Reimagined
				</motion.p>

				{/* Headline — two stacked lines */}
				<h2
					className="text-[34px] sm:text-[44px] md:text-[56px] lg:text-[68px]"
					style={{
						fontWeight: 500,
						letterSpacing: "-1.36px",
						lineHeight: 1.05,
					}}
				>
					<motion.span
						initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
						className="block"
						style={{ color: "rgba(0,0,0,0.20)" }}
					>
						A New Standard
					</motion.span>
					<motion.span
						initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						transition={{ duration: 0.7, delay: 0.32, ease: "easeOut" }}
						className="block"
						style={{ color: "#05050C" }}
					>
						in Wealth Management
					</motion.span>
				</h2>

				{/* Subhead */}
				<motion.p
					initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
					animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
					className="mt-4 text-[14px] sm:text-[16px] md:text-[18px] sm:mt-5"
					style={{
						fontWeight: 500,
						color: "rgba(0,0,0,0.20)",
						maxWidth: "460px",
					}}
				>
					Take full control of your assets with a unified platform for
					investing, tracking, and growing your portfolio in real time.
				</motion.p>
			</div>

			{/* Stones — left (zBase 1 / zGrass 2), right (zBase 4 / zGrass 5) */}
			<StoneReveal
				side="left"
				baseSrc={`${BASE_URL}assets/stone-left.png`}
				grassSrc={`${BASE_URL}assets/stone-g-left.png`}
				zBase={1}
				zGrass={2}
			/>

			{/* z-3 — centered dashboard, rising between the stones */}
			<div
				className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center"
				style={{ zIndex: 3 }}
			>
				<motion.div
					initial={{ opacity: 0, y: 80, filter: "blur(8px)" }}
					animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					transition={{ duration: 1.0, delay: 0.6, ease: EXPO_OUT }}
					className="w-[92vw] sm:w-[72vw] md:w-[60vw] lg:w-[54vw]"
					style={{ maxWidth: "944px" }}
				>
					<img
						src={`${BASE_URL}assets/Dashboard.png`}
						alt="Synex product dashboard"
						draggable={false}
						className="block h-auto w-full object-contain"
						style={{
							borderTopLeftRadius: "12px",
							borderTopRightRadius: "12px",
							boxShadow:
								"0 -8px 80px rgba(0,0,0,0.12), 0 40px 120px rgba(0,0,0,0.10)",
						}}
					/>
				</motion.div>
			</div>

			<StoneReveal
				side="right"
				baseSrc={`${BASE_URL}assets/stone-right.png`}
				grassSrc={`${BASE_URL}assets/stone-g-right.png`}
				zBase={4}
				zGrass={5}
			/>

			{/* z-6 — bottom dark fade for contrast under the scroll indicator */}
			<div
				className="pointer-events-none absolute bottom-0 left-0 right-0"
				style={{
					zIndex: 6,
					height: "220px",
					background:
						"linear-gradient(to top, rgba(5,5,12,0.85) 0%, rgba(5,5,12,0.5) 40%, rgba(5,5,12,0) 100%)",
				}}
			/>

			{/* z-20 — scroll indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, y: [0, -4, 0] }}
				transition={{
					opacity: { duration: 0.6, delay: 1.2 },
					y: {
						duration: 2.5,
						delay: 1.2,
						repeat: Infinity,
						ease: "easeInOut",
					},
				}}
				className="absolute left-0 right-0 mx-auto flex w-fit items-center gap-2"
				style={{ zIndex: 20, bottom: "10px" }}
			>
				<motion.img
					src={`${BASE_URL}assets/star.svg`}
					alt=""
					aria-hidden="true"
					draggable={false}
					style={{ width: "14px", height: "14px" }}
					animate={{ rotate: 360 }}
					transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
				/>
				<span
					style={{
						fontWeight: 500,
						fontSize: "14px",
						letterSpacing: "-0.28px",
						color: "#FFFFFF",
					}}
				>
					Scroll to explore
				</span>
			</motion.div>

			{/* Navbar mounts last so it paints on top (z-50). */}
			<Navbar />
		</section>
	);
}
