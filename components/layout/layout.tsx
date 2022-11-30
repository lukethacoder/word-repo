import Head from 'next/head'
import { Footer } from '../footer'
import { Header } from '../header'
import { SkipTo } from '../skip-link'

interface ILayout {
  children: React.ReactNode
  title?: string
  description?: string
  ogImage?: string
  backgroundColor?: string
  bannerBackgroundColor?: string
}

export const Layout = ({
  children,
  title = 'word_repo | luke secomb',
  description,
  ogImage,
  backgroundColor = 'var(--theme-bg-default)',
  bannerBackgroundColor = 'var(--theme-bg-dark)',
}: ILayout) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name='description' content={description} />}
        {ogImage && <meta property='og:image' content={ogImage} />}
      </Head>
      <div className='main' style={{ backgroundColor }}>
        <SkipTo />

        <span
          className='page-banner-bg'
          style={{ backgroundColor: bannerBackgroundColor }}
        ></span>

        <Header />

        <main id='main'>{children}</main>

        <Footer />
      </div>
    </>
  )
}
