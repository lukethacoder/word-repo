import { Layout } from '../components'

const BASE_URL = '/article'

const ARTICLES = [
  {
    title: 'Local LWC Development with @AuraEnabled Apex',
    slug: 'local-lwc-development-with-aura-enabled-apex',
    date: '2025-01-26',
  },
  {
    title: 'Lightning Web Components: Nested Components',
    slug: 'lwc-nested-components',
    date: '2023-03-20',
  },
  {
    title: 'Lightning Web Components: Custom Mixins',
    slug: 'lwc-custom-mixins',
    date: '2023-03-18',
  },
  {
    title: 'Salesforce Trekken: CMS Migration Tool',
    slug: 'salesforce-trekken-cms-migration-tool',
    date: '2023-01-13',
  },
  {
    title: 'SFDX How to setup a Scratch Org',
    slug: 'sfdx-how-to-setup-a-scratch-org',
    date: '2019-12-09',
  },
  {
    title: 'Spotify Playlist backup using Github Actions',
    slug: 'spotify-playlist-backup-using-github-actions',
    date: '2022-01-13',
  },
  {
    title: 'Up your Vs Code game with Workspaces',
    slug: 'up-your-vs-code-game-with-workspaces',
    date: '2019-06-07',
  }
]

export default function Home() {
  return (
    <Layout
      title='word_repo | luke secomb'
      urlPath=''
      description='Home to a collection of blog posts covering anything technical and/or development related; JavaScript to Rust, React to Salesforce, and anything in between.'
      bannerBackgroundColor='var(--theme-bg-dark)'
    >
      <div className='page-header max-width mx-auto px-4 pt-20'>
        <div className='h-full flex flex-col justify-end pb-12'>
          <h1 className='text-3xl'>welcome to my word repo.</h1>
          <span>
            This site has been merged with my main site. All past content can be
            found{' '}
            <a href='https://lukesecomb.digital/blog' className='underline'>
              here
            </a>
          </span>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-4 max-width mx-auto px-4 mb-8'>
        <section className='col-span-12'>
          <h2 className='sr-only'>Articles</h2>
          <div className='grid gap-2'>
            {ARTICLES.map((item, key) => (
              <span key={key} className='flex items-center gap-1'>
                <a
                  href={`${BASE_URL}/${item.slug}`}
                  className='py-1 underline hover:text-primary'
                >
                  {item.title}
                </a>
                <small className='opacity-60 no-underline'>({item.date})</small>
              </span>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}