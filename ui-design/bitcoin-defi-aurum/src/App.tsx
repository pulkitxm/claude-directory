import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { StatsBand } from "@/components/sections/StatsBand";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function App() {
	return (
		<div className="relative min-h-screen overflow-x-hidden bg-void text-white">
			{/* Global film grain — keeps the void from ever reading as flat black. */}
			<div
				className="pointer-events-none fixed inset-0 z-[1] bg-noise opacity-[0.025] mix-blend-screen"
				aria-hidden="true"
			/>
			<Navbar />
			<main>
				<Hero />
				<Ticker />
				<StatsBand />
				<Features />
				<HowItWorks />
				<Pricing />
				<Testimonials />
				<CTA />
			</main>
			<Footer />
		</div>
	);
}
