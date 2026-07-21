import { useEffect, useRef } from "react";

const VIDEO_URL = `${import.meta.env.BASE_URL}assets/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4`;

/** Duration of every fade, in milliseconds. */
const FADE_MS = 250;
/** Start fading out when this many seconds remain before the video ends. */
const FADE_OUT_REMAINING_S = 0.55;
/** Pause at black before restarting the loop, in milliseconds. */
const RESTART_DELAY_MS = 100;

/**
 * Full-bleed looping video with a custom requestAnimationFrame fade system.
 * No CSS transitions are involved: opacity is written directly to the element
 * on every animation frame.
 *
 * - 250ms fade-in on load and on every loop restart
 * - 250ms fade-out once 0.55s remain before the video ends
 * - `fadingOutRef` guards against re-triggering from repeated `timeupdate`s
 * - on `ended`: opacity snaps to 0, 100ms delay, seek to 0, play, fade back in
 * - each new fade cancels any running frames, and resumes from the element's
 *   current opacity so competing fades never snap
 */
export default function VideoBackground() {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const rafRef = useRef<number | null>(null);
	const opacityRef = useRef(0);
	const fadingOutRef = useRef(false);
	const restartTimerRef = useRef<number | null>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const cancelFade = () => {
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
				rafRef.current = null;
			}
		};

		const setOpacity = (value: number) => {
			opacityRef.current = value;
			video.style.opacity = value.toFixed(4);
		};

		const fadeTo = (target: number) => {
			cancelFade(); // a new fade always cancels the running one
			const from = opacityRef.current; // resume from current opacity — no snapping
			let start: number | null = null;
			const step = (now: number) => {
				if (start === null) start = now;
				const progress = Math.min((now - start) / FADE_MS, 1);
				setOpacity(from + (target - from) * progress);
				rafRef.current = progress < 1 ? requestAnimationFrame(step) : null;
			};
			rafRef.current = requestAnimationFrame(step);
		};

		const handleLoaded = () => {
			fadingOutRef.current = false;
			void video.play().catch(() => {
				/* autoplay may need a user gesture; the poster frame still shows */
			});
			fadeTo(1);
		};

		const handleTimeUpdate = () => {
			if (fadingOutRef.current) return; // prevent re-triggering the fade-out
			if (!Number.isFinite(video.duration) || video.duration === 0) return;
			if (video.duration - video.currentTime <= FADE_OUT_REMAINING_S) {
				fadingOutRef.current = true;
				fadeTo(0);
			}
		};

		const handleEnded = () => {
			cancelFade();
			setOpacity(0);
			restartTimerRef.current = window.setTimeout(() => {
				restartTimerRef.current = null;
				video.currentTime = 0;
				void video.play().catch(() => {});
				fadingOutRef.current = false;
				fadeTo(1); // loop start — fade back in
			}, RESTART_DELAY_MS);
		};

		video.addEventListener("timeupdate", handleTimeUpdate);
		video.addEventListener("ended", handleEnded);
		if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
			handleLoaded();
		} else {
			video.addEventListener("loadeddata", handleLoaded, { once: true });
		}

		return () => {
			cancelFade();
			if (restartTimerRef.current !== null) {
				window.clearTimeout(restartTimerRef.current);
			}
			video.removeEventListener("loadeddata", handleLoaded);
			video.removeEventListener("timeupdate", handleTimeUpdate);
			video.removeEventListener("ended", handleEnded);
		};
	}, []);

	return (
		<div className="absolute inset-0 overflow-hidden" aria-hidden="true">
			{/* 115% width/height, centered horizontally, anchored to the top. */}
			<video
				ref={videoRef}
				data-testid="bg-video"
				className="absolute left-1/2 top-0 h-[115%] w-[115%] max-w-none -translate-x-1/2 object-cover object-top"
				src={VIDEO_URL}
				muted
				playsInline
				autoPlay
				preload="auto"
				style={{ opacity: 0 }}
			/>
		</div>
	);
}
