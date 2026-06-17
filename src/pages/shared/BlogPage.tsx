import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GeometricShapes } from '../../components/common/GeometricShapes'
import { BLOG_POSTS } from '../../data/content'
import { formatDate } from '../../lib/utils'

interface BlogPageProps {
  basePath?: string
}

export function BlogPage({ basePath = '/candidate/blog' }: BlogPageProps) {
  return (
    <div className="section-padding relative">
      <GeometricShapes variant="section" />
      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1>Blog</h1>
          <p className="mt-3">Insights, tips and stories from Arte Recruitment</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="h-48 bg-secondary-light flex items-center justify-center">
                <img src="/icons/blog.svg" alt="" className="w-16 h-16 opacity-30" />
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
      </div>
    </div>
  )
}
