import { Root, ListItem } from 'mdast'
import { visit } from 'unist-util-visit'
import { v4 as uuidV4 } from 'uuid'

const generateInput = (child: any) => {
  const inputId = uuidV4()

  return {
    type: 'mdxJsxFlowElement',
    name: 'label',
    attributes: [
      {
        type: 'mdxJsxAttribute',
        name: 'htmlFor',
        value: inputId,
      },
    ],
    children: [
      {
        type: 'mdxJsxFlowElement',
        name: 'input',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'id',
            value: inputId,
          },
          {
            type: 'mdxJsxAttribute',
            name: 'type',
            value: 'checkbox',
          },
        ],
        children: [],
        data: {
          _mdxExplicitJsx: true,
        },
      },
      {
        type: 'mdxJsxFlowElement',
        name: 'span',
        attributes: [
          { type: 'mdxJsxAttribute', name: 'class', value: 'checkbox' },
        ],
        children: [],
        data: { _mdxExplicitJsx: true },
      },
      ...child.children,
    ],
  }
}

/**
 * Plugin to parse lists of checkboxes into editable checkboxes with proper `<label/>`s
 *
 * @type {import('unified').Plugin<[Options?]|void[], Root>}
 */
export const remarkCheckboxLists = () => (tree: Root) => {
  visit(tree, ['listItem'], (node: any) => {
    if ((node as ListItem).checked !== null) {
      // reset the standard checkbox functionality
      ;(node as ListItem).checked = null
      node.children = node.children.map((child: any) => generateInput(child))
    }
  })
}
