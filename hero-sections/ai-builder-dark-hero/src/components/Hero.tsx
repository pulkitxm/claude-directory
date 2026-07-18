import Hls from "hls.js";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

const VIDEO_SRC =
	"https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

const POSTER_SRC = `${import.meta.env.BASE_URL}assets/unsplash-photo-1647356191320-d7a1f80ca777.jpg`;

function BackgroundVideo() {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(VIDEO_SRC);
			hls.attachMedia(video);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				video.play().catch((e) => console.log("Auto-play prevented:", e));
			});
			return () => {
				hls.destroy();
			};
		} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
			video.src = VIDEO_SRC;
			video.addEventListener("loadedmetadata", () => {
				video.play().catch((e) => console.log("Auto-play prevented:", e));
			});
		}
	}, []);

	return (
		<video
			ref={videoRef}
			muted
			loop
			playsInline
			poster={POSTER_SRC}
			className="absolute inset-0 h-full w-full object-cover opacity-60"
		/>
	);
}

export default function Hero() {
	return (
		<section className="relative min-h-screen w-full overflow-hidden bg-[#000000] text-white">
			{/* Background video layer */}
			<BackgroundVideo />

			{/* Video overlay */}
			<div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

			{/* Decorative gradients */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute top-[-20%] left-[20%] h-[600px] w-[600px] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute bottom-[-10%] right-[20%] h-[500px] w-[500px] rounded-full bg-indigo-900/20 blur-[120px] mix-blend-screen"
			/>

			{/* Content */}
			<div className="relative z-10 flex min-h-screen items-center justify-center px-6">
				<div className="mx-auto mt-20 flex max-w-5xl flex-col items-center space-y-12 text-center">
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="font-serif text-3xl leading-[1.1] text-white sm:text-5xl lg:text-[48px]"
					>
						Design at the speed of thought
					</motion.p>

					<motion.h1
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className="bg-gradient-to-b from-white via-white to-[#b4c0ff] bg-clip-text font-sans text-6xl leading-[0.9] font-semibold tracking-tighter text-transparent sm:text-8xl lg:text-[136px]"
					>
						Build Faster
					</motion.h1>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.7 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className="max-w-xl font-sans text-lg leading-[1.65] text-white sm:text-[20px]"
					>
						Create fully functional, SEO-optimized websites in seconds with our
						advanced AI engine.
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.5 }}
						className="flex flex-col items-center gap-6 sm:flex-row"
					>
						<button
							type="button"
							className="group flex items-center gap-4 rounded-full bg-white py-2 pl-6 pr-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
						>
							<span className="font-sans text-lg font-medium text-[#0a0400]">
								Start Building Free
							</span>
							<span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3054ff] transition-colors duration-300 group-hover:bg-[#2040e0]">
								<ArrowRight
									size={20}
									className="text-white"
									aria-hidden="true"
								/>
							</span>
						</button>

						<button
							type="button"
							className="group flex items-center gap-2 rounded-lg px-4 py-2 font-sans text-white/70 backdrop-blur-sm transition-colors duration-300 hover:bg-white/5 hover:text-white"
						>
							See Examples
							<ArrowRight
								size={16}
								className="transition-transform duration-300 group-hover:translate-x-1"
								aria-hidden="true"
							/>
						</button>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
