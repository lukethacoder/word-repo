import Head from 'next/head'
import { ReactNode } from 'react'

import { Footer } from '../footer'
import { Header } from '../header'
import { SkipTo } from '../skip-link'

interface ILayout {
  children: React.ReactNode
  urlPath: string
  title?: string
  description?: string
  ogImage?: string
  ogType?: string
  metaColor?: string
  extraHeadTags?: ReactNode
  backgroundColor?: string
  bannerBackgroundColor?: string
}

const FALLBACK_OG_IMAGE = `${process.env.NEXT_PUBLIC_ROOT_URL}/thumbnail.png`

export const Layout = ({
  children,
  urlPath,
  title = 'word_repo | luke secomb',
  description,
  ogImage = FALLBACK_OG_IMAGE,
  ogType,
  metaColor,
  extraHeadTags,
  backgroundColor = 'var(--theme-bg-default)',
  bannerBackgroundColor = 'var(--theme-bg-dark)',
}: ILayout) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:title' content={title} />
        <meta name='og:site_name' content='word_repo | luke secomb' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:site' content='@lu_ke____' />
        <meta name='twitter:creator' content='@lu_ke____' />
        <meta name='og:locale' content='en_US' />
        <meta
          name='og:url'
          content={`${process.env.NEXT_PUBLIC_ROOT_URL}/${urlPath}`}
        />
        <meta
          property='twitter:url'
          content={`${process.env.NEXT_PUBLIC_ROOT_URL}/${urlPath}`}
        />

        <meta
          name='canonical'
          content={`${process.env.NEXT_PUBLIC_ROOT_URL}/${urlPath}`}
        />
        <meta name='theme-color' content={metaColor ? metaColor : '#000000'} />
        <meta name='og:type' content={ogType ? ogType : 'website'} />
        {description && (
          <>
            <meta name='description' content={description} />
            <meta name='og:description' content={description} />
            <meta name='twitter:description' content={description} />
          </>
        )}

        <meta property='twitter:domain' content='blog.lukesecomb.digital' />
        <meta property='og:image' content={ogImage} />
        <meta name='twitter:image' content={ogImage} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:widgets:new-embed-design' content='on' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='620' />
        <meta
          property='og:image:alt'
          content='Auto generated OG image featuring the page title and posted date'
        />
        {extraHeadTags && extraHeadTags}
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
