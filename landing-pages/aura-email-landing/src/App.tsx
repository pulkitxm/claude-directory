import FeatureTriage from "./components/FeatureTriage";
import FinalCTA from "./components/FinalCTA";
import Hero from "./components/Hero";
import InboxMockup from "./components/InboxMockup";
import LogoCloud from "./components/LogoCloud";
import MenuBar from "./components/MenuBar";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";

const VIDEO_URL = `${import.meta.env.BASE_URL}assets/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4`;

export default function App() {
	return (
		<div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
			{/* Global background video — fixed, behind everything */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				<video
					autoPlay
					loop
					muted
					playsInline
					className="w-full h-full object-cover pointer-events-none"
					src={VIDEO_URL}
				/>
			</div>

			{/* Fixed vertical guide lines at the 36rem container edges */}
			<div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
			<div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

			{/* Root noise filter — subtle grain, multiply blend (shiny headline) */}
			<svg className="absolute w-0 h-0" aria-hidden="true">
				<filter id="c3-noise">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.9"
						numOctaves="2"
						stitchTiles="stitch"
					/>
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"
					/>
					<feComposite in2="SourceGraphic" operator="in" result="noise" />
					<feBlend in="SourceGraphic" in2="noise" mode="multiply" />
				</filter>
			</svg>

			<div className="relative z-10">
				<Navbar />
				<main>
					<Hero />
					<MenuBar />
					<InboxMockup />
					<FeatureTriage />
					<LogoCloud />
					<Testimonials />
					<Pricing />
					<FinalCTA />
				</main>
			</div>
		</div>
	);
}
