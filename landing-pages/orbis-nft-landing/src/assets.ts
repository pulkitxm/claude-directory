const baseUrl = (import.meta as ImportMeta & { env: { BASE_URL: string } }).env
	.BASE_URL;

export const assetUrl = (path: string) => `${baseUrl}${path}`;
