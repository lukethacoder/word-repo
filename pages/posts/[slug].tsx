import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkPrism from 'remark-prism'

import { getAllPostSlugs, getPostDataBySlug } from '../../lib'
import { Header } from '../../components'

const components = {
  CodeBlock: dynamic(() => import('../../components/code-block/dynamic')),
  Head,
  Header: Header,
}

export default function PostPage(payload) {
  console.log('payload ', payload)
  const { source, frontMatter } = payload

  return (
    <div>
      <header>
        <nav>
          <a href='/'>👈 Go back home</a>
        </nav>
      </header>
      <div className='post-header'>
        <div
          style={{
            width: '24px',
            height: '24px',
            backgroundColor: frontMatter.color,
          }}
        ></div>
        {/* <h1>{frontMatter.title}</h1>
        {frontMatter.description && (
          <p className="description">{frontMatter.description}</p>
        )} */}
      </div>
      <main>
        <MDXRemote {...source} components={components} />
      </main>
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const postData = await getPostDataBySlug(params.slug)
  const { content, data } = postData
  console.log('data ', data)

  const source = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkPrism],
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
