/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Suppress warnings about missing platform-specific @next/swc-* binaries.
    // Only the current platform's binary is installed; the others don't exist
    // and webpack's managed-path snapshot check emits noisy (harmless) warnings.
    config.infrastructureLogging = {
      ...config.infrastructureLogging,
      level: 'error',
    }
    return config
  },
}

export default nextConfig
