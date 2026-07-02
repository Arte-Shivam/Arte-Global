import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BLOG_POSTS } from '../../data/content'
import { formatDate } from '../../lib/utils'
import type { BlogPost } from '../../types'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

interface BlogDetailPageProps {
  basePath?: string
}

export function BlogDetailPage({ basePath = '/candidate/blog' }: BlogDetailPageProps) {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined)

  useEffect(() => {
    async function loadPost() {
      if (!isSupabaseConfigured || !supabase) {
        setPost((BLOG_POSTS as BlogPost[]).find((p) => p.slug === slug) ?? null)
        return
      }
      setPost(undefined)
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'active')
        .maybeSingle()

      if (error || !data) {
        setPost(null)
      } else {
        setPost(data as BlogPost)
      }
    }
    loadPost()
  }, [slug])

  if (post === undefined) {
    return <div className="section-padding text-center text-accent/60">Loading post...</div>
  }

  if (!post) {
    return (
      <div className="section-padding text-center">
        <h2>Post Not Found</h2>
        <Link to={basePath} className="text-secondary mt-4 inline-block">← Back to Blog</Link>
      </div>
    )
  }

  return (
    <article className="section-padding">
      <div className="container-custom max-w-3xl">
        <Link to={basePath} className="inline-flex items-center gap-2 text-sm text-secondary mb-8 hover:gap-3 transition-all">
          <img src="/icons/arrow-left.svg" alt="" className="w-4 h-4" />
          Back to Blog
        </Link>
        <div className="w-full overflow-hidden rounded-2xl bg-secondary-light">
          <img
            src={post.banner_image || post.cover_image || '/blog-placeholder.jpg'}
            alt=""
            className="w-full aspect-[3/1] object-cover"
          />
        </div>
        <p className="text-alt mt-6">{formatDate(post.published_at)} · {post.author}</p>
        <h1 className="mt-2">{post.title}</h1>
        <div className="mt-8 prose max-w-none">
          <p className="text-lg">{post.excerpt}</p>
          <p className="mt-6">{post.content}</p>
        </div>
      </div>
    </article>
  )
}