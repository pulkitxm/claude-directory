import { Nav } from "./sections/Nav";
import { TopMarquee } from "./sections/TopMarquee";
import { Hero } from "./sections/Hero";
import { Tokens } from "./sections/Tokens";
import { Features } from "./sections/Features";
import { Stats } from "./sections/Stats";
import { Components } from "./sections/Components";
import { Process } from "./sections/Process";
import { Pricing } from "./sections/Pricing";
import { Testimonials } from "./sections/Testimonials";
import { Faq } from "./sections/Faq";
import { CtaForm } from "./sections/CtaForm";
import { Footer } from "./sections/Footer";

/* LOUDHOUSE — a single-page Neo-brutalism design-system showcase.
   Sections are color-blocked to create a high-contrast rhythm:
   cream → black tape → cream hero → violet → cream → black → yellow →
   cream → violet → cream → red → black → yellow footer. */
export default function App() {
	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border-4 focus:border-neo-ink focus:bg-neo-secondary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:uppercase focus:tracking-widest focus:text-neo-ink focus:shadow-neo-sm"
			>
				Skip to content
			</a>

			<Nav />
			<TopMarquee />

			<main id="main">
				<Hero />
				<Tokens />
				<Features />
				<Stats />
				<Components />
				<Process />
				<Pricing />
				<Testimonials />
				<Faq />
				<CtaForm />
			</main>

			<Footer />
		</>
	);
}
