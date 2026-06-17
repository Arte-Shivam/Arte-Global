import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GeometricShapes } from '../../components/common/GeometricShapes'
import { Footer } from '../../components/layout/Footer'

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border/50 bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/">
            <img src="/logo.svg" alt="Arte Recruitment" className="h-10" />
          </Link>
        </div>
      </header>
      <div className="flex-1 section-padding relative">
        <GeometricShapes variant="section" />
        <div className="container-custom relative z-10 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1>{title}</h1>
            <div className="mt-8 space-y-6 text-sm leading-relaxed text-accent/80">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>Last updated: June 2026</p>
      <p>Arte Global Skills Recruitment Private Limited ("Arte Recruitment", "we", "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.</p>
      <h4>Information We Collect</h4>
      <p>We collect information you provide when registering, applying for jobs, or contacting us — including name, email, phone number, resume, and employment history.</p>
      <h4>How We Use Your Information</h4>
      <p>Your information is used to match you with job opportunities, communicate with you about applications, and improve our services. We do not sell your personal data to third parties.</p>
      <h4>Data Security</h4>
      <p>We implement appropriate security measures to protect your personal information against unauthorised access, alteration, or disclosure.</p>
      <h4>Contact</h4>
      <p>For privacy-related inquiries, contact us at info@arterecruitment.com.</p>
    </LegalPage>
  )
}

export function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <p>Last updated: June 2026</p>
      <p>By using the Arte Recruitment website and services, you agree to these terms and conditions.</p>
      <h4>Services</h4>
      <p>Arte Recruitment provides recruitment and placement services connecting candidates with employers globally. We do not guarantee employment or placement.</p>
      <h4>User Accounts</h4>
      <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
      <h4>Candidate Obligations</h4>
      <p>Candidates must provide accurate information in their profiles and applications. Misrepresentation may result in account termination.</p>
      <h4>Employer Obligations</h4>
      <p>Employers must provide accurate job descriptions and comply with applicable labour laws in their jurisdiction.</p>
      <h4>Limitation of Liability</h4>
      <p>Arte Recruitment is not liable for any indirect, incidental, or consequential damages arising from use of our services.</p>
    </LegalPage>
  )
}

export function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy">
      <p>Last updated: June 2026</p>
      <p>This website uses cookies to enhance your browsing experience and analyse site traffic.</p>
      <h4>What Are Cookies</h4>
      <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and improve site functionality.</p>
      <h4>Types of Cookies We Use</h4>
      <p><strong>Essential cookies:</strong> Required for basic site functionality such as authentication and session management.</p>
      <p><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website.</p>
      <h4>Managing Cookies</h4>
      <p>You can control cookies through your browser settings. Disabling cookies may affect site functionality.</p>
    </LegalPage>
  )
}
