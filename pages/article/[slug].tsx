import dynamic from 'next/dynamic'
import { InferGetStaticPropsType, GetStaticProps } from 'next/types'
import Giscus from '@giscus/react'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkPrism from 'remark-prism'
import remarkGfm from 'remark-gfm'
import { remarkMdxToc } from 'remark-mdx-toc'
import remarkSlug from 'remark-slug'
import remarkBlockQuotesExtended from 'remark-blockquotes-extended'
import rehypeExternalLinks from 'rehype-external-links'

import { getTocFromAst, remarkCheckboxLists, Post } from '../../lib-ssr'
import { Header, Layout, Pill, TableOfContents } from '../../components'

const components = {
  CodeBlock: dynamic(() => import('../../components/code-block/dynamic')),
  // input: dynamic(() => import('../../components/input/dynamic')),
  pre: dynamic(() => import('../../components/code-block/dynamic')),
  Header: Header,
}

export default function ArticlePage({
  source,
  frontMatter,
  toc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // if only one heading, don't bother showing the TOC
  const showToc = toc.length > 1

  const ogImage = `/api/article-og?title=${encodeURIComponent(
    frontMatter.title
  )}&color=${encodeURIComponent(
    frontMatter.color
  )}&reading-time=${encodeURIComponent(
    frontMatter.readingTime.text
  )}&date=${encodeURIComponent(frontMatter.dateFormatted)}`

  return (
    <Layout
      title={`${frontMatter.title as string} | word_repo`}
      bannerBackgroundColor={frontMatter.color}
      ogImage={ogImage}
    >
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
      <div
        className='post-page grid gap-4 max-width mx-auto px-4 mb-8'
        style={
          { '--theme-post-feature': frontMatter.color } as React.CSSProperties
        }
      >
        <main
          className={`post-main flex flex-col gap-4 col-span-12 ${
            showToc ? `lg:col-span-8` : 'lg:col-span-9'
          }`}
        >
          <div className='content'>
            <div className='prose prose-invert prose-headings:font-mono max-w-none prose-code:font-normal'>
              <MDXRemote {...source} components={components} />
            </div>
          </div>
          {process.env.NEXT_PUBLIC_GITHUB_REPO && (
            <div className='comments prose prose-invert prose-headings:font-mono max-w-none'>
              <Giscus
                id='comments'
                repo={
                  process.env.NEXT_PUBLIC_GITHUB_REPO as `${string}/${string}`
                }
                repoId={process.env.NEXT_PUBLIC_GITHUB_REPO_ID as string}
                category={process.env.NEXT_PUBLIC_GITHUB_CATEGORY as string}
                categoryId={
                  process.env.NEXT_PUBLIC_GITHUB_CATEGORY_ID as string
                }
                mapping='specific'
                strict='0'
                reactions-enabled='1'
                emit-metadata='0'
                input-position='bottom'
                theme='dark'
                lang='en'
                loading='lazy'
                reactionsEnabled='1'
              />
            </div>
          )}
        </main>
        <aside className={`col-span-12 ${showToc ? 'lg:col-span-4' : ''}`}>
          {toc.length > 1 && (
            <div
              className='sticky top-[16px] border-2 border-solid p-4'
              style={{
                borderColor: 'var(--theme-border-default)',
                backgroundColor: 'var(--theme-bg-subtle)',
              }}
            >
              <TableOfContents items={toc}></TableOfContents>
            </div>
          )}
        </aside>
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

    let toc = {}
    const source = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [
          remarkSlug,
          remarkGfm,
          remarkPrism,
          remarkMdxToc,
          remarkBlockQuotesExtended,
          remarkCheckboxLists,
          () => (ast) => {
            // get the TOC data from the remarkMdxToc
            toc = getTocFromAst(ast)
          },
        ],
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
