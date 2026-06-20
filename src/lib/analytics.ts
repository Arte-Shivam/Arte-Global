declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
 
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'
 
export function trackPageview(path: string) {
  if (typeof window === 'undefined' || !window.gtag) return
 
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  })
}
