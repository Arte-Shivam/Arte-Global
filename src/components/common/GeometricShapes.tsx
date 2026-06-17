import { motion } from 'framer-motion'

interface GeometricShapesProps {
  variant?: 'hero' | 'section' | 'footer'
}

export function GeometricShapes({ variant = 'section' }: GeometricShapesProps) {
  if (variant === 'hero') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1 }}
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-secondary"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-1/3 -left-16 w-48 h-48 rotate-45 bg-accent"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-10 right-1/4 w-32 h-32 rounded-full border-4 border-secondary"
        />
      </div>
    )
  }

  if (variant === 'footer') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-secondary/5" />
        <div className="absolute top-0 right-20 w-24 h-24 rotate-12 bg-accent/5" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute top-8 right-8 w-16 h-16 rounded-full border-2 border-secondary/10" />
      <div className="absolute bottom-8 left-8 w-12 h-12 rotate-45 bg-accent/5" />
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
