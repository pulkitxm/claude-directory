import { useState } from "react";
import { Sparkles } from "lucide-react";
import MeshBackdrop from "@/components/MeshBackdrop";
import SiteNav from "@/components/SiteNav";
import WaitlistForm from "@/components/WaitlistForm";
import SocialProof from "@/components/SocialProof";
import FeatureStrip from "@/components/FeatureStrip";
import SiteFooter from "@/components/SiteFooter";

const BASE_SIGNUPS = 2847;

/**
 * The SickUI waitlist, built around the prompt's verbatim `background-shader.tsx`.
 * The verbatim component lives untouched in `src/components/ui/` (the shadcn
 * path); here its exact MeshGradient config is lifted into a fixed backdrop
 * (MeshBackdrop) and the launch headline it ships — "We are launching SickUI
 * soon!" — is framed inside a real, single-screen launch page: a glass
 * email-capture card with validation + a success state, animated social proof, a
 * compact capability strip, plus nav and footer — all floating over the living
 * shader. It's a single full-bleed viewport, the classic waitlist genre.
 */
export default function App() {
	// The CTA optimistically bumps the live tally when someone joins.
	const [signups, setSignups] = useState(BASE_SIGNUPS);

	return (
		<div
			id="top"
			className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#040a1e] font-sans text-white antialiased"
		>
			<MeshBackdrop />
			<SiteNav />

			{/* ---------------------------------------------------------------- */}
			{/* Hero — the whole experience on one screen                         */}
			{/* ---------------------------------------------------------------- */}
			<main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-10 pt-24 sm:pt-28">
				<div className="mx-auto w-full max-w-2xl text-center">
					{/* Status pill */}
					<div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm text-white/85 backdrop-blur-md">
						<span className="relative flex size-2">
							<span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
							<span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
						</span>
						<Sparkles className="size-3.5 text-amber-200" />
						Launching summer 2026 — private beta open
					</div>

					{/* The verbatim component's headline, set as the hero H1. */}
					<h1 className="text-balance text-4xl font-semibold tracking-tight text-white drop-shadow-2xl sm:text-6xl">
						We are launching{" "}
						<span className="bg-gradient-to-r from-sky-200 via-white to-indigo-200 bg-clip-text text-transparent">
							SickUI
						</span>{" "}
						soon!
					</h1>

					<p className="mx-auto mt-5 max-w-xl text-pretty text-base text-white/75 sm:text-lg">
						The copy-paste component library for builders who care about craft. Drop in shaders,
						data tables, and command menus — and own every line. Join the waitlist for early access.
					</p>

					{/* Email capture */}
					<div className="mt-9">
						<WaitlistForm onJoined={() => setSignups((n) => n + 1)} />
					</div>

					{/* Social proof */}
					<div className="mt-8">
						<SocialProof count={signups} />
					</div>

					{/* Compact capability strip (keeps the whole page to one viewport) */}
					<FeatureStrip />
				</div>
			</main>

			<SiteFooter />
		</div>
	);
}
