import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Shell, Blob, Square, Button } from "./primitives";
import { fadeUp, stagger, reveal } from "../lib/motion";

/* CTA — vibrant Amber color block. Closes the color rotation (Blue, Emerald,
   Dark, Amber). Houses the Input demo: a gray field that snaps to a hard
   primary border on focus, no glow. */
export function Cta() {
	const [email, setEmail] = useState("");
	const [done, setDone] = useState(false);

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email.trim()) setDone(true);
	};

	return (
		<section className="on-color relative overflow-hidden bg-[var(--color-sun)] py-24 text-[var(--color-ink)] lg:py-32">
			<Blob className="-left-28 -top-28 h-96 w-96 bg-white/20" />
			<Blob className="-bottom-32 -right-24 h-[26rem] w-[26rem] bg-[var(--color-sun-deep)]/40" />
			<Square rotate={14} className="right-[10%] top-12 h-28 w-28 bg-white/20" />
			<Square rotate={-10} className="left-[12%] bottom-12 h-20 w-20 bg-[var(--color-ink)]/10" />

			<Shell className="relative">
				<motion.div
					variants={stagger}
					{...reveal}
					className="mx-auto max-w-3xl text-center"
				>
					<motion.span
						variants={fadeUp}
						className="eyebrow text-amber-900"
					>
						Start today
					</motion.span>
					<motion.h2
						variants={fadeUp}
						className="mt-4 text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
					>
						Ship interfaces with
						<br />
						nothing to hide behind.
					</motion.h2>
					<motion.p
						variants={fadeUp}
						className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-amber-950/80"
					>
						Get the token file, the component kit, and the occasional note on flat
						design. No spam, unsubscribe in one click.
					</motion.p>

					<motion.div variants={fadeUp} className="mx-auto mt-9 max-w-lg">
						{done ? (
							<div className="flex items-center justify-center gap-3 rounded-lg bg-[var(--color-ink)] px-6 py-5 text-white">
								<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-grass)] text-white">
									<Check size={18} strokeWidth={3} />
								</span>
								<span className="font-semibold">
									You're in. Watch your inbox.
								</span>
							</div>
						) : (
							<form
								onSubmit={submit}
								className="flex flex-col gap-3 sm:flex-row"
								noValidate
							>
								<label htmlFor="cta-email" className="sr-only">
									Email address
								</label>
								<input
									id="cta-email"
									type="email"
									required
									placeholder="you@studio.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="field flex-1 !bg-white"
								/>
								<Button
									type="submit"
									className="group !bg-[var(--color-ink)] !text-white hover:!bg-black sm:w-auto"
								>
									Get access
									<ArrowRight
										size={20}
										strokeWidth={2.5}
										className="transition-transform duration-200 group-hover:translate-x-1"
									/>
								</Button>
							</form>
						)}
					</motion.div>
				</motion.div>
			</Shell>
		</section>
	);
}
