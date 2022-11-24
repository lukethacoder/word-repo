import type { AppProps } from 'next/app'
import { Fira_Code } from '@next/font/google'

import '../styles/globals.css'
import '../styles/prism.css'

const firaCode = Fira_Code({
  weight: '600',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={firaCode.className}>
      <Component {...pageProps} />
    </main>
  )
}
