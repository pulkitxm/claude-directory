import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { Stats } from "./components/Stats";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Showcase } from "./components/Showcase";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { Cta } from "./components/Cta";
import { Footer } from "./components/Footer";

/**
 * SCHEMATIC — a full showcase of the Industrial Skeuomorphism design system.
 * Sections share one rhythm (space-y-24 / 16 on mobile) and all mount onto the
 * same chassis. The matte-plastic noise overlay sits above everything via a
 * fixed, pointer-transparent layer (the "StyleWrapper").
 */
export default function App() {
	return (
		<>
			{/* skip link for keyboard users */}
			<a
				href="#features"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
			>
				Skip to content
			</a>

			<div className="noise-overlay" aria-hidden="true" />

			<Nav />

			<main>
				<Hero />
				<div className="space-y-16 md:space-y-24">
					<LogoStrip />
					<Stats />
					<Features />
					<HowItWorks />
					<Showcase />
					<Pricing />
					<Testimonials />
					<Faq />
					<Cta />
				</div>
			</main>

			<Footer />
		</>
	);
}
