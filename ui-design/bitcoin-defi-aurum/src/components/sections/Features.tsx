import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURES, type Feature } from "@/data/content";

export function Features() {
  return (
    <section id="features" className="relative py-24" aria-label="Protocol features">
      <Container>
        <SectionHeading
          kicker="protocol"
          title="Engineered for"
          accent="precision &amp; trust"
          description="Every layer of AURUM is built around Bitcoin's first principles — self-custody, verifiability, and mathematical certainty. No middlemen, no black boxes."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 90}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Watermark = feature.icon;
  return (
    <Card className="group h-full overflow-hidden">
      {/* Large rotated watermark icon — reveals on hover */}
      <Watermark
        className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 rotate-12 text-orange opacity-[0.06] transition-all duration-500 group-hover:rotate-6 group-hover:opacity-20"
        strokeWidth={1}
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col p-8">
        <div className="flex items-start justify-between">
          <IconTile icon={feature.icon} />
          <ArrowUpRight className="h-5 w-5 text-stardust transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
        </div>

        <h3 className="mt-6 font-heading text-xl font-semibold leading-tight text-white">
          {feature.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-stardust">
          {feature.description}
        </p>

        <span className="mt-6 inline-flex w-fit items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-orange/80">
          <span className="text-stardust">#</span>
          {feature.tag}
        </span>
      </div>
    </Card>
  );
}
