import { useState, type FormEvent } from "react";
import { Blob, Button, Reveal, Shell } from "./primitives";
import { ArrowRight, Check, Sparkle } from "./icons";

/* Final CTA: a full-width TERTIARY container at elevation-3, layered with
   floating organic blur shapes and a radial glow. The email capture uses the
   MD3 filled text field and confirms inline on submit. */
export function Cta() {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;
		setSent(true);
	};

	return (
		<section id="cta" className="scroll-mt-20 px-3 py-20 sm:px-5 sm:py-28">
			<div className="on-color relative mx-auto max-w-[80rem] overflow-hidden rounded-[28px] bg-[var(--color-md-tertiary)] px-6 py-16 text-[var(--color-md-on-tertiary)] shadow-[var(--shadow-md-3)] sm:rounded-[40px] sm:px-10 sm:py-20 lg:rounded-[var(--radius-md-3xl)]">
				{/* atmosphere */}
				<Blob
					float="a"
					className="-left-24 -top-20 h-96 w-96 bg-[var(--color-md-primary)] opacity-40 mix-blend-screen"
				/>
				<Blob
					float="b"
					className="-right-24 -bottom-24 h-[26rem] w-[26rem] bg-[var(--color-md-tertiary-container)] opacity-40 mix-blend-screen"
				/>
				<div
					aria-hidden
					className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,_rgba(255,255,255,0.2)_0%,_transparent_45%)]"
				/>

				<Shell className="relative flex max-w-2xl flex-col items-center gap-6 text-center">
					<Reveal>
						<span className="eyebrow !bg-white/15 !text-white">
							<Sparkle size={14} />
							Start free today
						</span>
					</Reveal>
					<Reveal delay={80}>
						<h2 className="t-headline">Seed your first theme in minutes</h2>
					</Reveal>
					<Reveal delay={140}>
						<p className="t-body-l text-white/85">
							Join 12,000+ designers and teams building warmer, more personal
							interfaces with Lumi. No credit card, no lock-in.
						</p>
					</Reveal>

					<Reveal delay={200} className="w-full">
						{sent ? (
							<div
								role="status"
								className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-[var(--radius-md-lg)] bg-white/15 px-6 py-5 backdrop-blur-md"
							>
								<span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[var(--color-md-tertiary)]">
									<Check size={18} />
								</span>
								<p className="font-medium text-white">
									You're in. Check your inbox to seed your first palette.
								</p>
							</div>
						) : (
							<form
								onSubmit={onSubmit}
								className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row"
							>
								<label htmlFor="cta-email" className="sr-only">
									Work email
								</label>
								<input
									id="cta-email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="you@studio.com"
									className="field flex-1 !bg-white/90 !text-[var(--color-md-on-bg)]"
								/>
								<Button type="submit" variant="on-color" size="lg">
									Get started
									<ArrowRight size={20} />
								</Button>
							</form>
						)}
					</Reveal>

					<Reveal delay={260}>
						<p className="t-label-s text-white/70">
							Free forever for solo makers · Cancel anytime on paid plans
						</p>
					</Reveal>
				</Shell>
			</div>
		</section>
	);
}
