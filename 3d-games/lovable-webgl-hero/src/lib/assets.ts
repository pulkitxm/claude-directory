const base = import.meta.env.BASE_URL;

export const vendorAsset = (file: string) => `${base}vendor/${file}`;
