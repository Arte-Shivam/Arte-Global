import { useParams, Link } from 'react-router-dom'
import { BLOG_POSTS } from '../../data/content'
import { formatDate } from '../../lib/utils'

interface BlogDetailPageProps {
  basePath?: string
}

export function BlogDetailPage({ basePath = '/candidate/blog' }: BlogDetailPageProps) {
  const { slug } = useParams()
  const post = BLOG_POSTS.find((p) => p.slug === slug)

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
        <p className="text-alt">{formatDate(post.published_at)} · {post.author}</p>
        <h1 className="mt-2">{post.title}</h1>
        <div className="mt-8 prose max-w-none">
          <p className="text-lg">{post.excerpt}</p>
          <p className="mt-6">{post.content}</p>
        </div>
      </div>
    </article>
  )
}
