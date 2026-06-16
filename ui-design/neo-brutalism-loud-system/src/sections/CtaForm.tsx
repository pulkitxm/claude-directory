import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Check, Star } from "lucide-react";
import { Input, Textarea } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { SectionLabel } from "../components/Section";
import { StarSticker } from "../components/Decor";

/* Closing CTA on a black color block. A bordered white form card (yellow-flood
   focus inputs) sits beside a loud pitch. Submitting flips to a bordered
   success sticker — no network, this is a showcase. */
export function CtaForm() {
	const [sent, setSent] = useState(false);

	function onSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setSent(true);
	}

	return (
		<section className="neo-noise relative overflow-hidden border-b-4 border-neo-ink bg-neo-ink">
			<div
				className="neo-grid-inverted pointer-events-none absolute inset-0"
				aria-hidden="true"
			/>
			<div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
				{/* Pitch */}
				<div className="relative">
					<SectionLabel bg="bg-neo-secondary">Get On The List</SectionLabel>
					<h2 className="mt-5 text-5xl font-bold uppercase leading-[0.88] tracking-tighter text-neo-white sm:text-7xl">
						Ready To
						<br />
						<span className="neo-text-stroke-white">Get Loud?</span>
					</h2>
					<p className="mt-6 max-w-md text-lg font-bold text-neo-white/80">
						Drop your details and we&apos;ll send the full kit — tokens,
						components, and the rules to break them. No corporate onboarding
						funnel. Just stickers.
					</p>
					<div className="mt-8 flex items-center gap-3">
						<StarSticker className="h-14 w-14" bg="bg-neo-accent" spin />
						<p className="text-sm font-bold uppercase tracking-widest text-neo-secondary">
							Join 12,000+ loud builders
						</p>
					</div>
				</div>

				{/* Form card */}
				<Card
					bg="bg-neo-bg"
					lift={false}
					shadow="lg"
					onDark
					className="p-7 sm:p-9"
				>
					{sent ? (
						<div className="flex flex-col items-center py-8 text-center">
							<span className="flex h-20 w-20 items-center justify-center border-4 border-neo-ink bg-neo-secondary neo-shadow-md">
								<Check className="h-10 w-10 stroke-neo-ink" strokeWidth={4} />
							</span>
							<h3 className="mt-6 text-3xl font-bold uppercase tracking-tight text-neo-ink">
								You&apos;re In!
							</h3>
							<p className="mt-3 max-w-xs text-base font-bold text-neo-ink/80">
								The kit is on its way. Go make something that screams.
							</p>
							<Button
								variant="outline"
								className="mt-6"
								onClick={() => setSent(false)}
							>
								Send Another
							</Button>
						</div>
					) : (
						<form onSubmit={onSubmit} noValidate className="space-y-5">
							<div className="flex items-center gap-2">
								<Star
									className="h-5 w-5 fill-neo-ink stroke-neo-ink"
									strokeWidth={3}
									aria-hidden="true"
								/>
								<span className="text-sm font-bold uppercase tracking-widest text-neo-ink">
									Request The Kit
								</span>
							</div>
							<Input
								label="Your Name"
								name="name"
								placeholder="DESH PATEL"
								required
								autoComplete="name"
							/>
							<Input
								label="Email"
								name="email"
								type="email"
								placeholder="you@loudhouse.dev"
								required
								autoComplete="email"
							/>
							<Textarea
								label="What Are You Building?"
								name="message"
								placeholder="A landing page that won't shut up..."
							/>
							<Button type="submit" size="lg" className="w-full">
								Send It
								<ArrowRight className="h-5 w-5" strokeWidth={3} />
							</Button>
						</form>
					)}
				</Card>
			</div>
		</section>
	);
}
