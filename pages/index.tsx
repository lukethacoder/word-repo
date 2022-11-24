import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Header, Layout, PostCard } from '../components'

import { getSortedPosts } from '../lib'

export default function Home({ posts }) {
  console.log('posts ', posts)

  return (
    <Layout bannerBackgroundColor='var(--theme-bg-dark)'>
      <Head>
        <title>word_repo | luke secomb</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='home-header'>
        <div className='max-width mx-auto px-4'>
          <h1 style={{ margin: 0 }}>welcome to my word repo.</h1>
          <span>(yes, its just a blog)</span>
        </div>
      </div>

      <div className='max-width mx-auto px-4'>
        <div>
          <article
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {posts.map((item, key) => (
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
        <aside>
          <div>
            <h3>find what you're looking for</h3>
          </div>
          <div>
            <h3>other places to find me</h3>
            <ul>
              <li>github</li>
              <li>linkedin</li>
              <li>instagram</li>
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  )
}
export function getStaticProps() {
  const posts = getSortedPosts()
  console.log('posts ', posts)

  return { props: { posts } }
}
