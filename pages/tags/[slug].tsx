import { getAllTagSlugs, getPostsByTag } from '../../lib'
import { Layout, PostCard } from '../../components'
import { Post } from '../../types/global'

export default function PostPage(payload) {
  const { slug, posts }: { slug: string; posts: Post[] } = payload

  return (
    <Layout>
      <div className='page-header'>
        <div className='w-full flex flex-col justify-end max-width mx-auto px-4 pb-12'>
          <h1 className='text-3xl'>{slug}</h1>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-4 max-width mx-auto px-4 mb-8'>
        <div className='col-span-9'>
          <article className='flex flex-col gap-6'>
            {posts.map(({ data: item }, key: number) => (
              <PostCard
                key={item.slug}
                backgroundColor={key === 0 && item.color}
                borderColor={key !== 0 && item.color}
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
          </article>
        </div>
        <aside className='col-span-3'>
          <div
            className='border-2 border-solid p-4'
            style={{
              borderColor: 'var(--theme-border-default)',
              backgroundColor: 'var(--theme-bg-subtle)',
            }}
          >
            stuffs
          </div>
        </aside>
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPostsByTag(params.slug)

  return {
    props: {
      slug: params.slug,
      posts,
    },
  }
}

export const getStaticPaths = async () => {
  return {
    paths: await getAllTagSlugs(),
    fallback: false,
  }
}
