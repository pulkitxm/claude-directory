import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { Features } from "./components/Features";
import { ZigZag } from "./components/ZigZag";
import { Stats } from "./components/Stats";
import { HowItWorks } from "./components/HowItWorks";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { Faq } from "./components/Faq";
import { Cta } from "./components/Cta";
import { Footer } from "./components/Footer";

export default function App() {
	return (
		<>
			<a
				href="#platform"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-indigo-700 focus:shadow-lift"
			>
				Skip to content
			</a>
			<Nav />
			<main>
				<Hero />
				<LogoStrip />
				<Features />
				<ZigZag />
				<Stats />
				<HowItWorks />
				<Testimonials />
				<Pricing />
				<Faq />
				<Cta />
			</main>
			<Footer />
		</>
	);
}
