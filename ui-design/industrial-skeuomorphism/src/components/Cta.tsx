import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button, Container, Input, Led } from "./primitives";

export function Cta() {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!email) return;
		setSent(true);
	};

	return (
		<section id="cta" className="scroll-mt-24">
			<Container>
				<div
					className="carbon relative overflow-hidden rounded-[30px] px-6 py-16 text-center md:px-16 md:py-20"
					style={{
						backgroundColor: "var(--color-charcoal)",
						backgroundBlendMode: "overlay",
						boxShadow:
							"var(--shadow-card), inset 0 1px 0 rgba(255,255,255,0.06)",
					}}
				>
					{/* radar sweep — signature animated element */}
					<div
						aria-hidden="true"
						className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-30"
					>
						<div
							className="animate-radar h-full w-full rounded-full"
							style={{
								background:
									"conic-gradient(from 0deg, rgba(255,71,87,0) 0deg, rgba(255,71,87,0.45) 70deg, rgba(255,71,87,0) 90deg)",
							}}
						/>
						{/* radar rings */}
						<div className="absolute inset-0 rounded-full border border-accent/20" />
						<div className="absolute inset-8 rounded-full border border-accent/15" />
						<div className="absolute inset-16 rounded-full border border-accent/10" />
					</div>

					<div className="relative mx-auto max-w-2xl">
						<div className="mb-5 flex items-center justify-center gap-2">
							<Led tone="alert" size={9} label="ready to deploy" />
							<span className="stamp text-[0.6rem] text-slate-soft">
								READY&nbsp;FOR&nbsp;DEPLOYMENT
							</span>
						</div>

						<h2 className="emboss-dark text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white md:text-5xl">
							Put a control deck
							<br />
							on every machine.
						</h2>
						<p className="mx-auto mt-4 max-w-[52ch] text-base text-slate-soft md:text-lg">
							Start free on the bench, or have an engineer wire up your
							floor. Either way you're driving real hardware today.
						</p>

						{sent ? (
							<div
								className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 rounded-lg bg-white/5 px-6 py-5"
								style={{
									boxShadow:
										"inset 4px 4px 8px rgba(0,0,0,0.4), inset -2px -2px 6px rgba(255,255,255,0.05)",
								}}
								role="status"
							>
								<CheckCircle2
									size={22}
									className="text-online"
									strokeWidth={2}
								/>
								<span className="font-mono text-sm text-white">
									LOGGED — provisioning link sent to {email}
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
									placeholder="ENGINEER@PLANT.IO"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="flex-1"
								/>
								<Button type="submit" size="lg" className="sm:w-auto">
									Deploy
									<ArrowRight size={16} strokeWidth={2.5} />
								</Button>
							</form>
						)}

						<p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-slate-soft/70">
							No card required · 3 units free forever
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}
