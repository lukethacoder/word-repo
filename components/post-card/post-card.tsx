import Link from 'next/link'
import { ReadTimeResults } from 'reading-time'
import { Pill } from '../pill'

import style from './post-card.module.css'

interface IPostCard {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  date: {
    raw: string
    dateFormatted: string
  }
  readingTime: ReadTimeResults
  borderColor: string
  backgroundColor: string
}

export const PostCard = ({
  slug,
  title,
  excerpt,
  tags,
  date,
  readingTime,
  borderColor,
  backgroundColor,
}: IPostCard) => {
  return (
    <article
      className={`p-4 relative flex flex-col ${style.article}`}
      style={
        {
          ...(borderColor ? { '--card-border-color': borderColor } : {}),
          ...(backgroundColor ? { '--card-bg': backgroundColor } : {}),
        } as React.CSSProperties
      }
    >
      <Link className={style.link} href={`/article/${slug}`}></Link>
      <h4 className='font-mono text-xl underline mb-1'>{title}</h4>
      {excerpt && (
        <p className={`${style.excerpt} text-md font-normal font-sans`}>
          <span className='hover-snakeline'>{excerpt}</span>
        </p>
      )}
      <footer
        className={`flex flex-col md:flex-row md:items-end justify-end md:justify-between mt-6`}
        style={{ flex: '1 0' }}
      >
        <ul className='flex flex-wrap gap-2 mr-1 mb-2 md:mb-0'>
          {tags &&
            tags.map((item) => (
              <li key={item} className='flex'>
                <Pill name={item} className='z-10'>
                  {item}
                </Pill>
              </li>
            ))}
        </ul>
        <div
          className={`font-mono md:mb-1 whitespace-nowrap ${style.metadata}`}
        >
          <time dateTime={date.raw}>{date.dateFormatted}</time>
          {` -> `}
          <p>{readingTime && readingTime.text}</p>
        </div>
      </footer>
    </article>
  )
}
