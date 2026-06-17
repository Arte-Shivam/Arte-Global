import { motion } from 'framer-motion'
import type { Testimonial } from '../../types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
}

export function TestimonialsSection({
  testimonials,
  title = 'User Review & Feedback',
  subtitle = 'We help people get the job of their dream',
}: TestimonialsSectionProps) {
  return (
    <section className="section-padding bg-secondary-light/30 relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2>{title}</h2>
          <p className="mt-3 max-w-xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center shrink-0">
                  <img src="/icons/quote.svg" alt="" className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-accent/80 text-sm leading-relaxed italic">"{item.content}"</p>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="font-semibold text-accent text-sm">{item.name}</p>
                    <p className="text-alt">{item.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
