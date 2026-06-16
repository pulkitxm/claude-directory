import { Star } from "lucide-react";
import { Overline, Emphasis } from "./Primitives";
import { testimonials } from "../data/content";

export function Testimonials() {
  return (
    <section className="relative border-t border-foreground/10 py-20 md:py-32">
      <div className="mx-auto max-w-[1600px] px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-2">
            <Overline>In Their Words</Overline>
            <h2 className="mt-8 max-w-2xl font-serif text-4xl font-normal leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-7xl">
              The <Emphasis>considered</Emphasis> opinion of those who keep them.
            </h2>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-20 lg:grid-cols-12 lg:gap-x-16">
          {testimonials.map((t, i) => (
            <figure
              key={t.author}
              className={[
                "group border-l border-foreground/20 pl-6 transition-all duration-700 ease-luxe",
                "hover:border-l-2 hover:border-accent hover:pl-9",
                "lg:col-span-4",
                i === 0
                  ? "lg:col-start-1"
                  : i === 1
                  ? "lg:col-start-5"
                  : "lg:col-start-9",
              ].join(" ")}
            >
              {/* Stars — scale up on card hover */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    aria-hidden
                    strokeWidth={1}
                    className="h-3.5 w-3.5 text-accent transition-transform duration-500 ease-luxe group-hover:scale-110 reduce-motion-noscale"
                    fill="currentColor"
                  />
                ))}
              </div>

              <blockquote className="mt-6 font-serif text-xl font-normal italic leading-[1.4] text-foreground md:text-2xl">
                “{t.quote}”
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-4">
                <span className="relative block h-12 w-12 overflow-hidden bg-muted-bg">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-[1500ms] ease-luxe group-hover:grayscale-0 reduce-motion-noscale"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 shadow-frame"
                  />
                </span>
                <span>
                  <span className="block font-sans text-sm font-medium uppercase tracking-overline text-foreground transition-colors duration-500 ease-luxe group-hover:text-accent">
                    {t.author}
                  </span>
                  <span className="mt-1 block font-serif text-sm italic text-muted-fg">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
