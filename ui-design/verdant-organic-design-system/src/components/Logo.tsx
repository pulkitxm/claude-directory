import { cn } from "../lib/cn";
import { brand } from "../lib/content";

type LogoProps = {
	/** Render the wordmark in pale mist for use on dark sections. */
	onDark?: boolean;
	className?: string;
};

/**
 * Brand lockup: a circular moss-green token holding a hand-drawn leaf-sprig
 * (the design-system's "circular moss container with white icon" rule) beside
 * the Fraunces wordmark.
 */
export function Logo({ onDark = false, className }: LogoProps) {
	return (
		<a
			href="#top"
			className={cn("group inline-flex items-center gap-2.5", className)}
			aria-label={`${brand.name} — home`}
		>
			<span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform duration-500 ease-organic group-hover:rotate-[8deg] group-hover:scale-105">
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
					<path
						d="M12 3c0 6.5-.4 12-.4 18M12 21c-4 0-8-3-8.5-9 4.5 0 7.5 2 8.5 6M12 21c4 0 8-3 8.5-9-4.5 0-7.5 2-8.5 6"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
			<span
				className={cn(
					"font-serif text-xl font-semibold tracking-tight",
					onDark ? "text-primary-foreground" : "text-foreground",
				)}
				style={{ fontVariationSettings: '"SOFT" 50, "opsz" 40' }}
			>
				{brand.name}
			</span>
		</a>
	);
}
