import { useEffect, useState } from 'react';

/**
 * Reveals `text` one character at a time. After `startDelay` ms, an interval
 * appends a character every `speed` ms until the full text is displayed.
 */
export function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      let count = 0;
      interval = window.setInterval(() => {
        count += 1;
        setDisplayed(text.slice(0, count));
        if (count >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
