/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['@vercel/analytics'],
  },
  webpack(config) {
    // Suppress warnings about missing platform-specific @next/swc-* binaries.
    config.infrastructureLogging = {
      ...config.infrastructureLogging,
      level: 'error',
    }
    return config
  },
}

export default nextConfig
