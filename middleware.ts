import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/article/:slug', '/tags'],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // articles can redirect to the correct article
  if (pathname.includes('/article')) {
    const slug = request.nextUrl.pathname.replace('/article/', '')

    const responseUrl = new URL(`/blog/${slug}`, 'https://lukesecomb.digital')
    responseUrl.searchParams.set('redirect', 'word_repo')

    // redirect to new domain
    return NextResponse.redirect(responseUrl, 308)
  }

  const responseUrl = new URL(`/blog/`, 'https://lukesecomb.digital')
  responseUrl.searchParams.set('redirect', 'word_repo')

  // all other requests redirect to the main blog page (tags)
  return NextResponse.redirect(responseUrl, 308)
}
