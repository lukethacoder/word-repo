import fs from 'fs'
import {
  formatDateData,
  formatMatter,
  getPostPaths,
  getSlugFromPath,
} from './utils'

const getAllSlugs = async (): Promise<{ params: { slug: string } }[]> => {
  const fileNames = await getPostPaths()

  return Array.from(
    fileNames.reduce((tags, fullPath) => {
      const slug = getSlugFromPath(fullPath)

      // get MDX file contents
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterData = formatMatter(slug, fileContents)

      const { date, tags: postTags } = matterData.data

      // only display content that is 'posted' based on the frontmatter data
      if (date <= formatDateData(new Date())) {
        postTags.forEach((tag: string) => tags.add(tag))
      }

      return tags
    }, new Set())
  ).map((tag) => ({
    params: {
      slug: tag as string,
    },
  }))
}

const getAllWithMetadata = async (): Promise<{
  [key: string]: number
}> => {
  const fileNames = await getPostPaths()

  return fileNames.reduce((tags, fullPath) => {
    const slug = getSlugFromPath(fullPath)

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
  }, {} as { [key: string]: number })
}

export const Tag = {
  getAllSlugs,
  getAllWithMetadata,
}
