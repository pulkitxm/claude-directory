import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import WordsPullUp from "./WordsPullUp";

const HERO_VIDEO_URL =
	"./assets/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const NAV_ITEMS = [
	"Our story",
	"Collective",
	"Workshops",
	"Programs",
	"Inquiries",
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
	return (
		<section className="h-screen p-4 md:p-6">
			<div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
				<video
					src={HERO_VIDEO_URL}
					autoPlay
					loop
					muted
					playsInline
					className="absolute inset-0 h-full w-full object-cover"
				/>
				<div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

				<nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
					<div className="flex items-center gap-3 rounded-b-2xl bg-black px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
						{NAV_ITEMS.map((item) => (
							<a
								key={item}
								href="#"
								className="whitespace-nowrap text-[10px] transition-colors duration-300 sm:text-xs md:text-sm"
								style={{ color: "rgba(225, 224, 204, 0.8)" }}
								onMouseEnter={(e) => {
									e.currentTarget.style.color = "#E1E0CC";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)";
								}}
							>
								{item}
							</a>
						))}
					</div>
				</nav>

				<div className="absolute bottom-0 left-0 right-0 z-10">
					<div className="grid grid-cols-12 items-end gap-y-6 px-5 pb-6 sm:px-7 md:gap-x-6 md:px-9 md:pb-5">
						<div className="col-span-12 md:col-span-8">
							<WordsPullUp
								text="Prisma"
								showAsterisk
								className="text-[26vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
								style={{ color: "#E1E0CC" }}
							/>
						</div>
						<div className="col-span-12 flex flex-col items-start gap-5 sm:gap-6 md:col-span-4 md:pb-10">
							<motion.p
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
								className="max-w-md text-xs text-primary/70 sm:text-sm md:text-base"
								style={{ lineHeight: 1.2 }}
							>
								Prisma is a worldwide network of visual artists, filmmakers and
								storytellers bound not by place, status or labels but by passion
								and hunger to unlock potential through our unique perspectives.
							</motion.p>
							<motion.button
								initial={{ y: 20, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
								className="group flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 transition-all duration-300 hover:gap-3"
							>
								<span className="text-sm font-medium text-black sm:text-base">
									Join the lab
								</span>
								<span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
									<ArrowRight
										className="h-4 w-4 sm:h-5 sm:w-5"
										style={{ color: "#E1E0CC" }}
									/>
								</span>
							</motion.button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
