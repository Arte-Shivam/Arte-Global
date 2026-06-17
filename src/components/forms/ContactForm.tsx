import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input, Textarea } from '../common/Input'
import { Button } from '../common/Button'
import { sendEmail } from '../../lib/email'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

interface ContactFormProps {
  type?: 'general' | 'candidate' | 'recruiter'
}

export function ContactForm({ type = 'general' }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setError('')
    const success = await sendEmail({
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      phone: data.phone,
      form_type: `contact_${type}`,
    })

    if (success) {
      setSubmitted(true)
      reset()
    } else {
      setError('Failed to send message. Please try again or email us directly.')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <img src="/icons/check-circle.svg" alt="" className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-secondary">Message Sent!</h3>
        <p className="mt-2">We'll get back to you within 24–48 hours.</p>
        <Button variant="outline" size="sm" className="mt-6" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Full Name" {...register('name')} error={errors.name?.message} />
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      </div>
      <Input label="Phone (optional)" type="tel" {...register('phone')} />
      <Input label="Subject" {...register('subject')} error={errors.subject?.message} />
      <Textarea label="Message" {...register('message')} error={errors.message?.message} />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
