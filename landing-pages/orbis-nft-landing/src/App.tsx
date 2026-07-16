import About from "./components/About";
import Collection from "./components/Collection";
import Cta from "./components/Cta";
import Hero from "./components/Hero";
import { assetUrl } from "./assets";

export default function App() {
	return (
		<main className="bg-background text-cream">
			<Hero />
			<About />
			<Collection />
			<Cta />
			<div
				className="texture-overlay"
				style={{ backgroundImage: `url(${assetUrl("texture.png")})` }}
				aria-hidden="true"
			/>
		</main>
	);
}
