import Giscus from '@giscus/react'

export const Comments = () => {
  return (
    <Giscus
      id='comments'
      repo={process.env.NEXT_PUBLIC_GITHUB_REPO as `${string}/${string}`}
      repoId={process.env.NEXT_PUBLIC_GITHUB_REPO_ID as string}
      category={process.env.NEXT_PUBLIC_GITHUB_CATEGORY as string}
      categoryId={process.env.NEXT_PUBLIC_GITHUB_CATEGORY_ID as string}
      mapping='title'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='top'
      theme='transparent_dark'
      lang='en'
      loading='lazy'
    />
  )
}
