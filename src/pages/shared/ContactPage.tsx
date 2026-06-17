import { motion } from 'framer-motion'
import { GeometricShapes } from '../../components/common/GeometricShapes'
import { ContactForm } from '../../components/forms/ContactForm'
import { COMPANY } from '../../data/content'

interface ContactPageProps {
  type?: 'candidate' | 'recruiter'
}

export function ContactPage({ type = 'candidate' }: ContactPageProps) {
  return (
    <div className="section-padding relative">
      <GeometricShapes variant="section" />
      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1>Contact Us</h1>
          <p className="mt-3">We'd love to hear from you. Reach out and we'll respond as soon as possible.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            {COMPANY.offices.map((office) => (
              <div key={office.name} className="bg-white rounded-2xl border border-border/50 p-6">
                <h4>{office.name}</h4>
                <p className="text-sm mt-2 text-accent/60">{office.address}</p>
                <a href={`tel:${office.phone}`} className="text-sm text-secondary mt-2 block hover:underline">{office.phone}</a>
                <a href={`mailto:${office.email}`} className="text-sm text-secondary block hover:underline">{office.email}</a>
              </div>
            ))}
            <div className="flex gap-4 px-2">
              <a href={COMPANY.social.linkedin} target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity" />
              </a>
              <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity" />
              </a>
              <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.svg" alt="Instagram" className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm">
            <ContactForm type={type} />
          </div>
        </div>
      </div>
    </div>
  )
}
