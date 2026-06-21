import { useState, type FormEvent } from "react";
import { Send, PartyPopper } from "lucide-react";
import { Button, Input, ScribbleArrow } from "./primitives";
import { radius } from "../lib/tokens";

export function Cta() {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!email.trim()) return;
		setSent(true);
	};

	return (
		<section id="get-started" className="px-6 py-20">
			<div
				className="relative mx-auto max-w-3xl overflow-hidden border-[3px] border-ink bg-postit px-7 py-14 text-center shadow-[var(--shadow-hard-lg)] md:px-12"
				style={{ borderRadius: radius.wobblyLg }}
			>
				{/* doodle decorations */}
				<span
					className="anim-bob absolute -left-3 top-8 hidden h-12 w-12 border-2 border-ink bg-accent md:block"
					style={{
						borderRadius: radius.blob,
						["--bob-rot" as string]: "12deg",
					}}
					aria-hidden
				/>
				<span
					className="absolute -right-2 bottom-10 hidden h-10 w-10 -rotate-12 border-2 border-ink bg-pen md:block"
					style={{ borderRadius: radius.blob2 }}
					aria-hidden
				/>

				<h2 className="text-4xl text-ink md:text-5xl">
					Got a blank wall and a head full of ideas?
				</h2>
				<p className="mx-auto mt-5 max-w-xl text-lg text-ink/75 md:text-xl">
					Start a board in seconds — no card, no tour, no rules. Just type your
					email and we'll hand you a marker.
				</p>

				{sent ? (
					<div
						className="mx-auto mt-9 flex max-w-md items-center justify-center gap-3 border-2 border-ink bg-card px-5 py-4 text-lg text-ink shadow-[var(--shadow-hard-sm)]"
						style={{ borderRadius: radius.wobblyMd }}
						role="status"
					>
						<PartyPopper size={22} strokeWidth={2.75} className="text-accent" />
						You're in! Check your inbox for a fresh board.
					</div>
				) : (
					<form
						onSubmit={onSubmit}
						className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
						noValidate
					>
						<label htmlFor="cta-email" className="sr-only">
							Email address
						</label>
						<Input
							id="cta-email"
							type="email"
							required
							placeholder="you@studio.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="flex-1"
						/>
						<Button type="submit" className="shrink-0">
							Start scribbling
							<Send size={20} strokeWidth={2.75} />
						</Button>
					</form>
				)}

				<p className="mt-5 text-base text-ink/55">
					Free forever for solo doodlers. Cancel by closing the lid.
				</p>

				{/* arrow doodle pointing at the form (desktop) */}
				<ScribbleArrow className="absolute bottom-20 right-6 hidden h-16 w-24 rotate-[200deg] md:block" />
			</div>
		</section>
	);
}
