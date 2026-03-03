// next.config.ts — Native TypeScript config (Next.js 16 feature)
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    // Static export: optimization is disabled globally.
    // External images (e.g. skillicons.dev) must use plain <img>, not next/image.
    unoptimized: true,
  },
  // Turbopack (default dev server in Next.js 16) — no custom webpack loaders needed.
}

export default nextConfig
