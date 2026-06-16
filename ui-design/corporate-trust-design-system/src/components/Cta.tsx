import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Shell, Blob } from "./primitives";
import { fadeUp, stagger, inView } from "../lib/motion";

/* The dramatic dark final CTA. White button on a deep indigo gradient ground,
   atmospheric blobs, and a working email-capture form that confirms on submit.
   `.on-dark` flips the global focus ring to white inside this section. */
export function Cta() {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;
		setSubmitted(true);
	};

	return (
		<section id="cta" className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
			<Shell className="!px-0">
				<motion.div
					variants={stagger(0.1)}
					initial="hidden"
					whileInView="show"
					viewport={inView}
					className="on-dark relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-900 to-indigo-950 px-6 py-16 text-center shadow-lift sm:px-12 sm:py-20"
				>
					<Blob className="-left-20 -top-24 h-80 w-80 !from-indigo-500/40 !to-violet-500/20 opacity-80" />
					<Blob slow className="-bottom-24 -right-16 h-80 w-80 !from-violet-500/40 !to-fuchsia-500/10 opacity-70" />
					<div
						aria-hidden="true"
						className="dot-grid absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
					/>

					<div className="relative mx-auto max-w-2xl">
						<motion.span
							variants={fadeUp}
							className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-indigo-100 ring-1 ring-white/15 backdrop-blur"
						>
							<Sparkles className="h-4 w-4 text-violet-300" aria-hidden="true" />
							Join 12,000+ teams
						</motion.span>

						<motion.h2
							variants={fadeUp}
							className="mt-6 text-3xl text-white sm:text-4xl lg:text-5xl"
						>
							Bring the calm of a system{" "}
							<span className="bg-gradient-to-r from-indigo-200 to-violet-200 bg-clip-text text-transparent">
								your whole team trusts
							</span>
						</motion.h2>

						<motion.p
							variants={fadeUp}
							className="mx-auto mt-5 max-w-xl text-lg text-indigo-100/80"
						>
							Start free in minutes. No credit card, no sales call — just your first
							workflow running before your coffee's cold.
						</motion.p>

						{/* Email capture */}
						<motion.div variants={fadeUp} className="mx-auto mt-9 max-w-md">
							{submitted ? (
								<div
									role="status"
									className="inline-flex items-center gap-2.5 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20"
								>
									<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-indigo-950">
										<Check className="h-4 w-4" aria-hidden="true" />
									</span>
									You're in — check your inbox to finish setting up.
								</div>
							) : (
								<form
									onSubmit={onSubmit}
									className="flex flex-col gap-3 sm:flex-row"
									noValidate
								>
									<label htmlFor="cta-email" className="sr-only">
										Work email
									</label>
									<input
										id="cta-email"
										name="email"
										type="email"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="you@company.com"
										className="field !border-white/20 !bg-white/10 !text-white placeholder:!text-indigo-200/70 focus:!bg-white/15 focus:!shadow-none sm:flex-1"
										autoComplete="email"
									/>
									<button type="submit" className="btn btn-on-dark group shrink-0">
										Get started
										<ArrowRight
											className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
											aria-hidden="true"
										/>
									</button>
								</form>
							)}
							<p className="mt-3 text-xs text-indigo-200/70">
								Free forever for small teams. Cancel anytime.
							</p>
						</motion.div>
					</div>
				</motion.div>
			</Shell>
		</section>
	);
}
