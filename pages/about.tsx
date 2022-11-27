import Head from 'next/head'
import Image from 'next/image'
import { Layout } from '../components'

import DSC0593 from '../static/_DSC0593.jpg'

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
    <Layout bannerBackgroundColor='var(--theme-bg-dark)'>
      <Head>
        <title>word_repo | luke secomb</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

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
              Hi, I am Luke, a Full Stack Developer currently working at{' '}
              <a href='' style={{ color: '#777777' }}>
                Deloitte Digital<span style={{ color: '#86bc25' }}>.</span>
              </a>{' '}
              as a Technical Specialist. Day to day I work in and around
              Salesforce on both the <code>{`{front|back}`}end</code> (
              <a href='https://lwc.dev/'>LWC</a>/
              <a href='https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_intro_what_is_apex.htm'>
                APEX
              </a>
              ). In my free time I enjoy perfecting my craft with{' '}
              <a href='https://reactjs.org/'>React</a>,{' '}
              <a href='https://nextjs.org/'>NextJS</a>,{' '}
              <a href='https://www.typescriptlang.org/'>TypeScript</a> and{' '}
              <a href='https://www.rust-lang.org/'>Rust</a>.
            </p>
            <p>
              You may be wondering, what the heck is a <code>word_repo</code>.
              It{`'`}s just a <span className='line-through'>fancy</span> nerdy
              thing to call a dev blog. This site is home to repository of
              guides, tutorials and small projects. These can be related to
              anything from Salesforce to any other technical related topics, or
              even my other hobbies <code>🥁|📷|🎧</code>.
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

      <div className='grid grid-cols-12 gap-4 max-width mx-auto px-4 mb-8'>
        <div className='col-span-12'>
          {/* <article className='flex flex-col gap-6'> */}
          <article className='grid lg:grid-cols-2 gap-6'></article>
        </div>
      </div>
    </Layout>
  )
}
