import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card — elevated white surface with a subtle border and an accent gradient
 * wash that fades in on hover. The workhorse container of the system.
 */
export const Card = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }
>(({ className, interactive = true, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"group relative overflow-hidden rounded-2xl border border-border bg-card shadow-md transition-all duration-300",
			interactive && "hover:-translate-y-1 hover:shadow-xl",
			className,
		)}
		{...props}
	>
		{interactive && (
			<span
				aria-hidden
				className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
			/>
		)}
		<div className="relative">{children}</div>
	</div>
));
Card.displayName = "Card";

/**
 * GradientBorderCard — the 2px gradient-stroke "featured" treatment.
 * A gradient backdrop padded by 2px reveals the stroke around the white inner.
 */
export const GradientBorderCard = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			"relative rounded-2xl bg-gradient-to-br from-accent via-accent-secondary to-accent p-[2px] shadow-accent-lg transition-transform duration-300",
			className,
		)}
		{...props}
	>
		<div className="h-full w-full rounded-[calc(1rem-2px)] bg-card">
			{children}
		</div>
	</div>
));
GradientBorderCard.displayName = "GradientBorderCard";
