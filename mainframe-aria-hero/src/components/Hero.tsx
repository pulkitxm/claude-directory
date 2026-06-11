import { useEffect, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPED_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';
const EMAIL = 'hello@mainframe.co';
const PILL_ACTIONS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
];

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPED_TEXT);
  const [pillsVisible, setPillsVisible] = useState(false);

  // Pills fade in 400ms after load, independent of the typewriter.
  useEffect(() => {
    const timeout = window.setTimeout(() => setPillsVisible(true), 400);
    return () => window.clearTimeout(timeout);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).catch(() => {
      /* Clipboard unavailable (permissions / insecure context) — ignore. */
    });
  };

  return (
    <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <div className="relative z-10 max-w-xl">
        {/* Blurred intro label */}
        <p
          className="pointer-events-none mb-5 select-none sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#000',
            filter: 'blur(4px)',
          }}
        >
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </p>

        {/* Typewriter line */}
        <p
          className="mb-5 min-h-[54px] text-black sm:mb-6"
          style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.35, fontWeight: 400 }}
        >
          {displayed}
          {!done && (
            <span
              aria-hidden="true"
              className="cursor-blink ml-[2px] inline-block h-[1.1em] w-[2px] bg-black align-middle"
            />
          )}
        </p>

        {/* Action pills */}
        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {PILL_ACTIONS.map((label) => (
            <button
              key={label}
              type="button"
              className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-[0.3em] text-[13px] text-black transition-colors duration-200 hover:bg-black hover:text-white sm:px-5 sm:text-[15px]"
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={copyEmail}
            aria-label={`Copy ${EMAIL} to clipboard`}
            className="mx-[0.2em] mb-[0.4em] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-[0.3em] text-[13px] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:gap-3 sm:px-5 sm:text-[15px]"
          >
            <span>
              Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
            </span>
            {/* Copy icon: two overlapping rectangles */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              aria-hidden="true"
            >
              <rect x="3.9" y="3.9" width="7.4" height="7.4" rx="1" />
              <rect x="0.7" y="0.7" width="7.4" height="7.4" rx="1" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
