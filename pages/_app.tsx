import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Roboto } from '@next/font/google'

import '../styles/globals.css'
import { Goat, GoogleAnalytics } from '../lib'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics.Script gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
      {process.env.NEXT_PUBLIC_GOAT_COUNTER && (
        <Goat.Script
          siteUrl={`https://${process.env.NEXT_PUBLIC_GOAT_COUNTER}.goatcounter.com/count`}
        />
      )}

      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='manifest' href='/manifest.json' />

        <link
          rel='apple-touch-icon'
          sizes='120x120'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#292929' />
        <meta name='msapplication-TileColor' content='#000000' />
        <meta name='theme-color' content='#000000' />
      </Head>

      <Component
        className={`${roboto.className}`}
        {...pageProps}
      />
    </>
  )
}
