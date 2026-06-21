import { useState } from "react";
import { Button } from "./Button";
import { Input, Overline, Emphasis } from "./Primitives";
import { navLinks } from "../data/content";

export function FooterCta() {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email.trim()) setSent(true);
	};

	return (
		<footer className="relative z-10 bg-foreground text-background">
			{/* CTA */}
			<div className="mx-auto max-w-[1600px] px-8 py-20 md:px-16 md:py-32">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
					<div className="lg:col-span-7 lg:col-start-1">
						<Overline tone="light">The Correspondence</Overline>
						<h2 className="mt-8 max-w-2xl font-serif text-4xl font-normal leading-[0.92] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
							Receive the <Emphasis>house letter.</Emphasis>
						</h2>
						<p className="mt-8 max-w-md font-sans text-base leading-relaxed text-background/70 md:text-lg">
							A single, unhurried dispatch each season — new editions, atelier
							notes, and quiet invitations. Never more than four a year.
						</p>
					</div>

					{/* Underline-only email capture, stacks on small screens */}
					<div className="lg:col-span-4 lg:col-start-9">
						{sent ? (
							<p className="border-l-2 border-accent pl-6 font-serif text-xl italic text-background/90">
								Thank you — your first letter will arrive with the season.
							</p>
						) : (
							<form onSubmit={onSubmit} className="flex flex-col gap-6">
								<Input
									type="email"
									required
									tone="light"
									aria-label="Email address"
									placeholder="your address, please…"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
									<Button type="submit" variant="primary" size="lg" inverted>
										Subscribe
									</Button>
									<span className="font-serif text-sm italic text-background/50">
										No noise. Only the house.
									</span>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>

			{/* Lower footer */}
			<div className="border-t border-background/15">
				<div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-8 py-12 md:flex-row md:items-start md:justify-between md:px-16">
					<div>
						<a
							href="#top"
							className="font-serif text-2xl tracking-tight text-background"
						>
							MAISON
						</a>
						<p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-background/60">
							A design house for objects made to be kept. Established Paris,
							1924.
						</p>
					</div>

					<nav aria-label="Footer">
						<ul className="flex flex-wrap gap-x-10 gap-y-4">
							{navLinks.map((link) => (
								<li key={link}>
									<a
										href={`#${link.toLowerCase()}`}
										className="font-sans text-xs font-medium uppercase tracking-overline text-background/70 transition-colors duration-500 ease-luxe hover:text-accent"
									>
										{link}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>

				<div className="mx-auto max-w-[1600px] px-8 pb-12 md:px-16">
					<div className="flex flex-col gap-3 border-t border-background/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
						<p className="font-sans text-[10px] uppercase tracking-overline text-background/40">
							© MMXXIV MAISON — All editions reserved
						</p>
						<p className="font-sans text-[10px] uppercase tracking-overline text-background/40">
							Luxury / Editorial Design System
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
