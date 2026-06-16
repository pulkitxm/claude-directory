import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { OrbitalOrb } from "@/components/sections/OrbitalOrb";

export function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="relative py-24" aria-label="Get started">
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-matter shadow-elevate">
          {/* layered background: grid + texture + glows */}
          <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-[0.05]" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-orange opacity-[0.12] blur-[120px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-burnt opacity-[0.10] blur-[130px]"
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-10 p-8 md:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-16">
            <div className="flex flex-col items-start gap-6">
              <Badge live>
                Join 128,940 vault holders
              </Badge>
              <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                Start securing your{" "}
                <span className="text-gradient">digital gold</span> today.
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-stardust md:text-lg">
                Spin up a non-custodial vault in under two minutes. Get protocol
                updates, yield reports, and early access to new strategies.
              </p>

              {submitted ? (
                <div className="flex items-center gap-3 rounded-xl border border-orange/40 bg-orange/10 px-5 py-4">
                  <CheckCircle2 className="h-5 w-5 text-orange" />
                  <span className="font-mono text-sm text-white">
                    You're on the list. Welcome to the network.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-end"
                >
                  <div className="flex-1">
                    <label
                      htmlFor="cta-email"
                      className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-stardust"
                    >
                      Wallet email
                    </label>
                    <Input
                      id="cta-email"
                      type="email"
                      required
                      placeholder="satoshi@protonmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <Button type="submit" className="group/cta shrink-0">
                    Get Access
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </Button>
                </form>
              )}

              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-white/40">
                Non-custodial · No KYC · Your keys, your coin
              </p>
            </div>

            {/* Reuse the orbital orb, scaled into the panel */}
            <div className="hidden lg:block">
              <OrbitalOrb />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
