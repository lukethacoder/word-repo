import { Footer } from '../footer'
import { Header } from '../header'
import { SkipTo } from '../skip-link'

interface ILayout {
  children: React.ReactNode
  backgroundColor?: string
  bannerBackgroundColor?: string
}

export const Layout = ({
  children,
  backgroundColor = 'var(--theme-bg-default)',
  bannerBackgroundColor = 'var(--theme-bg-dark)',
}: ILayout) => {
  return (
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
  )
}
