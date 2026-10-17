/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
  // Build de validação isolado: NEXT_DIST_DIR=.next-check npm run build (não toca na .next do servidor dev).
  distDir: process.env.NEXT_DIST_DIR || ".next",
};
export default nextConfig;
