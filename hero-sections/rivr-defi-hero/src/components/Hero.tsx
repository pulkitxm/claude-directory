import { motion } from "motion/react";
import BottomLeftCard from "./BottomLeftCard";
import BottomRightCorner from "./BottomRightCorner";
import HeroBadge from "./HeroBadge";
import Navbar from "./Navbar";

const VIDEO_URL = `${import.meta.env.BASE_URL}assets/hf_20260428_193507_4286c423-2fd9-4efd-92bd-91a939453fc1.mp4`;

export default function Hero() {
	return (
		<div className="w-full h-screen flex items-center justify-center p-3 md:p-5 bg-[#f0f0f0]">
			<section className="relative w-full max-w-[1536px] h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-none flex flex-col items-center bg-white/10 group">
				<video
					autoPlay
					muted
					loop
					playsInline
					src={VIDEO_URL}
					className="absolute inset-0 w-full h-full object-cover object-[65%] lg:object-center z-0"
				/>

				<div className="relative z-10 w-full h-full flex flex-col items-center">
					<Navbar />

					<div className="w-full flex flex-col items-center pt-8 px-6 text-center max-w-4xl">
						<HeroBadge />

						<motion.h1
							initial={{ opacity: 0, scale: 0.98 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-normal text-[#5E6470] mb-2 tracking-tight leading-[1.05]"
						>
							Fluid Asset Streams
						</motion.h1>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="text-sm sm:text-base md:text-lg text-[#5E6470] opacity-80 leading-relaxed max-w-xl font-normal"
						>
							Access Smart Vaults, stake RIVR, NFTs, transform rigid holdings
							into liquid cash instantly.
						</motion.p>
					</div>

					<BottomLeftCard />
					<BottomRightCorner />
				</div>
			</section>
		</div>
	);
}
