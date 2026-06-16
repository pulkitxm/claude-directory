import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { Stats } from "./components/Stats";
import { Features } from "./components/Features";
import { Showcase } from "./components/Showcase";
import { Benefits } from "./components/Benefits";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";
import { Faq } from "./components/Faq";
import { Cta } from "./components/Cta";
import { Footer } from "./components/Footer";

/* Section order creates the sharp color rotation the system calls for:
   White → Blue → White → White → Fog → White → Emerald → Dark → White →
   White → Amber → Dark. Color blocks separate structure; never lines. */
export default function App() {
	return (
		<>
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
				<Faq />
				<Cta />
			</main>
			<Footer />
		</>
	);
}
