import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function App() {
	// `reducedMotion="user"` makes Framer honor prefers-reduced-motion for every
	// JS-driven animation in the tree — entrance fades collapse to opacity-only
	// and the hero's infinite loops stop — which the CSS guard alone can't do.
	return (
		<MotionConfig reducedMotion="user">
			<div className="relative min-h-screen bg-background">
				<Navbar />
				<main>
					<Hero />
					<Stats />
					<Features />
					<HowItWorks />
					<Pricing />
					<Testimonials />
					<FinalCTA />
				</main>
				<Footer />
			</div>
		</MotionConfig>
	);
}
