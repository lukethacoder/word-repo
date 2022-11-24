import Link from 'next/link'
import style from './pill.module.css'

export const Pill = ({ children, name }) => {
  return (
    <Link className={style.pill} href={`/tags/${name}`}>
      {children}
    </Link>
  )
}
