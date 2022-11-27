import { InferGetStaticPropsType } from 'next/types'

import { Tag } from '../../lib'
import { Layout, Pill } from '../../components'

export default function TagsPage({
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className='page-header'>
        <div className='w-full flex flex-col justify-end max-width mx-auto px-4 pb-12'>
          <h1 className='text-3xl'>Tags</h1>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-4 max-width mx-auto px-4 mb-8'>
        <div className='col-span-9'>
          <article className='flex flex-wrap gap-4'>
            {tags.map(([item, value]) => (
              <Pill key={item} name={item}>
                {item}
                <small className='ml-1'>({value})</small>
              </Pill>
            ))}
          </article>
        </div>
        <aside className='col-span-3'>
          <div
            className='border-2 border-solid p-4'
            style={{
              borderColor: 'var(--theme-border-default)',
              backgroundColor: 'var(--theme-bg-subtle)',
            }}
          >
            stuffs
          </div>
        </aside>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  return {
    props: {
      tags: Object.entries(await Tag.getAllWithMetadata()),
    },
  }
}
