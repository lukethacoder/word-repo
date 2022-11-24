import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components'

import { getSortedPosts } from '../lib'

export default function Home({ posts }) {
  console.log('posts ', posts)

  return (
    <div>
      <a href='#main'>Skip to main content</a>

      <Head>
        <title>word_repo | luke secomb</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main id='main'>
        <div>
          <article
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {posts.map((item) => (
              <article key={item.slug} style={{ border: '2px solid #fff;' }}>
                <a href={`/posts/${item.slug}`}>link</a>
                <h4>{item.title}</h4>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    backgroundColor: item.color,
                  }}
                ></div>
                <time dateTime={item.date}>{item.date}</time>
              </article>
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
      </main>

      <footer>footer yo</footer>
    </div>
  )
}
export function getStaticProps() {
  const posts = getSortedPosts()
  console.log('posts ', posts)

  return { props: { posts } }
}
