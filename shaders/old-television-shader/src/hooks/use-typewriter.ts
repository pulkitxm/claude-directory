import { useEffect, useRef, useState } from "react";

/**
 * useTypewriter — types out a sequence of lines character by character. Built on
 * setTimeout so the demo recorder's virtual clock advances it deterministically.
 */
export function useTypewriter(
  lines: string[],
  opts: { speed?: number; lineDelay?: number; startDelay?: number; loop?: boolean } = {},
) {
  const { speed = 38, lineDelay = 650, startDelay = 500, loop = false } = opts;
  const [rendered, setRendered] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
    setRendered([]);
    setDone(false);

    let delay = startDelay;
    const out: string[] = [];

    const schedule = (fn: () => void, at: number) => {
      timers.current.push(window.setTimeout(fn, at));
    };

    lines.forEach((line, li) => {
      out[li] = "";
      for (let ci = 0; ci <= line.length; ci++) {
        schedule(() => {
          out[li] = line.slice(0, ci);
          setRendered([...out]);
        }, delay);
        delay += speed;
      }
      delay += lineDelay;
    });

    schedule(() => {
      setDone(true);
      if (loop) {
        schedule(() => {
          // restart by re-keying the effect via state reset
          setRendered([]);
          setDone(false);
        }, 1800);
      }
    }, delay);

    return () => timers.current.forEach((t) => clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join(""), speed, lineDelay, startDelay, loop]);

  return { rendered, done };
}
