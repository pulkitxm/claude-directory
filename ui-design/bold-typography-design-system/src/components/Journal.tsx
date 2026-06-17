import { ArrowUpRight, ArrowRight } from "lucide-react";
import { journal } from "../data/content";
import { Reveal, RevealGroup, RevealItem, SectionLabel } from "./Primitives";
import { Button } from "./Button";

// ─────────────────────────────────────────────────────────────────────────────
// Journal (Blog) — a 1 → 2 → 3 grid of editorial posters. Each card's image lives
// in an overflow-hidden frame and scales to 105% over 500ms on hover; only the
// image transforms (no card lift, no shadow). The title underlines on hover.
// ─────────────────────────────────────────────────────────────────────────────

export function Journal() {
  return (
    <section id="journal" className="border-b border-border py-20 md:py-28 lg:py-32">
      <div className="container-bold">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>The Journal</SectionLabel>
            <h2 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Notes from <span className="text-accent">the press.</span>
            </h2>
          </div>
          {/* Ghost button: muted → foreground, thin underline scales in on hover */}
          <Button href="#journal" variant="ghost" size="default" className="mb-1">
            All essays
            <ArrowRight size={16} strokeWidth={1.5} />
          </Button>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {journal.map((post) => (
            <RevealItem key={post.title} as="article">
              <a href="#journal" className="group block focus-visible:outline-none">
                {/* image frame: overflow-hidden, image scales only */}
                <div className="overflow-hidden border border-border">
                  <img
                    src={post.image}
                    alt={`Poster artwork for the article “${post.title}”.`}
                    className="block aspect-[4/3] w-full object-cover transition-transform duration-500 ease-crisp group-hover:scale-105"
                    width={1200}
                    height={900}
                    loading="lazy"
                  />
                </div>

                <div className="mt-5 flex items-center gap-3 label-mono">
                  <span className="text-accent">{post.kicker}</span>
                  <span aria-hidden className="h-px flex-1 bg-border" />
                  <span>
                    {post.date} · {post.read}
                  </span>
                </div>

                <h3 className="relative mt-3 inline-flex items-start gap-2 text-2xl font-bold tracking-tight text-foreground">
                  <span className="relative">
                    {post.title}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 right-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-150 ease-crisp group-hover:scale-x-100"
                    />
                  </span>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-muted-foreground transition-all duration-150 ease-crisp group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </h3>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
