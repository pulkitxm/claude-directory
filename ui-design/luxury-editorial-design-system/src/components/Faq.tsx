import { useState } from "react";
import { Plus } from "lucide-react";
import { Overline } from "./Primitives";
import { faqs } from "../data/content";

export function Faq() {
  // Single-open accordion; first item open by default.
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="contact" className="relative border-t border-foreground/10 py-20 md:py-32">
      <div className="mx-auto max-w-[1600px] px-8 md:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Heading column — offset, asymmetric */}
          <div className="lg:col-span-4 lg:col-start-1">
            <Overline>Enquiries</Overline>
            <h2 className="mt-8 font-serif text-4xl font-normal leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Before you
              <br />
              <em className="italic text-accent">write.</em>
            </h2>
            <p className="mt-8 max-w-xs font-sans text-base leading-relaxed text-muted-fg">
              A few things our patrons most often ask. For anything else, the
              atelier answers every letter personally.
            </p>
          </div>

          {/* Accordion column */}
          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="border-t border-foreground/15">
              {faqs.map((item) => {
                const isOpen = openId === item.id;
                const btnId = `faq-trigger-${item.id}`;
                const panelId = `faq-panel-${item.id}`;
                return (
                  <li key={item.id} className="border-b border-foreground/15">
                    <h3>
                      <button
                        type="button"
                        id={btnId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        className="group flex w-full items-center justify-between gap-6 py-7 text-left transition-colors duration-500 ease-luxe focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
                      >
                        <span
                          className={[
                            "font-serif text-2xl font-normal leading-tight tracking-tight transition-colors duration-500 ease-luxe md:text-3xl",
                            isOpen
                              ? "text-accent"
                              : "text-foreground group-hover:text-accent",
                          ].join(" ")}
                        >
                          {item.question}
                        </span>
                        {/* Icon square: rotates 90°, border turns gold on open */}
                        <span
                          aria-hidden
                          className={[
                            "flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-500 ease-luxe reduce-motion-noscale",
                            isOpen
                              ? "rotate-90 border-accent text-accent"
                              : "border-foreground/30 text-foreground group-hover:border-accent group-hover:text-accent",
                          ].join(" ")}
                        >
                          <Plus strokeWidth={1.25} className="h-4 w-4" />
                        </span>
                      </button>
                    </h3>

                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        className="overflow-hidden pb-8 pr-12"
                      >
                        <p className="max-w-xl animate-fadeIn font-sans text-base leading-relaxed text-muted-fg">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
