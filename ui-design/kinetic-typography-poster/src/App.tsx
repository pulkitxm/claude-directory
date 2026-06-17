import { Noise } from "./components/Noise";
import { Nav } from "./sections/Nav";
import { Hero } from "./sections/Hero";
import { StatsMarquee } from "./sections/StatsMarquee";
import { Manifesto } from "./sections/Manifesto";
import { StickyFeatures } from "./sections/StickyFeatures";
import { Process } from "./sections/Process";
import { Benefits } from "./sections/Benefits";
import { TestimonialsMarquee } from "./sections/TestimonialsMarquee";
import { Pricing } from "./sections/Pricing";
import { Faq } from "./sections/Faq";
import { CtaForm } from "./sections/CtaForm";
import { Footer } from "./sections/Footer";

export default function App() {
	return (
		<>
			{/* Keyboard skip link — hidden until focused, then a bold acid chip. */}
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-acid focus:px-4 focus:py-2 focus:font-bold focus:uppercase focus:tracking-tighter focus:text-acid-foreground"
			>
				Skip to content
			</a>

			<Noise />
			<Nav />

			<main id="main">
				<Hero />
				<StatsMarquee />
				<Manifesto />
				<StickyFeatures />
				<Process />
				<Benefits />
				<TestimonialsMarquee />
				<Pricing />
				<Faq />
				<CtaForm />
			</main>

			<Footer />
		</>
	);
}
