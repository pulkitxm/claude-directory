import { Benefits } from "./components/Benefits";
import { Faq } from "./components/Faq";
import { Features } from "./components/Features";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Journal } from "./components/Journal";
import { Navbar } from "./components/Navbar";
import { Pricing } from "./components/Pricing";
import { ProductDetail } from "./components/ProductDetail";
import { Stats } from "./components/Stats";
import { Testimonials } from "./components/Testimonials";


export default function App() {
	return (
		<div className="relative min-h-screen bg-background">
			{}
			<div className="grain-overlay" aria-hidden />

			<Navbar />
			<main>
				<Hero />
				<Stats />
				<Features />
				<HowItWorks />
				<ProductDetail />
				<Benefits />
				<Testimonials />
				<Pricing />
				<Journal />
				<Faq />
				<FinalCta />
			</main>
			<Footer />
		</div>
	);
}
