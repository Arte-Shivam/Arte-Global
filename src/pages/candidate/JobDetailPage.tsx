import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DEMO_JOBS } from '../../data/content'
import { JobApplicationForm } from '../../components/forms/JobApplicationForm'
import { GeometricShapes } from '../../components/common/GeometricShapes'

export function JobDetailPage() {
  const { slug } = useParams()
  const job = DEMO_JOBS.find((j) => j.slug === slug)

  if (!job) {
    return (
      <div className="section-padding text-center">
        <h2>Job Not Found</h2>
        <Link to="/candidate/jobs" className="text-secondary mt-4 inline-block hover:underline">
          ← Back to Jobs
        </Link>
      </div>
    )
  }

  return (
    <div className="section-padding relative">
      <GeometricShapes variant="section" />
      <div className="container-custom relative z-10">
        <Link to="/candidate/jobs" className="inline-flex items-center gap-2 text-sm text-secondary hover:gap-3 transition-all mb-8">
          <img src="/icons/arrow-left.svg" alt="" className="w-4 h-4" />
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {job.is_urgent && <span className="px-3 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-full">Urgent</span>}
              {job.is_featured && <span className="px-3 py-1 text-xs font-medium bg-secondary-light text-secondary rounded-full">Featured</span>}
            </div>
            <h1>{job.title}</h1>

            <div className="flex flex-wrap gap-4 mt-6 mb-8">
              <span className="inline-flex items-center gap-2 text-sm text-accent/60">
                <img src="/icons/location.svg" alt="" className="w-4 h-4" /> {job.country}
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-accent/60">
                <img src="/icons/industry.svg" alt="" className="w-4 h-4" /> {job.industry}
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-accent/60">
                <img src="/icons/briefcase.svg" alt="" className="w-4 h-4" /> {job.job_type}
              </span>
            </div>

            <div className="prose max-w-none">
              <h3>Job Description</h3>
              <p>{job.description}</p>
              {job.requirements && (
                <>
                  <h3>Requirements</h3>
                  <p>{job.requirements}</p>
                </>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28 bg-white rounded-2xl border border-border/50 p-6 shadow-sm">
              <JobApplicationForm job={job} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
