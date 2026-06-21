import { Ambience } from "./components/Ambience";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Stats } from "./components/Stats";
import { Workflow } from "./components/Workflow";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { CtaFooter } from "./components/CtaFooter";

export default function App() {
	return (
		<>
			<Ambience />
			<a
				href="#features"
				className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-accent-foreground"
			>
				Skip to content
			</a>
			<Navbar />
			<main>
				<Hero />
				<Features />
				<Stats />
				<Workflow />
				<Pricing />
				<Testimonials />
				<Faq />
			</main>
			<CtaFooter />
		</>
	);
}
