import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const VIDEO_SRC =
	"./assets/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4";

export default function App() {
	return (
		<div
			className="relative w-full min-h-screen overflow-hidden"
			style={{ fontFamily: "var(--font-body)", color: "var(--color-text)" }}
		>
			<video
				className="absolute inset-0 h-full w-full object-cover"
				src={VIDEO_SRC}
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
