import Link from 'next/link'
import { Pill } from '../pill'

import style from './post-card.module.css'

export const PostCard = ({
  slug,
  title,
  excerpt,
  tags,
  date,
  readingTime,
  borderColor,
  backgroundColor,
}) => {
  return (
    <article
      className={`p-4 relative flex flex-col ${style.article}`}
      style={{
        '--card-border-color': borderColor,
        '--card-bg': backgroundColor,
      }}
    >
      <Link className={style.link} href={`/posts/${slug}`}></Link>
      <h4 className='text-xl underline mb-1'>{title}</h4>
      {excerpt && (
        <p className='text-md font-normal font-sans'>
          <span className='hover-snakeline'>{excerpt}</span>
        </p>
      )}
      <footer
        className={`flex flex-col md:flex-row md:items-end justify-end md:justify-between mt-6`}
        style={{ flex: '1 0' }}
      >
        <ul className='mb-2 flex flex-wrap gap-2'>
          {tags &&
            tags.map((item) => (
              <li key={item} className='flex'>
                <Pill name={item} className='z-10'>
                  {item}
                </Pill>
              </li>
            ))}
        </ul>
        <div className={`whitespace-nowrap ${style.metadata}`}>
          <time dateTime={date.raw}>{date.dateFormatted}</time>
          {` -> `}
          <p>{readingTime && readingTime.text}</p>
        </div>
      </footer>
    </article>
  )
}
