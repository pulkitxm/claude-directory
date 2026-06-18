import { ApiReference } from "@/components/sections/ApiReference";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Install } from "@/components/sections/Install";
import { Navbar } from "@/components/sections/Navbar";
import { Stages } from "@/components/sections/Stages";
import { TelemetryHud } from "@/components/sections/TelemetryHud";

export default function App() {
	return (
		// The outermost shell deliberately has no overflow set — a non-visible
		// overflow on the document-level wrapper would promote it to a scroll
		// container and break useScroll measurement for the nested ContainerScroll
		// targets. Horizontal clipping is applied on <main> below with
		// overflow-x-clip, which contains the decorative glows without creating a
		// scroll container.
		<div className="relative min-h-screen bg-ink text-white">
			<Navbar />
			<TelemetryHud />
			{/* overflow-x-clip (NOT hidden) keeps decorative glows/cards from causing
			    horizontal scroll on small screens without turning this into a scroll
			    container — so the nested useScroll measurements stay correct. */}
			<main className="relative overflow-x-clip">
				<Hero />
				<Stages />
				<Install />
				<ApiReference />
			</main>
			<Footer />
		</div>
	);
}
