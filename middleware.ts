import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/article/:slug', '/tags'],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // articles can redirect to the correct article
  if (pathname.includes('/article')) {
    const slug = request.nextUrl.pathname.replace('/article/', '')

    // redirect to new domain
    return NextResponse.redirect(
      new URL(`/blog/${slug}`, 'https://lukesecomb.digital'),
      308
    )
  }

  // all other requests redirect to the main blog page (tags)
  return NextResponse.redirect(
    new URL(`/blog/`, 'https://lukesecomb.digital'),
    308
  )
}
