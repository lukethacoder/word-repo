import {
  GoogleAnalyticsScript,
  GoogleAnalyticsDocumentScript,
  event,
} from './component'

export const GoogleAnalytics = {
  GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  Script: GoogleAnalyticsScript,
  DocumentScript: GoogleAnalyticsDocumentScript,
  event,
}
