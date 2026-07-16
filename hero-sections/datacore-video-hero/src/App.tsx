import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const BASE_URL = (import.meta as ImportMeta & { env: { BASE_URL: string } }).env
	.BASE_URL;
const VIDEO_URL = `${BASE_URL}assets/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4`;

export default function App() {
	return (
		<main className="relative min-h-screen overflow-hidden bg-dark">
			<video
				className="absolute inset-0 z-0 h-full w-full object-cover"
				src={VIDEO_URL}
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
				aria-hidden="true"
				tabIndex={-1}
			/>
			<Navbar />
			<Hero />
		</main>
	);
}
