import { MotionConfig } from "framer-motion";
import { AmbientBackground } from "./components/AmbientBackground";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { LogoMarquee } from "./components/LogoMarquee";
import { BentoFeatures } from "./components/BentoFeatures";
import { TokensSection } from "./components/TokensSection";
import { ComponentsShowcase } from "./components/ComponentsShowcase";
import { Pricing } from "./components/Pricing";
import { CTABand } from "./components/CTABand";
import { Footer } from "./components/Footer";
import { usePrefersReducedMotion } from "./hooks/useReducedMotion";

export default function App() {
	const reduced = usePrefersReducedMotion();

	return (
		// MotionConfig globally disables Framer Motion transitions under
		// prefers-reduced-motion so entrance/parallax fall back to static content.
		<MotionConfig reducedMotion={reduced ? "always" : "never"}>
			<AmbientBackground />

			<div className="relative z-10">
				<a
					href="#features"
					className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
				>
					Skip to content
				</a>

				<Navbar />

				<main>
					<Hero />

					<div className="section-rule" />
					<LogoMarquee />

					<div className="section-rule" />
					<BentoFeatures />

					<div className="section-rule" />
					<TokensSection />

					<div className="section-rule" />
					<ComponentsShowcase />

					<div className="section-rule" />
					<Pricing />

					<CTABand />
				</main>

				<Footer />
			</div>
		</MotionConfig>
	);
}
