import { useState } from "react";
import { ArrowRight, Check, Mail, Zap } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { SpotlightCard } from "./SpotlightCard";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

export function ComponentsShowcase() {
	const [email, setEmail] = useState("");
	const valid = /\S+@\S+\.\S+/.test(email);

	return (
		<section id="components" className="container-page py-20 sm:py-28 lg:py-32">
			<SectionHeader
				eyebrow="Components"
				title="Primitives, fully wired"
				lead="Buttons, inputs, badges, and cards — each carrying the system's shadows, glows, and expo-out states out of the box. Everything below is live."
			/>

			<div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
				{/* Buttons */}
				<Reveal>
					<SpotlightCard className="h-full">
						<div className="flex h-full flex-col p-6 sm:p-8">
							<Label>Buttons</Label>
							<div className="mt-5 flex flex-wrap items-center gap-3">
								<Button variant="primary">
									Primary <ArrowRight size={15} />
								</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="ghost">Ghost</Button>
							</div>
							<div className="mt-4 flex flex-wrap items-center gap-3">
								<Button variant="primary" size="sm">
									<Zap size={14} /> Small
								</Button>
								<Button variant="secondary" size="lg">
									Large
								</Button>
							</div>
							<p className="mt-auto pt-6 font-mono text-[11px] text-fg-muted/60">
								hover for the shine sweep · active scales to 0.98
							</p>
						</div>
					</SpotlightCard>
				</Reveal>

				{/* Input + badges */}
				<Reveal delay={0.08}>
					<SpotlightCard className="h-full">
						<div className="flex h-full flex-col p-6 sm:p-8">
							<Label>Input &amp; badges</Label>

							<form
								className="mt-5"
								onSubmit={(e) => e.preventDefault()}
								noValidate
							>
								<label htmlFor="demo-email" className="sr-only">
									Email address
								</label>
								<div className="flex flex-col gap-3 sm:flex-row">
									<div className="relative flex-1">
										<Mail
											size={16}
											className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-muted"
										/>
										<input
											id="demo-email"
											type="email"
											inputMode="email"
											placeholder="you@company.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="h-11 w-full rounded-lg border border-white/10 bg-[#0F0F12] pl-10 pr-3 text-sm text-gray-100 placeholder:text-gray-500 transition-[border-color,box-shadow] duration-quick ease-expo focus:border-accent focus:shadow-[0_0_0_3px_rgba(94,106,210,0.25)] focus:outline-none"
										/>
									</div>
									<Button variant="primary" type="submit" className="shrink-0">
										{valid ? (
											<>
												<Check size={15} /> Looks good
											</>
										) : (
											"Subscribe"
										)}
									</Button>
								</div>
							</form>

							<div className="mt-6 flex flex-wrap gap-2">
								<Pill>Default</Pill>
								<Pill tone="accent">Accent</Pill>
								<Pill tone="success">
									<span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
									Online
								</Pill>
								<Pill>v2.0</Pill>
							</div>

							<p className="mt-auto pt-6 font-mono text-[11px] text-fg-muted/60">
								focus the field for the accent glow ring
							</p>
						</div>
					</SpotlightCard>
				</Reveal>
			</div>
		</section>
	);
}

function Label({ children }: { children: React.ReactNode }) {
	return (
		<span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
			{children}
		</span>
	);
}

function Pill({
	children,
	tone = "default",
}: {
	children: React.ReactNode;
	tone?: "default" | "accent" | "success";
}) {
	const tones = {
		default: "border-white/10 bg-white/[0.04] text-fg-muted",
		accent: "border-accent/30 bg-accent/[0.12] text-[#c2c9ff]",
		success: "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-200",
	} as const;
	return (
		<span
			className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] ${tones[tone]}`}
		>
			{children}
		</span>
	);
}
