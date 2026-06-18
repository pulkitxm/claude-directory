import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Four corner brackets that frame the live stage like a viewfinder. */
export function ReticleCorners({ className }: { className?: string }) {
  const base = "pointer-events-none absolute size-5 border-paper/45";
  return (
    <div className={cn("pointer-events-none absolute inset-3 z-20", className)}>
      <span className={cn(base, "left-0 top-0 border-l-2 border-t-2")} />
      <span className={cn(base, "right-0 top-0 border-r-2 border-t-2")} />
      <span className={cn(base, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span className={cn(base, "bottom-0 right-0 border-b-2 border-r-2")} />
    </div>
  );
}

/** Small uppercase eyebrow label with a leading spectral tick. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.32em] text-muted", className)}>
      <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-spec-violet via-spec-cyan to-spec-rose" />
      {children}
    </div>
  );
}

/** Section heading wrapper used across the page. */
export function SectionHead({
  id,
  eyebrow,
  title,
  blurb,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  blurb?: string;
}) {
  return (
    <header id={id} className="mb-8 scroll-mt-24">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-paper sm:text-3xl">{title}</h2>
      {blurb ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{blurb}</p> : null}
    </header>
  );
}
