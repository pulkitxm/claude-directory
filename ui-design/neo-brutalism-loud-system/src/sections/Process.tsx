import { PROCESS } from "../content";
import { Card } from "../components/Card";
import { SectionLabel, Reveal } from "../components/Section";

/* A four-step "how to ship it" band on cream, each step a numbered bordered
   card with a huge background step number bleeding behind it. */
export function Process() {
	return (
		<section className="neo-noise relative overflow-hidden border-b-4 border-neo-ink bg-neo-bg">
			<div
				className="neo-grid pointer-events-none absolute inset-0 opacity-40"
				aria-hidden="true"
			/>
			<div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
				<div className="max-w-3xl">
					<SectionLabel bg="bg-neo-muted">Four Steps</SectionLabel>
					<h2 className="mt-5 text-5xl font-bold uppercase leading-[0.9] tracking-tighter text-neo-ink sm:text-7xl">
						Drop It In,
						<br />
						<span className="w-fit rotate-1 bg-neo-accent px-2">
							Ship It Loud
						</span>
					</h2>
				</div>

				<div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
					{PROCESS.map((step, i) => {
						const Icon = step.icon;
						return (
							<Reveal key={step.step} delay={i * 80}>
								<Card
									bg="bg-neo-white"
									shadow="md"
									className="relative h-full overflow-hidden p-6"
								>
									<span
										aria-hidden="true"
										className="neo-text-stroke pointer-events-none absolute -right-3 -top-6 select-none text-9xl font-bold leading-none opacity-10"
									>
										{step.step}
									</span>
									<span className="relative inline-flex h-12 w-12 items-center justify-center border-4 border-neo-ink bg-neo-secondary neo-shadow-sm">
										<Icon className="h-6 w-6 stroke-neo-ink" strokeWidth={3} />
									</span>
									<p className="relative mt-4 text-xs font-bold uppercase tracking-widest text-neo-ink/50">
										Step {step.step}
									</p>
									<h3 className="relative mt-1 text-xl font-bold uppercase tracking-tight text-neo-ink">
										{step.title}
									</h3>
									<p className="relative mt-2 text-sm font-bold leading-snug text-neo-ink/80">
										{step.body}
									</p>
								</Card>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
