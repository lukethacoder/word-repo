declare global {
  interface Window {
    goatcounter: {
      count: (payload: { path: string; title?: string; event: boolean }) => void
    }
  }
}

export {}
