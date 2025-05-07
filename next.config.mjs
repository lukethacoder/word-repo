const ARTICLE_SLUGS = [
  'local-lwc-development-with-aura-enabled-apex',
  'lwc-custom-mixins',
  'lwc-nested-components',
  'my-fresh-windows-machine-developer-setup',
  'salesforce-trekken-cms-migration-tool',
  'sfdx-how-to-setup-a-scratch-org',
  'spotify-playlist-backup-using-github-actions',
  'up-your-vs-code-game-with-workspaces',
]

console.log(
  'process.env.NEXT_PUBLIC_ROOT_URL ',
  process.env.NEXT_PUBLIC_ROOT_URL
)

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  async redirects() {
    return [
      // ...postRedirects,
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ]
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
