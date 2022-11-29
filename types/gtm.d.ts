declare global {
  interface Window {
    gtag(event: string, action: string, payload: object)
    gtag(url: string)
  }
}

export {}
