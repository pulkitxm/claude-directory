import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS, type Testimonial } from "@/data/content";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-matter py-24"
      aria-label="Testimonials"
    >
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-burnt opacity-[0.06] blur-[150px]"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          kicker="signal"
          title="Trusted by stackers"
          accent="& treasuries"
          description="From independent hodlers to institutional desks — the AURUM network secures digital gold for those who refuse to compromise on custody."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 90}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-card">
      <Quote
        className="absolute right-6 top-6 h-12 w-12 text-orange opacity-[0.08] transition-opacity duration-300 group-hover:opacity-20"
        aria-hidden="true"
      />

      <div className="mb-5 flex gap-1" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-gold text-gold"
            aria-hidden="true"
          />
        ))}
      </div>

      <blockquote className="relative flex-1 text-base leading-relaxed text-white/90">
        “{testimonial.quote}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-orange/40 bg-gradient-to-br from-burnt/30 to-gold/20 font-heading text-sm font-semibold text-orange">
          {testimonial.initials}
        </span>
        <span className="flex flex-col">
          <span className="font-heading text-sm font-semibold text-white">
            {testimonial.name}
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-wider text-stardust">
            {testimonial.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
