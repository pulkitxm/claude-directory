import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import ShinyText from "./components/ShinyText";

const BASE_URL = (import.meta as ImportMeta & { env: { BASE_URL: string } }).env
	.BASE_URL;
const VIDEO_URL = `${BASE_URL}assets/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4`;

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
	initial: { opacity: 0, y: 28 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.8, delay, ease: EASE },
});

export default function App() {
	const [enrollmentOpen, setEnrollmentOpen] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	return (
		<section
			id="home"
			className="relative h-screen overflow-hidden bg-black font-sans"
		>
			<video
				className="absolute inset-0 h-full w-full object-cover"
				src={VIDEO_URL}
				autoPlay
				loop
				muted
				playsInline
				aria-hidden
			/>

			<div
				className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/60"
				aria-hidden
			/>

			<div className="relative z-10 flex h-full flex-col">
				<Navbar />

				<div className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 md:pt-8 lg:px-8">
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
						<motion.p
							{...fadeUp(0.15)}
							className="max-w-md text-sm text-white/80 md:text-base"
						>
							We deliver transformative programs that empower emerging product
							designers with cutting-edge expertise and vision to thrive
							globally.
						</motion.p>
						<motion.p
							{...fadeUp(0.25)}
							className="text-sm text-white/80 md:text-base lg:text-right"
						>
							8000+ Talented Designers Launched !
						</motion.p>
					</div>
				</div>

				<div className="flex flex-1 items-center justify-center">
					<div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
						<motion.p
							{...fadeUp(0.35)}
							className="text-xs uppercase tracking-tight text-white/80 md:text-sm"
						>
							Seats for Next Program Opening Soon
						</motion.p>

						<h1 className="mt-4 text-5xl leading-[0.85] tracking-tighter sm:text-6xl md:mt-6 md:text-7xl lg:text-8xl xl:text-9xl">
							<motion.span
								{...fadeUp(0.45)}
								className="block font-medium text-white"
							>
								Become
							</motion.span>
							<motion.span {...fadeUp(0.55)} className="mt-1 block md:mt-2">
								<ShinyText
									text="Product Leader."
									speed={3}
									spread={100}
									baseColor="#64CEFB"
									shineColor="#ffffff"
									className="font-medium"
								/>
							</motion.span>
						</h1>

						<motion.div
							{...fadeUp(0.7)}
							className="mt-10 flex justify-center md:mt-14"
						>
							<button
								type="button"
								onClick={() => {
									setEnrollmentOpen(true);
									setSubmitted(false);
								}}
								className="group inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/40 ring-1 ring-white/10 transition-all duration-300 hover:bg-gray-900 hover:ring-white/20 md:px-8 md:py-4 md:text-base"
							>
								Apply for Next Enrollment
								<ArrowRight
									className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5"
									aria-hidden
								/>
							</button>
						</motion.div>
					</div>
				</div>

				<div className="h-10 md:h-14" aria-hidden />
			</div>

			{enrollmentOpen && (
				<div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md">
					<div className="w-full max-w-md rounded-3xl border border-white/20 bg-black/80 p-6 text-white shadow-2xl sm:p-8">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-xs uppercase tracking-[0.18em] text-sky-300">
									Next cohort
								</p>
								<h2 className="mt-2 text-2xl font-medium">
									Reserve your enrollment invite
								</h2>
							</div>
							<button
								type="button"
								onClick={() => setEnrollmentOpen(false)}
								aria-label="Close enrollment form"
								className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/80"
							>
								Close
							</button>
						</div>
						<form
							onSubmit={(event) => {
								event.preventDefault();
								setSubmitted(true);
							}}
							className="mt-6 space-y-4"
						>
							<label className="block text-sm text-white/80">
								Name
								<input
									required
									name="name"
									className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-sky-300"
								/>
							</label>
							<label className="block text-sm text-white/80">
								Email
								<input
									required
									type="email"
									name="email"
									className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-sky-300"
								/>
							</label>
							<button
								type="submit"
								className="w-full rounded-full bg-white px-5 py-3 font-medium text-black transition-colors hover:bg-sky-100"
							>
								Request invite
							</button>
							<p aria-live="polite" className="min-h-5 text-sm text-sky-300">
								{submitted ? "Your invite request is ready." : ""}
							</p>
						</form>
					</div>
				</div>
			)}
		</section>
	);
}
