export const CodeBlock = ({ code, lang, ...props }) => {
  return (
    <pre className='code-block'>
      <code className={`language-${lang || 'js'}`}>{code}</code>
    </pre>
  )
}
