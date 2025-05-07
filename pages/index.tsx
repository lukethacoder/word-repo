import { InferGetStaticPropsType } from 'next/types'
import { Layout, PostCard } from '../components'

import { Post } from '../lib-ssr'
import { IPost } from '../types/global'

const BASE_URL = 'https://lukesecomb.digital/blog'

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
            {posts.map(({ data: item }, key) => (
              <span key={key} className='flex'>
                <a
                  href={`${BASE_URL}/${item.slug}`}
                  className='py-1 underline hover:text-primary'
                >
                  {item.title}
                </a>
              </span>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}
export const getStaticProps = async () => {
  const posts: IPost[] = await Post.getAll()
  return { props: { posts } }
}
