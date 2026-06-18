import { Component } from "@/components/ui/starship-shader";

/**
 * Demo — the canonical example from the brief.
 *
 * This is the verbatim integration: drop <Component /> into a full-viewport box
 * and let the Starship field fill it. The richer HELM-9 navigation console lives
 * in App.tsx; this file is kept so the prompt's reference usage stays available
 * and runnable on its own. (The original `import React` was removed because the
 * automatic JSX runtime makes it unused under TypeScript's noUnusedLocals.)
 */
export default function Demo() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Component />
    </div>
  );
}
