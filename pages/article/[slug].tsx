import { InferGetStaticPropsType, GetStaticProps } from 'next/types'
import Error from 'next/error'

import { serialize } from 'next-mdx-remote/serialize'
import remarkSlug from 'remark-slug'
import rehypeExternalLinks from 'rehype-external-links'

import { Post } from '../../lib-ssr'
import { Layout } from '../../components'

export default function ArticlePage({
  error,
  frontMatter,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (error) {
    return <Error statusCode={error} />
  }

  const BASE_URL: string = process.env.NEXT_PUBLIC_ROOT_URL as string
  const ogImage = `${BASE_URL}/api/article-og?title=${encodeURIComponent(
    frontMatter.title
  )}&color=${encodeURIComponent(
    frontMatter.color
  )}&reading-time=${encodeURIComponent(frontMatter.readingTime.text)}&date=${
    frontMatter.editedDateFormatted
      ? encodeURIComponent(frontMatter.editedDateFormatted)
      : encodeURIComponent(frontMatter.dateFormatted)
  }`

  return (
    <Layout
      title={`${frontMatter.title as string} | word_repo`}
      description={frontMatter.description as string}
      bannerBackgroundColor={frontMatter.color}
      ogImage={ogImage}
      ogType='article'
      urlPath={`article/${frontMatter.slug}`}
    >
      <div className='page-header'>
        <div className='w-full flex flex-col justify-end max-width mx-auto px-4 pb-12'>
          <h1 className='text-4xl text-balance'>{frontMatter.title}</h1>

          <p>
            This post has moved to{' '}
            <a
              href={`https://lukesecomb.digital/blog/${frontMatter.slug}`}
              className='underline'
            >
              here
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.slug) {
    const postData = await Post.getBySlug(params.slug as string)
    if (!postData) {
      return { props: { error: '401' } }
    }

    const { content, data } = postData

    const source = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkSlug],
        rehypePlugins: [
          [
            rehypeExternalLinks,
            {
              rel: ['nofollow', 'noopener', 'noreferrer'],
              target: '_blank',
            },
          ],
        ],
        format: 'mdx',
      },
      parseFrontmatter: false,
      scope: data as any,
    })

    return {
      props: {
        source,
        frontMatter: data,
      },
    }
  } else {
    return { props: { error: '401' } }
  }
}

export const getStaticPaths = async () => {
  return {
    paths: await Post.getAllSlugs(),
    fallback: false,
  }
}
