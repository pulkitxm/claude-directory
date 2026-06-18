import { Hexagon, Github, BookOpen } from "lucide-react";

/**
 * Fixed top bar. Frosted, full-width, floating over the live shader. Holds the
 * wordmark, a registry breadcrumb, and a couple of utility links.
 */
export function TopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative grid h-8 w-8 place-items-center rounded-lg bg-[rgba(20,15,30,0.6)] ring-1 ring-[rgba(228,200,255,0.18)]">
            <Hexagon className="h-4 w-4 text-amber" strokeWidth={2.2} />
            <span className="absolute inset-0 rounded-lg shadow-[0_0_22px_-4px_rgba(255,178,77,0.7)]" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-mono text-[15px] font-semibold tracking-[0.18em] text-foreground">
              HIVE
            </span>
            <span className="mt-0.5 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
              NOISE FIELD
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-[rgba(228,200,255,0.12)] bg-[rgba(14,10,24,0.5)] px-1.5 py-1 font-mono text-[11px] text-muted-foreground backdrop-blur md:flex">
          <span className="px-2.5 py-1 text-foreground/80">@/components/ui</span>
          <span className="text-amber/70">/</span>
          <span className="rounded-full bg-[rgba(228,114,255,0.14)] px-2.5 py-1 text-foreground">
            hive.tsx
          </span>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#docs"
            className="hidden items-center gap-1.5 rounded-full border border-[rgba(228,200,255,0.14)] bg-[rgba(20,15,30,0.5)] px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <BookOpen className="h-3.5 w-3.5" /> Docs
          </a>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-[rgba(228,200,255,0.14)] bg-[rgba(20,15,30,0.5)] px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" /> shadcn
          </a>
        </div>
      </div>
      <div className="hairline opacity-60" />
    </header>
  );
}
