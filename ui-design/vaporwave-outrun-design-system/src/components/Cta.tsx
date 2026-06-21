import { useState } from "react";
import type { FormEvent } from "react";
import { Terminal } from "lucide-react";
import { Button, Eyebrow, Field, Reveal, Section, Shell } from "./primitives";

export function Cta() {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (email.trim()) setSent(true);
	};

	return (
		<Section id="cta" className="z-10 py-20 sm:py-32">
			<Shell className="max-w-4xl">
				<Reveal>
					<div className="relative overflow-hidden border-4 border-[var(--color-cyan)] bg-black/80 p-8 text-center shadow-[0_0_50px_rgba(0,255,255,0.2)] backdrop-blur-md sm:p-14">
						{/* inner perspective dots */}
						<div className="absolute inset-0 dots opacity-30" aria-hidden />

						<div className="relative">
							<Eyebrow>./jack-in --now</Eyebrow>

							<h2 className="mx-auto mt-6 max-w-2xl font-heading text-4xl font-black uppercase leading-tight sm:text-6xl">
								<span className="text-glow-white">Ready to enter </span>
								<span className="text-sunset">the grid?</span>
							</h2>

							<p className="mx-auto mt-5 max-w-xl font-mono text-lg text-[var(--color-chrome)]/75">
								Drop your transmission address. We'll beam you the boot disk and
								a key to the synthetic reality.
							</p>

							{sent ? (
								<div
									className="mx-auto mt-9 flex max-w-md items-center justify-center gap-3 border-2 border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 px-5 py-4 font-mono text-[var(--color-cyan)]"
									role="status"
								>
									<Terminal size={18} />
									<span>
										&gt; transmission received. boot disk inbound_
										<span className="cursor" />
									</span>
								</div>
							) : (
								<form
									onSubmit={onSubmit}
									className="mx-auto mt-9 flex max-w-md flex-col gap-4 sm:flex-row"
								>
									<label htmlFor="cta-email" className="sr-only">
										Email address
									</label>
									<Field
										id="cta-email"
										type="email"
										required
										placeholder="operator@grid.net"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className="flex-1"
									/>
									<Button
										type="submit"
										variant="secondary"
										className="shrink-0"
									>
										Send it
									</Button>
								</form>
							)}

							<p className="mt-5 font-mono text-xs uppercase tracking-widest text-[var(--color-chrome)]/40">
								no spam · unsubscribe from any terminal · est. 2088
							</p>
						</div>
					</div>
				</Reveal>
			</Shell>
		</Section>
	);
}
