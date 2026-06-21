import { ArrowRight, Bitcoin, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { OrbitalOrb } from "@/components/sections/OrbitalOrb";
import { TRUST_BADGES } from "@/data/content";

export function Hero() {
	return (
		<section
			id="top"
			className="relative overflow-hidden pt-28 md:pt-36"
			aria-label="Hero"
		>
			{/* Signature blockchain grid */}
			<div
				className="pointer-events-none absolute inset-0 bg-grid-pattern"
				aria-hidden="true"
			/>
			{/* Ambient radial energy fields */}
			<div
				className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-orange opacity-[0.10] blur-[140px]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute -right-40 top-40 h-[30rem] w-[30rem] rounded-full bg-burnt opacity-[0.10] blur-[150px]"
				aria-hidden="true"
			/>
			{/* Vendored cube texture, barely-there */}
			<div
				className="pointer-events-none absolute inset-0 bg-cubes opacity-[0.04]"
				aria-hidden="true"
			/>

			<Container className="relative grid items-center gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28">
				{/* Copy column */}
				<div className="flex flex-col items-start gap-7">
					<Badge live>
						<Sparkles className="h-3 w-3" />
						Live on Mainnet · v3.1
					</Badge>

					<h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
						Put your Bitcoin
						<br className="hidden sm:block" /> to work as{" "}
						<span className="text-gradient">digital gold</span>.
					</h1>

					<p className="max-w-xl text-base leading-relaxed text-stardust md:text-lg">
						AURUM is a non-custodial DeFi protocol for Bitcoin. Open audited
						vaults, earn provable on-chain yield, and settle in milliseconds
						over Lightning — all without ever surrendering your keys.
					</p>

					<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
						<Button size="lg" className="group/cta">
							Launch App
							<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
						</Button>
						<Button variant="outline" size="lg">
							<Bitcoin className="h-4 w-4 text-orange" />
							Read the Whitepaper
						</Button>
					</div>

					{/* Trust row */}
					<div className="mt-2 flex flex-col gap-3">
						<div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-stardust">
							<ShieldCheck className="h-3.5 w-3.5 text-orange" />
							Audited &amp; verified by
						</div>
						<div className="flex flex-wrap items-center gap-x-5 gap-y-2">
							{TRUST_BADGES.map((badge) => (
								<span
									key={badge}
									className="font-mono text-xs font-medium uppercase tracking-wider text-white/45 transition-colors hover:text-white/80"
								>
									{badge}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* Orbital orb column */}
				<div className="relative">
					<OrbitalOrb />
				</div>
			</Container>

			{/* Soft fade into the next (ticker) section */}
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-void"
				aria-hidden="true"
			/>
		</section>
	);
}
