interface ICodeBlock {
  code: string
  lang: string
}

export const CodeBlock = ({ code, lang }: ICodeBlock) => {
  return (
    <pre className='code-block'>
      <code className={`language-${lang || 'js'}`}>{code}</code>
    </pre>
  )
}
