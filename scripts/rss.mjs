import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import readingTime from 'reading-time'
import { load as yamlLoad, JSON_SCHEMA } from 'js-yaml'

const MATTER_CONFIG = {
  engines: {
    yaml: {
      // needed to disable the whack date formatting of YYYY-DD-MM
      parse: (content) => yamlLoad(content, { schema: JSON_SCHEMA }),
    },
  },
}
const toDate = (date) =>
  date ? (typeof date === 'string' ? new Date(date) : date) : null

const formatDateData = (date) => dayjs(date).format('YYYY-MM-DD')

const formatDate = (date) =>
  date.toLocaleDateString('en-AU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

const generateRss = async () => {
  const POSTS_DIR = path.join(process.cwd(), 'posts')
  const now = new Date()

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((path) => /\.mdx?$/.test(path))
    .map((filePath) => {
      const slug = filePath.replace('.mdx', '')
      const source = fs.readFileSync(path.join(POSTS_DIR, filePath))
      const { content, data } = matter(source, MATTER_CONFIG)

      const _date = toDate(data.date) || new Date()
      const _editedDate = data.editedDate && toDate(data.editedDate)

      return {
        content,
        slug,
        data: {
          ...data,
          slug,
          date: _date,
          readingTime: readingTime(content),
          dateFormatted: _date ? formatDate(_date) : '',
          editedDate: (_editedDate && formatDateData(_editedDate)) || '',
          editedDateFormatted: _editedDate ? formatDate(_editedDate) : '',
        },
      }
    })
    .filter((post) => post.data.draft !== true && post.data.date < now)
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
  // .map(item => {

  //   const content = item.data.content

  //   return {
  //     ...item,
  //     data: {
  //       ...data,
  //       content
  //     }
  //   }
  // })

  const SITEMAP_DIR = path.join(process.cwd(), 'pages')
  console.log(`Saving ${posts.length} posts`)
  // Create sitemap file
  fs.writeFileSync(`${SITEMAP_DIR}\\api\\rss\\feed.json`, JSON.stringify(posts))
}

generateRss()
