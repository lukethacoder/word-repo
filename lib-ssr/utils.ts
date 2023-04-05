import os from 'os'
import path from 'path'
import matter from 'gray-matter'
import { load as yamlLoad, JSON_SCHEMA } from 'js-yaml'
import readingTime from 'reading-time'
import dayjs from 'dayjs'

import { IMdxMetadata, IPost } from '../types/global'
import { getFiles } from '../utils'

// Finding directory named "posts" from the current working directory of Node.
const ROOT_PATH = process.cwd()
const POSTS_PATH = path.join(ROOT_PATH, 'posts')

const MATTER_CONFIG: any = {
  engines: {
    yaml: {
      // needed to disable the whack date formatting of YYYY-DD-MM
      parse: (content: string) => yamlLoad(content, { schema: JSON_SCHEMA }),
    },
  },
}

/**
 * TODO:
 * - validate pages have
 *   - unique banner colors
 */
export const validatePages = () => {}

export const toDate = (date: string | Date | null): Date | null =>
  date ? (typeof date === 'string' ? new Date(date) : date) : null

export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-AU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

export const formatDateData = (date: Date): string =>
  dayjs(date).format('YYYY-MM-DD')

export const sortPostByDate = (a: IPost, b: IPost) => {
  const aDate = a.data.editedDate || a.data.date
  const bDate = b.data.editedDate || b.data.date

  return aDate < bDate ? 1 : -1
}

export const formatMatter = (slug: string, content: string): IPost => {
  const matterData = matter(content, MATTER_CONFIG)

  // remove orig from the payload
  const { orig, ...filteredMatter } = matterData
  const { date, editedDate } = filteredMatter.data as IMdxMetadata

  const _date: Date = toDate(date) || new Date()
  const _editedDate = editedDate && toDate(editedDate)

  return {
    ...filteredMatter,
    slug,
    data: {
      ...(filteredMatter.data as IMdxMetadata),
      slug,
      draft: filteredMatter.data.draft || false,
      readingTime: readingTime(filteredMatter.content),
      date: formatDateData(_date),
      dateFormatted: _date ? formatDate(_date) : '',
      editedDate: (_editedDate && formatDateData(_editedDate)) || '',
      editedDateFormatted: _editedDate ? formatDate(_editedDate) : '',
    },
  }
}

export const getPostPaths = async (): Promise<string[]> => {
  const paths: string[] = []
  for await (const f of getFiles(POSTS_PATH)) {
    paths.push(f)
  }

  // double check we're only reading .mdx files
  // TODO: filter out future dated posts
  return paths.filter((path) => /\.mdx?$/.test(path))
}

export const getSlugFromPath = (filePath: string): string => {
  if (os.type() === 'Windows_NT') {
    return /[^\\]*$/.exec(filePath)?.[0]?.replace('.mdx', '') || ''
  }

  return /[^\/]*$/.exec(filePath)?.[0]?.replace('.mdx', '') || ''
}

export const getPathFromSlug = (slug: string): string =>
  path.join(POSTS_PATH, `${slug}.mdx`)
