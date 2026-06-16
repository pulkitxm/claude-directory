import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { Benefits } from "./components/Benefits";
import { HowItWorks } from "./components/HowItWorks";
import { ProductDetail } from "./components/ProductDetail";
import { Pricing } from "./components/Pricing";
import { Journal } from "./components/Journal";
import { Faq } from "./components/Faq";
import { Cta } from "./components/Cta";
import { Footer } from "./components/Footer";
import { Fab } from "./components/Fab";

/* Lumi — a Material You (MD3) showcase landing page.
   Section flow alternates tonal backgrounds (surface) with the base surface,
   and uses full-width colored containers (primary Benefits, tertiary CTA)
   sparingly for emphasis — exactly as the design system prescribes. */
export default function App() {
	return (
		<>
			<a
				href="#top"
				className="focus-ring sr-only rounded-full bg-[var(--color-md-primary)] px-4 py-2 text-[var(--color-md-on-primary)] focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
			>
				Skip to content
			</a>
			<Nav />
			<main>
				<Hero />
				<LogoStrip />
				<Benefits />
				<HowItWorks />
				<ProductDetail />
				<Pricing />
				<Journal />
				<Faq />
				<Cta />
			</main>
			<Footer />
			<Fab />
		</>
	);
}
