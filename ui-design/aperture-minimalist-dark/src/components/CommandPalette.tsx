import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Rocket,
  GitBranch,
  Database,
  Terminal,
  Gauge,
  CornerDownLeft,
  Check,
} from "lucide-react";
import { cn } from "../lib/cn";

type Row = {
  icon: typeof Rocket;
  label: string;
  hint: string;
  group: string;
};

const ROWS: Row[] = [
  { icon: Rocket, label: "Deploy to production", hint: "⏎", group: "Actions" },
  { icon: GitBranch, label: "Create preview from branch", hint: "P", group: "Actions" },
  { icon: Database, label: "Open edge database", hint: "D", group: "Resources" },
  { icon: Gauge, label: "Inspect cold-start trace", hint: "T", group: "Resources" },
  { icon: Terminal, label: "Stream live logs", hint: "L", group: "Resources" },
];

/** Faux deploy lines that stream after the user "runs" the top command. */
const DEPLOY_LINES = [
  "→ building image · linux/arm64",
  "→ uploading 14 functions to 6 regions",
  "→ warming edge cache · iad fra hnd",
  "✓ deployed in 11.4s — aperture.sh/v412",
];

/**
 * An always-on, self-driving command palette mock. It cycles through a small
 * loop: a query types into the search field, the top result highlights, then a
 * deploy "runs" and streams log lines into a mono panel. Purely cosmetic and
 * non-interactive (aria-hidden) — it exists to sell the 2am-developer vibe.
 */
export function CommandPalette({ className }: { className?: string }) {
  const [typed, setTyped] = useState("");
  const [active, setActive] = useState(0);
  const [deployed, setDeployed] = useState(false);
  const [logCount, setLogCount] = useState(0);
  const timers = useRef<number[]>([]);

  const QUERY = "deploy production";

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const push = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    const runCycle = () => {
      // reset
      setTyped("");
      setDeployed(false);
      setLogCount(0);
      setActive(0);

      if (reduce) {
        setTyped(QUERY);
        setDeployed(true);
        setLogCount(DEPLOY_LINES.length);
        return;
      }

      // type query
      let t = 500;
      for (let i = 1; i <= QUERY.length; i++) {
        push(() => setTyped(QUERY.slice(0, i)), t);
        t += 62;
      }
      // small dwell, then "run"
      t += 650;
      push(() => setDeployed(true), t);
      // stream logs
      t += 250;
      for (let i = 1; i <= DEPLOY_LINES.length; i++) {
        push(() => setLogCount(i), t);
        t += i === DEPLOY_LINES.length ? 700 : 620;
      }
      // hold the finished state, then loop
      t += 2600;
      push(runCycle, t);
    };

    runCycle();
    return () => {
      timers.current.forEach((id) => clearTimeout(id));
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, Row[]>();
    ROWS.forEach((r) => {
      const arr = map.get(r.group) ?? [];
      arr.push(r);
      map.set(r.group, arr);
    });
    return Array.from(map.entries());
  }, []);

  let flatIndex = -1;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-white/[0.08] bg-background-alt/80 shadow-xl backdrop-blur-xl",
        className,
      )}
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="ml-3 font-mono text-[11px] tracking-wide text-muted-foreground">
          aperture — ⌘K
        </span>
      </div>

      {/* search row */}
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
        <Search size={16} strokeWidth={1.5} className="text-muted-foreground" />
        <div className="flex flex-1 items-center font-mono text-sm text-foreground">
          <span>{typed}</span>
          <span className="ml-0.5 inline-block h-4 w-[2px] animate-caret-blink bg-accent" />
        </div>
        <span className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          esc
        </span>
      </div>

      {/* results */}
      <div className="px-2 py-2">
        {grouped.map(([group, rows]) => (
          <div key={group} className="mb-1">
            <div className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
              {group}
            </div>
            {rows.map((r) => {
              flatIndex += 1;
              const idx = flatIndex;
              const isActive = idx === active;
              const Icon = r.icon;
              return (
                <div
                  key={r.label}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200",
                    isActive ? "bg-accent/[0.12]" : "bg-transparent",
                  )}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className={cn(
                      isActive ? "text-accent" : "text-muted-foreground",
                    )}
                  />
                  <span
                    className={cn(
                      "flex-1 text-sm",
                      isActive ? "text-foreground" : "text-foreground/80",
                    )}
                  >
                    {r.label}
                  </span>
                  {isActive ? (
                    <span className="flex items-center gap-1 rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] text-accent">
                      <CornerDownLeft size={11} strokeWidth={2} /> run
                    </span>
                  ) : (
                    <span className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {r.hint}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* deploy log drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-white/[0.06] transition-all duration-500 ease-out-soft",
          deployed ? "max-h-48 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="space-y-1.5 bg-black/30 px-4 py-3 font-mono text-[12px] leading-relaxed">
          {DEPLOY_LINES.slice(0, logCount).map((line, i) => {
            const done = line.startsWith("✓");
            return (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-2 animate-fade-in",
                  done ? "text-emerald-300/90" : "text-muted-foreground",
                )}
              >
                {done ? (
                  <Check size={13} strokeWidth={2} className="text-emerald-400" />
                ) : (
                  <span className="h-1 w-1 rounded-full bg-accent/70" />
                )}
                <span>{done ? line.replace("✓ ", "") : line.replace("→ ", "")}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
