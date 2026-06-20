import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input, Textarea } from '../common/Input'
import { Button } from '../common/Button'
import { sendEmail } from '../../lib/email'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  company_name: z.string().min(2, 'Company name is required'),
  email: z.string().email('Valid email required'),
  rating: z.number().min(1).max(5),
  review: z.string().min(20, 'Review must be at least 20 characters'),
})

type FormData = z.infer<typeof schema>

export function RecruiterReviewForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 5 },
  })

  async function onSubmit(data: FormData) {
    setSubmitError(null)

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('recruiter_reviews').insert({
        name: data.name,
        company_name: data.company_name,
        email: data.email,
        rating: data.rating,
        review: data.review,
      })

      if (error) {
        setSubmitError('Something went wrong submitting your review. Please try again.')
        return
      }
    }

    await sendEmail({
      from_name: `${data.name} (${data.company_name})`,
      from_email: data.email,
      subject: `Recruiter Review (${data.rating}/5)`,
      message: data.review,
      form_type: 'recruiter_review',
    })
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <img src="/icons/check-circle.svg" alt="" className="w-12 h-12 mx-auto mb-3" />
        <h4 className="text-secondary">Thank you for your feedback!</h4>
        <p className="text-sm mt-2">Your review helps us improve our services.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm text-secondary hover:underline"
        >
          Submit another review
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Your Name" {...register('name')} error={errors.name?.message} />
        <Input label="Company Name" {...register('company_name')} error={errors.company_name?.message} />
      </div>
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <div>
        <label className="text-sm font-medium text-accent">Rating</label>
        <select
          {...register('rating')}
          className="mt-1.5 w-full px-4 py-3 rounded-lg border border-border bg-white"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      <Textarea label="Your Review" {...register('review')} error={errors.review?.message} />
      {submitError && <p className="text-sm text-red-500">{submitError}</p>}
      <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
        Submit Review
      </Button>
    </form>
  )
}
