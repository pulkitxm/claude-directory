import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import InstallBand from "@/components/InstallBand";
import Navbar from "@/components/Navbar";
import Playground from "@/components/Playground";

export default function App() {
	return (
		<>
			<Navbar />
			<main className="relative bg-[#030303]">
				<HeroSection />
				<Playground />
				<Features />
				<InstallBand />
				<Footer />
			</main>
			{/* Page-wide film grain for depth */}
			<div className="grain-overlay pointer-events-none fixed inset-0 z-[60] opacity-[0.025] mix-blend-overlay" />
		</>
	);
}
