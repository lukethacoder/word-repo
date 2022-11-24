import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Finding directory named "posts" from the current working directory of Node.
const POSTS_PATH = path.join(process.cwd(), 'posts')

/**
 * TODO:
 * - validate pages have
 *   - unique banner colors
 */
export const validatePages = () => {}

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
    const { data } = matter(fileContents)

    const jsDate = new Date(data.date)
    const formattedDate = jsDate.toLocaleDateString('en-IN', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    // only display content that is 'posted' based on the frontmatter data
    if (jsDate < new Date()) {
      const frontmatter = {
        ...data,
        date: formattedDate,
      }

      posts.push({
        slug,
        ...frontmatter,
      })
    }

    return posts
  }, [])

  // sort by date
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
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

/**
 * Fetch an individual post by slug
 * @param {String} - post slug
 */
export const getPostDataBySlug = async (slug: string) => {
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`)
  const postContent = fs.readFileSync(fullPath, 'utf8')

  return matter(postContent)
}
