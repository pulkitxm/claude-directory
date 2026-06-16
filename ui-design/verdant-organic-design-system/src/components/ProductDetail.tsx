import { ArrowRight, Star, Sun, Moon } from "lucide-react";
import { Button } from "./Button";
import { Blob } from "./Blob";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { ProductTin } from "./Botanical";
import { featuredProduct } from "../lib/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Featured-blend spotlight. The product illustration sits rotated -2deg inside a
 * thick white border with a clay-tinted float shadow — a deliberately
 * handcrafted, pinned-photo feel — opposite a column of warm product copy with
 * a caffeine sun/moon scale and price.
 */
export function ProductDetail() {
  const reduced = useReducedMotion();
  return (
    <section id="product" className="relative overflow-hidden px-4 py-32 sm:px-6 lg:px-8">
      <Blob shape={2} color="bg-secondary/15" className="-left-24 top-24 h-[26rem] w-[26rem]" animate={!reduced} />
      <Blob shape={4} color="bg-primary/10" className="-right-24 bottom-10 h-80 w-80" animate={!reduced} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* image */}
        <Reveal className="order-1">
          <div className="relative mx-auto w-full max-w-md">
            <Blob shape={3} color="bg-accent/60" className="-inset-6 -z-10 h-[calc(100%+3rem)] w-[calc(100%+3rem)]" animate={!reduced} />
            <div className="rotate-[-2deg] rounded-[2rem] border-4 border-card bg-card p-2 shadow-float transition-transform duration-700 ease-organic hover:rotate-0">
              <ProductTin className="h-auto w-full rounded-[1.6rem]" />
            </div>
            {/* pinned price tag */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rotate-2 rounded-full border border-border/60 bg-card px-6 py-2.5 shadow-soft">
              <span className="font-serif text-lg font-bold text-foreground">
                {featuredProduct.price}
              </span>
              <span className="ml-1.5 text-sm font-semibold text-muted-foreground">/ 60g tin</span>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div className="order-2 max-w-2xl">
          <Reveal>
            <Eyebrow icon={<Star size={13} className="fill-secondary text-secondary" />}>
              The house favourite
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-4xl font-semibold text-foreground md:text-5xl">
              {featuredProduct.name}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-2 font-serif text-lg italic text-primary">
              {featuredProduct.latin}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {featuredProduct.note}
            </p>
          </Reveal>

          {/* caffeine scale */}
          <Reveal delay={0.24}>
            <div className="mt-7 flex items-center gap-4 rounded-[1.5rem] border border-border/50 bg-muted/50 p-4">
              <div className="flex items-center gap-1.5 text-primary">
                <Sun size={20} />
                <span className="text-sm font-bold text-foreground">
                  {featuredProduct.caffeineLabel}
                </span>
              </div>
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-card">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-secondary to-primary"
                  style={{ width: `${Math.round(featuredProduct.caffeineLevel * 100)}%` }}
                />
              </div>
              <Moon size={18} className="text-muted-foreground" />
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="group">
                Add to basket
                <ArrowRight size={18} className="transition-transform duration-300 ease-organic group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="ghost">
                Read the brewing notes
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
