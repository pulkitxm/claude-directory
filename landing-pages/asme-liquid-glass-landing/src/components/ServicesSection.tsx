import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const SERVICES = [
	{
		videoUrl:
			"./assets/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
		tag: "Strategy",
		title: "Research & Insight",
		description:
			"We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.",
	},
	{
		videoUrl:
			"./assets/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
		tag: "Craft",
		title: "Design & Execution",
		description:
			"From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.",
	},
];

const ServicesSection = () => {
	const ref = useRef<HTMLElement | null>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	return (
		<section
			ref={ref}
			className="relative bg-black py-28 md:py-40 px-6 overflow-hidden"
		>
			<div
				className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]"
				aria-hidden="true"
			/>
			<div className="relative max-w-6xl mx-auto">
				<motion.div
					className="flex items-end justify-between mb-12 md:mb-16"
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7 }}
				>
					<h2 className="text-3xl md:text-5xl text-white tracking-tight">
						What we do
					</h2>
					<p className="hidden md:block text-white/40 text-sm">Our services</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
					{SERVICES.map((service, index) => (
						<motion.article
							key={service.tag}
							className="liquid-glass rounded-3xl overflow-hidden group"
							initial={{ opacity: 0, y: 50 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.8, delay: index * 0.15 }}
						>
							<div className="relative aspect-video overflow-hidden">
								<video
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
									src={service.videoUrl}
									muted
									autoPlay
									loop
									playsInline
									preload="auto"
									aria-hidden="true"
									tabIndex={-1}
								/>
								<div
									className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
									aria-hidden="true"
								/>
							</div>
							<div className="p-6 md:p-8">
								<div className="flex items-center justify-between mb-4">
									<p className="uppercase tracking-widest text-white/40 text-xs">
										{service.tag}
									</p>
									<span
										className="liquid-glass rounded-full p-2 text-white"
										aria-hidden="true"
									>
										<ArrowUpRight size={18} />
									</span>
								</div>
								<h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight">
									{service.title}
								</h3>
								<p className="text-white/50 text-sm leading-relaxed">
									{service.description}
								</p>
							</div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
};

export default ServicesSection;
