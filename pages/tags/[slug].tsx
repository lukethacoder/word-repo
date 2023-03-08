import { GetStaticProps } from 'next/types'

import { Tag, Post } from '../../lib-ssr'
import { Layout, PostCard } from '../../components'
import { IPost } from '../../types/global'

export default function TagPage({
  slug,
  posts,
}: {
  slug: string
  posts: IPost[]
}) {
  return (
    <Layout title={`tag: ${slug} | word_repo`} urlPath={`tags/${slug}`}>
      <div className='page-header'>
        <div className='w-full flex flex-col justify-end max-width mx-auto px-4 pb-12'>
          <h1 className='text-3xl'>{slug}</h1>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-4 max-width mx-auto px-4 mb-8'>
        <section className='col-span-12'>
          <h2 className='sr-only'>Articles</h2>
          <div className='grid lg:grid-cols-2 gap-6'>
            {posts.map(({ data: item }, key: number) => (
              <PostCard
                key={item.slug}
                backgroundColor={key === 0 ? item.color : ''}
                borderColor={key !== 0 ? item.color : ''}
                slug={item.slug}
                title={item.title}
                excerpt={item.excerpt}
                tags={item.tags}
                date={{
                  raw: item.editedDate || item.date,
                  dateFormatted: item.editedDateFormatted || item.dateFormatted,
                }}
                readingTime={item.readingTime}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await Post.getByTag(params?.slug as string)

  return {
    props: {
      slug: params?.slug,
      posts,
    },
  }
}

export const getStaticPaths = async () => {
  return {
    paths: await Tag.getAllSlugs(),
    fallback: false,
  }
}
