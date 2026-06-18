import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Numbered section header used down the integration story. */
export function SectionHeader({
  index,
  kicker,
  title,
  children,
  className,
}: {
  index: string;
  kicker: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wide2 text-sea-400/90">
        <span className="rounded border border-sea-500/30 bg-sea-500/10 px-1.5 py-0.5 tabular-nums">
          {index}
        </span>
        <span>{kicker}</span>
      </div>
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foam text-balance sm:text-[2.1rem]">
        {title}
      </h2>
      {children && (
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-steel">
          {children}
        </p>
      )}
    </div>
  );
}
