const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  redirects: async () => [
    {
      source: '/about',
      destination: '/',
      permanent: true,
    },
  ],
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
