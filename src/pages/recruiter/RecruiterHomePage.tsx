import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GeometricShapes } from '../../components/common/GeometricShapes'
import { Button } from '../../components/common/Button'
import { TestimonialsSection } from '../../components/ui/TestimonialsSection'
import { RecruiterReviewForm } from '../../components/forms/RecruiterReviewForm'
import { StatsBar } from '../../components/ui/StatsBar'
import { HOW_IT_WORKS_RECRUITER, TESTIMONIALS } from '../../data/content'
import type { Testimonial } from '../../types'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

export function RecruiterHomePage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    TESTIMONIALS.filter((t) => t.type === 'recruiter'),
  )

  useEffect(() => {
    async function loadTestimonials() {
      if (!isSupabaseConfigured || !supabase) return

      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .eq('type', 'recruiter')
        .order('id', { ascending: false })

      if (!error && data && data.length > 0) {
        setTestimonials(data as Testimonial[])
      }
      // If no approved testimonials yet, keep the static fallback already in state
    }
    loadTestimonials()
  }, [])

  return (
    <>
      <section className="relative section-padding overflow-hidden">
        <GeometricShapes variant="hero" />
        <GeometricShapes variant="route" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Find the <span className="text-secondary">Best Talent</span> for Your Business
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-lg"
            >
              Partner with Arte Recruitment to access a global pool of skilled professionals
              from India, Nepal and beyond.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/register?role=recruiter">
                <Button variant="primary" size="lg">Register as Employer</Button>
              </Link>
              <Link to="/recruiter/contact">
                <Button variant="outline" size="lg">Contact Us</Button>
              </Link>
            </motion.div>
          </div>
          <div className="mt-14 md:mt-16">
            <StatsBar />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-secondary-light relative">
        <GeometricShapes variant="section" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <h2>Why Partner with Arte?</h2>
            <p className="mt-3 max-w-2xl mx-auto">
              We specialise in connecting employers with qualified candidates across multiple industries and countries.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '/icons/global.svg', title: 'Global Reach', desc: 'Access talent from India, Nepal and neighbouring regions placed across Europe, UAE, Qatar and more.' },
              { icon: '/icons/verified.svg', title: 'Vetted Candidates', desc: 'Every candidate is screened for skills, experience and reliability before being presented to you.' },
              { icon: '/icons/support.svg', title: 'End-to-End Support', desc: 'From sourcing to onboarding, we handle the recruitment process so you can focus on your business.' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              >
                <img src={item.icon} alt="" className="w-12 h-12 mx-auto mb-4" />
                <h4>{item.title}</h4>
                <p className="text-sm mt-3">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section-padding relative">
        <GeometricShapes variant="section" />
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2>How it Works for Employers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS_RECRUITER.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center mx-auto mb-4">
                  <img src={step.icon} alt="" className="w-8 h-8" />
                </div>
                <span className="text-accent font-bold text-sm">Step {step.step}</span>
                <h4 className="mt-2">{step.title}</h4>
                <p className="text-sm mt-2">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection
        testimonials={testimonials}
        title="What Our Partners Say"
        subtitle="Trusted by employers across industries worldwide"
      />

      {/* Review Form */}
      <section className="section-padding">
        <div className="container-custom max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h3>Share Your Experience</h3>
            <p className="text-sm mt-2">Help other employers by sharing your experience partnering with Arte Recruitment</p>
          </div>
          <div className="bg-white rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm">
            <RecruiterReviewForm />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-secondary rounded-3xl p-8 md:p-16 text-white text-center relative overflow-hidden" style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(public/arte_homepage_background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}>
            <GeometricShapes variant="footer" />
            <div className="relative z-10">
            <h2 className="text-white">Looking for employees?</h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">
              Register today and we will recruit the best talent for you!
            </p>
            <Link to="/register?role=recruiter" className="inline-block mt-8">
              <Button variant="secondary" size="lg">Get Started</Button>
            </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
