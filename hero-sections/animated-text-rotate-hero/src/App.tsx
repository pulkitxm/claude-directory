import { MotionConfig } from "framer-motion";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { TradeTicker } from "@/components/TradeTicker";
import { TrustStrip } from "@/components/TrustStrip";
import { Hero } from "@/components/ui/animated-hero";
export default function App() {
    return (<MotionConfig reducedMotion="user"><div id="top" className="relative flex min-h-screen flex-col bg-background text-foreground">
			<Navbar />
			<TradeTicker />

			<main className="relative flex-1">
				<section id="preview" className="relative">
					<AmbientBackground />
					
					<Hero />
				</section>

				<TrustStrip />
			</main>

			<Footer />
		</div></MotionConfig>);
}
