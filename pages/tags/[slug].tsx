import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkPrism from 'remark-prism'
import remarkGfm from 'remark-gfm'

import {
  getAllPostSlugs,
  getAllTagSlugs,
  getPostDataBySlug,
  getPostsByTag,
} from '../../lib'
import { Header, Layout, Pill } from '../../components'

const components = {
  CodeBlock: dynamic(() => import('../../components/code-block/dynamic')),
  Head,
  Header: Header,
}

export default function PostPage(payload) {
  console.log('payload ', payload)
  const { slug, posts } = payload

  return (
    <Layout
      backgroundColor={`var(--theme-bg-default)`}
      bannerBackgroundColor={'salmon'}
    >
      <div className='post-header'>
        <div className='max-width mx-auto'>
          <h1>{slug}</h1>
          {/* {frontMatter.description && (
            <p className='description'>{frontMatter.description}</p>
          )} */}
        </div>
      </div>
      <div className='post-page max-width mx-auto'>
        {posts.map((item) => (
          <Link href={`/posts/${item.slug}`}>{item.title}</Link>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPostsByTag(params.slug)
  console.log('posts ', posts)

  return {
    props: {
      slug: params.slug,
      posts,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = await getAllTagSlugs()
  console.log('paths ', paths)

  return {
    paths,
    fallback: false,
  }
}
