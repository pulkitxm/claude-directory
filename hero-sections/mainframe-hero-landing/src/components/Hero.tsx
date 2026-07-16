import { useEffect, useRef, useState } from "react";
import { useTypewriter } from "../hooks/useTypewriter";

const VIDEO_URL =
	"./assets/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";

const SENSITIVITY = 0.8;

export function Hero() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const prevXRef = useRef<number | null>(null);
	const targetTimeRef = useRef(0);
	const seekingRef = useRef(false);

	const { displayed, done } = useTypewriter({
		text: "Glad you stopped in. Good taste tends to find us. Now, what are we building?",
		speed: 38,
		startDelay: 600,
	});

	const [pillsVisible, setPillsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setPillsVisible(true), 400);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleSeeked = () => {
			seekingRef.current = false;
			if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
				seekingRef.current = true;
				video.currentTime = targetTimeRef.current;
			}
		};

		video.addEventListener("seeked", handleSeeked);

		const handleMouseMove = (e: MouseEvent) => {
			if (!video?.duration) return;

			const currentX = e.clientX;
			if (prevXRef.current === null) {
				prevXRef.current = currentX;
				return;
			}

			const delta = currentX - prevXRef.current;
			prevXRef.current = currentX;

			const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
			const newTime = Math.max(
				0,
				Math.min(video.duration, targetTimeRef.current + offset),
			);
			targetTimeRef.current = newTime;

			if (!seekingRef.current && Math.abs(video.currentTime - newTime) > 0.01) {
				seekingRef.current = true;
				video.currentTime = newTime;
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			video.removeEventListener("seeked", handleSeeked);
		};
	}, []);

	const handleCopyEmail = () => {
		navigator.clipboard.writeText("hello@mainframe.co");
	};

	const pillButtons = [
		"Pitch us an idea",
		"Come work here",
		"Send a brief hello",
		"See how we operate",
	];

	return (
		<>
			{/* Background Video */}
			<video
				ref={videoRef}
				className="fixed inset-0 z-0 w-full h-full object-cover"
				style={{ objectPosition: "70% center" }}
				muted
				playsInline
				preload="auto"
				src={VIDEO_URL}
			/>

			{/* Hero Section */}
			<section className="relative z-[1] h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
				<div className="max-w-xl relative z-10">
					{/* Blurred Intro Label */}
					<div
						className="mb-5 sm:mb-6 pointer-events-none select-none"
						style={{
							fontSize: "clamp(18px, 4vw, 26px)",
							lineHeight: 1.3,
							fontWeight: 400,
							color: "#000",
							filter: "blur(4px)",
						}}
					>
						Hey there, meet A.R.I.A,
						<br />
						Mainframe's Adaptive Response Interface Agent
					</div>

					{/* Typewriter Text */}
					<p
						className="text-black mb-5 sm:mb-6"
						style={{
							fontSize: "clamp(18px, 4vw, 26px)",
							lineHeight: 1.35,
							fontWeight: 400,
							minHeight: "54px",
						}}
					>
						{displayed}
						{!done && (
							<span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] cursor-blink" />
						)}
					</p>

					{/* Action Pill Buttons */}
					<div
						className="flex flex-wrap gap-y-1"
						style={{
							opacity: pillsVisible ? 1 : 0,
							transform: pillsVisible ? "translateY(0)" : "translateY(8px)",
							transition: "opacity 0.4s ease, transform 0.4s ease",
						}}
					>
						{pillButtons.map((label) => (
							<button
								key={label}
								className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 mx-[0.2em] mb-[0.4em] hover:bg-black hover:text-white transition-colors duration-200 whitespace-nowrap"
								style={{ paddingTop: "0.3em", paddingBottom: "0.3em" }}
							>
								{label}
							</button>
						))}

						{/* Email Pill */}
						<button
							onClick={handleCopyEmail}
							className="inline-flex items-center justify-center gap-2 sm:gap-3 text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 mx-[0.2em] mb-[0.4em] hover:bg-white hover:text-black transition-colors duration-200 whitespace-nowrap"
							style={{ paddingTop: "0.3em", paddingBottom: "0.3em" }}
						>
							<span>
								Reach us:{" "}
								<span className="underline underline-offset-1">
									hello@mainframe.co
								</span>
							</span>
							<svg
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<rect
									x="3"
									y="0"
									width="8"
									height="8"
									rx="1"
									stroke="currentColor"
									strokeWidth="1.2"
									fill="none"
								/>
								<rect
									x="0"
									y="3"
									width="8"
									height="8"
									rx="1"
									stroke="currentColor"
									strokeWidth="1.2"
									fill="none"
								/>
							</svg>
						</button>
					</div>
				</div>
			</section>
		</>
	);
}
