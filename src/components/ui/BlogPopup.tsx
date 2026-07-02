import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from '../common/Modal'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import type { BlogPost } from '../../types'

const POPUP_SESSION_KEY = 'arte_blog_popup_shown'

interface BlogPopupProps {
  // The base path for the "Read More" link — differs between candidate and recruiter side
  blogBasePath: string
  // Delay in milliseconds before popup appears
  delay?: number
}

export function BlogPopup({ blogBasePath, delay = 2000 }: BlogPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    // Only show once per browser session
    if (sessionStorage.getItem(POPUP_SESSION_KEY)) return

    async function loadFeaturedPost() {
      if (!isSupabaseConfigured || !supabase) return

      // Fetch site settings to check if popup is enabled and which blog is featured
      const { data: settings, error: settingsError } = await supabase
        .from('site_settings')
        .select('popup_enabled, featured_blog_id')
        .eq('id', 1)
        .single()

      if (settingsError || !settings) return
      if (!settings.popup_enabled || !settings.featured_blog_id) return

      // Fetch the actual blog post
      const { data: blogPost, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', settings.featured_blog_id)
        .eq('status', 'active')
        .single()

      if (postError || !blogPost) return

      setPost(blogPost as BlogPost)

      // Show popup after the configured delay
      const timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem(POPUP_SESSION_KEY, 'true')
      }, delay)

      return () => clearTimeout(timer)
    }

    loadFeaturedPost()
  }, [delay])

  if (!post) return null

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
      <div className="pb-2 pt-3">
        {/* Label */}
        <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-2">
          Featured Article
        </p>

        {/* Cover image */}
        <div className="rounded-xl overflow-hidden mb-4 aspect-square bg-secondary-light">
          <img
            src={post.cover_image || '/blog-placeholder.jpg'}
            alt="Cover Image"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content */}
        <h4 className="leading-snug">{post.title}</h4>
        <p className="text-sm text-accent/70 mt-2 line-clamp-3">{post.excerpt}</p>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-5">
          <Link
            to={`${blogBasePath}/${post.slug}`}
            onClick={() => setIsOpen(false)}
            className="flex-1 text-center bg-secondary text-white rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-secondary/90 transition-colors"
          >
            Read Article
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 text-center border border-border rounded-lg px-4 py-2.5 text-sm font-semibold hover:bg-accent/5 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </Modal>
  )
}