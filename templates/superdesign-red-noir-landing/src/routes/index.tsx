import { createFileRoute } from "@tanstack/react-router";
import { Background } from "~/components/Background";
import { Features } from "~/components/Features";
import { Footer } from "~/components/Footer";
import { Hero } from "~/components/Hero";
import { Navbar } from "~/components/Navbar";
import { Pricing } from "~/components/Pricing";
import { Testimonial } from "~/components/Testimonial";
import { Waitlist } from "~/components/Waitlist";

export const Route = createFileRoute("/")({
	component: Home,
});

export function Home() {
	return (
		<div className="min-h-screen bg-black text-white font-inter relative overflow-x-hidden selection-red">
			<Background />
			<div className="gradient-blur" />
			<Navbar />
			<main className="relative z-10">
				<Hero />
				<Features />
				<Testimonial />
				<Pricing />
				<Waitlist />
			</main>
			<Footer />
		</div>
	);
}
