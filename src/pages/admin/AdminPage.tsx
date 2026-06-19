import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../../components/common/Button'
import { Input, Select, Textarea } from '../../components/common/Input'
import { DEMO_JOBS, INDUSTRIES, COUNTRIES } from '../../data/content'
import type { Job, CandidateReview, RecruiterReview } from '../../types'
import { slugify } from '../../lib/utils'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

type AdminTab = 'jobs' | 'reviews' | 'recruiter-reviews'

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

  const [form, setForm] = useState({
    title: '',
    description: '',
    industry: '',
    country: '',
    job_type: 'full-time',
    is_featured: false,
    is_urgent: false,
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
      </div>
    </div>
  )
}