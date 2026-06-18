import { ArrowDown, Boxes, Sparkles, Zap } from "lucide-react";

const rise = (d: number) => ({ animationDelay: `${d}ms` }) as React.CSSProperties;

/**
 * The hero copy block. Sits at the left of the fold, over the live shader.
 * Glass card so the noise field reads through while the text stays legible.
 */
export function HeroPanel() {
  return (
    <div className="max-w-xl">
      <div
        className="animate-rise inline-flex items-center gap-2 rounded-full border border-[rgba(228,200,255,0.16)] bg-[rgba(14,10,24,0.5)] px-3 py-1.5 backdrop-blur"
        style={rise(60)}
      >
        <span className="pulse-dot h-2 w-2 rounded-full bg-amber" />
        <span className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground">
          WEBGL2 · FRAGMENT SHADER · DROP-IN
        </span>
      </div>

      <h1
        className="animate-rise mt-5 text-[clamp(2.6rem,7vw,4.6rem)] font-semibold leading-[0.95] tracking-tight"
        style={rise(140)}
      >
        <span className="text-spectrum">Hive</span>
        <br />
        <span className="text-foreground/95">noise field.</span>
      </h1>

      <p
        className="animate-rise mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground"
        style={rise(220)}
      >
        A single fullscreen raymarched shader that paints a flowing
        amber&nbsp;&rarr;&nbsp;magenta cosine spectrum. It mounts as a bare{" "}
        <code className="rounded bg-[rgba(228,114,255,0.14)] px-1.5 py-0.5 font-mono text-[12px] text-foreground">
          &lt;canvas&gt;
        </code>{" "}
        and drops straight into a shadcn project&apos;s{" "}
        <code className="rounded bg-[rgba(255,178,77,0.14)] px-1.5 py-0.5 font-mono text-[12px] text-foreground">
          @/components/ui
        </code>{" "}
        — no props, no providers, no assets.
      </p>

      <div className="animate-rise mt-7 flex flex-wrap items-center gap-3" style={rise(300)}>
        <a
          href="#docs"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-semibold text-[#0a0612] transition-transform hover:scale-[1.02]"
        >
          <Boxes className="h-4 w-4" />
          Integration guide
          <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
        </a>
        <a
          href="#anatomy"
          className="inline-flex items-center gap-2 rounded-full border border-[rgba(228,200,255,0.18)] bg-[rgba(20,15,30,0.5)] px-5 py-2.5 text-[13px] font-medium text-foreground backdrop-blur transition-colors hover:border-[rgba(228,200,255,0.34)]"
        >
          <Sparkles className="h-4 w-4 text-magenta" />
          See the anatomy
        </a>
      </div>

      <dl
        className="animate-rise mt-9 grid max-w-md grid-cols-3 gap-3"
        style={rise(380)}
      >
        {[
          { k: "Deps", v: "0", note: "runtime" },
          { k: "Props", v: "0", note: "self-driving" },
          { k: "Draw", v: "1×", note: "fs-quad" },
        ].map((s) => (
          <div
            key={s.k}
            className="glass-soft rounded-xl px-3 py-3 text-center"
          >
            <div className="font-mono text-2xl font-semibold tracking-tight text-foreground">
              {s.v}
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {s.k}
            </div>
            <div className="mt-0.5 flex items-center justify-center gap-1 font-mono text-[10px] text-amber/80">
              <Zap className="h-3 w-3" />
              {s.note}
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
