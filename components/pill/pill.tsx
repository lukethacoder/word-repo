import Link from 'next/link'
import style from './pill.module.css'

export const Pill = ({ children, name, ...props }) => {
  return (
    <Link
      className={`${props.className ? props.className : ''} py-1 px-2 text-xs ${
        style.pill
      }`}
      href={`/tags/${name}`}
    >
      {children}
    </Link>
  )
}
