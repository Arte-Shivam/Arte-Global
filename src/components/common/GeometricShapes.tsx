import { motion } from 'framer-motion'

interface GeometricShapesProps {
  variant?: 'hero' | 'section' | 'footer' | 'route'
}

export function GeometricShapes({ variant = 'section' }: GeometricShapesProps) {
  if (variant === 'hero') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1 }}
          className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-secondary"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-1/3 -left-20 w-64 h-64 rotate-45 bg-accent"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full border-[6px] border-secondary"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.09 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-secondary"
        />
      </div>
    )
  }

  // Signature motif: faint flight-route lines + waypoint dots, evoking
  if (variant === 'route') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <motion.path
            d="M 80 480 Q 320 220 560 320 T 1040 120"
            fill="none"
            stroke="var(--color-secondary)"
            strokeWidth="2"
            strokeDasharray="2 14"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
          <motion.path
            d="M 160 100 Q 420 280 700 220 T 1140 420"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2"
            strokeDasharray="2 14"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.1 }}
            transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }}
          />
          {[
            [80, 480], [560, 320], [1040, 120],
            [160, 100], [700, 220], [1140, 420],
          ].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={5}
              fill={i % 2 === 0 ? 'var(--color-secondary)' : 'var(--color-accent)'}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
            />
          ))}
        </svg>
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-white/8" />
        <div className="absolute top-0 right-20 w-32 h-32 rotate-12 bg-white/8" />
        <div className="absolute top-1/2 right-0 w-24 h-24 -translate-y-1/2 rounded-full border-2 border-white/10" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute top-8 right-8 w-24 h-24 rounded-full border-2 border-secondary/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 rotate-45 bg-accent/10" />
      <div className="absolute top-1/2 left-1/4 w-8 h-8 rounded-full bg-secondary/15" />
    </div>
  )
}

export function SectionDivider() {
  return (
    <div className="relative h-px w-full max-w-xs mx-auto my-8" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
    </div>
  )
}