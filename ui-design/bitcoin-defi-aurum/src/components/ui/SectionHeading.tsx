import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  /** Mono kicker label above the title. */
  kicker: string;
  /** Plain leading part of the title. */
  title: ReactNode;
  /** Final word(s) rendered in the orange→gold gradient. */
  accent?: string;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

/**
 * Shared section header: a mono kicker badge, a Space Grotesk title with a
 * gradient accent on the final words, and a muted lede.
 */
export function SectionHeading({
  kicker,
  title,
  accent,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Badge live>{kicker}</Badge>
      <h2 className="max-w-3xl font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
        {title}{" "}
        {accent && <span className="text-gradient">{accent}</span>}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-stardust md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
