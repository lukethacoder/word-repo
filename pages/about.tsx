import Image from 'next/image'
import { Layout } from '../components'

import DSC0593 from '../public/_DSC0593.jpg'

const ELSEWHERE_SITES = [
  {
    href: 'https://lukesecomb.digital',
    text: 'portfolio site',
  },
  {
    href: 'https://github.com/lukethacoder',
    text: 'github',
  },
  {
    href: 'https://www.linkedin.com/in/luke-secomb/',
    text: 'linkedIn',
  },
  {
    href: 'https://www.instagram.com/lukesecomb',
    text: 'instagram',
  },
]

export default function About() {
  return (
    <Layout
      title='about | word_repo'
      urlPath='about'
      description='Hi, I am Luke, Full Stack Developer currently working at Deloitte Digital as a Technical Specialist.'
      bannerBackgroundColor='var(--theme-bg-dark)'
    >
      <div className='page-header max-width mx-auto px-4'>
        <div className='h-full flex flex-col justify-end pb-12 mt-16'>
          <Image
            src={DSC0593}
            alt='photo of the wizard who runs this blog site'
            width={240}
            height={240}
          />
          <h1 className='text-3xl mt-8'>about.</h1>
          <div className='prose lg:prose-lg prose-invert prose-code:font-normal font-sans font-normal'>
            <p>
              Hi, I am Luke, Full Stack Developer currently working at{' '}
              <a
                rel='nofollow noopener noreferrer'
                href='https://www.deloittedigital.com.au/'
                style={{ color: '#777777' }}
              >
                Deloitte Digital<span style={{ color: '#86bc25' }}>.</span>
              </a>{' '}
              as a Technical Specialist. Day to day I work in and around
              Salesforce on both the <code>{`{front|back}`}end</code> (
              <a rel='nofollow noopener noreferrer' href='https://lwc.dev/'>
                LWC
              </a>
              /
              <a
                rel='nofollow noopener noreferrer'
                href='https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_intro_what_is_apex.htm'
              >
                APEX
              </a>
              ). In my free time I enjoy perfecting my craft with{' '}
              <a rel='nofollow noopener noreferrer' href='https://reactjs.org/'>
                React
              </a>
              ,{' '}
              <a rel='nofollow noopener noreferrer' href='https://nextjs.org/'>
                NextJS
              </a>
              ,{' '}
              <a
                rel='nofollow noopener noreferrer'
                href='https://www.typescriptlang.org/'
              >
                TypeScript
              </a>{' '}
              and{' '}
              <a
                rel='nofollow noopener noreferrer'
                href='https://www.rust-lang.org/'
              >
                Rust
              </a>
              .
            </p>
            <p>
              You may be wondering, what the heck is a <code>word_repo</code>.
              It{`'`}s just a <span className='line-through'>fancy</span> nerdy
              thing to call a dev blog. This site is home to an array of
              projects, tutorials, snippets or other randomness. Salesforce or
              React, JavaScript to any of my other hobbies <code>🥁|📷|🎧</code>
              , anything goes.
            </p>
            <p>I can also be found elsewhere around the internet:</p>
            <ul>
              {ELSEWHERE_SITES.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}
