import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "phosphor" | "amber" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants: Record<string, string> = {
    default:
      "border-cabinet-700 bg-cabinet-900/70 text-bone-200/80",
    phosphor:
      "border-phosphor-400/40 bg-phosphor-500/10 text-phosphor-200",
    amber: "border-signal-amber/40 bg-signal-amber/10 text-signal-amber",
    outline: "border-cabinet-700 text-bone-200/70",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
