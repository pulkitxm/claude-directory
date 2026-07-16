import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURED_VIDEO_URL =
	"./assets/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4";

const FeaturedVideoSection = () => {
	const ref = useRef<HTMLElement | null>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section
			ref={ref}
			className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden"
		>
			<div className="max-w-6xl mx-auto">
				<motion.div
					className="relative rounded-3xl overflow-hidden aspect-video"
					initial={{ opacity: 0, y: 60 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.9 }}
				>
					<video
						className="w-full h-full object-cover"
						src={FEATURED_VIDEO_URL}
						muted
						autoPlay
						loop
						playsInline
						preload="auto"
						aria-hidden="true"
						tabIndex={-1}
					/>
					<div
						className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
						aria-hidden="true"
					/>
					<div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
						<div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
							<p className="text-white/50 text-xs tracking-widest uppercase mb-3">
								Our Approach
							</p>
							<p className="text-white text-sm md:text-base leading-relaxed">
								We believe in the power of curiosity-driven exploration. Every
								project starts with a question, and every answer opens a new
								door to innovation.
							</p>
						</div>
						<motion.button
							type="button"
							className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium self-start md:self-auto shrink-0"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Explore more
						</motion.button>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default FeaturedVideoSection;
