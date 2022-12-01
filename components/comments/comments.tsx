import Script from 'next/script'

export const Comments = () => {
  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://giscus.app/client.js`}
        data-repo={process.env.NEXT_PUBLIC_GITHUB_REPO as `${string}/${string}`}
        data-repo-id={process.env.NEXT_PUBLIC_GITHUB_REPO_ID as string}
        data-category={process.env.NEXT_PUBLIC_GITHUB_CATEGORY as string}
        data-category-id={process.env.NEXT_PUBLIC_GITHUB_CATEGORY_ID as string}
        data-mapping='title'
        data-strict='0'
        data-reactions-enabled='1'
        data-emit-metadata='0'
        data-input-position='bottom'
        data-theme='transparent_dark'
        data-lang='en'
        data-loading='lazy'
        crossOrigin='anonymous'
        async
      />
      <div className='giscus'></div>
    </>
  )
}
