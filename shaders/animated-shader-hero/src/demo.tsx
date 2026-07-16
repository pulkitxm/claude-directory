import { useCallback, useMemo, useState } from "react";
import {
	HowToUseSection,
	IntegrationSection,
	SiteFooter,
	UniformsSection,
} from "@/components/showcase-sections";
import Hero from "@/components/ui/animated-shader-hero";
import { type UniformState, UniformsHud } from "@/components/ui/uniforms-hud";

export default function HeroDemo() {
	const [uniforms, setUniforms] = useState<UniformState>({
		time: 0,
		width: 0,
		height: 0,
		pointerCount: 0,
		fps: 0,
	});

	const handleFrame = useCallback((state: UniformState) => {
		setUniforms(state);
	}, []);

	const handlePrimaryClick = useCallback(() => {
		console.log("Get Started clicked!");
		document
			.getElementById("integrate")
			?.scrollIntoView({ behavior: "smooth" });
	}, []);

	const handleSecondaryClick = useCallback(() => {
		console.log("Explore Features clicked!");
		document
			.getElementById("integrate")
			?.scrollIntoView({ behavior: "smooth" });
	}, []);

	const hero = useMemo(
		() => (
			<Hero
				trustBadge={{
					text: "Trusted by forward-thinking teams.",
					icons: ["✨"],
				}}
				headline={{
					line1: "Launch Your",
					line2: "Workflow Into Orbit",
				}}
				subtitle="Supercharge productivity with AI-powered automation and integrations built for the next generation of teams, fast, seamless, and limitless."
				buttons={{
					primary: {
						text: "Get Started for Free",
						onClick: handlePrimaryClick,
					},
					secondary: {
						text: "Explore Features",
						onClick: handleSecondaryClick,
					},
				}}
				onFrame={handleFrame}
			/>
		),
		[handleFrame, handlePrimaryClick, handleSecondaryClick],
	);

	return (
		<div className="grain w-full bg-void">
			<div className="relative">
				{hero}
				<UniformsHud state={uniforms} />

				<div className="pointer-events-none absolute left-5 top-5 z-20 font-mono text-sm tracking-tight text-paper/90">
					<span className="text-ember">◆</span> EMBERFIELD
				</div>
				<div className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">
					scroll to integrate ↓
				</div>
			</div>

			<IntegrationSection />
			<UniformsSection />
			<HowToUseSection />
			<SiteFooter />
		</div>
	);
}
