import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'

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
  console.log('payload ', payload)
  const { source, frontMatter } = payload

  return (
    <Layout bannerBackgroundColor={frontMatter.color}>
      <div className='post-header'>
        <div className='max-width mx-auto px-4'>
          <h1>{frontMatter.title}</h1>
          <span>
            <time dateTime={frontMatter.date}>{frontMatter.dateFormatted}</time>
            {` -> `}
            <span>{frontMatter.readingTime.text}</span>
          </span>
          <ul className='post-header-tags'>
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
      <div className='post-page max-width mx-auto px-4'>
        <main className='content'>
          <MDXRemote {...source} components={components} />
        </main>
        <aside>TOC</aside>
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const postData = await getPostDataBySlug(params.slug)
  console.log('postData ', postData)
  const { content, data } = postData
  console.log('data ', data)

  const source = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkPrism],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source,
      frontMatter: data,
    },
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
