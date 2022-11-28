import { TocEntry } from '../../lib'
import style from './table-of-contents.module.css'

interface ITableOfContents {
  items: TocEntry[]
}

const TocItem = ({ data }: { data: TocEntry }) => {
  return data.id ? (
    <li className='mb-1'>
      <a
        href={`#${data.id}`}
        className='hover:underline hover:italic focus-visible:underline'
      >
        {data.value}
      </a>
      {data.children && (
        <ul>
          {data.children.map((child: TocEntry) => (
            <TocItem key={data.id} data={child} />
          ))}
        </ul>
      )}
    </li>
  ) : null
}

export const TableOfContents = ({ items = [] }: ITableOfContents) => {
  return (
    <>
      <ul className={style.toc}>
        {items &&
          items.map((item: TocEntry, key: number) => (
            <TocItem key={`${key}__${item.value}`} data={item} />
          ))}
      </ul>
    </>
  )
}
