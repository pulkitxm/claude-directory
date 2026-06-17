// Probe: import the cn() utility THROUGH the `@/` alias so verification proves
// the alias from the prompt's STEP 2 actually resolves to /src/.
import { cn } from "@/lib/utils";

// py-2 should be overridden by py-1 (tailwind-merge), false branch dropped (clsx).
export const cnResult = cn("py-2 px-4", "py-1", false && "hidden", "bg-white");

export const classValueWorks =
  cn(["text-sm", { italic: true, underline: false }], undefined, null) ===
  "text-sm italic";
