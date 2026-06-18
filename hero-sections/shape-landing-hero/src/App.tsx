import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Playground from "@/components/Playground";
import Features from "@/components/Features";
import InstallBand from "@/components/InstallBand";
import Footer from "@/components/Footer";

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
