import { stats } from "../data/content";
import { OrnamentRule } from "./Primitives";

export function Stats() {
  return (
    <section className="relative z-10 py-20 md:py-24">
      <div className="container-reading">
        <OrnamentRule className="mb-14" />
        <dl className="grid grid-cols-2 gap-y-12 gap-x-6 md:grid-cols-4 md:gap-x-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "flex flex-col items-center px-2 text-center",
                // 2-col mobile: divider before the 2nd column (odd indices).
                i % 2 === 1 ? "border-l border-border" : "",
                // 4-col desktop: divider before every column except the first;
                // and remove the mobile divider on the 3rd item (new row start).
                i === 0 ? "md:border-l-0" : "md:border-l md:border-border",
                i === 2 ? "border-l-0 md:border-l" : "",
              ].join(" ")}
            >
              <dd className="font-display text-5xl leading-none tracking-tight text-foreground md:text-6xl">
                {s.value}
              </dd>
              <dt className="small-caps mt-4 text-foreground/80">{s.label}</dt>
              <p className="mt-1 font-display text-sm italic text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </dl>
        <OrnamentRule className="mt-14" />
      </div>
    </section>
  );
}
