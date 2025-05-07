import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='max-width w-full mx-auto px-4 pt-8'>
      <div className='border-t-2 py-10 flex flex-wrap gap-8'>
        <Link
          href='https://lukesecomb.digital'
          className='underline hover:italic'
        >
          main site
        </Link>
        <a href='https://lukesecomb.digital/rss/' className='underline hover:italic'>
          rss
        </a>
      </div>
    </footer>
  )
}
