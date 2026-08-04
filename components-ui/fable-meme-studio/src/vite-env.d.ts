declare module "*.css";

interface ImportMetaEnv {
	readonly VITE_COMMUNITY_URL?: string;
	readonly VITE_HOLDER_MIN_BALANCE?: string;
	readonly VITE_SHARE_TEXT?: string;
	readonly VITE_SOLANA_MINT_ADDRESS?: string;
	readonly VITE_SOLANA_RPC_URL?: string;
	readonly VITE_TOKEN_TICKER?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
