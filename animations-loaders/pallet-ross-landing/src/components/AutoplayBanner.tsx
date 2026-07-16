import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const assetBase = (import.meta as ImportMeta & { env: { BASE_URL: string } })
	.env.BASE_URL;
const SLIDES = [1, 2, 3].map((index) => `${assetBase}banner-${index}.png`);

export default function AutoplayBanner() {
	const [activeSlide, setActiveSlide] = useState(0);

	useEffect(() => {
		const id = window.setInterval(() => {
			setActiveSlide((s) => (s + 1) % SLIDES.length);
		}, 3000);
		return () => window.clearInterval(id);
	}, []);

	const prev = () =>
		setActiveSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length);
	const next = () => setActiveSlide((s) => (s + 1) % SLIDES.length);

	return (
		<motion.div
			style={{
				width: "100%",
				borderRadius: 24,
				overflow: "hidden",
				height: 600,
				background: "#111111",
				position: "relative",
			}}
			initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
		>
			{SLIDES.map((src, i) => (
				<motion.img
					key={src}
					src={src}
					alt=""
					draggable={false}
					style={{
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
						objectFit: "cover",
						objectPosition: "center top",
					}}
					animate={{
						opacity: i === activeSlide ? 1 : 0,
						scale: i === activeSlide ? 1 : 1.04,
					}}
					transition={{ duration: 0.5, ease: "easeInOut" }}
				/>
			))}

			<div
				style={{
					position: "absolute",
					top: 24,
					right: 24,
					zIndex: 10,
					display: "flex",
					gap: 5,
				}}
			>
				{SLIDES.map((_, i) => (
					<button
						key={i}
						type="button"
						aria-label={`Go to slide ${i + 1}`}
						onClick={() => setActiveSlide(i)}
						style={{
							height: 6,
							width: i === activeSlide ? 18 : 6,
							background:
								i === activeSlide
									? "rgba(255,255,255,0.95)"
									: "rgba(255,255,255,0.45)",
							borderRadius: 9999,
							border: "none",
							padding: 0,
							cursor: "pointer",
							transition: "all 0.3s ease",
						}}
					/>
				))}
			</div>

			<div
				style={{
					position: "absolute",
					bottom: 28,
					left: 28,
					display: "inline-block",
				}}
			>
				<motion.span
					style={{
						position: "absolute",
						inset: -8,
						borderRadius: 9999,
						border: "2px solid rgba(255,255,255,0.40)",
						pointerEvents: "none",
					}}
					animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
					transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
				/>
				<motion.span
					style={{
						position: "absolute",
						inset: -4,
						borderRadius: 9999,
						border: "2px solid rgba(255,255,255,0.25)",
						pointerEvents: "none",
					}}
					animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeOut",
						delay: 0.5,
					}}
				/>
				<motion.button
					type="button"
					style={{
						position: "relative",
						zIndex: 2,
						background: "#FFFFFF",
						color: "#111111",
						fontFamily: '"Inter Tight", sans-serif',
						fontSize: 15,
						fontWeight: 600,
						padding: "12px 28px",
						borderRadius: 9999,
						border: "none",
						display: "flex",
						alignItems: "center",
						gap: 8,
						cursor: "pointer",
					}}
					whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
				>
					Watch
				</motion.button>
			</div>

			<div
				style={{
					position: "absolute",
					bottom: 28,
					right: 28,
					display: "flex",
					gap: 10,
				}}
			>
				<motion.button
					type="button"
					aria-label="Previous slide"
					onClick={prev}
					style={controlStyle}
					whileHover={{
						scale: 1.08,
						background: "#FFFFFF",
						transition: { duration: 0.2 },
					}}
				>
					<ChevronLeft size={20} color="#111111" />
				</motion.button>
				<motion.button
					type="button"
					aria-label="Next slide"
					onClick={next}
					style={controlStyle}
					whileHover={{
						scale: 1.08,
						background: "#FFFFFF",
						transition: { duration: 0.2 },
					}}
				>
					<ChevronRight size={20} color="#111111" />
				</motion.button>
			</div>
		</motion.div>
	);
}

const controlStyle: React.CSSProperties = {
	width: 44,
	height: 44,
	background: "rgba(255,255,255,0.90)",
	borderRadius: "50%",
	boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
	border: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	cursor: "pointer",
};
