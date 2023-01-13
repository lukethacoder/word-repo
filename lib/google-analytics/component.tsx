import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { Partytown } from '@builder.io/partytown/react'

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages

export const pageView = (url: string) => {
  window.gtag(url)
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label: string
  value: string
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

export const GoogleAnalyticsDocumentScript: React.FC<{
  trackingId: string
}> = ({ trackingId }) => {
  return (
    <>
      <Partytown debug={true} forward={['gtag']} />
      <script
        type='text/partytown'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag(){window.dataLayer.push(arguments); 
              console.log('gtag event');}
            gtag('js', new Date());

            gtag('config', '${trackingId}', { 
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

export const GoogleAnalyticsScript: React.FC<{
  gaId: string
}> = ({ gaId }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageView(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        strategy='worker'
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id='gtm-init'
        strategy='worker'
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });

          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());`,
        }}
      />
    </>
  )
}
