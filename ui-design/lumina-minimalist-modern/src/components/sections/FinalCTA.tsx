import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

export function FinalCTA() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;
		setSubmitted(true);
	};

	return (
		<section className="relative overflow-hidden bg-foreground py-28 text-background md:py-36">
			<div aria-hidden className="dot-texture absolute inset-0" />
			<div
				aria-hidden
				className="pointer-events-none absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[150px]"
			/>

			<div className="relative mx-auto max-w-3xl px-5 text-center">
				<Reveal>
					<RevealItem>
						<div className="flex justify-center">
							<SectionLabel tone="dark" pulse>
								Get started
							</SectionLabel>
						</div>
					</RevealItem>
					<RevealItem>
						<h2 className="mx-auto mt-6 max-w-2xl font-display text-4xl leading-[1.1] tracking-tight sm:text-[3.5rem]">
							See your product{" "}
							<span className="gradient-text">in one clear view</span>.
						</h2>
					</RevealItem>
					<RevealItem>
						<p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60">
							Start free in under two minutes. No credit card, no sales call —
							just your data, finally making sense.
						</p>
					</RevealItem>

					<RevealItem>
						{submitted ? (
							<div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 rounded-xl border border-accent-secondary/30 bg-accent/10 px-6 py-4">
								<span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-secondary text-accent-foreground">
									<Check className="h-4 w-4" strokeWidth={3} />
								</span>
								<span className="text-sm font-medium text-background">
									You're on the list — check {email} for your invite.
								</span>
							</div>
						) : (
							<form
								onSubmit={onSubmit}
								className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
							>
								<label htmlFor="cta-email" className="sr-only">
									Work email
								</label>
								<Input
									id="cta-email"
									type="email"
									required
									placeholder="you@company.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="flex-1"
								/>
								<Button type="submit" size="lg" className="w-full sm:w-auto">
									Start free
									<ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
								</Button>
							</form>
						)}
					</RevealItem>

					<RevealItem>
						<p className="mt-5 font-mono text-xs uppercase tracking-label text-white/55">
							14-day Growth trial · Cancel anytime
						</p>
					</RevealItem>
				</Reveal>
			</div>
		</section>
	);
}
