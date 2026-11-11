import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STEPS, type Step } from "@/data/content";
import { cn } from "@/lib/utils";


export function HowItWorks() {
	return (
		<section
			id="how"
			className="relative bg-matter py-24"
			aria-label="How it works"
		>
			{}
			<div
				className="pointer-events-none absolute inset-0 bg-cubes opacity-[0.03]"
				aria-hidden="true"
			/>
			<div
				className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-orange opacity-[0.06] blur-[150px]"
				aria-hidden="true"
			/>

			<Container className="relative">
				<SectionHeading
					kicker="how_it_works"
					title="Four blocks to"
					accent="digital gold"
					description="From a cold wallet to compounding on-chain yield in minutes. Each step is a verifiable transaction ,  signed by you, settled by the chain."
				/>

				<div className="relative mx-auto mt-20 max-w-4xl">
					{}
					<div
						className="absolute left-6 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-orange via-orange/40 to-transparent md:left-1/2 md:-translate-x-1/2"
						aria-hidden="true"
					/>

					<ol className="flex flex-col gap-12 md:gap-16">
						{STEPS.map((step, i) => (
							<Reveal as="li" key={step.title} delay={(i % 2) * 80}>
								<TimelineStep step={step} index={i} />
							</Reveal>
						))}
					</ol>
				</div>
			</Container>
		</section>
	);
}

function TimelineStep({ step, index }: { step: Step; index: number }) {
	const isLeft = index % 2 === 0;
	return (
		<div
			className={cn(
				"relative grid items-center gap-6 pl-16 md:grid-cols-2 md:gap-12 md:pl-0",
			)}
		>
			{}
			<div
				className="absolute left-6 top-1 z-10 -translate-x-1/2 md:left-1/2"
				aria-hidden="true"
			>
				<div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-orange/50 bg-void shadow-glow">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full border border-orange/40 opacity-60" />
					<span className="font-mono text-sm font-medium text-gradient">
						{String(index + 1).padStart(2, "0")}
					</span>
				</div>
			</div>

			{}
			<div
				className={cn(
					isLeft
						? "md:col-start-1 md:pr-10 md:text-right"
						: "md:col-start-2 md:pl-10",
				)}
			>
				<CornerCard alignRight={isLeft}>
					<div
						className={cn(
							"flex items-center gap-4",
							isLeft && "md:flex-row-reverse md:text-right",
						)}
					>
						<IconTile icon={step.icon} className="shrink-0" />
						<div className="min-w-0">
							<h3 className="font-heading text-lg font-semibold text-white">
								{step.title}
							</h3>
							<span className="font-mono text-[0.65rem] uppercase tracking-widest text-stardust">
								tx {step.hash}
							</span>
						</div>
					</div>
					<p className="mt-4 text-sm leading-relaxed text-stardust">
						{step.description}
					</p>
				</CornerCard>
			</div>
		</div>
	);
}


function CornerCard({
	children,
	alignRight,
}: {
	children: React.ReactNode;
	alignRight?: boolean;
}) {
	return (
		<div className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-orange/40 hover:bg-white/[0.07]">
			{}
			<span
				className="absolute left-3 top-3 h-4 w-4 rounded-tl-md border-l-2 border-t-2 border-orange/70"
				aria-hidden="true"
			/>
			{}
			<span
				className="absolute bottom-3 right-3 h-4 w-4 rounded-br-md border-b-2 border-r-2 border-orange/70"
				aria-hidden="true"
			/>
			<div className={cn(alignRight && "md:[&_p]:ml-auto")}>{children}</div>
		</div>
	);
}
