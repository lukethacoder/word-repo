import { Html, Head, Main, NextScript } from 'next/document'
import { GoogleAnalytics } from '../lib'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>

      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics.DocumentScript />}
    </Html>
  )
}
