import { useState, type FormEvent } from "react";
import { Button } from "../components/Button";
import { SectionLabel } from "../components/SectionLabel";
import { BackgroundNumber } from "../components/BackgroundNumber";

/* Shared oversized-input styling: 96px tall, bottom-border only, transparent,
   text-4xl uppercase content, muted placeholder, underline flips acid on focus. */
const INPUT_CLASS =
	"h-20 w-full border-b-2 border-line bg-transparent px-0 font-bold uppercase tracking-tighter text-bone placeholder:text-muted focus:border-acid focus:outline-none text-3xl md:h-24 md:text-4xl";

/**
 * Oversized capture form. Inputs are 96px tall, border-bottom only, transparent,
 * with text-4xl uppercase content and a barely-there muted placeholder; the
 * underline flips to acid on focus (the border is the focus indicator). Labels
 * sit above each field, small + uppercase + tracked-wide. On submit we show an
 * inline acknowledgement instead of navigating anywhere.
 */
export function CtaForm() {
	const [submitted, setSubmitted] = useState(false);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<section
			id="tickets"
			className="relative overflow-hidden border-b-2 border-line py-24 md:py-32"
		>
			<BackgroundNumber className="absolute -right-[4vw] -top-10 leading-none text-muted/40 text-[34vw]">
				24
			</BackgroundNumber>

			<div className="relative z-10 mx-auto max-w-[95vw]">
				<SectionLabel index="08">Get Tickets</SectionLabel>
				<h2 className="mt-8 max-w-5xl font-bold uppercase leading-[0.82] tracking-tighter text-[clamp(2.5rem,9vw,9rem)]">
					Claim Your
					<br />
					<span className="text-acid">Front Row.</span>
				</h2>

				<div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-20">
					<div className="lg:col-span-7">
						{submitted ? (
							<div
								role="status"
								className="border-2 border-acid bg-acid p-10 text-acid-foreground md:p-12"
							>
								<p className="text-2xl font-bold uppercase tracking-tighter md:text-4xl">
									You're On The List.
								</p>
								<p className="mt-4 max-w-md text-base font-medium md:text-lg">
									Check your inbox — your pass and the full program are on the
									way. See you on the floor.
								</p>
							</div>
						) : (
							<form onSubmit={onSubmit} className="flex flex-col gap-10">
								<div className="flex flex-col">
									<label
										htmlFor="cta-name"
										className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground md:text-sm"
									>
										Your Name
									</label>
									<input
										id="cta-name"
										name="name"
										type="text"
										required
										autoComplete="name"
										placeholder="JANE DOE"
										className={INPUT_CLASS}
									/>
								</div>

								<div className="flex flex-col">
									<label
										htmlFor="cta-email"
										className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground md:text-sm"
									>
										Email Address
									</label>
									<input
										id="cta-email"
										name="email"
										type="email"
										required
										autoComplete="email"
										placeholder="JANE@STUDIO.COM"
										className={INPUT_CLASS}
									/>
								</div>

								<div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center">
									<Button type="submit" size="lg">
										Send It
									</Button>
									<p className="text-sm text-muted-foreground">
										No spam. One acid-yellow newsletter, tops.
									</p>
								</div>
							</form>
						)}
					</div>

					<aside className="flex flex-col justify-end gap-8 lg:col-span-5">
						<div className="border-l-4 border-acid pl-6">
							<p className="text-lg font-medium leading-tight text-bone md:text-xl lg:text-2xl">
								Three days. Two hundred speakers. One relentless acid accent.
								Doors open October 24.
							</p>
						</div>
						<dl className="grid grid-cols-2 gap-px grid-hairline border-2 border-line">
							{[
								["Where", "Berlin, DE"],
								["When", "Oct 24–26"],
								["Doors", "09:00"],
								["Dress", "Loud"],
							].map(([k, v]) => (
								<div key={k} className="bg-ink p-5 md:p-6">
									<dt className="text-xs uppercase tracking-widest text-muted-foreground">
										{k}
									</dt>
									<dd className="mt-1 text-xl font-bold uppercase tracking-tighter md:text-2xl">
										{v}
									</dd>
								</div>
							))}
						</dl>
					</aside>
				</div>
			</div>
		</section>
	);
}
