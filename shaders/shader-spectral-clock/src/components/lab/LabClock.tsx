import { useEffect, useState } from "react";
import { MapPin, Pencil } from "lucide-react";
import type { TemperatureUnit } from "@/components/ui/shader-clock";

/**
 * Lab variant of the brief's <TimeDisplay/>. Same shape and the same two
 * interactions (click the city to rename it, click the temperature to flip °C/°F),
 * but the displayed zone / city / mock temperature are driven by the selected
 * world preset instead of the browser's own timezone — so the readout stays
 * coherent with the skyline behind it. The verbatim <TimeDisplay/> itself is shown
 * untouched in the "Drop-in demo" section below.
 */
export function LabClock({
  city,
  zone,
  tempC,
  onCityChange,
}: {
  city: string;
  zone: string;
  tempC: number;
  onCityChange: (next: string) => void;
}) {
  const [time, setTime] = useState("");
  const [seconds, setSeconds] = useState("");
  const [unit, setUnit] = useState<TemperatureUnit>("C");
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(city);

  useEffect(() => setDraft(city), [city]);

  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      try {
        setTime(
          now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: zone,
          }),
        );
        setSeconds(
          now.toLocaleTimeString([], {
            second: "2-digit",
            timeZone: zone,
          }),
        );
      } catch {
        setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }));
        setSeconds(now.toLocaleTimeString([], { second: "2-digit" }));
      }
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, [zone]);

  const temperature =
    unit === "F" ? `${Math.round((tempC * 9) / 5 + 32)}°F` : `${tempC}°C`;

  const commit = () => {
    const next = draft.trim();
    onCityChange(next || city);
    if (!next) setDraft(city);
    setIsEditing(false);
  };

  return (
    <div className="relative z-10 flex flex-col items-center text-center text-paper [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]">
      <div className="flex items-baseline gap-2 font-mono">
        <span className="text-[clamp(3.2rem,11vw,6.5rem)] font-bold leading-none tracking-tight tabular-nums">
          {time.replace(/\s?[AP]M/i, "")}
        </span>
        <span className="flex flex-col items-start gap-1 pb-2">
          <span className="text-base font-medium tabular-nums text-paper/70">:{seconds}</span>
          <span className="rounded bg-white/12 px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-paper/80 backdrop-blur-sm">
            {/[AP]M/i.exec(time)?.[0] ?? ""}
          </span>
        </span>
      </div>

      {isEditing ? (
        <input
          type="text"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") commit();
            if (e.key === "Escape") {
              setDraft(city);
              setIsEditing(false);
            }
          }}
          className="mt-4 w-56 rounded-lg border-0 bg-black/35 px-4 py-2 text-center text-lg text-paper shadow-inner backdrop-blur-sm outline-none ring-1 ring-white/20 focus:ring-spec-cyan/70"
          placeholder="Enter your city"
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          title="Click to edit location"
          className="group mt-4 inline-flex items-center gap-1.5 text-xl font-medium text-paper/90 underline-offset-4 transition hover:text-paper hover:underline"
        >
          <MapPin className="size-4 text-spec-cyan" strokeWidth={2.2} />
          {city}
          <Pencil className="size-3 opacity-0 transition group-hover:opacity-60" />
        </button>
      )}

      <button
        onClick={() => setUnit((u) => (u === "C" ? "F" : "C"))}
        title="Click to toggle between °C and °F"
        className="mt-2 font-mono text-base text-paper/70 underline-offset-4 transition hover:text-paper hover:underline"
      >
        {temperature}
      </button>
    </div>
  );
}
