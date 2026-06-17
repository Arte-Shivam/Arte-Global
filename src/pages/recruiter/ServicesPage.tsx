import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GeometricShapes } from '../../components/common/GeometricShapes'
import { Button } from '../../components/common/Button'
import { INDUSTRIES } from '../../data/content'

export function ServicesPage() {
  return (
    <div className="section-padding relative">
      <GeometricShapes variant="section" />
      <div className="container-custom relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1>Our Services</h1>
          <p className="mt-3 max-w-2xl mx-auto">
            Comprehensive recruitment solutions tailored to your hiring needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            { icon: '/icons/sourcing.svg', title: 'Talent Sourcing', desc: 'We identify and attract qualified candidates from India, Nepal and the broader South Asian talent pool.' },
            { icon: '/icons/screening.svg', title: 'Candidate Screening', desc: 'Rigorous vetting process including skills assessment, background checks and interview preparation.' },
            { icon: '/icons/placement.svg', title: 'Global Placement', desc: 'End-to-end support for overseas placements including documentation and relocation guidance.' },
            { icon: '/icons/consulting.svg', title: 'HR Consulting', desc: 'Strategic advice on workforce planning, compliance and international hiring best practices.' },
            { icon: '/icons/training.svg', title: 'Pre-Departure Training', desc: 'Cultural orientation and skills training to ensure candidates are ready for their new roles.' },
            { icon: '/icons/support.svg', title: 'Ongoing Support', desc: 'Continued assistance for both employers and placed candidates throughout the employment period.' },
          ].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-white rounded-2xl p-8 border border-border/50 hover:shadow-md transition-shadow"
            >
              <img src={service.icon} alt="" className="w-10 h-10 mb-4" />
              <h4>{service.title}</h4>
              <p className="text-sm mt-3">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h3>Industries We Serve</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {INDUSTRIES.map((ind) => (
            <span key={ind} className="px-4 py-2 bg-secondary-light text-secondary text-sm rounded-full">
              {ind}
            </span>
          ))}
        </div>

        <div className="text-center">
          <Link to="/register?role=recruiter">
            <Button variant="primary" size="lg">Partner With Us</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
