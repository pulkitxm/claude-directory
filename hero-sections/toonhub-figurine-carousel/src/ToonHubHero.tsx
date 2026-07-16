import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const IMAGES = [
	{
		src: "./assets/1.02464a56.png",
		bg: "#F4845F",
		panel: "#F79B7F",
	},
	{
		src: "./assets/2.b977faab.png",
		bg: "#6BBF7A",
		panel: "#85CC92",
	},
	{
		src: "./assets/3.4df853b4.png",
		bg: "#E882B4",
		panel: "#ED9DC4",
	},
	{
		src: "./assets/4.4457fbce.png",
		bg: "#6EB5FF",
		panel: "#8DC4FF",
	},
] as const;

const COUNT = IMAGES.length;
const DURATION_MS = 650;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const ANTON = "'Anton', sans-serif";

type Role = "center" | "left" | "right" | "back";

const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.08'/></svg>`;
const GRAIN_URL = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

function roleFor(index: number, activeIndex: number): Role {
	if (index === activeIndex) return "center";
	if (index === (activeIndex + 3) % COUNT) return "left";
	if (index === (activeIndex + 1) % COUNT) return "right";
	return "back";
}

function itemStyle(role: Role, isMobile: boolean): CSSProperties {
	const base: CSSProperties = {
		position: "absolute",
		aspectRatio: "0.6 / 1",
		transition: [
			`transform ${DURATION_MS}ms ${EASE}`,
			`filter ${DURATION_MS}ms ${EASE}`,
			`opacity ${DURATION_MS}ms ${EASE}`,
			`left ${DURATION_MS}ms ${EASE}`,
		].join(", "),
		willChange: "transform, filter, opacity",
	};

	switch (role) {
		case "center":
			return {
				...base,
				transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
				filter: "none",
				opacity: 1,
				zIndex: 20,
				left: "50%",
				height: isMobile ? "60%" : "92%",
				bottom: isMobile ? "22%" : 0,
			};
		case "left":
			return {
				...base,
				transform: "translateX(-50%) scale(1)",
				filter: "blur(2px)",
				opacity: 0.85,
				zIndex: 10,
				left: isMobile ? "20%" : "30%",
				height: isMobile ? "16%" : "28%",
				bottom: isMobile ? "32%" : "12%",
			};
		case "right":
			return {
				...base,
				transform: "translateX(-50%) scale(1)",
				filter: "blur(2px)",
				opacity: 0.85,
				zIndex: 10,
				left: isMobile ? "80%" : "70%",
				height: isMobile ? "16%" : "28%",
				bottom: isMobile ? "32%" : "12%",
			};
		case "back":
			return {
				...base,
				transform: "translateX(-50%) scale(1)",
				filter: "blur(4px)",
				opacity: 1,
				zIndex: 5,
				left: "50%",
				height: isMobile ? "13%" : "22%",
				bottom: isMobile ? "32%" : "12%",
			};
	}
}

export default function ToonHubHero() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [isMobile, setIsMobile] = useState(
		() => typeof window !== "undefined" && window.innerWidth < 640,
	);
	const lockTimeoutRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		IMAGES.forEach(({ src }) => {
			const img = new Image();
			img.src = src;
		});
	}, []);

	useEffect(() => {
		const onResize = () => setIsMobile(window.innerWidth < 640);
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, []);

	useEffect(() => () => window.clearTimeout(lockTimeoutRef.current), []);

	const navigate = useCallback(
		(direction: "next" | "prev") => {
			if (isAnimating) return;
			setIsAnimating(true);
			setActiveIndex((prev) =>
				direction === "next" ? (prev + 1) % COUNT : (prev + COUNT - 1) % COUNT,
			);
			lockTimeoutRef.current = window.setTimeout(
				() => setIsAnimating(false),
				DURATION_MS,
			);
		},
		[isAnimating],
	);

	return (
		<div
			className="relative w-full overflow-hidden"
			style={{
				backgroundColor: IMAGES[activeIndex].bg,
				transition: `background-color ${DURATION_MS}ms ${EASE}`,
				fontFamily: "'Inter', sans-serif",
			}}
		>
			<div
				className="relative w-full"
				style={{ height: "100vh", overflow: "hidden" }}
			>
				{/* Grain overlay */}
				<div
					aria-hidden="true"
					className="absolute inset-0 pointer-events-none"
					style={{
						zIndex: 50,
						opacity: 0.4,
						backgroundImage: GRAIN_URL,
						backgroundSize: "200px 200px",
						backgroundRepeat: "repeat",
					}}
				/>

				{/* Giant ghost text */}
				<div
					className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
					style={{ zIndex: 2, top: "18%" }}
				>
					<h1
						style={{
							fontFamily: ANTON,
							fontSize: "clamp(90px, 28vw, 380px)",
							fontWeight: 900,
							color: "#ffffff",
							opacity: 1,
							lineHeight: 1,
							textTransform: "uppercase",
							letterSpacing: "-0.02em",
							whiteSpace: "nowrap",
						}}
					>
						3D SHAPE
					</h1>
				</div>

				{/* Top-left brand label */}
				<span
					className="absolute top-6 left-4 sm:left-8 text-xs font-semibold uppercase"
					style={{
						zIndex: 60,
						color: "#ffffff",
						opacity: 0.9,
						letterSpacing: "0.18em",
					}}
				>
					TOONHUB
				</span>

				{/* Carousel */}
				<div className="absolute inset-0" style={{ zIndex: 3 }}>
					{IMAGES.map((image, index) => {
						const role = roleFor(index, activeIndex);
						return (
							<div
								key={image.src}
								data-role={role}
								style={itemStyle(role, isMobile)}
							>
								<img
									src={image.src}
									alt={`Character figurine ${index + 1}`}
									draggable={false}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "contain",
										objectPosition: "bottom center",
									}}
								/>
							</div>
						);
					})}
				</div>

				{/* Bottom-left text + nav buttons */}
				<div
					className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
					style={{ zIndex: 60, maxWidth: 320 }}
				>
					<p
						className="font-bold uppercase tracking-widest mb-2 sm:mb-3 text-base sm:text-[22px]"
						style={{ color: "#ffffff", opacity: 0.95, letterSpacing: "0.02em" }}
					>
						TOONHUB FIGURINES
					</p>
					<p
						className="hidden sm:block text-xs sm:text-sm mb-4 sm:mb-5"
						style={{ color: "#ffffff", opacity: 0.85, lineHeight: 1.6 }}
					>
						The artwork is stunning, shipped fully prepared. The finish is a
						vision, the 3D craft is flawless. Many thanks! Wishing you the win.
						Order now.
					</p>
					<div className="flex items-center gap-3 sm:gap-4">
						<button
							type="button"
							aria-label="Previous figurine"
							onClick={() => navigate("prev")}
							className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-transparent transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/[0.12]"
							style={{ border: "2px solid #ffffff", color: "#ffffff" }}
						>
							<ArrowLeft size={26} strokeWidth={2.25} />
						</button>
						<button
							type="button"
							aria-label="Next figurine"
							onClick={() => navigate("next")}
							className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-transparent transition-[transform,background-color] duration-150 hover:scale-[1.08] hover:bg-white/[0.12]"
							style={{ border: "2px solid #ffffff", color: "#ffffff" }}
						>
							<ArrowRight size={26} strokeWidth={2.25} />
						</button>
					</div>
				</div>

				{/* Bottom-right link */}
				<a
					href="#discover"
					className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2 sm:gap-3 opacity-95 hover:opacity-100 transition-opacity duration-200"
					style={{
						zIndex: 60,
						fontFamily: ANTON,
						fontSize: "clamp(20px, 4vw, 56px)",
						fontWeight: 400,
						color: "#ffffff",
						letterSpacing: "-0.02em",
						lineHeight: 1,
						textTransform: "uppercase",
						textDecoration: "none",
					}}
				>
					DISCOVER IT
					<ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
				</a>
			</div>
		</div>
	);
}
