/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer'
import nextPwa from 'next-pwa'
import runtimeCaching from 'next-pwa/cache.js'

const withPWA = nextPwa({
  dest: 'public',
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    appDir: false,
  },
  rewrites: async () => [
    {
      source: '/rss.xml',
      destination: '/api/rss',
    },
    {
      source: '/rss',
      destination: '/api/rss',
    },
  ],
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(withPWA(nextConfig))
