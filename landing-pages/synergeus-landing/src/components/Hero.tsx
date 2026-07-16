import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ASSETS } from "../lib/assets";
import HeroVideo from "./HeroVideo";
import Navbar from "./Navbar";
import StoryCard from "./StoryCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const MARQUEE_LOGOS = [
	ASSETS.logoTaa,
	ASSETS.logoHarris,
	ASSETS.logoSiemens,
	ASSETS.logoSummit,
];

export default function Hero() {
	return (
		<section
			className="synergeus-hero"
			style={{
				position: "relative",
				overflow: "hidden",
				minHeight: "100vh",
				background: "#000",
			}}
		>
			{/* Background video */}
			<HeroVideo />

			{/* Dark overlay */}
			<div
				className="hero-content"
				style={{
					position: "absolute",
					inset: 0,
					zIndex: 1,
					background:
						"linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)",
				}}
			/>

			<Navbar />

			{/* Hero content */}
			<div
				style={{
					position: "absolute",
					inset: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					zIndex: 10,
					paddingTop: 80,
				}}
			>
				<motion.h1
					className="hero-title"
					initial={{ opacity: 0, y: -40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9, ease: EASE }}
					style={{
						color: "#fff",
						textAlign: "center",
						margin: 0,
						fontSize: 102,
						lineHeight: "96px",
						letterSpacing: "-1.02px",
					}}
				>
					<span
						className="font-heading"
						style={{ display: "block", fontWeight: 400 }}
					>
						Our AI simplify
					</span>
					<span style={{ display: "block", fontWeight: 400 }}>
						<span className="font-heading">your </span>
						<span className="font-serif" style={{ fontStyle: "italic" }}>
							financial life
						</span>
					</span>
				</motion.h1>

				<motion.button
					type="button"
					className="font-heading"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
					style={{
						display: "flex",
						alignItems: "center",
						marginTop: 32,
						background: "#fff",
						color: "#000",
						fontSize: 15,
						fontWeight: 500,
						paddingLeft: 24,
						paddingRight: 8,
						paddingTop: 6,
						paddingBottom: 6,
						borderRadius: 9999,
						gap: 8,
						border: "none",
						cursor: "pointer",
					}}
				>
					Start free trial now
					<span
						style={{
							width: 24,
							height: 24,
							borderRadius: 9999,
							background: "#000",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<ArrowUpRight size={14} color="#fff" strokeWidth={2.5} />
					</span>
				</motion.button>

				<StoryCard />
			</div>

			{/* Bottom-left block */}
			<div
				className="hero-recognition"
				style={{
					position: "absolute",
					bottom: 40,
					left: 40,
					zIndex: 10,
				}}
			>
				<h2
					className="font-heading"
					style={{
						fontSize: 21,
						lineHeight: 1.2,
						color: "rgba(255,255,255,0.6)",
						marginBottom: 18,
						margin: 0,
						marginBlockEnd: 18,
					}}
				>
					Nationally recognized
				</h2>
				<div style={{ width: 430, overflow: "hidden" }}>
					<div
						className="flex animate-marquee"
						style={{ gap: 54, width: "max-content" }}
					>
						{[...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((src, i) => (
							<img
								key={i}
								src={src}
								alt=""
								style={{
									height: 30,
									width: "auto",
									objectFit: "contain",
									filter: "brightness(0) invert(1) opacity(0.55)",
									flexShrink: 0,
								}}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Bottom-right block */}
			<div
				className="hero-summary"
				style={{
					position: "absolute",
					bottom: 40,
					right: 40,
					zIndex: 10,
					maxWidth: 430,
				}}
			>
				<p
					className="font-heading"
					style={{
						color: "#fff",
						fontSize: 21,
						lineHeight: 1.4,
						marginBottom: 12,
						margin: 0,
						marginBlockEnd: 12,
					}}
				>
					Synergeus is your all in one financial home, now powered by your own
					intelligent AI advisor.
				</p>
				<a
					href="#"
					className="font-heading"
					style={{
						color: "#fff",
						textDecoration: "underline",
						fontSize: 21,
					}}
				>
					Learn more
				</a>
			</div>
		</section>
	);
}
