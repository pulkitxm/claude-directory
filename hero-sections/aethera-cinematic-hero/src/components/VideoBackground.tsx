import { useEffect, useRef } from "react";

const VIDEO_SRC = `${import.meta.env.BASE_URL}assets/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4`;

const FADE_SECONDS = 0.5;
const RESTART_DELAY_MS = 100;

export default function VideoBackground() {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		let frameId = 0;
		let restartTimer: number | undefined;

		const updateOpacity = () => {
			const { currentTime, duration } = video;

			if (Number.isFinite(duration) && duration > 0) {
				const fadeIn = currentTime / FADE_SECONDS;
				const fadeOut = (duration - currentTime) / FADE_SECONDS;
				const opacity = Math.min(Math.max(Math.min(fadeIn, fadeOut), 0), 1);
				video.style.opacity = opacity.toFixed(3);
			}

			frameId = requestAnimationFrame(updateOpacity);
		};

		const handleEnded = () => {
			video.style.opacity = "0";
			restartTimer = window.setTimeout(() => {
				video.currentTime = 0;
				video.play().catch(() => undefined);
			}, RESTART_DELAY_MS);
		};

		video.addEventListener("ended", handleEnded);
		frameId = requestAnimationFrame(updateOpacity);

		video.play().catch(() => undefined);

		return () => {
			cancelAnimationFrame(frameId);
			window.clearTimeout(restartTimer);
			video.removeEventListener("ended", handleEnded);
		};
	}, []);

	return (
		<div aria-hidden="true" className="absolute inset-0 z-0">
			<video
				ref={videoRef}
				src={VIDEO_SRC}
				muted
				playsInline
				autoPlay
				preload="auto"
				className="absolute w-full object-cover"
				style={{
					inset: "auto 0 0 0",
					top: "300px",
					opacity: 0,
					willChange: "opacity",
				}}
			/>
			<div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
		</div>
	);
}
