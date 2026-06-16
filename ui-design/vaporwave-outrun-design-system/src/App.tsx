import { Backdrop, Scanlines } from "./components/Backdrop";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { Features } from "./components/Features";
import { Stats } from "./components/Stats";
import { HowItWorks } from "./components/HowItWorks";
import { Benefits } from "./components/Benefits";
import { Testimonials } from "./components/Testimonials";
import { Pricing } from "./components/Pricing";
import { Faq } from "./components/Faq";
import { Cta } from "./components/Cta";
import { Footer } from "./components/Footer";

export default function App() {
	return (
		<>
			{/* Fixed atmosphere behind everything */}
			<Backdrop />

			<a
				href="#top"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border-2 focus:border-[var(--color-cyan)] focus:bg-[var(--color-void)] focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:uppercase focus:text-[var(--color-cyan)]"
			>
				Skip to content
			</a>

			<Nav />

			<main className="relative">
				<Hero />
				<LogoStrip />
				<Features />
				<Stats />
				<HowItWorks />
				<Benefits />
				<Testimonials />
				<Pricing />
				<Faq />
				<Cta />
			</main>

			<Footer />

			{/* CRT scanline overlay above all content */}
			<Scanlines />
		</>
	);
}
