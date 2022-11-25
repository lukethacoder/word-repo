import { Header } from '../header'
import { SkipTo } from '../skip-link'

export const Layout = ({
  children,
  backgroundColor = 'var(--theme-bg-default)',
  bannerBackgroundColor = 'var(--theme-bg-dark)',
}) => {
  return (
    <div className='main' style={{ backgroundColor }}>
      <SkipTo />

      <span
        className='page-banner-bg'
        style={{ backgroundColor: bannerBackgroundColor }}
      ></span>

      <Header />

      <main id='main'>{children}</main>

      <footer></footer>
    </div>
  )
}
