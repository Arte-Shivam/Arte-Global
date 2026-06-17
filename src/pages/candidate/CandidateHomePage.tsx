import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GeometricShapes } from '../../components/common/GeometricShapes'
import { Button } from '../../components/common/Button'
import { JobCard } from '../../components/ui/JobCard'
import { TestimonialsSection } from '../../components/ui/TestimonialsSection'
import { MediaCarousel } from '../../components/ui/MediaCarousel'
import { ReviewForm } from '../../components/forms/ReviewForm'
import {
  COMPANY, DEMO_JOBS, DEMO_MEDIA, HOW_IT_WORKS_CANDIDATE, TESTIMONIALS,
} from '../../data/content'

export function CandidateHomePage() {
  const featuredJobs = DEMO_JOBS.filter((j) => j.is_featured).slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <GeometricShapes variant="hero" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {COMPANY.tagline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-lg"
            >
              Discover global career opportunities across {COMPANY.countries.slice(0, 5).join(', ')} and more.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link to="/candidate/jobs">
                <Button variant="primary" size="lg">Find Jobs</Button>
              </Link>
              <Link to="/register?role=candidate">
                <Button variant="outline" size="lg">Register Free</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Job Search CTA */}
      <section className="section-padding bg-secondary-light/20 relative">
        <GeometricShapes variant="section" />
        <div className="container-custom relative z-10 text-center">
          <h2>Recommended Jobs</h2>
          <p className="mt-3 mb-10">Discover Your Value & Seek a Job that Enhances Your Life</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <Link to="/candidate/jobs" className="inline-block mt-10">
            <Button variant="secondary">View All Jobs</Button>
          </Link>
        </div>
      </section>

      {/* Europe CTA */}
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="bg-accent rounded-3xl p-8 md:p-16 text-white relative overflow-hidden" style={{
    backgroundImage: 'url(/public/Europe-Arte.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}  >
            <GeometricShapes variant="footer" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-white">Jobs in Europe are waiting for you!</h2>
              <p className="mt-4 text-white/80">
                Join hundreds of successful candidates who have already started their careers in Europe.
                Now it's your turn to take the leap and create a better future.
              </p>
              <Link to="/register?role=candidate" className="inline-block mt-8">
                <Button variant="primary" size="lg">Start your Career Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section-padding bg-white relative">
        <GeometricShapes variant="section" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <h2>How it Works?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS_CANDIDATE.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary-light flex items-center justify-center mx-auto mb-4">
                  <img src={step.icon} alt="" className="w-8 h-8" />
                </div>
                <h4 className="mt-2">{step.title}</h4>
                <p className="text-sm mt-2">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MediaCarousel items={DEMO_MEDIA} />
      <TestimonialsSection testimonials={TESTIMONIALS} />

      {/* Review Form */}
      <section className="section-padding">
        <div className="container-custom max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h3>Share Your Experience</h3>
            <p className="text-sm mt-2">Help others by sharing your journey with Arte Recruitment</p>
          </div>
          <div className="bg-white rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm">
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  )
}
