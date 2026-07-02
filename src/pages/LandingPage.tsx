import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GeometricShapes } from '../components/common/GeometricShapes'
import { Modal } from '../components/common/Modal'
import { RegisterForm } from '../components/forms/RegisterForm'
import { COMPANY } from '../data/content'
import { setStoredAudience } from '../lib/utils'

export function LandingPage() {
  const navigate = useNavigate()
  const [registerModal, setRegisterModal] = useState<'candidate' | 'recruiter' | null>(null)

  function handleChoice(audience: 'candidate' | 'recruiter') {
    setStoredAudience(audience)
    setRegisterModal(audience)
  }

  function handleSkip() {
    if (registerModal) {
      navigate(registerModal === 'candidate' ? '/candidate' : '/recruiter')
      setRegisterModal(null)
    }
  }

  function handleRegisterSuccess() {
    if (registerModal) {
      navigate(registerModal === 'candidate' ? '/candidate' : '/recruiter')
      setRegisterModal(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <GeometricShapes variant="hero" />

      <div className="flex-1 flex flex-col items-center justify-center section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <img src="/logo.svg" alt="Arte Recruitment" className="h-16 md:h-40 mx-auto mb-6" />
          <h1 className="text-accent">
            Welcome to <span className="text-secondary">Arte Recruitment</span>
          </h1>
          <p className="mt-2 max-w-lg mx-auto text-lg">
            {COMPANY.tagline}
          </p>
          <p className="text-alt mt-10">How would you like to continue?</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full max-w-3xl">
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleChoice('candidate')}
            className="group relative bg-white rounded-2xl p-8 md:p-10 border-2 border-border/50 hover:border-secondary shadow-sm hover:shadow-xl transition-all duration-300 text-left"
          >
            <div className="w-14 h-14 rounded-xl bg-secondary-light flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
              <img src="/icons/candidate.svg" alt="" className="w-8 h-8" />
            </div>
            <h3 className="text-accent group-hover:text-secondary transition-colors">I'm a Candidate</h3>
            <p className="mt-3 text-sm text-accent/60">
              Find global job opportunities in Europe, UAE, Qatar, Mauritius and beyond.
            </p>
            <div className="mt-6 flex items-center gap-2 text-secondary font-semibold text-sm">
              Explore Jobs
              <img src="/icons/arrow-right.svg" alt="" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleChoice('recruiter')}
            className="group relative bg-white rounded-2xl p-8 md:p-10 border-2 border-border/50 hover:border-accent shadow-sm hover:shadow-xl transition-all duration-300 text-left"
          >
            <div className="w-14 h-14 rounded-xl bg-accent-light flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
              <img src="/icons/recruiter.svg" alt="" className="w-8 h-8" />
            </div>
            <h3 className="text-accent group-hover:text-accent transition-colors">I'm a Recruiter</h3>
            <p className="mt-3 text-sm text-accent/60">
              Partner with us to find the best global talent for your organisation.
            </p>
            <div className="mt-6 flex items-center gap-2 text-accent font-semibold text-sm">
              Hire Talent
              <img src="/icons/arrow-right.svg" alt="" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-alt mt-12"
        >
          Arte Global Skills Recruitment Private Limited
        </motion.p>
      </div>

      <Modal
        isOpen={registerModal !== null}
        onClose={handleSkip}
        title={registerModal === 'candidate' ? 'Register as Candidate' : 'Register as Recruiter'}
        size="lg"
      >
        {registerModal && (
          <>
            <RegisterForm role={registerModal} onSuccess={handleRegisterSuccess} />
            <button
              onClick={handleSkip}
              className="w-full mt-4 text-sm text-accent/50 hover:text-secondary transition-colors"
            >
              Skip for now →
            </button>
          </>
        )}
      </Modal>
    </div>
  )
}
