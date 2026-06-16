import { Blobs } from "./components/primitives";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { Stats } from "./components/Stats";
import { Features } from "./components/Features";
import { Showcase } from "./components/Showcase";
import { Benefits } from "./components/Benefits";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { Cta } from "./components/Cta";
import { Footer } from "./components/Footer";

/* The clay world. Blobs render once at the root so every section sits in the
   same diffused lighting; sections then flow top to bottom exercising the full
   system: hero → trusted-by → stats orbs → bento features → live playground →
   split benefits → how-it-works → pricing → testimonials → FAQ → CTA → footer. */
export default function App() {
	return (
		<>
			<Blobs />
			<Nav />
			<main>
				<Hero />
				<LogoStrip />
				<Stats />
				<Features />
				<Showcase />
				<Benefits />
				<HowItWorks />
				<Pricing />
				<Testimonials />
				<Faq />
				<Cta />
			</main>
			<Footer />
		</>
	);
}
