import { ArrowUpRight } from "lucide-react";
import { journal } from "../data/content";
import { Card, Section, SectionLabel } from "./Primitives";
import { PlateJournal } from "./Plates";

export function Journal() {
  return (
    <Section id="journal">
      <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <SectionLabel align="left" className="mb-7">
            {journal.label}
          </SectionLabel>
          <h2
            className="font-display leading-[1.16] tracking-[-0.01em] text-foreground"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3rem)" }}
          >
            {journal.title}
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{journal.lede}</p>
        </div>
        <a href="#journal" className="small-caps link-underline shrink-0 text-foreground">
          All entries
        </a>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-7">
        {journal.posts.map((post) => (
          <Card
            key={post.title}
            as="article"
            hover
            className="group flex flex-col overflow-hidden"
          >
            <div className="overflow-hidden border-b border-border">
              <PlateJournal seed={post.seed} className="h-48 w-full" />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-center gap-3">
                <span className="small-caps text-accent">{post.category}</span>
                <span aria-hidden className="rule w-4" />
                <span className="small-caps text-muted-foreground">{post.date}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-3 flex-1 text-[0.97rem] leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <span className="small-caps text-muted-foreground">{post.read} read</span>
                <span className="inline-flex items-center gap-1 text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                  <span className="small-caps">Read</span>
                  <ArrowUpRight size={14} strokeWidth={1.8} />
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
