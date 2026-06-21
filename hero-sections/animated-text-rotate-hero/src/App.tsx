import { AmbientBackground } from "@/components/AmbientBackground";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { TradeTicker } from "@/components/TradeTicker";
import { TrustStrip } from "@/components/TrustStrip";
import { Hero } from "@/components/ui/animated-hero";

/**
 * Demo host for the integrated <Hero /> (the copied shadcn component).
 * The component itself is untouched; the surrounding shell — sticky glass
 * navbar, live "trade desk" ticker, ambient teal background, trust strip and
 * footer — gives it a place to live and shows the best context to use it in:
 * the above-the-fold section of a B2B SaaS landing page.
 */
export default function App() {
	return (
		<div
			id="top"
			className="relative flex min-h-screen flex-col bg-background text-foreground"
		>
			<Navbar />
			<TradeTicker />

			<main className="relative flex-1">
				<section className="relative">
					<AmbientBackground />
					{/* The integrated component, exactly as shipped from /components/ui. */}
					<Hero />
				</section>

				<TrustStrip />
			</main>

			<Footer />
		</div>
	);
}
