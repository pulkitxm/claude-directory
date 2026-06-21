import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/ui/Hero";
import { LogoStrip } from "@/components/ui/LogoStrip";
import { Features } from "@/components/ui/Features";
import { Stats } from "@/components/ui/Stats";
import { Workflow } from "@/components/ui/Workflow";
import { Showcase } from "@/components/ui/Showcase";
import { Testimonials } from "@/components/ui/Testimonials";
import { Pricing } from "@/components/ui/Pricing";
import { CTA } from "@/components/ui/CTA";
import { Footer } from "@/components/ui/Footer";

function App() {
	return (
		<main className="relative min-h-screen flex flex-col">
			<Navbar />
			<Hero />
			<LogoStrip />
			<Features />
			<Stats />
			<Workflow />
			<Showcase />
			<Testimonials />
			<Pricing />
			<CTA />
			<Footer />
		</main>
	);
}

export default App;
