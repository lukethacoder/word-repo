import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { load as yamlLoad, JSON_SCHEMA } from 'js-yaml'
import readingTime from 'reading-time'
import { MdxMetadata, Post, PostMetadata } from '../types/global'

// Finding directory named "posts" from the current working directory of Node.
const POSTS_PATH = path.join(process.cwd(), 'posts')

const MATTER_CONFIG: any = {
  engines: {
    yaml: {
      // needed to disable the whack conversion of date data
      parse: (s) => yamlLoad(s, { schema: JSON_SCHEMA }),
    },
  },
}

/**
 * TODO:
 * - validate pages have
 *   - unique banner colors
 */
export const validatePages = () => {}

const toDate = (date: string | Date | null): Date | null =>
  date ? (typeof date === 'string' ? new Date(date) : date) : null

const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-AU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

const formatDateData = (date: Date): string =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

export const formatMatter = (slug: string, content: string): Post => {
  const matterData = matter(content, MATTER_CONFIG)

  // remove orig from the payload
  const { orig, ...filteredMatter } = matterData
  const { date, editedDate } = filteredMatter.data as MdxMetadata

  const _date: Date = toDate(date) || new Date()
  const _editedDate = editedDate && toDate(editedDate)

  return {
    ...filteredMatter,
    slug,
    data: {
      ...(filteredMatter.data as MdxMetadata),
      slug,
      readingTime: readingTime(filteredMatter.content),
      date: formatDateData(_date),
      dateFormatted: _date ? formatDate(_date) : '',
      editedDate: (_editedDate && formatDateData(_editedDate)) || '',
      editedDateFormatted: _editedDate ? formatDate(_editedDate) : '',
    },
  }
}

const getPostPaths = (): string[] => {
  // TODO: get recursive nested posts here, pls
  const paths = fs.readdirSync(POSTS_PATH)

  return []
}

const getAllPosts = (): Post[] => {
  return (
    // Read all the files in the post directory
    fs
      .readdirSync(POSTS_PATH)
      // double check we're only reading .mdx files
      .filter((path) => /\.mdx?$/.test(path))
      .map((filename) => {
        const slug = filename.replace('.mdx', '')
        const fullPath = path.join(POSTS_PATH, filename)

        // get MDX file contents
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        return formatMatter(slug, fileContents)
      })
  )
}

/**
 *
 * @returns list of posts sorted by date
 */
export const getSortedPosts = () => {
  const now = formatDateData(new Date())

  // filter out future published articles
  const allPostsData: Post[] = getAllPosts().filter(
    (post) => post.data.date <= now
  )

  // sort by date
  return allPostsData.sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
}

/**
 * Fetch all post slugs
 */
export const getAllPostSlugs = () => {
  const fileNames = fs.readdirSync(POSTS_PATH)

  return fileNames.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }))
}

export const getAllTagSlugs = () => {
  // Reads all the files in the post directory
  const fileNames = fs
    .readdirSync(POSTS_PATH)
    // double check we're only reading .mdx files
    .filter((path) => /\.mdx?$/.test(path))

  return Array.from(
    fileNames.reduce((tags, filename) => {
      const slug = filename.replace('.mdx', '')
      const fullPath = path.join(POSTS_PATH, filename)

      // get MDX file contents
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterData = formatMatter(slug, fileContents)

      const { date, tags: postTags } = matterData.data

      // only display content that is 'posted' based on the frontmatter data
      if (date <= formatDateData(new Date())) {
        postTags.forEach((tag) => tags.add(tag))
      }

      return tags
    }, new Set())
  ).map((tag) => ({
    params: {
      slug: tag,
    },
  }))
}

export const getAllTagsWithMetadata = () => {
  // Reads all the files in the post directory
  const fileNames = fs
    .readdirSync(POSTS_PATH)
    // double check we're only reading .mdx files
    .filter((path) => /\.mdx?$/.test(path))

  return fileNames.reduce((tags, filename) => {
    const slug = filename.replace('.mdx', '')
    const fullPath = path.join(POSTS_PATH, filename)

    // get MDX file contents
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterData = formatMatter(slug, fileContents)

    const { date, tags: postTags } = matterData.data

    // only display content that is 'posted' based on the frontmatter data
    if (date <= formatDateData(new Date())) {
      postTags.forEach((tag) => {
        if (Object.keys(tags).includes(tag)) {
          tags[tag] += 1
        } else {
          tags[tag] = 1
        }
      })
    }

    return tags
  }, {})
}

/**
 * Fetch all posts given a tag
 * @param {String} - post slug
 */
export const getPostsByTag = async (tag: string) => {
  console.log(`tag `, tag)

  const allPostsByTagData: Post[] = getAllPosts().filter(
    (post) =>
      post.data.date <= formatDateData(new Date()) &&
      post.data.tags.includes(tag)
  )

  // sort by date
  return allPostsByTagData.sort((a, b) => (a.data.date < b.data.date ? 1 : -1))
}

/**
 * Fetch an individual post by slug
 * @param {String} - post slug
 */
export const getPostDataBySlug = async (slug: string): Promise<Post> => {
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`)
  const postContent = fs.readFileSync(fullPath, 'utf8')
  return formatMatter(slug, postContent)
}
