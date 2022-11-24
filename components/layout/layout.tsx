import { Header } from '../header'

export const Layout = ({
  children,
  backgroundColor = 'var(--theme-bg-subtle)',
  bannerBackgroundColor = 'var(--theme-bg-default)',
}) => {
  return (
    <div style={{ backgroundColor }}>
      <a href='#main'>Skip to main content</a>

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
