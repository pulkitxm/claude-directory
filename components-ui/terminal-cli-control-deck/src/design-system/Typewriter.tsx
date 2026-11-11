import { useEffect, useRef, useState } from "react";
import { Cursor } from "./Cursor";
export function Typewriter({
  text,
  speed = 38,
  startDelay = 0,
  className = "",
  cursor = true,
  onDone
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  cursor?: boolean;
  onDone?: () => void;
}) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  useEffect(() => {
    setCount(0);
    doneRef.current = false;
    let i = 0;
    let timer: number;
    const start = window.setTimeout(function step() {
      timer = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          window.clearInterval(timer);
          if (!doneRef.current) {
            doneRef.current = true;
            onDoneRef.current?.();
          }
        }
      }, speed);
    }, startDelay);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [text, speed, startDelay]);
  const done = count >= text.length;
  return <span className={className}>
			{}
			<span aria-hidden="true">{text.slice(0, count)}</span>
			{cursor && <Cursor char="_" className={done ? "" : "[animation:none] opacity-100"} />}
			{}
			<span className="sr-only">{text}</span>
		</span>;
}
