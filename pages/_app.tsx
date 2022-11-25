import type { AppProps } from 'next/app'
import { Fira_Code, Roboto } from '@next/font/google'

import '../styles/globals.css'
import '../styles/prism.css'

const firaCode = Fira_Code({
  weight: '500',
  subsets: ['latin'],
})
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return <Component className={`${firaCode.className} ${roboto.className}`} {...pageProps} />
}
