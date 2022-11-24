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
      className={style.article}
      style={{
        '--card-border-color': borderColor,
        '--card-bg': backgroundColor,
      }}
    >
      <Link className={style.link} href={`/posts/${slug}`}></Link>
      <h4 className={style.title}>{title}</h4>
      {excerpt && <p>{excerpt}</p>}
      <footer className={style.footer}>
        <ul className={style.tags}>
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
          <p>{readingTime.text}</p>
        </div>
      </footer>
    </article>
  )
}
