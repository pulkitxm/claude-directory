import { motion } from "framer-motion";
import { Play } from "lucide-react";
import DashboardPreview from "./DashboardPreview";
import { Button } from "./ui/button";

const VIDEO_URL = `${import.meta.env.BASE_URL}assets/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4`;

const fadeUp = (y: number, duration: number, delay = 0) => ({
	initial: { opacity: 0, y },
	animate: { opacity: 1, y: 0 },
	transition: { duration, delay, ease: "easeOut" as const },
});

export default function Hero() {
	return (
		<section className="relative flex flex-1 flex-col items-center px-6 pt-8 md:pt-12">
			<video
				className="absolute inset-0 z-0 h-full w-full object-cover"
				src={VIDEO_URL}
				autoPlay
				muted
				loop
				playsInline
			/>

			<div className="relative z-10 flex w-full flex-col items-center">
				<motion.div
					{...fadeUp(10, 0.5)}
					className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 font-body text-sm text-muted-foreground"
				>
					<span>Now with GPT-5 support</span>
					<span aria-hidden="true">✨</span>
				</motion.div>

				<motion.h1
					{...fadeUp(16, 0.6, 0.1)}
					className="max-w-xl text-center font-display text-5xl leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-[5rem]"
				>
					The Future of <em className="italic">Smarter</em> Automation
				</motion.h1>

				<motion.p
					{...fadeUp(16, 0.6, 0.2)}
					className="mt-4 max-w-[650px] text-center font-body text-base leading-relaxed text-muted-foreground md:text-lg"
				>
					Automate your busywork with intelligent agents that learn, adapt, and
					execute—so your team can focus on what matters most.
				</motion.p>

				<motion.div
					{...fadeUp(16, 0.6, 0.3)}
					className="mt-5 flex items-center gap-3"
				>
					<Button className="rounded-full px-6 py-5 font-body text-sm font-medium">
						Book a demo
					</Button>
					<Button
						variant="ghost"
						size="icon"
						aria-label="Watch product video"
						className="h-11 w-11 rounded-full border-0 bg-background shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:bg-background/80"
					>
						<Play className="h-4 w-4 fill-foreground text-foreground" />
					</Button>
				</motion.div>

				<motion.div {...fadeUp(30, 0.8, 0.5)} className="mt-8 w-full max-w-5xl">
					<div
						className="overflow-hidden rounded-2xl p-3 backdrop-blur-xl md:p-4"
						style={{
							background: "rgba(255, 255, 255, 0.4)",
							border: "1px solid rgba(255, 255, 255, 0.5)",
							boxShadow: "var(--shadow-dashboard)",
						}}
					>
						<DashboardPreview />
					</div>
				</motion.div>
			</div>
		</section>
	);
}
