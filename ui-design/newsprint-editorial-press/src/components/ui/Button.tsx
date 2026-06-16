import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

/**
 * Newsprint button. Sharp corners, uppercase tracked labels, instant
 * black/white color inversion on hover — never a soft shadow.
 */
const button = cva(
  "inline-flex min-h-[44px] items-center justify-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border border-transparent bg-ink px-7 text-paper hover:border-ink hover:bg-paper hover:text-ink",
        secondary:
          "border border-ink bg-transparent px-7 text-ink hover:bg-ink hover:text-paper",
        accent:
          "border border-transparent bg-editorial px-7 text-paper hover:border-ink hover:bg-paper hover:text-ink",
        invert:
          "border border-paper bg-paper px-7 text-ink hover:bg-transparent hover:text-paper",
        ghost: "px-5 text-ink hover:bg-divider",
        link: "min-h-0 px-0 text-ink underline-offset-4 decoration-2 decoration-editorial hover:underline",
      },
      size: {
        md: "py-3",
        lg: "py-4 text-sm",
        sm: "min-h-0 py-2 text-[0.65rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  ref?: Ref<HTMLButtonElement>;
  children: ReactNode;
}

export function Button({
  className,
  variant,
  size,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  );
}
