import { NextApiRequest, NextApiResponse } from 'next'

import feed from './feed.json'
import { IPost } from '../../../types/global'

const metadata = {
  title: 'word_repo - luke secomb',
  description:
    'Home to a collection of posts covering anything technical and/or development related; JavaScript to Rust, React to Salesforce, and anything in between.',
  link: 'https://blog.lukesecomb.digital',
}

/**
 * Respond with an rss.xml
 *
 * @param {object} req NextApiRequest
 * @param {object} res NextApiResponse
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_ROOT_URL
    const BASE_IMAGE_URL = `${BASE_URL}/api/article-og`
    const BASE_TAG_URL = `${BASE_URL}/tags`

    // TODO: might need to rip out MDX/JSX based components here and replace them with a standard block
    // e.g. blockquote elements

    const postItems = feed
      .map((page: IPost): string => {
        const {
          title,
          excerpt,
          color,
          date,
          readingTime,
          dateFormatted,
          tags,
        } = page.data

        const url = `${BASE_URL}/article/${page.slug}`

        const ogImage = `${BASE_IMAGE_URL}?title=${encodeURIComponent(
          title
        )}&color=${encodeURIComponent(color)}&reading-time=${encodeURIComponent(
          readingTime.text
        )}&date=${encodeURIComponent(dateFormatted)}`

        return `<item>
          <title>${title}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <language>en</language>
          <pubDate>${date}</pubDate>
          <image>
            <title>Auto generated open graph image for post</title>
            <url>${ogImage}</url>
            <link>${ogImage}</link>
          </image>
          ${excerpt && `<description>${excerpt}</description>`}
          ${
            tags
              ? tags.map(
                  (tag: string) =>
                    `<category domain="${BASE_TAG_URL}/${encodeURIComponent(
                      tag
                    )}">${tag}</category>`
                )
              : ''
          }
          <content:encoded><![CDATA[${page.content}]]></content:encoded>
        </item>`
      })
      .join('')

    // Add urlSet to entire sitemap string
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
      <title>${metadata.title}</title>
      <description>${metadata.description}</description>
      <link>${metadata.link}</link>
      <lastBuildDate>${feed[0].data.date}</lastBuildDate>
      ${postItems}
      </channel>
      </rss>`

    // set response content header to xml
    res.setHeader('Content-Type', 'text/xml')

    return res.status(200).send(sitemap)
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      throw error
    }

    return res.status(500).json({ error: error.message || '' })
  }
}
