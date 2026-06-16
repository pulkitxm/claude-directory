import { SectionHeader } from "./SectionHeader";
import { SpotlightCard } from "./SpotlightCard";
import { RevealGroup, RevealItem } from "./Reveal";

const COLOR_TOKENS = [
  { name: "background-base", value: "#050506", swatch: "#050506" },
  { name: "background-elevated", value: "#0a0a0c", swatch: "#0a0a0c" },
  { name: "foreground", value: "#EDEDEF", swatch: "#EDEDEF" },
  { name: "foreground-muted", value: "#8A8F98", swatch: "#8A8F98" },
  { name: "accent", value: "#5E6AD2", swatch: "#5E6AD2" },
  { name: "accent-bright", value: "#6872D9", swatch: "#6872D9" },
];

const SCALE = [
  { label: "Display", cls: "text-3xl sm:text-4xl", note: "semibold · -0.03em" },
  { label: "Heading", cls: "text-xl sm:text-2xl", note: "semibold · tight" },
  { label: "Body", cls: "text-base", note: "normal · relaxed" },
];

export function TokensSection() {
  return (
    <section id="tokens" className="container-page py-20 sm:py-28 lg:py-32">
      <SectionHeader
        eyebrow="The DNA"
        title="One source of truth"
        lead="Color, type, radius, shadow, and motion live as centralized tokens. Change them once; the whole system follows."
        align="left"
      />

      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Palette */}
        <SpotlightCard className="lg:col-span-2">
          <div className="p-6 sm:p-7">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight text-fg">
                Color
              </h3>
              <span className="font-mono text-[11px] uppercase tracking-widest text-fg-muted/60">
                deep space + ambient indigo
              </span>
            </div>
            <RevealGroup
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
              stagger={0.05}
            >
              {COLOR_TOKENS.map((t) => (
                <RevealItem key={t.name}>
                  <div className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors duration-std ease-expo hover:border-white/[0.12]">
                    <div
                      className="mb-3 h-12 w-full rounded-lg border border-white/[0.08] shadow-inner-hi"
                      style={{ background: t.swatch }}
                    />
                    <div className="truncate font-mono text-[11px] text-fg">
                      {t.name}
                    </div>
                    <div className="font-mono text-[11px] text-fg-muted/70">
                      {t.value}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </SpotlightCard>

        {/* Type scale + radius/shadow */}
        <div className="flex flex-col gap-4">
          <SpotlightCard className="flex-1">
            <div className="p-6 sm:p-7">
              <h3 className="mb-5 text-lg font-semibold tracking-tight text-fg">
                Type
              </h3>
              <div className="space-y-4">
                {SCALE.map((s) => (
                  <div key={s.label}>
                    <div
                      className={`${s.cls} font-semibold tracking-tight text-fg`}
                    >
                      Aa
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-fg-muted/70">
                      {s.label} · {s.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard>
            <div className="p-6 sm:p-7">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-fg">
                Radius &amp; shadow
              </h3>
              <div className="flex items-end gap-3">
                <div className="h-12 w-12 rounded-lg bg-white/[0.06] shadow-card" />
                <div className="h-14 w-14 rounded-xl bg-white/[0.06] shadow-card" />
                <div className="h-16 w-16 rounded-2xl bg-white/[0.06] shadow-card-hover" />
              </div>
              <div className="mt-3 font-mono text-[11px] text-fg-muted/70">
                8px · 12px · 16px · 3-layer depth
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
