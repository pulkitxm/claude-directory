import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { Stats } from "./components/Stats";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { ProductDetail } from "./components/ProductDetail";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { Blog } from "./components/Blog";
import { Cta } from "./components/Cta";
import { Footer } from "./components/Footer";

export function App() {
	return (
		<div className="min-h-screen overflow-x-hidden">
			{/* skip-link for keyboard users */}
			<a
				href="#top"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-ink focus:bg-postit focus:px-4 focus:py-2"
			>
				Skip to content
			</a>

			<Nav />
			<main>
				<Hero />
				<LogoStrip />
				<Stats />
				<Features />
				<HowItWorks />
				<ProductDetail />
				<Pricing />
				<Testimonials />
				<Blog />
				<Cta />
			</main>
			<Footer />
		</div>
	);
}
