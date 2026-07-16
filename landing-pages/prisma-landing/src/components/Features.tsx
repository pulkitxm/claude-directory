import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRef } from "react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";

const FEATURES_VIDEO_URL =
	"./assets/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4";

const CARD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CARDS = [
	{
		number: "01",
		title: "Project Storyboard.",
		icon: "./assets/hf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.webp",
		items: [
			"Scene-by-scene visual planning",
			"Drag-and-drop shot sequencing",
			"Collaborative beat boards",
			"Version history for every frame",
		],
	},
	{
		number: "02",
		title: "Smart Critiques.",
		icon: "./assets/hf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.webp",
		items: [
			"AI-powered analysis of pacing and tone",
			"Creative notes pinned to the exact frame",
			"Integrations with your favorite tools",
		],
	},
	{
		number: "03",
		title: "Immersion Capsule.",
		icon: "./assets/hf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.webp",
		items: [
			"Silences notifications during deep work",
			"Ambient soundscapes tuned to your scene",
			"Syncs sessions with your creative schedule",
		],
	},
];

export default function Features() {
	const gridRef = useRef<HTMLDivElement>(null);
	const gridInView = useInView(gridRef, { once: true, margin: "-100px" });

	return (
		<section className="relative min-h-screen bg-black px-4 py-16 sm:py-20 md:px-6 md:py-28">
			<div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
			<div className="relative z-10 mx-auto max-w-7xl">
				<div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
					<WordsPullUpMultiStyle
						segments={[
							{
								text: "Studio-grade workflows for visionary creators.",
								className: "",
							},
							{
								text: "Built for pure vision. Powered by art.",
								className: "text-gray-500",
							},
						]}
						className="text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
						style={{ color: "#E1E0CC" }}
					/>
				</div>

				<div
					ref={gridRef}
					className="grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:h-[480px] lg:grid-cols-4"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={gridInView ? { opacity: 1, scale: 1 } : {}}
						transition={{ delay: 0, duration: 0.7, ease: CARD_EASE }}
						className="relative h-[420px] overflow-hidden rounded-2xl md:h-[480px] lg:h-full"
					>
						<video
							src={FEATURES_VIDEO_URL}
							autoPlay
							loop
							muted
							playsInline
							className="absolute inset-0 h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
						<p
							className="absolute bottom-5 left-5 right-5 text-base sm:text-lg"
							style={{ color: "#E1E0CC" }}
						>
							Your creative canvas.
						</p>
					</motion.div>

					{CARDS.map((card, i) => (
						<motion.div
							key={card.number}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={gridInView ? { opacity: 1, scale: 1 } : {}}
							transition={{
								delay: (i + 1) * 0.15,
								duration: 0.7,
								ease: CARD_EASE,
							}}
							className="flex flex-col rounded-2xl bg-[#212121] p-5 sm:p-6"
						>
							<img
								src={card.icon}
								alt={`${card.title} icon`}
								loading="lazy"
								className="h-10 w-10 rounded sm:h-12 sm:w-12"
							/>
							<h3
								className="mt-5 text-lg sm:mt-6 sm:text-xl"
								style={{ color: "#E1E0CC" }}
							>
								{card.title}{" "}
								<sup className="text-[10px] text-gray-500 sm:text-xs">
									({card.number})
								</sup>
							</h3>
							<ul className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:gap-3">
								{card.items.map((item) => (
									<li key={item} className="flex items-start gap-2">
										<Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" />
										<span className="text-xs text-gray-400 sm:text-sm">
											{item}
										</span>
									</li>
								))}
							</ul>
							<a
								href="#"
								className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-xs text-primary sm:text-sm"
							>
								Learn more
								<ArrowRight className="h-3.5 w-3.5 -rotate-45 transition-transform duration-300 group-hover:rotate-0 sm:h-4 sm:w-4" />
							</a>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
