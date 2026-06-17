export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const AUDIENCE_KEY = 'arte_audience'

export function getStoredAudience(): 'candidate' | 'recruiter' | null {
  const stored = localStorage.getItem(AUDIENCE_KEY)
  if (stored === 'candidate' || stored === 'recruiter') return stored
  return null
}

export function setStoredAudience(audience: 'candidate' | 'recruiter'): void {
  localStorage.setItem(AUDIENCE_KEY, audience)
}
