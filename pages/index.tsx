import { InferGetStaticPropsType } from 'next/types'
import { Layout, PostCard } from '../components'

import { Post } from '../lib-ssr'
import { IPost } from '../types/global'

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
      <div className='page-header max-width mx-auto px-4'>
        <div className='h-full flex flex-col justify-end pb-12'>
          <h1 className='text-3xl'>welcome to my word repo.</h1>
          <span>(yes, its just a blog)</span>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-4 max-width mx-auto px-4 mb-8'>
        <section className='col-span-12'>
          <h2 className='sr-only'>Articles</h2>
          <div className='grid lg:grid-cols-2 gap-6'>
            {posts.map(({ data: item }, key) => (
              <PostCard
                key={item.slug}
                backgroundColor={key === 0 ? item.color : ''}
                borderColor={key !== 0 ? item.color : ''}
                slug={item.slug}
                title={item.title}
                excerpt={item.excerpt}
                tags={item.tags}
                date={{
                  raw: item.date,
                  dateFormatted: item.dateFormatted,
                }}
                readingTime={item.readingTime}
              />
            ))}
          </div>
        </section>
        {/* <aside className='col-span-3'>
          <div
            className='border-2 border-solid p-4'
            style={{
              borderColor: 'var(--theme-border-default)',
              backgroundColor: 'var(--theme-bg-subtle)',
            }}
          >
            <h3>put a search here once we have more articles to search over?</h3>
          </div>

        </aside> */}
      </div>
    </Layout>
  )
}
export const getStaticProps = async () => {
  const posts: IPost[] = await Post.getAll()
  return { props: { posts } }
}
