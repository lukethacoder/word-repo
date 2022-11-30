import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Fira_Code, Roboto } from '@next/font/google'

import '../styles/globals.css'
import '../styles/prism.css'
import { Clarity, Goat, GoogleAnalytics } from '../lib'

const firaCode = Fira_Code({
  weight: '500',
  subsets: ['latin'],
})
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
      {process.env.NEXT_PUBLIC_CLARITY_CODE && (
        <Clarity.Script clarityKey={process.env.NEXT_PUBLIC_CLARITY_CODE} />
      )}

      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <Component
        className={`${firaCode.className} ${roboto.className}`}
        {...pageProps}
      />
    </>
  )
}
