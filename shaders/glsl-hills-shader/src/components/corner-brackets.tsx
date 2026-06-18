/**
 * Four engraved registration brackets framing the live stage — the standard
 * survey-instrument viewfinder corners used across the showcase chrome.
 */
export function CornerBrackets({ className = "" }: { className?: string }) {
  const arm =
    "absolute h-5 w-5 border-signal/45";
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className={`${arm} left-2.5 top-2.5 border-l border-t`} />
      <span className={`${arm} right-2.5 top-2.5 border-r border-t`} />
      <span className={`${arm} bottom-2.5 left-2.5 border-b border-l`} />
      <span className={`${arm} bottom-2.5 right-2.5 border-b border-r`} />
    </div>
  );
}
