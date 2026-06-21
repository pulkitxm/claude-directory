import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button, Input, Badge, ClayShape, display } from "./primitives";

/* Closing CTA cradled in one large glass-clay container (rounded-[48px]+) with
   orbiting shapes. A working email capture demonstrates the recessed input and
   the squish button, then swaps to a confirmation. */
export function Cta() {
	const [email, setEmail] = useState("");
	const [done, setDone] = useState(false);

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;
		setDone(true);
	};

	return (
		<section id="cta" className="px-5 py-16 sm:px-8 sm:py-24">
			<div className="relative mx-auto w-full max-w-5xl">
				{/* orbiting shapes */}
				<ClayShape
					hue="amber"
					className="-left-5 top-10 hidden h-16 w-16 animate-clay-float-slow lg:block"
				/>
				<ClayShape
					hue="pink"
					round={false}
					className="-right-6 bottom-12 hidden h-20 w-20 rotate-12 animate-clay-float lg:block"
				/>

				<div className="relative overflow-hidden rounded-[40px] clay-tray p-8 text-center shadow-clay-deep sm:rounded-[56px] sm:p-14">
					{/* soft inner blob glow */}
					<div
						aria-hidden
						className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-clay-accent/15 blur-3xl"
					/>
					<div
						aria-hidden
						className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-clay-accent-alt/12 blur-3xl"
					/>

					<div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
						<Badge tone="violet">
							<Sparkles size={14} />
							Start molding today
						</Badge>
						<h2
							style={display}
							className="mt-6 text-4xl font-black leading-[1.08] tracking-tight text-clay-foreground sm:text-5xl md:text-6xl"
						>
							Give your UI a little{" "}
							<span className="clay-text-gradient">squish.</span>
						</h2>
						<p className="mt-5 max-w-xl text-lg leading-relaxed text-clay-muted">
							Join 12,000+ makers building warmer, more tactile products. Free
							to start — no card, no clay under your fingernails.
						</p>

						{done ? (
							<div
								className="clay-pop mt-9 flex items-center gap-3 rounded-2xl bg-white px-7 py-5 shadow-clay-button-soft"
								data-shown="true"
							>
								<span className="grid h-11 w-11 place-items-center rounded-full bg-clay-emerald/15 text-clay-emerald">
									<Check size={22} strokeWidth={3} />
								</span>
								<div className="text-left">
									<div
										style={display}
										className="text-base font-extrabold text-clay-foreground"
									>
										You're on the list!
									</div>
									<div className="text-sm font-medium text-clay-muted">
										We just sent a starter kit to {email}.
									</div>
								</div>
							</div>
						) : (
							<form
								onSubmit={submit}
								className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row"
							>
								<Input
									type="email"
									required
									placeholder="you@studio.com"
									aria-label="Email address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Button type="submit" size="lg" className="w-full sm:w-auto">
									Get clay
									<ArrowRight size={20} />
								</Button>
							</form>
						)}

						<p className="mt-5 text-sm font-medium text-clay-muted">
							No spam. Just soft, rounded updates.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
