import type { ReactNode } from "react";
import { cn } from "./Primitives";

type Variant = "primary" | "outline" | "ghost";

/* ----------------------------------------------------------------------------
   The Serif button family. Three variants, one component.
   - primary : burnished gold, subtle lift on hover, returns on active
   - outline : strong foreground border, fills muted + shifts to accent on hover
   - ghost   : text-only, growing accent underline on hover
   All meet the 44px min touch target and carry touch-manipulation.
---------------------------------------------------------------------------- */
export function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  className,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const base =
    "inline-flex min-h-[44px] touch-manipulation items-center justify-center gap-2 rounded-md px-7 text-sm font-medium tracking-nav transition-all duration-200 ease-out select-none";

  const variants: Record<Variant, string> = {
    primary:
      "bg-accent text-accent-foreground shadow-sm hover:bg-accent-secondary hover:-translate-y-0.5 hover:shadow-accent active:translate-y-0",
    outline:
      "border border-foreground bg-transparent text-foreground hover:border-accent hover:bg-muted hover:text-accent",
    ghost:
      "text-muted-foreground hover:text-foreground underline-offset-4 decoration-accent hover:underline",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  );
}
