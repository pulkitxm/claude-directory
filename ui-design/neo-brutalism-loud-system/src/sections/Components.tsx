import { ArrowRight, Heart, Star } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Input } from "../components/Input";
import { SectionLabel } from "../components/Section";

/* Live component playground — the literal showcase. Each tile demonstrates one
   signature primitive with a working interaction the visitor can poke at:
   buttons click down, the input floods yellow on focus, badges spin on hover,
   the card lifts. */
export function Components() {
	return (
		<section
			id="components"
			className="neo-noise relative overflow-hidden border-b-4 border-neo-ink bg-neo-secondary"
		>
			<div
				className="neo-dots pointer-events-none absolute inset-0 opacity-[0.12]"
				aria-hidden="true"
			/>
			<div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
				<div className="max-w-3xl">
					<SectionLabel bg="bg-neo-white">Poke At It</SectionLabel>
					<h2 className="mt-5 text-5xl font-bold uppercase leading-[0.9] tracking-tighter text-neo-ink sm:text-7xl">
						The Component
						<br />
						<span className="neo-text-stroke">Playground</span>
					</h2>
					<p className="mt-6 max-w-xl text-lg font-bold text-neo-ink">
						Every primitive is live. Click the buttons (they press down),
						focus the field (it floods yellow), hover the badges (they spin).
					</p>
				</div>

				<div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-2">
					{/* Buttons */}
					<Card bg="bg-neo-bg" lift={false} shadow="lg" className="p-6 sm:p-8">
						<p className="mb-6 text-sm font-bold uppercase tracking-widest text-neo-ink">
							Buttons · click to press down
						</p>
						<div className="flex flex-wrap gap-4">
							<Button variant="primary">
								Primary
								<ArrowRight className="h-4 w-4" strokeWidth={3} />
							</Button>
							<Button variant="secondary">Secondary</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="ghost">Ghost</Button>
						</div>
						<div className="mt-6 flex flex-wrap items-center gap-4">
							<Button size="sm" variant="primary">
								Small
							</Button>
							<Button size="md" variant="primary">
								Medium
							</Button>
							<Button size="lg" variant="primary">
								Large
							</Button>
						</div>
					</Card>

					{/* Badges + icon boxes */}
					<Card bg="bg-neo-bg" lift={false} shadow="lg" className="p-6 sm:p-8">
						<p className="mb-6 text-sm font-bold uppercase tracking-widest text-neo-ink">
							Badges · hover to spin
						</p>
						<div className="flex flex-wrap items-center gap-3">
							<Badge bg="bg-neo-accent" spinOnHover>
								<Star className="h-3.5 w-3.5 fill-neo-ink stroke-neo-ink" strokeWidth={3} />
								Featured
							</Badge>
							<Badge bg="bg-neo-secondary" spinOnHover>
								New
							</Badge>
							<Badge bg="bg-neo-muted" spinOnHover>
								Beta
							</Badge>
							<Badge bg="bg-neo-white" shape="square" spinOnHover>
								v1.0
							</Badge>
						</div>
						<p className="mb-4 mt-8 text-sm font-bold uppercase tracking-widest text-neo-ink">
							Icon Boxes
						</p>
						<div className="flex flex-wrap gap-4">
							{[
								{ Icon: Heart, bg: "bg-neo-accent" },
								{ Icon: Star, bg: "bg-neo-secondary" },
								{ Icon: ArrowRight, bg: "bg-neo-muted" },
							].map(({ Icon, bg }, i) => (
								<span
									key={i}
									className={`inline-flex h-14 w-14 items-center justify-center border-4 border-neo-ink ${bg} neo-shadow-sm`}
								>
									<Icon className="h-6 w-6 fill-neo-ink stroke-neo-ink" strokeWidth={3} />
								</span>
							))}
						</div>
					</Card>

					{/* Input */}
					<Card bg="bg-neo-bg" lift={false} shadow="lg" className="p-6 sm:p-8">
						<p className="mb-6 text-sm font-bold uppercase tracking-widest text-neo-ink">
							Inputs · focus floods yellow
						</p>
						<div className="space-y-5">
							<Input label="Your Name" placeholder="DESH PATEL" autoComplete="off" />
							<Input
								label="Email"
								type="email"
								placeholder="you@loudhouse.dev"
								autoComplete="off"
							/>
						</div>
					</Card>

					{/* Mini lift card */}
					<Card bg="bg-neo-bg" lift={false} shadow="lg" className="p-6 sm:p-8">
						<p className="mb-6 text-sm font-bold uppercase tracking-widest text-neo-ink">
							Cards · hover to lift
						</p>
						<Card bg="bg-neo-accent" shadow="md" className="p-5">
							<div className="flex items-center justify-between border-b-4 border-neo-ink pb-3">
								<span className="text-sm font-bold uppercase tracking-widest">
									Sticker Card
								</span>
								<Star className="h-5 w-5 fill-neo-ink stroke-neo-ink" strokeWidth={3} />
							</div>
							<p className="mt-3 text-base font-bold leading-snug text-neo-ink">
								Hover me. I lift off the page and my shadow grows — physical,
								not a fade.
							</p>
						</Card>
					</Card>
				</div>
			</div>
		</section>
	);
}
