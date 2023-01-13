/** @type {import('next').NextConfig} */

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

export default nextConfig
