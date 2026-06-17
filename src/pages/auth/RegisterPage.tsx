import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { RegisterForm } from '../../components/forms/RegisterForm'
import { GeometricShapes } from '../../components/common/GeometricShapes'
import type { UserRole } from '../../types'

export function RegisterPage() {
  const [params] = useSearchParams()
  const role = (params.get('role') as UserRole) || 'candidate'

  return (
    <div className="min-h-screen flex items-center justify-center section-padding relative py-12">
      <GeometricShapes variant="hero" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg bg-white rounded-2xl border border-border/50 p-8 shadow-lg"
      >
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/logo.svg" alt="Arte Recruitment" className="h-10 mx-auto mb-4" />
          </Link>
          <h3>Create a Free Account</h3>
          <p className="text-sm mt-2 text-accent/60">
            Register as {role === 'recruiter' ? 'Recruiter / Employer' : 'Candidate'}
          </p>
        </div>
        <RegisterForm role={role} />
      </motion.div>
    </div>
  )
}
