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
  console.log('readingTime ', readingTime)

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
      {excerpt && <p className='text-md font-normal font-sans'>{excerpt}</p>}
      <footer className={style.footer}>
        <ul className='z-10 flex flex-wrap gap-2'>
          {tags &&
            tags.map((item) => (
              <li key={item}>
                <Pill name={item}>{item}</Pill>
              </li>
            ))}
        </ul>
        <div className={style.metadata}>
          <time dateTime={date.raw}>{date.dateFormatted}</time>
          {` -> `}
          <p>{readingTime && readingTime.text}</p>
        </div>
      </footer>
    </article>
  )
}
