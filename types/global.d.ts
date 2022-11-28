import { ReadTimeResults } from 'reading-time'

export interface IMdxMetadata {
  title: string
  excerpt: string
  color: string
  date: string
  editedDate?: string
  draft?: boolean
  tags: string[]
}

export interface IPostMetadata {
  slug: string
  title: string
  excerpt: string
  color: string
  date: string
  dateFormatted: string
  editedDate?: string
  editedDateFormatted: string
  draft?: boolean
  readingTime: ReadTimeResults
  tags: string[]
}

export interface IPost {
  slug: string
  content: string
  data: IPostMetadata
}
