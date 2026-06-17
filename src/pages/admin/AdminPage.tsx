import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from '../../components/common/Button'
import { Input, Select, Textarea } from '../../components/common/Input'
import { DEMO_JOBS, INDUSTRIES, COUNTRIES } from '../../data/content'
import type { Job } from '../../types'
import { slugify } from '../../lib/utils'

export function AdminPage() {
  const { user, isAdmin, loading } = useAuth()
  const [jobs, setJobs] = useState<Job[]>(DEMO_JOBS)
  const [editing, setEditing] = useState<Job | null>(null)
  const [showForm, setShowForm] = useState(false)

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

  function handleSave() {
    if (editing) {
      setJobs(jobs.map((j) => j.id === editing.id ? {
        ...j,
        ...form,
        job_type: form.job_type as Job['job_type'],
        slug: slugify(form.title),
        updated_at: new Date().toISOString(),
      } : j))
      setEditing(null)
    } else {
      const newJob: Job = {
        id: String(Date.now()),
        ...form,
        slug: slugify(form.title),
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        job_type: form.job_type as Job['job_type'],
      }
      setJobs([newJob, ...jobs])
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

  function handleDelete(id: string) {
    if (confirm('Delete this job?')) {
      setJobs(jobs.filter((j) => j.id !== id))
    }
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1>Admin Dashboard</h1>
            <p className="text-sm mt-1 text-accent/60">
              Manage jobs and content {!isAdmin && '(Demo mode — connect Supabase for full admin access)'}
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => { setEditing(null); setShowForm(true) }}>
            + Add Job
          </Button>
        </div>

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
                      <span className="px-2 py-0.5 text-xs rounded-full bg-green-50 text-green-600">{job.status}</span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleEdit(job)} className="text-secondary hover:underline mr-3">Edit</button>
                      <button onClick={() => handleDelete(job.id)} className="text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
