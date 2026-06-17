import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Textarea } from '../common/Input'
import { Button } from '../common/Button'
import { useAuth } from '../../contexts/AuthContext'
import { sendEmail } from '../../lib/email'
import type { Job } from '../../types'

const schema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Phone is required'),
  cover_letter: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface JobApplicationFormProps {
  job: Job
}

export function JobApplicationForm({ job }: JobApplicationFormProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user?.email ?? '',
    },
  })

  async function onSubmit(data: FormData) {
    await sendEmail({
      from_name: data.full_name,
      from_email: data.email,
      subject: `Job Application: ${job.title}`,
      message: `Phone: ${data.phone}\n\nCover Letter:\n${data.cover_letter || 'N/A'}`,
      form_type: 'job_application',
      phone: data.phone,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12 bg-secondary-light/30 rounded-2xl">
        <img src="/icons/check-circle.svg" alt="" className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-secondary">Application Submitted!</h3>
        <p className="mt-2">We've received your application for {job.title}. Our team will review it shortly.</p>
        <Button variant="outline" className="mt-6" onClick={() => navigate('/candidate/jobs')}>
          Browse More Jobs
        </Button>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12 bg-secondary-light/30 rounded-2xl">
        <img src="/icons/user.svg" alt="" className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <h4>Login to Apply</h4>
        <p className="text-sm mt-2 mb-6">Create an account or sign in to apply for this position.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/login?role=candidate">
            <Button variant="primary" size="sm">Login</Button>
          </Link>
          <Link to="/register?role=candidate">
            <Button variant="outline" size="sm">Register</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h4>Apply for {job.title}</h4>
      <Input label="Full Name" {...register('full_name')} error={errors.full_name?.message} />
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <Input label="Phone Number" type="tel" {...register('phone')} error={errors.phone?.message} />
      <Textarea label="Cover Letter (optional)" {...register('cover_letter')} />
      <div>
        <label className="text-sm font-medium text-accent">Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="mt-1.5 w-full text-sm text-accent/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary-light file:text-secondary file:font-medium hover:file:bg-secondary/10"
        />
        <p className="text-alt mt-1">PDF or Word document (max 5MB)</p>
      </div>
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  )
}
