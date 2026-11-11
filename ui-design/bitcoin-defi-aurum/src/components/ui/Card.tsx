import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";


const card = cva("relative rounded-2xl border transition-all duration-300", {
	variants: {
		variant: {
			solid:
				"border-white/10 bg-matter hover:-translate-y-1 hover:border-orange/50 hover:shadow-card",
			glass:
				"border-white/10 bg-white/5 backdrop-blur-lg hover:-translate-y-1 hover:border-orange/40",
			highlight: "border-orange/60 bg-matter shadow-tier",
			flat: "border-white/10 bg-matter",
		},
	},
	defaultVariants: { variant: "solid" },
});

interface CardProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof card> {
	children: ReactNode;
}

export function Card({ className, variant, children, ...props }: CardProps) {
	return (
		<div className={cn(card({ variant }), className)} {...props}>
			{children}
		</div>
	);
}
