import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='max-width w-full mx-auto px-4 pt-8'>
      <div className='border-t-2 py-10 flex flex-wrap gap-8'>
        <Link href='/' className='underline hover:italic'>
          home
        </Link>
        <Link href='/about' className='underline hover:italic'>
          about
        </Link>
        <Link href='/tags' className='underline hover:italic'>
          tags
        </Link>
        <Link
          href='https://lukesecomb.digital'
          className='underline hover:italic'
        >
          main site
        </Link>
        <Link href='/rss.xml' className='underline hover:italic'>
          rss
        </Link>
      </div>
    </footer>
  )
}
