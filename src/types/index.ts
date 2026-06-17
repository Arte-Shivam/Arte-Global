export type UserRole = 'candidate' | 'recruiter' | 'admin'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
  phone?: string
  address?: string
  gender?: string
  date_of_birth?: string
  company_name?: string
  company_about?: string
  company_location?: string
  avatar_url?: string
  created_at: string
}

export interface Job {
  id: string
  title: string
  slug: string
  description: string
  requirements?: string
  industry: string
  country: string
  location?: string
  salary_range?: string
  job_type: 'full-time' | 'part-time' | 'contract' | 'temporary'
  status: 'active' | 'draft' | 'closed'
  is_featured: boolean
  is_urgent: boolean
  created_at: string
  updated_at: string
}

export interface JobApplication {
  id: string
  job_id: string
  candidate_id: string
  resume_url?: string
  cover_letter?: string
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired'
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar_url?: string
  type: 'candidate' | 'recruiter'
  is_active: boolean
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image?: string
  author: string
  published_at: string
  is_published: boolean
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  audience: 'candidate' | 'recruiter' | 'both'
  sort_order: number
}

export interface MediaItem {
  id: string
  title: string
  url: string
  type: 'video' | 'reel' | 'image'
  thumbnail_url?: string
  is_active: boolean
}

export interface ContactSubmission {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  type: 'general' | 'candidate' | 'recruiter'
}

export type Audience = 'candidate' | 'recruiter'

export interface NavItem {
  label: string
  path: string
}
