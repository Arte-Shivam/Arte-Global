import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import type { NavItem } from '../../types'

interface LayoutProps {
  navItems: NavItem[]
  audience: 'candidate' | 'recruiter'
}

export function Layout({ navItems, audience }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header navItems={navItems} audience={audience} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
