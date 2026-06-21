import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary/15 text-primary",
				outline: "border-border bg-transparent text-muted-foreground",
				mono: "border-border bg-secondary font-mono text-[11px] text-foreground/80",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
