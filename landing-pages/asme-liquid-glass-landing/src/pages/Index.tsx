import { ArrowRight, Globe, Instagram, Twitter } from "lucide-react";
import { useEffect, useRef } from "react";
import AboutSection from "../components/AboutSection";
import FeaturedVideoSection from "../components/FeaturedVideoSection";
import PhilosophySection from "../components/PhilosophySection";
import ServicesSection from "../components/ServicesSection";

const HERO_VIDEO_URL =
	"./assets/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

const FADE_MS = 500;
const FADE_OUT_LEAD_S = 0.55;
const RESTART_DELAY_MS = 100;

const NAV_LINKS = ["Features", "Pricing", "About"];

const Index = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const rafRef = useRef<number | null>(null);
	const restartTimerRef = useRef<number | null>(null);
	const hasStartedRef = useRef(false);
	const isFadingOutRef = useRef(false);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const animateOpacity = (from: number, to: number, onDone?: () => void) => {
			if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
			const start = performance.now();
			const step = (now: number) => {
				const t = Math.min((now - start) / FADE_MS, 1);
				video.style.opacity = String(from + (to - from) * t);
				if (t < 1) {
					rafRef.current = requestAnimationFrame(step);
				} else {
					rafRef.current = null;
					onDone?.();
				}
			};
			rafRef.current = requestAnimationFrame(step);
		};

		const handleCanPlay = () => {
			if (hasStartedRef.current) return;
			hasStartedRef.current = true;
			void video.play().catch(() => {
				/* Autoplay can be blocked; the poster-less black frame is acceptable. */
			});
			animateOpacity(0, 1);
		};

		const handleTimeUpdate = () => {
			if (isFadingOutRef.current || !Number.isFinite(video.duration)) return;
			const remaining = video.duration - video.currentTime;
			if (remaining <= FADE_OUT_LEAD_S) {
				isFadingOutRef.current = true;
				const current = Number.parseFloat(video.style.opacity || "1");
				animateOpacity(current, 0);
			}
		};

		const handleEnded = () => {
			video.style.opacity = "0";
			restartTimerRef.current = window.setTimeout(() => {
				video.currentTime = 0;
				void video.play().catch(() => {});
				isFadingOutRef.current = false;
				animateOpacity(0, 1);
			}, RESTART_DELAY_MS);
		};

		video.addEventListener("canplay", handleCanPlay);
		video.addEventListener("timeupdate", handleTimeUpdate);
		video.addEventListener("ended", handleEnded);

		return () => {
			video.removeEventListener("canplay", handleCanPlay);
			video.removeEventListener("timeupdate", handleTimeUpdate);
			video.removeEventListener("ended", handleEnded);
			if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
			if (restartTimerRef.current !== null)
				window.clearTimeout(restartTimerRef.current);
		};
	}, []);

	return (
		<main className="bg-black">
			<section className="min-h-screen overflow-hidden relative flex flex-col">
				<video
					ref={videoRef}
					className="absolute inset-0 w-full h-full object-cover object-bottom"
					src={HERO_VIDEO_URL}
					muted
					autoPlay
					playsInline
					preload="auto"
					style={{ opacity: 0 }}
					aria-hidden="true"
					tabIndex={-1}
				/>

				<header className="relative z-20 px-6 py-6">
					<nav className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
						<div className="flex items-center">
							<a
								href="#"
								className="flex items-center gap-2.5"
								aria-label="Asme home"
							>
								<Globe size={24} className="text-white" aria-hidden="true" />
								<span className="text-white font-semibold text-lg">Asme</span>
							</a>
							<div className="hidden md:flex items-center gap-8 ml-8">
								{NAV_LINKS.map((link) => (
									<a
										key={link}
										href="#"
										className="text-white/80 hover:text-white text-sm font-medium transition-colors"
									>
										{link}
									</a>
								))}
							</div>
						</div>
						<div className="flex items-center gap-4">
							<button type="button" className="text-white text-sm font-medium">
								Sign Up
							</button>
							<button
								type="button"
								className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
							>
								Login
							</button>
						</div>
					</nav>
				</header>

				<div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
					<h1
						className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap mb-10"
						style={{ fontFamily: "'Instrument Serif', serif" }}
					>
						Know it <em className="italic">all</em>.
					</h1>

					<form
						className="liquid-glass rounded-full max-w-xl w-full pl-6 pr-2 py-2 flex items-center gap-3"
						onSubmit={(event) => event.preventDefault()}
					>
						<input
							type="email"
							autoComplete="email"
							placeholder="Enter your email"
							aria-label="Email address"
							className="flex-1 min-w-0 bg-transparent text-white placeholder:text-white/40 text-sm outline-none"
						/>
						<button
							type="submit"
							aria-label="Subscribe"
							className="bg-white rounded-full p-3 text-black shrink-0 hover:bg-white/90 transition-colors"
						>
							<ArrowRight size={20} aria-hidden="true" />
						</button>
					</form>

					<p className="text-white text-sm leading-relaxed px-4 mt-6 max-w-md">
						Stay updated with the latest news and insights. Subscribe to our
						newsletter today and never miss out on exciting updates.
					</p>

					<button
						type="button"
						className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors mt-8"
					>
						Manifesto
					</button>
				</div>

				<footer className="relative z-10 flex justify-center gap-4 pb-12">
					{[
						{ label: "Instagram", Icon: Instagram },
						{ label: "Twitter", Icon: Twitter },
						{ label: "Website", Icon: Globe },
					].map(({ label, Icon }) => (
						<a
							key={label}
							href="#"
							aria-label={label}
							className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
						>
							<Icon size={20} aria-hidden="true" />
						</a>
					))}
				</footer>
			</section>

			<AboutSection />
			<FeaturedVideoSection />
			<PhilosophySection />
			<ServicesSection />
		</main>
	);
};

export default Index;
