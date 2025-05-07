import fs from 'fs'

import { IPost } from '../types/global'
import {
  formatDateData,
  formatMatter,
  getPathFromSlug,
  getPostPaths,
  getSlugFromPath,
  sortPostByDate,
} from './utils'

/**
 * Fetch all post items and sort by date
 */
const getAll = async (): Promise<IPost[]> => {
  const now: string = formatDateData(new Date())

  return (
    (await getPostPaths())
      .map(
        // Read all the files in the post directory
        (fullPath) =>
          formatMatter(
            getSlugFromPath(fullPath),
            fs.readFileSync(fullPath, 'utf8')
          )
      )
      // filter out draft and future posts
      .filter((item) => !item.data.draft && item.data.date <= now)
      .sort(sortPostByDate)
  )
}

/**
 * Fetch an array of all possible post slugs
 */
const getAllSlugs = async (): Promise<{ params: { slug: string } }[]> =>
  (await getPostPaths()).map((filename) => ({
    params: {
      slug: getSlugFromPath(filename),
    },
  }))

/**
 * Fetch an individual post by slug
 * @param {String} - post slug
 */
const getBySlug = async (slug: string): Promise<IPost | null> => {
  const postPath = getPathFromSlug(slug)
  if (!fs.existsSync(postPath)) {
    return null
  }

  return formatMatter(slug, fs.readFileSync(getPathFromSlug(slug), 'utf8'))
}

/**
 * Fetch all posts given a tag
 * @param {String} - post slug
 */
const getByTag = async (tag: string): Promise<IPost[]> =>
  (await getAll())
    .filter((post) =>
      post.data.date <= formatDateData(new Date()) && post.data.tags
        ? post.data.tags.includes(tag)
        : false
    )
    .sort(sortPostByDate)

export const Post = {
  getAll,
  getAllSlugs,
  getBySlug,
  getByTag,
}
