import { useEffect, useRef } from "react";

const BASE_URL = (import.meta as ImportMeta & { env: { BASE_URL: string } }).env
	.BASE_URL;
const VIDEO_SRC = `${BASE_URL}assets/hf_20260601_110537_3a579fa0-7bbc-4d94-9d25-0e816c7840f5.mp4`;

const DESKTOP_MIN_WIDTH = 1024;

const SWEEP_RATIO = 0.8;

export function BackgroundVideo() {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		let previousX: number | null = null;
		let targetTime: number | null = null;
		let seekInFlight = false;
		let queuedTime: number | null = null;

		const requestSeek = (time: number) => {
			if (seekInFlight) {
				queuedTime = time;
				return;
			}
			if (Math.abs(time - video.currentTime) < 0.002) return;
			seekInFlight = true;
			video.currentTime = time;
		};

		const handleSeeked = () => {
			if (
				queuedTime !== null &&
				Math.abs(queuedTime - video.currentTime) >= 0.002
			) {
				video.currentTime = queuedTime;
				queuedTime = null;
			} else {
				queuedTime = null;
				seekInFlight = false;
			}
		};

		const handleMouseMove = (event: MouseEvent) => {
			if (window.innerWidth < DESKTOP_MIN_WIDTH) return;

			if (previousX === null) {
				previousX = event.clientX;
				return;
			}
			const delta = event.clientX - previousX;
			previousX = event.clientX;

			const { duration } = video;
			if (!duration || Number.isNaN(duration)) return;

			const base = targetTime ?? video.currentTime;
			targetTime = Math.min(
				Math.max(
					base + (delta / window.innerWidth) * SWEEP_RATIO * duration,
					0,
				),
				duration,
			);
			requestSeek(targetTime);
		};

		window.addEventListener("mousemove", handleMouseMove);
		video.addEventListener("seeked", handleSeeked);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			video.removeEventListener("seeked", handleSeeked);
		};
	}, []);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		if (window.innerWidth < DESKTOP_MIN_WIDTH) {
			video.autoplay = true;
			video.play().catch(() => undefined);
		}
	}, []);

	return (
		<div className="order-last lg:order-none relative lg:absolute lg:inset-0 lg:z-0 overflow-hidden pointer-events-none w-full aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-neutral-50 lg:bg-transparent">
			<video
				ref={videoRef}
				src={VIDEO_SRC}
				muted
				playsInline
				preload="auto"
				className="w-full h-full object-cover object-right lg:object-right-bottom"
			/>
		</div>
	);
}
