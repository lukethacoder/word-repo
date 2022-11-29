import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

function event(path: string, title?: string) {
  if (window.goatcounter) {
    window.goatcounter.count({
      path,
      title,
      event: true,
    })
  }
}

export const GoatCounterScript: React.FC<{
  siteUrl: string
  scriptSrc?: string
}> = ({ siteUrl, scriptSrc }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      event(url.slice(1) as string)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Script
      strategy='afterInteractive'
      data-goatcounter={siteUrl}
      src={scriptSrc ?? '//gc.zgo.at/count.js'}
    />
  )
}
