export type ProjectType = "vite" | "next" | "static" | "unknown";

export type ProjectStatus =
  | "idle"
  | "installing"
  | "building"
  | "starting"
  | "cleaning"
  | "running"
  | "failed"
  | "stopped";

export type ProjectAction = "run" | "preview" | "stop";

export type ProjectMetadata = {
  description: string;
  stack: string;
};

export type ProjectInfo = {
  id: string;
  name: string;
  path: string;
  description: string;
  stack: string;
  type: ProjectType;
  runnable: boolean;
  actions: ProjectAction[];
  demoPath: string;
  thumbnailPath?: string;
  entryHtml?: string;
  scripts: Record<string, string>;
};

export type PublicProject = Omit<ProjectInfo, "path" | "demoPath" | "thumbnailPath" | "entryHtml" | "scripts"> & {
  status: ProjectStatus;
  port?: number;
  url?: string;
  thumbnailUrl?: string;
  logs: string[];
};

export type RunMode = "dev" | "preview";

export type CommandSpec = {
  command: string[];
  cwd: string;
};
