import style from './skip-link.module.css'

export const SkipTo = ({ skipToId = 'main' }) => {
  return (
    <a className={style.skip_to} href={`#${skipToId}`}>
      Skip to main content
    </a>
  )
}
