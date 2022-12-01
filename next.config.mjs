/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    appDir: false,
    // nftTracing: true,
    // outputFileTracing: true,
  },
}

export default nextConfig
