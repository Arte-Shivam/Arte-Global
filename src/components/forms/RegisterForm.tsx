import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Input, Select } from '../common/Input'
import { Button } from '../common/Button'
import { useAuth } from '../../contexts/AuthContext'
import type { UserRole } from '../../types'

const candidateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  full_name: z.string().min(2),
  phone: z.string().optional(),
  gender: z.string().optional(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

const recruiterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
  company_name: z.string().min(2),
  phone: z.string().min(10),
  company_about: z.string().min(20),
  company_location: z.string().min(2),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

interface RegisterFormProps {
  role: UserRole
  onSuccess?: () => void
}

export function RegisterForm({ role, onSuccess }: RegisterFormProps) {
  const { signUp } = useAuth()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const isCandidate = role === 'candidate'

  const schema = isCandidate ? candidateSchema : recruiterSchema
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  const fieldErrors = errors as Record<string, { message?: string } | undefined>

  async function onSubmit(data: Record<string, string>) {
    setError('')
    const metadata: Record<string, string> = { role }
    if (isCandidate) {
      metadata.full_name = data.full_name
      metadata.phone = data.phone || ''
      metadata.gender = data.gender || ''
    } else {
      metadata.full_name = data.company_name
      metadata.company_name = data.company_name
      metadata.company_about = data.company_about
      metadata.company_location = data.company_location
      metadata.phone = data.phone
    }

    const { error: signUpError } = await signUp(data.email, data.password, metadata)
    if (signUpError) {
      setError(signUpError)
    } else {
      setSuccess(true)
      onSuccess?.()
    }
  }

  if (success) {
    return (
      <div className="text-center py-6">
        <img src="/icons/check-circle.svg" alt="" className="w-12 h-12 mx-auto mb-3" />
        <h4 className="text-secondary">Account Created!</h4>
        <p className="text-sm mt-2">Check your email to verify your account, then sign in.</p>
        <Link to={`/login?role=${role}`}>
          <Button variant="primary" size="sm" className="mt-4">Go to Login</Button>
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {isCandidate ? (
        <>
          <Input label="Full Name" {...register('full_name')} error={fieldErrors.full_name?.message} />
          <Select
            label="Gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
            {...register('gender')}
          />
          <Input label="Phone Number" type="tel" {...register('phone')} />
        </>
      ) : (
        <>
          <Input label="Company Name" {...register('company_name')} error={fieldErrors.company_name?.message} />
          <Input label="Phone Number" type="tel" {...register('phone')} error={fieldErrors.phone?.message} />
          <Input label="Company Location" {...register('company_location')} error={fieldErrors.company_location?.message} />
          <div>
            <label className="text-sm font-medium text-accent">About Company</label>
            <textarea
              {...register('company_about')}
              className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border min-h-[80px]"
            />
            {fieldErrors.company_about && <span className="text-xs text-red-500">{fieldErrors.company_about.message}</span>}
          </div>
        </>
      )}

      <Input label="Email" type="email" {...register('email')} error={fieldErrors.email?.message} />
      <Input label="Password" type="password" {...register('password')} error={fieldErrors.password?.message} />
      <Input label="Confirm Password" type="password" {...register('confirmPassword')} error={fieldErrors.confirmPassword?.message} />

      <p className="text-alt text-xs">
        By registering, you accept our{' '}
        <Link to="/terms" className="text-secondary hover:underline">Terms & Conditions</Link>
        {' '}and{' '}
        <Link to="/privacy" className="text-secondary hover:underline">Privacy Policy</Link>.
      </p>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Creating Account...' : `Register as ${isCandidate ? 'Candidate' : 'Recruiter'}`}
      </Button>

      <p className="text-center text-sm text-accent/60">
        Already have an account?{' '}
        <Link to={`/login?role=${role}`} className="text-secondary font-medium hover:underline">Login</Link>
      </p>
    </form>
  )
}
