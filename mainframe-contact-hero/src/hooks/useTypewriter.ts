import { useEffect, useState } from 'react';

export interface TypewriterState {
  displayed: string;
  done: boolean;
}

/**
 * Iteratively reveals `text` slice by slice, like a typewriter.
 * Waits `startDelay` ms, then appends one character every `speed` ms.
 */
export function useTypewriter(text: string, speed = 38, startDelay = 600): TypewriterState {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const timeoutId = setTimeout(() => {
      let index = 0;
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId !== undefined) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
