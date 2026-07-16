import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { vendorAsset } from "@/lib/assets";

const A = vendorAsset;

const PHRASES = [
	"Create a finance dashboard design",
	"Branding with M letter",
	"Liquid glass effect",
	"Loader animation",
	"SaaS landing page",
];

type Mode = "typing" | "pausing" | "deleting";

const TypewriterPrompt = () => {
	const [text, setText] = useState("");
	const [phraseIdx, setPhraseIdx] = useState(0);
	const [mode, setMode] = useState<Mode>("typing");

	useEffect(() => {
		const phrase = PHRASES[phraseIdx];
		let t: ReturnType<typeof setTimeout>;
		if (mode === "typing") {
			if (text.length < phrase.length) {
				t = setTimeout(
					() => setText(phrase.slice(0, text.length + 1)),
					22 + Math.random() * 25,
				);
			} else {
				t = setTimeout(() => setMode("pausing"), 30);
			}
		} else if (mode === "pausing") {
			t = setTimeout(() => setMode("deleting"), 1400);
		} else {
			if (text.length > 0) {
				t = setTimeout(() => setText(text.slice(0, -1)), 14);
			} else {
				setPhraseIdx((i) => (i + 1) % PHRASES.length);
				setMode("typing");
				return;
			}
		}
		return () => clearTimeout(t);
	}, [text, mode, phraseIdx]);

	return (
		<div
			style={{
				width: "100%",
				fontFamily: '"Inter Tight"',
				fontSize: 15,
				fontWeight: 400,
				color: "rgba(255,255,255,0.60)",
				padding: "0 0 10px 0",
				display: "flex",
				alignItems: "center",
				height: 32,
				boxSizing: "border-box",
				lineHeight: "22px",
				flexShrink: 0,
				transform: "translate(1%, 18%)",
			}}
		>
			<style>{`@keyframes promptCaretBlink { 0%,49% { opacity:1 } 50%,100% { opacity:0 } }`}</style>
			<span style={{ whiteSpace: "pre" }}>{text}</span>
			<span
				style={{
					display: "inline-block",
					width: 2,
					height: 18,
					marginLeft: 2,
					background: "rgba(255,255,255,0.85)",
					animation: "promptCaretBlink 1s steps(1) infinite",
					flexShrink: 0,
				}}
			/>
		</div>
	);
};

const SendButton = () => {
	const [hovered, setHovered] = useState(false);
	const [arrowToggle, setArrowToggle] = useState(0);
	const ringRef = useRef<HTMLDivElement | null>(null);
	const stateRef = useRef({
		angle: 0,
		speed: 0,
		last: 0,
		raf: 0,
		hovered: false,
	});

	useEffect(() => {
		stateRef.current.hovered = hovered;
		const tick = (now: number) => {
			const s = stateRef.current;
			const dt = s.last ? now - s.last : 16;
			s.last = now;
			const target = s.hovered ? 360 / 1500 : 0;
			const tau = s.hovered ? 250 : 700;
			const k = 1 - Math.exp(-dt / tau);
			s.speed += (target - s.speed) * k;
			s.angle = (s.angle + s.speed * dt) % 360;
			if (ringRef.current) {
				ringRef.current.style.transform = `rotate(${s.angle}deg)`;
			}
			if (!s.hovered && Math.abs(s.speed) < 0.0005) {
				s.raf = 0;
				s.last = 0;
				return;
			}
			s.raf = requestAnimationFrame(tick);
		};
		if (!stateRef.current.raf) {
			stateRef.current.last = 0;
			stateRef.current.raf = requestAnimationFrame(tick);
		}
		return () => {
			if (stateRef.current.raf) {
				cancelAnimationFrame(stateRef.current.raf);
				stateRef.current.raf = 0;
			}
		};
	}, [hovered]);

	return (
		<motion.div
			onHoverStart={() => {
				setArrowToggle((v) => v + 1);
				setHovered(true);
			}}
			onHoverEnd={() => setHovered(false)}
			animate={{ scale: hovered ? 1.05 : 1 }}
			transition={{ duration: 0.2 }}
			style={{
				position: "relative",
				width: 44,
				height: 44,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexShrink: 0,
				cursor: "pointer",
			}}
		>
			<div
				style={{
					position: "absolute",
					inset: 0,
					borderRadius: 15,
					background: "rgb(95 126 167 / 15%)",
					width: 44,
					height: 44,
					zIndex: 1,
				}}
			/>
			<div
				style={{
					position: "absolute",
					width: 36,
					height: 36,
					borderRadius: 12,
					background:
						"linear-gradient(var(--send-btn-angle, 180deg), #ff660e 0%, #646aed 100%)",
					animation: "send-btn-bg-rotate 4s linear infinite",
					boxShadow:
						"inset 0 1px 18px 2px rgba(173,208,255,0.20), inset 0 1px 4px 2px rgba(222,236,255,0.80), 0 42px 107px 0 rgba(61,130,222,0.34), 0 10px 10px 0 rgba(61,130,222,0.20), 0 3.714px 4.846px 0 rgba(61,130,222,0.15)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					overflow: "hidden",
					padding: 8,
					zIndex: 2,
				}}
			>
				<div
					style={{
						position: "absolute",
						inset: -1,
						borderRadius: 13,
						padding: 1,
						zIndex: 3,
						pointerEvents: "none",
						background:
							"conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, #FFFFFF 60deg, #9EC7FF 120deg, rgba(255,255,255,0) 200deg, rgba(255,255,255,0) 360deg)",
						WebkitMask:
							"linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
						WebkitMaskComposite: "xor",
						mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
						maskComposite: "exclude",
					}}
				>
					<div
						ref={ringRef}
						style={{ width: "100%", height: "100%", borderRadius: 13 }}
					/>
				</div>
				<div
					style={{
						position: "absolute",
						inset: 0,
						borderRadius: 12,
						border: "1px solid #9EC7FF",
						pointerEvents: "none",
						zIndex: 4,
					}}
				/>
				<div
					style={{
						position: "absolute",
						inset: 0,
						zIndex: 2,
						pointerEvents: "none",
					}}
				>
					<img
						src={A("dots.svg")}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							opacity: 0.7,
						}}
						alt=""
					/>
				</div>
				{arrowToggle > 0 && (
					<motion.div
						key={`blink-${arrowToggle}`}
						initial={{ x: "-120%" }}
						animate={{ x: "120%" }}
						transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
						style={{
							position: "absolute",
							inset: 0,
							zIndex: 4,
							pointerEvents: "none",
							background:
								"linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
							mixBlendMode: "screen",
						}}
					/>
				)}
				<div
					style={{
						position: "relative",
						width: 16,
						height: 16,
						zIndex: 5,
						overflow: "hidden",
					}}
				>
					<motion.img
						key={`out-${arrowToggle}`}
						src={A("arrow-up.svg")}
						initial={{ y: 0, opacity: 1 }}
						animate={{ y: -16, opacity: 0 }}
						transition={{ duration: 0.32, ease: [0.65, 0, 0.35, 1] }}
						style={{
							position: "absolute",
							inset: 0,
							width: 16,
							height: 16,
							objectFit: "contain",
						}}
						alt=""
					/>
					<motion.img
						key={`in-${arrowToggle}`}
						src={A("arrow-up.svg")}
						initial={{ y: 16, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.32, ease: [0.65, 0, 0.35, 1] }}
						style={{
							position: "absolute",
							inset: 0,
							width: 16,
							height: 16,
							objectFit: "contain",
						}}
						alt=""
					/>
				</div>
			</div>
		</motion.div>
	);
};

const PromptInput = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
			animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
			style={{
				width: 702,
				maxWidth: "100%",
				margin: "0 auto",
				padding: 4,
				borderRadius: 34,
				opacity: 1,
			}}
		>
			<div
				style={{
					width: "100%",
					height: 160,
					background:
						"linear-gradient(180.9deg, rgb(118 100 50 / 23%) -0.58%, rgba(53, 53, 56, 0.7) 66.34%, rgba(38, 38, 39, 0.7) 101.25%), rgb(43 38 38 / 67%)",
					boxShadow:
						"rgba(0, 0, 0, 0.5) 0px 118px 112px, rgba(0, 0, 0, 0.36) 0px 69.4784px 58.4192px, rgba(0, 0, 0, 0.282) 0px 35.6832px 27.4176px, rgba(255, 255, 255, 0.32) 0.5px 0.5px 0.5px inset, rgba(255, 255, 255, 0.05) 0.5px -0.5px 0.5px inset",
					borderRadius: 30,
					padding: "14px 14px 12px 16px",
					position: "relative",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<TypewriterPrompt />
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						gap: 8,
						marginTop: "auto",
						transform: "translateY(0%)",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 6,
							transform: "translateX(1%)",
						}}
					>
						<button
							style={{
								width: 28,
								height: 28,
								borderRadius: 6,
								border: "1px solid rgba(255,255,255,0.10)",
								background: "transparent",
								display: "inline-flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								color: "rgba(255,255,255,0.50)",
								padding: 0,
							}}
							aria-label="Add"
						>
							<svg
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6 1V11M1 6H11"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
						</button>
						<div
							style={{
								width: 1,
								height: 18,
								background: "rgba(255,255,255,0.12)",
								margin: "0 2px",
							}}
						/>
						<div
							style={{
								display: "inline-flex",
								alignItems: "center",
								gap: 6,
								width: 83,
								height: 30,
								background: "hsl(0deg 0% 43.53% / 14.9%)",
								borderRadius: 8,
								padding: "0 8px",
								cursor: "pointer",
								flexShrink: 0,
							}}
						>
							<div
								style={{
									width: 14,
									height: 14,
									borderRadius: 4,
									background:
										"linear-gradient(166deg, #A0E4FF 9.8%, #9CA4FB 184.41%)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<img src={A("ai-select.svg")} width={8} height={8} alt="" />
							</div>
							<span
								style={{
									fontFamily: '"Inter Tight"',
									fontSize: 12,
									fontWeight: 400,
									lineHeight: "16px",
									color: "#fff",
									textAlign: "center",
									flex: 1,
									whiteSpace: "nowrap",
								}}
							>
								Build
							</span>
							<ChevronDown size={12} stroke="#fff" style={{ flexShrink: 0 }} />
						</div>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 8,
							transform: "translateX(-1%)",
						}}
					>
						<button
							aria-label="Voice input"
							style={{
								width: 36,
								height: 36,
								borderRadius: 10,
								border: "none",
								background: "transparent",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
								color: "rgba(255,255,255,0.70)",
								padding: 0,
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 24 24"
								width={20}
								height={20}
								aria-hidden="true"
							>
								<path
									fill="currentColor"
									d="M11.25 21v-2.286a8.25 8.25 0 0 1-7.5-8.214.75.75 0 0 1 1.5 0 6.75 6.75 0 0 0 13.5 0 .75.75 0 0 1 1.5 0 8.25 8.25 0 0 1-7.5 8.214V21a.75.75 0 0 1-1.5 0m4-14a3.25 3.25 0 0 0-6.5 0v3a3.25 3.25 0 0 0 6.5 0zm1.5 3a4.75 4.75 0 1 1-9.5 0V7a4.75 4.75 0 0 1 9.5 0z"
								></path>
							</svg>
						</button>
						<SendButton />
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default PromptInput;
