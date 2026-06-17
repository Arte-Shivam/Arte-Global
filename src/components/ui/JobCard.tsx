import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Job } from '../../types'
import { cn } from '../../lib/utils'

interface JobCardProps {
  job: Job
  basePath?: string
}

export function JobCard({ job, basePath = '/candidate/jobs' }: JobCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border border-border/50 p-6 hover:shadow-lg hover:border-secondary/30 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h4 className="group-hover:text-secondary transition-colors">{job.title}</h4>
        <div className="flex gap-1 shrink-0">
          {job.is_urgent && (
            <span className="px-2 py-0.5 text-xs font-medium bg-red-50 text-red-600 rounded-full">Urgent</span>
          )}
          {job.is_featured && (
            <span className="px-2 py-0.5 text-xs font-medium bg-secondary-light text-secondary rounded-full">Featured</span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <span className="inline-flex items-center gap-1.5 text-alt">
          <img src="/icons/location.svg" alt="" className="w-3.5 h-3.5" />
          {job.country}
        </span>
        <span className="inline-flex items-center gap-1.5 text-alt">
          <img src="/icons/industry.svg" alt="" className="w-3.5 h-3.5" />
          {job.industry}
        </span>
        <span className="inline-flex items-center gap-1.5 text-alt">
          <img src="/icons/briefcase.svg" alt="" className="w-3.5 h-3.5" />
          {job.job_type}
        </span>
      </div>

      <p className="text-sm text-accent/60 line-clamp-2 mb-4">{job.description}</p>

      <Link
        to={`${basePath}/${job.slug}`}
        className={cn(
          'inline-flex items-center gap-2 text-sm font-semibold text-secondary',
          'hover:gap-3 transition-all duration-300',
        )}
      >
        View & Apply
        <img src="/icons/arrow-right.svg" alt="" className="w-4 h-4" />
      </Link>
    </motion.div>
  )
}
