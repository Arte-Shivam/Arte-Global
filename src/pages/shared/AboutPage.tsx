import { motion } from 'framer-motion'
import { GeometricShapes } from '../../components/common/GeometricShapes'
import { COMPANY } from '../../data/content'

interface AboutPageProps {
  audience?: 'candidate' | 'recruiter'
}

export function AboutPage({ audience = 'candidate' }: AboutPageProps) {
  return (
    <div className="section-padding relative">
      <GeometricShapes variant="section" />
      <div className="container-custom relative z-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>About Us</h1>
          <p className="mt-6 text-lg">{COMPANY.description}</p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3>Our Mission</h3>
            <p className="mt-4">
              To bridge the gap between talented professionals from South Asia and global employers,
              creating meaningful career opportunities that transform lives and strengthen businesses worldwide.
            </p>
          </div>
          <div>
            <h3>Our Reach</h3>
            <p className="mt-4">
              We have successfully placed candidates in countries including:
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {COMPANY.countries.map((c) => (
                <span key={c} className="px-3 py-1 bg-secondary-light text-secondary text-sm rounded-full">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3>Our Offices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {COMPANY.offices.map((office) => (
              <div key={office.name} className="bg-white rounded-2xl border border-border/50 p-6">
                <h4>{office.name}</h4>
                <p className="text-sm font-medium mt-2">{office.company}</p>
                <p className="text-sm mt-2 text-accent/60">{office.address}</p>
                <p className="text-sm mt-2 text-secondary">{office.phone}</p>
                <p className="text-sm text-secondary">{office.email}</p>
              </div>
            ))}
          </div>
        </div>

        {audience === 'candidate' && (
          <div className="mt-16 bg-accent rounded-2xl p-8 text-white">
            <h3 className="text-white">Ready to start your global career?</h3>
            <p className="mt-3 text-white/80">Join thousands of candidates who trust Arte Recruitment for their overseas journey.</p>
          </div>
        )}
      </div>
    </div>
  )
}
