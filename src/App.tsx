import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Layout } from './components/layout/Layout'
import { LandingPage } from './pages/LandingPage'
import { CandidateHomePage } from './pages/candidate/CandidateHomePage'
import { JobsPage } from './pages/candidate/JobsPage'
import { JobDetailPage } from './pages/candidate/JobDetailPage'
import { RecruiterHomePage } from './pages/recruiter/RecruiterHomePage'
import { ServicesPage } from './pages/recruiter/ServicesPage'
import { AboutPage } from './pages/shared/AboutPage'
import { ContactPage } from './pages/shared/ContactPage'
import { FAQPage } from './pages/shared/FAQPage'
import { BlogPage } from './pages/shared/BlogPage'
import { BlogDetailPage } from './pages/shared/BlogDetailPage'
import { PrivacyPage, TermsPage, CookiesPage } from './pages/shared/LegalPages'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { AdminPage } from './pages/admin/AdminPage'
import { CANDIDATE_NAV, RECRUITER_NAV } from './data/content'
import { getStoredAudience } from './lib/utils'

function AudienceRedirect() {
  const audience = getStoredAudience()
  if (audience === 'candidate') return <Navigate to="/candidate" replace />
  if (audience === 'recruiter') return <Navigate to="/recruiter" replace />
  return <LandingPage />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AudienceRedirect />} />

          {/* Candidate Routes */}
          <Route path="/candidate" element={<Layout navItems={CANDIDATE_NAV} audience="candidate" />}>
            <Route index element={<CandidateHomePage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="jobs/:slug" element={<JobDetailPage />} />
            <Route path="about" element={<AboutPage audience="candidate" />} />
            <Route path="contact" element={<ContactPage type="candidate" />} />
            <Route path="faqs" element={<FAQPage audience="candidate" />} />
            <Route path="blog" element={<BlogPage basePath="/candidate/blog" />} />
            <Route path="blog/:slug" element={<BlogDetailPage basePath="/candidate/blog" />} />
          </Route>

          {/* Recruiter Routes */}
          <Route path="/recruiter" element={<Layout navItems={RECRUITER_NAV} audience="recruiter" />}>
            <Route index element={<RecruiterHomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="about" element={<AboutPage audience="recruiter" />} />
            <Route path="contact" element={<ContactPage type="recruiter" />} />
            <Route path="faqs" element={<FAQPage audience="recruiter" />} />
            <Route path="blog" element={<BlogPage basePath="/recruiter/blog" />} />
            <Route path="blog/:slug" element={<BlogDetailPage basePath="/recruiter/blog" />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Legal (shared, no layout header) */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
