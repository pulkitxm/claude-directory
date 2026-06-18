import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, Mail, PartyPopper } from "lucide-react";
import { cn, isValidEmail } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

interface WaitlistFormProps {
	/** Called with the email once it passes validation + the simulated request. */
	onJoined?: (email: string) => void;
}

/**
 * The email-capture gate. It's a real, self-contained form: client-side
 * validation, an in-flight spinner (a simulated network round-trip, since there's
 * no backend), an inline error, and a celebratory success swap. lucide-react
 * supplies every glyph — no remote SVGs.
 */
export default function WaitlistForm({ onJoined }: WaitlistFormProps) {
	const [email, setEmail] = useState("");
	const [status, setStatus] = useState<Status>("idle");
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (status === "loading" || status === "success") return;

		if (!isValidEmail(email)) {
			setStatus("error");
			setError("Please enter a valid email address.");
			return;
		}

		setStatus("loading");
		setError(null);
		// Simulate a network round-trip to the waitlist service.
		await new Promise((r) => setTimeout(r, 1100));
		setStatus("success");
		onJoined?.(email.trim());
	}

	if (status === "success") {
		return (
			<div
				className="mx-auto flex w-full max-w-md items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-5 py-4 text-left backdrop-blur-xl"
				role="status"
				aria-live="polite"
			>
				<span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-400/90 text-emerald-950 shadow-lg shadow-emerald-500/30">
					<PartyPopper className="size-5" strokeWidth={2.5} />
				</span>
				<div className="min-w-0">
					<p className="font-semibold text-white">You're on the list!</p>
					<p className="truncate text-sm text-white/70">
						We'll email <span className="text-white/90">{email.trim()}</span> the moment SickUI ships.
					</p>
				</div>
				<Check className="ml-auto size-5 shrink-0 text-emerald-300" strokeWidth={3} />
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="mx-auto w-full max-w-md" noValidate>
			<div
				className={cn(
					"group flex items-center gap-2 rounded-2xl border bg-white/10 p-1.5 pl-4 backdrop-blur-xl transition-colors",
					status === "error"
						? "border-rose-400/70 shadow-[0_0_0_3px_rgba(251,113,133,0.18)]"
						: "border-white/25 focus-within:border-white/50 focus-within:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]",
				)}
			>
				<Mail className="size-5 shrink-0 text-white/60" aria-hidden="true" />
				<label htmlFor="waitlist-email" className="sr-only">
					Email address
				</label>
				<input
					id="waitlist-email"
					type="email"
					inputMode="email"
					autoComplete="email"
					placeholder="you@company.com"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						if (status === "error") {
							setStatus("idle");
							setError(null);
						}
					}}
					className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-white placeholder:text-white/45 focus:outline-none"
					aria-invalid={status === "error"}
					aria-describedby={error ? "waitlist-error" : undefined}
				/>
				<button
					type="submit"
					disabled={status === "loading"}
					className={cn(
						"inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
						"bg-white text-slate-900 hover:bg-white/90 active:scale-[0.98]",
						"disabled:cursor-not-allowed disabled:opacity-80 sm:px-5",
					)}
				>
					{status === "loading" ? (
						<>
							<Loader2 className="size-4 animate-spin" aria-hidden="true" />
							<span className="hidden sm:inline">Joining…</span>
						</>
					) : (
						<>
							<span>Join waitlist</span>
							<ArrowRight className="size-4 transition-transform group-focus-within:translate-x-0.5" aria-hidden="true" />
						</>
					)}
				</button>
			</div>
			<p
				id="waitlist-error"
				className={cn(
					"mt-2 min-h-[1.25rem] pl-1 text-left text-sm text-rose-200 transition-opacity",
					error ? "opacity-100" : "opacity-0",
				)}
				role={error ? "alert" : undefined}
			>
				{error}
			</p>
		</form>
	);
}
