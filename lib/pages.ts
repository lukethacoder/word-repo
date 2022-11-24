import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

// Finding directory named "posts" from the current working directory of Node.
const POSTS_PATH = path.join(process.cwd(), 'posts')

/**
 * TODO:
 * - validate pages have
 *   - unique banner colors
 */
export const validatePages = () => {}

const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-AU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

const dateTimeFormat = new Intl.DateTimeFormat()

const formatDateData = (date: Date): string => dateTimeFormat.format(date)

export const formatMatter = (slug: string, matterData) => {
  // remove orig from the payload
  const { orig, ...filteredMatter } = matterData
  const { date, edited_date } = filteredMatter.data

  return {
    ...filteredMatter,
    slug,
    data: {
      ...filteredMatter.data,
      slug,
      date: formatDateData(date),
      edited_date: formatDateData(date),
      readingTime: readingTime(filteredMatter.content),
      editedDateFormatted: edited_date
        ? formatDate(edited_date)
        : null,
      dateFormatted: formatDate(date),
    },
  }
}

/**
 *
 * @returns list of posts sorted by date
 */
export const getSortedPosts = () => {
  // Reads all the files in the post directory
  const fileNames = fs
    .readdirSync(POSTS_PATH)
    // double check we're only reading .mdx files
    .filter((path) => /\.mdx?$/.test(path))

  const allPostsData = fileNames.reduce((posts, filename) => {
    const slug = filename.replace('.mdx', '')
    const fullPath = path.join(POSTS_PATH, filename)

    // get MDX file contents
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterData = formatMatter(slug, matter(fileContents))

    const { date } = matterData.data
    const jsDate =
      typeof date === 'string'
        ? new Date(matterData.data.date)
        : matterData.data.date

    // only display content that is 'posted' based on the frontmatter data
    if (jsDate < new Date()) {
      // we don't need to return the page data here
      posts.push(matterData.data)
    }

    return posts
  }, [])

  // sort by date
  return allPostsData.sort((a, b) => {
    const dateA = typeof a.date === 'string' ? new Date(a.date) : a.date
    const dateB = typeof b.date === 'string' ? new Date(b.date) : b.date

    if (dateA < dateB) {
      return 1
    } else {
      return -1
    }
  })
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
      const matterData = formatMatter(slug, matter(fileContents))
      console.log(`matterData `, matterData)

      const jsDate = new Date(matterData.data.date)

      // only display content that is 'posted' based on the frontmatter data
      if (jsDate < new Date()) {
        console.log(`data.tags `, matterData.data.tags)
        matterData.data.tags.forEach((tag) => tags.add(tag))
      }
      console.log(`tags `, tags)

      return tags
    }, new Set())
  ).map((tag) => ({
    params: {
      slug: tag,
    },
  }))
}

/**
 * Fetch all posts given a tag
 * @param {String} - post slug
 */
export const getPostsByTag = async (tag: string) => {
  // const fullPath = path.join(POSTS_PATH, `${slug}.mdx`)
  // const postContent = fs.readFileSync(fullPath, 'utf8')
  // return formatMatter(slug, matter(postContent))
  console.log(`tag `, tag)

  // Reads all the files in the post directory
  const fileNames = fs
    .readdirSync(POSTS_PATH)
    // double check we're only reading .mdx files
    .filter((path) => /\.mdx?$/.test(path))

  const allPostsByTagData = fileNames.reduce((posts, filename) => {
    const slug = filename.replace('.mdx', '')
    const fullPath = path.join(POSTS_PATH, filename)

    // get MDX file contents
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterData = formatMatter(slug, matter(fileContents))

    const jsDate = new Date(matterData.data.date)

    // only display content that is 'posted' based on the frontmatter data
    if (jsDate < new Date() && matterData.data.tags.includes(tag)) {
      posts.push(matterData.data)
    }

    return posts
  }, [])

  // sort by date
  return allPostsByTagData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * Fetch an individual post by slug
 * @param {String} - post slug
 */
export const getPostDataBySlug = async (slug: string) => {
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`)
  const postContent = fs.readFileSync(fullPath, 'utf8')
  return formatMatter(slug, matter(postContent))
}
