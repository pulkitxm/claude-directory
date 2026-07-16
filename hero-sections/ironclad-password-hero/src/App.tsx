import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const VIDEO_URL =
	"./assets/hf_20260606_131516_eca35265-ea66-4fbd-8d52-22aae6e1a503.mp4";

export default function App() {
	return (
		<div className="relative min-h-screen w-full overflow-hidden">
			<video
				className="absolute inset-0 z-0 w-full h-full object-cover"
				src={VIDEO_URL}
				autoPlay
				muted
				loop
				playsInline
			/>
			<Navbar />
			<Hero />
		</div>
	);
}
