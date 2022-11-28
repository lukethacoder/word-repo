// import { CODE_COLORS } from '../../utils'

/**
 * A small subset of https://github.com/ozh/github-colors/blob/master/colors.json
 */
export const CODE_COLORS: { [key: string]: string[] } = {
  apex: ['#1797c0', '#000000'],
  env: ['#fbc02d', '#000000'],
  css: ['#563d7c', '#000000'],
  html: ['#e34c26', '#000000'],
  javascript: ['#f1e05a', '#000000'],
  json: ['#292929', '#ffffff'],
  rust: ['#dea584', '#000000'],
  shell: ['#89e051', '#000000'],
  typescript: ['#3178c6', '#000000'],
  yaml: ['#cb171e', '#ffffff'],
}

interface ICodeBlock {
  className: string
  children: React.ReactNode
}

export const CodeBlock = ({ className, children }: ICodeBlock) => {
  let language: string = className.replace('language-', '')

  let colors = Object.keys(CODE_COLORS).includes(language)
    ? CODE_COLORS[language]
    : ['#000000', '#ffffff']

  return (
    <div className='relative'>
      {language !== 'unknown' && (
        <span
          className='code-language font-sans absolute text-xs px-2 right-0 top-0 z-10 pointer-events-none rounded-tr rounded-bl'
          style={{ backgroundColor: colors[0], color: colors[1] }}
        >
          {language}
        </span>
      )}
      <pre className='code-block relative z-0 leading-tight'>{children}</pre>
    </div>
  )
}
