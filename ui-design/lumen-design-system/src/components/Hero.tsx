import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Command } from "lucide-react";
import { Button } from "./Button";
import { ProductMock } from "./ProductMock";

const EXPO = [0.16, 1, 0.3, 1] as const;

const heroItem = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EXPO } },
};

export function Hero() {
	// Scroll-linked parallax over the first viewport of scrolling.
	const { scrollY } = useScroll();
	const opacity = useTransform(scrollY, [0, 480], [1, 0]);
	const scale = useTransform(scrollY, [0, 480], [1, 0.95]);
	const y = useTransform(scrollY, [0, 480], [0, 100]);

	return (
		<section
			id="top"
			className="relative px-5 pb-12 pt-32 sm:px-8 sm:pt-40 lg:pb-20 lg:pt-44"
		>
			<motion.div
				style={{ opacity, scale, y }}
				className="mx-auto flex max-w-[860px] flex-col items-center text-center"
			>
				<motion.div
					initial="hidden"
					animate="show"
					variants={{ show: { transition: { staggerChildren: 0.08 } } }}
					className="flex flex-col items-center"
				>
					{/* Announcement pill */}
					<motion.a
						variants={heroItem}
						href="#features"
						className="group mb-7 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.08] py-1.5 pl-2 pr-3.5 text-[13px] text-fg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-colors duration-quick ease-expo hover:bg-accent/[0.14]"
					>
						<span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-[#c2c9ff]">
							<Sparkles size={11} /> v2.0
						</span>
						<span className="text-fg-muted transition-colors group-hover:text-fg">
							The ambient interface engine is here
						</span>
						<ArrowRight
							size={13}
							className="text-accent transition-transform duration-quick ease-expo group-hover:translate-x-0.5"
						/>
					</motion.a>

					{/* Display headline with gradient fill + animated accent phrase */}
					<motion.h1
						variants={heroItem}
						className="text-balance text-4xl font-semibold leading-[1.04] tracking-display sm:text-6xl lg:text-7xl"
					>
						<span className="text-grad">The interface layer for</span>{" "}
						<span className="text-accent-grad">software that feels fast</span>
					</motion.h1>

					<motion.p
						variants={heroItem}
						className="mt-6 max-w-[600px] text-pretty text-base leading-relaxed text-fg-muted sm:text-lg"
					>
						Lumen is a design system for premium developer tools — layered
						ambient lighting, cursor-aware surfaces, and precision
						micro-interactions, shipped as composable React primitives.
					</motion.p>

					<motion.div
						variants={heroItem}
						className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
					>
						<Button variant="primary" size="lg" href="#pricing">
							Start building <ArrowRight size={16} />
						</Button>
						<Button variant="secondary" size="lg" href="#components">
							<Command size={15} /> Browse components
						</Button>
					</motion.div>

					<motion.p
						variants={heroItem}
						className="mt-6 font-mono text-xs tracking-wider text-fg-muted/70"
					>
						npm i @lumen/ui · MIT licensed · 0 runtime deps
					</motion.p>
				</motion.div>
			</motion.div>

			{/* Product mock floats below the copy, scaling/fading in. */}
			<motion.div
				initial={{ opacity: 0, y: 40, scale: 0.97 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.9, ease: EXPO, delay: 0.5 }}
				className="mx-auto mt-16 max-w-[1080px] px-1 sm:mt-20"
			>
				<ProductMock />
			</motion.div>
		</section>
	);
}
