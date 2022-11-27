import dynamic from 'next/dynamic'
import Head from 'next/head'
import { InferGetStaticPropsType, GetStaticProps } from 'next/types'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkPrism from 'remark-prism'
import remarkGfm from 'remark-gfm'

import { getTocFromAst, Post } from '../../lib'
import { Header, Layout, Pill, TableOfContents } from '../../components'

const components = {
  CodeBlock: dynamic(() => import('../../components/code-block/dynamic')),
  Head,
  Header: Header,
}

export default function PostPage({
  source,
  frontMatter,
  toc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('toc ', toc)
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
              frontMatter.tags.map((item: string) => (
                <li key={item}>
                  <Pill name={item}>{item}</Pill>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className='post-page grid gap-4 max-width mx-auto px-4 mb-8'>
        <main className='content col-span-12 lg:col-span-9'>
          <div className='prose prose-headings:font-mono max-w-none xl:prose-lg prose-invert prose-code:font-normal'>
            <MDXRemote {...source} components={components} />
          </div>
          <div>
            <h4>Commentz</h4>
          </div>
        </main>
        <aside className='col-span-12 lg:col-span-3'>
          <div
            className='border-2 border-solid p-4'
            style={{
              borderColor: 'var(--theme-border-default)',
              backgroundColor: 'var(--theme-bg-subtle)',
            }}
          >
            {toc && <TableOfContents items={toc}></TableOfContents>}
          </div>
        </aside>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.slug) {
    const postData = await Post.getBySlug(params.slug as string)
    const { content, data } = postData

    let toc = {}
    const source = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkPrism,
          () => (ast) => {
            toc = getTocFromAst(ast, {})
          },
        ],
        rehypePlugins: [],
        format: 'mdx',
      },
      parseFrontmatter: false,
      scope: data as any,
    })

    return {
      props: {
        source,
        toc,
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
