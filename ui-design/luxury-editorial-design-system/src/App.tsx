import { GrainOverlay, GridLines, Navbar } from "./components/Chrome";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Stats } from "./components/Stats";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { Blog } from "./components/Blog";
import { FooterCta } from "./components/FooterCta";

export default function App() {
	return (
		<div className="relative min-h-screen bg-background text-foreground antialiased">
			{/* Signature bold-factor structural layers */}
			<GridLines />
			<GrainOverlay />

			<Navbar />

			<main className="relative z-10">
				<Hero />
				<Features />
				<Stats />
				<Testimonials />
				<Faq />
				<Blog />
			</main>

			<FooterCta />
		</div>
	);
}
