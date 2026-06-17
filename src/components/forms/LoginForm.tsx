import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../common/Input'
import { Button } from '../common/Button'
import { useAuth } from '../../contexts/AuthContext'
import type { UserRole } from '../../types'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
})

interface LoginFormProps {
  role?: UserRole
}

export function LoginForm({ role = 'candidate' }: LoginFormProps) {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: { email: string; password: string }) {
    setError('')
    const { error: signInError } = await signIn(data.email, data.password)
    if (signInError) {
      setError(signInError)
    } else {
      navigate(role === 'recruiter' ? '/recruiter' : '/candidate')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" variant="primary" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>

      <p className="text-center text-sm text-accent/60">
        Don't have an account?{' '}
        <Link to={`/register?role=${role}`} className="text-secondary font-medium hover:underline">Register</Link>
      </p>
    </form>
  )
}
