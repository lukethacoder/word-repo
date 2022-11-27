import { Root } from 'mdast'
import { visit } from 'unist-util-visit'

export type TocEntry = {
  depth: number
  // value of the heading
  value: string
  id?: string
  attributes: { [key: string]: string }
  children: TocEntry[]
}

const handleObjectExpression = (objectExpression: any) => {
  const metadata = objectExpression.properties.reduce(
    (acc: any, { key, value }: any) => {
      // if children, loop and recursively handle them
      if (key.value === 'children') {
        acc[key.value] = value?.elements
          ? value.elements.map((item: any) => handleObjectExpression(item))
          : []
        return acc
      }

      // 'attributes'
      if (!value.value && value.properties) {
        // loop to find the 'id' property, it is the only one we care about
        value.properties.forEach((property: any) => {
          if (property.key.value === 'id') {
            acc['id'] = property.value.value || null
          }
        })
        return acc
      }

      acc[key.value] = value.value || null
      return acc
    },
    { attributes: null }
  )
  return metadata
}

export const getTocFromAst = (ast: any): TocEntry[] => {
  let toc: TocEntry[] = []

  visit(ast as Root, ['mdxjsEsm'], (node: any) => {
    if (
      (node?.data?.estree as any)?.body?.[0]?.declaration?.declarations?.[0]
        ?.init?.elements?.[0]
    ) {
      // assume remarkMdxToc has come in and done its magic
      toc = (
        node?.data?.estree as any
      )?.body?.[0]?.declaration?.declarations?.[0]?.init?.elements.map(
        (item: any) => handleObjectExpression(item)
      )
    }
  })

  return toc
}
