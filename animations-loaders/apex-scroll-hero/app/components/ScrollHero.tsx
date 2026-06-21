"use client";

import { useEffect, useRef } from "react";

const TOP_SPEED = 217; // km/h shown at full scrub

type ScrollHeroProps = {
	/** Video in /public, encoded with dense keyframes for smooth seeking. */
	src?: string;
};

/**
 * Apple-product-page-style hero: the section pins for ~4.6 viewport heights
 * and the video's currentTime is driven by scroll progress. A rAF loop lerps
 * toward the scroll position so seeks stay smooth even with jumpy wheel input,
 * and the telemetry HUD (speed/gear/rail) is written straight to the DOM to
 * avoid re-rendering React on every frame.
 */
export default function ScrollHero({ src = "/hero.mp4" }: ScrollHeroProps) {
	const trackRef = useRef<HTMLElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const introRef = useRef<HTMLDivElement>(null);
	const outroRef = useRef<HTMLDivElement>(null);
	const cueRef = useRef<HTMLDivElement>(null);
	const speedRef = useRef<HTMLSpanElement>(null);
	const gearRef = useRef<HTMLSpanElement>(null);
	const railRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const track = trackRef.current;
		const video = videoRef.current;
		if (!track || !video) return;

		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		let duration = 0;
		const onMeta = () => {
			duration = video.duration || 0;
		};
		video.addEventListener("loadedmetadata", onMeta);
		if (video.readyState >= 1) onMeta();

		let trackTop = 0;
		let trackLen = 1;
		const measure = () => {
			trackTop = track.getBoundingClientRect().top + window.scrollY;
			trackLen = Math.max(track.offsetHeight - window.innerHeight, 1);
		};
		measure();
		window.addEventListener("resize", measure);

		let target = 0;
		const onScroll = () => {
			target = Math.min(1, Math.max(0, (window.scrollY - trackTop) / trackLen));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });

		// Safari/iOS won't decode frames for a video that has never played;
		// a muted play()+pause() on first interaction unlocks seeking.
		let primed = false;
		const prime = () => {
			if (primed) return;
			primed = true;
			video
				.play()
				.then(() => video.pause())
				.catch(() => {});
			window.removeEventListener("touchstart", prime);
			window.removeEventListener("scroll", prime);
		};
		window.addEventListener("touchstart", prime, { passive: true });
		window.addEventListener("scroll", prime, { passive: true });

		let raf = 0;
		let current = 0;
		const tick = () => {
			raf = requestAnimationFrame(tick);

			const next = current + (target - current) * 0.14;
			current = Math.abs(target - next) < 0.0004 ? target : next;
			const p = current;

			if (!reduced && duration > 0 && video.seekable.length > 0) {
				const t = p * Math.max(duration - 0.05, 0);
				if (Math.abs(video.currentTime - t) > 0.01) video.currentTime = t;
			}

			// Telemetry: fast launch that tapers as it climbs, like a real pull.
			const speed = Math.round(TOP_SPEED * (1 - (1 - p) ** 1.8));
			if (speedRef.current) {
				speedRef.current.textContent = String(speed).padStart(3, "0");
			}
			if (gearRef.current) {
				gearRef.current.textContent =
					speed < 5 ? "N" : String(Math.min(7, Math.floor(speed / 36) + 1));
			}
			if (railRef.current) {
				railRef.current.style.transform = `scaleY(${p})`;
			}

			if (introRef.current) {
				const k = Math.min(1, p / 0.22);
				introRef.current.style.opacity = String(1 - k);
				introRef.current.style.transform = `translateY(${-k * 60}px)`;
				introRef.current.style.visibility = k >= 1 ? "hidden" : "visible";
			}
			if (cueRef.current) {
				cueRef.current.style.opacity = String(Math.max(0, 1 - p / 0.08));
			}
			if (outroRef.current) {
				const k = Math.min(1, Math.max(0, (p - 0.78) / 0.18));
				outroRef.current.style.opacity = String(k);
				outroRef.current.style.transform = `translateY(${(1 - k) * 40}px)`;
			}
		};
		raf = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(raf);
			video.removeEventListener("loadedmetadata", onMeta);
			window.removeEventListener("resize", measure);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("touchstart", prime);
			window.removeEventListener("scroll", prime);
		};
	}, []);

	return (
		<section
			ref={trackRef}
			className="sh-track"
			aria-label="Zero to two hundred"
		>
			<div className="sh-sticky">
				<video
					ref={videoRef}
					className="sh-video"
					src={src}
					muted
					playsInline
					preload="auto"
					aria-hidden
					tabIndex={-1}
				/>
				<div className="sh-shade" aria-hidden />

				<div ref={introRef} className="sh-intro">
					<p className="sh-kicker">Apex · Lap 44 · Golden Hour</p>
					<h1 className="sh-title display">
						Zero to two hundred
						<span className="accent">before the sun goes down.</span>
					</h1>
				</div>

				<div ref={outroRef} className="sh-outro" aria-hidden>
					<div>
						<h2 className="display">Chase the light.</h2>
						<p>The corner ahead is yours</p>
					</div>
				</div>

				<div className="sh-hud" aria-hidden>
					<div className="sh-speed">
						<span ref={speedRef}>000</span>
						<em>km/h</em>
					</div>
					<div className="sh-gear">
						Gear <span ref={gearRef}>N</span>
					</div>
				</div>

				<div className="sh-rail" aria-hidden>
					<div ref={railRef} className="sh-rail-fill" />
				</div>

				<div ref={cueRef} className="sh-cue" aria-hidden>
					Scroll to drive
				</div>
			</div>
		</section>
	);
}
