import { BackgroundVideo } from "./components/BackgroundVideo";
import { HeroContent } from "./components/HeroContent";
import { Navbar } from "./components/Navbar";

export default function App() {
	return (
		<div className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen">
			<Navbar />

			<BackgroundVideo />

			<div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-white lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
				<main
					id="spade-hero"
					className="w-full max-w-7xl mx-auto px-6 py-12 pt-24 lg:pt-12 flex-1 flex flex-col justify-center"
				>
					<HeroContent />
				</main>
			</div>
		</div>
	);
}
