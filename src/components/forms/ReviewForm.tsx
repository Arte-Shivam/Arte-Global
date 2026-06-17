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
  rating: z.number().min(1).max(5),
  review: z.string().min(20, 'Review must be at least 20 characters'),
})

type FormData = z.infer<typeof schema>

export function ReviewForm() {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 5 },
  })

  async function onSubmit(data: FormData) {
    await sendEmail({
      from_name: data.name,
      from_email: data.email,
      subject: `Candidate Review (${data.rating}/5)`,
      message: data.review,
      form_type: 'candidate_review',
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
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Your Name" {...register('name')} error={errors.name?.message} />
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      </div>
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
      <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
        Submit Review
      </Button>
    </form>
  )
}
