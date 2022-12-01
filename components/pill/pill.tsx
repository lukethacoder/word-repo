import Link from 'next/link'
import style from './pill.module.css'

interface IPill {
  children: React.ReactNode
  name: string
  className?: string
}

export const Pill = ({ children, name, className }: IPill) => {
  return (
    <Link
      className={`${className ? className : ''} font-mono py-1 px-2 text-xs ${
        style.pill
      }`}
      href={`/tags/${name}`}
    >
      {children}
    </Link>
  )
}
