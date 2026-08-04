declare module "*.css";

interface ImportMetaEnv {
	readonly VITE_COMMUNITY_URL?: string;
	readonly VITE_SHARE_TEXT?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
