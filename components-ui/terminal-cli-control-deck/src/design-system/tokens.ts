export type StatusKind = "ok" | "warn" | "err" | "run";
export const status: Record<StatusKind, {
  label: string;
  tone: "primary" | "secondary" | "error";
}> = {
  ok: {
    label: "OK",
    tone: "primary"
  },
  run: {
    label: "RUN",
    tone: "primary"
  },
  warn: {
    label: "WARN",
    tone: "secondary"
  },
  err: {
    label: "ERR",
    tone: "error"
  }
};
