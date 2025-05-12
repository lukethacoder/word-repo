import { NextResponse } from 'next/server'

export default function handler() {
  return NextResponse.redirect(
    new URL(`/rss.xml`, 'https://lukesecomb.digital'),
    308
  )
}
