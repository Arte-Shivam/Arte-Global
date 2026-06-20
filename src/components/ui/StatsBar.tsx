import { motion } from 'framer-motion'

interface Stat {
  value: string
  label: string
}

const STATS: Stat[] = [
  { value: '2000+', label: 'Candidates Placed' },
  { value: '20+', label: 'Countries' },
  { value: '500+', label: 'Partner Employers' },
]

export function StatsBar() {
  return (
    <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl">
      {STATS.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
        >
          <p className="text-3xl md:text-4xl font-bold text-accent font-heading">
            {stat.value}
          </p>
          <p className="text-xs md:text-sm text-accent/60 mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}