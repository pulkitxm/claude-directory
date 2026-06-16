import { Button } from "./Button";
import { Overline, Emphasis, EditorialImage } from "./Primitives";
import { images } from "../assets";

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-[1600px] px-8 pb-20 pt-36 md:px-16 md:pb-28 md:pt-44 lg:min-h-screen lg:pb-32"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
        {/* Headline block — bottom-left aligned, asymmetric (offset start) */}
        <div className="order-2 lg:order-1 lg:col-span-7 lg:col-start-1 lg:pb-6">
          <Overline className="animate-riseIn [animation-delay:120ms]">
            Editorial — Vol. 01 / The House Collection
          </Overline>

          <h1 className="mt-8 font-serif text-5xl font-normal leading-[0.9] tracking-tight text-foreground sm:text-6xl md:text-8xl lg:text-9xl">
            <span className="block animate-riseIn [animation-delay:200ms]">
              Objects
            </span>
            <span className="block animate-riseIn [animation-delay:320ms]">
              made to be <Emphasis>kept</Emphasis>
            </span>
            <span className="block animate-riseIn [animation-delay:440ms]">
              for a <Emphasis>lifetime.</Emphasis>
            </span>
          </h1>

          <p className="mt-10 max-w-md font-sans text-base leading-relaxed text-muted-fg animate-riseIn [animation-delay:560ms] md:text-lg">
            MAISON is a design house built on a single belief — that the most
            luxurious thing an object can offer is permanence. We make slowly,
            and we make to last.
          </p>

          <div className="mt-12 flex flex-col gap-4 animate-riseIn [animation-delay:680ms] sm:flex-row sm:items-center">
            <Button variant="primary" size="lg">
              View the collection
            </Button>
            <Button variant="secondary" size="lg">
              Book the atelier
            </Button>
          </div>
        </div>

        {/* Portrait image — large, grayscale, vertical writing-mode label */}
        <div className="order-1 lg:order-2 lg:col-span-4 lg:col-start-9">
          <div className="animate-riseIn [animation-delay:340ms]">
            <EditorialImage
              src={images.heroPortrait}
              alt="Editorial portrait in directional light, the house's spring study"
              aspect="aspect-[4/5] lg:aspect-[3/4]"
              shadow="shadow-hero"
              verticalLabel="Editorial / Vol. 01"
              labelSide="left"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="font-sans text-[10px] uppercase tracking-overline text-muted-fg">
                The Spring Study
              </span>
              <span className="font-serif text-sm italic text-muted-fg">
                Paris, MMXXIV
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
