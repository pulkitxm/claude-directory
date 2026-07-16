import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import heroDashboard from "@/assets/hero-dashboard.png";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const VIDEO_URL =
	"./assets/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

const NAV_LINKS = ["Home", "Services", "Reviews", "Contact us"];

export default function Hero() {
	const sectionRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	const contentY = useTransform(scrollYProgress, [0, 1], [0, -200]);
	const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
	const dashboardY = useTransform(scrollYProgress, [0, 1], [0, -250]);

	return (
		<section
			ref={sectionRef}
			data-testid="hero"
			className="relative h-screen overflow-hidden"
		>
			<header className="relative z-40 flex items-center justify-between px-8 py-4 md:px-28">
				<div className="flex items-center gap-12 md:gap-20">
					<a href="#" className="flex items-center gap-2.5">
						<img src={logo} alt="Neuralyn logo" className="h-8 w-8" />
						<span className="text-xl font-bold tracking-tight">Neuralyn</span>
					</a>
					<nav className="hidden items-center gap-1 md:flex" aria-label="Main">
						{NAV_LINKS.map((link) => (
							<a
								key={link}
								href="#"
								className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
							>
								{link}
								{link === "Services" && (
									<ChevronDown className="h-4 w-4" aria-hidden="true" />
								)}
							</a>
						))}
					</nav>
				</div>
				<Button className="rounded-lg bg-foreground text-sm font-semibold text-background transition-opacity hover:bg-foreground hover:opacity-90">
					Sign In
				</Button>
			</header>

			<motion.div
				style={{ y: contentY, opacity: contentOpacity }}
				data-testid="hero-content"
				className="relative z-20 mt-16 flex flex-col items-center px-4 text-center md:mt-20"
			>
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0 }}
					className="liquid-glass mb-6 flex items-center gap-2 rounded-lg px-3 py-2"
				>
					<span className="rounded-md bg-white px-2 py-0.5 text-sm font-medium text-black">
						New
					</span>
					<span className="text-sm font-medium text-muted-foreground">
						Say Hello to Corewave v3.2
					</span>
				</motion.div>

				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="mb-3 text-5xl font-medium leading-tight tracking-[-2px] md:text-7xl md:leading-[1.15]"
				>
					Your Insights.
					<br />
					One Clear{" "}
					<span className="font-serif font-normal italic">Overview.</span>
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					data-testid="hero-subtitle"
					className="mb-8 text-lg font-normal leading-6 opacity-90"
					style={{ color: "hsl(var(--hero-subtitle))" }}
				>
					Neuralyn helps teams track metrics, goals,
					<br />
					and progress with precision.
				</motion.p>

				<motion.button
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.98 }}
					className="rounded-full bg-foreground px-8 py-3.5 text-base font-medium text-background"
				>
					Get Started for Free
				</motion.button>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.4 }}
				data-testid="dashboard-area"
				className="relative z-10 mt-12 w-screen md:mt-16"
				style={{ marginLeft: "calc(-50vw + 50%)", aspectRatio: "16 / 9" }}
			>
				<video
					className="absolute inset-0 h-full w-full object-cover"
					src={VIDEO_URL}
					autoPlay
					muted
					loop
					playsInline
				/>
				<div className="absolute inset-0 flex items-center justify-center">
					<motion.img
						src={heroDashboard}
						alt="Neuralyn analytics dashboard"
						data-testid="dashboard-image"
						className="w-[90%] max-w-5xl rounded-2xl"
						style={{ y: dashboardY, mixBlendMode: "luminosity" }}
					/>
				</div>
			</motion.div>

			<div
				data-testid="hero-fade"
				className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-40 bg-gradient-to-t from-background to-transparent"
			/>
		</section>
	);
}
