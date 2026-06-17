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
  question: z.string().min(10, 'Please provide more detail'),
})

type FormData = z.infer<typeof schema>

export function FAQForm() {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    await sendEmail({
      from_name: data.name,
      from_email: data.email,
      subject: 'FAQ Question Submission',
      message: data.question,
      form_type: 'faq_question',
    })
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return (
      <div className="text-center py-6">
        <h4 className="text-secondary">Question Submitted!</h4>
        <p className="text-sm mt-2">We'll add an answer to our FAQ section soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Your Name" {...register('name')} error={errors.name?.message} />
      <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <Textarea label="Your Question" {...register('question')} error={errors.question?.message} />
      <Button type="submit" variant="outline" size="sm" disabled={isSubmitting}>
        Submit Question
      </Button>
    </form>
  )
}
