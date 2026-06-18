"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button — shadcn-pattern button (CVA + `asChild` via Radix Slot), restyled for
 * the phosphor instrument: a `phosphor` variant that glows cyan, and a `ghost`
 * variant for the hairline secondary action.
 */
const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[hsl(var(--phosphor))] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        phosphor:
          "border border-[hsl(var(--phosphor)/0.55)] bg-[hsl(var(--phosphor)/0.08)] text-[hsl(var(--phosphor))] shadow-[0_0_0_1px_hsl(var(--phosphor)/0.12),0_0_24px_-6px_hsl(var(--phosphor)/0.6)] hover:bg-[hsl(var(--phosphor)/0.16)] hover:shadow-[0_0_0_1px_hsl(var(--phosphor)/0.4),0_0_42px_-6px_hsl(var(--phosphor)/0.85)] hover:-translate-y-px active:translate-y-0",
        ghost:
          "border border-white/12 bg-white/[0.02] text-white/70 hover:border-white/30 hover:bg-white/[0.05] hover:text-white",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4",
      },
    },
    defaultVariants: {
      variant: "phosphor",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
