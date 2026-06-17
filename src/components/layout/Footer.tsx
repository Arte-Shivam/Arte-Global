import { Link } from 'react-router-dom'
import { COMPANY } from '../../data/content'
import { GeometricShapes } from '../common/GeometricShapes'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-accent text-white overflow-hidden">
      <GeometricShapes variant="footer" />
      <div className="relative section-padding pb-8">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <img src="/logo-white.svg" alt="Arte Recruitment" className="h-18 mb-6" />
              <p className="text-white/70 text-sm leading-relaxed">
                {COMPANY.description.slice(0, 120)}...
              </p>
              <div className="flex gap-4 mt-6">
                <a href={COMPANY.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5 brightness-0 invert" />
                </a>
                <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5 brightness-0 invert" />
                </a>
                <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <img src="/icons/instagram.svg" alt="Instagram" className="w-5 h-5 brightness-0 invert" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-white mb-4">Quick Links</h5>
              <ul className="space-y-2">
                {[
                  { label: 'Jobs', path: '/candidate/jobs' },
                  { label: 'About Us', path: '/candidate/about' },
                  { label: 'Blog', path: '/candidate/blog' },
                  { label: 'FAQs', path: '/candidate/faqs' },
                  { label: 'Contact', path: '/candidate/contact' },
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-white/70 text-sm hover:text-secondary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-white mb-4">Legal</h5>
              <ul className="space-y-2">
                {[
                  { label: 'Privacy Policy', path: '/privacy' },
                  { label: 'Terms & Conditions', path: '/terms' },
                  { label: 'Cookie Policy', path: '/cookies' },
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-white/70 text-sm hover:text-secondary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-white mb-4">Our Offices</h5>
              {COMPANY.offices.map((office) => (
                <div key={office.name} className="mb-4">
                  <p className="text-white/90 text-sm font-medium">{office.name}</p>
                  <p className="text-white/60 text-xs mt-1 leading-relaxed">{office.address}</p>
                  <p className="text-white/60 text-xs mt-1">{office.phone}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              {COMPANY.shortName} © {currentYear}. All rights reserved.
            </p>
            <p className="text-white/50 text-xs">
              Arte Global Skills Recruitment Private Limited
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
