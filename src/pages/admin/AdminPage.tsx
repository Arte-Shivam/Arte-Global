import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../../components/common/Button'
import { Input, Select, Textarea } from '../../components/common/Input'
import { DEMO_JOBS, BLOG_POSTS, DEMO_FAQS, INDUSTRIES, COUNTRIES } from '../../data/content'
import type { Job, CandidateReview, RecruiterReview, BlogPost, FAQ } from '../../types'
import { slugify } from '../../lib/utils'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

type AdminTab = 'jobs' | 'reviews' | 'recruiter-reviews' | 'blogs' | 'faqs'

export function AdminPage() {
  const { user, isAdmin, loading } = useAuth()
  const [activeTab, setActiveTab] = useState<AdminTab>('jobs')
  const [jobs, setJobs] = useState<Job[]>([])
  const [jobsLoading, setJobsLoading] = useState(true)
  const [jobsError, setJobsError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Job | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [reviews, setReviews] = useState<CandidateReview[]>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [reviewsError, setReviewsError] = useState<string | null>(null)
  const [recruiterReviews, setRecruiterReviews] = useState<RecruiterReview[]>([])
  const [recruiterReviewsLoading, setRecruiterReviewsLoading] = useState(true)
  const [recruiterReviewsError, setRecruiterReviewsError] = useState<string | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [postsError, setPostsError] = useState<string | null>(null)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [showPostForm, setShowPostForm] = useState(false)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [faqsLoading, setFaqsLoading] = useState(true)
  const [faqsError, setFaqsError] = useState<string | null>(null)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [showFaqForm, setShowFaqForm] = useState(false)

  useEffect(() => {
    async function loadJobs() {
      if (!isSupabaseConfigured || !supabase) {
        // Fallback to demo data when Supabase isn't configured
        setJobs(DEMO_JOBS)
        setJobsLoading(false)
        return
      }
      setJobsLoading(true)
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setJobsError(error.message)
      } else {
        setJobs(data as Job[])
      }
      setJobsLoading(false)
    }
    loadJobs()
  }, [])

  useEffect(() => {
    async function loadReviews() {
      if (!isSupabaseConfigured || !supabase) {
        setReviewsLoading(false)
        return
      }
      setReviewsLoading(true)
      const { data, error } = await supabase
        .from('candidate_reviews')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: false })

      if (error) {
        setReviewsError(error.message)
      } else {
        setReviews(data as CandidateReview[])
      }
      setReviewsLoading(false)
    }
    loadReviews()
  }, [])

  useEffect(() => {
    async function loadRecruiterReviews() {
      if (!isSupabaseConfigured || !supabase) {
        setRecruiterReviewsLoading(false)
        return
      }
      setRecruiterReviewsLoading(true)
      const { data, error } = await supabase
        .from('recruiter_reviews')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: false })

      if (error) {
        setRecruiterReviewsError(error.message)
      } else {
        setRecruiterReviews(data as RecruiterReview[])
      }
      setRecruiterReviewsLoading(false)
    }
    loadRecruiterReviews()
  }, [])

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
        .order('created_at', { ascending: false })

      if (error) {
        setPostsError(error.message)
      } else {
        setPosts(data as BlogPost[])
      }
      setPostsLoading(false)
    }
    loadPosts()
  }, [])

  useEffect(() => {
    async function loadFaqs() {
      if (!isSupabaseConfigured || !supabase) {
        setFaqs(DEMO_FAQS)
        setFaqsLoading(false)
        return
      }
      setFaqsLoading(true)
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) {
        setFaqsError(error.message)
      } else {
        setFaqs(data as FAQ[])
      }
      setFaqsLoading(false)
    }
    loadFaqs()
  }, [])

  const [form, setForm] = useState({
    title: '',
    description: '',
    industry: '',
    country: '',
    job_type: 'full-time',
    is_featured: false,
    is_urgent: false,
  })

  const [postForm, setPostForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    cover_image: '',
    author: 'Arte Team',
  })

  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: 'General',
    audience: 'both' as FAQ['audience'],
    sort_order: 0,
  })

  if (loading) {
    return <div className="section-padding text-center">Loading...</div>
  }

  // In production, check isAdmin. For demo, allow access when logged in or show login prompt
  if (!user) {
    return (
      <div className="section-padding text-center">
        <h2>Admin Access Required</h2>
        <p className="mt-4">Please sign in with an admin account to manage jobs and content.</p>
        <Link to="/login?role=candidate" className="inline-block mt-6">
          <Button variant="primary">Login</Button>
        </Link>
      </div>
    )
  }

  if (isSupabaseConfigured && !isAdmin) {
    return (
      <div className="section-padding text-center">
        <h2>Access Denied</h2>
        <p className="mt-4">Your account does not have admin access. Please contact the site administrator if you believe this is a mistake.</p>
      </div>
    )
  }

  async function handleSave() {
    if (!supabase) return

    if (editing) {
      const { data, error } = await supabase
        .from('jobs')
        .update({
          ...form,
          job_type: form.job_type as Job['job_type'],
          slug: slugify(form.title),
          updated_at: new Date().toISOString(),
        })
        .eq('id', editing.id)
        .select()
        .single()

      if (error) {
        alert('Failed to update job: ' + error.message)
        return
      }
      setJobs(jobs.map((j) => j.id === editing.id ? (data as Job) : j))
      setEditing(null)
    } else {
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          ...form,
          slug: slugify(form.title),
          status: 'active',
          created_by: user?.id,
        })
        .select()
        .single()

      if (error) {
        alert('Failed to create job: ' + error.message)
        return
      }
      setJobs([data as Job, ...jobs])
    }
    setShowForm(false)
    setForm({ title: '', description: '', industry: '', country: '', job_type: 'full-time', is_featured: false, is_urgent: false })
  }

  function handleEdit(job: Job) {
    setEditing(job)
    setForm({
      title: job.title,
      description: job.description,
      industry: job.industry,
      country: job.country,
      job_type: job.job_type,
      is_featured: job.is_featured,
      is_urgent: job.is_urgent,
    })
    setShowForm(true)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this job?') || !supabase) return

    const { error } = await supabase.from('jobs').delete().eq('id', id)
    if (error) {
      alert('Failed to delete job: ' + error.message)
      return
    }
    setJobs(jobs.filter((j) => j.id !== id))
  }

  async function handleToggleStatus(job: Job) {
    if (!supabase) return
    const newStatus: Job['status'] = job.status === 'active' ? 'closed' : 'active'

    const { data, error } = await supabase
      .from('jobs')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', job.id)
      .select()
      .single()

    if (error) {
      alert('Failed to update status: ' + error.message)
      return
    }
    setJobs(jobs.map((j) => j.id === job.id ? (data as Job) : j))
  }

  async function handleSavePost() {
    if (!supabase) return

    if (editingPost) {
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...postForm,
          cover_image: postForm.cover_image || null,
          slug: slugify(postForm.title),
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingPost.id)
        .select()
        .single()

      if (error) {
        alert('Failed to update post: ' + error.message)
        return
      }
      setPosts(posts.map((p) => p.id === editingPost.id ? (data as BlogPost) : p))
      setEditingPost(null)
    } else {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          ...postForm,
          cover_image: postForm.cover_image || null,
          slug: slugify(postForm.title),
          status: 'draft',
          published_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        alert('Failed to create post: ' + error.message)
        return
      }
      setPosts([data as BlogPost, ...posts])
    }
    setShowPostForm(false)
    setPostForm({ title: '', excerpt: '', content: '', cover_image: '', author: 'Arte Team' })
  }

  function handleEditPost(post: BlogPost) {
    setEditingPost(post)
    setPostForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.cover_image || '',
      author: post.author,
    })
    setShowPostForm(true)
  }

  async function handleDeletePost(id: string) {
    if (!confirm('Delete this blog post?') || !supabase) return

    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) {
      alert('Failed to delete post: ' + error.message)
      return
    }
    setPosts(posts.filter((p) => p.id !== id))
  }

  async function handleChangePostStatus(post: BlogPost, newStatus: BlogPost['status']) {
    if (!supabase) return

    const { data, error } = await supabase
      .from('blog_posts')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', post.id)
      .select()
      .single()

    if (error) {
      alert('Failed to update status: ' + error.message)
      return
    }
    setPosts(posts.map((p) => p.id === post.id ? (data as BlogPost) : p))
  }

  async function handleSaveFaq() {
    if (!supabase) return

    if (editingFaq) {
      const { data, error } = await supabase
        .from('faqs')
        .update({
          ...faqForm,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingFaq.id)
        .select()
        .single()

      if (error) {
        alert('Failed to update FAQ: ' + error.message)
        return
      }
      setFaqs(faqs.map((f) => f.id === editingFaq.id ? (data as FAQ) : f).sort((a, b) => a.sort_order - b.sort_order))
      setEditingFaq(null)
    } else {
      const { data, error } = await supabase
        .from('faqs')
        .insert({
          ...faqForm,
          status: 'active',
        })
        .select()
        .single()

      if (error) {
        alert('Failed to create FAQ: ' + error.message)
        return
      }
      setFaqs([...faqs, data as FAQ].sort((a, b) => a.sort_order - b.sort_order))
    }
    setShowFaqForm(false)
    setFaqForm({ question: '', answer: '', category: 'General', audience: 'both', sort_order: 0 })
  }

  function handleEditFaq(faq: FAQ) {
    setEditingFaq(faq)
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      audience: faq.audience,
      sort_order: faq.sort_order,
    })
    setShowFaqForm(true)
  }

  async function handleDeleteFaq(id: string) {
    if (!confirm('Delete this FAQ?') || !supabase) return

    const { error } = await supabase.from('faqs').delete().eq('id', id)
    if (error) {
      alert('Failed to delete FAQ: ' + error.message)
      return
    }
    setFaqs(faqs.filter((f) => f.id !== id))
  }

  async function handleToggleFaqStatus(faq: FAQ) {
    if (!supabase) return
    const newStatus: FAQ['status'] = faq.status === 'active' ? 'inactive' : 'active'

    const { data, error } = await supabase
      .from('faqs')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', faq.id)
      .select()
      .single()

    if (error) {
      alert('Failed to update status: ' + error.message)
      return
    }
    setFaqs(faqs.map((f) => f.id === faq.id ? (data as FAQ) : f))
  }

  async function handleApproveReview(review: CandidateReview) {
    if (!supabase) return

    const { error: insertError } = await supabase.from('testimonials').insert({
      name: review.name,
      role: 'Candidate',
      content: review.review,
      type: 'candidate',
      is_active: true,
    })

    if (insertError) {
      alert('Failed to publish testimonial: ' + insertError.message)
      return
    }

    const { error: updateError } = await supabase
      .from('candidate_reviews')
      .update({ is_approved: true })
      .eq('id', review.id)

    if (updateError) {
      alert('Review was published, but failed to mark as approved: ' + updateError.message)
    }

    setReviews(reviews.filter((r) => r.id !== review.id))
  }

  async function handleRejectReview(id: string) {
    if (!confirm('Reject and delete this review? This cannot be undone.') || !supabase) return

    const { error } = await supabase.from('candidate_reviews').delete().eq('id', id)
    if (error) {
      alert('Failed to delete review: ' + error.message)
      return
    }
    setReviews(reviews.filter((r) => r.id !== id))
  }

  async function handleApproveRecruiterReview(review: RecruiterReview) {
    if (!supabase) return

    const { error: insertError } = await supabase.from('testimonials').insert({
      name: review.name,
      role: review.company_name,
      content: review.review,
      type: 'recruiter',
      is_active: true,
    })

    if (insertError) {
      alert('Failed to publish testimonial: ' + insertError.message)
      return
    }

    const { error: updateError } = await supabase
      .from('recruiter_reviews')
      .update({ is_approved: true })
      .eq('id', review.id)

    if (updateError) {
      alert('Review was published, but failed to mark as approved: ' + updateError.message)
    }

    setRecruiterReviews(recruiterReviews.filter((r) => r.id !== review.id))
  }

  async function handleRejectRecruiterReview(id: string) {
    if (!confirm('Reject and delete this review? This cannot be undone.') || !supabase) return

    const { error } = await supabase.from('recruiter_reviews').delete().eq('id', id)
    if (error) {
      alert('Failed to delete review: ' + error.message)
      return
    }
    setRecruiterReviews(recruiterReviews.filter((r) => r.id !== id))
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1>Admin Dashboard</h1>
            <p className="text-sm mt-1 text-accent/60">
              Manage jobs and content {!isSupabaseConfigured && '(Demo mode — connect Supabase for full admin access)'}
            </p>
          </div>
          {activeTab === 'jobs' && (
            <Button variant="primary" size="sm" onClick={() => { setEditing(null); setShowForm(true) }}>
              + Add Job
            </Button>
          )}
          {activeTab === 'blogs' && (
            <Button variant="primary" size="sm" onClick={() => { setEditingPost(null); setShowPostForm(true) }}>
              + Add Blog Post
            </Button>
          )}
          {activeTab === 'faqs' && (
            <Button variant="primary" size="sm" onClick={() => { setEditingFaq(null); setShowFaqForm(true) }}>
              + Add FAQ
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border/50">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              activeTab === 'jobs' ? 'border-secondary text-secondary' : 'border-transparent text-accent/60'
            }`}
          >
            Jobs
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === 'reviews' ? 'border-secondary text-secondary' : 'border-transparent text-accent/60'
            }`}
          >
            Candidate Reviews
            {reviews.length > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {reviews.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('recruiter-reviews')}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === 'recruiter-reviews' ? 'border-secondary text-secondary' : 'border-transparent text-accent/60'
            }`}
          >
            Recruiter Reviews
            {recruiterReviews.length > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {recruiterReviews.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              activeTab === 'blogs' ? 'border-secondary text-secondary' : 'border-transparent text-accent/60'
            }`}
          >
            Blogs
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              activeTab === 'faqs' ? 'border-secondary text-secondary' : 'border-transparent text-accent/60'
            }`}
          >
            FAQs
          </button>
        </div>

        {activeTab === 'jobs' && (
        <>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Jobs', value: jobs.length },
            { label: 'Active', value: jobs.filter((j) => j.status === 'active').length },
            { label: 'Featured', value: jobs.filter((j) => j.is_featured).length },
            { label: 'Urgent', value: jobs.filter((j) => j.is_urgent).length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-border/50 p-4 text-center">
              <p className="text-2xl font-bold text-secondary">{stat.value}</p>
              <p className="text-alt">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Job Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-border/50 p-6 mb-8">
            <h4 className="mb-4">{editing ? 'Edit Job' : 'New Job'}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Job Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Select label="Industry" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} options={INDUSTRIES.map((i) => ({ value: i, label: i }))} />
              <Select label="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} options={COUNTRIES.map((c) => ({ value: c, label: c }))} />
              <Select label="Job Type" value={form.job_type} onChange={(e) => setForm({ ...form, job_type: e.target.value })} options={[
                { value: 'full-time', label: 'Full Time' },
                { value: 'part-time', label: 'Part Time' },
                { value: 'contract', label: 'Contract' },
                { value: 'temporary', label: 'Temporary' },
              ]} />
            </div>
            <Textarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-4" />
            <div className="flex gap-4 mt-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_urgent} onChange={(e) => setForm({ ...form, is_urgent: e.target.checked })} />
                Urgent
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="primary" size="sm" onClick={handleSave}>Save</Button>
              <Button variant="ghost" size="sm" onClick={() => { setShowForm(false); setEditing(null) }}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Jobs Table */}
        {jobsLoading ? (
          <div className="bg-white rounded-2xl border border-border/50 p-10 text-center text-accent/60">
            Loading jobs...
          </div>
        ) : jobsError ? (
          <div className="bg-white rounded-2xl border border-red-200 p-10 text-center text-red-500">
            Failed to load jobs: {jobsError}
          </div>
        ) : (
        <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-accent/5">
                <tr>
                  <th className="text-left p-4 font-medium">Title</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Country</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Industry</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-t border-border/50 hover:bg-accent/5">
                    <td className="p-4">
                      <p className="font-medium">{job.title}</p>
                      <div className="flex gap-1 mt-1">
                        {job.is_featured && <span className="text-xs text-secondary">Featured</span>}
                        {job.is_urgent && <span className="text-xs text-red-500">Urgent</span>}
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-accent/60">{job.country}</td>
                    <td className="p-4 hidden md:table-cell text-accent/60">{job.industry}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        job.status === 'active'
                          ? 'bg-green-50 text-green-600'
                          : job.status === 'closed'
                          ? 'bg-red-50 text-red-500'
                          : 'bg-accent/10 text-accent/60'
                      }`}>{job.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleToggleStatus(job)} className="text-secondary hover:underline mr-3">
                        {job.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={() => handleEdit(job)} className="text-secondary hover:underline mr-3">Edit</button>
                      <button onClick={() => handleDelete(job.id)} className="text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
        </>
        )}

        {activeTab === 'reviews' && (
        <>
        {reviewsLoading ? (
          <div className="bg-white rounded-2xl border border-border/50 p-10 text-center text-accent/60">
            Loading reviews...
          </div>
        ) : reviewsError ? (
          <div className="bg-white rounded-2xl border border-red-200 p-10 text-center text-red-500">
            Failed to load reviews: {reviewsError}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border/50 p-10 text-center text-accent/60">
            No pending reviews. New submissions will appear here for approval.
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl border border-border/50 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{review.name}</p>
                    <p className="text-xs text-accent/60">{review.email}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-secondary' : 'text-accent/20'}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-accent/60 whitespace-nowrap">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm mt-4">{review.review}</p>
                <div className="flex gap-3 mt-4">
                  <Button variant="primary" size="sm" onClick={() => handleApproveReview(review)}>
                    Approve
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleRejectReview(review.id)}>
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        </>
        )}

        {activeTab === 'recruiter-reviews' && (
        <>
        {recruiterReviewsLoading ? (
          <div className="bg-white rounded-2xl border border-border/50 p-10 text-center text-accent/60">
            Loading reviews...
          </div>
        ) : recruiterReviewsError ? (
          <div className="bg-white rounded-2xl border border-red-200 p-10 text-center text-red-500">
            Failed to load reviews: {recruiterReviewsError}
          </div>
        ) : recruiterReviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border/50 p-10 text-center text-accent/60">
            No pending reviews. New submissions will appear here for approval.
          </div>
        ) : (
          <div className="space-y-4">
            {recruiterReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl border border-border/50 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{review.name}</p>
                    <p className="text-xs text-secondary">{review.company_name}</p>
                    <p className="text-xs text-accent/60">{review.email}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-secondary' : 'text-accent/20'}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-accent/60 whitespace-nowrap">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm mt-4">{review.review}</p>
                <div className="flex gap-3 mt-4">
                  <Button variant="primary" size="sm" onClick={() => handleApproveRecruiterReview(review)}>
                    Approve
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleRejectRecruiterReview(review.id)}>
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        </>
        )}

        {activeTab === 'blogs' && (
        <>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Posts', value: posts.length },
            { label: 'Active', value: posts.filter((p) => p.status === 'active').length },
            { label: 'Draft', value: posts.filter((p) => p.status === 'draft').length },
            { label: 'Inactive', value: posts.filter((p) => p.status === 'inactive').length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-border/50 p-4 text-center">
              <p className="text-2xl font-bold text-secondary">{stat.value}</p>
              <p className="text-alt">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Blog Post Form */}
        {showPostForm && (
          <div className="bg-white rounded-2xl border border-border/50 p-6 mb-8">
            <h4 className="mb-4">{editingPost ? 'Edit Blog Post' : 'New Blog Post'}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Title" value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} />
              <Input label="Author" value={postForm.author} onChange={(e) => setPostForm({ ...postForm, author: e.target.value })} />
            </div>
            <Input
              label="Cover Image URL (optional)"
              value={postForm.cover_image}
              onChange={(e) => setPostForm({ ...postForm, cover_image: e.target.value })}
              className="mt-4"
              placeholder="https://... — leave blank to use the default placeholder"
            />
            <Textarea label="Excerpt" value={postForm.excerpt} onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })} className="mt-4" />
            <Textarea label="Content" value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} className="mt-4" />
            <div className="flex gap-3 mt-6">
              <Button variant="primary" size="sm" onClick={handleSavePost}>Save</Button>
              <Button variant="ghost" size="sm" onClick={() => { setShowPostForm(false); setEditingPost(null) }}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Blog Posts Table */}
        {postsLoading ? (
          <div className="bg-white rounded-2xl border border-border/50 p-10 text-center text-accent/60">
            Loading posts...
          </div>
        ) : postsError ? (
          <div className="bg-white rounded-2xl border border-red-200 p-10 text-center text-red-500">
            Failed to load posts: {postsError}
          </div>
        ) : (
        <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-accent/5">
                <tr>
                  <th className="text-left p-4 font-medium">Title</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Author</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-t border-border/50 hover:bg-accent/5">
                    <td className="p-4">
                      <p className="font-medium">{post.title}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell text-accent/60">{post.author}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        post.status === 'active'
                          ? 'bg-green-50 text-green-600'
                          : post.status === 'inactive'
                          ? 'bg-red-50 text-red-500'
                          : 'bg-accent/10 text-accent/60'
                      }`}>{post.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={post.status}
                        onChange={(e) => handleChangePostStatus(post, e.target.value as BlogPost['status'])}
                        className="text-xs border border-border rounded px-2 py-1 mr-3"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="draft">Draft</option>
                      </select>
                      <button onClick={() => handleEditPost(post)} className="text-secondary hover:underline mr-3">Edit</button>
                      <button onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
        </>
        )}

        {activeTab === 'faqs' && (
        <>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total FAQs', value: faqs.length },
            { label: 'Active', value: faqs.filter((f) => f.status === 'active').length },
            { label: 'Candidate', value: faqs.filter((f) => f.audience === 'candidate' || f.audience === 'both').length },
            { label: 'Recruiter', value: faqs.filter((f) => f.audience === 'recruiter' || f.audience === 'both').length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-border/50 p-4 text-center">
              <p className="text-2xl font-bold text-secondary">{stat.value}</p>
              <p className="text-alt">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* FAQ Form */}
        {showFaqForm && (
          <div className="bg-white rounded-2xl border border-border/50 p-6 mb-8">
            <h4 className="mb-4">{editingFaq ? 'Edit FAQ' : 'New FAQ'}</h4>
            <Input label="Question" value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} />
            <Textarea label="Answer" value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} className="mt-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Input label="Category" value={faqForm.category} onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })} />
              <Select
                label="Audience"
                value={faqForm.audience}
                onChange={(e) => setFaqForm({ ...faqForm, audience: e.target.value as FAQ['audience'] })}
                options={[
                  { value: 'both', label: 'Both' },
                  { value: 'candidate', label: 'Candidate' },
                  { value: 'recruiter', label: 'Recruiter' },
                ]}
              />
              <Input
                label="Sort Order"
                type="number"
                value={faqForm.sort_order}
                onChange={(e) => setFaqForm({ ...faqForm, sort_order: Number(e.target.value) })}
              />
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="primary" size="sm" onClick={handleSaveFaq}>Save</Button>
              <Button variant="ghost" size="sm" onClick={() => { setShowFaqForm(false); setEditingFaq(null) }}>Cancel</Button>
            </div>
          </div>
        )}

        {/* FAQs Table */}
        {faqsLoading ? (
          <div className="bg-white rounded-2xl border border-border/50 p-10 text-center text-accent/60">
            Loading FAQs...
          </div>
        ) : faqsError ? (
          <div className="bg-white rounded-2xl border border-red-200 p-10 text-center text-red-500">
            Failed to load FAQs: {faqsError}
          </div>
        ) : (
        <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-accent/5">
                <tr>
                  <th className="text-left p-4 font-medium">Question</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Category</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Audience</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq) => (
                  <tr key={faq.id} className="border-t border-border/50 hover:bg-accent/5">
                    <td className="p-4">
                      <p className="font-medium">{faq.question}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell text-accent/60">{faq.category}</td>
                    <td className="p-4 hidden md:table-cell text-accent/60 capitalize">{faq.audience}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        faq.status === 'active'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-red-50 text-red-500'
                      }`}>{faq.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleToggleFaqStatus(faq)} className="text-secondary hover:underline mr-3">
                        {faq.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={() => handleEditFaq(faq)} className="text-secondary hover:underline mr-3">Edit</button>
                      <button onClick={() => handleDeleteFaq(faq.id)} className="text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
        </>
        )}
      </div>
    </div>
  )
}