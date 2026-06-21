import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Plan {
	name: string;
	price: string;
	cadence: string;
	blurb: string;
	features: string[];
	cta: string;
	featured?: boolean;
}

const PLANS: Plan[] = [
	{
		name: "The Wire",
		price: "$0",
		cadence: "Always free",
		blurb: "The breaking crawl and the daily brief, on the house.",
		features: [
			"The live wire ticker",
			"Daily front-page brief",
			"Three dispatches a week",
			"Public corrections log",
		],
		cta: "Read the wire",
	},
	{
		name: "Home Delivery",
		price: "$4",
		cadence: "per week",
		blurb: "The full edition, set in type and filed to your door each morning.",
		features: [
			"Every desk, every edition",
			"Unlimited dispatches & archive",
			"Investigations & long-reads",
			"Op-Ed, Letters & the colophon",
			"No infinite scroll, ever",
		],
		cta: "Subscribe now",
		featured: true,
	},
	{
		name: "The Bureau",
		price: "$240",
		cadence: "per seat / year",
		blurb: "Newsprint for the whole newsroom, with the standards desk on call.",
		features: [
			"Everything in Home Delivery",
			"Team seats & shared archive",
			"Open citation API access",
			"Standards desk consultation",
		],
		cta: "Open a bureau",
	},
];

/**
 * Subscribe: three pricing columns built as collapsed cards with dashed
 * feature rules (the one sanctioned non-solid border), plus a bottom-border-
 * only newsroom email field. The featured plan inverts to black to draw the
 * single point of emphasis on the page.
 */
export function Subscribe() {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);

	const submit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;
		setSent(true);
	};

	return (
		<section id="subscribe" className="border-b-4 border-ink bg-paper">
			<div className="mx-auto max-w-screen-xl px-4 py-14 lg:py-16">
				<div className="border-b-4 border-ink pb-6 text-center">
					<Kicker className="justify-center">Section 05 · Subscriptions</Kicker>
					<h2 className="mt-4 font-serif text-4xl font-black uppercase leading-[0.95] tracking-tight lg:text-6xl">
						Take the edition
					</h2>
					<p className="mx-auto mt-3 max-w-xl font-body text-sm leading-relaxed text-ink/70 lg:text-base">
						One price, no tiers of attention. Whichever column you choose, the
						type is set the same — cold, dated, and on the record.
					</p>
				</div>

				<div className="grid grid-cols-1 border-l border-t border-ink lg:grid-cols-3">
					{PLANS.map((plan, i) => (
						<Reveal
							key={plan.name}
							as="div"
							delay={i * 90}
							className={cn(
								"flex flex-col border-b border-r border-ink p-8 transition-colors duration-200",
								plan.featured
									? "bg-ink text-paper"
									: "bg-paper hover:bg-neutral-100",
							)}
						>
							<div className="flex items-center justify-between">
								<h3 className="font-serif text-2xl font-bold">{plan.name}</h3>
								{plan.featured && (
									<span className="bg-editorial px-2 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-paper">
										Most read
									</span>
								)}
							</div>

							<div className="mt-5 flex items-baseline gap-2">
								<span className="font-serif text-5xl font-black tabular-nums tracking-tighter lg:text-6xl">
									{plan.price}
								</span>
								<span
									className={cn(
										"font-mono text-[0.65rem] uppercase tracking-[0.2em]",
										plan.featured ? "text-neutral-400" : "text-ink/55",
									)}
								>
									{plan.cadence}
								</span>
							</div>

							<p
								className={cn(
									"mt-3 font-body text-sm leading-relaxed",
									plan.featured ? "text-neutral-300" : "text-ink/70",
								)}
							>
								{plan.blurb}
							</p>

							<ul className="mt-6 flex-1 space-y-0 border-t border-dashed border-current/30">
								{plan.features.map((f) => (
									<li
										key={f}
										className="flex items-start gap-3 border-b border-dashed border-current/30 py-3"
									>
										<Check
											className={cn(
												"mt-0.5 h-4 w-4 shrink-0",
												plan.featured ? "text-editorial" : "text-ink",
											)}
											strokeWidth={2}
										/>
										<span className="font-body text-sm leading-snug">{f}</span>
									</li>
								))}
							</ul>

							<Button
								variant={plan.featured ? "accent" : "secondary"}
								size="lg"
								className="mt-8 w-full"
							>
								{plan.cta}
							</Button>
						</Reveal>
					))}
				</div>

				{/* Newsroom email capture — bottom-border-only field. */}
				<div className="mt-10 grid grid-cols-1 items-center gap-8 border border-ink bg-paper p-8 lg:grid-cols-12 lg:p-10">
					<div className="lg:col-span-5">
						<Kicker>The Morning Wire</Kicker>
						<h3 className="mt-3 font-serif text-2xl font-bold leading-tight lg:text-3xl">
							The front page, in your inbox at four.
						</h3>
						<p className="mt-2 font-body text-sm leading-relaxed text-ink/70">
							One dispatch a morning. No tracking pixels, no open-rate games —
							just the day's edition, set and sent.
						</p>
					</div>

					<form
						onSubmit={submit}
						className="lg:col-span-7"
						aria-label="Subscribe to the morning wire"
					>
						{sent ? (
							<div
								role="status"
								className="flex items-center gap-3 border border-ink bg-neutral-100 p-5"
							>
								<span className="flex h-10 w-10 items-center justify-center bg-ink text-paper">
									<Check className="h-5 w-5" strokeWidth={2} />
								</span>
								<p className="font-body text-sm">
									Filed. Your first edition lands tomorrow at four —{" "}
									<span className="font-mono text-xs tracking-wide">
										{email}
									</span>
									.
								</p>
							</div>
						) : (
							<div className="flex flex-col gap-4 sm:flex-row sm:items-end">
								<label className="flex-1">
									<span className="mb-2 block font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink/55">
										Subscriber address
									</span>
									<span className="flex items-center gap-2 border-b-2 border-ink px-1 py-2 transition-colors focus-within:bg-[#F0F0F0]">
										<Mail
											className="h-4 w-4 shrink-0 text-ink/60"
											strokeWidth={1.5}
										/>
										<input
											type="email"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="reader@dateline.press"
											className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-ink/40 focus:outline-none"
											style={{ borderRadius: 0 }}
										/>
									</span>
								</label>
								<Button type="submit" variant="primary" size="lg">
									Subscribe
								</Button>
							</div>
						)}
					</form>
				</div>
			</div>
		</section>
	);
}
