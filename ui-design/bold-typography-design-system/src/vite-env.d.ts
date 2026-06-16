/// <reference types="vite/client" />

// Importing an SVG yields its resolved URL string (Vite asset handling).
declare module "*.svg" {
  const src: string;
  export default src;
}
