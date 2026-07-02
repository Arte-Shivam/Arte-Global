import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GeometricShapes } from '../../components/common/GeometricShapes'
import { BLOG_POSTS } from '../../data/content'
import { formatDate } from '../../lib/utils'
import type { BlogPost } from '../../types'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

interface BlogPageProps {
  basePath?: string
}

export function BlogPage({ basePath = '/candidate/blog' }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [postsError, setPostsError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPosts() {
      if (!isSupabaseConfigured || !supabase) {
        setPosts(BLOG_POSTS as BlogPost[])
        setPostsLoading(false)
        return
      }
      setPostsLoading(true)
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'active')
        .order('published_at', { ascending: false })

      if (error) {
        setPostsError(error.message)
        setPosts(BLOG_POSTS as BlogPost[])
      } else {
        setPosts(data as BlogPost[])
      }
      setPostsLoading(false)
    }
    loadPosts()
  }, [])

  return (
    <div className="section-padding relative">
      <GeometricShapes variant="section" />
      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1>Blog</h1>
          <p className="mt-3">Insights, tips and stories from Arte Recruitment</p>
        </motion.div>

        {postsLoading ? (
          <div className="text-center py-16 text-accent/60">Loading posts...</div>
        ) : postsError ? (
          <div className="text-center py-16 text-red-500">Failed to load posts: {postsError}</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-accent/60">No blog posts yet. Check back soon.</div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-square bg-secondary-light overflow-hidden">
                <img
                  src={post.cover_image || '/blog-placeholder.jpg'}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6">
                <p className="text-alt">{formatDate(post.published_at)} · {post.author}</p>
                <h3 className="mt-2 group-hover:text-secondary transition-colors">
                  <Link to={`${basePath}/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-sm mt-3 line-clamp-3">{post.excerpt}</p>
                <Link
                  to={`${basePath}/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-secondary font-semibold mt-4 hover:gap-3 transition-all"
                >
                  Read More
                  <img src="/icons/arrow-right.svg" alt="" className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        )}
      </div>
    </div>
  )
}