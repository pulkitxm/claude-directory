import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-mono text-[11px] uppercase tracking-[0.16em] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 select-none";
    const variants: Record<string, string> = {
      default:
        "bg-phosphor-400/90 text-phosphor-foreground border border-phosphor-300 shadow-[0_0_18px_-4px_rgba(38,240,106,0.7)] hover:bg-phosphor-300 active:translate-y-px",
      outline:
        "border border-cabinet-700 bg-cabinet-900/60 text-bone-100 hover:border-phosphor-400/60 hover:text-phosphor-100 active:translate-y-px",
      ghost:
        "text-bone-200/70 hover:text-phosphor-100 hover:bg-cabinet-800/60",
    };
    const sizes: Record<string, string> = {
      default: "h-9 px-4",
      sm: "h-7 px-3 text-[10px]",
      icon: "h-9 w-9",
    };
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
