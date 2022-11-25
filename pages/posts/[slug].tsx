import dynamic from 'next/dynamic'
import Head from 'next/head'
import { GetStaticProps } from 'next'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkPrism from 'remark-prism'
import remarkGfm from 'remark-gfm'

import { getAllPostSlugs, getPostDataBySlug } from '../../lib'
import { Header, Layout, Pill } from '../../components'

const components = {
  CodeBlock: dynamic(() => import('../../components/code-block/dynamic')),
  Head,
  Header: Header,
}

export default function PostPage(payload) {
  const { source, frontMatter, toc } = payload
  // console.log('payload ', payload)

  return (
    <Layout bannerBackgroundColor={frontMatter.color}>
      <div className='page-header'>
        <div className='w-full flex flex-col justify-end max-width mx-auto px-4 pb-12'>
          <h1 className='text-4xl'>{frontMatter.title}</h1>
          <span>
            <time dateTime={frontMatter.date}>{frontMatter.dateFormatted}</time>
            {` -> `}
            <span>{frontMatter.readingTime.text}</span>
          </span>
          <ul className='mt-4 flex flex-wrap gap-2'>
            {frontMatter.tags &&
              frontMatter.tags.map((item) => (
                <li>
                  <Pill name={item}>{item}</Pill>
                </li>
              ))}
          </ul>
          {/* {frontMatter.description && (
            <p className='description'>{frontMatter.description}</p>
          )} */}
        </div>
      </div>
      <div className='post-page grid gap-4 max-width mx-auto px-4 mb-8'>
        <main className='content col-span-9'>
          <div className='prose max-w-none xl:prose-lg prose-invert prose-code:font-normal'>
            <MDXRemote {...source} components={components} />
          </div>
        </main>
        <aside className='col-span-3'>
          <div
            className='border-2 border-solid p-4'
            style={{
              borderColor: 'var(--theme-border-default)',
              backgroundColor: 'var(--theme-bg-subtle)',
            }}
          >
            TOC
          </div>
        </aside>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.slug) {
    const postData = await getPostDataBySlug(params.slug as string)
    const { content, data } = postData

    const source = await serialize(content, {
      // Optionally pass remark/rehype plugins
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkPrism],
        rehypePlugins: [],
        format: 'mdx',
      },
      parseFrontmatter: false,
      scope: data, //  as Record<string, unknown>,
    })

    return {
      props: {
        source,
        toc: [],
        frontMatter: data,
      },
    }
  } else {
    return { props: { error: '401' } }
  }
}

export const getStaticPaths = async () => {
  const paths = await getAllPostSlugs()
  console.log('paths ', paths)

  return {
    paths,
    fallback: false,
  }
}
