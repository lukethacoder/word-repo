import { ReadTimeResults } from 'reading-time'

export interface MdxMetadata {
  title: string
  excerpt: string
  color: string
  date: string
  editedDate?: string
  tags: string[]
}

export interface PostMetadata {
  slug: string
  title: string
  excerpt: string
  color: string
  date: string
  dateFormatted: string
  editedDate?: string
  editedDateFormatted: string
  readingTime: ReadTimeResults
  tags: string[]
}

export interface Post {
  slug: string
  content: string
  data: PostMetadata
}
