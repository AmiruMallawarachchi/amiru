/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    domains: ['localhost', 'vercel.app'],
    formats: ['image/webp', 'image/avif']
  },
  eslint: {
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig