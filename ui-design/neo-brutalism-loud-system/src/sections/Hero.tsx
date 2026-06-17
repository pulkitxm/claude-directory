import { ArrowRight, Star, Zap } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import {
	CircleShape,
	SquareShape,
	StarSticker,
	TriangleShape,
} from "../components/Decor";
import { SectionLabel } from "../components/Section";

/* The hero is a 60/40 asymmetric split. Left: hollow-stroke display headline
   slapped across three lines, each rotated and color-blocked differently.
   Right: a deliberate "chaos zone" — a tilted spec card under a swarm of
   rotated badges, floating shapes, and a towering background number. */
export function Hero() {
	return (
		<section
			id="top"
			className="neo-noise relative overflow-hidden border-b-4 border-neo-ink bg-neo-bg"
		>
			{/* Texture field */}
			<div
				className="neo-dots pointer-events-none absolute inset-0 opacity-[0.18]"
				aria-hidden="true"
			/>
			{/* Towering background word */}
			<span
				aria-hidden="true"
				className="neo-text-stroke pointer-events-none absolute -right-6 top-24 select-none text-[28vw] font-bold leading-none tracking-tighter opacity-[0.06] sm:top-10"
			>
				LOUD
			</span>

			<div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:gap-8 lg:py-24">
				{/* LEFT — 3/5 */}
				<div className="lg:col-span-3">
					<div className="-rotate-1">
						<SectionLabel bg="bg-neo-muted">A Design System That Screams</SectionLabel>
					</div>

					<h1 className="mt-6 text-[16vw] font-bold uppercase leading-[0.82] tracking-tighter text-neo-ink sm:text-8xl lg:text-[7.5rem]">
						<span className="block -rotate-1">Build</span>
						<span className="my-1 block w-fit -rotate-1 border-4 border-neo-ink bg-neo-accent px-3 neo-shadow-md">
							LOUD
						</span>
						<span className="neo-text-stroke block rotate-1">Not Quiet</span>
					</h1>

					<p className="mt-8 max-w-xl text-lg font-bold leading-snug text-neo-ink sm:text-xl">
						LOUDHOUSE is a Neo-brutalist component kit. Thick black strokes,
						hard offset shadows, highlighter color blocks and mechanical
						click-down interactions. If it doesn&apos;t have a border, it
						doesn&apos;t exist.
					</p>

					<div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
						<Button size="lg" className="w-full sm:w-auto" onClick={() => scrollToId("components")}>
							Explore Components
							<ArrowRight className="h-5 w-5" strokeWidth={3} />
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="w-full sm:w-auto"
							onClick={() => scrollToId("tokens")}
						>
							See The Tokens
						</Button>
					</div>

					{/* Inline trust row */}
					<div className="mt-10 flex flex-wrap items-center gap-3">
						<Badge bg="bg-neo-secondary" spinOnHover>
							<Star className="h-3.5 w-3.5 fill-neo-ink stroke-neo-ink" strokeWidth={3} />
							No Blur
						</Badge>
						<Badge bg="bg-neo-white" spinOnHover>
							Zero Radius
						</Badge>
						<Badge bg="bg-neo-muted" spinOnHover>
							100% Hard Shadows
						</Badge>
					</div>
				</div>

				{/* RIGHT — 2/5 chaos zone */}
				<div className="relative lg:col-span-2">
					{/* Floating shapes */}
					<SquareShape className="absolute -left-4 top-6 z-0 h-16 w-16 -rotate-6 bg-neo-secondary" />
					<CircleShape className="absolute -right-2 bottom-10 z-0 h-20 w-20 bg-neo-muted animate-bob" />
					<TriangleShape className="absolute -right-4 top-0 z-0 h-14 w-14 rotate-12" />

					{/* Tilted spec card */}
					<Card
						bg="bg-neo-white"
						shadow="lg"
						lift={false}
						className="relative z-10 mx-auto mt-8 max-w-sm rotate-2 p-6 sm:p-7"
					>
						<div className="flex items-center justify-between border-b-4 border-neo-ink pb-4">
							<span className="text-sm font-bold uppercase tracking-widest">
								Spec Sheet
							</span>
							<span className="flex h-9 w-9 items-center justify-center border-4 border-neo-ink bg-neo-accent">
								<Zap className="h-4 w-4 fill-neo-ink stroke-neo-ink" strokeWidth={3} />
							</span>
						</div>
						<dl className="mt-5 space-y-3 text-sm font-bold">
							{[
								["Border", "4px solid #000"],
								["Radius", "0px"],
								["Shadow", "8px 8px 0 #000"],
								["Type", "Space Grotesk"],
								["Easing", "ease-out / fast"],
							].map(([k, v]) => (
								<div
									key={k}
									className="flex items-center justify-between gap-3 border-b-2 border-dashed border-neo-ink/30 pb-2 last:border-0"
								>
									<dt className="uppercase tracking-wide text-neo-ink/70">{k}</dt>
									<dd className="text-right text-neo-ink">{v}</dd>
								</div>
							))}
						</dl>
						<div className="mt-5 border-4 border-neo-ink bg-neo-secondary px-4 py-3 text-center text-sm font-bold uppercase tracking-widest">
							Ship It Screaming
						</div>
					</Card>

					{/* Overlapping badge stickers */}
					<div className="absolute -right-3 -top-4 z-20 rotate-6">
						<Badge bg="bg-neo-accent" spinOnHover>
							New
						</Badge>
					</div>
					<div className="absolute -bottom-4 left-2 z-20 -rotate-6">
						<Badge bg="bg-neo-secondary" shape="square" spinOnHover>
							v1.0
						</Badge>
					</div>
					<StarSticker
						className="absolute -left-6 bottom-24 z-20 h-16 w-16"
						bg="bg-neo-accent"
						spin
					/>
				</div>
			</div>
		</section>
	);
}

function scrollToId(id: string) {
	const el = document.getElementById(id);
	if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
